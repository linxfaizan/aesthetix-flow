import { useEffect, useState } from "react"

export default function SplashLoader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => Math.min(value + 4, 100))
    }, 28)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_34%)]" />
      <div className="relative grid justify-items-center gap-5">
        <div className="splash-logo-pop grid h-32 w-32 place-items-center rounded-full border border-white/15 bg-white p-4 shadow-[0_24px_80px_rgba(255,255,255,0.18)] sm:h-40 sm:w-40">
          <img src="/logo.png" alt="Aesthetx Flow" className="splash-logo-clear h-full w-full object-contain" />
        </div>
        <div className="grid justify-items-center gap-2">
          <p className="text-[10px] font-black uppercase tracking-[0.36em] text-white/60">Loading collection</p>
          <p className="min-w-16 text-center text-2xl font-black tabular-nums tracking-[0.12em]">{progress}%</p>
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/15">
            <span className="block h-full rounded-full bg-white transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
