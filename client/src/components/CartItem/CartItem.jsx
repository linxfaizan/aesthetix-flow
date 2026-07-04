import { Minus, Plus, Trash2 } from "lucide-react"
import Button from "../Button/Button"
import { formatPrice } from "../../utils/formatPrice"

export default function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <article className="grid gap-4 rounded-[1.5rem] border border-black/10 bg-white p-4 sm:grid-cols-[120px_1fr_auto]">
      <img src={item.image} alt={item.name} className="aspect-square w-full rounded-2xl object-cover sm:w-[120px]" />
      <div>
        <h3 className="text-lg font-semibold text-[#171513]">{item.name}</h3>
        <p className="mt-1 text-sm text-[#72695e]">Size {item.size}</p>
        <p className="mt-3 font-semibold">{formatPrice(item.price)}</p>
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="flex items-center rounded-full border border-black/10 bg-[#fbfaf7] p-1">
          <Button variant="ghost" className="h-9 min-h-9 w-9 p-0" onClick={() => onQuantityChange(item.key, item.quantity - 1)}>
            <Minus size={14} />
          </Button>
          <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
          <Button variant="ghost" className="h-9 min-h-9 w-9 p-0" onClick={() => onQuantityChange(item.key, item.quantity + 1)}>
            <Plus size={14} />
          </Button>
        </div>
        <Button variant="ghost" className="h-10 min-h-10 px-3 text-red-700" onClick={() => onRemove(item.key)}>
          <Trash2 size={16} /> Remove
        </Button>
      </div>
    </article>
  )
}
