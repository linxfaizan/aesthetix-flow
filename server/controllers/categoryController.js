const Category = require("../models/Category")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")

const listCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort("name")
  sendResponse(res, 200, "Categories fetched", { categories })
})

const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body)
  sendResponse(res, 201, "Category created", { category })
})

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  sendResponse(res, 200, "Category updated", { category })
})

const deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { isActive: false })
  sendResponse(res, 200, "Category deleted")
})

module.exports = { listCategories, createCategory, updateCategory, deleteCategory }
