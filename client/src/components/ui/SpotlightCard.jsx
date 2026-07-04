export default function SpotlightCard({ children, className = "" }) {
  return (
    <div className={`group relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/75 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#d2a85d]/20 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
