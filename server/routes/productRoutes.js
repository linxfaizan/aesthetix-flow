const express = require("express")
const productController = require("../controllers/productController")
const protect = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/adminMiddleware")
const upload = require("../middleware/uploadMiddleware")
const validate = require("../middleware/validateMiddleware")
const { productValidator, productIdValidator } = require("../validators/productValidator")

const router = express.Router()

router.get("/", productController.listProducts)
router.get("/search", productController.listProducts)
router.get("/featured", productController.featuredProducts)
router.get("/trending", productController.trendingProducts)
router.get("/:id/related", productIdValidator, validate, productController.relatedProducts)
router.get("/:id", productIdValidator, validate, productController.getProduct)

router.post("/", protect, adminOnly, upload.array("images", 8), productValidator, validate, productController.createProduct)
router.patch("/:id", protect, adminOnly, upload.array("images", 8), productIdValidator, validate, productController.updateProduct)
router.delete("/:id", protect, adminOnly, productIdValidator, validate, productController.deleteProduct)

module.exports = router
