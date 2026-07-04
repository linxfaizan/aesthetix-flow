const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const ROLES = require("../constants/roles")

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
    avatar: {
      url: String,
      publicId: String,
    },
    isEmailVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    refreshTokenHash: { type: String, select: false },
    tokenVersion: { type: Number, default: 0 },
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    otpHash: { type: String, select: false },
    otpExpires: Date,
    googleId: { type: String, index: true, sparse: true },
  },
  { timestamps: true },
)

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.createPasswordResetToken = function createPasswordResetToken() {
  const token = crypto.randomBytes(32).toString("hex")
  this.passwordResetToken = crypto.createHash("sha256").update(token).digest("hex")
  this.passwordResetExpires = Date.now() + 15 * 60 * 1000
  return token
}

userSchema.methods.createEmailVerificationToken = function createEmailVerificationToken() {
  const token = crypto.randomBytes(32).toString("hex")
  this.emailVerificationToken = crypto.createHash("sha256").update(token).digest("hex")
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000
  return token
}

module.exports = mongoose.model("User", userSchema)
