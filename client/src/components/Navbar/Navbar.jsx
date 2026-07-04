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
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#fbfaf7]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-[#171513]">
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
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
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" className="h-10 min-h-10 w-10 p-0" aria-label="Search">
            <Search size={18} />
          </Button>
          <Link to="/login" aria-label="Account" className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5">
            <User size={18} />
          </Link>
          <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full bg-[#171513] text-white" aria-label="Cart">
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#c7a15a] px-1 text-xs font-bold text-[#171513]">
                {count}
              </span>
            )}
          </Link>
        </div>
        <Button variant="ghost" className="h-10 min-h-10 w-10 p-0 md:hidden" onClick={() => setIsOpen((value) => !value)} aria-label="Toggle menu">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      {isOpen && (
        <div className="border-t border-black/10 bg-[#fbfaf7] px-4 py-4 md:hidden">
          <nav className="grid gap-3">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass} onClick={() => setIsOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>
                <Shield size={16} /> Admin
              </NavLink>
            )}
            <Link to="/cart" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-2 font-semibold">
              <ShoppingBag size={18} /> Cart ({count})
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
