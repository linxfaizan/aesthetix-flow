const jwt = require("jsonwebtoken")
const User = require("../models/User")

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization
    const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : req.cookies.accessToken

    if (!token) {
      const error = new Error("Authentication required")
      error.statusCode = 401
      throw error
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password -refreshTokenHash")

    if (!user || user.isBlocked) {
      const error = new Error("Invalid or blocked account")
      error.statusCode = 401
      throw error
    }

    req.user = user
    next()
  } catch (error) {
    error.statusCode = error.statusCode || 401
    next(error)
  }
}

module.exports = protect
