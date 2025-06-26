import mongoose from "mongoose"

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    message: {
      type: String,
      maxlength: 500,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    matchingCampaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MatchingCampaign",
    },
    challengeCampaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChallengeCampaign",
    },
    matchedAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "bank_transfer", "points"],
      default: "card",
    },
    transactionId: String,
    metadata: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
donationSchema.index({ donorId: 1, createdAt: -1 })
donationSchema.index({ recipientId: 1, createdAt: -1 })
donationSchema.index({ matchingCampaignId: 1 })
donationSchema.index({ challengeCampaignId: 1 })
donationSchema.index({ status: 1 })

// Virtual for total amount including match
donationSchema.virtual("totalAmount").get(function () {
  return this.amount + (this.matchedAmount || 0)
})

export default mongoose.models.Donation || mongoose.model("Donation", donationSchema)
