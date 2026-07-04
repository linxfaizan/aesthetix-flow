export default function LogoLoop({ logos }) {
  const repeated = [...logos, ...logos]

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/70 py-6">
      <div className="logo-loop-track flex w-max items-center gap-12 px-6">
        {repeated.map((logo, index) => (
          <span key={`${logo}-${index}`} className="text-lg font-semibold uppercase tracking-[0.28em] text-[#6e624f]">
            {logo}
          </span>
        ))}
      </div>
    </div>
  )
}
