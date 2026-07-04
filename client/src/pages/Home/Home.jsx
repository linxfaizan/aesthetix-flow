import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { productService } from "../../services/productService"

const fallbackSlides = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=86",
]

const marqueeItems = [
  "New streetwear essentials just arrived",
  "COD and prepaid checkout available",
  "Fresh silhouettes for the forward path",
]

export default function Home() {
  const [catalog, setCatalog] = useState([])
  const [categories, setCategories] = useState(["All"])
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeSlide, setActiveSlide] = useState(0)
  const [query, setQuery] = useState("")

  useEffect(() => {
    Promise.all([productService.list("?limit=100"), productService.categories()])
      .then(([products, nextCategories]) => {
        setCatalog(products)
        setCategories(["All", ...nextCategories.map((category) => category.name)])
      })
      .catch(() => {
        setCatalog([])
        setCategories(["All"])
      })
  }, [])

  const slides = catalog.map((product) => product.image).filter(Boolean).slice(0, 3)
  const heroSlides = slides.length ? slides : fallbackSlides

  const visibleProducts = useMemo(
    () =>
      catalog
        .filter((product) => activeCategory === "All" || product.category === activeCategory)
        .filter((product) => product.name.toLowerCase().includes(query.toLowerCase())),
    [activeCategory, catalog, query],
  )

  const nextSlide = () => setActiveSlide((value) => (value + 1) % heroSlides.length)
  const previousSlide = () => setActiveSlide((value) => (value - 1 + heroSlides.length) % heroSlides.length)

  return (
    <div className="bg-white">
      <section className="border-b border-zinc-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <label className="flex items-center gap-2 rounded-full bg-zinc-50 px-4 py-2">
            <Search size={14} className="text-zinc-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-xs font-medium text-black outline-none placeholder:text-zinc-400"
            />
          </label>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`relative whitespace-nowrap pb-1 text-[9px] font-black uppercase tracking-[0.18em] transition ${
                activeCategory === category ? "text-black" : "text-zinc-400"
              }`}
            >
              {category}
              {activeCategory === category && <span className="absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full bg-black" />}
            </button>
          ))}
        </nav>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="group relative aspect-[4/5] overflow-hidden rounded-[2px] bg-zinc-100 md:aspect-[16/7]">
          {heroSlides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt={`Aesthetx Flow campaign ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
                index === activeSlide ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[8px] font-black uppercase tracking-[0.22em] text-black backdrop-blur">
            Aesthetx Flow
          </div>
          <div className="absolute bottom-9 left-4 right-4 text-white">
            <p className="text-[9px] font-black uppercase tracking-[0.26em] text-white/70">New season</p>
            <h1 className="mt-1 max-w-2xl text-3xl font-black uppercase leading-none tracking-[0.06em] md:text-6xl">Streetwear for the forward path.</h1>
          </div>
          <button
            type="button"
            onClick={previousSlide}
            className="absolute left-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/20 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/20 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-black/90 py-1 text-white">
            <div className="scroll-velocity-track flex w-max whitespace-nowrap text-[8.5px] font-black uppercase tracking-[0.2em]">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={`${item}-${index}`} className="mx-6">
                  {item} <span className="ml-6 text-zinc-500">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main id="shop-content" className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between py-2">
          <span className="text-[9px] font-black uppercase tracking-[0.26em] text-zinc-400">
            {activeCategory === "All" ? "All products" : activeCategory}
          </span>
          <span className="text-[9px] font-medium text-zinc-400">{visibleProducts.length} items</span>
        </div>
        {visibleProducts.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-5 xl:gap-y-8">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        ) : (
          <div className="grid min-h-56 place-items-center bg-zinc-50 text-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">No products</p>
              <p className="mt-2 text-xs text-zinc-500">Add items from the admin products page.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
