const { body, param } = require("express-validator")

const updateProfileValidator = [
  body("name").optional().trim().isLength({ min: 2, max: 80 }),
  body("phone").optional().trim().isLength({ min: 7, max: 20 }),
]

const addressValidator = [
  body("fullName").trim().notEmpty(),
  body("phone").trim().notEmpty(),
  body("line1").trim().notEmpty(),
  body("city").trim().notEmpty(),
  body("state").trim().notEmpty(),
  body("postalCode").trim().notEmpty(),
]

const mongoIdParam = [param("id").isMongoId()]

module.exports = { updateProfileValidator, addressValidator, mongoIdParam }
