const mongoose = require("mongoose")
const slugGenerator = require("../utils/slugGenerator")

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: String,
    image: {
      url: String,
      publicId: String,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

categorySchema.pre("validate", function setSlug() {
  if (this.name && !this.slug) this.slug = slugGenerator(this.name)
})

module.exports = mongoose.model("Category", categorySchema)
