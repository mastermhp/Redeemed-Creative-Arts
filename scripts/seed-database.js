import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, "../.env.local") })
import connectDB from "../lib/database.js"
import User from "../models/User.js"

async function seedDatabase() {
  try {
    console.log("🔄 Starting database seeding...")
    console.log("📍 MongoDB URI:", process.env.MONGODB_URI ? "✅ Found" : "❌ Missing")

    // Connect to database
    await connectDB()
    console.log("✅ Connected to MongoDB")

    // Clear existing users (optional - comment out in production)
    const existingUsers = await User.countDocuments()
    console.log(`📊 Found ${existingUsers} existing users`)

    if (existingUsers > 0) {
      console.log("🧹 Clearing existing users...")
      await User.deleteMany({})
      console.log("✅ Cleared existing users")
    }

    // Create Admin User
    console.log("👑 Creating admin user...")
    const admin = new User({
      name: "Admin User",
      email: "admin@redeemedcreativearts.com",
      password: "AdminPass123!",
      userType: "admin",
      isVerified: true,
      isActive: true,
      points: {
        current: 10000,
        total: 10000,
        level: "diamond",
      },
      membership: {
        tier: "diamond",
        subscriptionStatus: "active",
      },
      agreements: {
        termsAccepted: true,
        termsAcceptedDate: new Date(),
      },
    })

    const savedAdmin = await admin.save()
    console.log("✅ Created admin user:", savedAdmin.email)

    // Create Test Artist
    console.log("🎨 Creating test artist...")
    const artist = new User({
      name: "Sarah Johnson",
      email: "artist@example.com",
      password: "Artist123!",
      userType: "artist",
      isVerified: true,
      isActive: true,
      bio: "Christian artist specializing in contemporary worship art",
      location: {
        city: "Nashville",
        state: "TN",
        country: "USA",
      },
      artistInfo: {
        specialties: ["Painting", "Digital Art", "Illustration"],
        experience: "intermediate",
        portfolio: [],
        commissionRates: {
          hourly: 50,
          project: 500,
        },
        availability: "available",
      },
      points: {
        current: 750,
        total: 1200,
        level: "silver",
      },
      membership: {
        tier: "silver",
        subscriptionStatus: "active",
      },
      isHelper: true,
      helperInfo: {
        skills: ["Painting", "Art Direction", "Workshops"],
        availability: {
          days: ["Monday", "Wednesday", "Friday"],
          hours: "9AM-5PM",
        },
        radius: 50,
        rating: {
          average: 4.8,
          count: 12,
        },
      },
      agreements: {
        termsAccepted: true,
        termsAcceptedDate: new Date(),
        artistDisclaimer: true,
        artistDisclaimerDate: new Date(),
        helperAgreement: true,
        helperAgreementDate: new Date(),
        noAIConfirmation: true,
        noAIConfirmationDate: new Date(),
      },
    })
    const savedArtist = await artist.save()
    console.log("✅ Created test artist:", savedArtist.email)

    // Create Test Patron
    console.log("💝 Creating test patron...")
    const patron = new User({
      name: "Michael Davis",
      email: "patron@example.com",
      password: "Patron123!",
      userType: "patron",
      isVerified: true,
      isActive: true,
      bio: "Art enthusiast and supporter of Christian artists",
      location: {
        city: "Dallas",
        state: "TX",
        country: "USA",
      },
      points: {
        current: 500,
        total: 800,
        level: "bronze",
      },
      membership: {
        tier: "bronze",
        subscriptionStatus: "active",
      },
      isHelper: true,
      helperInfo: {
        skills: ["Event Planning", "Marketing", "Photography"],
        availability: {
          days: ["Saturday", "Sunday"],
          hours: "10AM-6PM",
        },
        radius: 25,
        rating: {
          average: 4.6,
          count: 8,
        },
      },
      agreements: {
        termsAccepted: true,
        termsAcceptedDate: new Date(),
        helperAgreement: true,
        helperAgreementDate: new Date(),
      },
    })
    const savedPatron = await patron.save()
    console.log("✅ Created test patron:", savedPatron.email)

    // Create Test Church
    console.log("⛪ Creating test church...")
    const church = new User({
      name: "Grace Community Church",
      email: "church@example.com",
      password: "Church123!",
      userType: "church",
      isVerified: true,
      isActive: true,
      bio: "A vibrant community church seeking to connect with local artists",
      location: {
        city: "Austin",
        state: "TX",
        country: "USA",
      },
      churchInfo: {
        organizationName: "Grace Community Church",
        denomination: "Non-denominational",
        size: "500-1000",
        address: {
          street: "123 Faith Street",
          city: "Austin",
          state: "TX",
          zipCode: "78701",
        },
        pastor: "Pastor John Smith",
        artsMinistryContact: "Mary Johnson",
      },
      points: {
        current: 300,
        total: 600,
        level: "bronze",
      },
      membership: {
        tier: "bronze",
        subscriptionStatus: "active",
      },
      agreements: {
        termsAccepted: true,
        termsAcceptedDate: new Date(),
      },
    })
    const savedChurch = await church.save()
    console.log("✅ Created test church:", savedChurch.email)

    // Verify all users were created
    const totalUsers = await User.countDocuments()
    console.log(`📊 Total users created: ${totalUsers}`)

    console.log("\n🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!")
    console.log("\n🔑 LOGIN CREDENTIALS:")
    console.log("=".repeat(50))
    console.log("👑 ADMIN ACCESS:")
    console.log("   Email: admin@redeemedcreativearts.com")
    console.log("   Password: AdminPass123!")
    console.log("\n🎨 ARTIST ACCOUNT:")
    console.log("   Email: artist@example.com")
    console.log("   Password: Artist123!")
    console.log("\n💝 PATRON ACCOUNT:")
    console.log("   Email: patron@example.com")
    console.log("   Password: Patron123!")
    console.log("\n⛪ CHURCH ACCOUNT:")
    console.log("   Email: church@example.com")
    console.log("   Password: Church123!")
    console.log("=".repeat(50))
    console.log("\n✅ Ready to test all features!")
    console.log("🚀 Start the development server: npm run dev")
    console.log("🌐 Visit: http://localhost:3000")

    process.exit(0)
  } catch (error) {
    console.error("❌ SEEDING FAILED:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  }
}

// Run the seeding function
seedDatabase()
