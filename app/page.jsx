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
  Star,
  Check,
  Instagram,
  Facebook,
  Twitter,
  ArrowDown,
  Trophy,
  Zap,
  Award,
  Crown,
  Coins,
  DollarSign,
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

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Visual Artist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    quote:
      "Redeemed Creative Arts has transformed my artistic journey. I've found a supportive community that understands the intersection of faith and creativity.",
    points: 3250,
    level: "Gold Member",
  },
  {
    name: "Michael Thompson",
    role: "Church Arts Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    quote:
      "Finding talented Christian artists used to be challenging. This platform has connected our church with incredible artists who share our vision and values.",
    points: 1890,
    level: "Silver Member",
  },
  {
    name: "Rebecca Martinez",
    role: "Art Patron",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    quote:
      "Supporting faith-based artists brings me joy. I've discovered beautiful artwork that speaks to my soul and connects with my beliefs.",
    points: 4120,
    level: "Platinum Member",
  },
]

// Gallery images with point values and ratings
const galleryImages = [
  {
    src: "/artworkImages3.png",
    title: "Divine Light",
    artist: "Sarah Johnson",
    points: 950,
    rating: 9.2,
    category: "Painting",
    price: 1200,
  },
  {
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2145&auto=format&fit=crop",
    title: "Heavenly Grace",
    artist: "Michael Chen",
    points: 1200,
    rating: 9.5,
    category: "Digital Art",
    price: 850,
  },
  {
    src: "/artworkImages1.png",
    title: "Faith Journey",
    artist: "Emma Wilson",
    points: 780,
    rating: 8.9,
    category: "Photography",
    price: 650,
  },
  {
    src: "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?q=80&w=1974&auto=format&fit=crop",
    title: "Sacred Geometry",
    artist: "David Martinez",
    points: 1450,
    rating: 9.7,
    category: "Mixed Media",
    price: 2100,
  },
  {
    src: "/artworkImages2.png",
    title: "Eternal Hope",
    artist: "Lisa Taylor",
    points: 890,
    rating: 8.7,
    category: "Sculpture",
    price: 1800,
  },
  {
    src: "/artworkImages4.png",
    title: "Redemption",
    artist: "James Wilson",
    points: 1100,
    rating: 9.1,
    category: "Painting",
    price: 950,
  },
]

