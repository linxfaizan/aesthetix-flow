const { body } = require("express-validator")

const registerValidator = [
  body("name").trim().isLength({ min: 2, max: 80 }),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6, max: 128 }),
  body("phone").optional().trim().isLength({ min: 7, max: 20 }),
]

const loginValidator = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6, max: 128 }),
]

const forgotPasswordValidator = [body("email").isEmail().normalizeEmail()]

const resetPasswordValidator = [
  body("token").isString().notEmpty(),
  body("password").isLength({ min: 6, max: 128 }),
]

const changePasswordValidator = [
  body("currentPassword").isLength({ min: 6, max: 128 }),
  body("newPassword").isLength({ min: 6, max: 128 }),
]

const googleValidator = [body("credential").isString().notEmpty()]

const sendOtpValidator = [
  body("destination").trim().notEmpty(),
  body("channel").isIn(["email", "phone"]),
]

const verifyOtpValidator = [
  body("destination").trim().notEmpty(),
  body("channel").isIn(["email", "phone"]),
  body("otp").isLength({ min: 6, max: 6 }).isNumeric(),
]

module.exports = {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
  googleValidator,
  sendOtpValidator,
  verifyOtpValidator,
}
