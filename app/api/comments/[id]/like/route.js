import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Comment from "@/models/Comment"
import User from "@/models/User"
import EngagementReward from "@/models/EngagementReward"
import { getServerSession } from "@/lib/auth"

export async function POST(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const commentId = params.id
    const comment = await Comment.findById(commentId)

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 })
    }

    const userId = session.userId
    const hasLiked = comment.likes.includes(userId)

    if (hasLiked) {
      // Unlike
      comment.likes = comment.likes.filter((id) => id.toString() !== userId.toString())
    } else {
      // Like
      comment.likes.push(userId)

      // Award engagement points for liking
      const engagementReward = new EngagementReward({
        user: userId,
        action: "like",
        points: 2,
        relatedEntity: {
          entityType: "comment",
          entityId: commentId,
        },
        description: "Liked a comment",
      })

      await engagementReward.save()

      // Update user points
      await User.findByIdAndUpdate(userId, {
        $inc: {
          "points.current": 2,
          "points.total": 2,
        },
      })
    }

    await comment.save()

    return NextResponse.json({
      message: hasLiked ? "Comment unliked" : "Comment liked",
      liked: !hasLiked,
      likesCount: comment.likes.length,
    })
  } catch (error) {
    console.error("Like comment error:", error)
    return NextResponse.json({ error: "Failed to like comment" }, { status: 500 })
  }
}
