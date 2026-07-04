const Product = require("../models/Product")
const Review = require("../models/Review")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")
const { getPagination, buildMeta } = require("../utils/pagination")
const cloudinaryService = require("../services/cloudinaryService")

const buildProductQuery = (query) => {
  const filter = { isActive: true }
  if (query.category) filter.category = query.category
  if (query.featured) filter.isFeatured = query.featured === "true"
  if (query.trending) filter.isTrending = query.trending === "true"
  if (query.minPrice || query.maxPrice) {
    filter.price = {}
    if (query.minPrice) filter.price.$gte = Number(query.minPrice)
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice)
  }
  if (query.search) filter.$text = { $search: query.search }
  return filter
}

const listProducts = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query)
  const filter = buildProductQuery(req.query)
  const sort = req.query.sort || "-createdAt"
  const [products, total] = await Promise.all([
    Product.find(filter).populate("category").sort(sort).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ])
  sendResponse(res, 200, "Products fetched", { products }, buildMeta(page, limit, total))
})

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category")
  if (!product) {
    const error = new Error("Product not found")
    error.statusCode = 404
    throw error
  }
  const reviews = await Review.find({ product: product._id, isApproved: true }).populate("user", "name")
  sendResponse(res, 200, "Product fetched", { product, reviews })
})

const createProduct = asyncHandler(async (req, res) => {
  const images = req.files?.length ? await cloudinaryService.uploadMany(req.files) : req.body.images || []
  const product = await Product.create({ ...req.body, images })
  sendResponse(res, 201, "Product created", { product })
})

const updateProduct = asyncHandler(async (req, res) => {
  const payload = { ...req.body }
  if (req.files?.length) payload.images = await cloudinaryService.uploadMany(req.files)
  const product = await Product.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
  sendResponse(res, 200, "Product updated", { product })
})

const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isActive: false })
  sendResponse(res, 200, "Product deleted")
})

const featuredProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true, isActive: true }).limit(12)
  sendResponse(res, 200, "Featured products fetched", { products })
})

const trendingProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isTrending: true, isActive: true }).limit(12)
  sendResponse(res, 200, "Trending products fetched", { products })
})

const relatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  const products = await Product.find({ category: product.category, _id: { $ne: product._id }, isActive: true }).limit(8)
  sendResponse(res, 200, "Related products fetched", { products })
})

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  featuredProducts,
  trendingProducts,
  relatedProducts,
}
