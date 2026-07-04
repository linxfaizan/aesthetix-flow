import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import Button from "../../components/Button/Button"
import { users as seedUsers } from "../../utils/constants"
import { formatPrice } from "../../utils/formatPrice"

export default function Users() {
  const [users, setUsers] = useState(seedUsers)
  const [query, setQuery] = useState("")

  const filteredUsers = useMemo(
    () => users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase())),
    [query, users],
  )

  const updateUser = (id, updates) => {
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, ...updates } : user)))
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Clients</p>
      <h1 className="mt-2 text-4xl font-black text-[#171513]">Users</h1>
      <label className="relative mt-6 block max-w-xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#72695e]" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search users" className="min-h-12 w-full rounded-full border border-black/10 bg-white pl-11 pr-4 outline-none" />
      </label>
      <div className="mt-6 grid gap-4">
        {filteredUsers.map((user) => (
          <article key={user.id} className="grid gap-4 rounded-[1.5rem] bg-white p-5 shadow-sm lg:grid-cols-[1fr_170px_170px_190px] lg:items-center">
            <div>
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p className="text-sm text-[#72695e]">{user.email} - Lifetime spend {formatPrice(user.spend)}</p>
            </div>
            <select value={user.role} onChange={(event) => updateUser(user.id, { role: event.target.value })} className="min-h-11 rounded-full border border-black/10 px-4">
              <option>Customer</option>
              <option>Admin</option>
            </select>
            <span className={`rounded-full px-4 py-2 text-center text-sm font-bold ${user.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>{user.status}</span>
            <Button variant="secondary" onClick={() => updateUser(user.id, { status: user.status === "Active" ? "Blocked" : "Active" })}>
              {user.status === "Active" ? "Block" : "Unblock"}
            </Button>
          </article>
        ))}
      </div>
    </div>
  )
}
