const Wishlist = require("../models/Wishlist")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")

const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products")
  sendResponse(res, 200, "Wishlist fetched", { wishlist: wishlist || { products: [] } })
})

const toggleWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOneAndUpdate(
    { user: req.user._id },
    { $setOnInsert: { user: req.user._id } },
    { upsert: true, new: true },
  )
  const exists = wishlist.products.some((product) => String(product) === req.body.product)
  wishlist.products = exists
    ? wishlist.products.filter((product) => String(product) !== req.body.product)
    : [...wishlist.products, req.body.product]
  await wishlist.save()
  await wishlist.populate("products")
  sendResponse(res, 200, "Wishlist updated", { wishlist })
})

module.exports = { getWishlist, toggleWishlist }
