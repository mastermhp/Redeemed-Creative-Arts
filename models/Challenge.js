import mongoose from "mongoose"

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Challenge title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Challenge description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    type: {
      type: String,
      enum: ["challenge", "matching"],
      required: true,
    },

    // Challenge-specific fields (goal-based)
    goalAmount: {
      type: Number,
      required: function () {
        return this.type === "challenge"
      },
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    sponsorMatchAmount: {
      type: Number,
      default: 0,
    },

    // Matching-specific fields (instant matching)
    matchingRatio: {
      numerator: {
        type: Number,
        default: 1,
      },
      denominator: {
        type: Number,
        default: 1,
      },
    },
    matchingLimit: {
      type: Number,
      required: function () {
        return this.type === "matching"
      },
    },
    matchingUsed: {
      type: Number,
      default: 0,
    },

    // Common fields
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    beneficiary: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["ministry", "outreach", "missions", "youth", "arts", "community", "emergency"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed", "cancelled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },

    // Participation tracking
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        amount: {
          type: Number,
          required: true,
        },
        matchedAmount: {
          type: Number,
          default: 0,
        },
        message: String,
        donatedAt: {
          type: Date,
          default: Date.now,
        },
        experienceAwarded: {
          type: Number,
          default: 0,
        },
      },
    ],

    // Rewards configuration
    rewards: {
      experiencePoints: {
        type: Number,
        default: 100,
      },
      faithCoins: {
        type: Number,
        default: 50,
      },
      badges: [String],
      specialRewards: [
        {
          type: String,
          description: String,
          threshold: Number, // minimum donation amount
        },
      ],
    },

    // Images and media
    images: [String],
    featuredImage: String,

    // Visibility and promotion
    isPromoted: {
      type: Boolean,
      default: false,
    },
    promotionLevel: {
      type: String,
      enum: ["none", "featured", "spotlight"],
      default: "none",
    },

    // Statistics
    stats: {
      totalDonations: {
        type: Number,
        default: 0,
      },
      uniqueDonors: {
        type: Number,
        default: 0,
      },
      averageDonation: {
        type: Number,
        default: 0,
      },
      completionPercentage: {
        type: Number,
        default: 0,
      },
    },

    // Church/Organization limits
    monthlyLimits: {
      challengesCreated: {
        type: Number,
        default: 0,
      },
      matchingCreated: {
        type: Number,
        default: 0,
      },
      lastReset: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes
challengeSchema.index({ type: 1, status: 1 })
challengeSchema.index({ createdBy: 1 })
challengeSchema.index({ endDate: 1 })
challengeSchema.index({ category: 1 })
challengeSchema.index({ isPromoted: 1, promotionLevel: 1 })

// Virtual for progress percentage
challengeSchema.virtual("progressPercentage").get(function () {
  if (this.type === "challenge") {
    return this.goalAmount > 0 ? Math.min((this.currentAmount / this.goalAmount) * 100, 100) : 0
  }
  return this.matchingLimit > 0 ? Math.min((this.matchingUsed / this.matchingLimit) * 100, 100) : 0
})

// Virtual for remaining amount/limit
challengeSchema.virtual("remaining").get(function () {
  if (this.type === "challenge") {
    return Math.max(this.goalAmount - this.currentAmount, 0)
  }
  return Math.max(this.matchingLimit - this.matchingUsed, 0)
})

// Virtual for days remaining
challengeSchema.virtual("daysRemaining").get(function () {
  const now = new Date()
  const end = new Date(this.endDate)
  const diffTime = end - now
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0)
})

// Method to add participant
challengeSchema.methods.addParticipant = function (userId, amount, message = "") {
  let matchedAmount = 0

  if (this.type === "matching" && this.matchingUsed < this.matchingLimit) {
    const availableMatching = this.matchingLimit - this.matchingUsed
    const maxMatch = Math.min(
      (amount * this.matchingRatio.numerator) / this.matchingRatio.denominator,
      availableMatching,
    )
    matchedAmount = maxMatch
    this.matchingUsed += matchedAmount
  }

  // Add to participants
  this.participants.push({
    userId,
    amount,
    matchedAmount,
    message,
    experienceAwarded: this.rewards.experiencePoints,
  })

  // Update totals
  this.currentAmount += amount + matchedAmount
  this.stats.totalDonations += amount + matchedAmount

  // Update unique donors count
  const uniqueDonors = new Set(this.participants.map((p) => p.userId.toString()))
  this.stats.uniqueDonors = uniqueDonors.size

  // Update average donation
  this.stats.averageDonation = this.stats.totalDonations / this.participants.length

  // Update completion percentage
  if (this.type === "challenge") {
    this.stats.completionPercentage = Math.min((this.currentAmount / this.goalAmount) * 100, 100)

    // Check if goal is reached
    if (this.currentAmount >= this.goalAmount && this.status === "active") {
      this.status = "completed"
      // Release sponsor match amount if applicable
      if (this.sponsorMatchAmount > 0) {
        this.currentAmount += this.sponsorMatchAmount
      }
    }
  }

  return {
    totalDonated: amount + matchedAmount,
    matchedAmount,
    experienceAwarded: this.rewards.experiencePoints,
  }
}

// Method to check if user can create more challenges this month
challengeSchema.statics.canCreateChallenge = async function (userId, type) {
  const user = await mongoose.model("User").findById(userId)
  if (!user) return false

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  // Get user's membership limits
  let maxChallenges = 0
  let maxMatching = 0

  switch (user.membership.tier) {
    case "free":
      maxChallenges = 0
      maxMatching = 0
      break
    case "tier_1":
      maxChallenges = 3
      maxMatching = 3
      break
    case "tier_2":
      maxChallenges = 3
      maxMatching = 3
      break
    default:
      maxChallenges = 0
      maxMatching = 0
  }

  // Count current month's challenges
  const currentCount = await this.countDocuments({
    createdBy: userId,
    type: type,
    createdAt: { $gte: monthStart },
  })

  const limit = type === "challenge" ? maxChallenges : maxMatching
  return currentCount < limit
}

// Method to get trending challenges
challengeSchema.statics.getTrending = function (limit = 10) {
  return this.find({
    status: "active",
    endDate: { $gt: new Date() },
  })
    .sort({
      "stats.uniqueDonors": -1,
      "stats.totalDonations": -1,
      createdAt: -1,
    })
    .limit(limit)
    .populate("createdBy", "name profileImage userType")
}

// Method to get featured challenges
challengeSchema.statics.getFeatured = function (limit = 5) {
  return this.find({
    status: "active",
    isPromoted: true,
    endDate: { $gt: new Date() },
  })
    .sort({ promotionLevel: -1, createdAt: -1 })
    .limit(limit)
    .populate("createdBy", "name profileImage userType")
}

// Pre-save middleware to update stats
challengeSchema.pre("save", function (next) {
  if (this.type === "challenge" && this.goalAmount > 0) {
    this.stats.completionPercentage = Math.min((this.currentAmount / this.goalAmount) * 100, 100)
  }
  next()
})

const Challenge = mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema)
export default Challenge
