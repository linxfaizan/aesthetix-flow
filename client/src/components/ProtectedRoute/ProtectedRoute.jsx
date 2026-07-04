import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function ProtectedRoute({ requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />

  return <Outlet />
}
