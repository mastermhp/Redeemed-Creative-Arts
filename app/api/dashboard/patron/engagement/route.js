import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Vote from "@/models/Vote"
import Comment from "@/models/Comment"
import PointTransaction from "@/models/PointTransaction"
import { getServerSession } from "@/lib/auth"

export async function GET(request) {
  try {
    const session = await getServerSession()
    if (!session || session.userType !== "patron") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Get engagement statistics
    const [artworksLiked, commentsPosted, pointsGifted, votesCast] = await Promise.all([
      Vote.countDocuments({
        voter: session.userId,
        voteType: "like",
        targetType: "artwork",
      }),
      Comment.countDocuments({
        author: session.userId,
        isDeleted: false,
      }),
      PointTransaction.aggregate([
        {
          $match: {
            from: session.userId,
            type: "gift",
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            totalGifted: { $sum: "$amount" },
          },
        },
      ]),
      Vote.countDocuments({
        voter: session.userId,
      }),
    ])

    const stats = {
      artworksLiked,
      commentsPosted,
      pointsGifted: pointsGifted[0]?.totalGifted || 0,
      votescast: votesCast,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Get patron engagement error:", error)
    return NextResponse.json({ error: "Failed to fetch engagement data" }, { status: 500 })
  }
}
