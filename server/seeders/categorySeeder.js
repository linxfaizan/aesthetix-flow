require("dotenv").config()
const mongoose = require("mongoose")
const connectDB = require("../config/db")
const Category = require("../models/Category")
const slugGenerator = require("../utils/slugGenerator")

const categories = [
  { name: "Outerwear", description: "Cashmere coats and refined outer layers." },
  { name: "Tailoring", description: "Sharp blazers, trousers, and suiting." },
  { name: "Knitwear", description: "Premium merino and cashmere knits." },
  { name: "Dresses", description: "Silk occasion and everyday dresses." },
  { name: "Accessories", description: "Leather goods and finishing pieces." },
  { name: "Footwear", description: "Modern premium shoes." },
]

const seedCategories = async () => {
  await connectDB()
  await Category.bulkWrite(
    categories.map((category) => ({
      updateOne: {
        filter: { name: category.name },
        update: { $set: { ...category, slug: slugGenerator(category.name) } },
        upsert: true,
      },
    })),
  )
  console.log("Categories seeded")
  await mongoose.disconnect()
}

seedCategories().catch((error) => {
  console.error(error)
  process.exit(1)
})
