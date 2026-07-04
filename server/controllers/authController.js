const authService = require("../services/authService")
const User = require("../models/User")
const sendResponse = require("../utils/sendResponse")
const asyncHandler = require("../utils/asyncHandler")

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body, res)
  sendResponse(res, 201, "Registered successfully", { user })
})

const login = asyncHandler(async (req, res) => {
  const user = await authService.login(req.body, res)
  sendResponse(res, 200, "Logged in successfully", { user })
})

const refresh = asyncHandler(async (req, res) => {
  const data = await authService.refresh(req.cookies.refreshToken, res)
  sendResponse(res, 200, "Token refreshed", data)
})

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user?._id, res)
  sendResponse(res, 200, "Logged out successfully")
})

const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email)
  sendResponse(res, 200, "If the email exists, a reset link has been sent")
})

const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body)
  sendResponse(res, 200, "Password reset successfully")
})

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("+password")
  if (!(await user.comparePassword(req.body.currentPassword))) {
    const error = new Error("Current password is incorrect")
    error.statusCode = 400
    throw error
  }
  user.password = req.body.newPassword
  user.tokenVersion += 1
  await user.save()
  sendResponse(res, 200, "Password changed successfully")
})

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await authService.verifyEmail(req.params.token || req.body.token)
  sendResponse(res, 200, "Email verified successfully", { user })
})

const googleLogin = asyncHandler(async (req, res) => {
  const user = await authService.googleLogin(req.body, res)
  sendResponse(res, 200, "Google login successful", { user })
})

const sendOtp = asyncHandler(async (req, res) => {
  const data = await authService.sendOtp(req.body)
  sendResponse(res, 200, "OTP sent", data)
})

const verifyOtp = asyncHandler(async (req, res) => {
  const user = await authService.verifyOtp(req.body, res)
  sendResponse(res, 200, "OTP verified", { user })
})

module.exports = {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  googleLogin,
  sendOtp,
  verifyOtp,
}
