const express = require("express")
const couponController = require("../controllers/couponController")
const protect = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/adminMiddleware")

const router = express.Router()

router.use(protect, adminOnly)
router.get("/", couponController.listCoupons)
router.post("/", couponController.createCoupon)
router.patch("/:id", couponController.updateCoupon)
router.delete("/:id", couponController.deleteCoupon)

module.exports = router
