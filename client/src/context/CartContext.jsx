import { useEffect, useMemo, useState } from "react"
import { CartContext } from "./cart-context"

const storedCart = () => {
  try {
    return JSON.parse(localStorage.getItem("aesthetx_cart")) ?? []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(storedCart)

  useEffect(() => {
    localStorage.setItem("aesthetx_cart", JSON.stringify(items))
  }, [items])

  const addToCart = (product, options = {}) => {
    setItems((current) => {
      const key = `${product.id}-${options.size ?? "One size"}`
      const existing = current.find((item) => item.key === key)
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + (options.quantity ?? 1) } : item,
        )
      }
      return [
        ...current,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: options.size ?? product.sizes?.[0] ?? "One size",
          quantity: options.quantity ?? 1,
        },
      ]
    })
  }

  const updateQuantity = (key, quantity) => {
    setItems((current) =>
      current
        .map((item) => (item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (key) => setItems((current) => current.filter((item) => item.key !== key))
  const clearCart = () => setItems([])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 18
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = useMemo(
    () => ({ items, count, subtotal, shipping, tax, total, addToCart, updateQuantity, removeItem, clearCart }),
    [count, items, shipping, subtotal, tax, total],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
