import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f4eee3] lg:grid lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}
