export default function Loader({ label = "Curating collection" }) {
  return (
    <div className="grid min-h-56 place-items-center text-center">
      <div>
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#d2a85d] border-t-transparent" />
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b6f43]">{label}</p>
      </div>
    </div>
  )
}
