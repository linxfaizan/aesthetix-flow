const express = require("express")
const reviewController = require("../controllers/reviewController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", reviewController.listReviews)
router.post("/", protect, reviewController.createReview)
router.delete("/:id", protect, reviewController.deleteReview)

module.exports = router
