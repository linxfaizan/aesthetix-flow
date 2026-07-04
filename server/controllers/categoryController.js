const Category = require("../models/Category")
const asyncHandler = require("../utils/asyncHandler")
const sendResponse = require("../utils/sendResponse")
const slugGenerator = require("../utils/slugGenerator")

const listCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort("name")
  sendResponse(res, 200, "Categories fetched", { categories })
})

const createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name?.trim()
  if (!name) {
    const error = new Error("Category name is required")
    error.statusCode = 400
    throw error
  }

  const category = await Category.findOneAndUpdate(
    { name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
    { ...req.body, name, slug: slugGenerator(name), isActive: true },
    { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
  )
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
