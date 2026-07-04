import { useEffect, useMemo, useState } from "react"
import { Camera, Plus, Search, Trash2 } from "lucide-react"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import Modal from "../../components/Modal/Modal"
import { formatPrice } from "../../utils/formatPrice"
import { productService } from "../../services/productService"

const emptyProduct = {
  name: "",
  category: "",
  price: "",
  stock: "10",
  description: "",
  imagePreview: "",
  imageFile: null,
}

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const loadData = async () => {
    const [nextProducts, nextCategories] = await Promise.all([
      productService.list("?limit=100"),
      productService.categories(),
    ])
    setProducts(nextProducts)
    setCategories(nextCategories)
  }

  useEffect(() => {
    let isMounted = true
    Promise.all([productService.list("?limit=100"), productService.categories()])
      .then(([nextProducts, nextCategories]) => {
        if (!isMounted) return
        setProducts(nextProducts)
        setCategories(nextCategories)
      })
      .catch((err) => {
        if (isMounted) setError(err.message)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => category === "All" || product.category === category)
        .filter((product) => product.name.toLowerCase().includes(query.toLowerCase())),
    [category, products, query],
  )

  const openAdd = () => setEditing({ ...emptyProduct, id: `p-${Date.now()}`, category: categories[0]?._id || "" })
  const closeModal = () => {
    setEditing(null)
    setError("")
  }

  const saveAdminProduct = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setError("")
    try {
      await productService.create({
        ...editing,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "White"],
      })
      await loadData()
      closeModal()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setEditing((current) => ({ ...current, imageFile: file, imagePreview: URL.createObjectURL(file) }))
  }

  const removeProduct = async (id) => {
    await productService.delete(id)
    await loadData()
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Inventory</p>
          <h1 className="mt-2 text-4xl font-black text-[#171513]">Add clothes</h1>
          <p className="mt-2 text-sm text-[#72695e]">Add a cloth photo, item type, title, pricing, and stock. Products save to MongoDB.</p>
        </div>
        <Button onClick={openAdd}><Plus size={18} /> Add cloth item</Button>
      </div>
      {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      <div className="mt-6 grid gap-3 rounded-[1.5rem] bg-white p-4 shadow-sm md:grid-cols-[1fr_220px]">
        <label className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#72695e]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="min-h-12 w-full rounded-full border border-black/10 pl-11 pr-4 outline-none" />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="min-h-12 rounded-full border border-black/10 px-4 outline-none">
          {["All", ...categories.map((item) => item.name)].map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
            <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8b6f43]">{product.category}</p>
              <h2 className="mt-2 text-lg font-black">{product.name}</h2>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-bold">{formatPrice(product.price)}</span>
                <Button variant="ghost" className="h-10 min-h-10 px-3 text-red-700" onClick={() => removeProduct(product.id)}>
                  <Trash2 size={16} /> Delete
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <Modal isOpen={Boolean(editing)} title="Add cloth item" onClose={closeModal}>
        {editing && (
          <form onSubmit={saveAdminProduct} className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium sm:col-span-2">
              Cloth photo
              <div className="grid min-h-48 place-items-center rounded-[1.5rem] border border-dashed border-black/20 bg-[#f7f2ea] p-4 text-center">
                {editing.imagePreview ? (
                  <img src={editing.imagePreview} alt="Preview" className="max-h-72 rounded-2xl object-cover" />
                ) : (
                  <div className="grid justify-items-center gap-2 text-[#72695e]">
                    <Camera />
                    <span>Upload product photo</span>
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handlePhoto} required />
            </label>
            <Input label="Title" value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} required />
            <Input label="Pricing" type="number" value={editing.price} onChange={(event) => setEditing({ ...editing, price: event.target.value })} required />
            <label className="grid gap-2 text-sm font-medium">
              Item type
              <select value={editing.category} onChange={(event) => setEditing({ ...editing, category: event.target.value })} className="min-h-12 rounded-2xl border border-black/10 px-4" required>
                {categories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
              </select>
            </label>
            <Input label="Stock" type="number" value={editing.stock} onChange={(event) => setEditing({ ...editing, stock: event.target.value })} required />
            <label className="grid gap-2 text-sm font-medium sm:col-span-2">
              Short description
              <textarea value={editing.description} onChange={(event) => setEditing({ ...editing, description: event.target.value })} className="min-h-24 rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#8b6f43]" required />
            </label>
            <Button type="submit" className="sm:col-span-2" disabled={isSaving}>{isSaving ? "Saving..." : "Save product"}</Button>
          </form>
        )}
      </Modal>
    </div>
  )
}
