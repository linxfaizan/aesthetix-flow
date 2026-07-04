import { NavLink } from "react-router-dom"
import { BarChart3, Boxes, LayoutDashboard, ShoppingCart, Users } from "lucide-react"
import { adminLinks } from "../../utils/constants"
import BrandLogo from "../BrandLogo/BrandLogo"

const icons = {
  Dashboard: LayoutDashboard,
  Products: Boxes,
  Orders: ShoppingCart,
  Users,
  Analytics: BarChart3,
}

export default function Sidebar() {
  return (
    <aside className="border-b border-white/10 bg-[#171513] text-white lg:min-h-screen lg:border-b-0 lg:border-r">
      <div className="sticky top-0 p-5">
        <NavLink to="/" className="mb-8 block">
          <BrandLogo className="text-white" />
        </NavLink>
        <nav className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-1">
          {adminLinks.map((link) => {
            const Icon = icons[link.label]
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-[#c7a15a] text-[#171513]" : "text-[#d8d0c4] hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} /> {link.label}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
