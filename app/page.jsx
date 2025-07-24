"use client"

import React from "react"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Palette,
  Heart,
  Church,
  Check,
  Instagram,
  Facebook,
  Twitter,
  ArrowDown,
  Trophy,
  Zap,
  Crown,
  Coins,
  DollarSign,
  Target,
  HandHeart,
  Shield,
  Sparkles,
} from "lucide-react"
import AIChatbox from "@/components/AIChatbox"

// Import Swiper and modules
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

// Real images from Unsplash
const heroImage = "https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?q=80&w=2070&auto=format&fit=crop"
const artworkImages = [
  "/artworkImages1.png",
  "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=2145&auto=format&fit=crop",
  "/artworkImages2.png",
  "/artworkImages3.png",
  "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?q=80&w=1974&auto=format&fit=crop",
  "/artworkImages4.png",
]

const artistImage = "https://images.unsplash.com/photo-1544413164-5f1b361f5b69?q=80&w=1974&auto=format&fit=crop"
const patronImage = "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop"
const churchImage = "https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2070&auto=format&fit=crop"

// Testimonials with updated structure
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Visual Artist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    quote:
      "Redeemed Creative Arts has transformed my artistic journey. The Helper system connected me with amazing churches, and I've earned over 15,000 FaithCoins through challenges and artwork sales!",
    experience: 8450,
    level: 8,
    faithCoins: 15240,
    tier: "Pro+",
    badges: ["gold_crown", "challenge_contributor", "top_artist"],
  },
  {
    name: "Pastor Michael Thompson",
    role: "Church Arts Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    quote:
      "Finding talented Christian helpers used to be challenging. Through our Tier 2 membership, we've connected with incredible artists and helpers who share our vision. We've successfully completed 12 challenges this year!",
    experience: 6890,
    level: 6,
    faithCoins: 8950,
    tier: "Tier 2",
    badges: ["silver_crown", "matching_contributor", "community_builder"],
  },
  {
    name: "Rebecca Martinez",
    role: "Art Patron & Helper",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    quote:
      "Being both a patron and helper has been incredibly rewarding. I've supported 25+ artists, participated in matching donations, and earned my Gold Helper badge. The FaithCoins system makes giving even more meaningful!",
    experience: 12100,
    level: 10,
    faithCoins: 22300,
    tier: "Tier 2",
    badges: ["gold_helper", "matching_contributor", "top_patron"],
  },
]

// Updated gallery images with new features
const galleryImages = [
  {
    src: "/artworkImages3.png",
    title: "Divine Light",
    artist: "Sarah Johnson",
    experience: 950,
    rating: 9.2,
    category: "Painting",
    price: 1200,
    tier: "Pro+",
    badges: ["featured_artist"],
  },
  {
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2145&auto=format&fit=crop",
    title: "Heavenly Grace",
    artist: "Michael Chen",
    experience: 1200,
    rating: 9.5,
    category: "Digital Art",
    price: 850,
    tier: "Pro",
    badges: ["challenge_winner"],
  },
  {
    src: "/artworkImages1.png",
    title: "Faith Journey",
    artist: "Emma Wilson",
    experience: 780,
    rating: 8.9,
    category: "Photography",
    price: 650,
    tier: "Free",
    badges: ["rising_star"],
  },
  {
    src: "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?q=80&w=1974&auto=format&fit=crop",
    title: "Sacred Geometry",
    artist: "David Martinez",
    experience: 1450,
    rating: 9.7,
    category: "Mixed Media",
    price: 2100,
    tier: "Pro+",
    badges: ["master_artist", "gold_crown"],
  },
  {
    src: "/artworkImages2.png",
    title: "Eternal Hope",
    artist: "Lisa Taylor",
    experience: 890,
    rating: 8.7,
    category: "Sculpture",
    price: 1800,
    tier: "Pro",
    badges: ["community_favorite"],
  },
  {
    src: "/artworkImages4.png",
    title: "Redemption",
    artist: "James Wilson",
    experience: 1100,
    rating: 9.1,
    category: "Painting",
    price: 950,
    tier: "Pro",
    badges: ["helper_artist"],
  },
]

