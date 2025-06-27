import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function PATCH(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const updates = await request.json()
    const user = await User.findById(session.userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update agreements
    if (updates.noAIConfirmation !== undefined) {
      user.agreements.noAIConfirmation = updates.noAIConfirmation
      user.agreements.noAIConfirmationDate = new Date()
    }

    if (updates.termsAccepted !== undefined) {
      user.agreements.termsAccepted = updates.termsAccepted
      user.agreements.termsAcceptedDate = new Date()
    }

    if (updates.privacyAccepted !== undefined) {
      user.agreements.privacyAccepted = updates.privacyAccepted
      user.agreements.privacyAcceptedDate = new Date()
    }

    if (updates.artistDisclaimer !== undefined) {
      user.agreements.artistDisclaimer = updates.artistDisclaimer
      user.agreements.artistDisclaimerDate = new Date()
    }

    if (updates.helperAgreement !== undefined) {
      user.agreements.helperAgreement = updates.helperAgreement
      user.agreements.helperAgreementDate = new Date()
    }

    await user.save()

    return NextResponse.json({
      message: "Agreements updated successfully",
      agreements: user.agreements,
    })
  } catch (error) {
    console.error("Update agreements error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
