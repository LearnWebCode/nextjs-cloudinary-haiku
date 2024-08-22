import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { getCollection } from "./db.js"

async function getUser(id) {
  const collection = await getCollection("users")
  const user = await collection.findOne({ _id: ObjectId.createFromHexString(id) })
  return user
}

export async function getUserFromCookie() {
  console.log("============ get user from cookie function just executed!!!!!")
  const theCookie = cookies().get("ourcoolapp")?.value
  if (theCookie) {
    try {
      const decoded = jwt.verify(cookies().get("ourcoolapp")?.value, process.env.JWTSECRET)
      const user = await getUser(decoded.userId)
      return user
    } catch (err) {
      return null
    }
  }
}

export async function justDecodeCookie() {
  const theCookie = cookies().get("ourcoolapp")?.value
  if (theCookie) {
    try {
      const decoded = jwt.verify(cookies().get("ourcoolapp")?.value, process.env.JWTSECRET)
      return decoded
    } catch (err) {
      return null
    }
  }
}
