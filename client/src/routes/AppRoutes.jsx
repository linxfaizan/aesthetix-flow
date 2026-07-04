import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import CustomerLayout from "../layouts/CustomerLayout"
import AdminLayout from "../layouts/AdminLayout"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import Loader from "../components/Loader/Loader"

const Home = lazy(() => import("../pages/Home/Home"))
const Shop = lazy(() => import("../pages/Shop/Shop"))
const Product = lazy(() => import("../pages/Product/Product"))
const Cart = lazy(() => import("../pages/Cart/Cart"))
const Checkout = lazy(() => import("../pages/Checkout/Checkout"))
const Login = lazy(() => import("../pages/Login/Login"))
const Register = lazy(() => import("../pages/Register/Register"))
const Profile = lazy(() => import("../pages/Profile/Profile"))
const Orders = lazy(() => import("../pages/Orders/Orders"))
const Dashboard = lazy(() => import("../admin/Dashboard/Dashboard"))
const AdminProducts = lazy(() => import("../admin/Products/Products"))
const AdminOrders = lazy(() => import("../admin/Orders/Orders"))
const AdminUsers = lazy(() => import("../admin/Users/Users"))
const Analytics = lazy(() => import("../admin/Analytics/Analytics"))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute requireAdmin />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
