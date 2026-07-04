import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, Search, Shield, ShoppingBag, User, X } from "lucide-react"
import Button from "../Button/Button"
import BrandLogo from "../BrandLogo/BrandLogo"
import { navLinks } from "../../utils/constants"
import { useCart } from "../../hooks/useCart"
import { useAuth } from "../../hooks/useAuth"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { count } = useCart()
  const { isAdmin } = useAuth()

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition hover:text-[#8b6f43] ${isActive ? "text-[#171513]" : "text-[#72695e]"}`

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/95 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-black">
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin/dashboard" className={linkClass}>
              Admin
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-2 pr-12 lg:pr-0">
          <Button variant="ghost" className="h-10 min-h-10 w-10 p-0" aria-label="Search">
            <Search size={15} strokeWidth={2.8} />
          </Button>
          <Link to="/login" aria-label="Account" className="hidden h-10 w-10 place-items-center rounded-full hover:bg-black/5 sm:grid">
            <User size={18} />
          </Link>
          <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white text-black shadow-sm" aria-label="Cart">
            <ShoppingBag size={18} strokeWidth={2.6} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full border border-white bg-black px-1 text-[10px] font-black text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
        <Button variant="ghost" className="absolute right-3 top-3 h-10 min-h-10 w-10 p-0 lg:hidden" onClick={() => setIsOpen((value) => !value)} aria-label="Toggle menu">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      {isOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-zinc-100 bg-zinc-950 px-5 py-6 text-white shadow-2xl">
          <nav className="grid gap-5">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className="text-3xl font-black uppercase tracking-[0.12em]" onClick={() => setIsOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin/dashboard" className="inline-flex items-center gap-2 text-2xl font-black uppercase tracking-[0.12em]" onClick={() => setIsOpen(false)}>
                <Shield size={16} /> Admin
              </NavLink>
            )}
            <Link to="/cart" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-2 text-2xl font-black uppercase tracking-[0.12em]">
              <ShoppingBag size={18} /> Cart ({count})
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
