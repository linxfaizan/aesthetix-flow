import { X } from "lucide-react"
import Button from "../Button/Button"

export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[2rem] bg-[#fbfaf7] p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-[#171513]">{title}</h2>
          <Button aria-label="Close modal" variant="ghost" className="h-10 w-10 rounded-full p-0" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}
