import mongoose from "mongoose"

const invitationSchema = new mongoose.Schema(
  {
    inviter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inviteeEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
    inviteeType: {
      type: String,
      enum: ["artist", "patron", "church"],
      required: true,
    },
    invitationToken: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "expired", "cancelled"],
      default: "pending",
    },
    registeredUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    acceptedAt: Date,
    pointsEarned: {
      invitation: {
        type: Number,
        default: 0,
      },
      firstMilestone: {
        type: Number,
        default: 0,
      },
      premiumUpgrade: {
        type: Number,
        default: 0,
      },
    },
    milestones: {
      reached200Points: {
        type: Boolean,
        default: false,
      },
      upgradedToPremium: {
        type: Boolean,
        default: false,
      },
    },
    metadata: {
      message: String,
      remindersSent: {
        type: Number,
        default: 0,
      },
      lastReminderSent: Date,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for efficient queries
invitationSchema.index({ inviter: 1, status: 1 })
invitationSchema.index({ inviteeEmail: 1, status: 1 })
invitationSchema.index({ invitationToken: 1 })
invitationSchema.index({ expiresAt: 1 })

// Virtual to check if invitation is expired
invitationSchema.virtual("isExpired").get(function () {
  return this.expiresAt < new Date()
})

// Method to calculate points based on invitation type
invitationSchema.methods.calculateInvitationPoints = function () {
  switch (this.inviteeType) {
    case "church":
      return 1000
    case "artist":
    case "patron":
      return 50
    default:
      return 0
  }
}

// Pre-save middleware to set points
invitationSchema.pre("save", function (next) {
  if (this.isNew && this.status === "accepted") {
    this.pointsEarned.invitation = this.calculateInvitationPoints()
  }
  next()
})

export default mongoose.models.Invitation || mongoose.model("Invitation", invitationSchema)
