import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Invitation from "@/models/Invitation"
import User from "@/models/User"
import { authenticateRequest } from "@/lib/auth"
import { sendInvitationEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { email, userType, message } = await request.json()

    if (!email || !userType) {
      return NextResponse.json({ error: "Email and user type are required" }, { status: 400 })
    }

    if (!["artist", "patron", "church"].includes(userType)) {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Check if invitation already exists
    const existingInvitation = await Invitation.findOne({
      inviteeEmail: email.toLowerCase(),
      status: "pending",
    })
    if (existingInvitation) {
      return NextResponse.json({ error: "Invitation already sent to this email" }, { status: 400 })
    }

    // Generate invitation token
    const invitationToken = crypto.randomBytes(32).toString("hex")

    // Create invitation
    const invitation = new Invitation({
      inviter: authResult.user._id,
      inviteeEmail: email.toLowerCase(),
      inviteeType: userType,
      invitationToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    })

    await invitation.save()

    // Send invitation email
    try {
      await sendInvitationEmail(email, authResult.user.name, userType, invitationToken, message)
    } catch (emailError) {
      console.error("Failed to send invitation email:", emailError)
      // Don't fail the invitation creation if email fails
    }

    return NextResponse.json({
      message: "Invitation sent successfully",
      invitation: {
        id: invitation._id,
        email: invitation.inviteeEmail,
        userType: invitation.inviteeType,
        status: invitation.status,
        expiresAt: invitation.expiresAt,
      },
    })
  } catch (error) {
    console.error("Send invitation error:", error)
    return NextResponse.json({ error: "Failed to send invitation" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "sent" // sent, received
    const status = searchParams.get("status") || "all"
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 20

    const skip = (page - 1) * limit

    const query = {}
    if (type === "sent") {
      query.inviter = authResult.user._id
    } else {
      query.inviteeEmail = authResult.user.email
    }

    if (status !== "all") {
      query.status = status
    }

    const invitations = await Invitation.find(query)
      .populate("inviter", "name profileImage userType")
      .populate("registeredUserId", "name profileImage userType")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Invitation.countDocuments(query)

    // Calculate points earned from invitations
    const pointsEarned = invitations.reduce((total, inv) => {
      return total + inv.pointsEarned.invitation + inv.pointsEarned.firstMilestone + inv.pointsEarned.premiumUpgrade
    }, 0)

    return NextResponse.json({
      invitations,
      pointsEarned,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Get invitations error:", error)
    return NextResponse.json({ error: "Failed to fetch invitations" }, { status: 500 })
  }
}
