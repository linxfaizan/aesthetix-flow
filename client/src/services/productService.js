const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const normalizeProduct = (product) => ({
  id: product._id || product.id,
  name: product.name,
  category: product.category?.name || product.category || "Clothing",
  categoryId: product.category?._id || product.category,
  price: product.price,
  originalPrice: product.compareAtPrice,
  rating: product.ratingAverage || product.rating || 4.8,
  reviews: product.ratingCount || product.reviews || 0,
  badge: product.isTrending ? "Trending" : product.isFeatured ? "Featured" : "New",
  image: product.images?.[0]?.url || product.image,
  gallery: product.images?.length ? product.images.map((image) => image.url) : product.gallery || [product.image],
  description: product.description,
  colors: product.colors?.length ? product.colors : ["Black"],
  sizes: product.sizes?.length ? product.sizes : ["S", "M", "L", "XL"],
  stock: product.stock || 0,
  tags: [product.isFeatured && "featured", product.isTrending && "trending"].filter(Boolean),
})

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.message || "Request failed")
  return payload.data || payload
}

const jsonRequest = (path, options = {}) =>
  request(path, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  })

export const productService = {
  async list(query = "") {
    const data = await request(`/products${query}`)
    return (data.products || []).map(normalizeProduct)
  },
  async getById(id) {
    const data = await request(`/products/${id}`)
    return normalizeProduct(data.product)
  },
  async categories() {
    const data = await request("/categories")
    return data.categories || []
  },
  async createCategory(category) {
    const data = await jsonRequest("/categories", {
      method: "POST",
      body: JSON.stringify(category),
    })
    return data.category
  },
  async create(product) {
    const formData = new FormData()
    formData.append("name", product.name)
    formData.append("description", product.description)
    formData.append("price", product.price)
    formData.append("stock", product.stock)
    formData.append("category", product.category)
    formData.append("isFeatured", "true")
    formData.append("isTrending", "true")
    product.sizes?.forEach((size) => formData.append("sizes[]", size))
    product.colors?.forEach((color) => formData.append("colors[]", color))
    if (product.imageFile) formData.append("images", product.imageFile)

    const data = await request("/products", { method: "POST", body: formData })
    return normalizeProduct(data.product)
  },
  async update(id, product) {
    const data = await jsonRequest(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    })
    return normalizeProduct(data.product)
  },
  async delete(id) {
    return request(`/products/${id}`, { method: "DELETE" })
  },
}
