const express = require("express")
const authController = require("../controllers/authController")
const protect = require("../middleware/authMiddleware")
const validate = require("../middleware/validateMiddleware")
const { authLimiter } = require("../middleware/rateLimitMiddleware")
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
  googleValidator,
  sendOtpValidator,
  verifyOtpValidator,
} = require("../validators/authValidator")

const router = express.Router()

router.post("/register", authLimiter, registerValidator, validate, authController.register)
router.post("/login", authLimiter, loginValidator, validate, authController.login)
router.post("/google", authLimiter, googleValidator, validate, authController.googleLogin)
router.post("/send-otp", authLimiter, sendOtpValidator, validate, authController.sendOtp)
router.post("/verify-otp", authLimiter, verifyOtpValidator, validate, authController.verifyOtp)
router.post("/logout", protect, authController.logout)
router.post("/refresh", authController.refresh)
router.post("/forgot-password", authLimiter, forgotPasswordValidator, validate, authController.forgotPassword)
router.post("/reset-password", authLimiter, resetPasswordValidator, validate, authController.resetPassword)
router.patch("/change-password", protect, changePasswordValidator, validate, authController.changePassword)
router.get("/verify-email/:token", authController.verifyEmail)
router.post("/verify-email", authController.verifyEmail)

module.exports = router
