import BrandLogo from "../BrandLogo/BrandLogo"

export default function SplashLoader() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black text-white">
      <div className="grid justify-items-center gap-6">
        <div className="h-24 w-24 animate-pulse rounded-full border border-white/40 p-2">
          <div className="grid h-full w-full place-items-center rounded-full border border-white font-serif text-4xl italic">AF</div>
        </div>
        <BrandLogo className="text-white" />
      </div>
    </div>
  )
}
