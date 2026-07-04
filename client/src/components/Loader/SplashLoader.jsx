import BrandLogo from "../BrandLogo/BrandLogo"

export default function SplashLoader() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black text-white">
      <div className="grid justify-items-center gap-6">
        <div className="grid h-28 w-28 animate-pulse place-items-center rounded-full border border-white/20 bg-white p-3">
          <img src="/logo.png" alt="Aesthetx Flow" className="h-full w-full object-contain" />
        </div>
        <BrandLogo className="text-white" />
      </div>
    </div>
  )
}
