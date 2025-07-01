"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      console.log("🔍 Checking authentication...")

      // First check localStorage for user data
      const userData = localStorage.getItem("user")
      const token = localStorage.getItem("auth-token")

      if (!token || !userData) {
        console.log("❌ No token or user data found")
        setLoading(false)
        return
      }

      // Parse user data
      const parsedUser = JSON.parse(userData)
      console.log("✅ User data found in localStorage:", parsedUser.email)
      setUser(parsedUser)

      // Optionally verify token with server
      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          console.log("❌ Token verification failed, clearing auth data")
          localStorage.removeItem("auth-token")
          localStorage.removeItem("user")
          setUser(null)
        } else {
          // Update user data with fresh data from server
          const data = await response.json()
          setUser(data.user)
          localStorage.setItem("user", JSON.stringify(data.user))
        }
      } catch (error) {
        console.log("⚠️ Token verification failed, but keeping local auth")
        // Keep local auth even if server verification fails
      }
    } catch (error) {
      console.error("❌ Auth check error:", error)
      localStorage.removeItem("auth-token")
      localStorage.removeItem("user")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      console.log("🔐 Attempting login...")
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("✅ Login successful")
        localStorage.setItem("auth-token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        setUser(data.user)

        // Redirect based on user type
        switch (data.user.userType) {
          case "artist":
            router.push("/dashboard/artist")
            break
          case "patron":
            router.push("/dashboard/patron")
            break
          case "church":
            router.push("/dashboard/church")
            break
          case "admin":
            router.push("/dashboard/admin")
            break
          default:
            router.push("/dashboard")
        }

        return { success: true }
      } else {
        console.log("❌ Login failed:", data.error)
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("❌ Login error:", error)
      return { success: false, error: "Login failed" }
    }
  }

  const logout = async () => {
    try {
      // Call logout API to clear server-side cookie
      await fetch("/api/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("Logout API error:", error)
    }

    // Clear client-side data
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem("auth-token")
  }

  const hasRole = (role) => {
    return user && user.userType === role
  }

  const isAdmin = () => {
    return hasRole("admin")
  }

  const isArtist = () => {
    return hasRole("artist")
  }

  const isPatron = () => {
    return hasRole("patron")
  }

  const isChurch = () => {
    return hasRole("church")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        checkAuth,
        updateUser,
        isAuthenticated,
        hasRole,
        isAdmin,
        isArtist,
        isPatron,
        isChurch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
