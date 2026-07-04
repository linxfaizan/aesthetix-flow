const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  async get(data) {
    await delay()
    return structuredClone(data)
  },
  async post(data) {
    await delay()
    return { success: true, data }
  },
  async put(data) {
    await delay()
    return { success: true, data }
  },
  async delete() {
    await delay()
    return { success: true }
  },
}
