import mongoose from "mongoose"

const ContestSchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    theme: String,

    // Dates
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    votingEndDate: Date,

    // Rules & Requirements
    rules: [String],
    eligibility: {
      userTypes: [String],
      membershipTiers: [String],
      minPoints: Number,
    },

    // Prizes
    prizes: [
      {
        rank: Number,
        title: String,
        description: String,
        value: Number,
        points: Number,
      },
    ],

    // Submissions
    submissions: [
      {
        artwork: { type: mongoose.Schema.Types.ObjectId, ref: "Artwork" },
        artist: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        submissionDate: Date,
        votes: { type: Number, default: 0 },
        rank: Number,
      },
    ],

    // Status
    status: {
      type: String,
      enum: ["draft", "active", "voting", "completed", "cancelled"],
      default: "draft",
    },

    // Voting
    votingEnabled: { type: Boolean, default: true },
    maxVotesPerUser: { type: Number, default: 1 },

    // Featured
    isFeatured: { type: Boolean, default: false },

    // Organizer
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
ContestSchema.index({ status: 1 })
ContestSchema.index({ startDate: 1, endDate: 1 })
ContestSchema.index({ isFeatured: 1 })

export default mongoose.models.Contest || mongoose.model("Contest", ContestSchema)
