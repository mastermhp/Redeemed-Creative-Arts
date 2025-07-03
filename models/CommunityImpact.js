import mongoose from "mongoose"

const communityImpactSchema = new mongoose.Schema(
  {
    church: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    period: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    metrics: {
      eventsHosted: {
        type: Number,
        default: 0,
      },
      attendeesReached: {
        type: Number,
        default: 0,
      },
      artistsSupported: {
        type: Number,
        default: 0,
      },
      donationsReceived: {
        type: Number,
        default: 0,
      },
      totalDonationAmount: {
        type: Number,
        default: 0,
      },
      helpersBooked: {
        type: Number,
        default: 0,
      },
      campaignsCreated: {
        type: Number,
        default: 0,
      },
      communityEngagement: {
        type: Number,
        default: 0,
      },
      artworksCommissioned: {
        type: Number,
        default: 0,
      },
      volunteerHours: {
        type: Number,
        default: 0,
      },
    },
    goals: {
      eventsHosted: Number,
      attendeesReached: Number,
      artistsSupported: Number,
      donationsReceived: Number,
      totalDonationAmount: Number,
    },
    achievements: [
      {
        title: String,
        description: String,
        achievedAt: {
          type: Date,
          default: Date.now,
        },
        icon: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Indexes
communityImpactSchema.index({ church: 1, period: 1, date: -1 })
communityImpactSchema.index({ period: 1, date: -1 })

export default mongoose.models.CommunityImpact || mongoose.model("CommunityImpact", communityImpactSchema)
