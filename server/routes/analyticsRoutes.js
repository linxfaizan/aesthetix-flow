const express = require("express")
const analyticsController = require("../controllers/analyticsController")
const protect = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/adminMiddleware")

const router = express.Router()

router.use(protect, adminOnly)
router.get("/dashboard", analyticsController.dashboard)
router.get("/", analyticsController.analytics)

module.exports = router
