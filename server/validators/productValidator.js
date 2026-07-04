const { body, param } = require("express-validator")

const productIdValidator = [param("id").isMongoId()]

const productValidator = [
  body("name").trim().isLength({ min: 2, max: 120 }),
  body("description").trim().isLength({ min: 10 }),
  body("price").isFloat({ min: 0 }),
  body("category").isMongoId(),
  body("stock").optional().isInt({ min: 0 }),
  body("compareAtPrice").optional().isFloat({ min: 0 }),
  body("sizes").optional().isArray(),
  body("colors").optional().isArray(),
  body("variants").optional().isArray(),
]

module.exports = { productValidator, productIdValidator }
