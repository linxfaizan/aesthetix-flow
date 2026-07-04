const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    size: String,
    color: String,
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
)

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Cart", cartSchema)
