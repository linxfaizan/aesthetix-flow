import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-[#72695e]" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-[#171513]">
        Home
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <ChevronRight size={14} />
          {item.path ? (
            <Link to={item.path} className="hover:text-[#171513]">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[#171513]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
