import connectDB from "../lib/database.js"
import User from "../models/User.js"
import { hashPassword } from "../lib/auth.js"

const demoUsers = [
  {
    name: "System Administrator",
    email: "admin@redeemedcreative.com",
    password: "Demo123!",
    userType: "admin",
    isVerified: true,
    isActive: true,
    points: {
      current: 1000,
      total: 1000,
      level: "diamond",
    },
    membership: {
      tier: "premium",
      subscriptionStatus: "active",
    },
    bio: "System administrator for Redeemed Creative Arts platform.",
  },
  {
    name: "Sarah Johnson",
    email: "artist@example.com",
    password: "Demo123!",
    userType: "artist",
    isVerified: true,
    isActive: true,
    isHelper: true,
    points: {
      current: 750,
      total: 750,
      level: "gold",
    },
    membership: {
      tier: "premium",
      subscriptionStatus: "active",
    },
    bio: "Christian artist specializing in contemporary worship art and biblical illustrations.",
    location: "Nashville, TN",
    artistInfo: {
      specialties: ["Digital Art", "Traditional Painting", "Illustration"],
      experience: "professional",
      portfolio: [],
      commissionRates: {
        digital: 150,
        traditional: 300,
        illustration: 200,
      },
      availability: "available",
    },
    helperInfo: {
      skills: ["Event Setup", "Art Installation", "Workshop Teaching"],
      availability: "weekends",
      experience: "5+ years",
      certifications: ["Art Education Certificate"],
    },
    socialLinks: {
      website: "https://sarahjohnsonart.com",
      instagram: "@sarahjohnsonart",
      facebook: "Sarah Johnson Art",
    },
  },
  {
    name: "Michael Davis",
    email: "patron@example.com",
    password: "Demo123!",
    userType: "patron",
    isVerified: true,
    isActive: true,
    points: {
      current: 500,
      total: 500,
      level: "silver",
    },
    membership: {
      tier: "premium",
      subscriptionStatus: "active",
    },
    bio: "Art collector and supporter of Christian artists. Passionate about faith-based contemporary art.",
    location: "Dallas, TX",
    socialLinks: {
      linkedin: "michael-davis-art-collector",
    },
  },
  {
    name: "Grace Community Church",
    email: "church@example.com",
    password: "Demo123!",
    userType: "church",
    isVerified: true,
    isActive: true,
    points: {
      current: 300,
      total: 300,
      level: "bronze",
    },
    membership: {
      tier: "free",
      subscriptionStatus: "inactive",
    },
    bio: "A vibrant community church seeking to connect with local Christian artists for worship and outreach.",
    location: "Austin, TX",
    churchInfo: {
      organizationName: "Grace Community Church",
      denomination: "Non-denominational",
      size: "300-500",
      address: {
        street: "123 Faith Street",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
      },
      pastor: "Pastor David Wilson",
      artsMinistryContact: "Emily Rodriguez",
      website: "https://gracecommunityaustin.org",
      phone: "(512) 555-0123",
    },
    socialLinks: {
      website: "https://gracecommunityaustin.org",
      facebook: "Grace Community Church Austin",
      instagram: "@gracecommunityatx",
    },
  },
  {
    name: "Rebecca Martinez",
    email: "artist2@example.com",
    password: "Demo123!",
    userType: "artist",
    isVerified: true,
    isActive: true,
    points: {
      current: 400,
      total: 400,
      level: "silver",
    },
    membership: {
      tier: "free",
      subscriptionStatus: "inactive",
    },
    bio: "Emerging Christian artist focusing on mixed media and contemporary worship visuals.",
    location: "Phoenix, AZ",
    artistInfo: {
      specialties: ["Mixed Media", "Digital Art", "Photography"],
      experience: "intermediate",
      portfolio: [],
      commissionRates: {
        digital: 100,
        mixed_media: 250,
        photography: 175,
      },
      availability: "available",
    },
    socialLinks: {
      instagram: "@rebeccamartinezart",
      website: "https://rebeccamartinezart.com",
    },
  },
  {
    name: "James Thompson",
    email: "patron2@example.com",
    password: "Demo123!",
    userType: "patron",
    isVerified: true,
    isActive: true,
    points: {
      current: 200,
      total: 200,
      level: "bronze",
    },
    membership: {
      tier: "free",
      subscriptionStatus: "inactive",
    },
    bio: "Business owner who loves supporting Christian artists and their ministries.",
    location: "Atlanta, GA",
  },
]

async function seedDemoUsers() {
  try {
    console.log("🌱 Starting demo user seeding...")

    // Connect to database
    await connectDB()
    console.log("✅ Connected to database")

    // Clear existing demo users (optional - comment out if you want to keep existing data)
    const demoEmails = demoUsers.map((user) => user.email)
    await User.deleteMany({ email: { $in: demoEmails } })
    console.log("🗑️ Cleared existing demo users")

    // Create demo users
    for (const userData of demoUsers) {
      try {
        // Hash password
        const hashedPassword = await hashPassword(userData.password)

        // Create user with hashed password
        const user = new User({
          ...userData,
          password: hashedPassword,
          createdAt: new Date(),
          lastLogin: new Date(),
          loginCount: Math.floor(Math.random() * 50) + 1,
          agreements: {
            termsAccepted: true,
            termsAcceptedDate: new Date(),
            privacyAccepted: true,
            privacyAcceptedDate: new Date(),
            artistDisclaimer: userData.userType === "artist",
            artistDisclaimerDate: userData.userType === "artist" ? new Date() : null,
            noAIConfirmation: userData.userType === "artist",
            noAIConfirmationDate: userData.userType === "artist" ? new Date() : null,
          },
        })

        await user.save()
        console.log(`✅ Created ${userData.userType}: ${userData.email}`)
      } catch (error) {
        console.error(`❌ Failed to create user ${userData.email}:`, error.message)
      }
    }

    console.log("🎉 Demo user seeding completed!")
    console.log("\n📋 Demo Accounts Created:")
    console.log("┌─────────────────────────────────────────────────────────┐")
    console.log("│ User Type │ Email                        │ Password    │")
    console.log("├─────────────────────────────────────────────────────────┤")
    console.log("│ Admin     │ admin@redeemedcreative.com   │ Demo123!    │")
    console.log("│ Artist    │ artist@example.com           │ Demo123!    │")
    console.log("│ Artist    │ artist2@example.com          │ Demo123!    │")
    console.log("│ Patron    │ patron@example.com           │ Demo123!    │")
    console.log("│ Patron    │ patron2@example.com          │ Demo123!    │")
    console.log("│ Church    │ church@example.com           │ Demo123!    │")
    console.log("└─────────────────────────────────────────────────────────┘")
    console.log("\n🚀 You can now test the authentication system!")

    process.exit(0)
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

// Run the seeding function
seedDemoUsers()
