import { Link } from "react-router-dom"
import BrandLogo from "../BrandLogo/BrandLogo"

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#171513] text-[#f7f2ea]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <BrandLogo className="text-[#f7f2ea]" />
          <p className="mt-4 max-w-md text-sm leading-6 text-[#d8d0c4]">
            Aesthetx Flow Clothing creates refined street-luxe pieces, premium essentials, and client-ready drops.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.25em]">Shop</h3>
          <div className="grid gap-3 text-sm text-[#d8d0c4]">
            <Link to="/shop">New arrivals</Link>
            <Link to="/shop">Tailoring</Link>
            <Link to="/shop">Accessories</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.25em]">Client Care</h3>
          <div className="grid gap-3 text-sm text-[#d8d0c4]">
            <Link to="/orders">Orders</Link>
            <Link to="/profile">Account</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs uppercase tracking-[0.25em] text-[#bdb4a8]">
        (c) 2026 Aesthetx Flow Clothing
      </div>
    </footer>
  )
}
