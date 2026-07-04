const express = require("express")
const analyticsController = require("../controllers/analyticsController")
const productController = require("../controllers/productController")
const orderController = require("../controllers/orderController")
const userController = require("../controllers/userController")
const protect = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/adminMiddleware")
const upload = require("../middleware/uploadMiddleware")

const router = express.Router()

router.use(protect, adminOnly)

router.get("/dashboard", analyticsController.dashboard)
router.get("/analytics", analyticsController.analytics)

router.get("/products", productController.listProducts)
router.post("/products", upload.array("images", 8), productController.createProduct)
router.patch("/products/:id", upload.array("images", 8), productController.updateProduct)
router.delete("/products/:id", productController.deleteProduct)

router.get("/orders", orderController.listOrders)
router.get("/orders/:id", orderController.getOrder)
router.patch("/orders/:id/status", orderController.updateOrderStatus)

router.get("/users", userController.listUsers)
router.patch("/users/:id/role", userController.updateUserRole)
router.patch("/users/:id/block", userController.toggleBlockUser)

module.exports = router
