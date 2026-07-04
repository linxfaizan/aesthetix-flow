import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import SpotlightCard from "../../components/ui/SpotlightCard"
import { products, revenueData, users } from "../../utils/constants"
import { formatPrice } from "../../utils/formatPrice"

export default function Analytics() {
  const bestSellers = products.slice(0, 5).map((product, index) => ({
    name: product.name.split(" ").slice(0, 2).join(" "),
    sales: 120 - index * 16,
  }))

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Insights</p>
      <h1 className="mt-2 text-4xl font-black text-[#171513]">Analytics</h1>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <SpotlightCard className="min-h-[360px]">
          <h2 className="mb-5 text-xl font-bold">Sales trends</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5dccf" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatPrice(value)} />
                <Line type="monotone" dataKey="revenue" stroke="#171513" strokeWidth={3} dot={{ fill: "#c7a15a" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>
        <SpotlightCard className="min-h-[360px]">
          <h2 className="mb-5 text-xl font-bold">Best-selling products</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bestSellers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5dccf" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#c7a15a" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ["Returning customer rate", "42%"],
          ["Average order value", "$610"],
          ["Active users", users.length],
        ].map(([label, value]) => (
          <SpotlightCard key={label}>
            <p className="text-sm font-semibold text-[#72695e]">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </SpotlightCard>
        ))}
      </div>
    </div>
  )
}
