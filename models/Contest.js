import mongoose from "mongoose"

const ContestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    theme: String,
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    votingEndDate: Date,
    status: {
      type: String,
      enum: ["upcoming", "active", "voting", "completed", "cancelled"],
      default: "upcoming",
    },
    maxSubmissions: {
      type: Number,
      default: 1,
    },
    entryFee: {
      type: Number,
      default: 0,
    },
    prizes: [
      {
        position: Number,
        amount: Number,
        description: String,
      },
    ],
    rules: [String],
    categories: [String],
    submissions: [
      {
        artist: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        artwork: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Artwork",
        },
        submissionDate: {
          type: Date,
          default: Date.now,
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalVotes: {
      type: Number,
      default: 0,
    },
    winners: [
      {
        position: Number,
        artist: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        artwork: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Artwork",
        },
        votes: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Update contest status based on dates
ContestSchema.methods.updateStatus = function () {
  const now = new Date()

  if (now < this.startDate) {
    this.status = "upcoming"
  } else if (now >= this.startDate && now < this.endDate) {
    this.status = "active"
  } else if (this.votingEndDate && now >= this.endDate && now < this.votingEndDate) {
    this.status = "voting"
  } else {
    this.status = "completed"
  }
}

export default mongoose.models.Contest || mongoose.model("Contest", ContestSchema)
