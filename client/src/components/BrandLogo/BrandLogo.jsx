export default function BrandLogo({ compact = false, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img src="/logo.png" alt="Aesthetx Flow" className={compact ? "h-9 w-9 object-contain" : "h-11 w-11 object-contain"} />
      {!compact && (
        <span className="leading-none">
          <span className="block text-sm font-black uppercase tracking-[0.24em]">Aesthetx Flow</span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.35em] opacity-70">Clothing</span>
        </span>
      )}
    </span>
  )
}
