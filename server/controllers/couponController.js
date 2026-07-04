const Coupon = require("../models/Coupon")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")

const listCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 })
  sendResponse(res, 200, "Coupons fetched", { coupons })
})

const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body)
  sendResponse(res, 201, "Coupon created", { coupon })
})

const updateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  sendResponse(res, 200, "Coupon updated", { coupon })
})

const deleteCoupon = asyncHandler(async (req, res) => {
  await Coupon.findByIdAndUpdate(req.params.id, { isActive: false })
  sendResponse(res, 200, "Coupon disabled")
})

module.exports = { listCoupons, createCoupon, updateCoupon, deleteCoupon }
