const slugify = require("slugify")

const slugGenerator = (value) =>
  slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  })

module.exports = slugGenerator
