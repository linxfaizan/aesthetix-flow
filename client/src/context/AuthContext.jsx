import { useEffect, useMemo, useState } from "react"
import { authService } from "../services/authService"
import { AuthContext } from "./auth-context"

const storedUser = () => {
  try {
    return JSON.parse(localStorage.getItem("aesthetx_user"))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storedUser)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) localStorage.setItem("aesthetx_user", JSON.stringify(user))
    else localStorage.removeItem("aesthetx_user")
  }, [user])

  const login = async (payload) => {
    setIsLoading(true)
    try {
      const nextUser = await authService.login(payload)
      setUser(nextUser)
      return nextUser
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (payload) => {
    setIsLoading(true)
    try {
      const nextUser = await authService.register(payload)
      setUser(nextUser)
      return nextUser
    } finally {
      setIsLoading(false)
    }
  }

  const googleLogin = async (payload) => {
    setIsLoading(true)
    try {
      const nextUser = await authService.googleLogin(payload)
      setUser(nextUser)
      return nextUser
    } finally {
      setIsLoading(false)
    }
  }

  const sendOtp = (payload) => authService.sendOtp(payload)

  const verifyOtp = async (payload) => {
    setIsLoading(true)
    try {
      const nextUser = await authService.verifyOtp(payload)
      setUser(nextUser)
      return nextUser
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await authService.logout().catch(() => null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      isLoading,
      login,
      register,
      googleLogin,
      sendOtp,
      verifyOtp,
      logout,
    }),
    [isLoading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
