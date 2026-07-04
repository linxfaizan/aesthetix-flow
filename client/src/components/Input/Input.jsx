export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#34302a]">
      {label && <span>{label}</span>}
      <input
        className={`min-h-12 rounded-2xl border border-black/10 bg-white px-4 text-[#171513] outline-none transition placeholder:text-[#9a9287] focus:border-[#8b6f43] focus:ring-4 focus:ring-[#d2a85d]/20 ${className}`}
        {...props}
      />
      {error && <span className="text-xs font-semibold text-red-700">{error}</span>}
    </label>
  )
}
