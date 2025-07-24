import { NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import Leaderboard from "@/models/Leaderboard"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "monthly" // monthly, quarterly, yearly
    const category = searchParams.get("category") || "experience" // experience, artists, patrons, churches, helpers
    const limit = Number.parseInt(searchParams.get("limit")) || 50

    // Get current leaderboard
    const leaderboard = await Leaderboard.getCurrent(period)

    if (!leaderboard) {
      return NextResponse.json({ error: "No active leaderboard found" }, { status: 404 })
    }

    // Get rankings based on category
    let rankings = []

    switch (category) {
      case "experience":
        rankings = leaderboard.rankings.experience.slice(0, limit)
        break
      case "artists":
        rankings = {
          topEarners: leaderboard.rankings.artists.topEarners.slice(0, limit),
          mostActive: leaderboard.rankings.artists.mostActive.slice(0, limit),
          topRated: leaderboard.rankings.artists.topRated.slice(0, limit),
        }
        break
      case "patrons":
        rankings = {
          topSupporters: leaderboard.rankings.patrons.topSupporters.slice(0, limit),
          topHelpers: leaderboard.rankings.patrons.topHelpers.slice(0, limit),
        }
        break
      case "churches":
        rankings = {
          mostActive: leaderboard.rankings.churches.mostActive.slice(0, limit),
          topFundraisers: leaderboard.rankings.churches.topFundraisers.slice(0, limit),
        }
        break
      case "helpers":
        rankings = {
          topRated: leaderboard.rankings.helpers.topRated.slice(0, limit),
          mostBooked: leaderboard.rankings.helpers.mostBooked.slice(0, limit),
        }
        break
      default:
        rankings = leaderboard.rankings.experience.slice(0, limit)
    }

    return NextResponse.json({
      leaderboard: {
        period: leaderboard.period,
        periodDisplay: leaderboard.periodDisplay,
        year: leaderboard.year,
        month: leaderboard.month,
        quarter: leaderboard.quarter,
        isActive: leaderboard.isActive,
        isFinalized: leaderboard.isFinalized,
        stats: leaderboard.stats,
        prizePool: leaderboard.prizePool,
      },
      rankings,
      category,
    })
  } catch (error) {
    console.error("Leaderboard fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const { period, year, month, quarter } = await request.json()

    // Validate input
    if (!period || !year) {
      return NextResponse.json({ error: "Period and year are required" }, { status: 400 })
    }

    if (period === "monthly" && !month) {
      return NextResponse.json({ error: "Month is required for monthly leaderboards" }, { status: 400 })
    }

    if (period === "quarterly" && !quarter) {
      return NextResponse.json({ error: "Quarter is required for quarterly leaderboards" }, { status: 400 })
    }

    // Create new leaderboard period
    const leaderboard = await Leaderboard.createNewPeriod(period, year, month, quarter)

    // Calculate initial rankings
    await leaderboard.calculateRankings()

    return NextResponse.json({
      success: true,
      leaderboard: {
        id: leaderboard._id,
        period: leaderboard.period,
        periodDisplay: leaderboard.periodDisplay,
        year: leaderboard.year,
        month: leaderboard.month,
        quarter: leaderboard.quarter,
        stats: leaderboard.stats,
      },
    })
  } catch (error) {
    console.error("Leaderboard creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
