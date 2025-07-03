import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { authenticateRequest } from "@/lib/auth"
import Event from "@/models/Event"
import Helper from "@/models/Helper"
import Donation from "@/models/Donation"
import ChallengeCampaign from "@/models/ChallengeCampaign"
import MatchingCampaign from "@/models/MatchingCampaign"
import CommunityImpact from "@/models/CommunityImpact"

export async function GET(request) {
  try {
    await connectDB()

    const authResult = await authenticateRequest(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    if (authResult.user.userType !== "church") {
      return NextResponse.json({ error: "Access denied. Church account required." }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "monthly"
    const year = Number.parseInt(searchParams.get("year")) || new Date().getFullYear()
    const month = Number.parseInt(searchParams.get("month")) || new Date().getMonth() + 1

    // Calculate date range
    let startDate, endDate
    if (period === "monthly") {
      startDate = new Date(year, month - 1, 1)
      endDate = new Date(year, month, 0)
    } else if (period === "yearly") {
      startDate = new Date(year, 0, 1)
      endDate = new Date(year, 11, 31)
    } else {
      // Default to current month
      startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    }

    // Get engagement metrics
    const [
      events,
      helpers,
      donations,
      challengeCampaigns,
      matchingCampaigns,
      totalEvents,
      totalHelpers,
      totalDonations,
      communityImpact,
    ] = await Promise.all([
      // Period-specific metrics
      Event.find({
        organizer: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      }).populate("attendees", "name"),
      Helper.find({
        bookedBy: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      }).populate("user", "name"),
      Donation.find({
        church: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      }).populate("artist", "name"),
      ChallengeCampaign.find({
        church: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      }),
      MatchingCampaign.find({
        church: authResult.user._id,
        createdAt: { $gte: startDate, $lte: endDate },
      }),
      // All-time metrics
      Event.find({ organizer: authResult.user._id }),
      Helper.find({ bookedBy: authResult.user._id }),
      Donation.find({ church: authResult.user._id }),
      // Community impact
      CommunityImpact.findOne({
        church: authResult.user._id,
        period: "monthly",
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
      }),
    ])

    // Calculate engagement metrics
    const totalAttendees = events.reduce((sum, event) => sum + (event.attendees?.length || 0), 0)
    const totalDonationAmount = donations.reduce((sum, donation) => sum + donation.amount, 0)
    const activeCampaigns = [...challengeCampaigns, ...matchingCampaigns].filter((c) => c.status === "active")

    // Calculate community reach
    const uniqueParticipants = new Set()
    events.forEach((event) => {
      event.attendees?.forEach((attendee) => uniqueParticipants.add(attendee._id.toString()))
    })
    helpers.forEach((helper) => {
      if (helper.user) uniqueParticipants.add(helper.user._id.toString())
    })
    donations.forEach((donation) => {
      if (donation.patron) uniqueParticipants.add(donation.patron.toString())
    })

    // Calculate growth (compare to previous period)
    const prevStartDate = new Date(startDate)
    const prevEndDate = new Date(endDate)
    if (period === "monthly") {
      prevStartDate.setMonth(prevStartDate.getMonth() - 1)
      prevEndDate.setMonth(prevEndDate.getMonth() - 1)
    } else {
      prevStartDate.setFullYear(prevStartDate.getFullYear() - 1)
      prevEndDate.setFullYear(prevEndDate.getFullYear() - 1)
    }

    const [prevEvents, prevHelpers, prevDonations] = await Promise.all([
      Event.countDocuments({
        organizer: authResult.user._id,
        createdAt: { $gte: prevStartDate, $lte: prevEndDate },
      }),
      Helper.countDocuments({
        bookedBy: authResult.user._id,
        createdAt: { $gte: prevStartDate, $lte: prevEndDate },
      }),
      Donation.countDocuments({
        church: authResult.user._id,
        createdAt: { $gte: prevStartDate, $lte: prevEndDate },
      }),
    ])

    const currentTotal = events.length + helpers.length + donations.length
    const prevTotal = prevEvents + prevHelpers + prevDonations
    const growthRate = prevTotal > 0 ? Math.round(((currentTotal - prevTotal) / prevTotal) * 100) : 0

    // Calculate engagement score
    const engagementScore = Math.round(
      events.length * 15 +
        helpers.length * 10 +
        donations.length * 5 +
        activeCampaigns.length * 20 +
        totalAttendees * 2,
    )

    // Get unique artists supported
    const uniqueArtists = new Set(totalDonations.map((d) => d.artist?.toString()).filter(Boolean))

    const engagementStats = {
      period: {
        events: events.length,
        helpers: helpers.length,
        donations: donations.length,
        donationAmount: totalDonationAmount,
        campaigns: activeCampaigns.length,
        attendees: totalAttendees,
        communityReach: uniqueParticipants.size,
        engagementScore,
      },
      allTime: {
        totalEvents: totalEvents.length,
        totalHelpers: totalHelpers.length,
        totalDonations: totalDonations.length,
        totalDonationAmount: totalDonations.reduce((sum, d) => sum + d.amount, 0),
        artistsSupported: uniqueArtists.size,
        totalAttendees: totalEvents.reduce((sum, event) => sum + (event.attendees?.length || 0), 0),
      },
      trends: {
        growthRate,
        averageAttendeesPerEvent: events.length > 0 ? Math.round(totalAttendees / events.length) : 0,
        helperRetentionRate: calculateHelperRetention(helpers),
        campaignSuccessRate: calculateCampaignSuccessRate([...challengeCampaigns, ...matchingCampaigns]),
        mostPopularEventType: getMostPopularEventType(totalEvents),
      },
      impact: {
        communityImpactScore: communityImpact?.metrics?.communityEngagement || 0,
        goalsAchieved: communityImpact ? calculateGoalsAchieved(communityImpact) : 0,
        totalGoals: communityImpact ? Object.keys(communityImpact.goals || {}).length : 0,
        monthlyProgress: communityImpact ? calculateMonthlyProgress(communityImpact) : 0,
      },
      breakdown: {
        eventsByType: await getEventsByType(authResult.user._id, year),
        helpersBySkill: await getHelpersBySkill(authResult.user._id),
        donationsByMonth: await getDonationsByMonth(authResult.user._id, year),
        campaignPerformance: await getCampaignPerformance(authResult.user._id),
      },
    }

    return NextResponse.json(engagementStats)
  } catch (error) {
    console.error("Church engagement stats error:", error)
    return NextResponse.json({ error: "Failed to fetch engagement statistics" }, { status: 500 })
  }
}

// Helper functions
function calculateHelperRetention(helpers) {
  // Simplified retention calculation
  const uniqueHelpers = new Set(helpers.map((h) => h.user?._id?.toString()).filter(Boolean))
  const repeatHelpers = helpers.filter(
    (h) => helpers.filter((h2) => h2.user?._id?.toString() === h.user?._id?.toString()).length > 1,
  )
  const uniqueRepeatHelpers = new Set(repeatHelpers.map((h) => h.user?._id?.toString()).filter(Boolean))

  return uniqueHelpers.size > 0 ? Math.round((uniqueRepeatHelpers.size / uniqueHelpers.size) * 100) : 0
}

function calculateCampaignSuccessRate(campaigns) {
  const completedCampaigns = campaigns.filter((c) => c.status === "completed")
  const successfulCampaigns = completedCampaigns.filter(
    (c) => (c.currentAmount || 0) >= c.targetAmount * 0.8, // 80% of target considered successful
  )

  return completedCampaigns.length > 0 ? Math.round((successfulCampaigns.length / completedCampaigns.length) * 100) : 0
}

function getMostPopularEventType(events) {
  const typeCount = {}
  events.forEach((event) => {
    typeCount[event.type] = (typeCount[event.type] || 0) + 1
  })

  return Object.keys(typeCount).reduce((a, b) => (typeCount[a] > typeCount[b] ? a : b), "worship")
}

function calculateGoalsAchieved(communityImpact) {
  if (!communityImpact.goals) return 0

  let achieved = 0
  Object.values(communityImpact.goals).forEach((goal) => {
    if (goal.achieved >= goal.target) achieved++
  })

  return achieved
}

function calculateMonthlyProgress(communityImpact) {
  if (!communityImpact.goals) return 0

  let totalProgress = 0
  let goalCount = 0

  Object.values(communityImpact.goals).forEach((goal) => {
    if (goal.target > 0) {
      totalProgress += Math.min((goal.achieved / goal.target) * 100, 100)
      goalCount++
    }
  })

  return goalCount > 0 ? Math.round(totalProgress / goalCount) : 0
}

async function getEventsByType(churchId, year) {
  return await Event.aggregate([
    {
      $match: {
        organizer: churchId,
        createdAt: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31),
        },
      },
    },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
        totalAttendees: { $sum: { $size: { $ifNull: ["$attendees", []] } } },
      },
    },
    { $sort: { count: -1 } },
  ])
}

