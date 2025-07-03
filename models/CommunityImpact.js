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
      enum: ["daily", "weekly", "monthly", "quarterly", "yearly"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    metrics: {
      artistsSupported: {
        type: Number,
        default: 0,
      },
      totalDonations: {
        type: Number,
        default: 0,
      },
      eventsHosted: {
        type: Number,
        default: 0,
      },
      helpersBooked: {
        type: Number,
        default: 0,
      },
      communityEngagement: {
        type: Number,
        default: 0,
      },
      artworksPromoted: {
        type: Number,
        default: 0,
      },
      coursesSponsored: {
        type: Number,
        default: 0,
      },
    },
    goals: {
      artistsSupported: {
        target: { type: Number, default: 0 },
        achieved: { type: Number, default: 0 },
      },
      totalDonations: {
        target: { type: Number, default: 0 },
        achieved: { type: Number, default: 0 },
      },
      eventsHosted: {
        target: { type: Number, default: 0 },
        achieved: { type: Number, default: 0 },
      },
      helpersBooked: {
        target: { type: Number, default: 0 },
        achieved: { type: Number, default: 0 },
      },
    },
    achievements: [
      {
        name: String,
        description: String,
        achievedAt: Date,
        points: Number,
      },
    ],
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
communityImpactSchema.index({ church: 1, period: 1, startDate: -1 })
communityImpactSchema.index({ startDate: 1, endDate: 1 })

export default mongoose.models.CommunityImpact || mongoose.model("CommunityImpact", communityImpactSchema)
