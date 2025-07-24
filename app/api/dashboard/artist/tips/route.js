import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Transaction from "@/models/Transaction"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const user = authResult.user
    if (user.userType !== "artist") {
      return NextResponse.json({ error: "Access denied. Artist account required." }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 20

    const skip = (page - 1) * limit
    const tips = await Transaction.find({
      recipient: user._id,
      type: "tip",
      status: "completed",
    })
      .populate("sender", "name profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const totalAmount = await Transaction.aggregate([
      { $match: { recipient: user._id, type: "tip", status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])

    const formattedTips = tips.map((tip) => ({
      id: tip._id,
      amount: tip.amount,
      message: tip.message || "",
      isAnonymous: tip.isAnonymous || false,
      sender: tip.isAnonymous
        ? null
        : {
            name: tip.sender?.name || "Anonymous",
            profileImage: tip.sender?.profileImage || null,
          },
      createdAt: tip.createdAt?.toLocaleDateString() || "",
    }))

    return NextResponse.json({
      tips: formattedTips,
      totalAmount: totalAmount[0]?.total || 0,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(tips.length / limit),
        totalCount: tips.length,
      },
    })
  } catch (error) {
    console.error("Fetch tips error:", error)
    return NextResponse.json({ error: "Failed to fetch tips" }, { status: 500 })
  }
}
