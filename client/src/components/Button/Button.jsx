const variants = {
  primary: "bg-[#171513] text-white hover:bg-[#2b2722] shadow-lg shadow-black/10",
  secondary: "bg-white text-[#171513] border border-black/10 hover:border-black/30",
  ghost: "text-[#171513] hover:bg-black/5",
  gold: "bg-[#c7a15a] text-[#171513] hover:bg-[#d7b671]",
}

export default function Button({ children, variant = "primary", className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
