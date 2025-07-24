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

    const { amount, item, description } = await request.json()

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 })
    }

    if (!item) {
      return NextResponse.json({ error: "Item is required" }, { status: 400 })
    }

    // Find the user
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user has enough FaithCoins
    if (user.faithCoins.current < amount) {
      return NextResponse.json(
        {
          error: "Insufficient FaithCoins",
          current: user.faithCoins.current,
          required: amount,
        },
        { status: 400 },
      )
    }

    // Spend FaithCoins
    const success = user.spendFaithCoins(amount)

    if (!success) {
      return NextResponse.json({ error: "Failed to spend FaithCoins" }, { status: 500 })
    }

    await user.save()

    // TODO: Create transaction record for the purchase
    // const transaction = new Transaction({
    //   userId: user._id,
    //   type: "faithcoins_purchase",
    //   amount: amount,
    //   item: item,
    //   description: description,
    //   status: "completed"
    // })
    // await transaction.save()

    return NextResponse.json({
      success: true,
      spentAmount: amount,
      newBalance: user.faithCoins.current,
      totalSpent: user.faithCoins.totalSpent,
      item,
      description,
    })
  } catch (error) {
    console.error("FaithCoins spend error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
