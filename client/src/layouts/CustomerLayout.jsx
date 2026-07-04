import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import BottomNav from "../components/BottomNav/BottomNav"

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <div className="relative mx-auto min-h-screen w-full overflow-x-hidden bg-white">
        <Navbar />
        <main className="pb-24 md:pb-0">
          <Outlet />
        </main>
        <Footer />
        <BottomNav />
      </div>
    </div>
  )
}
