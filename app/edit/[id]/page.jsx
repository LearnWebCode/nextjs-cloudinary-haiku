import { getCollection } from "@/lib/db"
import HaikuForm from "@/components/HaikuForm"
import { ObjectId } from "mongodb"
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

async function getDoc(id) {
  const haikusCollection = await getCollection("haikus")
  const result = await haikusCollection.findOne({ _id: ObjectId.createFromHexString(id) })
  return result
}

export default async function Page(props) {
  const cookieUser = await justDecodeCookie()
  if (!cookieUser) {
    return redirect("/")
  }

  const doc = await getDoc(props.params.id)
  doc._id = doc._id.toString()
  doc.author = doc.author.toString()

  const data = await getSignature()

  return (
    <div>
      <HaikuForm action="edit" haiku={doc} timestamp={data.timestamp} signature={data.signature} />
    </div>
  )
}
