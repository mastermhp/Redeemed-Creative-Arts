import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Invitation from "@/models/Invitation"
import User from "@/models/User"

export async function POST(request) {
  try {
    await connectDB()

    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Invitation token is required" }, { status: 400 })
    }

    // Find invitation
    const invitation = await Invitation.findOne({
      invitationToken: token,
      status: "pending",
    }).populate("inviter", "name")

    if (!invitation) {
      return NextResponse.json({ error: "Invalid or expired invitation" }, { status: 404 })
    }

    // Check if invitation is expired
    if (invitation.expiresAt < new Date()) {
      invitation.status = "expired"
      await invitation.save()
      return NextResponse.json({ error: "Invitation has expired" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: invitation.inviteeEmail })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Mark invitation as accepted
    invitation.status = "accepted"
    invitation.acceptedAt = new Date()
    await invitation.save()

    // Award initial invitation points to inviter
    const invitationPoints = invitation.calculateInvitationPoints()
    await User.findByIdAndUpdate(invitation.inviter._id, {
      $inc: {
        "points.current": invitationPoints,
        "points.total": invitationPoints,
      },
    })

    // Update invitation points earned
    invitation.pointsEarned.invitation = invitationPoints
    await invitation.save()

    return NextResponse.json({
      message: "Invitation accepted successfully",
      invitation: {
        inviterName: invitation.inviter.name,
        userType: invitation.inviteeType,
        email: invitation.inviteeEmail,
      },
    })
  } catch (error) {
    console.error("Accept invitation error:", error)
    return NextResponse.json({ error: "Failed to accept invitation" }, { status: 500 })
  }
}
