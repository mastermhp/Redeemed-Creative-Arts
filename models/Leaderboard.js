import mongoose from "mongoose"

const leaderboardSchema = new mongoose.Schema(
  {
    period: {
      type: String,
      enum: ["monthly", "quarterly", "yearly"],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: function () {
        return this.period === "monthly"
      },
      min: 1,
      max: 12,
    },
    quarter: {
      type: Number,
      required: function () {
        return this.period === "quarterly"
      },
      min: 1,
      max: 4,
    },

    // Rankings by category
    rankings: {
      // Overall experience rankings
      experience: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          rank: {
            type: Number,
            required: true,
          },
          experienceEarned: {
            type: Number,
            required: true,
          },
          level: {
            type: Number,
            required: true,
          },
          userType: {
            type: String,
            enum: ["artist", "patron", "church"],
            required: true,
          },
          badges: [String],
          profileImage: String,
          name: String,
        },
      ],

      // Artist-specific rankings
      artists: {
        topEarners: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            rank: Number,
            totalEarnings: Number,
            artworksSold: Number,
            coursesCreated: Number,
            experienceEarned: Number,
          },
        ],
        mostActive: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            rank: Number,
            artworksUploaded: Number,
            commentsReceived: Number,
            likesReceived: Number,
            experienceEarned: Number,
          },
        ],
        topRated: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            rank: Number,
            averageRating: Number,
            totalReviews: Number,
            experienceEarned: Number,
          },
        ],
      },

      // Patron-specific rankings
      patrons: {
        topSupporters: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            rank: Number,
            totalDonated: Number,
            artistsSupported: Number,
            challengesParticipated: Number,
            experienceEarned: Number,
          },
        ],
        topHelpers: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            rank: Number,
            helpersCompleted: Number,
            averageRating: Number,
            totalEarnings: Number,
            experienceEarned: Number,
          },
        ],
      },

      // Church-specific rankings
      churches: {
        mostActive: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            rank: Number,
            challengesCreated: Number,
            totalRaised: Number,
            helpersBooked: Number,
            experienceEarned: Number,
          },
        ],
        topFundraisers: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            rank: Number,
            totalRaised: Number,
            challengesCompleted: Number,
            averageGoalCompletion: Number,
            experienceEarned: Number,
          },
        ],
      },

      // Helper rankings (cross-category)
      helpers: {
        topRated: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            rank: Number,
            averageRating: Number,
            totalJobs: Number,
            totalEarnings: Number,
            badge: String,
            experienceEarned: Number,
          },
        ],
        mostBooked: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            rank: Number,
            jobsCompleted: Number,
            repeatClients: Number,
            totalEarnings: Number,
            experienceEarned: Number,
          },
        ],
      },
    },

    // Prize pool information
    prizePool: {
      total: {
        type: Number,
        default: 0,
      },
      distributed: {
        type: Boolean,
        default: false,
      },
      distribution: [
        {
          rank: Number,
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          amount: Number,
          category: String,
          awardedAt: Date,
        },
      ],
    },

    // Statistics
    stats: {
      totalParticipants: {
        type: Number,
        default: 0,
      },
      totalExperienceAwarded: {
        type: Number,
        default: 0,
      },
      totalFaithCoinsAwarded: {
        type: Number,
        default: 0,
      },
      averageLevel: {
        type: Number,
        default: 0,
      },
      topLevel: {
        type: Number,
        default: 0,
      },
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
    finalizedAt: Date,

    // Rewards configuration
    rewards: {
      experienceMultiplier: {
        type: Number,
        default: 1.5, // 50% bonus for leaderboard participants
      },
      faithCoinBonus: {
        type: Number,
        default: 100, // Base bonus coins
      },
      topRankRewards: [
        {
          rank: Number,
          experienceBonus: Number,
          faithCoins: Number,
          specialBadge: String,
          cashPrize: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes
leaderboardSchema.index({ period: 1, year: 1, month: 1, quarter: 1 }, { unique: true })
leaderboardSchema.index({ isActive: 1 })
leaderboardSchema.index({ "rankings.experience.userId": 1 })

// Virtual for period display
leaderboardSchema.virtual("periodDisplay").get(function () {
  if (this.period === "monthly") {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return `${months[this.month - 1]} ${this.year}`
  } else if (this.period === "quarterly") {
    return `Q${this.quarter} ${this.year}`
  } else {
    return `${this.year}`
  }
})

// Method to calculate rankings
leaderboardSchema.methods.calculateRankings = async function () {
  const User = mongoose.model("User")
  const Artwork = mongoose.model("Artwork")
  const Transaction = mongoose.model("Transaction")
  const Challenge = mongoose.model("Challenge")
  const Helper = mongoose.model("Helper")

  // Get date range for this period
  const dateRange = this.getDateRange()

  // Get all active users
  const users = await User.find({ isActive: true }).lean()

  // Calculate experience rankings
  const experienceRankings = users
    .map((user) => ({
      userId: user._id,
      rank: 0,
      experienceEarned: user.experience.seasonalExp || 0,
      level: user.experience.level,
      userType: user.userType,
      badges: user.badges.map((b) => b.type),
      profileImage: user.profileImage,
      name: user.name,
    }))
    .sort((a, b) => b.experienceEarned - a.experienceEarned)
    .map((item, index) => ({ ...item, rank: index + 1 }))

  this.rankings.experience = experienceRankings.slice(0, 100) // Top 100

  // Calculate artist rankings
  const artists = users.filter((u) => u.userType === "artist")

  // Artist earnings
  const artistEarnings = await Promise.all(
    artists.map(async (artist) => {
      const transactions = await Transaction.find({
        sellerId: artist._id,
        createdAt: { $gte: dateRange.start, $lte: dateRange.end },
        status: "completed",
      })

      const artworks = await Artwork.countDocuments({
        createdBy: artist._id,
        createdAt: { $gte: dateRange.start, $lte: dateRange.end },
      })

      return {
        userId: artist._id,
        rank: 0,
        totalEarnings: transactions.reduce((sum, t) => sum + t.amount, 0),
        artworksSold: transactions.length,
        coursesCreated: 0, // TODO: Add course model
        experienceEarned: artist.experience.seasonalExp || 0,
      }
    }),
  )

  this.rankings.artists.topEarners = artistEarnings
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .map((item, index) => ({ ...item, rank: index + 1 }))
    .slice(0, 50)

  // Calculate patron rankings
  const patrons = users.filter((u) => u.userType === "patron")

  const patronSupport = await Promise.all(
    patrons.map(async (patron) => {
      const donations = await Challenge.aggregate([
        { $unwind: "$participants" },
        {
          $match: {
            "participants.userId": patron._id,
            "participants.donatedAt": { $gte: dateRange.start, $lte: dateRange.end },
          },
        },
        {
          $group: {
            _id: "$participants.userId",
            totalDonated: { $sum: "$participants.amount" },
            challengesParticipated: { $sum: 1 },
          },
        },
      ])

      const donationData = donations[0] || { totalDonated: 0, challengesParticipated: 0 }

      return {
        userId: patron._id,
        rank: 0,
        totalDonated: donationData.totalDonated,
        artistsSupported: 0, // TODO: Calculate from transactions
        challengesParticipated: donationData.challengesParticipated,
        experienceEarned: patron.experience.seasonalExp || 0,
      }
    }),
  )

  this.rankings.patrons.topSupporters = patronSupport
    .sort((a, b) => b.totalDonated - a.totalDonated)
    .map((item, index) => ({ ...item, rank: index + 1 }))
    .slice(0, 50)

  // Calculate church rankings
  const churches = users.filter((u) => u.userType === "church")

  const churchActivity = await Promise.all(
    churches.map(async (church) => {
      const challenges = await Challenge.find({
        createdBy: church._id,
        createdAt: { $gte: dateRange.start, $lte: dateRange.end },
      })

      return {
        userId: church._id,
        rank: 0,
        challengesCreated: challenges.length,
        totalRaised: challenges.reduce((sum, c) => sum + c.currentAmount, 0),
        helpersBooked: 0, // TODO: Calculate from helper bookings
        experienceEarned: church.experience.seasonalExp || 0,
      }
    }),
  )

  this.rankings.churches.mostActive = churchActivity
    .sort((a, b) => b.challengesCreated - a.challengesCreated)
    .map((item, index) => ({ ...item, rank: index + 1 }))
    .slice(0, 50)

  // Update statistics
  this.stats.totalParticipants = users.length
  this.stats.totalExperienceAwarded = users.reduce((sum, u) => sum + (u.experience.seasonalExp || 0), 0)
  this.stats.averageLevel = users.reduce((sum, u) => sum + u.experience.level, 0) / users.length
  this.stats.topLevel = Math.max(...users.map((u) => u.experience.level))

  await this.save()
}

// Method to get date range for period
leaderboardSchema.methods.getDateRange = function () {
  let start, end

  if (this.period === "monthly") {
    start = new Date(this.year, this.month - 1, 1)
    end = new Date(this.year, this.month, 0, 23, 59, 59, 999)
  } else if (this.period === "quarterly") {
    const quarterStart = (this.quarter - 1) * 3
    start = new Date(this.year, quarterStart, 1)
    end = new Date(this.year, quarterStart + 3, 0, 23, 59, 59, 999)
  } else {
    start = new Date(this.year, 0, 1)
    end = new Date(this.year, 11, 31, 23, 59, 59, 999)
  }

  return { start, end }
}

// Method to distribute prizes
leaderboardSchema.methods.distributePrizes = async function () {
  if (this.prizePool.distributed) return

  const User = mongoose.model("User")

  // Distribute to top experience earners
  const topUsers = this.rankings.experience.slice(0, 10)

  for (let i = 0; i < topUsers.length; i++) {
    const user = await User.findById(topUsers[i].userId)
    if (!user) continue

    const reward = this.rewards.topRankRewards.find((r) => r.rank === i + 1) || {
      experienceBonus: Math.max(500 - i * 50, 100),
      faithCoins: Math.max(1000 - i * 100, 200),
      cashPrize: 0,
    }

    // Award experience bonus
    user.awardExperience(reward.experienceBonus, "leaderboard_bonus")

    // Award FaithCoins
    user.awardFaithCoins(reward.faithCoins, "leaderboard_prize")

    // Add special badge
    if (reward.specialBadge) {
      user.badges.push({
        type: reward.specialBadge,
        level: (i + 1).toString(),
        earnedAt: new Date(),
      })
    }

    await user.save()

    // Record distribution
    this.prizePool.distribution.push({
      rank: i + 1,
      userId: user._id,
      amount: reward.cashPrize || 0,
      category: "experience",
      awardedAt: new Date(),
    })
  }

  this.prizePool.distributed = true
  this.isFinalized = true
  this.finalizedAt = new Date()

  await this.save()
}

// Static method to get current leaderboard
leaderboardSchema.statics.getCurrent = function (period = "monthly") {
  const now = new Date()
  const year = now.getFullYear()
  const query = { period, year, isActive: true }

  if (period === "monthly") {
    query.month = now.getMonth() + 1
  } else if (period === "quarterly") {
    query.quarter = Math.floor(now.getMonth() / 3) + 1
  }

  return this.findOne(query)
}

// Static method to create new leaderboard period
leaderboardSchema.statics.createNewPeriod = async function (period, year, month = null, quarter = null) {
  const query = { period, year }
  if (month) query.month = month
  if (quarter) query.quarter = quarter

  // Check if already exists
  const existing = await this.findOne(query)
  if (existing) return existing

  // Create new leaderboard
  const leaderboard = new this({
    period,
    year,
    month,
    quarter,
    rankings: {
      experience: [],
      artists: { topEarners: [], mostActive: [], topRated: [] },
      patrons: { topSupporters: [], topHelpers: [] },
      churches: { mostActive: [], topFundraisers: [] },
      helpers: { topRated: [], mostBooked: [] },
    },
    prizePool: {
      total: period === "monthly" ? 5000 : period === "quarterly" ? 15000 : 30000,
    },
    rewards: {
      topRankRewards: [
        { rank: 1, experienceBonus: 1000, faithCoins: 2000, specialBadge: "champion", cashPrize: 500 },
        { rank: 2, experienceBonus: 750, faithCoins: 1500, specialBadge: "runner_up", cashPrize: 300 },
        { rank: 3, experienceBonus: 500, faithCoins: 1000, specialBadge: "third_place", cashPrize: 200 },
      ],
    },
  })

  await leaderboard.save()
  return leaderboard
}

const Leaderboard = mongoose.models.Leaderboard || mongoose.model("Leaderboard", leaderboardSchema)
export default Leaderboard
