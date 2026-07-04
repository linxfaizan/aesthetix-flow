const express = require("express")
const userController = require("../controllers/userController")
const protect = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/adminMiddleware")
const validate = require("../middleware/validateMiddleware")
const { updateProfileValidator, mongoIdParam } = require("../validators/userValidator")

const router = express.Router()

router.get("/profile", protect, userController.getProfile)
router.patch("/update", protect, updateProfileValidator, validate, userController.updateProfile)
router.get("/address", protect, userController.getUserAddresses)
router.get("/orders", protect, userController.getUserOrders)
router.get("/wishlist", protect, userController.getUserWishlist)

router.get("/", protect, adminOnly, userController.listUsers)
router.patch("/:id/role", protect, adminOnly, mongoIdParam, validate, userController.updateUserRole)
router.patch("/:id/block", protect, adminOnly, mongoIdParam, validate, userController.toggleBlockUser)

module.exports = router