// Updated stats with new metrics
const stats = [
  { value: 500, label: "Artists", icon: <Palette className="h-6 w-6" />, subtext: "Creating & Earning" },
  { value: 1200, label: "Patrons", icon: <Heart className="h-6 w-6" />, subtext: "Supporting & Helping" },
  { value: 350, label: "Churches", icon: <Church className="h-6 w-6" />, subtext: "Growing Communities" },
  { value: 150, label: "Active Helpers", icon: <HandHeart className="h-6 w-6" />, subtext: "Serving Together" },
]

// New features showcase
const features = [
  {
    title: "Helper Network",
    description: "Connect with skilled volunteers for your church events and projects",
    icon: <HandHeart className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-500",
    benefits: ["Free & Paid Services", "Verified Skills", "Local & Traveling Talent"],
  },
  {
    title: "Challenge System",
    description: "Goal-based donations with sponsor matching for maximum impact",
    icon: <Target className="h-8 w-8" />,
    color: "from-green-500 to-emerald-500",
    benefits: ["Sponsor Matching", "Community Goals", "Meaningful Rewards"],
  },
  {
    title: "Experience Levels",
    description: "12-level progression system with seasonal rewards and recognition",
    icon: <Trophy className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500",
    benefits: ["Level Progression", "Seasonal Stickers", "Exclusive Badges"],
  },
  {
    title: "FaithCoins Economy",
    description: "Earn and spend our platform currency for discounts and exclusive items",
    icon: <Coins className="h-8 w-8" />,
    color: "from-amber-500 to-orange-500",
    benefits: ["Earn Through Activity", "Spend on Rewards", "Gift to Others"],
  },
]

// Membership tiers with updated structure
const membershipTiers = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for getting started in our community",
    features: [
      "Basic profile & 5 artwork uploads",
      "1x experience multiplier",
      "Community discussions",
      "Resource Share access",
      "Contest participation",
      "Helper registration (free services)",
    ],
    cta: "Get Started",
    popular: false,
    color: "from-gray-400 to-gray-600",
  },
  {
    name: "Pro",
    price: 15,
    period: "month",
    description: "Enhanced features for serious creators",
    features: [
      "Everything in Free",
      "25 artwork uploads & custom cover",
      "2x experience multiplier",
      "500 FaithCoins monthly",
      "Sell custom merchandise",
      "Silver Helper badge",
      "Priority support",
    ],
    cta: "Start 15-Day Trial",
    popular: true,
    color: "from-blue-500 to-purple-500",
  },
  {
    name: "Pro+",
    price: 29,
    period: "month",
    description: "Ultimate platform experience with premium features",
    features: [
      "Everything in Pro",
      "Unlimited uploads & course creation",
      "3x experience multiplier",
      "1000 FaithCoins monthly",
      "Gold Helper badge",
      "Advanced analytics",
      "Featured opportunities",
    ],
    cta: "Start 15-Day Trial",
    popular: false,
    color: "from-amber-500 to-orange-500",
  },
]

// Prize pool information
const prizePool = {
  total: 50000,
  monthly: 5000,
  quarterly: 15000,
  annual: 30000,
}

