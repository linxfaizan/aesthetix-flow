const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500

  if (process.env.NODE_ENV !== "test") {
    console.error(err)
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server error",
    errors: err.errors,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  })
}

module.exports = { notFound, errorHandler }
