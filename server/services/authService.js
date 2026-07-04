const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library")
const User = require("../models/User")
const generateToken = require("../utils/generateToken")
const generateRefreshToken = require("../utils/generateRefreshToken")
const emailService = require("./emailService")
const smsService = require("./smsService")

const googleClient = new OAuth2Client()

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
}

const setAuthCookies = async (res, user) => {
  const accessToken = generateToken(user)
  const refreshToken = generateRefreshToken(user)
  user.refreshTokenHash = await bcrypt.hash(refreshToken, 12)
  await user.save({ validateBeforeSave: false })

  res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
  res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })

  return { accessToken, refreshToken }
}

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  isEmailVerified: user.isEmailVerified,
  avatar: user.avatar,
})

const register = async (payload, res) => {
  const existing = await User.findOne({ email: payload.email })
  if (existing) {
    const error = new Error("Email is already registered")
    error.statusCode = 409
    throw error
  }

  const user = await User.create(payload)
  const verificationToken = user.createEmailVerificationToken()
  await user.save({ validateBeforeSave: false })
  await Promise.allSettled([emailService.sendWelcomeEmail(user), emailService.sendVerificationEmail(user, verificationToken)])
  await setAuthCookies(res, user)
  return sanitizeUser(user)
}

const login = async ({ email, password }, res) => {
  const user = await User.findOne({ email }).select("+password +refreshTokenHash")
  if (!user || !(await user.comparePassword(password))) {
    const error = new Error("Invalid email or password")
    error.statusCode = 401
    throw error
  }
  if (user.isBlocked) {
    const error = new Error("Account is blocked")
    error.statusCode = 403
    throw error
  }

  await setAuthCookies(res, user)
  return sanitizeUser(user)
}

const refresh = async (refreshToken, res) => {
  if (!refreshToken) {
    const error = new Error("Refresh token missing")
    error.statusCode = 401
    throw error
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
  const user = await User.findById(decoded.id).select("+refreshTokenHash")
  if (!user || user.tokenVersion !== decoded.tokenVersion || !(await bcrypt.compare(refreshToken, user.refreshTokenHash || ""))) {
    const error = new Error("Invalid refresh token")
    error.statusCode = 401
    throw error
  }

  const tokens = await setAuthCookies(res, user)
  return { user: sanitizeUser(user), accessToken: tokens.accessToken }
}

const logout = async (userId, res) => {
  if (userId) {
    await User.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: "" }, $inc: { tokenVersion: 1 } })
  }
  res.clearCookie("accessToken", cookieOptions)
  res.clearCookie("refreshToken", cookieOptions)
}

const forgotPassword = async (email) => {
  const user = await User.findOne({ email })
  if (!user) return
  const token = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })
  await emailService.sendPasswordResetEmail(user, token)
}

const resetPassword = async ({ token, password }) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password")

  if (!user) {
    const error = new Error("Invalid or expired reset token")
    error.statusCode = 400
    throw error
  }

  user.password = password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  user.tokenVersion += 1
  await user.save()
}

const verifyEmail = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  })

  if (!user) {
    const error = new Error("Invalid or expired verification token")
    error.statusCode = 400
    throw error
  }

  user.isEmailVerified = true
  user.emailVerificationToken = undefined
  user.emailVerificationExpires = undefined
  await user.save({ validateBeforeSave: false })
  return sanitizeUser(user)
}

const googleLogin = async ({ credential }, res) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    const error = new Error("Google OAuth client ID is not configured")
    error.statusCode = 503
    throw error
  }
  if (!credential) {
    const error = new Error("Google credential is required")
    error.statusCode = 422
    throw error
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  })
  const googlePayload = ticket.getPayload()
  const email = googlePayload.email
  const name = googlePayload.name
  const googleId = googlePayload.sub

  let user = await User.findOne({ email })
  if (!user) {
    user = await User.create({
      name: name || email.split("@")[0],
      email,
      password: crypto.randomBytes(24).toString("hex"),
      googleId,
      isEmailVerified: true,
    })
  } else {
    user.googleId = googleId || user.googleId
    user.isEmailVerified = true
    await user.save({ validateBeforeSave: false })
  }

  await setAuthCookies(res, user)
  return sanitizeUser(user)
}

const sendOtp = async ({ destination, channel = "email" }) => {
  if (!destination) {
    const error = new Error("Email or phone number is required")
    error.statusCode = 422
    throw error
  }

  const normalizedEmail = channel === "email" ? destination.toLowerCase() : undefined
  const query = channel === "email" ? { email: normalizedEmail } : { phone: destination }
  let user = await User.findOne(query).select("+otpHash")
  if (!user) {
    user = await User.create({
      name: "Aesthetx Client",
      email: normalizedEmail || `${destination.replace(/\D/g, "")}@phone.aesthetx.local`,
      phone: channel === "phone" ? destination : undefined,
      password: crypto.randomBytes(24).toString("hex"),
      isEmailVerified: channel === "phone",
    })
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000))
  user.otpHash = await bcrypt.hash(otp, 12)
  user.otpExpires = Date.now() + 10 * 60 * 1000
  await user.save({ validateBeforeSave: false })

  if (channel === "email") {
    await emailService.sendMail({
      to: user.email,
      subject: "Your Aesthetx Flow login OTP",
      html: `<p>Your login OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    })
  } else await smsService.sendOtpSms({ to: destination, otp })

  return { destination, channel }
}

const verifyOtp = async ({ destination, otp, channel = "email" }, res) => {
  const normalizedEmail = channel === "email" ? destination.toLowerCase() : undefined
  const query = channel === "email" ? { email: normalizedEmail } : { phone: destination }
  const user = await User.findOne({ ...query, otpExpires: { $gt: Date.now() } }).select("+otpHash")

  if (!user || !(await bcrypt.compare(otp, user.otpHash || ""))) {
    const error = new Error("Invalid or expired OTP")
    error.statusCode = 400
    throw error
  }

  user.otpHash = undefined
  user.otpExpires = undefined
  if (channel === "email") user.isEmailVerified = true
  await user.save({ validateBeforeSave: false })
  await setAuthCookies(res, user)
  return sanitizeUser(user)
}

module.exports = {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  googleLogin,
  sendOtp,
  verifyOtp,
  sanitizeUser,
}
