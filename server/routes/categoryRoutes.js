const express = require("express")
const categoryController = require("../controllers/categoryController")
const protect = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/adminMiddleware")

const router = express.Router()

router.get("/", categoryController.listCategories)
router.post("/", protect, adminOnly, categoryController.createCategory)
router.patch("/:id", protect, adminOnly, categoryController.updateCategory)
router.delete("/:id", protect, adminOnly, categoryController.deleteCategory)

module.exports = router
