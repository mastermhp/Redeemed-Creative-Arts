import mongoose from "mongoose"

const helperSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    availability: {
      type: String,
      enum: ["weekdays", "weekends", "evenings", "flexible", "by_appointment"],
      default: "flexible",
    },
    hourlyRate: {
      type: Number,
      min: 0,
      default: 0,
    },
    experience: {
      type: String,
      enum: ["beginner", "1-2 years", "3-5 years", "5+ years", "10+ years"],
      default: "beginner",
    },
    portfolio: String,
    certifications: [String],
    languages: [
      {
        type: String,
        default: ["English"],
      },
    ],
    serviceRadius: {
      type: Number, // in miles
      default: 25,
    },
    isRemoteAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    completedJobs: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationDocuments: [String],
    backgroundCheck: {
      status: {
        type: String,
        enum: ["pending", "approved", "rejected", "not_required"],
        default: "not_required",
      },
      completedAt: Date,
    },
    specializations: [
      {
        type: String,
        enum: [
          "Digital Art",
          "Traditional Art",
          "Graphic Design",
          "Photography",
          "Music",
          "Writing",
          "Event Planning",
          "Teaching",
          "Mentoring",
          "Marketing",
          "Social Media",
          "Web Design",
          "Video Production",
          "Audio Production",
          "Community Outreach",
          "Fundraising",
        ],
      },
    ],
    workPreferences: {
      projectTypes: [
        {
          type: String,
          enum: ["one-time", "ongoing", "contract", "volunteer"],
        },
      ],
      maxProjectDuration: String,
      preferredCommunication: {
        type: String,
        enum: ["email", "phone", "video_call", "in_person"],
        default: "email",
      },
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for search and filtering
helperSchema.index({ isActive: 1, isVerified: 1 })
helperSchema.index({ skills: 1 })
helperSchema.index({ specializations: 1 })
helperSchema.index({ availability: 1 })
helperSchema.index({ hourlyRate: 1 })
helperSchema.index({ rating: -1 })
helperSchema.index({ userId: 1 })

// Virtual for average rating display
helperSchema.virtual("displayRating").get(function () {
  return this.reviewCount > 0 ? this.rating : "New Helper"
})

// Method to update rating
helperSchema.methods.updateRating = function (newRating) {
  const totalRating = this.rating * this.reviewCount + newRating
  this.reviewCount += 1
  this.rating = totalRating / this.reviewCount
  return this.save()
}

export default mongoose.models.Helper || mongoose.model("Helper", helperSchema)
