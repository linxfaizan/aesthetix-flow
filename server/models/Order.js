const mongoose = require("mongoose")
const ORDER_STATUS = require("../constants/orderStatus")
const PAYMENT_STATUS = require("../constants/paymentStatus")

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    image: String,
    size: String,
    color: String,
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false },
)

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    items: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    paymentMethod: { type: String, enum: ["razorpay", "cod"], required: true },
    paymentStatus: { type: String, enum: Object.values(PAYMENT_STATUS), default: PAYMENT_STATUS.PENDING },
    orderStatus: { type: String, enum: Object.values(ORDER_STATUS), default: ORDER_STATUS.PLACED },
    tracking: [
      {
        status: String,
        message: String,
        date: { type: Date, default: Date.now },
      },
    ],
    cancelledAt: Date,
    deliveredAt: Date,
  },
  { timestamps: true },
)

orderSchema.pre("validate", function setOrderNumber() {
  if (!this.orderNumber) this.orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`
})

module.exports = mongoose.model("Order", orderSchema)
