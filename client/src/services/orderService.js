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

export const orderService = {
  list: () => request("/orders"),
  create: (order) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify(order),
    }),
  updateStatus: (id, status) =>
    request(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
}
