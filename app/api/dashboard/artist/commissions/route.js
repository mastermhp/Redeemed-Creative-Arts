import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Transaction from "@/models/Transaction"
import Notification from "@/models/Notification"

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
    const status = searchParams.get("status") || "all"
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 20

    const query = { recipient: user._id, type: "commission" }
    if (status !== "all") {
      query.status = status
    }

    const skip = (page - 1) * limit
    const commissions = await Transaction.find(query)
      .populate("sender", "name email profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const totalCount = await Transaction.countDocuments(query)

    const formattedCommissions = commissions.map((commission) => ({
      id: commission._id,
      title: commission.metadata?.title || "Commission Request",
      description: commission.metadata?.description || "",
      budget: commission.amount,
      deadline: commission.metadata?.deadline || null,
      status: commission.status,
      client: {
        name: commission.sender?.name || "Unknown",
        email: commission.sender?.email || "",
        profileImage: commission.sender?.profileImage || null,
      },
      createdAt: commission.createdAt?.toLocaleDateString() || "",
    }))

    return NextResponse.json({
      commissions: formattedCommissions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
      },
    })
  } catch (error) {
    console.error("Fetch commissions error:", error)
    return NextResponse.json({ error: "Failed to fetch commissions" }, { status: 500 })
  }
}

export async function PUT(request) {
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

    const { commissionId, status, response } = await request.json()

    if (!commissionId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const commission = await Transaction.findOneAndUpdate(
      { _id: commissionId, recipient: user._id, type: "commission" },
      {
        status,
        "metadata.artistResponse": response || "",
        updatedAt: new Date(),
      },
      { new: true },
    ).populate("sender", "name email")

    if (!commission) {
      return NextResponse.json({ error: "Commission not found" }, { status: 404 })
    }

    // Create notification for client
    await Notification.create({
      recipient: commission.sender._id,
      type: "commission_update",
      title: "Commission Update",
      message: `Your commission request has been ${status}`,
      data: {
        commissionId: commission._id,
        artistId: user._id,
        artistName: user.name,
        status,
      },
    })

    return NextResponse.json({
      message: "Commission updated successfully",
      commission: {
        id: commission._id,
        status: commission.status,
      },
    })
  } catch (error) {
    console.error("Update commission error:", error)
    return NextResponse.json({ error: "Failed to update commission" }, { status: 500 })
  }
}
