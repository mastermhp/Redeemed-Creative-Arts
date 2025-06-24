import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function getServerSession() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")

  if (!token) return null

  const decoded = verifyToken(token.value)
  return decoded
}

export function setAuthCookie(token) {
  const cookieStore = cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
}

export function clearAuthCookie() {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
}
