const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const compression = require("compression")
const hpp = require("hpp")
require("dotenv").config()

const { apiLimiter } = require("./middleware/rateLimitMiddleware")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
const sanitizeMongo = require("./middleware/sanitizeMiddleware")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const orderRoutes = require("./routes/orderRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const couponRoutes = require("./routes/couponRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const wishlistRoutes = require("./routes/wishlistRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes")
const addressRoutes = require("./routes/addressRoutes")
const cartRoutes = require("./routes/cartRoutes")
const adminRoutes = require("./routes/adminRoutes")

const app = express()

app.set("trust proxy", 1)
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(
  express.json({
    limit: "1mb",
    verify: (req, res, buffer) => {
      req.rawBody = buffer.toString()
    },
  }),
)
app.use(express.urlencoded({ extended: true, limit: "1mb" }))
app.use(cookieParser())
app.use(sanitizeMongo)
app.use(hpp())
app.use(compression())
app.use(apiLimiter)

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"))
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Aesthetx Flow API is running",
    docs: {
      health: "/api/health",
      auth: "/api/auth",
      products: "/api/products",
      categories: "/api/categories",
      cart: "/api/cart",
      orders: "/api/orders",
      admin: "/api/admin/dashboard",
    },
  })
})

app.get("/favicon.ico", (req, res) => res.status(204).end())

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Aesthetx Flow API is healthy" })
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/coupons", couponRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/addresses", addressRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/admin", adminRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
