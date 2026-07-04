import { Heart, MapPin, Settings, UserRound } from "lucide-react"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import SpotlightCard from "../../components/ui/SpotlightCard"
import { useAuth } from "../../hooks/useAuth"

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6f43]">Account</p>
          <h1 className="mt-2 text-4xl font-black text-[#171513]">Profile</h1>
        </div>
        <Button variant="secondary" onClick={logout}>Sign out</Button>
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <SpotlightCard>
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold"><UserRound size={20} /> User details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" defaultValue={user?.name} />
            <Input label="Email" defaultValue={user?.email} />
            <Input label="Role" defaultValue={user?.role} />
            <Input label="Client tier" defaultValue="Private client" />
          </div>
          <Button className="mt-5">Save profile</Button>
        </SpotlightCard>
        <div className="grid gap-5">
          <SpotlightCard>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold"><MapPin size={20} /> Saved addresses</h2>
            <p className="text-[#72695e]">21 Rue Saint-Honore, Paris. Add/edit address API placeholder.</p>
          </SpotlightCard>
          <SpotlightCard>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold"><Heart size={20} /> Wishlist</h2>
            <p className="text-[#72695e]">Silk Column Dress, Sculpted Mule Heel.</p>
          </SpotlightCard>
          <SpotlightCard>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold"><Settings size={20} /> Account settings</h2>
            <p className="text-[#72695e]">Notifications, privacy, and password controls are ready for backend connection.</p>
          </SpotlightCard>
        </div>
      </div>
    </div>
  )
}
