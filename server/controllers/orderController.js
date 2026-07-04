const Order = require("../models/Order")
const orderService = require("../services/orderService")
const emailService = require("../services/emailService")
const generateInvoice = require("../utils/invoiceGenerator")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")
const { getPagination, buildMeta } = require("../utils/pagination")

const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder({ user: req.user, payload: req.body })
  sendResponse(res, 201, "Order created", { order })
})

const listOrders = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query)
  const filter = req.user.role === "admin" ? {} : { user: req.user._id }
  const [orders, total] = await Promise.all([
    Order.find(filter).populate("user", "name email").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ])
  sendResponse(res, 200, "Orders fetched", { orders }, buildMeta(page, limit, total))
})

const getOrder = asyncHandler(async (req, res) => {
  const filter = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, user: req.user._id }
  const order = await Order.findOne(filter).populate("user", "name email")
  if (!order) {
    const error = new Error("Order not found")
    error.statusCode = 404
    throw error
  }
  sendResponse(res, 200, "Order fetched", { order })
})

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    const error = new Error("Order not found")
    error.statusCode = 404
    throw error
  }
  const updatedOrder = await orderService.cancelOrder(order, req.user)
  sendResponse(res, 200, "Order cancelled", { order: updatedOrder })
})

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "email name")
  order.orderStatus = req.body.status
  order.tracking.push({ status: req.body.status, message: req.body.message || `Order ${req.body.status}` })
  await order.save()
  if (req.body.status === "shipped") await emailService.sendShippingEmail(order.user, order)
  sendResponse(res, 200, "Order status updated", { order })
})

const downloadInvoice = asyncHandler(async (req, res) => {
  const filter = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, user: req.user._id }
  const order = await Order.findOne(filter)
  if (!order) {
    const error = new Error("Order not found")
    error.statusCode = 404
    throw error
  }
  const pdf = await generateInvoice(order)
  res.setHeader("Content-Type", "application/pdf")
  res.setHeader("Content-Disposition", `attachment; filename=${order.orderNumber}.pdf`)
  res.send(pdf)
})

module.exports = { createOrder, listOrders, getOrder, cancelOrder, updateOrderStatus, downloadInvoice }
