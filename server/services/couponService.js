const Coupon = require("../models/Coupon")

const getCoupon = async (code) => {
  if (!code) return null
  return Coupon.findOne({ code: code.toUpperCase(), isActive: true })
}

const calculateDiscount = (coupon, subtotal) => {
  if (!coupon) return 0
  if (coupon.expiresAt && coupon.expiresAt < new Date()) return 0
  if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) return 0
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return 0

  const discount = coupon.type === "percentage" ? (subtotal * coupon.value) / 100 : coupon.value
  return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount
}

const incrementUsage = async (coupon) => {
  if (coupon) await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } })
}

module.exports = { getCoupon, calculateDiscount, incrementUsage }
