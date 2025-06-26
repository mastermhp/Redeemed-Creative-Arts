import mongoose from "mongoose"

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    date: {
      type: Date,
      required: true,
    },
    endDate: Date,
    location: {
      type: String,
      required: true,
    },
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    maxAttendees: {
      type: Number,
      min: 1,
    },
    currentAttendees: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    helpers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    attendees: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        registeredAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["registered", "attended", "cancelled", "no_show"],
          default: "registered",
        },
        paymentStatus: {
          type: String,
          enum: ["pending", "paid", "refunded", "free"],
          default: "free",
        },
      },
    ],
    categories: [
      {
        type: String,
        enum: [
          "Workshop",
          "Conference",
          "Exhibition",
          "Performance",
          "Community",
          "Fundraiser",
          "Competition",
          "Training",
          "Networking",
          "Worship",
        ],
      },
    ],
    tags: [String],
    requirements: [String],
    materials: [String],
    images: [String],
    status: {
      type: String,
      enum: ["draft", "active", "cancelled", "completed", "postponed"],
      default: "draft",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    registrationDeadline: Date,
    cancellationPolicy: String,
    contactInfo: {
      email: String,
      phone: String,
      website: String,
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
eventSchema.index({ date: 1, status: 1 })
eventSchema.index({ organizer: 1 })
eventSchema.index({ categories: 1 })
eventSchema.index({ location: 1 })
eventSchema.index({ isPublic: 1, status: 1 })

// Virtual for available spots
eventSchema.virtual("availableSpots").get(function () {
  if (!this.maxAttendees) return null
  return Math.max(0, this.maxAttendees - this.currentAttendees)
})

// Virtual for is full
eventSchema.virtual("isFull").get(function () {
  if (!this.maxAttendees) return false
  return this.currentAttendees >= this.maxAttendees
})

// Method to check if registration is open
eventSchema.methods.isRegistrationOpen = function () {
  const now = new Date()
  const registrationDeadline = this.registrationDeadline || this.date

  return this.status === "active" && this.date > now && registrationDeadline > now && !this.isFull
}

export default mongoose.models.Event || mongoose.model("Event", eventSchema)
