import { Link } from "react-router-dom"
import { ShoppingBag, Star } from "lucide-react"
import Button from "../Button/Button"
import ClickSpark from "../ui/ClickSpark"
import { useCart } from "../../hooks/useCart"
import { formatPrice } from "../../utils/formatPrice"

export default function ProductCard({ product, compact = false }) {
  const { addToCart } = useCart()

  return (
    <ClickSpark className="h-full rounded-[2px]">
      <article className="group flex h-full flex-col bg-white">
        <Link to={`/product/${product.id}`} className="relative block aspect-[4/5] overflow-hidden rounded-[2px] bg-zinc-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[7px] font-black uppercase tracking-[0.18em] text-black">
            {product.badge}
          </span>
        </Link>
        <div className={compact ? "flex flex-1 flex-col gap-2 pt-2" : "flex flex-1 flex-col gap-4 p-4"}>
          <div>
            <div className="mb-1 flex items-center justify-between gap-2 text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400">
              <span>{product.category}</span>
              <span className="inline-flex items-center gap-1 normal-case tracking-normal text-zinc-400">
                <Star size={11} fill="currentColor" /> {product.rating}
              </span>
            </div>
            <Link to={`/product/${product.id}`} className={compact ? "line-clamp-2 text-[11px] font-black uppercase leading-tight tracking-[0.08em] text-black" : "text-lg font-semibold text-[#171513] hover:text-[#8b6f43]"}>
              {product.name}
            </Link>
          </div>
          <div className="mt-auto flex items-center justify-between gap-2">
            <p className={compact ? "text-[11px] font-black text-black" : "font-semibold text-[#171513]"}>{formatPrice(product.price)}</p>
            <Button variant="secondary" className={compact ? "h-8 min-h-8 rounded-full px-2 text-[8px]" : "h-10 min-h-10 px-3"} onClick={() => addToCart(product)}>
              <ShoppingBag size={16} />
              <span className={compact ? "hidden" : "hidden sm:inline"}>Add</span>
            </Button>
          </div>
        </div>
      </article>
    </ClickSpark>
  )
}
