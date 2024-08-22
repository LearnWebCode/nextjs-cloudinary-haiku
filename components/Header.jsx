import Link from "next/link"
import { getUserFromCookie } from "../lib/getUser"
import LogoutForm from "./LogoutForm"

function VisitorHeader() {
  return (
    <li>
      <Link href="/login" className="btn btn-neutral">
        Log In
      </Link>
    </li>
  )
}

function LoggedInHeader() {
  return (
    <>
      <li className="mr-3">
        <Link href="/create-haiku" className="btn btn-primary">
          New Haiku
        </Link>
      </li>
      <li>
        <LogoutForm />
      </li>
    </>
  )
}

export default async function Header() {
  const realUser = await getUserFromCookie()

  return (
    <div className="bg-gray-100 shadow-md">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              OurHaikuApp
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              {realUser && <LoggedInHeader />}
              {!realUser && <VisitorHeader />}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
