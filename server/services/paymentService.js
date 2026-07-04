const crypto = require("crypto")
const createRazorpay = require("../config/razorpay")
const Payment = require("../models/Payment")
const Order = require("../models/Order")
const PAYMENT_STATUS = require("../constants/paymentStatus")

const createPaymentOrder = async ({ order, user }) => {
  const razorpay = createRazorpay()
  if (!razorpay) {
    const error = new Error("Razorpay credentials are not configured")
    error.statusCode = 503
    throw error
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(order.totalAmount * 100),
    currency: "INR",
    receipt: order.orderNumber,
  })

  const payment = await Payment.create({
    user: user._id,
    order: order._id,
    razorpayOrderId: razorpayOrder.id,
    amount: order.totalAmount,
    method: "razorpay",
    status: PAYMENT_STATUS.PENDING,
    raw: razorpayOrder,
  })

  return { payment, razorpayOrder }
}

const verifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex")

  if (expectedSignature !== razorpay_signature) {
    const error = new Error("Invalid payment signature")
    error.statusCode = 400
    throw error
  }

  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: PAYMENT_STATUS.PAID,
    },
    { new: true },
  )

  if (!payment) {
    const error = new Error("Payment record not found")
    error.statusCode = 404
    throw error
  }

  await Order.findByIdAndUpdate(payment.order, { paymentStatus: PAYMENT_STATUS.PAID })
  return payment
}

const verifyWebhookSignature = (rawBody, signature) => {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(rawBody)
    .digest("hex")
  return expectedSignature === signature
}

module.exports = { createPaymentOrder, verifyPayment, verifyWebhookSignature }
