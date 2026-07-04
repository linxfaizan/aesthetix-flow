const express = require("express")
const paymentController = require("../controllers/paymentController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/create-order", protect, paymentController.createPaymentOrder)
router.post("/verify", protect, paymentController.verifyPayment)
router.post("/webhook", paymentController.webhook)

module.exports = router
