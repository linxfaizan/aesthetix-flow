import { useMemo, useState } from "react"
import { Download, Eye, PackageCheck, Search, Truck } from "lucide-react"
import Button from "../../components/Button/Button"
import Modal from "../../components/Modal/Modal"
import SpotlightCard from "../../components/ui/SpotlightCard"
import { orders as seedOrders, users } from "../../utils/constants"
import { formatPrice } from "../../utils/formatPrice"

const statuses = ["Confirmed", "Prepared", "In transit", "Delivered", "Cancelled"]

export default function AdminOrders() {
  const [orders, setOrders] = useState(seedOrders)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [query, setQuery] = useState("")

  const filteredOrders = useMemo(
    () => orders.filter((order) => `${order.id} ${order.status} ${order.items.join(" ")}`.toLowerCase().includes(query.toLowerCase())),
    [orders, query],
  )

  const updateStatus = (id, status) => {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status } : order)))
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const openOrders = orders.filter((order) => order.status !== "Delivered").length

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Operations</p>
          <h1 className="mt-2 text-4xl font-black text-[#171513]">Order management</h1>
          <p className="mt-2 text-sm text-[#72695e]">Track orders, update delivery stages, inspect customer items, and download invoices.</p>
        </div>
        <Button variant="secondary"><Download size={18} /> Export orders</Button>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <SpotlightCard>
          <p className="text-sm font-semibold text-[#72695e]">Total order value</p>
          <p className="mt-2 text-3xl font-black">{formatPrice(totalRevenue)}</p>
        </SpotlightCard>
        <SpotlightCard>
          <p className="text-sm font-semibold text-[#72695e]">Open orders</p>
          <p className="mt-2 text-3xl font-black">{openOrders}</p>
        </SpotlightCard>
        <SpotlightCard>
          <p className="text-sm font-semibold text-[#72695e]">Ready to ship</p>
          <p className="mt-2 text-3xl font-black">{orders.filter((order) => order.status === "Prepared").length}</p>
        </SpotlightCard>
      </section>

      <label className="relative mt-6 block max-w-xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#72695e]" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order, status, or item" className="min-h-12 w-full rounded-full border border-black/10 bg-white pl-11 pr-4 outline-none" />
      </label>

      <div className="mt-6 grid gap-4">
        {filteredOrders.map((order, index) => (
          <article key={order.id} className="rounded-[1.5rem] bg-white p-5 shadow-sm">
            <div className="grid gap-5 lg:grid-cols-[1fr_220px_180px] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black text-[#171513]">{order.id}</h2>
                  <span className="rounded-full bg-[#f0e8db] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#6c5428]">{order.status}</span>
                </div>
                <p className="mt-2 text-sm text-[#72695e]">{users[index % users.length].name} - {order.items.join(", ")}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-4">
                  {order.tracking.map((step) => (
                    <span key={step} className={`rounded-full px-3 py-2 text-center text-xs font-bold ${step === order.status || order.status === "Delivered" ? "bg-[#171513] text-white" : "bg-[#f7f2ea] text-[#72695e]"}`}>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
              <select value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)} className="min-h-12 rounded-full border border-black/10 bg-[#fbfaf7] px-4 font-semibold outline-none">
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
              <div className="flex items-center justify-between gap-3 lg:justify-end">
                <p className="text-xl font-black">{formatPrice(order.total)}</p>
                <Button variant="ghost" className="h-10 min-h-10 px-3" onClick={() => setSelectedOrder({ ...order, customer: users[index % users.length] })}>
                  <Eye size={16} /> View
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal isOpen={Boolean(selectedOrder)} title="Order details" onClose={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <div className="grid gap-5">
            <div className="rounded-2xl bg-[#171513] p-5 text-white">
              <p className="text-sm uppercase tracking-[0.25em] text-[#d2a85d]">{selectedOrder.id}</p>
              <p className="mt-2 text-2xl font-black">{formatPrice(selectedOrder.total)}</p>
              <p className="mt-1 text-sm text-[#d8d0c4]">{selectedOrder.customer.name} - {selectedOrder.customer.email}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {selectedOrder.items.map((item) => <div key={item} className="rounded-2xl bg-[#f7f2ea] p-4 font-semibold"><PackageCheck className="mb-2 text-[#8b6f43]" />{item}</div>)}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button><Truck size={18} /> Mark shipped</Button>
              <Button variant="secondary"><Download size={18} /> Download invoice</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
