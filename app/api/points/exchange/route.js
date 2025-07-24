import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import User from "@/models/User"
import PointTransaction from "@/models/PointTransaction"
import Transaction from "@/models/Transaction"

export async function POST(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    const { exchangeType, amount, details } = await request.json()

    if (!exchangeType || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid exchange parameters" }, { status: 400 })
    }

    const userProfile = await User.findById(user._id).select("points")
    const currentPoints = userProfile?.points?.current || 0

    if (currentPoints < amount) {
      return NextResponse.json({ error: "Insufficient points" }, { status: 400 })
    }

    let exchangeRate = 1 // Default 1 point = $0.01
    let description = ""
    let cashValue = 0

    switch (exchangeType) {
      case "cash":
        exchangeRate = 0.01 // 100 points = $1
        cashValue = amount * exchangeRate
        description = `Exchanged ${amount} points for $${cashValue.toFixed(2)}`
        break
      case "gift_card":
        exchangeRate = 0.01
        cashValue = amount * exchangeRate
        description = `Exchanged ${amount} points for $${cashValue.toFixed(2)} gift card`
        break
      case "store_credit":
        exchangeRate = 0.015 // Better rate for store credit
        cashValue = amount * exchangeRate
        description = `Exchanged ${amount} points for $${cashValue.toFixed(2)} store credit`
        break
      case "ads":
        const adDays = Math.floor(amount / 100) // 100 points = 1 day of ads
        description = `Exchanged ${amount} points for ${adDays} days of ad promotion`
        break
      case "charity":
        exchangeRate = 0.01
        cashValue = amount * exchangeRate
        const charityName = details?.charityName || "Selected Charity"
        const splitPercentage = details?.splitPercentage || 100
        description = `Donated ${amount} points (${splitPercentage}% to ${charityName})`
        break
      default:
        return NextResponse.json({ error: "Invalid exchange type" }, { status: 400 })
    }

    // Create point transaction
    const pointTransaction = new PointTransaction({
      user: user._id,
      type: "exchange",
      amount: -amount,
      description,
      metadata: {
        exchangeType,
        exchangeRate,
        cashValue,
        details,
      },
    })

    await pointTransaction.save()

    // Update user points
    await User.findByIdAndUpdate(user._id, {
      $inc: { "points.current": -amount },
    })

    // Create financial transaction if applicable
    if (["cash", "gift_card", "store_credit", "charity"].includes(exchangeType)) {
      const transaction = new Transaction({
        sender: "system",
        recipient: user._id,
        type: "point_exchange",
        amount: cashValue,
        status: "pending",
        metadata: {
          pointsExchanged: amount,
          exchangeType,
          details,
        },
      })

      await transaction.save()
    }

    return NextResponse.json({
      message: "Points exchanged successfully",
      transaction: {
        id: pointTransaction._id,
        amount,
        exchangeType,
        cashValue,
        description,
      },
      remainingPoints: currentPoints - amount,
    })
  } catch (error) {
    console.error("Exchange points error:", error)
    return NextResponse.json({ error: "Failed to exchange points" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    const userProfile = await User.findById(user._id).select("points")

    const exchangeRates = {
      cash: { rate: 0.01, minimum: 100, description: "100 points = $1.00" },
      gift_card: { rate: 0.01, minimum: 500, description: "500 points = $5.00 gift card" },
      store_credit: { rate: 0.015, minimum: 100, description: "100 points = $1.50 store credit" },
      ads: { rate: 1, minimum: 100, description: "100 points = 1 day of ad promotion" },
      charity: { rate: 0.01, minimum: 50, description: "50 points = $0.50 donation" },
    }

    const recentExchanges = await PointTransaction.find({
      user: user._id,
      type: "exchange",
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    return NextResponse.json({
      currentPoints: userProfile?.points?.current || 0,
      totalPoints: userProfile?.points?.total || 0,
      exchangeRates,
      recentExchanges: recentExchanges.map((exchange) => ({
        id: exchange._id,
        amount: Math.abs(exchange.amount),
        description: exchange.description,
        createdAt: exchange.createdAt?.toLocaleDateString() || "",
      })),
    })
  } catch (error) {
    console.error("Fetch exchange info error:", error)
    return NextResponse.json({ error: "Failed to fetch exchange information" }, { status: 500 })
  }
}
