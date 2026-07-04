const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
})

export const formatPrice = (value) => currencyFormatter.format(value)
