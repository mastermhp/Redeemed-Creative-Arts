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
  LandPlot,
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
  },
  {
    name: "Michael Thompson",
    role: "Church Arts Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    quote:
      "Finding talented Christian artists used to be challenging. This platform has connected our church with incredible artists who share our vision and values.",
  },
  {
    name: "Rebecca Martinez",
    role: "Art Patron",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    quote:
      "Supporting faith-based artists brings me joy. I've discovered beautiful artwork that speaks to my soul and connects with my beliefs.",
  },
]

// Gallery images
const galleryImages = [
  "/artworkImages3.png",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2145&auto=format&fit=crop",
  "/artworkImages1.png",
  "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?q=80&w=1974&auto=format&fit=crop",
  "/artworkImages2.png",
  "/artworkImages4.png",
]

// Stats
const stats = [
  { value: 500, label: "Artists", icon: <Palette className="h-6 w-6" /> },
  { value: 1200, label: "Patrons", icon: <Heart className="h-6 w-6" /> },
  { value: 350, label: "Churches", icon: <Church className="h-6 w-6" /> },
  { value: 5000, label: "Artworks", icon: <Star className="h-6 w-6" /> },
]

// Counter animation component
const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0)

  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = Number.parseInt(value.toString(), 10)

    // Don't run if start and end are the same
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
    <div className="relative overflow-hidden" ref={containerRef}>
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
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 5,
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
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
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
              <span className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20">
                Faith-Inspired Creativity
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground"
              variants={itemVariants}
            >
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
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-8"
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
                className="text-primary font-medium"
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

            <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-amber-500 text-white hover:bg-white hover:text-black transition-all duration-1000 group relative overflow-hidden"
                >
                  <span className="relative z-10">Join Our Community</span>
                  <motion.span
                    className="absolute inset-0 bg-white z-0"
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
                  className="border-amber-500 text-amber-500 hover:border-white hover:text-white transition-all duration-1000 relative overflow-hidden group"
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
            className="rounded-full border border-amber-500/30 bg-background/30 backdrop-blur-sm"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }}
          >
            <ArrowDown className="h-5 w-5 text-amber-500" />
          </Button>
        </motion.div>
      </section>

      {/* Featured Artwork Slider */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4 mb-12">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-[#e76f51]/10 text-[#e76f51] rounded-full text-sm font-medium border border-[#e76f51]/20">
                Featured Artwork
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground"
              variants={itemVariants}
            >
              Inspiring <span className="text-[#e76f51]">Faith-Based</span> Creations
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto" variants={itemVariants}>
              Explore a collection of stunning artwork from our talented Christian artists
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
              delay: 5000, // Slowed down by 2 seconds (from 3000 to 5000)
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">Artwork Title {index + 1}</h3>
                    <p className="text-white/80">Artist Name</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20">
                Our Community
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-amber-500"
              variants={itemVariants}
            >
              Who We Serve
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto" variants={itemVariants}>
              Our platform brings together three key groups to create a thriving creative ecosystem
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
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-amber-500 group-hover:border-[#e76f51] transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64">
                  <Image
                    src={artistImage || "/placeholder.svg"}
                    alt="Artists"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      backgroundColor: "rgba(217, 119, 6, 0.8)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Palette className="h-6 w-6 text-[#e76f51]" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-500">For Artists</h3>
                  <p className="text-muted-foreground mb-4">
                    Showcase your faith-inspired art, connect with supporters, and grow your creative ministry.
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
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Showcase your artwork</span>
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
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Sell originals and prints</span>
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
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Connect with churches</span>
                    </motion.li>
                  </ul>
                  <Link href="/artist-info">
                    <Button className="w-full bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
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
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-amber-500 group-hover:border-[#e76f51] transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64">
                  <Image
                    src={patronImage || "/placeholder.svg"}
                    alt="Patrons"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      backgroundColor: "rgba(217, 119, 6, 0.8)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart className="h-6 w-6 text-[#e76f51]" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-500">For Patrons</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover faith-inspired art, support Christian artists, and engage with a community that shares your
                    values.
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
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Discover Christian artists</span>
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
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Support creative ministries</span>
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
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Earn rewards and recognition</span>
                    </motion.li>
                  </ul>
                  <Link href="/patron-info">
                    <Button className="w-full bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
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
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-amber-500 group-hover:border-[#e76f51] transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64">
                  <Image
                    src={churchImage || "/placeholder.svg"}
                    alt="Churches"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      backgroundColor: "rgba(217, 119, 6, 0.8)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Church className="h-6 w-6 text-[#e76f51]" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-500">For Churches</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with Christian artists, enhance your ministry through visual arts, and engage your
                    community.
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
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Find creative talent</span>
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
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Host art-focused events</span>
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
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Engage your congregation</span>
                    </motion.li>
                  </ul>
                  <Link href="/church-info">
                    <Button className="w-full bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
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

      {/* Stats Counter Section - Made slightly smaller */}
      <section className="py-16 relative z-10 bg-gradient-to-b from-background/95 to-background">
        <div className="max-w-4xl mx-auto px-4">
          {" "}
          {/* Changed from max-w-5xl to max-w-4xl */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8" /* Reduced gap slightly */
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 text-center" /* Reduced padding */
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3" /* Reduced size and margin */
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  {React.cloneElement(stat.icon, {
                    className: "h-5 w-5 text-amber-500" /* Reduced icon size */,
                  })}
                </motion.div>
                <h3 className="text-3xl font-bold text-foreground mb-1">
                  {" "}
                  {/* Reduced text size and margin */}
                  <Counter value={stat.value} />+
                </h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p> {/* Reduced text size */}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action with Animated Background */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-card p-12 rounded-xl relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
            <motion.div
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
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

            <div className="relative z-10 text-center">
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-[#e76f51] p-1 mx-auto mb-6"
                animate={{
                  rotate: 360,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  backgroundPosition: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <LandPlot className="h-10 w-10 text-white" />
                </div>
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Join Our <span className="text-amber-500">Community</span> Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Whether you're an artist, patron, or church, there's a place for you in our faith-based creative
                community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:opacity-90 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Sign Up Now</span>
                    <motion.span
                      className="absolute inset-0 bg-white z-0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-500"
                  >
                    Contact Us
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
                  className="bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border hover:border-amber-500 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Instagram className="h-5 w-5 text-amber-500" />
                </motion.a>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border hover:border-amber-500 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Facebook className="h-5 w-5 text-amber-500" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border hover:border-amber-500 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Twitter className="h-5 w-5 text-amber-500" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid with Hover Effects - Updated to be more like Huber designs */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20">
                Gallery
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground"
              variants={itemVariants}
            >
              Explore Our <span className="text-amber-500">Collection</span>
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto" variants={itemVariants}>
              A glimpse into the diverse artwork created by our talented community
            </motion.p>
          </motion.div>

          {/* Updated Gallery Grid - Huber Design Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryImages.slice(0, 3).map((image, index) => (
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
                    src={image || "/placeholder.svg"}
                    alt={`Featured Artwork ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Artwork Info - Appears on Hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-white text-xl font-bold">{`Featured Artwork ${index + 1}`}</h3>
                    <p className="text-white/80 text-sm mb-2">Artist Name</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs">
                        {index % 2 === 0 ? "Painting" : "Digital Art"}
                      </span>
                      <span className="px-2 py-1 bg-[#e76f51]/20 text-[#e76f51] rounded-full text-xs">
                        {index % 3 === 0 ? "Featured" : "New"}
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

                {/* Bottom Info Bar - Always Visible */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium truncate">{`Artwork ${index + 1}`}</h4>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Heart className="h-4 w-4 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {galleryImages.slice(3, 6).map((image, index) => (
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
                    src={image || "/placeholder.svg"}
                    alt={`Gallery Image ${index + 4}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Artwork Info - Appears on Hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-white text-xl font-bold">{`Gallery Artwork ${index + 4}`}</h3>
                    <p className="text-white/80 text-sm mb-2">Artist Name</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs">
                        {index % 2 === 0 ? "Sculpture" : "Photography"}
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

                {/* Bottom Info Bar - Always Visible */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium truncate">{`Artwork ${index + 4}`}</h4>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Heart className="h-4 w-4 text-white" />
                      </motion.div>
                    </div>
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
            <Link href="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-500"
              >
                View Full Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <motion.section
        className="py-20 mb-12 relative z-10"
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
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground"
            variants={itemVariants}
          >
            What Our <span className="text-[#e76f51]">Community</span> Says
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto" variants={itemVariants}>
            Hear from artists, patrons, and churches who have found value in our platform
          </motion.p>
        </motion.div>

        <div className="relative h-[300px] md:h-[250px]">
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
                    <div className="max-w-5xl mx-auto bg-card p-8 rounded-xl border border-amber-500/20 shadow-lg flex flex-col md:flex-row items-center gap-6 h-full">
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
                      <div className="text-center md:text-left">
                        <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                        <h3 className="font-bold text-amber-500">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
    </div>
  )
}
