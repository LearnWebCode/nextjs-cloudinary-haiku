import RegisterForm from "../components/RegisterForm"
import Dashboard from "@/components/Dashboard"
import { getUserFromCookie } from "../lib/getUser"

export default async function Page() {
  const realUser = await getUserFromCookie()

  return (
    <div>
      {realUser && <Dashboard user={realUser._id} />}
      {!realUser && <RegisterForm />}
    </div>
  )
}
