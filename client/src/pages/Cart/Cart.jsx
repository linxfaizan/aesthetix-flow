import { Link } from "react-router-dom"
import CartItem from "../../components/CartItem/CartItem"
import Button from "../../components/Button/Button"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import { useCart } from "../../hooks/useCart"
import { formatPrice } from "../../utils/formatPrice"

export default function Cart() {
  const { items, subtotal, shipping, tax, total, updateQuantity, removeItem } = useCart()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Cart" }]} />
      <h1 className="mt-8 text-4xl font-black text-[#171513]">Shopping cart</h1>
      {items.length === 0 ? (
        <div className="mt-8 grid min-h-96 place-items-center rounded-[2rem] border border-dashed border-black/20 bg-white p-8 text-center">
          <div>
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-[#72695e]">Start with the signature edit.</p>
            <Link to="/shop" className="mt-5 inline-flex">
              <Button>Shop collection</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="grid gap-4">
            {items.map((item) => (
              <CartItem key={item.key} item={item} onQuantityChange={updateQuantity} onRemove={removeItem} />
            ))}
          </section>
          <aside className="h-fit rounded-[1.5rem] border border-black/10 bg-white p-5">
            <h2 className="text-xl font-bold">Order summary</h2>
            <div className="mt-5 grid gap-3 text-sm text-[#5d554b]">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span></div>
              <div className="flex justify-between"><span>Estimated tax</span><span>{formatPrice(tax)}</span></div>
            </div>
            <label className="mt-5 grid gap-2 text-sm font-semibold">
              Coupon
              <input placeholder="ATELIER10" className="min-h-12 rounded-full border border-black/10 px-4 outline-none focus:border-[#8b6f43]" />
            </label>
            <div className="mt-5 flex justify-between border-t border-black/10 pt-5 text-lg font-black">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link to="/checkout" className="mt-5 block">
              <Button className="w-full">Proceed to checkout</Button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
