const Order = require("../models/Order")
const Payment = require("../models/Payment")
const paymentService = require("../services/paymentService")
const PAYMENT_STATUS = require("../constants/paymentStatus")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")

const createPaymentOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.body.orderId, user: req.user._id })
  if (!order) {
    const error = new Error("Order not found")
    error.statusCode = 404
    throw error
  }
  const data = await paymentService.createPaymentOrder({ order, user: req.user })
  sendResponse(res, 201, "Payment order created", data)
})

const verifyPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.verifyPayment(req.body)
  sendResponse(res, 200, "Payment verified", { payment })
})

const webhook = asyncHandler(async (req, res) => {
  const signature = req.headers["x-razorpay-signature"]
  const isValid = paymentService.verifyWebhookSignature(req.rawBody, signature)
  if (!isValid) {
    const error = new Error("Invalid webhook signature")
    error.statusCode = 400
    throw error
  }

  if (req.body.event === "payment.captured") {
    const entity = req.body.payload.payment.entity
    await Payment.findOneAndUpdate(
      { razorpayOrderId: entity.order_id },
      { status: PAYMENT_STATUS.PAID, razorpayPaymentId: entity.id, raw: entity },
    )
  }

  sendResponse(res, 200, "Webhook processed")
})

module.exports = { createPaymentOrder, verifyPayment, webhook }
