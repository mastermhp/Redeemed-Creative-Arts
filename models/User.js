import mongoose from "mongoose"
import crypto from "crypto"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      enum: ["artist", "patron", "church", "admin"],
      default: "patron",
    },
    profile: {
      bio: String,
      avatar: String,
      website: String,
      socialLinks: {
        instagram: String,
        facebook: String,
        twitter: String,
        linkedin: String,
      },
    },

    // Updated Points and Experience System
    points: {
      current: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
      level: {
        type: String,
        enum: ["bronze", "silver", "gold", "platinum", "diamond"],
        default: "bronze",
      },
    },

    // New Experience System (12 levels max)
    experience: {
      currentExp: {
        type: Number,
        default: 0,
      },
      level: {
        type: Number,
        default: 1,
        min: 1,
        max: 12,
      },
      totalExp: {
        type: Number,
        default: 0,
      },
      seasonalExp: {
        type: Number,
        default: 0,
      },
      lastSeasonReset: {
        type: Date,
        default: Date.now,
      },
    },

    // FaithCoins Currency System
    faithCoins: {
      current: {
        type: Number,
        default: 0,
      },
      totalEarned: {
        type: Number,
        default: 0,
      },
      totalSpent: {
        type: Number,
        default: 0,
      },
      monthlyEarned: {
        type: Number,
        default: 0,
      },
      lastMonthlyReset: {
        type: Date,
        default: Date.now,
      },
    },

    // Daily Activity Tracking
    dailyActivity: {
      lastLogin: Date,
      loginStreak: {
        type: Number,
        default: 0,
      },
      dailyLimits: {
        comments: {
          count: {
            type: Number,
            default: 0,
          },
          lastReset: {
            type: Date,
            default: Date.now,
          },
        },
        likes: {
          count: {
            type: Number,
            default: 0,
          },
          lastReset: {
            type: Date,
            default: Date.now,
          },
        },
        reposts: {
          count: {
            type: Number,
            default: 0,
          },
          lastReset: {
            type: Date,
            default: Date.now,
          },
        },
        artworkUploads: {
          count: {
            type: Number,
            default: 0,
          },
          lastReset: {
            type: Date,
            default: Date.now,
          },
        },
        donations: {
          count: {
            type: Number,
            default: 0,
          },
          lastReset: {
            type: Date,
            default: Date.now,
          },
        },
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    location: {
      city: String,
      state: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    // Artist-specific fields
    artistInfo: {
      specialties: [String],
      experience: {
        type: String,
        enum: ["beginner", "intermediate", "advanced", "professional"],
      },
      portfolio: [
        {
          title: String,
          description: String,
          imageUrl: String,
          category: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      commissionRates: {
        hourly: Number,
        project: Number,
      },
      availability: {
        type: String,
        enum: ["available", "busy", "unavailable"],
        default: "available",
      },
    },

    // Church-specific fields
    churchInfo: {
      organizationName: String,
      denomination: String,
      size: String,
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
      },
      pastor: String,
      artsMinistryContact: String,
      members: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          role: {
            type: String,
            enum: ["member", "helper", "pastor", "admin"],
            default: "member",
          },
          addedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },

    // Updated Membership System with new tiers
    membership: {
      tier: {
        type: String,
        enum: ["free", "pro", "pro_plus", "tier_1", "tier_2"],
        default: "free",
      },
      subscriptionStatus: {
        type: String,
        enum: ["active", "inactive", "cancelled", "expired", "trial"],
        default: "inactive",
      },
      subscriptionId: String,
      subscriptionStartDate: Date,
      subscriptionEndDate: Date,
      trialUsed: {
        type: Boolean,
        default: false,
      },
      trialEndDate: Date,
      pointMultiplier: {
        type: Number,
        default: 1, // 1x for free, 2x for tier 1, 3x for tier 2
      },
      monthlyCoins: {
        type: Number,
        default: 0, // 0 for free, 500 for tier 1, 1000 for tier 2
      },
    },

    // Enhanced Helper system
    isHelper: {
      type: Boolean,
      default: false,
    },
    helperInfo: {
      skills: [String],
      availability: {
        hoursPerWeek: {
          type: String,
          enum: ["more_30", "less_30", "as_needed", "none"],
          default: "none",
        },
        days: [String],
        hours: String,
        willingToTravel: {
          type: Boolean,
          default: false,
        },
        travelDistance: Number, // in miles
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      rates: {
        hourly: Number,
        project: Number,
      },
      badge: {
        type: String,
        enum: ["none", "silver", "gold"],
        default: "none",
      },
      rating: {
        average: {
          type: Number,
          default: 0,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
      reviews: [
        {
          reviewerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          rating: {
            type: Number,
            min: 1,
            max: 5,
          },
          comment: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },

    // Legal agreements
    agreements: {
      termsAccepted: {
        type: Boolean,
        default: false,
      },
      termsAcceptedDate: Date,
      privacyAccepted: {
        type: Boolean,
        default: false,
      },
      privacyAcceptedDate: Date,
      artistDisclaimer: {
        type: Boolean,
        default: false,
      },
      artistDisclaimerDate: Date,
      helperAgreement: {
        type: Boolean,
        default: false,
      },
      helperAgreementDate: Date,
      noAIConfirmation: {
        type: Boolean,
        default: false,
      },
      noAIConfirmationDate: Date,
    },

    // Email verification
    emailVerificationToken: String,
    emailVerificationExpires: Date,

    // Password reset
    passwordResetToken: String,
    passwordResetExpires: Date,

    // Notifications preferences
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
      marketing: {
        type: Boolean,
        default: false,
      },
      helperRequests: {
        type: Boolean,
        default: true,
      },
    },

    // Activity tracking
    lastLogin: Date,
    loginCount: {
      type: Number,
      default: 0,
    },

    // Referral System
    referrals: {
      referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      referralCode: {
        type: String,
        unique: true,
        sparse: true,
      },
      referredUsers: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          userType: String,
          pointsEarned: {
            type: Number,
            default: 0,
          },
          premiumPurchased: {
            type: Boolean,
            default: false,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },

    // Profile Badges and Achievements
    badges: [
      {
        type: {
          type: String,
          enum: [
            "challenge_contributor",
            "matching_contributor",
            "helper_bronze",
            "helper_silver",
            "helper_gold",
            "level_achievement",
            "seasonal_winner",
            "top_contributor",
          ],
        },
        level: String,
        earnedAt: {
          type: Date,
          default: Date.now,
        },
        seasonalSticker: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for better performance
userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ userType: 1 })
userSchema.index({ isActive: 1 })
userSchema.index({ emailVerificationToken: 1 })
userSchema.index({ passwordResetToken: 1 })
userSchema.index({ "referrals.referralCode": 1 })
userSchema.index({ "experience.level": 1 })
userSchema.index({ "membership.tier": 1 })

// Method to generate email verification token
userSchema.methods.generateEmailVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex")
  this.emailVerificationToken = token
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  return token
}

// Method to generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex")
  this.passwordResetToken = token
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes
  return token
}

// Method to generate referral code
userSchema.methods.generateReferralCode = function () {
  const code = crypto.randomBytes(4).toString("hex").toUpperCase()
  this.referrals.referralCode = `${this.userType.toUpperCase()}-${code}`
  return this.referrals.referralCode
}

// Method to award experience points
userSchema.methods.awardExperience = function (points, activity) {
  const now = new Date()

  // Check daily limits based on activity type
  if (this.shouldResetDailyLimits()) {
    this.resetDailyLimits()
  }

  let canAward = true
  let actualPoints = points

  switch (activity) {
    case "comment":
      if (this.dailyActivity.dailyLimits.comments.count >= 50) {
        canAward = false
      } else {
        this.dailyActivity.dailyLimits.comments.count += 1
      }
      break
    case "like":
      if (this.dailyActivity.dailyLimits.likes.count >= 10) {
        canAward = false
      } else {
        this.dailyActivity.dailyLimits.likes.count += 1
        actualPoints = Math.min(actualPoints, 10) // Max 10 points per day
      }
      break
    case "repost":
      if (this.dailyActivity.dailyLimits.reposts.count >= 20) {
        canAward = false
      } else {
        this.dailyActivity.dailyLimits.reposts.count += 1
        actualPoints = Math.min(actualPoints, 20) // Max 20 points per day
      }
      break
    case "artwork_upload":
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      if (this.dailyActivity.dailyLimits.artworkUploads.lastReset < monthStart) {
        this.dailyActivity.dailyLimits.artworkUploads.count = 0
        this.dailyActivity.dailyLimits.artworkUploads.lastReset = now
      }
      if (this.dailyActivity.dailyLimits.artworkUploads.count >= 500) {
        canAward = false
      } else {
        this.dailyActivity.dailyLimits.artworkUploads.count += actualPoints
      }
      break
    case "donation":
      if (this.dailyActivity.dailyLimits.donations.count >= 100) {
        canAward = false
      } else {
        this.dailyActivity.dailyLimits.donations.count += actualPoints
        actualPoints = Math.min(actualPoints, 100) // Max 100 points per day
      }
      break
  }

  if (canAward) {
    // Apply membership multiplier
    const multipliedPoints = Math.floor(actualPoints * this.membership.pointMultiplier)

    this.experience.currentExp += multipliedPoints
    this.experience.totalExp += multipliedPoints
    this.experience.seasonalExp += multipliedPoints

    // Check for level up (each level requires progressively more XP)
    const requiredExp = this.getRequiredExpForLevel(this.experience.level + 1)
    if (this.experience.currentExp >= requiredExp && this.experience.level < 12) {
      this.levelUp()
    }

    return multipliedPoints
  }

  return 0
}

// Method to calculate required experience for a level
userSchema.methods.getRequiredExpForLevel = (level) => {
  // Progressive XP requirements: 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000
  if (level <= 1) return 0
  return Math.pow(2, level - 2) * 100
}

// Method to handle level up
userSchema.methods.levelUp = function () {
  const oldLevel = this.experience.level
  this.experience.level += 1

  // Award FaithCoins for leveling up
  const coinsAwarded = oldLevel * 50 // More coins for higher levels
  this.faithCoins.current += coinsAwarded
  this.faithCoins.totalEarned += coinsAwarded

  // Award level achievement badge
  this.badges.push({
    type: "level_achievement",
    level: this.experience.level.toString(),
    earnedAt: new Date(),
  })

  return {
    newLevel: this.experience.level,
    coinsAwarded,
  }
}

// Method to award FaithCoins
userSchema.methods.awardFaithCoins = function (amount, reason) {
  this.faithCoins.current += amount
  this.faithCoins.totalEarned += amount

  // Track monthly earnings
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  if (this.faithCoins.lastMonthlyReset < monthStart) {
    this.faithCoins.monthlyEarned = 0
    this.faithCoins.lastMonthlyReset = now
  }
  this.faithCoins.monthlyEarned += amount

  return amount
}

// Method to spend FaithCoins
userSchema.methods.spendFaithCoins = function (amount) {
  if (this.faithCoins.current >= amount) {
    this.faithCoins.current -= amount
    this.faithCoins.totalSpent += amount
    return true
  }
  return false
}

// Method to check if daily limits should be reset
userSchema.methods.shouldResetDailyLimits = function () {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  return this.dailyActivity.dailyLimits.comments.lastReset < today
}

// Method to reset daily limits
userSchema.methods.resetDailyLimits = function () {
  const now = new Date()
  this.dailyActivity.dailyLimits.comments.count = 0
  this.dailyActivity.dailyLimits.comments.lastReset = now
  this.dailyActivity.dailyLimits.likes.count = 0
  this.dailyActivity.dailyLimits.likes.lastReset = now
  this.dailyActivity.dailyLimits.reposts.count = 0
  this.dailyActivity.dailyLimits.reposts.lastReset = now
  this.dailyActivity.dailyLimits.donations.count = 0
  this.dailyActivity.dailyLimits.donations.lastReset = now
}

// Method to update last login and award daily login points
userSchema.methods.updateLastLogin = function () {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const lastLoginDate = this.lastLogin
    ? new Date(this.lastLogin.getFullYear(), this.lastLogin.getMonth(), this.lastLogin.getDate())
    : null

  this.lastLogin = now
  this.loginCount = (this.loginCount || 0) + 1

  // Award daily login points (only once per day)
  if (!lastLoginDate || lastLoginDate < today) {
    const expAwarded = this.awardExperience(50, "daily_login")

    // Update login streak
    if (lastLoginDate && today - lastLoginDate === 86400000) {
      // Exactly 1 day
      this.dailyActivity.loginStreak += 1
    } else if (!lastLoginDate || today - lastLoginDate > 86400000) {
      this.dailyActivity.loginStreak = 1
    }

    return { expAwarded, loginStreak: this.dailyActivity.loginStreak }
  }

  return { expAwarded: 0, loginStreak: this.dailyActivity.loginStreak }
}

// Method to reset seasonal experience
userSchema.methods.resetSeasonalExp = function () {
  this.experience.seasonalExp = 0
  this.experience.lastSeasonReset = new Date()

  // Award seasonal sticker based on final level
  if (this.experience.level >= 8) {
    this.badges.push({
      type: "seasonal_winner",
      level: "diamond",
      earnedAt: new Date(),
      seasonalSticker: "diamond_cross",
    })
  } else if (this.experience.level >= 6) {
    this.badges.push({
      type: "seasonal_winner",
      level: "gold",
      earnedAt: new Date(),
      seasonalSticker: "gold_dove",
    })
  } else if (this.experience.level >= 4) {
    this.badges.push({
      type: "seasonal_winner",
      level: "silver",
      earnedAt: new Date(),
      seasonalSticker: "silver_fish",
    })
  } else {
    this.badges.push({
      type: "seasonal_winner",
      level: "bronze",
      earnedAt: new Date(),
      seasonalSticker: "bronze_lamb",
    })
  }
}

// Virtual for display name
userSchema.virtual("displayName").get(function () {
  return this.name || this.email
})

// Virtual for current level progress
userSchema.virtual("levelProgress").get(function () {
  const currentLevelExp = this.getRequiredExpForLevel(this.experience.level)
  const nextLevelExp = this.getRequiredExpForLevel(this.experience.level + 1)
  const progressExp = this.experience.currentExp - currentLevelExp
  const requiredExp = nextLevelExp - currentLevelExp

  return {
    current: progressExp,
    required: requiredExp,
    percentage: requiredExp > 0 ? Math.floor((progressExp / requiredExp) * 100) : 100,
  }
})

// Export model
const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
