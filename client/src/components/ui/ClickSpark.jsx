import { useState } from "react"

export default function ClickSpark({ children, className = "" }) {
  const [sparks, setSparks] = useState([])

  const addSpark = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const nextSpark = {
      id: crypto.randomUUID(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    setSparks((current) => [...current, nextSpark])
    window.setTimeout(() => {
      setSparks((current) => current.filter((spark) => spark.id !== nextSpark.id))
    }, 650)
  }

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={addSpark}>
      {children}
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="pointer-events-none absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-[#d2a85d]"
          style={{ left: spark.x, top: spark.y }}
        />
      ))}
    </div>
  )
}
