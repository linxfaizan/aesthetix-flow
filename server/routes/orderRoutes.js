const express = require("express")
const orderController = require("../controllers/orderController")
const protect = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/adminMiddleware")
const validate = require("../middleware/validateMiddleware")
const { createOrderValidator, orderIdValidator } = require("../validators/orderValidator")

const router = express.Router()

router.use(protect)
router.get("/", orderController.listOrders)
router.post("/", createOrderValidator, validate, orderController.createOrder)
router.get("/:id/invoice", orderIdValidator, validate, orderController.downloadInvoice)
router.get("/:id", orderIdValidator, validate, orderController.getOrder)
router.patch("/:id/cancel", orderIdValidator, validate, orderController.cancelOrder)
router.patch("/:id/status", adminOnly, orderIdValidator, validate, orderController.updateOrderStatus)

module.exports = router
