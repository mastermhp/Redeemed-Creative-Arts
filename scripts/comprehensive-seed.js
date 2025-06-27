import bcrypt from "bcryptjs"
import connectDB from "../lib/database.js"

// Import all models
import User from "../models/User.js"
import Artwork from "../models/Artwork.js"
import Contest from "../models/Contest.js"
import Vote from "../models/Vote.js"
import Donation from "../models/Donation.js"
import Event from "../models/Event.js"
import Helper from "../models/Helper.js"
import Notification from "../models/Notification.js"
import Transaction from "../models/Transaction.js"
import ChallengeCampaign from "../models/ChallengeCampaign.js"
import MatchingCampaign from "../models/MatchingCampaign.js"

async function seedDatabase() {
  try {
    console.log("🌱 Starting comprehensive database seeding...")

    // Connect to database
    await connectDB()
    console.log("✅ Connected to database")

    // Clear existing data
    console.log("🧹 Clearing existing data...")
    await User.deleteMany({})
    await Artwork.deleteMany({})
    await Contest.deleteMany({})
    await Vote.deleteMany({})
    await Donation.deleteMany({})
    await Event.deleteMany({})
    await Helper.deleteMany({})
    await Notification.deleteMany({})
    await Transaction.deleteMany({})
    await ChallengeCampaign.deleteMany({})
    await MatchingCampaign.deleteMany({})
    console.log("✅ Cleared existing data")

    // Create Users
    console.log("👥 Creating users...")
    const hashedPassword = await bcrypt.hash("Artist123!", 12)

    const users = await User.create([
      // Admin User
      {
        name: "Admin User",
        email: "admin@redeemedcreative.com",
        password: hashedPassword,
        userType: "admin",
        isVerified: true,
        isActive: true,
        bio: "Platform administrator managing the Redeemed Creative Arts community.",
        location: {
          city: "Dallas",
          state: "TX",
          country: "USA",
        },
        points: {
          current: 10000,
          total: 10000,
          level: "diamond",
        },
        membership: {
          tier: "platinum",
          subscriptionStatus: "active",
          subscriptionStartDate: new Date(),
        },
        agreements: {
          termsAccepted: true,
          termsAcceptedDate: new Date(),
          privacyAccepted: true,
          privacyAcceptedDate: new Date(),
        },
      },

      // Artists
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        password: hashedPassword,
        userType: "artist",
        isVerified: true,
        isActive: true,
        bio: "Contemporary Christian artist specializing in digital illustrations and traditional paintings that reflect God's love and grace.",
        location: {
          city: "Nashville",
          state: "TN",
          country: "USA",
        },
        artistInfo: {
          specialties: ["Digital Art", "Traditional Painting", "Illustration"],
          experience: "advanced",
          portfolio: [
            {
              title: "Divine Light Series",
              description: "A collection of digital paintings exploring themes of hope and redemption",
              imageUrl: "/placeholder.svg?height=300&width=400",
              category: "Digital Art",
            },
          ],
          commissionRates: {
            hourly: 50,
            project: 500,
          },
          availability: "available",
        },
        points: {
          current: 850,
          total: 1250,
          level: "gold",
        },
        membership: {
          tier: "platinum",
          subscriptionStatus: "active",
          subscriptionStartDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        },
        socialLinks: {
          instagram: "https://instagram.com/sarahjohnsonart",
          website: "https://sarahjohnsonart.com",
        },
        profileImage: "/placeholder.svg?height=150&width=150",
        isHelper: true,
        helperInfo: {
          skills: ["Digital Art", "Art Direction", "Workshops"],
          availability: {
            days: ["Monday", "Wednesday", "Friday"],
            hours: "9AM-5PM",
          },
          radius: 50,
          rating: {
            average: 4.8,
            count: 24,
          },
        },
        agreements: {
          termsAccepted: true,
          termsAcceptedDate: new Date(),
          privacyAccepted: true,
          privacyAcceptedDate: new Date(),
          artistDisclaimer: true,
          artistDisclaimerDate: new Date(),
          helperAgreement: true,
          helperAgreementDate: new Date(),
          noAIConfirmation: true,
          noAIConfirmationDate: new Date(),
        },
      },

      {
        name: "Michael Chen",
        email: "michael@example.com",
        password: hashedPassword,
        userType: "artist",
        isVerified: true,
        isActive: true,
        bio: "Sculptor and mixed media artist creating pieces that explore themes of redemption and spiritual transformation.",
        location: {
          city: "Austin",
          state: "TX",
          country: "USA",
        },
        artistInfo: {
          specialties: ["Sculpture", "Mixed Media", "Installation Art"],
          experience: "professional",
          portfolio: [
            {
              title: "Resurrection Series",
              description: "Marble sculptures depicting the resurrection story",
              imageUrl: "/placeholder.svg?height=300&width=400",
              category: "Sculpture",
            },
          ],
          commissionRates: {
            hourly: 75,
            project: 1000,
          },
          availability: "busy",
        },
        points: {
          current: 1200,
          total: 2100,
          level: "platinum",
        },
        membership: {
          tier: "platinum",
          subscriptionStatus: "active",
          subscriptionStartDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
        },
        socialLinks: {
          instagram: "https://instagram.com/michaelchensculpture",
          website: "https://michaelchensculpture.com",
        },
        agreements: {
          termsAccepted: true,
          termsAcceptedDate: new Date(),
          privacyAccepted: true,
          privacyAcceptedDate: new Date(),
          artistDisclaimer: true,
          artistDisclaimerDate: new Date(),
          noAIConfirmation: true,
          noAIConfirmationDate: new Date(),
        },
      },

      {
        name: "Emily Rodriguez",
        email: "emily@example.com",
        password: hashedPassword,
        userType: "artist",
        isVerified: true,
        isActive: true,
        bio: "Watercolor artist and illustrator creating gentle, faith-inspired artwork for children's books and devotionals.",
        location: {
          city: "Phoenix",
          state: "AZ",
          country: "USA",
        },
        artistInfo: {
          specialties: ["Watercolor", "Illustration", "Children's Art"],
          experience: "intermediate",
          portfolio: [
            {
              title: "Children's Bible Stories",
              description: "Watercolor illustrations for children's devotionals",
              imageUrl: "/placeholder.svg?height=300&width=400",
              category: "Illustration",
            },
          ],
          commissionRates: {
            hourly: 35,
            project: 300,
          },
          availability: "available",
        },
        points: {
          current: 650,
          total: 950,
          level: "silver",
        },
        membership: {
          tier: "silver",
          subscriptionStatus: "active",
          subscriptionStartDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        },
        agreements: {
          termsAccepted: true,
          termsAcceptedDate: new Date(),
          privacyAccepted: true,
          privacyAcceptedDate: new Date(),
          artistDisclaimer: true,
          artistDisclaimerDate: new Date(),
          noAIConfirmation: true,
          noAIConfirmationDate: new Date(),
        },
      },

      // Patrons
      {
        name: "David Thompson",
        email: "david@example.com",
        password: hashedPassword,
        userType: "patron",
        isVerified: true,
        isActive: true,
        bio: "Art collector and supporter of Christian artists. Passionate about supporting emerging talent in the faith community.",
        location: {
          city: "Atlanta",
          state: "GA",
          country: "USA",
        },
        points: {
          current: 2500,
          total: 4200,
          level: "diamond",
        },
        membership: {
          tier: "platinum",
          subscriptionStatus: "active",
          subscriptionStartDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        },
        agreements: {
          termsAccepted: true,
          termsAcceptedDate: new Date(),
          privacyAccepted: true,
          privacyAcceptedDate: new Date(),
        },
      },

      {
        name: "Lisa Martinez",
        email: "lisa@example.com",
        password: hashedPassword,
        userType: "patron",
        isVerified: true,
        isActive: true,
        bio: "Interior designer who loves incorporating Christian art into homes and businesses.",
        location: {
          city: "Denver",
          state: "CO",
          country: "USA",
        },
        points: {
          current: 1800,
          total: 2800,
          level: "platinum",
        },
        membership: {
          tier: "silver",
          subscriptionStatus: "active",
          subscriptionStartDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000),
        },
        agreements: {
          termsAccepted: true,
          termsAcceptedDate: new Date(),
          privacyAccepted: true,
          privacyAcceptedDate: new Date(),
        },
      },

      // Churches
      {
        name: "Pastor John Smith",
        email: "pastor@gracechurch.com",
        password: hashedPassword,
        userType: "church",
        isVerified: true,
        isActive: true,
        bio: "Lead Pastor at Grace Community Church committed to supporting Christian artists.",
        location: {
          city: "Houston",
          state: "TX",
          country: "USA",
        },
        churchInfo: {
          organizationName: "Grace Community Church",
          denomination: "Non-denominational",
          size: "500-1000",
          address: {
            street: "123 Faith Street",
            city: "Houston",
            state: "TX",
            zipCode: "77001",
          },
          pastor: "Pastor John Smith",
          artsMinistryContact: "Sarah Williams",
        },
        points: {
          current: 3200,
          total: 5500,
          level: "diamond",
        },
        membership: {
          tier: "platinum",
          subscriptionStatus: "active",
          subscriptionStartDate: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000),
        },
        agreements: {
          termsAccepted: true,
          termsAcceptedDate: new Date(),
          privacyAccepted: true,
          privacyAcceptedDate: new Date(),
        },
      },

      {
        name: "Pastor Maria Garcia",
        email: "maria@newlifechurch.com",
        password: hashedPassword,
        userType: "church",
        isVerified: true,
        isActive: true,
        bio: "Arts Pastor at New Life Church passionate about integrating arts into worship.",
        location: {
          city: "Birmingham",
          state: "AL",
          country: "USA",
        },
        churchInfo: {
          organizationName: "New Life Church",
          denomination: "Pentecostal",
          size: "200-500",
          address: {
            street: "456 Hope Avenue",
            city: "Birmingham",
            state: "AL",
            zipCode: "35203",
          },
          pastor: "Pastor Robert Garcia",
          artsMinistryContact: "Pastor Maria Garcia",
        },
        points: {
          current: 1500,
          total: 2200,
          level: "gold",
        },
        membership: {
          tier: "silver",
          subscriptionStatus: "active",
          subscriptionStartDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
        },
        agreements: {
          termsAccepted: true,
          termsAcceptedDate: new Date(),
          privacyAccepted: true,
          privacyAcceptedDate: new Date(),
        },
      },
    ])

    console.log(`✅ Created ${users.length} users`)

    // Get user references
    const artists = users.filter((u) => u.userType === "artist")
    const patrons = users.filter((u) => u.userType === "patron")
    const churches = users.filter((u) => u.userType === "church")
    const admin = users.find((u) => u.userType === "admin")

    // Create Artworks
    console.log("🎨 Creating artworks...")
    const artworks = await Artwork.create([
      {
        title: "Divine Light",
        description:
          "A stunning digital illustration depicting the light of Christ breaking through darkness, symbolizing hope and redemption.",
        artist: artists[0]._id,
        category: "digital",
        medium: "Digital Illustration",
        dimensions: {
          width: 24,
          height: 36,
          unit: "inches",
        },
        images: [
          {
            url: "/placeholder.svg?height=400&width=600",
            publicId: "divine_light_main",
            isPrimary: true,
          },
        ],
        tags: ["light", "hope", "redemption", "christ", "digital"],
        pricing: {
          isForSale: true,
          price: 150,
          currency: "USD",
          acceptsOffers: true,
        },
        status: "approved",
        isFeatured: true,
        engagement: {
          views: 1247,
          likes: 89,
          shares: 23,
          comments: 15,
        },
        pointsEarned: {
          upload: 50,
          engagement: 25,
          total: 75,
        },
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },

      {
        title: "Faith Journey",
        description: "An abstract watercolor piece representing the ups and downs of a believer's spiritual journey.",
        artist: artists[0]._id,
        category: "painting",
        medium: "Watercolor on Paper",
        dimensions: {
          width: 18,
          height: 24,
          unit: "inches",
        },
        images: [
          {
            url: "/placeholder.svg?height=400&width=600",
            publicId: "faith_journey_main",
            isPrimary: true,
          },
        ],
        tags: ["faith", "journey", "abstract", "watercolor", "spiritual"],
        pricing: {
          isForSale: true,
          price: 300,
          currency: "USD",
          acceptsOffers: false,
        },
        status: "approved",
        isFeatured: false,
        engagement: {
          views: 892,
          likes: 67,
          shares: 12,
          comments: 8,
        },
        pointsEarned: {
          upload: 50,
          engagement: 20,
          total: 70,
        },
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      },

      {
        title: "Resurrection Morning",
        description: "A powerful sculpture capturing the moment of Christ's resurrection, carved from marble.",
        artist: artists[1]._id,
        category: "sculpture",
        medium: "Marble Sculpture",
        dimensions: {
          width: 24,
          height: 36,
          depth: 18,
          unit: "inches",
        },
        images: [
          {
            url: "/placeholder.svg?height=400&width=600",
            publicId: "resurrection_morning_main",
            isPrimary: true,
          },
          {
            url: "/placeholder.svg?height=400&width=600",
            publicId: "resurrection_morning_side",
            isPrimary: false,
          },
        ],
        tags: ["resurrection", "christ", "marble", "sculpture", "easter"],
        pricing: {
          isForSale: true,
          price: 2500,
          currency: "USD",
          acceptsOffers: true,
        },
        status: "approved",
        isFeatured: true,
        engagement: {
          views: 2156,
          likes: 134,
          shares: 45,
          comments: 28,
        },
        pointsEarned: {
          upload: 50,
          engagement: 40,
          total: 90,
        },
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },

      {
        title: "Peaceful Waters",
        description:
          "A serene watercolor painting of a peaceful lake at sunset, representing God's peace that surpasses understanding.",
        artist: artists[2]._id,
        category: "painting",
        medium: "Watercolor",
        dimensions: {
          width: 16,
          height: 20,
          unit: "inches",
        },
        images: [
          {
            url: "/placeholder.svg?height=400&width=600",
            publicId: "peaceful_waters_main",
            isPrimary: true,
          },
        ],
        tags: ["peace", "nature", "watercolor", "sunset", "tranquil"],
        pricing: {
          isForSale: true,
          price: 180,
          currency: "USD",
          acceptsOffers: false,
        },
        status: "approved",
        isFeatured: false,
        engagement: {
          views: 654,
          likes: 42,
          shares: 8,
          comments: 5,
        },
        pointsEarned: {
          upload: 50,
          engagement: 15,
          total: 65,
        },
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },

      {
        title: "Children's Bible Adventure",
        description:
          "A colorful illustration series for children depicting Noah's Ark with friendly animals and rainbow.",
        artist: artists[2]._id,
        category: "digital",
        medium: "Digital Illustration",
        dimensions: {
          width: 12,
          height: 16,
          unit: "inches",
        },
        images: [
          {
            url: "/placeholder.svg?height=400&width=600",
            publicId: "childrens_bible_main",
            isPrimary: true,
          },
        ],
        tags: ["children", "bible", "noah", "animals", "colorful"],
        pricing: {
          isForSale: true,
          price: 120,
          currency: "USD",
          acceptsOffers: true,
        },
        status: "approved",
        isFeatured: false,
        engagement: {
          views: 423,
          likes: 38,
          shares: 12,
          comments: 7,
        },
        pointsEarned: {
          upload: 50,
          engagement: 12,
          total: 62,
        },
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
    ])

    console.log(`✅ Created ${artworks.length} artworks`)

    // Create Contests
    console.log("🏆 Creating contests...")
    const contests = await Contest.create([
      {
        title: "Easter Celebration Art Contest",
        description: "Create artwork that celebrates the resurrection of Jesus Christ and the joy of Easter.",
        theme: "Easter and Resurrection",
        category: "seasonal",
        organizer: admin._id,
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000),
        votingEndDate: new Date(Date.now() + 44 * 24 * 60 * 60 * 1000),
        prizes: {
          first: { amount: 500, description: "First Place Winner" },
          second: { amount: 300, description: "Second Place Winner" },
          third: { amount: 200, description: "Third Place Winner" },
        },
        rules: [
          "Artwork must be original and created specifically for this contest",
          "Must relate to Easter or resurrection themes",
          "All mediums accepted",
          "Maximum 3 submissions per artist",
        ],
        judging: {
          criteria: ["Creativity", "Technical Skill", "Theme Relevance", "Spiritual Impact"],
          judges: [admin._id],
        },
        status: "draft",
        maxSubmissions: 3,
        entryFee: 0,
        stats: {
          participants: 0,
          submissions: 0,
          views: 234,
        },
      },

      {
        title: "Faith in Nature Art Challenge",
        description:
          "Explore God's creation through art. Create pieces that showcase the beauty of nature and God's handiwork.",
        theme: "Nature and Creation",
        category: "thematic",
        organizer: admin._id,
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 44 * 24 * 60 * 60 * 1000),
        votingEndDate: new Date(Date.now() + 51 * 24 * 60 * 60 * 1000),
        prizes: {
          first: { amount: 300, description: "First Place Winner" },
          second: { amount: 200, description: "Second Place Winner" },
          third: { amount: 100, description: "Third Place Winner" },
        },
        rules: [
          "Artwork must depict nature or creation themes",
          "Original work only",
          "Any medium accepted",
          "Maximum 2 submissions per artist",
        ],
        judging: {
          criteria: ["Artistic Merit", "Theme Interpretation", "Originality"],
          judges: [admin._id],
        },
        status: "draft",
        maxSubmissions: 2,
        entryFee: 10,
        stats: {
          participants: 0,
          submissions: 0,
          views: 156,
        },
      },
    ])

    console.log(`✅ Created ${contests.length} contests`)

    // Create Events
    console.log("📅 Creating events...")
    const events = await Event.create([
      {
        title: "Christian Artists Workshop: Digital Art Techniques",
        description:
          "Learn advanced digital art techniques from professional Christian artists. Perfect for beginners and intermediate artists.",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
        location: "Grace Community Church Art Center, 123 Faith Street, Houston, TX 77001",
        address: "123 Faith Street, Houston, TX 77001",
        coordinates: {
          latitude: 29.7604,
          longitude: -95.3698,
        },
        maxAttendees: 25,
        currentAttendees: 12,
        price: 45,
        organizer: churches[0]._id,
        helpers: [artists[0]._id],
        attendees: [
          {
            userId: patrons[0]._id,
            registeredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            status: "registered",
            paymentStatus: "paid",
          },
          {
            userId: patrons[1]._id,
            registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            status: "registered",
            paymentStatus: "paid",
          },
        ],
        categories: ["Workshop", "Training"],
        tags: ["workshop", "digital art", "education", "techniques"],
        requirements: ["Bring your own laptop/tablet", "Basic art software knowledge helpful"],
        materials: ["Digital drawing tablet (optional)", "Art software installed"],
        images: ["/placeholder.svg?height=300&width=400"],
        status: "active",
        isPublic: true,
        registrationDeadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        contactInfo: {
          email: "events@gracechurch.com",
          phone: "(713) 555-0123",
        },
      },

      {
        title: "Watercolor Painting conference",
        description:
          "A peaceful weekend conference focused on watercolor techniques and spiritual reflection through art.",
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
        location: "New Life Church conference Center, 456 Hope Avenue, Birmingham, AL 35203",
        address: "456 Hope Avenue, Birmingham, AL 35203",
        coordinates: {
          latitude: 33.5186,
          longitude: -86.8104,
        },
        maxAttendees: 15,
        currentAttendees: 8,
        price: 150,
        organizer: churches[1]._id,
        helpers: [artists[2]._id],
        attendees: [
          {
            userId: artists[0]._id,
            registeredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            status: "registered",
            paymentStatus: "paid",
          },
        ],
        categories: ["Conference", "Workshop"],
        tags: ["conference", "watercolor", "spiritual", "weekend"],
        requirements: ["All materials provided", "No experience necessary"],
        materials: ["Watercolor paints", "Brushes", "Paper", "Easels"],
        images: ["/placeholder.svg?height=300&width=400"],
        status: "active",
        isPublic: true,
        registrationDeadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        contactInfo: {
          email: "conference@newlifechurch.com",
          phone: "(205) 555-0456",
        },
        socialLinks: {
          facebook: "https://facebook.com/newlifechurchconference",
          instagram: "https://instagram.com/newlifeconference",
        },
      },

      {
        title: "Online Art Critique Session",
        description:
          "Join fellow Christian artists for constructive feedback and encouragement in your artistic journey.",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        location: "Online via Zoom",
        maxAttendees: 20,
        currentAttendees: 16,
        price: 0,
        organizer: admin._id,
        helpers: [artists[0]._id, artists[1]._id],
        attendees: [
          {
            userId: artists[2]._id,
            registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            status: "registered",
            paymentStatus: "free",
          },
          {
            userId: patrons[0]._id,
            registeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            status: "registered",
            paymentStatus: "free",
          },
        ],
        categories: ["Community", "Networking"],
        tags: ["critique", "online", "community", "feedback"],
        requirements: ["Bring 1-2 artworks to share", "Stable internet connection"],
        materials: ["Computer/tablet with camera", "Your artwork (digital or physical)"],
        images: ["/placeholder.svg?height=300&width=400"],
        status: "active",
        isPublic: true,
        registrationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        contactInfo: {
          email: "critique@redeemedcreative.com",
        },
      },
    ])

    console.log(`✅ Created ${events.length} events`)

    // Create Donations
    console.log("💝 Creating donations...")
    const donations = await Donation.create([
      {
        donorId: patrons[0]._id,
        recipientId: artists[0]._id,
        amount: 100,
        message: "Love your work! Keep creating beautiful art that glorifies God.",
        isAnonymous: false,
        status: "completed",
        paymentMethod: "card",
        transactionId: "txn_" + Math.random().toString(36).substr(2, 9),
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },

      {
        donorId: patrons[1]._id,
        recipientId: artists[1]._id,
        amount: 250,
        message: "This sculpture will be perfect for our church sanctuary.",
        isAnonymous: false,
        status: "completed",
        paymentMethod: "paypal",
        transactionId: "txn_" + Math.random().toString(36).substr(2, 9),
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },

      {
        donorId: churches[0]._id,
        recipientId: artists[2]._id,
        amount: 75,
        message: "Thank you for the beautiful children's ministry artwork!",
        isAnonymous: false,
        status: "completed",
        paymentMethod: "bank_transfer",
        transactionId: "txn_" + Math.random().toString(36).substr(2, 9),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },

      {
        donorId: patrons[0]._id,
        recipientId: admin._id,
        amount: 500,
        message: "Supporting the mission of Redeemed Creative Arts!",
        isAnonymous: true,
        status: "completed",
        paymentMethod: "card",
        transactionId: "txn_" + Math.random().toString(36).substr(2, 9),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ])

    console.log(`✅ Created ${donations.length} donations`)

    // Create Notifications
    console.log("🔔 Creating notifications...")
    const notifications = await Notification.create([
      {
        recipient: artists[0]._id,
        type: "donation_received",
        title: "New Donation Received!",
        message: "You received a $100 donation from David Thompson",
        data: {
          donationId: donations[0]._id,
          amount: 100,
          donorName: "David Thompson",
        },
        isRead: false,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },

      {
        recipient: artists[1]._id,
        type: "artwork_sold",
        title: "Artwork Sold!",
        message: "Your sculpture 'Resurrection Morning' has been purchased",
        data: {
          artworkId: artworks[2]._id,
          amount: 250,
          buyerName: "Lisa Martinez",
        },
        isRead: false,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },

      {
        recipient: artists[2]._id,
        type: "commission_completed",
        title: "Commission Payment Received",
        message: "Payment received for your children's ministry artwork",
        data: {
          amount: 75,
          clientName: "Grace Community Church",
        },
        isRead: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ])

    console.log(`✅ Created ${notifications.length} notifications`)

    console.log("🎯 Skipping challenge campaigns for now...")
    console.log("🤝 Skipping matching campaigns for now...")

    console.log("\n🎉 Database seeding completed successfully!")
    console.log("\n📊 Summary:")
    console.log(`👥 Users: ${users.length}`)
    console.log(`   - Admin: 1`)
    console.log(`   - Artists: ${artists.length}`)
    console.log(`   - Patrons: ${patrons.length}`)
    console.log(`   - Churches: ${churches.length}`)
    console.log(`🎨 Artworks: ${artworks.length}`)
    console.log(`🏆 Contests: ${contests.length}`)
    console.log(`📅 Events: ${events.length}`)
    console.log(`💝 Donations: ${donations.length}`)
    console.log(`🔔 Notifications: ${notifications.length}`)

    console.log("\n🔐 Test Login Credentials:")
    console.log("Admin Email: admin@redeemedcreative.com, Password: Admin123!")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  }
}

seedDatabase()
