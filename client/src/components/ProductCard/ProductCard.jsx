import { Link } from "react-router-dom"
import { ShoppingBag, Star } from "lucide-react"
import Button from "../Button/Button"
import ClickSpark from "../ui/ClickSpark"
import { useCart } from "../../hooks/useCart"
import { formatPrice } from "../../utils/formatPrice"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <ClickSpark className="h-full rounded-[1.5rem]">
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Link to={`/product/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-[#e8dfd1]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#171513]">
            {product.badge}
          </span>
        </Link>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div>
            <div className="mb-2 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-[#8b6f43]">
              <span>{product.category}</span>
              <span className="inline-flex items-center gap-1 normal-case tracking-normal text-[#72695e]">
                <Star size={14} fill="currentColor" /> {product.rating}
              </span>
            </div>
            <Link to={`/product/${product.id}`} className="text-lg font-semibold text-[#171513] hover:text-[#8b6f43]">
              {product.name}
            </Link>
          </div>
          <div className="mt-auto flex items-center justify-between gap-3">
            <p className="font-semibold text-[#171513]">{formatPrice(product.price)}</p>
            <Button variant="secondary" className="h-10 min-h-10 px-3" onClick={() => addToCart(product)}>
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </div>
      </article>
    </ClickSpark>
  )
}
