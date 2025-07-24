import { connectDB } from "../lib/database.js"
import Leaderboard from "../models/Leaderboard.js"

async function createLeaderboards() {
  try {
    await connectDB()

    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    const currentQuarter = Math.floor(now.getMonth() / 3) + 1

    console.log("Creating leaderboards...")

    // Create monthly leaderboard
    const monthlyLeaderboard = await Leaderboard.createNewPeriod("monthly", currentYear, currentMonth)
    console.log(`Created monthly leaderboard: ${monthlyLeaderboard.periodDisplay}`)

    // Create quarterly leaderboard
    const quarterlyLeaderboard = await Leaderboard.createNewPeriod("quarterly", currentYear, null, currentQuarter)
    console.log(`Created quarterly leaderboard: ${quarterlyLeaderboard.periodDisplay}`)

    // Create yearly leaderboard
    const yearlyLeaderboard = await Leaderboard.createNewPeriod("yearly", currentYear)
    console.log(`Created yearly leaderboard: ${yearlyLeaderboard.periodDisplay}`)

    // Calculate initial rankings
    console.log("Calculating rankings...")
    await Promise.all([
      monthlyLeaderboard.calculateRankings(),
      quarterlyLeaderboard.calculateRankings(),
      yearlyLeaderboard.calculateRankings(),
    ])

    console.log("Leaderboards created and calculated successfully!")
  } catch (error) {
    console.error("Error creating leaderboards:", error)
  } finally {
    process.exit(0)
  }
}

createLeaderboards()
