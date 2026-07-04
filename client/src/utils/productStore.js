import { products as seedProducts } from "./constants"

const STORAGE_KEY = "aesthetx_products"

export const getProducts = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    return [...stored, ...seedProducts]
  } catch {
    return seedProducts
  }
}

export const saveProduct = (product) => {
  const current = getProducts().filter((item) => !seedProducts.some((seed) => seed.id === item.id))
  const exists = current.some((item) => item.id === product.id)
  const next = exists ? current.map((item) => (item.id === product.id ? product : item)) : [product, ...current]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event("aesthetx-products-updated"))
  return next
}

export const deleteProduct = (id) => {
  const current = getProducts().filter((item) => !seedProducts.some((seed) => seed.id === item.id))
  const next = current.filter((item) => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event("aesthetx-products-updated"))
  return next
}

export const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
