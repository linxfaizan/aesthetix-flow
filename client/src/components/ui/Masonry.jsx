export default function Masonry({ items }) {
  return (
    <div className="masonry-grid">
      {items.map((item) => (
        <article key={item.title} className="masonry-item overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
          <img src={item.image} alt={item.title} className="h-auto w-full object-cover" />
          <div className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">{item.eyebrow}</p>
            <h3 className="mt-2 text-xl font-semibold text-[#171513]">{item.title}</h3>
          </div>
        </article>
      ))}
    </div>
  )
}
