import { useEffect, useMemo, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import ProductCard from "../../components/ProductCard/ProductCard"
import Button from "../../components/Button/Button"
import { categories } from "../../utils/constants"
import { productService } from "../../services/productService"

const PAGE_SIZE = 6

export default function Shop() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("featured")
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState([])

  useEffect(() => {
    productService.list("?limit=100").then(setProducts).catch(() => setProducts([]))
  }, [])

  const filteredProducts = useMemo(() => {
    const result = products
      .filter((product) => category === "All" || product.category === category)
      .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price
      if (sort === "price-high") return b.price - a.price
      if (sort === "rating") return b.rating - a.rating
      return Number(b.tags.includes("featured")) - Number(a.tags.includes("featured"))
    })
  }, [category, products, search, sort])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const visibleProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const updateCategory = (value) => {
    setCategory(value)
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Shop" }]} />
      <div className="mt-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Collection</p>
          <h1 className="mt-2 text-4xl font-black text-[#171513] sm:text-5xl">Shop refined essentials</h1>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_180px] lg:w-[520px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#72695e]" size={18} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
              placeholder="Search pieces"
              className="min-h-12 w-full rounded-full border border-black/10 bg-white pl-11 pr-4 outline-none focus:border-[#8b6f43]"
            />
          </label>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="min-h-12 rounded-full border border-black/10 bg-white px-4 outline-none">
            <option value="featured">Featured</option>
            <option value="price-low">Price low</option>
            <option value="price-high">Price high</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-[1.5rem] border border-black/10 bg-white p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold">
            <SlidersHorizontal size={18} /> Filters
          </div>
          <div className="grid gap-2">
            {["All", ...categories].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => updateCategory(item)}
                className={`rounded-full px-4 py-2 text-left text-sm font-semibold transition ${
                  category === item ? "bg-[#171513] text-white" : "bg-[#f7f2ea] text-[#5d554b] hover:bg-[#eee5d8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>
        <section>
          {visibleProducts.length === 0 ? (
            <div className="grid min-h-80 place-items-center rounded-[1.5rem] border border-dashed border-black/20 bg-white text-center">
              <div>
                <h2 className="text-2xl font-bold text-[#171513]">No pieces found</h2>
                <p className="mt-2 text-[#72695e]">Try another category or search term.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button variant="secondary" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
              Previous
            </Button>
            <span className="text-sm font-semibold text-[#72695e]">
              Page {page} of {totalPages}
            </span>
            <Button variant="secondary" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}>
              Next
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
