const mongoose = require("mongoose")
const PAYMENT_STATUS = require("../constants/paymentStatus")

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: Object.values(PAYMENT_STATUS), default: PAYMENT_STATUS.PENDING },
    method: { type: String, enum: ["razorpay", "cod"], required: true },
    raw: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
)

module.exports = mongoose.model("Payment", paymentSchema)
