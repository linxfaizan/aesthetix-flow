import { NavLink } from "react-router-dom"
import { Heart, Home, Package, ShoppingBag, User } from "lucide-react"
import { useCart } from "../../hooks/useCart"

const links = [
  { label: "Shop", path: "/", icon: Home },
  { label: "Wishlist", path: "/profile", icon: Heart },
  { label: "Bag", path: "/cart", icon: ShoppingBag },
  { label: "Orders", path: "/orders", icon: Package },
  { label: "Account", path: "/login", icon: User },
]

export default function BottomNav() {
  const { count } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto border-t border-zinc-100 bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.04)] md:hidden">
      <div className="grid grid-cols-5 px-2 py-2">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative grid justify-items-center gap-1 rounded-xl px-1 py-2 text-[9px] font-black uppercase tracking-[0.16em] transition ${
                  isActive ? "text-black" : "text-zinc-400 hover:text-black"
                }`
              }
            >
              <span className="relative">
                <Icon size={16} strokeWidth={2.4} />
                {link.label === "Bag" && count > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[8px] text-white">
                    {count}
                  </span>
                )}
              </span>
              <span>{link.label === "Bag" && count ? `Bag ${count}` : link.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
