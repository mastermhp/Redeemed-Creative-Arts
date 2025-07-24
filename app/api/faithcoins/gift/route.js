import { NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"

export async function POST(request) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { amount, recipientId, message } = await request.json()

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 })
    }

    if (!recipientId) {
      return NextResponse.json({ error: "Recipient is required" }, { status: 400 })
    }

    if (recipientId === decoded.userId) {
      return NextResponse.json({ error: "Cannot gift to yourself" }, { status: 400 })
    }

    // Find both users
    const [sender, recipient] = await Promise.all([User.findById(decoded.userId), User.findById(recipientId)])

    if (!sender) {
      return NextResponse.json({ error: "Sender not found" }, { status: 404 })
    }

    if (!recipient) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 })
    }

    // Check if sender has enough FaithCoins
    if (sender.faithCoins.current < amount) {
      return NextResponse.json(
        {
          error: "Insufficient FaithCoins",
          current: sender.faithCoins.current,
          required: amount,
        },
        { status: 400 },
      )
    }

    // Check monthly gifting limits based on membership
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    let monthlyLimit = 0
    switch (sender.membership.tier) {
      case "pro":
      case "tier_1":
        monthlyLimit = 1000
        break
      case "pro_plus":
      case "tier_2":
        monthlyLimit = 1000
        break
      default:
        return NextResponse.json({ error: "Gifting requires a paid membership" }, { status: 403 })
    }

    // Calculate current month's gifting (this would need a separate tracking system)
    // For now, we'll implement a simple check

    // Process the gift
    const senderSuccess = sender.spendFaithCoins(amount)
    if (!senderSuccess) {
      return NextResponse.json({ error: "Failed to deduct FaithCoins from sender" }, { status: 500 })
    }

    const recipientAmount = recipient.awardFaithCoins(amount, `Gift from ${sender.name}`)

    await Promise.all([sender.save(), recipient.save()])

    // TODO: Create notification for recipient
    // TODO: Create transaction records for both users

    return NextResponse.json({
      success: true,
      giftAmount: amount,
      senderNewBalance: sender.faithCoins.current,
      recipientNewBalance: recipient.faithCoins.current,
      message,
      recipient: {
        id: recipient._id,
        name: recipient.name,
        profileImage: recipient.profileImage,
      },
    })
  } catch (error) {
    console.error("FaithCoins gift error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
