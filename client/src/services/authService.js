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

export const authService = {
  login: async ({ email, password }) => {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    return data.user
  },
  register: async ({ name, email, password }) => {
    const data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })
    return data.user
  },
  googleLogin: async ({ credential }) => {
    const data = await request("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    })
    return data.user
  },
  sendOtp: async ({ destination, channel }) =>
    request("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ destination, channel }),
    }),
  verifyOtp: async ({ destination, channel, otp }) => {
    const data = await request("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ destination, channel, otp }),
    })
    return data.user
  },
  logout: async () =>
    request("/auth/logout", {
      method: "POST",
      body: JSON.stringify({}),
    }),
}
