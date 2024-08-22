import HaikuForm from "@/components/HaikuForm"
import cloudinary from "cloudinary"
import { justDecodeCookie } from "@/lib/getUser"
import { redirect } from "next/navigation"

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARYKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
})

async function getSignature() {
  const cookieUser = await justDecodeCookie()
  if (!cookieUser) {
    return {}
  }

  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp
    },
    cloudinaryConfig.api_secret
  )

  return { timestamp, signature }
}

export default async function Page() {
  const cookieUser = await justDecodeCookie()
  if (!cookieUser) {
    return redirect("/")
  }

  const data = await getSignature()

  return <HaikuForm action="create" haiku={{}} timestamp={data.timestamp} signature={data.signature} />
}
