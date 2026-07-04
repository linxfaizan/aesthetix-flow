const { body, param } = require("express-validator")

const orderIdValidator = [param("id").isMongoId()]

const createOrderValidator = [
  body("items").isArray({ min: 1 }),
  body("items.*.product").isMongoId(),
  body("items.*.quantity").isInt({ min: 1 }),
  body("paymentMethod").isIn(["razorpay", "cod"]),
  body("shippingAddress.line1").notEmpty(),
  body("shippingAddress.city").notEmpty(),
  body("shippingAddress.state").notEmpty(),
  body("shippingAddress.postalCode").notEmpty(),
]

module.exports = { createOrderValidator, orderIdValidator }
