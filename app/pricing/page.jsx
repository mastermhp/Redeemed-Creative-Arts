"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Star,
  Crown,
  Zap,
  Gift,
  Users,
  Palette,
  Heart,
  Church,
  Trophy,
  Target,
  Sparkles,
  ArrowRight,
  DollarSign,
  Award,
  Coins,
} from "lucide-react"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [selectedTier, setSelectedTier] = useState("tier1")
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef)

  // Pricing data with points integration
  const pricingTiers = [
    {
      id: "free",
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started",
      badge: null,
      color: "gray",
      pointsMultiplier: "1x",
      maxPoints: 500,
      features: [
        "Basic artist profile",
        "Upload up to 5 artworks",
        "Participate in community discussions",
        "Basic point earning (1x multiplier)",
        "Access to Resource Share (Churches only)",
        "Standard customer support",
        "Mobile app access",
        "Basic analytics",
      ],
      limitations: [
        "Limited to 5 artwork uploads",
        "No priority support",
        "Basic profile customization",
        "Standard point earning rate",
      ],
      pointsEarning: {
        artworkUpload: 25,
        sale: 50,
        engagement: 10,
        monthly: "Up to 500 points",
      },
    },
    {
      id: "tier1",
      name: "Tier 1",
      price: { monthly: 9.99, annual: 99.99 },
      description: "Enhanced features for growing artists",
      badge: "Most Popular",
      color: "amber",
      pointsMultiplier: "2x",
      maxPoints: 1500,
      features: [
        "Everything in Free",
        "Enhanced profile visibility",
        "Sell up to 25 artworks",
        "Participate in contests and challenges",
        "2x point earning multiplier",
        "Helper program eligibility",
        "Priority customer support",
        "Advanced analytics dashboard",
        "Custom profile themes",
        "Early access to new features",
        "Monthly featured artist opportunity",
        "Commission request system",
      ],
      limitations: ["Limited to 25 artwork sales", "Standard contest entry"],
      pointsEarning: {
        artworkUpload: 50,
        sale: 100,
        engagement: 20,
        monthly: "Up to 1,500 points",
      },
    },
    {
      id: "tier2",
      name: "Tier 2",
      price: { monthly: 19.99, annual: 199.99 },
      description: "Professional tools for serious artists",
      badge: "Professional",
      color: "purple",
      pointsMultiplier: "3x",
      maxPoints: 3000,
      features: [
        "Everything in Tier 1",
        "Unlimited artwork uploads and sales",
        "Create and sell courses/workshops",
        "Priority helper program status",
        "Featured artist opportunities",
        "3x point earning multiplier",
        "Advanced commission tools",
        "Bulk upload capabilities",
        "Custom watermarking",
        "Advanced SEO optimization",
        "Dedicated account manager",
        "White-label portfolio option",
        "API access for integrations",
        "Advanced reporting and insights",
      ],
      limitations: [],
      pointsEarning: {
        artworkUpload: 75,
        sale: 150,
        engagement: 30,
        monthly: "Up to 3,000 points",
      },
    },
  ]

  // Prize pool breakdown
  const prizePool = {
    total: 50000,
    monthly: 5000,
    quarterly: 15000,
    annual: 30000,
    distribution: {
      artists: 60,
      patrons: 25,
      churches: 15,
    },
  }

  // Resource Share details
  const resourceShare = {
    description:
      "Community members can donate and share resources like books, Bibles, tickets, gift cards, study materials, and more.",
    benefits: [
      "Access to donated community resources",
      "Ability to contribute your own resources",
      "Priority access to high-demand items",
      "Resource request system",
      "Community resource ratings and reviews",
    ],
    adminContributions: [
      "Monthly resource packages",
      "Educational materials and courses",
      "Event tickets and workshop access",
      "Art supplies and equipment",
      "Monetary support for talent development",
    ],
  }

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=800&fit=crop')",
            backgroundSize: "cover",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-2 rounded-full mb-6 border border-amber-500/20"
            >
              <Trophy className="h-5 w-5 text-amber-600 mr-2" />
              <span className="text-amber-600 font-medium">Membership Tiers & Points System</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Creative Journey
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 leading-relaxed">
              Unlock powerful features, earn more points, and access exclusive opportunities in our faith-based creative
              community
            </motion.p>

            {/* Prize Pool Highlight */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-xl max-w-md mx-auto mb-8"
            >
              <div className="flex items-center justify-center mb-2">
                <Coins className="h-6 w-6 mr-2" />
                <span className="font-semibold">Total Prize Pool</span>
              </div>
              <div className="text-4xl font-bold mb-2">${prizePool.total.toLocaleString()}</div>
              <div className="text-sm opacity-90">Available for all members to earn</div>
            </motion.div>

            {/* Billing Toggle */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center bg-gray-100 p-1 rounded-lg max-w-xs mx-auto"
            >
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  billingCycle === "monthly"
                    ? "bg-white text-amber-600 shadow-sm"
                    : "text-gray-600 hover:text-amber-600"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
                  billingCycle === "annual" ? "bg-white text-amber-600 shadow-sm" : "text-gray-600 hover:text-amber-600"
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                className={`relative ${tier.id === selectedTier ? "scale-105 z-10" : ""} transition-all duration-300`}
                onHoverStart={() => setSelectedTier(tier.id)}
              >
                <Card
                  className={`h-full border-2 transition-all duration-300 ${
                    tier.color === "amber"
                      ? "border-amber-500 shadow-amber-500/20 shadow-xl"
                      : tier.color === "purple"
                        ? "border-purple-500 shadow-purple-500/20 shadow-xl"
                        : "border-gray-200 hover:border-amber-300 hover:shadow-lg"
                  } ${tier.id === selectedTier ? "shadow-2xl" : ""}`}
                >
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge
                        className={`${
                          tier.color === "amber" ? "bg-amber-500 text-white" : "bg-purple-500 text-white"
                        } px-4 py-1 text-sm font-medium`}
                      >
                        {tier.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          tier.color === "amber"
                            ? "bg-amber-500/10"
                            : tier.color === "purple"
                              ? "bg-purple-500/10"
                              : "bg-gray-500/10"
                        }`}
                      >
                        {tier.id === "free" ? (
                          <Gift className={`h-8 w-8 text-gray-600`} />
                        ) : tier.id === "tier1" ? (
                          <Star className={`h-8 w-8 text-amber-500`} />
                        ) : (
                          <Crown className={`h-8 w-8 text-purple-500`} />
                        )}
                      </div>
                    </div>

                    <CardTitle className="text-2xl font-bold text-gray-800">{tier.name}</CardTitle>
                    <CardDescription className="text-gray-600">{tier.description}</CardDescription>

                    <div className="mt-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-800">
                          ${billingCycle === "monthly" ? tier.price.monthly : tier.price.annual}
                        </span>
                        <span className="text-gray-600 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                      </div>
                      {billingCycle === "annual" && tier.price.monthly > 0 && (
                        <div className="text-sm text-green-600 mt-1">
                          Save ${(tier.price.monthly * 12 - tier.price.annual).toFixed(2)} per year
                        </div>
                      )}
                    </div>

                    {/* Points Information */}
                    <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                      <div className="flex items-center justify-center mb-2">
                        <Zap className="h-4 w-4 text-amber-600 mr-1" />
                        <span className="text-sm font-medium text-amber-600">
                          {tier.pointsMultiplier} Points Multiplier
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">Max {tier.maxPoints.toLocaleString()} points/month</div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    {/* Points Earning Breakdown */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2 text-amber-600" />
                        Points Earning
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Artwork Upload:</span>
                          <span className="font-medium text-amber-600">+{tier.pointsEarning.artworkUpload} pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sale Commission:</span>
                          <span className="font-medium text-amber-600">+{tier.pointsEarning.sale} pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Engagement:</span>
                          <span className="font-medium text-amber-600">+{tier.pointsEarning.engagement} pts</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-medium">
                            <span className="text-gray-800">Monthly Potential:</span>
                            <span className="text-amber-600">{tier.pointsEarning.monthly}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.05 }}
                        >
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {tier.limitations.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="text-sm font-medium text-gray-800 mb-2">Limitations:</h5>
                        <div className="space-y-1">
                          {tier.limitations.map((limitation, limitIndex) => (
                            <div key={limitIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 shrink-0" />
                              <span className="text-xs text-gray-500">{limitation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter>
                    <Button
                      className={`w-full ${
                        tier.color === "amber"
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : tier.color === "purple"
                            ? "bg-purple-500 hover:bg-purple-600 text-white"
                            : "bg-gray-800 hover:bg-gray-900 text-white"
                      } transition-all duration-300 group`}
                      size="lg"
                    >
                      {tier.id === "free" ? "Get Started Free" : "Choose Plan"}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Pool Distribution */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 rounded-full text-sm font-medium border border-amber-500/20">
                Prize Distribution
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              How the <span className="text-amber-500">${prizePool.total.toLocaleString()}</span> Prize Pool Works
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our prize pool is distributed fairly across all community members based on engagement and contribution
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Monthly Prizes</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">${prizePool.monthly.toLocaleString()}</div>
              <p className="text-gray-600 text-sm">Distributed monthly based on points earned</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quarterly Contests</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">${prizePool.quarterly.toLocaleString()}</div>
              <p className="text-gray-600 text-sm">Special competitions and challenges</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Annual Grand Prize</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">${prizePool.annual.toLocaleString()}</div>
              <p className="text-gray-600 text-sm">Ultimate recognition for top contributors</p>
            </motion.div>
          </div>

          {/* Distribution Breakdown */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Prize Pool Distribution</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Palette className="h-6 w-6 mr-2" />
                  <span className="font-semibold">Artists</span>
                </div>
                <div className="text-3xl font-bold mb-1">{prizePool.distribution.artists}%</div>
                <div className="text-sm opacity-90">
                  ${((prizePool.total * prizePool.distribution.artists) / 100).toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-6 w-6 mr-2" />
                  <span className="font-semibold">Patrons</span>
                </div>
                <div className="text-3xl font-bold mb-1">{prizePool.distribution.patrons}%</div>
                <div className="text-sm opacity-90">
                  ${((prizePool.total * prizePool.distribution.patrons) / 100).toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Church className="h-6 w-6 mr-2" />
                  <span className="font-semibold">Churches</span>
                </div>
                <div className="text-3xl font-bold mb-1">{prizePool.distribution.churches}%</div>
                <div className="text-sm opacity-90">
                  ${((prizePool.total * prizePool.distribution.churches) / 100).toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resource Share Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 rounded-full text-sm font-medium border border-purple-500/20">
                Resource Share Program
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Community <span className="text-purple-600">Resource Sharing</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto">
              {resourceShare.description}
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Member Benefits */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Member Benefits</h3>
              </div>
              <div className="space-y-4">
                {resourceShare.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Check className="h-5 w-5 text-purple-500 mr-3 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Admin Contributions */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">RCA Contributions</h3>
              </div>
              <div className="space-y-4">
                {resourceShare.adminContributions.map((contribution, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Sparkles className="h-5 w-5 text-amber-500 mr-3 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{contribution}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Resource Share CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Join the Resource Share</h3>
              <p className="mb-6 opacity-90">
                Available to all members, with enhanced benefits for paid tiers. Churches get free access to this
                program.
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold">
                Learn More About Resource Share
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our membership tiers and points system
            </motion.p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How do I earn points?",
                answer:
                  "You earn points through various activities: uploading artwork (+25-75 pts), making sales (+50-150 pts), community engagement (+10-30 pts), and participating in challenges. Higher tiers get multiplier bonuses.",
              },
              {
                question: "Can I change my membership tier?",
                answer:
                  "Yes! You can upgrade or downgrade your membership at any time. Changes take effect at the next billing cycle, and you'll keep all earned points.",
              },
              {
                question: "How are prizes distributed?",
                answer:
                  "Prizes are distributed monthly, quarterly, and annually based on points earned and community contribution. The more active you are, the higher your chances of winning.",
              },
              {
                question: "What is the Resource Share program?",
                answer:
                  "It's a community program where members can donate and share resources like books, tickets, art supplies, and more. Churches get free access, while other members can access it through their membership.",
              },
              {
                question: "Do points expire?",
                answer:
                  "Points earned through regular activities don't expire, but bonus points from special events may have expiration dates. We'll always notify you in advance.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-12 text-center text-white max-w-4xl mx-auto"
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-white/20 p-1 mx-auto mb-6 backdrop-blur-sm"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center">
                <Zap className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Creative Journey?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of artists, patrons, and churches in our faith-based creative community. Start earning
              points and unlock amazing opportunities today!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 font-bold">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
