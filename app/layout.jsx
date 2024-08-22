import "./globals.css"

import { getUserFromCookie } from "../lib/getUser"
import Header from "../components/Header"

export const metadata = {
  title: "OurHaikuApp"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container mx-auto p-10">{children}</main>
        <footer className="text-gray-400 text-center text-xs py-5">
          <p>Copyright © {new Date().getFullYear()} - All right reserved.</p>
        </footer>
      </body>
    </html>
  )
}
