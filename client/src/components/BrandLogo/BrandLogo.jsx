export default function BrandLogo({ compact = false, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-full border border-current font-serif text-xl italic leading-none">
        AF
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block text-sm font-black uppercase tracking-[0.28em]">Aesthetx Flow</span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.35em] opacity-70">Clothing</span>
        </span>
      )}
    </span>
  )
}
