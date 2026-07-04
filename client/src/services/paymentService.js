const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.message || "Request failed")
  return payload.data || payload
}

const loadRazorpayScript = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error("Unable to load Razorpay checkout"))
    document.body.appendChild(script)
  })

export const paymentService = {
  createRazorpayOrder: (orderId) =>
    request("/payments/create-order", {
      method: "POST",
      body: JSON.stringify({ orderId }),
    }),
  verifyRazorpayPayment: (payment) =>
    request("/payments/verify", {
      method: "POST",
      body: JSON.stringify(payment),
    }),
  loadRazorpayScript,
}
