import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Donation from "@/models/Donation"
import User from "@/models/User"
import { authenticateRequest } from "@/lib/auth"

export async function GET(request) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { user } = authResult
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const skip = (page - 1) * limit

    const donations = await Donation.find()
      .populate("donorId", "name email")
      .populate("recipientId", "name email userType")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Donation.countDocuments()

    return NextResponse.json({
      donations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get donations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { user } = authResult
    await connectDB()

    const { recipientId, amount, message, isAnonymous } = await request.json()

    // Validate input
    if (!recipientId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid donation data" }, { status: 400 })
    }

    // Verify recipient exists
    const recipient = await User.findById(recipientId)
    if (!recipient) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 })
    }

    // Create donation
    const donation = new Donation({
      donorId: user._id,
      recipientId,
      amount: Number.parseFloat(amount),
      message: message || "",
      isAnonymous: isAnonymous || false,
      status: "completed",
      paymentMethod: "card",
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    })

    await donation.save()

    // Populate the donation with user details for response
    await donation.populate("recipientId", "name email userType")
    await donation.populate("donorId", "name email")

    return NextResponse.json({
      message: "Donation successful",
      donation,
    })
  } catch (error) {
    console.error("Donation processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
