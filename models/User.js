import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // User Type & Role
    userType: {
      type: String,
      enum: ["artist", "patron", "church", "admin"],
      required: true,
    },

    // Profile Information
    profileImage: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    location: {
      city: String,
      state: String,
      country: String,
    },

    // Contact Information
    phone: String,
    website: String,
    socialMedia: {
      instagram: String,
      facebook: String,
      twitter: String,
    },

    // Artist-specific fields
    artistInfo: {
      specialties: [String],
      experience: String,
      portfolio: [String], // Cloudinary URLs
      commissionRates: {
        hourly: Number,
        project: Number,
      },
      availability: {
        type: String,
        enum: ["available", "busy", "unavailable"],
        default: "available",
      },
    },

    // Church-specific fields
    churchInfo: {
      organizationName: String,
      denomination: String,
      size: String,
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
      },
      pastor: String,
      artsMinistryContact: String,
    },

    // Points & Gamification
    points: {
      current: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      level: { type: String, default: "bronze" },
    },

    // Membership & Subscription
    membership: {
      tier: {
        type: String,
        enum: ["free", "bronze", "silver", "gold", "platinum", "diamond"],
        default: "free",
      },
      subscriptionId: String,
      subscriptionStatus: String,
      subscriptionExpiry: Date,
    },

    // Helper Program
    isHelper: {
      type: Boolean,
      default: false,
    },
    helperInfo: {
      skills: [String],
      availability: {
        days: [String],
        hours: String,
      },
      radius: Number, // miles willing to travel
      rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,

    // Password Reset
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    // Agreements & Disclaimers
    agreements: {
      termsAccepted: { type: Boolean, default: false },
      termsAcceptedDate: Date,
      artistDisclaimer: { type: Boolean, default: false },
      artistDisclaimerDate: Date,
      helperAgreement: { type: Boolean, default: false },
      helperAgreementDate: Date,
      noAIConfirmation: { type: Boolean, default: false },
      noAIConfirmationDate: Date,
    },

    // Tracking
    lastLogin: Date,
    loginCount: { type: Number, default: 0 },
    ipAddress: String,

    // Notifications
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
UserSchema.index({ email: 1 })
UserSchema.index({ userType: 1 })
UserSchema.index({ "points.level": 1 })
UserSchema.index({ isActive: 1 })

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Generate verification token
UserSchema.methods.generateVerificationToken = function () {
  const crypto = require("crypto")
  this.verificationToken = crypto.randomBytes(32).toString("hex")
  return this.verificationToken
}

// Generate password reset token
UserSchema.methods.generatePasswordResetToken = function () {
  const crypto = require("crypto")
  this.resetPasswordToken = crypto.randomBytes(32).toString("hex")
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000 // 10 minutes
  return this.resetPasswordToken
}

export default mongoose.models.User || mongoose.model("User", UserSchema)
