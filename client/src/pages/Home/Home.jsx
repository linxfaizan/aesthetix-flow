import { useEffect, useState } from "react"
import { ArrowRight, Mail, ShieldCheck, Sparkles, Truck } from "lucide-react"
import { Link } from "react-router-dom"
import Button from "../../components/Button/Button"
import ProductCard from "../../components/ProductCard/ProductCard"
import GradientText from "../../components/ui/GradientText"
import GradientBackground from "../../components/ui/GradientBackground"
import ScrollVelocity from "../../components/ui/ScrollVelocity"
import LogoLoop from "../../components/ui/LogoLoop"
import Masonry from "../../components/ui/Masonry"
import SpotlightCard from "../../components/ui/SpotlightCard"
import { brandPartners, testimonials } from "../../utils/constants"
import { productService } from "../../services/productService"

const editorialTiles = [
  {
    title: "Outerwear with presence",
    eyebrow: "Capsule 01",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Soft tailoring",
    eyebrow: "Atelier",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Evening silk",
    eyebrow: "Occasion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=82",
  },
]

export default function Home() {
  const [catalog, setCatalog] = useState([])

  useEffect(() => {
    productService.list("?limit=8").then(setCatalog).catch(() => setCatalog([]))
  }, [])

  const featured = catalog.filter((product) => product.tags.includes("featured")).slice(0, 4)
  const trending = catalog.filter((product) => product.tags.includes("trending")).slice(0, 6)

  return (
    <div>
      <GradientBackground className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.86fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-[#6d604c]">
              <Sparkles size={14} /> Spring atelier edit
            </p>
            <GradientText as="h1" className="text-5xl font-black leading-[0.95] tracking-normal sm:text-7xl lg:text-8xl">
              Aesthetx Flow clothing for the modern street-luxe wardrobe.
            </GradientText>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#5d554b] sm:text-lg">
              Shop premium drops, clean silhouettes, everyday statement pieces, and client-ready essentials.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#171513] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition duration-300 hover:bg-[#2b2722]"
              >
                Shop the collection <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </Link>
              <Link to="/shop" className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 text-sm font-semibold">
                New arrivals
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=84"
              alt="Model wearing premium neutral fashion"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/82 p-4 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8b6f43]">Editorial pick</p>
              <p className="mt-1 text-xl font-semibold text-[#171513]">Premium fits, limited drops, easy checkout.</p>
            </div>
          </div>
        </div>
      </GradientBackground>

      <ScrollVelocity items={["Cash on delivery available", "Razorpay-ready checkout", "Limited premium drops", "Fast order tracking"]} />

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        {[
          ["Premium quality", "Curated fabrics and polished finishing.", ShieldCheck],
          ["Quick delivery", "Shipping-ready order flow and tracking.", Truck],
          ["Fresh drops", "Admin can add new clothes instantly.", Sparkles],
        ].map(([title, copy, Icon]) => (
          <div key={title} className="flex items-start gap-4 rounded-[1.5rem] border border-black/10 bg-white p-5">
            <Icon className="text-[#8b6f43]" />
            <div>
              <h2 className="font-bold text-[#171513]">{title}</h2>
              <p className="mt-1 text-sm text-[#72695e]">{copy}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Featured products</p>
            <h2 className="mt-2 text-3xl font-black text-[#171513] sm:text-4xl">The signature edit</h2>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-[#171513]">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[#eee5d8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Categories</p>
            <h2 className="mt-2 text-3xl font-black text-[#171513] sm:text-4xl">Built around the wardrobe</h2>
          </div>
          <Masonry items={editorialTiles} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LogoLoop logos={brandPartners} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Trending now</p>
          <h2 className="mt-2 text-3xl font-black text-[#171513] sm:text-4xl">Client favorites</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="dark-gradient px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <SpotlightCard key={testimonial.name} className="bg-white/8 text-white">
              <p className="text-lg leading-8 text-[#f4eadc]">"{testimonial.quote}"</p>
              <p className="mt-5 font-semibold">{testimonial.name}</p>
              <p className="text-sm text-[#d3c7b7]">{testimonial.role}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-black/10 bg-white p-6 text-center shadow-sm sm:p-10">
          <Mail className="mx-auto mb-4 text-[#8b6f43]" />
          <h2 className="text-3xl font-black text-[#171513]">Join the private list</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#72695e]">Early access to capsule drops, styling appointments, and atelier notes.</p>
          <form className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input className="min-h-12 flex-1 rounded-full border border-black/10 px-5 outline-none focus:border-[#8b6f43]" placeholder="Email address" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
