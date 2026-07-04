import { Download } from "lucide-react"
import Button from "../../components/Button/Button"
import SpotlightCard from "../../components/ui/SpotlightCard"
import { orders } from "../../utils/constants"
import { formatPrice } from "../../utils/formatPrice"

export default function Orders() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Client history</p>
      <h1 className="mt-2 text-4xl font-black text-[#171513]">Orders</h1>
      <div className="mt-8 grid gap-5">
        {orders.map((order) => (
          <SpotlightCard key={order.id}>
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold">{order.id}</h2>
                  <span className="rounded-full bg-[#e9dcc5] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#6c5428]">{order.status}</span>
                </div>
                <p className="mt-2 text-sm text-[#72695e]">{order.date} - {order.items.join(", ")}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-4">
                  {order.tracking.map((step) => (
                    <div key={step} className={`rounded-full px-3 py-2 text-center text-xs font-bold ${step === order.status || order.status === "Delivered" ? "bg-[#171513] text-white" : "bg-[#f0e8db] text-[#72695e]"}`}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-left lg:text-right">
                <p className="text-2xl font-black">{formatPrice(order.total)}</p>
                <Button variant="secondary" className="mt-3"><Download size={16} /> Invoice</Button>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  )
}