async function getHelpersBySkill(churchId) {
  return await Helper.aggregate([
    { $match: { bookedBy: churchId } },
    { $unwind: "$skills" },
    {
      $group: {
        _id: "$skills",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ])
}

async function getDonationsByMonth(churchId, year) {
  const donations = await Donation.aggregate([
    {
      $match: {
        church: churchId,
        createdAt: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
        amount: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ])

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    count: 0,
    amount: 0,
  }))

  donations.forEach((d) => {
    monthlyData[d._id - 1] = { month: d._id, count: d.count, amount: d.amount }
  })

  return monthlyData
}

async function getCampaignPerformance(churchId) {
  const [challengeCampaigns, matchingCampaigns] = await Promise.all([
    ChallengeCampaign.find({ church: churchId }).select("title targetAmount currentAmount status"),
    MatchingCampaign.find({ church: churchId }).select("title targetAmount currentAmount status"),
  ])

  return [...challengeCampaigns, ...matchingCampaigns].map((campaign) => ({
    id: campaign._id,
    title: campaign.title,
    targetAmount: campaign.targetAmount,
    currentAmount: campaign.currentAmount || 0,
    progress: Math.round(((campaign.currentAmount || 0) / campaign.targetAmount) * 100),
    status: campaign.status,
  }))
}