// Stats with points integration
const stats = [
  { value: 500, label: "Artists", icon: <Palette className="h-6 w-6" />, points: "2.5M+ Points Earned" },
  { value: 1200, label: "Patrons", icon: <Heart className="h-6 w-6" />, points: "1.8M+ Points Given" },
  { value: 350, label: "Churches", icon: <Church className="h-6 w-6" />, points: "750K+ Points Shared" },
  { value: 5000, label: "Artworks", icon: <Star className="h-6 w-6" />, points: "12M+ Total Points" },
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

      {/* Floating particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-500/20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Hero Section with Parallax */}
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
                Faith-Inspired Creativity
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
              Building bridges between{" "}
              <motion.span
                className="text-amber-500 font-medium"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 0,
                }}
              >
                Artists
              </motion.span>
              ,{" "}
              <motion.span
                className="text-[#e76f51] font-medium"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 0.7,
                }}
              >
                Patrons
              </motion.span>
              , and{" "}
              <motion.span
                className="text-amber-400 font-medium"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 1.4,
                }}
              >
                Churches
              </motion.span>
              .
            </motion.p>

            {/* Prize Pool Highlight */}
            <motion.div
              className="mb-8 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30 backdrop-blur-sm max-w-md mx-auto"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                <span className="text-amber-400 font-semibold">Total Prize Pool</span>
              </div>
              <div className="text-3xl font-bold text-white">${prizePool.total.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Available for artists & patrons</div>
            </motion.div>

            <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-amber-500 text-white hover:bg-amber-600 transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Start Earning Points
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
                  className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white transition-all duration-300 relative overflow-hidden group backdrop-blur-sm"
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

      {/* Prize Pool Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
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
                Prize Pool System
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800"
              variants={itemVariants}
            >
              <span className="text-amber-500">${prizePool.total.toLocaleString()}</span> Available in Prizes
            </motion.h2>
            <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={itemVariants}>
              Earn points through engagement, artwork sales, and community participation. Convert points to real
              rewards!
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Monthly Prizes</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">${prizePool.monthly.toLocaleString()}</div>
              <p className="text-gray-600 text-sm">Distributed monthly to top contributors</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quarterly Prizes</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">${prizePool.quarterly.toLocaleString()}</div>
              <p className="text-gray-600 text-sm">Seasonal competitions and challenges</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Annual Grand Prize</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">${prizePool.annual.toLocaleString()}</div>
              <p className="text-gray-600 text-sm">Ultimate recognition for top performers</p>
            </motion.div>
          </div>

          <motion.div
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-8 text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h3 className="text-2xl font-bold mb-4">How Points Work</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">+50</div>
                <div className="text-sm">Artwork Upload</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">+25</div>
                <div className="text-sm">Community Engagement</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">+100</div>
                <div className="text-sm">Artwork Sale</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">+200</div>
                <div className="text-sm">Monthly Challenge Win</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Artwork Slider with Points */}
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
              Explore artwork from our talented Christian artists and see their point earnings
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
            {artworkImages.map((image, index) => (
              <SwiperSlide key={index} className="max-w-[300px] md:max-w-[500px]">
                <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                  <div className="relative h-[400px] w-full overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Artwork ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Colored Rating Square */}
                  <div
                    className={`absolute bottom-4 right-4 ${
                      index % 4 === 0
                        ? "bg-green-500"
                        : index % 4 === 1
                          ? "bg-blue-500"
                          : index % 4 === 2
                            ? "bg-purple-500"
                            : "bg-orange-500"
                    } text-white px-3 py-2 rounded-lg shadow-lg`}
                  >
                    <div className="text-2xl font-bold">
                      {index % 4 === 0 ? "9.2" : index % 4 === 1 ? "8.7" : index % 4 === 2 ? "9.5" : "8.1"}
                    </div>
                    <div className="text-xs font-medium">
                      {index % 4 === 0
                        ? "EXCELLENT"
                        : index % 4 === 1
                          ? "GREAT"
                          : index % 4 === 2
                            ? "MASTERPIECE"
                            : "GOOD"}
                    </div>
                  </div>

                  {/* Points Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
                    {850 + index * 50} pts
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />${(500 + index * 200).toLocaleString()}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Artwork Title {index + 1}</h3>
                    <p className="text-white/80">Artist Name</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs">
                        {index % 2 === 0 ? "Painting" : "Digital Art"}
                      </span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        +{50 + index * 10} pts earned
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      {/* Who We Serve with Points Integration */}
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
              Join our points-based ecosystem where everyone benefits from creative collaboration
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

                  {/* Points Earning Indicator */}
                  <div className="absolute top-4 right-4 bg-green-500/90 px-3 py-1 rounded-full text-white text-xs font-medium">
                    Earn up to 500 pts/month
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-600">For Artists</h3>
                  <p className="text-gray-600 mb-4">
                    Showcase your faith-inspired art, earn points for every interaction, and convert points to real
                    rewards.
                  </p>
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
                      <span className="text-sm text-gray-600">Earn 50 points per artwork upload</span>
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
                      <span className="text-sm text-gray-600">100 points per sale + commission</span>
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
                      <span className="text-sm text-gray-600">Bonus points for community engagement</span>
                    </motion.li>
                  </ul>
                  <Link href="/artist-info">
                    <Button className="w-full bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10">Learn More</span>
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

                  {/* Points Earning Indicator */}
                  <div className="absolute top-4 right-4 bg-blue-500/90 px-3 py-1 rounded-full text-white text-xs font-medium">
                    Earn up to 300 pts/month
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-600">For Patrons</h3>
                  <p className="text-gray-600 mb-4">
                    Support Christian artists, earn points for purchases and engagement, unlock exclusive rewards.
                  </p>
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
                      <span className="text-sm text-gray-600">Earn 1 point per $1 spent</span>
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
                      <span className="text-sm text-gray-600">Exclusive access to limited editions</span>
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
                      <span className="text-sm text-gray-600">Redeem points for discounts & prizes</span>
                    </motion.li>
                  </ul>
                  <Link href="/patron-info">
                    <Button className="w-full bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10">Learn More</span>
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

                  {/* Resource Share Indicator */}
                  <div className="absolute top-4 right-4 bg-purple-500/90 px-3 py-1 rounded-full text-white text-xs font-medium">
                    Resource Share Access
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-600">For Churches</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with artists, access the Resource Share program, and enhance your ministry through visual
                    arts.
                  </p>
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
                      <span className="text-sm text-gray-600">Access to Resource Share program</span>
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
                      <span className="text-sm text-gray-600">Host art-focused ministry events</span>
                    </motion.li>
                  </ul>
                  <Link href="/church-info">
                    <Button className="w-full bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10">Learn More</span>
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

      {/* Stats Counter Section with Points */}
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
                <p className="text-xs text-amber-600 font-medium">{stat.points}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid with Points and Ratings */}
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
                Gallery
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800"
              variants={itemVariants}
            >
              Explore Our <span className="text-amber-500">Collection</span>
            </motion.h2>
            <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={itemVariants}>
              Discover artwork with real point values and community ratings
            </motion.p>
          </motion.div>

          {/* Featured Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryImages.slice(0, 3).map((artwork, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-lg group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={artwork.src || "/placeholder.svg"}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Colored Rating Square */}
                  <div
                    className={`absolute bottom-4 right-4 ${
                      index % 3 === 0 ? "bg-emerald-500" : index % 3 === 1 ? "bg-blue-500" : "bg-purple-500"
                    } text-white px-3 py-2 rounded-lg shadow-lg`}
                  >
                    <div className="text-xl font-bold">{artwork.rating}</div>
                    <div className="text-xs font-medium">
                      {artwork.rating >= 9.5 ? "MASTERPIECE" : artwork.rating >= 9.0 ? "EXCELLENT" : "AMAZING"}
                    </div>
                  </div>

                  {/* Points Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
                    {artwork.points} pts
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />${artwork.price.toLocaleString()}
                  </div>

                  {/* Artwork Info - Appears on Hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-white text-xl font-bold">{artwork.title}</h3>
                    <p className="text-white/80 text-sm mb-2">by {artwork.artist}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs">
                        {artwork.category}
                      </span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        +{Math.floor(artwork.points * 0.1)} pts on purchase
                      </span>
                    </div>
                    <Button
                      className="mt-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {galleryImages.slice(3, 6).map((artwork, index) => (
              <motion.div
                key={index + 3}
                className="relative overflow-hidden rounded-xl shadow-lg group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={artwork.src || "/placeholder.svg"}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Colored Rating Square */}
                  <div
                    className={`absolute bottom-4 right-4 ${
                      index % 3 === 0 ? "bg-orange-500" : index % 3 === 1 ? "bg-red-500" : "bg-indigo-500"
                    } text-white px-3 py-2 rounded-lg shadow-lg`}
                  >
                    <div className="text-lg font-bold">{artwork.rating}</div>
                    <div className="text-xs font-medium">
                      {artwork.rating >= 9.0 ? "EXCELLENT" : artwork.rating >= 8.5 ? "GREAT" : "GOOD"}
                    </div>
                  </div>

                  {/* Points Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
                    {artwork.points} pts
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />${artwork.price.toLocaleString()}
                  </div>

                  {/* Artwork Info - Appears on Hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-white text-xl font-bold">{artwork.title}</h3>
                    <p className="text-white/80 text-sm mb-2">by {artwork.artist}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs">
                        {artwork.category}
                      </span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        +{Math.floor(artwork.points * 0.1)} pts on purchase
                      </span>
                    </div>
                    <Button
                      className="mt-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/artist-gallery">
              <Button size="lg" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">
                View Full Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials with Points */}
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
              Testimonials
            </span>
          </motion.div>
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800" variants={itemVariants}>
            What Our <span className="text-[#e76f51]">Community</span> Says
          </motion.h2>
          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={itemVariants}>
            Hear from artists, patrons, and churches who are earning points and growing their ministries
          </motion.p>
        </motion.div>

        <div className="relative h-[350px] md:h-[300px]">
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
                      <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">
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
                      </div>
                      <div className="text-center md:text-left flex-1">
                        <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-bold text-amber-600">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                          <div className="mt-2 md:mt-0 flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                              <span className="font-bold text-amber-600">{testimonial.points.toLocaleString()}</span>
                              <span className="text-xs text-gray-500">points earned</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Trophy className="h-4 w-4 text-orange-500" />
                              <span className="text-sm font-medium text-gray-700">{testimonial.level}</span>
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

      {/* Call to Action with Points Emphasis */}
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
                Join Our <span className="text-yellow-200">Points-Based</span> Community
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Start earning points today! Whether you're an artist, patron, or church, there's a place for you in our
                faith-based creative ecosystem.
              </p>

              {/* Points Earning Preview */}
              <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold mb-1">+50</div>
                  <div className="text-sm opacity-80">Points per artwork</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold mb-1">+100</div>
                  <div className="text-sm opacity-80">Points per sale</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold mb-1">+25</div>
                  <div className="text-sm opacity-80">Points per engagement</div>
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
                      Start Earning Points
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
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
