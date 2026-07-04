export default function ScrollVelocity({ items }) {
  const repeated = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-black/10 bg-[#171513] py-4 text-[#f7f2ea]">
      <div className="scroll-velocity-track flex w-max items-center gap-8 whitespace-nowrap">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="text-sm font-semibold uppercase tracking-[0.35em] opacity-80">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
