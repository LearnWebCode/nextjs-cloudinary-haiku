"use server"

import { getCollection } from "../lib/db.js"
import validator from "validator"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"

export const login = async function (prevState, formData) {
  // look up if username exists in database
  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password")
  }

  if (typeof ourUser.username != "string") ourUser.username = ""
  if (typeof ourUser.password != "string") ourUser.password = ""

  const collection = await getCollection("users")
  const user = await collection.findOne({ username: ourUser.username })

  if (!user) {
    return {
      success: false,
      message: "Invalid username / password."
    }
  }

  // if user exists check the password for a match
  const matchOrNot = bcrypt.compareSync(ourUser.password, user.password)

  if (!matchOrNot) {
    return {
      success: false,
      message: "Invalid username / password."
    }
  }

  // if it's a match give them a logged in cookie and redirect
  // create the cookie value using JWT
  const ourTokenValue = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, userId: user._id, "skyColor": "blue" }, process.env.JWTSECRET)

  // log the user in by giving them a cookie
  cookies().set("ourcoolapp", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24
  })

  redirect("/")
}

export const logout = async function () {
  cookies().delete("ourcoolapp")
  redirect("/")
}

export const register = async function (prevState, formData) {
  const errors = {}

  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password")
  }

  if (typeof ourUser.username != "string") ourUser.username = ""
  if (typeof ourUser.password != "string") ourUser.password = ""

  ourUser.username = ourUser.username.trim()
  ourUser.password = ourUser.password.trim()

  // username validation checks
  if (!validator.isAlphanumeric(ourUser.username)) errors.username = "Username can only contain letters and numbers."
  if (ourUser.username.length < 3) errors.username = "Username must be at least 3 characters."
  if (ourUser.username.length > 30) errors.username = "Username cannot exceed 30 characters."
  if (ourUser.username == "") errors.username = "You must provide a username."

  // see if username already exists or not
  const usersCollection = await getCollection("users")
  const userInQuestion = await usersCollection.findOne({ username: ourUser.username })

  if (userInQuestion) {
    errors.username = "That username is already in use."
  }

  // password validation checks
  if (ourUser.password.length < 12) errors.password = "Password must be at least 12 characters."
  if (ourUser.password.length > 50) errors.password = "Password cannot exceed 50 characters."
  if (ourUser.password == "") errors.password = "You must provide a password."

  // if there ARE errors return error object
  if (errors.username || errors.password) {
    return {
      errors: errors,
      success: false
    }
  }

  // otherwise, hash users password
  const salt = bcrypt.genSaltSync(10)
  ourUser.password = bcrypt.hashSync(ourUser.password, salt)

  const users = await getCollection("users")
  const newUser = await users.insertOne(ourUser)
  const userId = newUser.insertedId.toString()

  // create the cookie value using JWT
  const ourTokenValue = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, userId: userId, "skyColor": "blue" }, process.env.JWTSECRET)

  // log the user in by giving them a cookie
  cookies().set("ourcoolapp", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24
  })

  return {
    success: true
  }
}
