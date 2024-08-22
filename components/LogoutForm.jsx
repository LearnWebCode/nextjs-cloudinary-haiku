import { logout } from "../actions/userController"

export default function LogoutForm() {
  return (
    <form action={logout} className="btn btn-neutral">
      <button>Log Out</button>
    </form>
  )
}
