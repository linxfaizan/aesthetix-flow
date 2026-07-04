import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-100 bg-white px-6 pb-32 pt-8 text-zinc-500">
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[30px] font-black uppercase tracking-[0.18em] text-zinc-950/[0.04]">
        Aesthetx Flow
      </div>
      <div className="relative z-10 grid gap-8">
        <div>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Aesthetx Flow" className="h-8 w-8 object-contain" />
            <span className="text-sm font-black uppercase tracking-[0.2em] text-black">Aesthetx Flow</span>
          </div>
          <p className="mt-3 max-w-[280px] text-[9px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-zinc-400">
            The art of minimalism in streetwear and utility.
          </p>
        </div>
        <div className="border-t border-zinc-100 pt-6">
          <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-400">Join the flow</span>
          <form className="mt-3 flex gap-2 border-b border-zinc-200 py-1 focus-within:border-black">
            <input className="flex-1 bg-transparent py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-black outline-none placeholder:text-zinc-400" placeholder="Enter email address" />
            <button className="px-2 text-[9px] font-black uppercase tracking-widest text-zinc-500" type="submit">
              Join
            </button>
          </form>
          <span className="mt-2 block text-[7.5px] tracking-wider text-zinc-500">Subscribe for early access and launch alerts.</span>
        </div>
        <div className="grid grid-cols-2 gap-8 border-t border-zinc-100 pt-6">
          <div className="grid gap-3">
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-400">Index</span>
            <div className="grid gap-2 text-[9px] font-semibold uppercase tracking-wider">
              <Link to="/shop">Shop collection</Link>
              <Link to="/cart">Shopping bag</Link>
              <Link to="/orders">Order history</Link>
            </div>
          </div>
          <div className="grid gap-3">
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-zinc-400">Client</span>
            <div className="grid gap-2 text-[9px] font-semibold uppercase tracking-wider">
              <Link to="/login">Account</Link>
              <Link to="/profile">Wishlist</Link>
              <Link to="/checkout">Checkout</Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t border-zinc-100 pt-5 text-[8px] font-semibold uppercase tracking-widest text-zinc-500">
          <span>(c) 2026 Aesthetx Flow</span>
          <span>Est. in India</span>
        </div>
      </div>
    </footer>
  )
}
