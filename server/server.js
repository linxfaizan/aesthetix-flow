require("dotenv").config()
const app = require("./app")
const connectDB = require("./config/db")

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Failed to start server", error)
    process.exit(1)
  })

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection", error)
  process.exit(1)
})
