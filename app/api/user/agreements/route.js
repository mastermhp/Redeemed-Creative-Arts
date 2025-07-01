import { NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import { verifyAuth } from "@/lib/auth"

export async function PATCH(request) {
  try {
    await connectDB()

    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = authResult.user
    const { noAIConfirmation } = await request.json()

    // Update user agreements
    if (!user.agreements) {
      user.agreements = {}
    }

    if (noAIConfirmation !== undefined) {
      user.agreements.noAIConfirmation = noAIConfirmation
      user.agreements.noAIConfirmationDate = new Date()
    }

    await user.save()

    return NextResponse.json({
      message: "Agreement updated successfully",
      agreements: user.agreements,
    })
  } catch (error) {
    console.error("Update agreements error:", error)
    return NextResponse.json({ error: "Failed to update agreements" }, { status: 500 })
  }
}
