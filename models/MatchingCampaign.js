import mongoose from "mongoose"

const matchingCampaignSchema = new mongoose.Schema(
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
    matchRatio: {
      type: Number,
      required: true,
      min: 1,
      max: 10, // Maximum 10x match
    },
    matchCap: {
      type: Number,
      required: true,
      min: 100,
    },
    currentMatched: {
      type: Number,
      default: 0,
    },
    totalDonations: {
      type: Number,
      default: 0,
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetCategories: [
      {
        type: String,
        enum: ["artist", "patron", "church", "general"],
      },
    ],
    restrictions: {
      minDonation: {
        type: Number,
        default: 1,
      },
      maxDonation: {
        type: Number,
        default: null,
      },
      eligibleUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
matchingCampaignSchema.index({ isActive: 1, startDate: 1, endDate: 1 })
matchingCampaignSchema.index({ createdBy: 1 })

// Virtual for remaining match capacity
matchingCampaignSchema.virtual("remainingMatch").get(function () {
  return Math.max(0, this.matchCap - this.currentMatched)
})

// Virtual for progress percentage
matchingCampaignSchema.virtual("progressPercentage").get(function () {
  return Math.min(100, (this.currentMatched / this.matchCap) * 100)
})

// Method to check if campaign is currently active
matchingCampaignSchema.methods.isCurrentlyActive = function () {
  const now = new Date()
  return this.isActive && this.startDate <= now && this.endDate >= now && this.currentMatched < this.matchCap
}

export default mongoose.models.MatchingCampaign || mongoose.model("MatchingCampaign", matchingCampaignSchema)
