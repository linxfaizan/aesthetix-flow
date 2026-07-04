const createTransporter = require("../config/nodemailer")

const sendMail = async ({ to, subject, html, text }) => {
  const transporter = createTransporter()

  if (!transporter) {
    const error = new Error("Email SMTP credentials are not configured")
    error.statusCode = 503
    throw error
  }

  return transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html,
    text,
  })
}

const sendWelcomeEmail = (user) =>
  sendMail({
    to: user.email,
    subject: "Welcome to Aesthetx Flow",
    html: `<p>Hello ${user.name}, welcome to Aesthetx Flow.</p>`,
  })

const sendPasswordResetEmail = (user, token) => {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
  return sendMail({
    to: user.email,
    subject: "Reset your Aesthetx Flow password",
    html: `<p>Reset your password using this secure link: <a href="${url}">${url}</a></p>`,
  })
}

const sendVerificationEmail = (user, token) => {
  const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`
  return sendMail({
    to: user.email,
    subject: "Verify your Aesthetx Flow email",
    html: `<p>Verify your email using this link: <a href="${url}">${url}</a></p>`,
  })
}

const sendOrderConfirmationEmail = (user, order) =>
  sendMail({
    to: user.email,
    subject: `Order confirmed ${order.orderNumber}`,
    html: `<p>Your order ${order.orderNumber} has been received.</p>`,
  })

const sendShippingEmail = (user, order) =>
  sendMail({
    to: user.email,
    subject: `Order shipped ${order.orderNumber}`,
    html: `<p>Your order ${order.orderNumber} is on its way.</p>`,
  })

module.exports = {
  sendMail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendOrderConfirmationEmail,
  sendShippingEmail,
}
