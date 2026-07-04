const mongoose = require("mongoose")
const slugGenerator = require("../utils/slugGenerator")

const variantSchema = new mongoose.Schema(
  {
    size: { type: String, required: true },
    color: { type: String, required: true },
    sku: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    price: { type: Number, min: 0 },
  },
  { _id: false },
)

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: String,
    alt: String,
  },
  { _id: false },
)

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    images: [imageSchema],
    variants: [variantSchema],
    sizes: [{ type: String }],
    colors: [{ type: String }],
    stock: { type: Number, default: 0, min: 0 },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0 },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true },
)

productSchema.index({ name: "text", description: "text", tags: "text" })

productSchema.pre("validate", function setSlug() {
  if (this.name && !this.slug) this.slug = slugGenerator(this.name)
})

module.exports = mongoose.model("Product", productSchema)
