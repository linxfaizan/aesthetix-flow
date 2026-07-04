const Review = require("../models/Review")
const Product = require("../models/Product")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")

const listReviews = asyncHandler(async (req, res) => {
  const filter = req.query.product ? { product: req.query.product, isApproved: true } : {}
  const reviews = await Review.find(filter).populate("user", "name").sort({ createdAt: -1 })
  sendResponse(res, 200, "Reviews fetched", { reviews })
})

const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create({ ...req.body, user: req.user._id })
  const stats = await Review.aggregate([
    { $match: { product: review.product, isApproved: true } },
    { $group: { _id: "$product", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
  ])
  await Product.findByIdAndUpdate(review.product, {
    ratingAverage: stats[0]?.avg || 0,
    ratingCount: stats[0]?.count || 0,
  })
  sendResponse(res, 201, "Review created", { review })
})

const deleteReview = asyncHandler(async (req, res) => {
  const filter = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, user: req.user._id }
  await Review.findOneAndDelete(filter)
  sendResponse(res, 200, "Review deleted")
})

module.exports = { listReviews, createReview, deleteReview }
