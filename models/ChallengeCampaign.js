import mongoose from "mongoose"

const challengeCampaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 100,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    bonusAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    donationCount: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    beneficiaries: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        percentage: {
          type: Number,
          min: 0,
          max: 100,
        },
      },
    ],
    milestones: [
      {
        amount: Number,
        description: String,
        isReached: {
          type: Boolean,
          default: false,
        },
        reachedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Indexes
challengeCampaignSchema.index({ isActive: 1, startDate: 1, endDate: 1 })
challengeCampaignSchema.index({ createdBy: 1 })
challengeCampaignSchema.index({ isCompleted: 1 })

// Virtual for progress percentage
challengeCampaignSchema.virtual("progressPercentage").get(function () {
  return Math.min(100, (this.currentAmount / this.targetAmount) * 100)
})

// Virtual for remaining amount
challengeCampaignSchema.virtual("remainingAmount").get(function () {
  return Math.max(0, this.targetAmount - this.currentAmount)
})

// Method to check if challenge is met
challengeCampaignSchema.methods.isChallengeMet = function () {
  return this.currentAmount >= this.targetAmount
}

// Method to check if campaign is currently active
challengeCampaignSchema.methods.isCurrentlyActive = function () {
  const now = new Date()
  return this.isActive && !this.isCompleted && this.startDate <= now && this.endDate >= now
}

export default mongoose.models.ChallengeCampaign || mongoose.model("ChallengeCampaign", challengeCampaignSchema)
