const ROLES = require("../constants/roles")

const adminOnly = (req, res, next) => {
  if (req.user?.role !== ROLES.ADMIN) {
    const error = new Error("Admin access required")
    error.statusCode = 403
    return next(error)
  }
  return next()
}

module.exports = adminOnly
