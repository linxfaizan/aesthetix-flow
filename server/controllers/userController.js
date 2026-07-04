const User = require("../models/User")
const Order = require("../models/Order")
const Wishlist = require("../models/Wishlist")
const Address = require("../models/Address")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")

const getProfile = asyncHandler(async (req, res) => {
  sendResponse(res, 200, "Profile fetched", { user: req.user })
})

const updateProfile = asyncHandler(async (req, res) => {
  const allowed = ["name", "phone"]
  const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)))
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select("-password")
  sendResponse(res, 200, "Profile updated", { user })
})

const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshTokenHash").sort({ createdAt: -1 })
  sendResponse(res, 200, "Users fetched", { users })
})

const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true, runValidators: true })
  sendResponse(res, 200, "User role updated", { user })
})

const toggleBlockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    const error = new Error("User not found")
    error.statusCode = 404
    throw error
  }
  user.isBlocked = !user.isBlocked
  await user.save({ validateBeforeSave: false })
  sendResponse(res, 200, "User status updated", { user })
})

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
  sendResponse(res, 200, "Orders fetched", { orders })
})

const getUserWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products")
  sendResponse(res, 200, "Wishlist fetched", { wishlist: wishlist || { products: [] } })
})

const getUserAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1, createdAt: -1 })
  sendResponse(res, 200, "Addresses fetched", { addresses })
})

module.exports = {
  getProfile,
  updateProfile,
  listUsers,
  updateUserRole,
  toggleBlockUser,
  getUserOrders,
  getUserWishlist,
  getUserAddresses,
}
