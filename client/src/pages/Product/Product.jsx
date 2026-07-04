import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Minus, Plus, Star } from "lucide-react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Button from "../../components/Button/Button"
import Loader from "../../components/Loader/Loader"
import ProductCard from "../../components/ProductCard/ProductCard"
import { useCart } from "../../hooks/useCart"
import { productService } from "../../services/productService"
import { formatPrice } from "../../utils/formatPrice"

export default function Product() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [related, setRelated] = useState([])

  useEffect(() => {
    let isMounted = true
    productService.getById(id).then((item) => {
      if (!isMounted) return
      setProduct(item)
      setSelectedImage(item.gallery[0])
      setSelectedSize(item.sizes[0])
      setQuantity(1)
      productService.list(`?category=${item.categoryId}&limit=4`).then((items) => {
        setRelated(items.filter((relatedItem) => relatedItem.id !== item.id))
      })
    })

    return () => {
      isMounted = false
    }
  }, [id])

  if (!product) return <Loader />

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Shop", path: "/shop" }, { label: product.name }]} />
      <section className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 lg:grid-cols-[110px_1fr]">
          <div className="order-2 flex gap-3 overflow-auto lg:order-1 lg:flex-col">
            {product.gallery.map((image) => (
              <button key={image} type="button" onClick={() => setSelectedImage(image)} className={`shrink-0 rounded-2xl border p-1 ${selectedImage === image ? "border-[#8b6f43]" : "border-black/10"}`}>
                <img src={image} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
              </button>
            ))}
          </div>
          <img src={selectedImage} alt={product.name} className="order-1 aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl lg:order-2" />
        </div>
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">{product.category}</p>
          <h1 className="mt-2 text-4xl font-black text-[#171513] sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-[#72695e]">
            <span className="inline-flex items-center gap-1 font-semibold text-[#171513]">
              <Star size={16} fill="currentColor" /> {product.rating}
            </span>
            <span>{product.reviews} reviews</span>
          </div>
          <p className="mt-5 text-3xl font-black text-[#171513]">{formatPrice(product.price)}</p>
          <p className="mt-5 leading-7 text-[#5d554b]">{product.description}</p>

          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`grid h-11 min-w-11 place-items-center rounded-full border px-4 text-sm font-semibold ${
                    selectedSize === size ? "border-[#171513] bg-[#171513] text-white" : "border-black/10 bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-black/10 bg-white p-1">
              <Button variant="ghost" className="h-10 min-h-10 w-10 p-0" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                <Minus size={16} />
              </Button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <Button variant="ghost" className="h-10 min-h-10 w-10 p-0" onClick={() => setQuantity((value) => value + 1)}>
                <Plus size={16} />
              </Button>
            </div>
            <Button className="min-w-52" onClick={() => addToCart(product, { size: selectedSize, quantity })}>
              Add to cart
            </Button>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-black/10 bg-white p-5">
            <h2 className="text-lg font-bold text-[#171513]">Reviews</h2>
            <p className="mt-3 text-[#5d554b]">Clients praise the fabric hand, precise fit, and elevated packaging. Full review API coming soon.</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-3xl font-black text-[#171513]">Related products</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