// Counter animation component
const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0)

  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = Number.parseInt(value.toString(), 10)

    if (start === end) return

    const incrementTime = (duration / end) * 1000

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => {
      clearInterval(timer)
    }
  }, [value, duration, isInView])

  return <span ref={countRef}>{count}</span>
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef)

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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

  const cardHoverVariants = {
    rest: {
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  return (
    <div className="relative overflow-hidden bg-white" ref={containerRef}>
      {/* AI Chatbox Component */}
      <AIChatbox />

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#e76f51]/5 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>

      {/* Hero Section with Enhanced CTA */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
        <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
          <Image
            src={heroImage || "/placeholder.svg"}
            alt="Redeemed Creative Arts"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
          >
            <motion.div
              className="mb-4 inline-block"
              variants={itemVariants}
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <span className="px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium border border-amber-500/30 backdrop-blur-sm">
                Faith-Inspired Creativity & Community
              </span>
            </motion.div>

            <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white" variants={itemVariants}>
              <span className="text-amber-500 inline-block">Redeemed</span>{" "}
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                Creative
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-[#e76f51]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Arts
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-3xl mx-auto mb-8"
              variants={itemVariants}
            >
              <span className="text-amber-500 font-medium">Create</span>,{" "}
              <span className="text-[#e76f51] font-medium">Support</span>, and{" "}
              <span className="text-amber-400 font-medium">Serve</span> together in our faith-based community
            </motion.p>

            {/* New Hero Features */}
            <motion.div
              className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <HandHeart className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold mb-1">Become a Helper</h3>
                <p className="text-gray-300 text-sm">Help churches, earn rewards, grow connections</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold mb-1">Join Challenges</h3>
                <p className="text-gray-300 text-sm">Participate in goal-based donations with matching</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold mb-1">Earn & Level Up</h3>
                <p className="text-gray-300 text-sm">Gain experience, FaithCoins, and exclusive badges</p>
              </div>
            </motion.div>

            <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-amber-500 text-white hover:bg-amber-600 transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Start Your Journey
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500 z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white transition-all duration-300 relative overflow-hidden group backdrop-blur-sm bg-transparent"
                >
                  <span className="relative z-10">Learn More</span>
                  <motion.span
                    className="absolute inset-0 bg-amber-500 z-0"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-amber-500/30 bg-white/10 backdrop-blur-sm text-amber-400 hover:bg-amber-500/20"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }}
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* New Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 rounded-full text-sm font-medium border border-amber-500/20">
                What Makes Us Different
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800"
              variants={itemVariants}
            >
              More Than Just an <span className="text-amber-500">Art Platform</span>
            </motion.h2>
            <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={itemVariants}>
              We're building a complete ecosystem where creativity, faith, and community service come together
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve - Enhanced */}
      <section className="py-20 relative z-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium border border-amber-500/20">
                Our Community
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-amber-600"
              variants={itemVariants}
            >
              Who We Serve
            </motion.h2>
            <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={itemVariants}>
              Join our growing community of creators, supporters, and servants
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Artists */}
            <motion.div
              className="relative group"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
            >
              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-amber-200 group-hover:border-[#e76f51] transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64">
                  <Image
                    src={artistImage || "/placeholder.svg"}
                    alt="Artists"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 left-4 bg-amber-500/90 p-3 rounded-full"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      backgroundColor: "rgba(217, 119, 6, 1)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Palette className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-600">For Artists</h3>
                  <p className="text-gray-600 mb-4">
                    Create, sell artwork, build courses, and earn through our comprehensive platform
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Membership Tiers</span>
                      <div className="flex space-x-1">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Free</span>
                        <span className="px-2 py-1 bg-blue-100 text-xs rounded">Pro</span>
                        <span className="px-2 py-1 bg-amber-100 text-xs rounded">Pro+</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Experience Multiplier</span>
                      <span className="text-sm font-medium text-amber-600">Up to 3x</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly FaithCoins</span>
                      <span className="text-sm font-medium text-amber-600">Up to 1,000</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Upload & sell original artwork</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Create & sell courses/workshops</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Sell custom merchandise</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Become a Helper for extra income</span>
                    </motion.li>
                  </ul>
                  <Link href="/artist-info">
                    <Button className="w-full bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10">Become an Artist</span>
                      <motion.span
                        className="absolute inset-0 bg-amber-500 z-0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Patrons */}
            <motion.div
              className="relative group"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
            >
              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-amber-200 group-hover:border-[#e76f51] transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64">
                  <Image
                    src={patronImage || "/placeholder.svg"}
                    alt="Patrons"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 left-4 bg-amber-500/90 p-3 rounded-full"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      backgroundColor: "rgba(217, 119, 6, 1)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-600">For Patrons</h3>
                  <p className="text-gray-600 mb-4">
                    Support artists, participate in challenges, and become a Helper to serve your community
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Membership Tiers</span>
                      <div className="flex space-x-1">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Free</span>
                        <span className="px-2 py-1 bg-blue-100 text-xs rounded">Tier 1</span>
                        <span className="px-2 py-1 bg-amber-100 text-xs rounded">Tier 2</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Helper Badges</span>
                      <div className="flex space-x-1">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <Shield className="h-4 w-4 text-gray-400" />
                        <Shield className="h-4 w-4 text-amber-500" />
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Support artists & participate in challenges</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Become a Helper (free or paid services)</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Access Resource Share & donated items</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Earn FaithCoins & exclusive rewards</span>
                    </motion.li>
                  </ul>
                  <Link href="/patron-info">
                    <Button className="w-full bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10">Become a Patron</span>
                      <motion.span
                        className="absolute inset-0 bg-amber-500 z-0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Churches */}
            <motion.div
              className="relative group"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
            >
              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-amber-200 group-hover:border-[#e76f51] transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64">
                  <Image
                    src={churchImage || "/placeholder.svg"}
                    alt="Churches"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 left-4 bg-amber-500/90 p-3 rounded-full"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      backgroundColor: "rgba(217, 119, 6, 1)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Church className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-600">For Churches</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with artists and helpers, create challenges, and build your community trust
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Membership Tiers</span>
                      <div className="flex space-x-1">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Free</span>
                        <span className="px-2 py-1 bg-blue-100 text-xs rounded">Tier 1</span>
                        <span className="px-2 py-1 bg-amber-100 text-xs rounded">Tier 2</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Challenges/Month</span>
                      <span className="text-sm font-medium text-amber-600">Up to 3</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Create challenges & matching donations</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Book helpers for events & projects</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Connect with vetted Christian artists</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Youth packages & ministry resources</span>
                    </motion.li>
                  </ul>
                  <Link href="/church-info">
                    <Button className="w-full bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10">Join Our Churches</span>
                      <motion.span
                        className="absolute inset-0 bg-amber-500 z-0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Artwork Slider */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-4 mb-12">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-gradient-to-r from-[#e76f51]/10 to-orange-500/10 text-[#e76f51] rounded-full text-sm font-medium border border-[#e76f51]/20">
                Featured Artwork
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800"
              variants={itemVariants}
            >
              Inspiring <span className="text-[#e76f51]">Faith-Based</span> Creations
            </motion.h2>
            <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={itemVariants}>
              Discover artwork from our talented community members and their experience levels
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative px-4 md:px-10"
        >
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            {artworkImages.map((image, index) => {
              const artwork = galleryImages[index] || {}
              return (
                <SwiperSlide key={index} className="max-w-[300px] md:max-w-[500px]">
                  <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                    <div className="relative h-[400px] w-full overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={artwork.title || `Artwork ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Artist Level Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Trophy className="h-3 w-3 mr-1" />
                      Level {Math.floor(Math.random() * 12) + 1}
                    </div>

                    {/* Experience Points */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Sparkles className="h-3 w-3 mr-1 text-yellow-400" />
                      {artwork.experience || 850 + index * 50} XP
                    </div>

                    {/* Tier Badge */}
                    <div className="absolute bottom-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {artwork.tier || "Pro"}
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 left-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {artwork.price?.toLocaleString() || (500 + index * 200).toLocaleString()}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white text-xl font-bold">{artwork.title || `Artwork Title ${index + 1}`}</h3>
                      <p className="text-white/80">{artwork.artist || "Artist Name"}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs">
                          {artwork.category || (index % 2 === 0 ? "Painting" : "Digital Art")}
                        </span>
                        {artwork.badges &&
                          artwork.badges.map((badge, badgeIndex) => (
                            <span
                              key={badgeIndex}
                              className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs"
                            >
                              {badge}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </motion.div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 relative z-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-5 text-center shadow-lg"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  {React.cloneElement(stat.icon, {
                    className: "h-5 w-5 text-amber-600",
                  })}
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  <Counter value={stat.value} />+
                </h3>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-xs text-amber-600 font-medium">{stat.subtext}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 rounded-full text-sm font-medium border border-purple-500/20">
                Membership Tiers
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800"
              variants={itemVariants}
            >
              Choose Your <span className="text-purple-600">Journey</span>
            </motion.h2>
            <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={itemVariants}>
              Unlock more features, earn more rewards, and grow your impact with our membership tiers
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl border-2 overflow-hidden ${
                  tier.popular ? "border-purple-500 scale-105" : "border-gray-200"
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-xl flex items-center justify-center mb-6 mx-auto`}
                  >
                    <Crown className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-center mb-2">{tier.name}</h3>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-gray-600">/{tier.period}</span>
                  </div>

                  <p className="text-gray-600 text-center mb-6">{tier.description}</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${tier.popular ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <motion.section
        className="py-20 mb-12 relative z-10 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.div variants={itemVariants} className="mb-4 inline-block">
            <span className="px-4 py-1 bg-[#e76f51]/10 text-[#e76f51] rounded-full text-sm font-medium border border-[#e76f51]/20">
              Community Stories
            </span>
          </motion.div>
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800" variants={itemVariants}>
            Faithful Words from Our <span className="text-[#e76f51]">Members</span>
          </motion.h2>
          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={itemVariants}>
            Hear from artists, patrons, and churches who are growing their ministries and earning rewards
          </motion.p>
        </motion.div>

        <div className="relative h-[400px] md:h-[350px]">
          <AnimatePresence mode="wait">
            {testimonials.map(
              (testimonial, index) =>
                index === activeTestimonial && (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl border border-amber-200 shadow-lg flex flex-col md:flex-row items-center gap-6 h-full">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover rounded-full"
                        />
                        <motion.div
                          className="absolute -inset-1 rounded-full border-2 border-amber-500/50"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 8,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        ></motion.div>

                        {/* Level Badge */}
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                          {testimonial.level}
                        </div>
                      </div>

                      <div className="text-center md:text-left flex-1">
                        <p className="text-gray-600 mb-4 italic text-lg">"{testimonial.quote}"</p>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <h3 className="font-bold text-amber-600 text-lg">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                            <div className="flex items-center justify-center md:justify-start mt-2">
                              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-xs font-medium">
                                {testimonial.tier}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="flex items-center justify-center mb-1">
                                <Sparkles className="h-4 w-4 text-purple-500 mr-1" />
                                <span className="font-bold text-purple-600">
                                  {testimonial.experience.toLocaleString()}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">Experience</span>
                            </div>
                            <div>
                              <div className="flex items-center justify-center mb-1">
                                <Coins className="h-4 w-4 text-amber-500 mr-1" />
                                <span className="font-bold text-amber-600">
                                  {testimonial.faithCoins.toLocaleString()}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">FaithCoins</span>
                            </div>
                            <div>
                              <div className="flex items-center justify-center mb-1">
                                <Trophy className="h-4 w-4 text-orange-500 mr-1" />
                                <span className="font-bold text-orange-600">{testimonial.badges.length}</span>
                              </div>
                              <span className="text-xs text-gray-500">Badges</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === activeTestimonial ? "bg-amber-500" : "bg-amber-500/30"
              }`}
              onClick={() => setActiveTestimonial(index)}
            />
          ))}
        </div>
      </motion.section>

      {/* Call to Action with Enhanced Features */}
      <section className="py-20 relative z-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-amber-500 to-orange-500 p-12 rounded-xl relative overflow-hidden text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
            <motion.div
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
              }}
            ></motion.div>

            <div className="relative z-10">
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

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Join Our <span className="text-yellow-200">Faith-Based</span> Community
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Start your journey today! Whether you're an artist, patron, or church, there's a place for you in our
                growing ecosystem of creativity, service, and rewards.
              </p>

              {/* Enhanced Features Preview */}
              <div className="grid md:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Palette className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-lg font-bold mb-1">Create & Sell</div>
                  <div className="text-sm opacity-80">Upload artwork, build courses</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <HandHeart className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-lg font-bold mb-1">Help & Serve</div>
                  <div className="text-sm opacity-80">Become a Helper, earn badges</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Target className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-lg font-bold mb-1">Join Challenges</div>
                  <div className="text-sm opacity-80">Participate in matching donations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Trophy className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-lg font-bold mb-1">Level Up</div>
                  <div className="text-sm opacity-80">Earn XP, FaithCoins, rewards</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-amber-600 hover:bg-gray-100 transition-all duration-300 group relative overflow-hidden font-bold"
                  >
                    <span className="relative z-10 flex items-center">
                      <Zap className="mr-2 h-5 w-5" />
                      Start Your Journey
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
                  >
                    View Membership Tiers
                  </Button>
                </Link>
              </div>

              <motion.div
                className="flex justify-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Instagram className="h-5 w-5 text-white" />
                </motion.a>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Facebook className="h-5 w-5 text-white" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Twitter className="h-5 w-5 text-white" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
