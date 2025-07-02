import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { cookies } from "next/headers"
import connectDB from "@/lib/database"
import User from "@/models/User"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = "7d"

// Generate JWT token
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.error("Token verification failed:", error.message)
    return null
  }
}

// Hash password
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, salt)
  } catch (error) {
    throw new Error("Password hashing failed")
  }
}

// Compare password
export async function comparePassword(plainPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword)
  } catch (error) {
    console.error("Password comparison failed:", error)
    return false
  }
}

// Generate random token for password reset/email verification
export function generateRandomToken() {
  return crypto.randomBytes(32).toString("hex")
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
export function isValidPassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

// Extract token from request headers
export function extractTokenFromHeaders(request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }
  return null
}

// Extract token from cookies
export function extractTokenFromCookies(request) {
  const cookies = request.headers.get("cookie")
  if (!cookies) return null

  const tokenCookie = cookies.split(";").find((cookie) => cookie.trim().startsWith("auth-token="))

  if (tokenCookie) {
    return tokenCookie.split("=")[1]
  }
  return null
}

// Get user from token
export async function getUserFromToken(token) {
  if (!token) return null

  const decoded = verifyToken(token)
  if (!decoded) return null

  return {
    id: decoded.userId,
    email: decoded.email,
    userType: decoded.userType,
    name: decoded.name,
  }
}

// Get server session from cookies
export async function getServerSession() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")

    if (!token) return null

    const decoded = verifyToken(token.value)
    if (!decoded) return null

    // Connect to database and get fresh user data
    await connectDB()
    const user = await User.findById(decoded.userId)

    if (!user || !user.isActive) return null

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        isVerified: user.isVerified,
        isActive: user.isActive,
        points: user.points,
        membership: user.membership,
        bio: user.bio,
        location: user.location,
        artistInfo: user.artistInfo,
        churchInfo: user.churchInfo,
        isHelper: user.isHelper,
        helperInfo: user.helperInfo,
        profileImage: user.profileImage,
        socialLinks: user.socialLinks,
      },
    }
  } catch (error) {
    console.error("Server session error:", error)
    return null
  }
}

// Set auth cookie
export function setAuthCookie(token) {
  const cookieStore = cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  })
}

// Clear auth cookie
export function clearAuthCookie() {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
}

// Middleware function to authenticate requests
export async function authenticateRequest(request) {
  try {
    // Try to get token from Authorization header first, then from cookies
    let token = extractTokenFromHeaders(request)
    if (!token) {
      token = extractTokenFromCookies(request)
    }

    if (!token) {
      return { success: false, error: "No authentication token provided" }
    }

    // Get user info from token
    const tokenUser = await getUserFromToken(token)
    if (!tokenUser) {
      return { success: false, error: "Invalid or expired token" }
    }

    // Connect to database and get fresh user data
    await connectDB()
    const user = await User.findById(tokenUser.id)

    if (!user) {
      return { success: false, error: "User not found" }
    }

    if (!user.isActive) {
      return { success: false, error: "Account is inactive" }
    }

    return {
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        isVerified: user.isVerified,
        isActive: user.isActive,
        points: user.points,
        membership: user.membership,
        bio: user.bio,
        location: user.location,
        artistInfo: user.artistInfo,
        churchInfo: user.churchInfo,
        isHelper: user.isHelper,
        helperInfo: user.helperInfo,
        profileImage: user.profileImage,
        socialLinks: user.socialLinks,
      },
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return { success: false, error: "Authentication failed" }
  }
}

// Alias for compatibility
export const verifyAuth = authenticateRequest

// Check if user has required role
export function hasRole(user, requiredRole) {
  if (!user) return false

  if (requiredRole === "admin") {
    return user.userType === "admin"
  }

  if (requiredRole === "artist") {
    return user.userType === "artist"
  }

  if (requiredRole === "patron") {
    return user.userType === "patron"
  }

  if (requiredRole === "church") {
    return user.userType === "church"
  }

  return false
}

// Check if user is admin
export function isAdmin(user) {
  return user && user.userType === "admin"
}

// Check if user is artist
export function isArtist(user) {
  return user && user.userType === "artist"
}

// Check if user is patron
export function isPatron(user) {
  return user && user.userType === "patron"
}

// Check if user is church
export function isChurch(user) {
  return user && user.userType === "church"
}
