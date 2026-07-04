const express = require("express")
const cartController = require("../controllers/cartController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.use(protect)
router.get("/", cartController.getCart)
router.post("/", cartController.addToCart)
router.patch("/coupon", cartController.applyCoupon)
router.patch("/:itemId", cartController.updateCartItem)
router.delete("/:itemId", cartController.removeCartItem)
router.delete("/", cartController.clearCart)

module.exports = router
