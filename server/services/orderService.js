const Product = require("../models/Product")
const Order = require("../models/Order")
const Cart = require("../models/Cart")
const PAYMENT_STATUS = require("../constants/paymentStatus")
const ORDER_STATUS = require("../constants/orderStatus")
const couponService = require("./couponService")
const emailService = require("./emailService")

const buildOrderItems = async (items) => {
  const productIds = items.map((item) => item.product)
  const products = await Product.find({ _id: { $in: productIds }, isActive: true })
  const productMap = new Map(products.map((product) => [String(product._id), product]))

  return items.map((item) => {
    const product = productMap.get(String(item.product))
    if (!product) {
      const error = new Error("A selected product is unavailable")
      error.statusCode = 400
      throw error
    }
    if (product.stock < item.quantity) {
      const error = new Error(`${product.name} does not have enough stock`)
      error.statusCode = 400
      throw error
    }

    return {
      product: product._id,
      name: product.name,
      image: product.images?.[0]?.url,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: product.price,
    }
  })
}

const reduceStock = async (items) => {
  await Promise.all(
    items.map((item) => Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })),
  )
}

const createOrder = async ({ user, payload }) => {
  const items = await buildOrderItems(payload.items)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const coupon = await couponService.getCoupon(payload.couponCode)
  const discount = couponService.calculateDiscount(coupon, subtotal)
  const shippingFee = subtotal > 5000 ? 0 : 199
  const tax = Math.round((subtotal - discount) * 0.18)
  const totalAmount = subtotal - discount + shippingFee + tax

  const order = await Order.create({
    user: user._id,
    items,
    shippingAddress: payload.shippingAddress,
    subtotal,
    discount,
    shippingFee,
    tax,
    totalAmount,
    coupon: coupon?._id,
    paymentMethod: payload.paymentMethod,
    paymentStatus: payload.paymentMethod === "cod" ? PAYMENT_STATUS.COD : PAYMENT_STATUS.PENDING,
    orderStatus: ORDER_STATUS.PLACED,
    tracking: [{ status: ORDER_STATUS.PLACED, message: "Order placed" }],
  })

  await reduceStock(items)
  await couponService.incrementUsage(coupon)
  await Cart.findOneAndUpdate({ user: user._id }, { items: [], coupon: null }, { upsert: true })
  await emailService.sendOrderConfirmationEmail(user, order).catch((error) => {
    console.warn(`Order email skipped: ${error.message}`)
  })
  return order
}

const cancelOrder = async (order, user) => {
  if (![ORDER_STATUS.PLACED, ORDER_STATUS.CONFIRMED, ORDER_STATUS.PROCESSING].includes(order.orderStatus)) {
    const error = new Error("Order can no longer be cancelled")
    error.statusCode = 400
    throw error
  }
  if (String(order.user) !== String(user._id) && user.role !== "admin") {
    const error = new Error("Not authorized to cancel this order")
    error.statusCode = 403
    throw error
  }

  order.orderStatus = ORDER_STATUS.CANCELLED
  order.cancelledAt = new Date()
  order.tracking.push({ status: ORDER_STATUS.CANCELLED, message: "Order cancelled" })
  await order.save()

  await Promise.all(order.items.map((item) => Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } })))
  return order
}

module.exports = { createOrder, cancelOrder }
