import { useEffect, useState } from "react"
import SplashLoader from "./components/Loader/SplashLoader"
import AppRoutes from "./routes/AppRoutes"

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 950)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      {showSplash && <SplashLoader />}
      <AppRoutes />
    </>
  )
}
