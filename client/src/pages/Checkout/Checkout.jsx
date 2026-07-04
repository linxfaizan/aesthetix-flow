import { useState } from "react"
import { CreditCard, Truck } from "lucide-react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import { useCart } from "../../hooks/useCart"
import { orderService } from "../../services/orderService"
import { paymentService } from "../../services/paymentService"
import { formatPrice } from "../../utils/formatPrice"
import { validateAddress } from "../../utils/validators"

export default function Checkout() {
  const { items, subtotal, shipping, tax, total, clearCart } = useCart()
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", postalCode: "" })
  const [payment, setPayment] = useState("cod")
  const [errors, setErrors] = useState({})
  const [placed, setPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [isPlacing, setIsPlacing] = useState(false)

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const placeOrder = async (event) => {
    event.preventDefault()
    const nextErrors = validateAddress(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setIsPlacing(true)
    try {
      const payload = {
        items: items.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          size: item.size,
        })),
        paymentMethod: payment,
        shippingAddress: {
          fullName: form.name,
          phone: form.phone,
          line1: form.address,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: "India",
        },
      }
      const data = await orderService.create(payload)
      const order = data.order

      if (payment === "razorpay") {
        await paymentService.loadRazorpayScript()
        const paymentData = await paymentService.createRazorpayOrder(order._id)
        await new Promise((resolve, reject) => {
          const checkout = new window.Razorpay({
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: paymentData.razorpayOrder.amount,
            currency: paymentData.razorpayOrder.currency,
            name: "Aesthetx Flow",
            description: order.orderNumber,
            order_id: paymentData.razorpayOrder.id,
            handler: async (response) => {
              try {
                await paymentService.verifyRazorpayPayment(response)
                resolve()
              } catch (error) {
                reject(error)
              }
            },
            prefill: {
              name: form.name,
              email: form.email,
              contact: form.phone,
            },
            theme: { color: "#171513" },
          })
          checkout.on("payment.failed", (response) => reject(new Error(response.error.description)))
          checkout.open()
        })
      }

      setOrderNumber(order?.orderNumber || "")
      clearCart()
      setPlaced(true)
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsPlacing(false)
    }
  }

  if (placed) {
    return (
      <div className="mx-auto grid min-h-[65vh] max-w-3xl place-items-center px-4 py-10 text-center">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black text-[#171513]">Order placed</h1>
          <p className="mt-3 text-[#72695e]">Your order {orderNumber && <strong>{orderNumber}</strong>} is saved and ready in order history.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Checkout" }]} />
      <h1 className="mt-8 text-4xl font-black text-[#171513]">Checkout</h1>
      <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="grid gap-6">
          <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-bold"><Truck size={20} /> Shipping information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name" value={form.name} error={errors.name} onChange={(event) => updateField("name", event.target.value)} />
              <Input label="Email" value={form.email} error={errors.email} onChange={(event) => updateField("email", event.target.value)} />
              <Input label="Phone" value={form.phone} error={errors.phone} onChange={(event) => updateField("phone", event.target.value)} />
              <Input label="Address" className="sm:col-span-2" value={form.address} error={errors.address} onChange={(event) => updateField("address", event.target.value)} />
              <Input label="City" value={form.city} error={errors.city} onChange={(event) => updateField("city", event.target.value)} />
              <Input label="State" value={form.state} error={errors.state} onChange={(event) => updateField("state", event.target.value)} />
              <Input label="Postal code" value={form.postalCode} error={errors.postalCode} onChange={(event) => updateField("postalCode", event.target.value)} />
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-bold"><CreditCard size={20} /> Payment method</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: "cod", label: "Cash on delivery", icon: Truck },
                { value: "razorpay", label: "Razorpay online", icon: CreditCard },
              ].map((method) => {
                const Icon = method.icon
                return (
                  <button key={method.value} type="button" onClick={() => setPayment(method.value)} className={`flex items-center gap-3 rounded-2xl border p-4 text-left font-semibold ${payment === method.value ? "border-[#171513] bg-[#171513] text-white" : "border-black/10"}`}>
                    <Icon size={18} /> {method.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>
        <aside className="h-fit rounded-[1.5rem] border border-black/10 bg-white p-5">
          <h2 className="text-xl font-bold">Order summary</h2>
          <div className="mt-5 grid gap-3">
            {items.map((item) => (
              <div key={item.key} className="flex justify-between gap-4 text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 border-t border-black/10 pt-5 text-sm text-[#5d554b]">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{formatPrice(tax)}</span></div>
          </div>
          <div className="mt-5 flex justify-between text-lg font-black">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          {errors.submit && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{errors.submit}</p>}
          <Button type="submit" className="mt-5 w-full" disabled={!items.length || isPlacing}>
            {isPlacing ? "Placing order..." : "Place order"}
          </Button>
        </aside>
      </form>
    </div>
  )
}
