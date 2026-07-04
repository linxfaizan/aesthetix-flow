require("dotenv").config()
const mongoose = require("mongoose")
const connectDB = require("../config/db")
const Product = require("../models/Product")
const Category = require("../models/Category")
const Coupon = require("../models/Coupon")
const slugGenerator = require("../utils/slugGenerator")

const seedProducts = async () => {
  await connectDB()
  const categories = await Category.find()
  const categoryMap = new Map(categories.map((category) => [category.name, category._id]))

  const products = [
    {
      name: "Cashmere Wrap Coat",
      description: "Double-faced cashmere blend with a relaxed waist tie and hand-finished seams.",
      price: 64900,
      compareAtPrice: 78900,
      category: categoryMap.get("Outerwear"),
      stock: 18,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Camel", "Ivory", "Charcoal"],
      isFeatured: true,
      isTrending: true,
      images: [{ url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=82" }],
      variants: [{ size: "M", color: "Camel", sku: "LUM-COAT-CAM-M", stock: 8 }],
    },
    {
      name: "Silk Column Dress",
      description: "Fluid silk satin dress cut on the bias with a refined neckline and soft drape.",
      price: 44900,
      category: categoryMap.get("Dresses"),
      stock: 22,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Champagne", "Ink", "Sage"],
      isFeatured: true,
      images: [{ url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=82" }],
      variants: [{ size: "S", color: "Champagne", sku: "LUM-DRESS-CH-S", stock: 10 }],
    },
    {
      name: "Tuxedo Blazer",
      description: "Structured wool blazer with satin lapels, covered buttons, and a precise shoulder.",
      price: 57900,
      category: categoryMap.get("Tailoring"),
      stock: 16,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Black", "Ivory"],
      isFeatured: true,
      isTrending: true,
      images: [{ url: "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=900&q=82" }],
      variants: [{ size: "M", color: "Black", sku: "LUM-BLAZER-BLK-M", stock: 6 }],
    },
  ]

  await Product.bulkWrite(
    products.map((product) => ({
      updateOne: {
        filter: { name: product.name },
        update: { $set: { ...product, slug: slugGenerator(product.name), isActive: true } },
        upsert: true,
      },
    })),
  )

  await Coupon.updateOne(
    { code: "ATELIER10" },
    { $setOnInsert: { code: "ATELIER10", type: "percentage", value: 10, minOrderAmount: 5000, maxDiscount: 5000 } },
    { upsert: true },
  )

  console.log("Products and coupon seeded")
  await mongoose.disconnect()
}

seedProducts().catch((error) => {
  console.error(error)
  process.exit(1)
})
