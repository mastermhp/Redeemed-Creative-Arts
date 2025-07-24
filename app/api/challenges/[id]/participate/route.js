import { NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import Challenge from "@/models/Challenge"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth"

export async function POST(request, { params }) {
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

    const { amount, message } = await request.json()
    const challengeId = params.id

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valid donation amount is required" }, { status: 400 })
    }

    // Find user and challenge
    const [user, challenge] = await Promise.all([User.findById(decoded.userId), Challenge.findById(challengeId)])

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
    }

    // Check if challenge is active and not expired
    if (challenge.status !== "active") {
      return NextResponse.json({ error: "Challenge is not active" }, { status: 400 })
    }

    if (new Date() > new Date(challenge.endDate)) {
      return NextResponse.json({ error: "Challenge has expired" }, { status: 400 })
    }

    // Check if user has already participated (optional limit)
    const existingParticipation = challenge.participants.find((p) => p.userId.toString() === user._id.toString())

    // Add participant to challenge
    const participationResult = challenge.addParticipant(user._id, amount, message)

    // Award experience points to user
    const expAwarded = user.awardExperience(challenge.rewards.experiencePoints, "challenge_participation")

    // Award FaithCoins
    const coinsAwarded = user.awardFaithCoins(challenge.rewards.faithCoins, "challenge_participation")

    // Add challenge contributor badge if first time
    if (!existingParticipation) {
      const hasBadge = user.badges.some((b) => b.type === "challenge_contributor")
      if (!hasBadge) {
        user.badges.push({
          type: "challenge_contributor",
          earnedAt: new Date(),
        })
      }
    }

    // Save both documents
    await Promise.all([challenge.save(), user.save()])

    // TODO: Process actual payment here
    // TODO: Create transaction record
    // TODO: Send notification to challenge creator

    return NextResponse.json({
      success: true,
      participation: {
        amount,
        matchedAmount: participationResult.matchedAmount,
        totalImpact: participationResult.totalDonated,
        experienceAwarded: expAwarded,
        faithCoinsAwarded: coinsAwarded,
      },
      challenge: {
        id: challenge._id,
        currentAmount: challenge.currentAmount,
        progressPercentage: challenge.progressPercentage,
        remaining: challenge.remaining,
        status: challenge.status,
      },
    })
  } catch (error) {
    console.error("Challenge participation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
