const twilio = require("twilio")

const getTwilioClient = () => {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_FROM_PHONE) {
    const error = new Error("Twilio SMS credentials are not configured")
    error.statusCode = 503
    throw error
  }

  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
}

const sendOtpSms = ({ to, otp }) => {
  const client = getTwilioClient()
  return client.messages.create({
    from: process.env.TWILIO_FROM_PHONE,
    to,
    body: `Your Aesthetx Flow login OTP is ${otp}. It expires in 10 minutes.`,
  })
}

module.exports = { sendOtpSms }
