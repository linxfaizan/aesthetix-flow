const jwt = require("jsonwebtoken")

const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id, tokenVersion: user.tokenVersion }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  })

module.exports = generateRefreshToken
