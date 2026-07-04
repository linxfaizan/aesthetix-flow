const express = require("express")
const addressController = require("../controllers/addressController")
const protect = require("../middleware/authMiddleware")
const validate = require("../middleware/validateMiddleware")
const { addressValidator, mongoIdParam } = require("../validators/userValidator")

const router = express.Router()

router.use(protect)
router.get("/", addressController.listAddresses)
router.post("/", addressValidator, validate, addressController.createAddress)
router.patch("/:id", mongoIdParam, validate, addressController.updateAddress)
router.delete("/:id", mongoIdParam, validate, addressController.deleteAddress)

module.exports = router
