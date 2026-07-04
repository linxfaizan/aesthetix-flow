import { ArrowUpRight, DollarSign, Package, ShoppingBag, Users } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import Button from "../../components/Button/Button"
import SpotlightCard from "../../components/ui/SpotlightCard"
import { orders, products, revenueData, users } from "../../utils/constants"
import { formatPrice } from "../../utils/formatPrice"

const stats = [
  { label: "Revenue", value: "$84.2K", change: "+18.4%", icon: DollarSign },
  { label: "Orders", value: "388", change: "+10.1%", icon: ShoppingBag },
  { label: "Products", value: products.length, change: "Live", icon: Package },
  { label: "Customers", value: users.length, change: "+6.2%", icon: Users },
]

export default function Dashboard() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Admin</p>
          <h1 className="mt-2 text-4xl font-black text-[#171513]">Dashboard</h1>
        </div>
        <Button>Quick action</Button>
      </div>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <SpotlightCard key={stat.label}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#72695e]">{stat.label}</p>
                  <p className="mt-2 text-3xl font-black text-[#171513]">{stat.value}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                    <ArrowUpRight size={14} /> {stat.change}
                  </p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#171513] text-white">
                  <Icon size={20} />
                </div>
              </div>
            </SpotlightCard>
          )
        })}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <SpotlightCard className="min-h-[360px]">
          <h2 className="mb-5 text-xl font-bold">Revenue overview</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#c7a15a" stopOpacity={0.65} />
                    <stop offset="95%" stopColor="#c7a15a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5dccf" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatPrice(value)} />
                <Area type="monotone" dataKey="revenue" stroke="#8b6f43" fill="url(#revenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>
        <SpotlightCard>
          <h2 className="mb-5 text-xl font-bold">Recent orders</h2>
          <div className="grid gap-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl bg-[#f7f2ea] p-4">
                <div className="flex justify-between gap-4">
                  <span className="font-bold">{order.id}</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
                <p className="mt-1 text-sm text-[#72695e]">{order.status}</p>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {["Create product drop", "Review VIP orders", "Export monthly report"].map((action) => (
          <Button key={action} variant="secondary" className="justify-between rounded-2xl bg-white p-5">
            {action} <ArrowUpRight size={18} />
          </Button>
        ))}
      </section>
    </div>
  )
}
