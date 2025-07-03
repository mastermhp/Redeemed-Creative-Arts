import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Comment from "@/models/Comment"

export async function POST(request, { params }) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const commentId = params.id
    const userId = authResult.user._id

    const comment = await Comment.findById(commentId)
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 })
    }

    const existingLike = comment.likes.find((like) => like.user.toString() === userId.toString())

    if (existingLike) {
      // Unlike
      comment.likes = comment.likes.filter((like) => like.user.toString() !== userId.toString())
      await comment.save()

      return NextResponse.json({
        message: "Comment unliked",
        liked: false,
        likeCount: comment.likes.length,
      })
    } else {
      // Like
      comment.likes.push({ user: userId })
      await comment.save()

      return NextResponse.json({
        message: "Comment liked",
        liked: true,
        likeCount: comment.likes.length,
      })
    }
  } catch (error) {
    console.error("Like comment error:", error)
    return NextResponse.json({ error: "Failed to like comment" }, { status: 500 })
  }
}
