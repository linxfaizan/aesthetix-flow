const Cart = require("../models/Cart")
const Product = require("../models/Product")
const Coupon = require("../models/Coupon")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product coupon")
  sendResponse(res, 200, "Cart fetched", { cart: cart || { items: [] } })
})

const addToCart = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.product)
  if (!product || !product.isActive) {
    const error = new Error("Product unavailable")
    error.statusCode = 404
    throw error
  }

  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $setOnInsert: { user: req.user._id } },
    { new: true, upsert: true },
  )

  const existing = cart.items.find(
    (item) =>
      String(item.product) === String(req.body.product) &&
      item.size === req.body.size &&
      item.color === req.body.color,
  )

  if (existing) existing.quantity += Number(req.body.quantity || 1)
  else cart.items.push({ product: req.body.product, size: req.body.size, color: req.body.color, quantity: req.body.quantity || 1 })
  await cart.save()

  await cart.populate("items.product coupon")
  sendResponse(res, 200, "Cart updated", { cart })
})

const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
  const item = cart?.items.id(req.params.itemId) || cart?.items[Number(req.params.itemId)]
  if (!item) {
    const error = new Error("Cart item not found")
    error.statusCode = 404
    throw error
  }
  item.quantity = Number(req.body.quantity)
  await cart.save()
  await cart.populate("items.product coupon")
  sendResponse(res, 200, "Cart item updated", { cart })
})

const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
  if (cart) {
    cart.items = cart.items.filter((item, index) => String(item._id) === req.params.itemId ? false : String(index) !== req.params.itemId)
    await cart.save()
  }
  sendResponse(res, 200, "Cart item removed", { cart })
})

const applyCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.body.code?.toUpperCase(), isActive: true })
  if (!coupon) {
    const error = new Error("Invalid coupon")
    error.statusCode = 404
    throw error
  }
  const cart = await Cart.findOneAndUpdate({ user: req.user._id }, { coupon: coupon._id }, { new: true, upsert: true }).populate("items.product coupon")
  sendResponse(res, 200, "Coupon applied", { cart })
})

const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], coupon: null }, { new: true, upsert: true })
  sendResponse(res, 200, "Cart cleared", { cart })
})

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, applyCoupon, clearCart }
