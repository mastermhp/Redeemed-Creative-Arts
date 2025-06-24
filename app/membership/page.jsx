"use client"

import React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Check,
  Star,
  Crown,
  Zap,
  Gift,
  Users,
  Heart,
  Trophy,
  Sparkles,
  ArrowRight,
  DollarSign,
  MessageCircle,
  Upload,
  Eye,
  Share2,
} from "lucide-react"

export default function MembershipPage() {
  const [selectedLevel, setSelectedLevel] = useState("gold")
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef)

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    currentLevel: "Gold Member",
    currentPoints: 2450,
    nextLevelPoints: 5000,
    totalEarned: 8750,
    rank: 127,
    joinDate: "March 2024",
    achievements: [
      { name: "First Sale", icon: "🎉", date: "March 2024" },
      { name: "Community Helper", icon: "🤝", date: "April 2024" },
      { name: "Featured Artist", icon: "⭐", date: "May 2024" },
      { name: "Top Contributor", icon: "🏆", date: "June 2024" },
    ],
  }

  // Membership levels with detailed benefits
  const membershipLevels = [
    {
      id: "bronze",
      name: "Bronze Member",
      minPoints: 0,
      maxPoints: 999,
      color: "orange",
      icon: <Gift className="h-8 w-8" />,
      benefits: [
        "Basic profile features",
        "Upload up to 10 artworks",
        "Community forum access",
        "Monthly newsletter",
        "Basic analytics",
      ],
      pointsMultiplier: "1x",
      monthlyRewards: "$50 prize pool share",
      exclusiveFeatures: [],
    },
    {
      id: "silver",
      name: "Silver Member",
      minPoints: 1000,
      maxPoints: 2499,
      color: "gray",
      icon: <Star className="h-8 w-8" />,
      benefits: [
        "All Bronze benefits",
        "Upload up to 25 artworks",
        "Priority customer support",
        "Featured artist opportunities",
        "Advanced analytics",
        "Custom profile themes",
      ],
      pointsMultiplier: "1.5x",
      monthlyRewards: "$150 prize pool share",
      exclusiveFeatures: ["Early access to new features", "Monthly featured artist spotlight"],
    },
    {
      id: "gold",
      name: "Gold Member",
      minPoints: 2500,
      maxPoints: 4999,
      color: "amber",
      icon: <Crown className="h-8 w-8" />,
      benefits: [
        "All Silver benefits",
        "Unlimited artwork uploads",
        "Commission request system",
        "Exclusive workshops access",
        "Personal brand promotion",
        "Advanced SEO optimization",
        "Dedicated account manager",
      ],
      pointsMultiplier: "2x",
      monthlyRewards: "$300 prize pool share",
      exclusiveFeatures: ["VIP community access", "Monthly 1-on-1 mentoring session", "Exclusive Gold member events"],
    },
    {
      id: "platinum",
      name: "Platinum Member",
      minPoints: 5000,
      maxPoints: 9999,
      color: "purple",
      icon: <Trophy className="h-8 w-8" />,
      benefits: [
        "All Gold benefits",
        "White-label portfolio option",
        "API access for integrations",
        "Custom commission rates",
        "Priority contest judging",
        "Exclusive marketplace features",
        "Advanced reporting suite",
      ],
      pointsMultiplier: "3x",
      monthlyRewards: "$500 prize pool share",
      exclusiveFeatures: [
        "Platinum advisory board participation",
        "Quarterly strategy sessions",
        "Custom feature requests",
        "Beta testing privileges",
      ],
    },
    {
      id: "diamond",
      name: "Diamond Member",
      minPoints: 10000,
      maxPoints: Number.POSITIVE_INFINITY,
      color: "blue",
      icon: <Sparkles className="h-8 w-8" />,
      benefits: [
        "All Platinum benefits",
        "Personal brand partnership",
        "Revenue sharing program",
        "Exclusive Diamond events",
        "Custom development support",
        "Lifetime membership perks",
        "Legacy artist program",
      ],
      pointsMultiplier: "5x",
      monthlyRewards: "$1000+ prize pool share",
      exclusiveFeatures: [
        "Diamond council membership",
        "Annual retreat invitation",
        "Personal success manager",
        "Custom platform features",
        "Lifetime achievement recognition",
      ],
    },
  ]

  // Points earning activities
  const pointsActivities = [
    { activity: "Upload artwork", points: 50, frequency: "Per upload", icon: <Upload className="h-5 w-5" /> },
    { activity: "Make a sale", points: 100, frequency: "Per sale", icon: <DollarSign className="h-5 w-5" /> },
    { activity: "Receive artwork view", points: 1, frequency: "Per view", icon: <Eye className="h-5 w-5" /> },
    { activity: "Get artwork like", points: 5, frequency: "Per like", icon: <Heart className="h-5 w-5" /> },
    { activity: "Share artwork", points: 10, frequency: "Per share", icon: <Share2 className="h-5 w-5" /> },
    {
      activity: "Comment on artwork",
      points: 15,
      frequency: "Per comment",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    { activity: "Complete profile", points: 200, frequency: "One time", icon: <Check className="h-5 w-5" /> },
    { activity: "Refer new member", points: 500, frequency: "Per referral", icon: <Users className="h-5 w-5" /> },
    { activity: "Win monthly contest", points: 1000, frequency: "Per win", icon: <Trophy className="h-5 w-5" /> },
    { activity: "Featured artist", points: 750, frequency: "Per feature", icon: <Star className="h-5 w-5" /> },
  ]

  // Resource Share benefits by level
  const resourceShareBenefits = {
    bronze: ["Access to basic donated resources", "Monthly resource newsletter", "Community resource board access"],
    silver: ["Priority access to popular resources", "Resource request system", "Monthly resource package eligibility"],
    gold: [
      "VIP resource access",
      "Custom resource requests",
      "Quarterly resource care packages",
      "Resource sharing rewards program",
    ],
    platinum: [
      "Premium resource concierge service",
      "Exclusive high-value resource access",
      "Monthly premium resource packages",
      "Resource partnership opportunities",
    ],
    diamond: [
      "Unlimited resource access",
      "Personal resource curator",
      "Custom resource sourcing",
      "Resource sharing revenue program",
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

  const progressToNextLevel = ((userData.currentPoints - 2500) / (5000 - 2500)) * 100

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero Section with User Stats */}
      <section className="relative py-20 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-2 rounded-full mb-6 border border-amber-500/20"
            >
              <Crown className="h-5 w-5 text-amber-600 mr-2" />
              <span className="text-amber-600 font-medium">Membership Dashboard</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                {userData.name}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8">
              Track your progress, earn points, and unlock exclusive benefits in our faith-based creative community
            </motion.p>
          </motion.div>

          {/* Current Status Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Crown className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold">{userData.currentLevel}</CardTitle>
                <CardDescription className="text-white/80 text-lg">Member since {userData.joinDate}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{userData.currentPoints.toLocaleString()}</div>
                    <div className="text-white/80 text-sm">Current Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{userData.totalEarned.toLocaleString()}</div>
                    <div className="text-white/80 text-sm">Total Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">#{userData.rank}</div>
                    <div className="text-white/80 text-sm">Community Rank</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{userData.achievements.length}</div>
                    <div className="text-white/80 text-sm">Achievements</div>
                  </div>
                </div>

                {/* Progress to Next Level */}
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Progress to Platinum</span>
                    <span className="text-sm">{userData.nextLevelPoints - userData.currentPoints} points to go</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-3 bg-white/20" />
                  <div className="flex justify-between text-sm mt-2 opacity-80">
                    <span>{userData.currentPoints} points</span>
                    <span>{userData.nextLevelPoints} points</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Membership Levels Overview */}
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
              Membership <span className="text-amber-500">Levels</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlock more benefits and opportunities as you earn points and advance through our membership levels
            </motion.p>
          </motion.div>

          <div className="grid gap-6 max-w-6xl mx-auto">
            {membershipLevels.map((level, index) => (
              <motion.div
                key={level.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedLevel === level.id ? "scale-105" : ""
                }`}
                onClick={() => setSelectedLevel(level.id)}
              >
                <Card
                  className={`border-2 transition-all duration-300 ${
                    level.id === userData.currentLevel.toLowerCase().split(" ")[0]
                      ? "border-amber-500 shadow-amber-500/20 shadow-xl bg-amber-50"
                      : selectedLevel === level.id
                        ? `border-${level.color}-500 shadow-${level.color}-500/20 shadow-xl`
                        : "border-gray-200 hover:border-amber-300 hover:shadow-lg"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            level.color === "amber"
                              ? "bg-amber-500/10 text-amber-500"
                              : level.color === "purple"
                                ? "bg-purple-500/10 text-purple-500"
                                : level.color === "blue"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : level.color === "gray"
                                    ? "bg-gray-500/10 text-gray-500"
                                    : "bg-orange-500/10 text-orange-500"
                          }`}
                        >
                          {level.icon}
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                            {level.name}
                            {level.id === userData.currentLevel.toLowerCase().split(" ")[0] && (
                              <Badge className="ml-2 bg-amber-500 text-white">Current</Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="text-gray-600">
                            {level.minPoints.toLocaleString()} -{" "}
                            {level.maxPoints === Number.POSITIVE_INFINITY ? "∞" : level.maxPoints.toLocaleString()}{" "}
                            points
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-amber-600">{level.pointsMultiplier}</div>
                        <div className="text-sm text-gray-600">Points Multiplier</div>
                      </div>
                    </div>
                  </CardHeader>

                  {selectedLevel === level.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Benefits */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                              <Check className="h-5 w-5 mr-2 text-green-500" />
                              Core Benefits
                            </h4>
                            <div className="space-y-2">
                              {level.benefits.map((benefit, benefitIndex) => (
                                <div key={benefitIndex} className="flex items-start">
                                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                  <span className="text-sm text-gray-600">{benefit}</span>
                                </div>
                              ))}
                            </div>

                            {level.exclusiveFeatures.length > 0 && (
                              <div className="mt-6">
                                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                                  <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                                  Exclusive Features
                                </h5>
                                <div className="space-y-2">
                                  {level.exclusiveFeatures.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-start">
                                      <Sparkles className="h-4 w-4 text-purple-500 mr-2 mt-0.5 shrink-0" />
                                      <span className="text-sm text-gray-600">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Resource Share Benefits */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                              <Gift className="h-5 w-5 mr-2 text-amber-500" />
                              Resource Share Benefits
                            </h4>
                            <div className="space-y-2">
                              {resourceShareBenefits[level.id].map((benefit, benefitIndex) => (
                                <div key={benefitIndex} className="flex items-start">
                                  <Gift className="h-4 w-4 text-amber-500 mr-2 mt-0.5 shrink-0" />
                                  <span className="text-sm text-gray-600">{benefit}</span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                              <div className="flex items-center mb-2">
                                <Trophy className="h-5 w-5 text-amber-600 mr-2" />
                                <span className="font-semibold text-amber-600">Monthly Rewards</span>
                              </div>
                              <div className="text-2xl font-bold text-amber-600">{level.monthlyRewards}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Points Earning Guide */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              How to <span className="text-amber-500">Earn Points</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover all the ways you can earn points and advance through our membership levels
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pointsActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                    {React.cloneElement(activity.icon, { className: "text-amber-600" })}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-600">+{activity.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{activity.activity}</h3>
                <p className="text-sm text-gray-600">{activity.frequency}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Points Multiplier Bonus</h3>
              <p className="mb-6 opacity-90">
                Higher membership levels earn bonus multipliers on all point-earning activities!
              </p>
              <div className="grid grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">1x</div>
                  <div className="text-xs opacity-80">Bronze</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1.5x</div>
                  <div className="text-xs opacity-80">Silver</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">2x</div>
                  <div className="text-xs opacity-80">Gold</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">3x</div>
                  <div className="text-xs opacity-80">Platinum</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">5x</div>
                  <div className="text-xs opacity-80">Diamond</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
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
              Your <span className="text-amber-500">Achievements</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrate your milestones and accomplishments in our creative community
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {userData.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{achievement.name}</h3>
                <p className="text-sm text-gray-600">{achievement.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

            <h2 className="text-3xl md:text-4xl font-bold mb-4">Keep Growing Your Creative Journey</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Continue earning points, unlocking achievements, and advancing through our membership levels. Your
              creative community is waiting!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 font-bold">
                <Upload className="mr-2 h-5 w-5" />
                Upload New Artwork
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
              >
                View Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
