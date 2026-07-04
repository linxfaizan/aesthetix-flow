import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Phone, ShieldCheck } from "lucide-react"
import { GoogleLogin } from "@react-oauth/google"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import GradientText from "../../components/ui/GradientText"
import { useAuth } from "../../hooks/useAuth"
import { validateLogin } from "../../utils/validators"

export default function Login() {
  const { login, googleLogin, sendOtp, verifyOtp, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState("password")
  const [form, setForm] = useState({ email: "admin@aesthetxflow.com", password: "Admin123!", phone: "", otp: "", name: "Aesthetx Client" })
  const [errors, setErrors] = useState({})
  const [otpInfo, setOtpInfo] = useState("")

  const goNext = (user) => navigate(user.role === "admin" ? "/admin/dashboard" : location.state?.from?.pathname ?? "/profile")

  const submitPassword = async (event) => {
    event.preventDefault()
    const nextErrors = validateLogin(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    goNext(await login(form))
  }

  const submitGoogle = async (credentialResponse) => {
    goNext(await googleLogin({ credential: credentialResponse.credential }))
  }

  const requestOtp = async () => {
    const channel = mode === "phone-otp" ? "phone" : "email"
    const destination = channel === "phone" ? form.phone : form.email
    const data = await sendOtp({ destination, channel })
    setOtpInfo(data.message || "OTP sent.")
  }

  const submitOtp = async (event) => {
    event.preventDefault()
    const channel = mode === "phone-otp" ? "phone" : "email"
    const destination = channel === "phone" ? form.phone : form.email
    goNext(await verifyOtp({ destination, channel, otp: form.otp }))
  }

  return (
    <div className="luxury-gradient grid min-h-[80vh] place-items-center px-4 py-12">
      <div className="w-full max-w-lg rounded-[2rem] border border-black/10 bg-white/88 p-6 shadow-xl backdrop-blur">
        <GradientText as="h1" className="text-center text-4xl font-black">Aesthetx Flow login</GradientText>
        <p className="mt-2 text-center text-[#72695e]">Use password, Google, email OTP, or phone OTP.</p>

        <div className="mt-6 grid grid-cols-3 gap-2 rounded-full bg-[#f0e8db] p-1 text-xs font-bold sm:text-sm">
          {[
            ["password", "Password"],
            ["email-otp", "Email OTP"],
            ["phone-otp", "Phone OTP"],
          ].map(([value, label]) => (
            <button key={value} type="button" onClick={() => setMode(value)} className={`rounded-full px-3 py-2 ${mode === value ? "bg-[#171513] text-white" : "text-[#5d554b]"}`}>
              {label}
            </button>
          ))}
        </div>

        {mode === "password" && (
          <form className="mt-6 grid gap-4" onSubmit={submitPassword}>
            <Input label="Email" value={form.email} error={errors.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <Input label="Password" type="password" value={form.password} error={errors.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            <Button type="submit" disabled={isLoading}>Login</Button>
          </form>
        )}

        {mode !== "password" && (
          <form className="mt-6 grid gap-4" onSubmit={submitOtp}>
            {mode === "email-otp" ? (
              <Input label="Gmail / email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            ) : (
              <Input label="Phone number" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
            )}
            <div className="flex gap-3">
              <Input label="OTP" value={form.otp} onChange={(event) => setForm({ ...form, otp: event.target.value })} className="flex-1" />
              <Button variant="secondary" className="mt-7 shrink-0" onClick={requestOtp} type="button">
                Send
              </Button>
            </div>
            {otpInfo && <p className="rounded-2xl bg-[#f0e8db] p-3 text-sm font-semibold text-[#6c5428]">{otpInfo}</p>}
            <Button type="submit" disabled={isLoading}><ShieldCheck size={18} /> Verify OTP</Button>
          </form>
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="overflow-hidden rounded-full border border-black/10 bg-white px-2 py-1">
            <GoogleLogin onSuccess={submitGoogle} onError={() => setErrors({ google: "Google login failed." })} />
          </div>
          <Button variant="secondary" onClick={() => setMode("phone-otp")}><Phone size={18} /> Phone OTP</Button>
        </div>
        {errors.google && <p className="mt-3 text-center text-sm font-semibold text-red-700">{errors.google}</p>}
        <p className="mt-5 text-center text-sm text-[#72695e]">
          New here? <Link to="/register" className="font-semibold text-[#171513]">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
