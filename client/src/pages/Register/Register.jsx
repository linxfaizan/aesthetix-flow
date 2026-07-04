import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import GradientText from "../../components/ui/GradientText"
import { useAuth } from "../../hooks/useAuth"
import { validateRegister } from "../../utils/validators"

export default function Register() {
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", password: "", acceptedTerms: false })
  const [errors, setErrors] = useState({})

  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = validateRegister(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    await register(form)
    navigate("/profile")
  }

  return (
    <div className="luxury-gradient grid min-h-[80vh] place-items-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-black/10 bg-white/82 p-6 shadow-xl backdrop-blur">
        <GradientText as="h1" className="text-center text-4xl font-black">Create account</GradientText>
        <form className="mt-6 grid gap-4" onSubmit={submit}>
          <Input label="Full name" value={form.name} error={errors.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <Input label="Email" value={form.email} error={errors.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <Input label="Password" type="password" value={form.password} error={errors.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          <label className="flex items-start gap-3 text-sm text-[#5d554b]">
            <input type="checkbox" checked={form.acceptedTerms} onChange={(event) => setForm({ ...form, acceptedTerms: event.target.checked })} className="mt-1" />
            I agree to Aesthetx Flow membership terms and client care communications.
          </label>
          {errors.acceptedTerms && <p className="text-xs font-semibold text-red-700">{errors.acceptedTerms}</p>}
          <Button type="submit" disabled={isLoading}>Register</Button>
        </form>
        <p className="mt-5 text-center text-sm text-[#72695e]">
          Already a client? <Link to="/login" className="font-semibold text-[#171513]">Login</Link>
        </p>
      </div>
    </div>
  )
}
