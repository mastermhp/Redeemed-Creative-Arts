import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Contest from "@/models/Contest"
import Vote from "@/models/Vote"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function POST(request, { params }) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const contestId = params.id
    const { submissionId } = await request.json()

    const contest = await Contest.findById(contestId)
    if (!contest) {
      return NextResponse.json({ error: "Contest not found" }, { status: 404 })
    }

    if (contest.status !== "voting") {
      return NextResponse.json({ error: "Contest is not in voting phase" }, { status: 400 })
    }

    // Check if user already voted in this contest
    const existingVote = await Vote.findOne({
      voter: session.userId,
      contest: contestId,
      voteType: "contest_vote",
    })

    if (existingVote && !contest.voting.allowMultipleVotes) {
      return NextResponse.json({ error: "You have already voted in this contest" }, { status: 400 })
    }

    // Find the submission
    const submission = contest.submissions.id(submissionId)
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    // Create vote
    const vote = new Vote({
      voter: session.userId,
      targetType: "contest_submission",
      targetId: submissionId,
      voteType: "contest_vote",
      contest: contestId,
    })

    await vote.save()

    // Update contest
    await contest.addVote(submissionId)

    // Award points to voter
    const voter = await User.findById(session.userId)
    if (voter) {
      voter.points.current += contest.voting.pointsPerVote
      voter.points.total += contest.voting.pointsPerVote
      await voter.save()
    }

    return NextResponse.json({
      message: "Vote cast successfully",
      pointsEarned: contest.voting.pointsPerVote,
    })
  } catch (error) {
    console.error("Contest vote error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
