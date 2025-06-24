import { NextResponse } from "next/server"
import { verifyToken } from "./auth"

export function withAuth(handler, options = {}) {
  return async (request) => {
    try {
      const token = request.cookies.get("auth-token")?.value

      if (!token) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 })
      }

      const decoded = verifyToken(token)
      if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
      }

      // Check user type restrictions
      if (options.userTypes && !options.userTypes.includes(decoded.userType)) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

      // Add user info to request
      request.user = decoded

      return handler(request)
    } catch (error) {
      return NextResponse.json({ error: "Authentication error" }, { status: 500 })
    }
  }
}

export function withAdmin(handler) {
  return withAuth(handler, { userTypes: ["admin"] })
}
