import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ArrowRight, Lock, Mail, Phone, ShieldCheck } from "lucide-react"
import { GoogleLogin } from "@react-oauth/google"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import { useAuth } from "../../hooks/useAuth"
import { validateLogin } from "../../utils/validators"

export default function Login() {
  const { login, googleLogin, sendOtp, verifyOtp, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState("password")
  const [form, setForm] = useState({ email: "", password: "", phone: "", otp: "" })
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
    await sendOtp({ destination, channel })
    setOtpInfo("OTP sent. Check your inbox or phone.")
  }

  const submitOtp = async (event) => {
    event.preventDefault()
    const channel = mode === "phone-otp" ? "phone" : "email"
    const destination = channel === "phone" ? form.phone : form.email
    goNext(await verifyOtp({ destination, channel, otp: form.otp }))
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-2xl shadow-black/5 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative hidden min-h-[620px] overflow-hidden bg-black lg:block">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=86"
            alt="Aesthetx Flow editorial"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/60">Aesthetx Flow Clothing</p>
            <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-[0.06em]">Access the forward path.</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">Login to manage orders, wishlist drops, and checkout faster.</p>
          </div>
        </section>

        <section className="p-6 sm:p-8 lg:p-12">
          <div className="mx-auto max-w-md">
            <div className="grid justify-items-center text-center">
              <img src="/logo.png" alt="Aesthetx Flow" className="h-24 w-24 object-contain" />
              <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Member access</p>
              <h1 className="mt-2 text-3xl font-black uppercase tracking-[0.08em] text-black">Welcome back</h1>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-1 rounded-full bg-zinc-100 p-1 text-[10px] font-black uppercase tracking-[0.12em]">
              {[
                ["password", "Password", Lock],
                ["email-otp", "Email", Mail],
                ["phone-otp", "Phone", Phone],
              ].map(([value, label, Icon]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setMode(value)
                    setOtpInfo("")
                    setErrors({})
                  }}
                  className={`inline-flex min-h-10 items-center justify-center gap-1 rounded-full transition ${
                    mode === value ? "bg-black text-white" : "text-zinc-500 hover:text-black"
                  }`}
                >
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>

            {mode === "password" && (
              <form className="mt-7 grid gap-4" onSubmit={submitPassword}>
                <Input label="Email" value={form.email} error={errors.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
                <Input label="Password" type="password" value={form.password} error={errors.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
                <Button type="submit" disabled={isLoading} className="w-full">
                  Login <ArrowRight size={17} />
                </Button>
              </form>
            )}

            {mode !== "password" && (
              <form className="mt-7 grid gap-4" onSubmit={submitOtp}>
                {mode === "email-otp" ? (
                  <Input label="Gmail / email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
                ) : (
                  <Input label="Phone number" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
                )}
                <div className="grid grid-cols-[1fr_auto] gap-3">
                  <Input label="OTP" value={form.otp} onChange={(event) => setForm({ ...form, otp: event.target.value })} />
                  <Button variant="secondary" className="mt-7 shrink-0" onClick={requestOtp} type="button">
                    Send
                  </Button>
                </div>
                {otpInfo && <p className="rounded-2xl bg-zinc-100 p-3 text-sm font-semibold text-zinc-700">{otpInfo}</p>}
                <Button type="submit" disabled={isLoading} className="w-full">
                  <ShieldCheck size={18} /> Verify OTP
                </Button>
              </form>
            )}

            <div className="mt-5 rounded-2xl border border-zinc-100 bg-zinc-50 p-3">
              <GoogleLogin onSuccess={submitGoogle} onError={() => setErrors({ google: "Google login failed." })} width="100%" />
            </div>
            {errors.google && <p className="mt-3 text-center text-sm font-semibold text-red-700">{errors.google}</p>}

            <p className="mt-6 text-center text-sm text-zinc-500">
              New here? <Link to="/register" className="font-black text-black">Create an account</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
