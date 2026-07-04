require("dotenv").config()
const mongoose = require("mongoose")
const connectDB = require("../config/db")
const User = require("../models/User")
const ROLES = require("../constants/roles")

const seedAdmin = async () => {
  await connectDB()
  const email = "admin@aesthetxflow.com"
  const existing = await User.findOne({ email })
  if (!existing) {
    await User.create({
      name: "Aesthetx Flow Admin",
      email,
      password: "Admin123!",
      role: ROLES.ADMIN,
      isEmailVerified: true,
    })
    console.log("Admin user seeded")
  } else {
    console.log("Admin user already exists")
  }
  await mongoose.disconnect()
}

seedAdmin().catch((error) => {
  console.error(error)
  process.exit(1)
})
