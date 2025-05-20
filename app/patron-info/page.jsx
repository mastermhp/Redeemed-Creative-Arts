"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Check,
  Heart,
  Gift,
  Award,
  DollarSign,
  ThumbsUp,
  Star,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
  MousePointer,
  Zap,
  Bookmark,
  Share2,
  Plus,
  Minus,
  PenTool,
  Lightbulb,
  Layers,
  Coffee,
} from "lucide-react"

// High-quality images from Unsplash
const patronImages = {
  hero: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop",
  showcase: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop",
  gallery1: "https://images.unsplash.com/photo-1579965342575-16428a7c8881?q=80&w=2000&auto=format&fit=crop",
  gallery2: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop",
  gallery3: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop",
  gallery4: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop",
  testimonial1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  testimonial2: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  testimonial3: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  patron1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  patron2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  patron3: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop",
  artwork1: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop",
  artwork2: "https://images.unsplash.com/photo-1579965342575-16428a7c8881?q=80&w=800&auto=format&fit=crop",
  artwork3: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=800&auto=format&fit=crop",
  artwork4: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop",
}

// Custom animated cursor component
const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
      document.addEventListener("mouseover", onMouseHover)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onMouseHover)
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseHover = (e) => {
      const interactable = e.target.closest("a, button, .hover-effect")
      setLinkHovered(interactable !== null)
    }

    addEventListeners()
    return () => removeEventListeners()
  }, [])

  return (
    <motion.div
      className="cursor-dot hidden md:block"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: "difference",
      }}
      animate={{
        x: position.x,
        y: position.y,
        scale: clicked ? 0.5 : linkHovered ? 2 : 1,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300,
        mass: 0.5,
      }}
    >
      <div className="h-6 w-6 bg-white rounded-full opacity-70" />
    </motion.div>
  )
}

// Parallax section component
const ParallaxSection = ({ children, baseVelocity = 100 }) => {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const y = useTransform(scrollYProgress, [0, 1], [0, baseVelocity])

  return (
    <motion.div ref={containerRef} style={{ y }} className="relative">
      {children}
    </motion.div>
  )
}

// 3D Tilt Card component
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const posX = e.clientX - centerX
    const posY = e.clientY - centerY
    const rotateXValue = (posY / (rect.height / 2)) * -10
    const rotateYValue = (posX / (rect.width / 2)) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    setScale(1.05)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`hover-effect ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: "transform 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// Animated text reveal component
const AnimatedText = ({ text, className, once = true, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  }

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-1" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Magnetic Button component
const MagneticButton = ({ children, className }) => {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const button = buttonRef.current
    const { left, top, width, height } = button.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      ref={buttonRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: x * 0.3, y: y * 0.3 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

// Animated counter component
const AnimatedCounter = ({ from, to, duration = 2, className }) => {
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (isInView) {
      let start = from
      const step = Math.ceil((to - from) / (duration * 60))
      const timer = setInterval(() => {
        start += step
        if (start >= to) {
          setCount(to)
          clearInterval(timer)
        } else {
          setCount(start)
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [from, to, duration, isInView])

  return (
    <span ref={nodeRef} className={className}>
      {count}
    </span>
  )
}

// Animated gradient background
const AnimatedGradient = ({ className }) => {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        background: "linear-gradient(45deg, rgba(245,158,11,0.1) 0%, rgba(231,111,81,0.1) 100%)",
        filter: "blur(120px)",
        opacity: 0.6,
      }}
      animate={{
        background: [
          "linear-gradient(45deg, rgba(245,158,11,0.1) 0%, rgba(231,111,81,0.1) 100%)",
          "linear-gradient(45deg, rgba(231,111,81,0.1) 0%, rgba(245,158,11,0.1) 100%)",
          "linear-gradient(45deg, rgba(245,158,11,0.1) 0%, rgba(231,111,81,0.1) 100%)",
        ],
      }}
      transition={{
        duration: 15,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  )
}

// Floating elements component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 20 + 5,
            height: Math.random() * 20 + 5,
            background: `rgba(245, 158, 11, ${Math.random() * 0.2 + 0.1})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
            x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-[#e76f51] z-[100]"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  )
}

// Accordion component for FAQs
const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="bg-[#171717] rounded-xl overflow-hidden border border-[#333] hover:border-amber-600/50 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <button
            className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-xl font-semibold text-amber-500">{item.question}</h3>
            <div className="flex-shrink-0 ml-4">
              <motion.div animate={{ rotate: activeIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {activeIndex === index ? (
                  <Minus className="h-5 w-5 text-amber-500" />
                ) : (
                  <Plus className="h-5 w-5 text-amber-500" />
                )}
              </motion.div>
            </div>
          </button>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-gray-300 border-t border-[#333]">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

// Artwork showcase component with hover effects
const ArtworkShowcase = ({ artworks }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {artworks.map((artwork, index) => (
        <motion.div
          key={index}
          className="relative group overflow-hidden rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-white mb-1">{artwork.title}</h3>
              <p className="text-gray-300 text-sm">{artwork.artist}</p>

              <div className="flex items-center mt-3 space-x-2">
                <motion.button className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full" whileHover={{ scale: 1.1 }}>
                  <Heart className="h-3.5 w-3.5 text-white" />
                </motion.button>
                <motion.button className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full" whileHover={{ scale: 1.1 }}>
                  <Bookmark className="h-3.5 w-3.5 text-white" />
                </motion.button>
                <motion.button className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full" whileHover={{ scale: 1.1 }}>
                  <Share2 className="h-3.5 w-3.5 text-white" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Main component
export default function PatronInfoPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Sample artwork data
  const artworks = [
    { image: patronImages.artwork1, title: "Divine Light", artist: "Sarah Johnson", category: "painting" },
    { image: patronImages.artwork2, title: "Heavenly Creation", artist: "Michael Chen", category: "digital" },
    { image: patronImages.artwork3, title: "Faith Journey", artist: "Rebecca Williams", category: "photography" },
    { image: patronImages.artwork4, title: "Eternal Hope", artist: "David Miller", category: "sculpture" },
  ]

  // FAQ data
  const faqItems = [
    {
      question: "How do I support artists on the platform?",
      answer:
        "You can support artists in multiple ways: purchase their artwork, make direct donations, create matching campaigns, gift points, vote in contests, and engage with their content through comments and shares.",
    },
    {
      question: "What are points and how do I earn them?",
      answer:
        "Points are earned through platform engagement such as logging in regularly, voting on artwork, making donations, sharing content, and purchasing artwork. Points can be redeemed for rewards or gifted to artists.",
    },
    {
      question: "How do matching donations work?",
      answer:
        "With a Tier 2 membership, you can create matching campaigns where you pledge to match donations from other patrons up to a specified amount. This multiplies the impact of community support for artists and causes.",
    },
    {
      question: "Can I be both a patron and a helper?",
      answer:
        "Yes! Many patrons also opt in to the Helper program to offer their talents to churches and organizations. You can select this option during registration or from your dashboard.",
    },
    {
      question: "How do I discover new artists to support?",
      answer:
        "Our platform features curated collections, personalized recommendations based on your interests, trending artists, and a powerful search function with filters for style, medium, and themes.",
    },
    {
      question: "Are my donations tax-deductible?",
      answer:
        "While Redeemed Creative Arts is not a 501(c)(3) organization, we partner with several faith-based nonprofits. Donations made through our nonprofit partners may be tax-deductible. Always consult with a tax professional for specific advice.",
    },
  ]

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

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
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

  // Scroll-triggered animations
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.5, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <>
      <ScrollProgress />
      <AnimatedCursor />

      <div className="relative overflow-hidden bg-[#0a0a0a]">
        <FloatingElements />

        {/* Hero Section with Parallax */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <AnimatedGradient className="z-0" />

          <motion.div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${patronImages.hero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              scale,
            }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
              }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                className="mb-6 inline-block"
              >
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4 mx-auto">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                  <Heart className="h-12 w-12 text-amber-500" />
                </div>
              </motion.div>

              <AnimatedText
                text="For Patrons & Supporters"
                className="text-6xl font-bold mb-6 text-white leading-tight"
              />

              <AnimatedText
                text="Discover and support Christian artists, engage with faith-inspired creativity, and make a difference"
                className="text-xl text-gray-300 mb-10"
                delay={0.5}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <MagneticButton>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-[#e76f51] hover:from-[#e76f51] hover:to-amber-500 text-white group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Join as a Patron
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </MagneticButton>

                <MagneticButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500/10 group"
                  >
                    <span className="flex items-center">
                      Explore Benefits
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </MagneticButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="flex flex-col items-center"
                >
                  <p className="text-gray-400 mb-2 text-sm">Scroll to explore</p>
                  <MousePointer className="h-5 w-5 text-amber-500" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Counter Section */}
        <section className="py-20 bg-[#0f0f0f] relative">
          <AnimatedGradient className="opacity-30" />

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { count: 2000, label: "Patrons", icon: <Heart className="h-8 w-8 text-amber-500" /> },
                { count: 500, label: "Artists", icon: <PenTool className="h-8 w-8 text-amber-500" /> },
                { count: 5000, label: "Artworks", icon: <Layers className="h-8 w-8 text-amber-500" /> },
                { count: 100000, label: "Donations", icon: <Gift className="h-8 w-8 text-amber-500" /> },
              ].map((stat, index) => (
                <TiltCard
                  key={index}
                  className="bg-[#171717] p-6 rounded-xl border border-[#333] hover:border-amber-500 transition-all duration-300"
                >
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={scaleVariants}
                    className="text-center"
                  >
                    <motion.div
                      className="mb-4 mx-auto flex items-center justify-center"
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      {stat.icon}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-amber-500/20"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: index * 0.2,
                        }}
                      />
                    </motion.div>
                    <div className="text-4xl font-bold text-white mb-1">
                      <AnimatedCounter from={0} to={stat.count} duration={2.5} />+
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section with Parallax */}
        <section className="py-24 relative overflow-hidden">
          <AnimatedGradient className="opacity-40" />

          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <ParallaxSection baseVelocity={-20}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUpVariants}
                >
                  <div className="inline-flex items-center bg-amber-500/10 px-4 py-2 rounded-full mb-6">
                    <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="text-amber-500 font-medium">Support Creativity</span>
                  </div>

                  <AnimatedText
                    text="Support Faith-Inspired Creativity"
                    className="text-4xl font-bold mb-6 text-white"
                  />

                  <div className="space-y-6">
                    <motion.p
                      className="text-gray-300 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      As a patron on Redeemed Creative Arts, you play a vital role in nurturing and supporting Christian
                      visual artists who share their God-given talents.
                    </motion.p>

                    <motion.p
                      className="text-gray-300 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      Discover beautiful artwork that reflects your faith, connect with artists who share your values,
                      and help spread the Gospel through the power of visual creativity.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="flex flex-wrap gap-4 mt-8"
                    >
                      {["Donations", "Purchases", "Engagement", "Sharing", "Prayer"].map((tag, i) => (
                        <motion.span
                          key={i}
                          className="bg-[#171717] text-amber-500 px-4 py-2 rounded-full text-sm border border-[#333]"
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(245, 158, 11, 0.1)",
                            borderColor: "rgba(245, 158, 11, 0.5)",
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </ParallaxSection>

              <ParallaxSection baseVelocity={20}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={scaleVariants}
                  className="relative"
                >
                  <TiltCard className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-amber-900/10">
                    <Image
                      src={patronImages.showcase || "/placeholder.svg"}
                      alt="Support artists"
                      fill
                      className="object-cover transition-all duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <h3 className="text-2xl font-bold text-white mb-2">Make a Difference</h3>
                        <p className="text-gray-300">Through supporting Christian artists</p>

                        <motion.div
                          className="mt-4 flex items-center text-amber-500"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="mr-2 font-medium">Learn more</span>
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <motion.div
                      className="absolute top-4 right-4 bg-black/30 backdrop-blur-md rounded-full p-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Sparkles className="h-5 w-5 text-amber-500" />
                    </motion.div>
                  </TiltCard>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -bottom-6 -left-6 w-12 h-12 bg-amber-500/20 rounded-full z-[-1]"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />

                  <motion.div
                    className="absolute -top-6 -right-6 w-24 h-24 bg-[#e76f51]/20 rounded-full z-[-1]"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: 0.5,
                    }}
                  />
                </motion.div>
              </ParallaxSection>
            </div>
          </div>
        </section>

        {/* Benefits Section with 3D Cards */}
        <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
          <AnimatedGradient className="opacity-30" />

          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="text-center mb-16"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-amber-500/10 px-4 py-2 rounded-full mb-6"
              >
                <Gift className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Exclusive Benefits</span>
              </motion.div>

              <AnimatedText text="Benefits for Patrons" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Enjoy these exclusive benefits when you join our community of supporters"
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                delay={0.3}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: <Heart className="h-10 w-10 text-amber-500" />,
                  title: "Discover Art",
                  description:
                    "Explore a curated collection of faith-inspired artwork from talented Christian artists around the world.",
                  color: "from-amber-500/20 to-amber-600/20",
                },
                {
                  icon: <DollarSign className="h-10 w-10 text-amber-500" />,
                  title: "Support Artists",
                  description:
                    "Purchase artwork, donate to artists, and contribute to campaigns that help Christian creatives thrive.",
                  color: "from-amber-600/20 to-amber-700/20",
                },
                {
                  icon: <ThumbsUp className="h-10 w-10 text-amber-500" />,
                  title: "Vote & Engage",
                  description:
                    "Vote in contests, comment on artwork, and engage with a community that values faith-inspired creativity.",
                  color: "from-amber-700/20 to-amber-800/20",
                },
                {
                  icon: <Award className="h-10 w-10 text-amber-500" />,
                  title: "Earn Rewards",
                  description:
                    "Earn points for your engagement and redeem them for rewards like gift cards, discounts, and special features.",
                  color: "from-amber-800/20 to-amber-900/20",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="group"
                >
                  <TiltCard className="h-full bg-[#171717] p-8 rounded-2xl border border-[#333] hover:border-amber-500 transition-all duration-500 overflow-hidden relative">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className="bg-[#1a1a1a] p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 group-hover:bg-[#1d1d1d] transition-colors duration-300 relative"
                        whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      >
                        {benefit.icon}
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-amber-500/10"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                        />
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-amber-500 transition-colors duration-300">
                        {benefit.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed">{benefit.description}</p>

                      <motion.div
                        className="mt-6 flex items-center text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="mr-2 font-medium text-sm">Learn more</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Ways to Support Section */}
        <section className="py-24 relative overflow-hidden">
          <AnimatedGradient className="opacity-40" />

          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="text-center mb-16"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-amber-500/10 px-4 py-2 rounded-full mb-6"
              >
                <Zap className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Make an Impact</span>
              </motion.div>

              <AnimatedText text="Ways to Support Artists" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Multiple ways to make a difference in the lives of Christian artists"
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                delay={0.3}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="grid md:grid-cols-2 gap-12"
            >
              {[
                {
                  icon: <DollarSign className="h-12 w-12 text-amber-500" />,
                  title: "Direct Donations",
                  description:
                    "Support artists directly with one-time or recurring donations to help them continue their creative ministry.",
                  features: [
                    "Choose one-time or monthly donations",
                    "100% of donations go to artists",
                    "Track your giving history",
                    "Receive updates from supported artists",
                  ],
                  image: patronImages.gallery1,
                },
                {
                  icon: <Gift className="h-12 w-12 text-amber-500" />,
                  title: "Gift Points",
                  description:
                    "Share your earned points with artists to help them access platform benefits and rewards.",
                  features: [
                    "Transfer your points to artists",
                    "Help artists unlock premium features",
                    "Support without financial commitment",
                    "Earn special badges for point gifting",
                  ],
                  image: patronImages.gallery2,
                },
                {
                  icon: <Heart className="h-12 w-12 text-amber-500" />,
                  title: "Purchase Artwork",
                  description:
                    "Buy original artwork, prints, or digital downloads to enjoy in your home while supporting artists.",
                  features: [
                    "Browse thousands of original pieces",
                    "Purchase prints and digital downloads",
                    "Commission custom artwork",
                    "Build your collection of faith-inspired art",
                  ],
                  image: patronImages.gallery3,
                },
                {
                  icon: <Award className="h-12 w-12 text-amber-500" />,
                  title: "Matching Donations",
                  description:
                    "Create matching campaigns to multiply the impact of community donations to artists and causes.",
                  features: [
                    "Double the impact of community giving",
                    "Set your own matching limits",
                    "Support specific artists or causes",
                    "Track campaign progress in real-time",
                  ],
                  image: patronImages.gallery4,
                },
              ].map((support, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-[#171717] rounded-3xl overflow-hidden border border-[#333] hover:border-amber-500 transition-all duration-500 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={support.image || "/placeholder.svg"}
                      alt={support.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-black/60 to-black/30"></div>

                    <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
                      <motion.div
                        className="bg-black/30 backdrop-blur-sm p-4 rounded-full mb-4"
                        whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      >
                        {support.icon}
                      </motion.div>

                      <h3 className="text-3xl font-bold text-white mb-2">{support.title}</h3>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">{support.description}</p>

                    <div className="space-y-3 mb-8">
                      {support.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <div className="bg-amber-500/10 p-1 rounded-full mr-3 flex-shrink-0">
                            <Check className="h-4 w-4 text-amber-500" />
                          </div>
                          <p className="text-gray-300">{feature}</p>
                        </motion.div>
                      ))}
                    </div>

                    <MagneticButton>
                      <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] hover:from-[#e76f51] hover:to-amber-500 text-white group">
                        <span className="flex items-center">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </MagneticButton>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Artwork Section */}
        <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
          <AnimatedGradient className="opacity-30" />

          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="text-center mb-16"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-amber-500/10 px-4 py-2 rounded-full mb-6"
              >
                <PenTool className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Featured Work</span>
              </motion.div>

              <AnimatedText text="Discover Beautiful Artwork" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Explore a sample of the faith-inspired artwork you can support"
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                delay={0.3}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 mt-8 mb-12"
              >
                {["All", "Painting", "Digital", "Photography", "Sculpture"].map((category, i) => (
                  <motion.button
                    key={i}
                    className={`px-4 py-2 rounded-full text-sm border ${
                      activeTab === category.toLowerCase() || (activeTab === "all" && category === "All")
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-[#171717] text-gray-300 border-[#333] hover:border-amber-500/50"
                    } transition-all duration-300`}
                    onClick={() => setActiveTab(category.toLowerCase())}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            <ArtworkShowcase
              artworks={activeTab === "all" ? artworks : artworks.filter((artwork) => artwork.category === activeTab)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <MagneticButton>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500/10 group"
                >
                  <span className="flex items-center">
                    View All Artwork
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* Membership Tiers Section */}
        <section className="py-24 relative overflow-hidden">
          <AnimatedGradient className="opacity-40" />

          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="text-center mb-16"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-amber-500/10 px-4 py-2 rounded-full mb-6"
              >
                <Layers className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Membership Options</span>
              </motion.div>

              <AnimatedText text="Patron Membership Tiers" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Choose the plan that fits your support journey"
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                delay={0.3}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              {/* Free Tier */}
              <motion.div variants={itemVariants} whileHover={{ y: -10 }} className="relative group">
                <TiltCard className="bg-[#171717] rounded-3xl p-8 border border-[#333] hover:border-gray-500 transition-all duration-500 relative overflow-hidden h-full">
                  <motion.div
                    className="absolute -bottom-20 -right-20 w-64 h-64 bg-gray-600/5 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      x: [0, 20, 0],
                      y: [0, -20, 0],
                    }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                  />

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
                      <div className="text-5xl font-bold text-white mb-2">$0</div>
                      <p className="text-gray-400">per month</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {[
                        "Basic patron profile",
                        "View and vote on artwork",
                        "Participate in community",
                        "Basic point earning",
                      ].map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <div className="bg-green-500/10 p-1 rounded-full mr-3 flex-shrink-0">
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                          <p className="text-gray-300">{feature}</p>
                        </motion.div>
                      ))}
                    </div>

                    <MagneticButton className="w-full">
                      <Button
                        variant="outline"
                        className="w-full hover:bg-gray-500/10 hover:text-gray-300 hover:border-gray-500 group"
                      >
                        <span className="flex items-center justify-center">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </MagneticButton>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Tier 1 */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                initial={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative z-20"
              >
                <TiltCard className="bg-[#171717] rounded-3xl p-8 border-2 border-amber-600 transition-all duration-500 relative overflow-hidden h-full shadow-xl shadow-amber-900/10">
                  <motion.div
                    className="absolute -right-20 -top-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  />

                  <div className="absolute top-0 right-0 bg-amber-600 text-black px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-xl z-20">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute inset-0 bg-amber-500 rounded-bl-lg rounded-tr-xl z-[-1]"
                    />
                    <span className="relative z-10">Popular</span>
                  </div>

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-white">Tier 1</h3>
                      <div className="text-5xl font-bold text-white mb-2">$9.99</div>
                      <p className="text-gray-400">per month</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {[
                        "Everything in Free",
                        "Enhanced profile visibility",
                        "Direct message artists",
                        "Create donation campaigns",
                        "2x point earning rate",
                        "Helper program eligibility",
                      ].map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <div className="bg-green-500/10 p-1 rounded-full mr-3 flex-shrink-0">
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                          <p className="text-gray-300">{feature}</p>
                        </motion.div>
                      ))}
                    </div>

                    <MagneticButton className="w-full">
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-[#e76f51] hover:from-[#e76f51] hover:to-amber-500 text-white group">
                        <span className="flex items-center justify-center">
                          Upgrade Now
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </MagneticButton>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Tier 2 */}
              <motion.div variants={itemVariants} whileHover={{ y: -10 }} className="relative group">
                <TiltCard className="bg-[#171717] rounded-3xl p-8 border border-[#333] hover:border-amber-700 transition-all duration-500 relative overflow-hidden h-full">
                  <motion.div
                    className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-700/10 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      x: [0, -20, 0],
                      y: [0, 20, 0],
                    }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  />

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-white">Tier 2</h3>
                      <div className="text-5xl font-bold text-white mb-2">$19.99</div>
                      <p className="text-gray-400">per month</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {[
                        "Everything in Tier 1",
                        "Create matching campaigns",
                        "Priority helper status",
                        "Featured patron recognition",
                        "3x point earning rate",
                        "Early access to new artwork",
                      ].map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <div className="bg-green-500/10 p-1 rounded-full mr-3 flex-shrink-0">
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                          <p className="text-gray-300">{feature}</p>
                        </motion.div>
                      ))}
                    </div>

                    <MagneticButton className="w-full">
                      <Button
                        variant="outline"
                        className="w-full hover:bg-amber-900/30 hover:text-amber-500 hover:border-amber-700 group"
                      >
                        <span className="flex items-center justify-center">
                          Upgrade Now
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </MagneticButton>
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
          <AnimatedGradient className="opacity-30" />

          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="text-center mb-16"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-amber-500/10 px-4 py-2 rounded-full mb-6"
              >
                <MessageCircle className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Success Stories</span>
              </motion.div>

              <AnimatedText text="Patron Testimonials" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Hear from patrons who are making a difference"
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                delay={0.3}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  name: "Emily Parker",
                  role: "Patron",
                  image: patronImages.testimonial1,
                  quote:
                    "I love being able to support Christian artists who create beautiful work that reflects my faith. The platform makes it easy to discover new artists and engage with a community that shares my values.",
                },
                {
                  name: "David Wilson",
                  role: "Supporter",
                  image: patronImages.testimonial2,
                  quote:
                    "As a patron, I've been able to directly impact the lives of artists who are spreading the Gospel through their creativity. The matching campaigns feature has allowed me to multiply my giving and make a bigger difference.",
                },
                {
                  name: "Sophia Martinez",
                  role: "Patron & Helper",
                  image: patronImages.testimonial3,
                  quote:
                    "Being both a patron and a helper has given me a deeper connection to the Christian art community. I've built relationships with artists and churches while collecting meaningful artwork that inspires my faith journey.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <TiltCard className="bg-[#171717] p-8 rounded-2xl border border-[#333] hover:border-amber-500 transition-all duration-500 h-full">
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-amber-500/30">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-amber-500">{testimonial.name}</h3>
                          <p className="text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute -top-4 -left-2 text-6xl text-amber-500/20 font-serif">"</div>
                        <p className="text-gray-300 italic relative z-10 leading-relaxed">{testimonial.quote}</p>
                        <div className="absolute -bottom-8 -right-2 text-6xl text-amber-500/20 font-serif">"</div>
                      </div>

                      <div className="mt-8 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-amber-500 mr-1" />
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 relative overflow-hidden">
          <AnimatedGradient className="opacity-40" />

          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="text-center mb-16"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-amber-500/10 px-4 py-2 rounded-full mb-6"
              >
                <Coffee className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Common Questions</span>
              </motion.div>

              <AnimatedText text="Frequently Asked Questions" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Find answers to common questions about our patron platform"
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                delay={0.3}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <Accordion items={faqItems} />
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
          <AnimatedGradient className="opacity-50" />

          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-gradient-to-r from-[#171717] to-[#1a1a1a] p-12 md:p-16 rounded-3xl border border-[#333] relative overflow-hidden group hover:border-amber-500 transition-all duration-500 text-center">
                <motion.div
                  className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="mb-8 inline-block"
                  >
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mx-auto">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-amber-500/20"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                      <Sparkles className="h-10 w-10 text-amber-500" />
                    </div>
                  </motion.div>

                  <AnimatedText
                    text="Ready to Support Christian Artists?"
                    className="text-4xl md:text-5xl font-bold mb-6 text-white"
                  />

                  <AnimatedText
                    text="Join our community of patrons and help spread faith-inspired creativity throughout the world."
                    className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
                    delay={0.3}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-6"
                  >
                    <MagneticButton>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-amber-500 to-[#e76f51] hover:from-[#e76f51] hover:to-amber-500 text-white group relative overflow-hidden"
                        asChild
                      >
                        <Link href="/register">
                          <span className="relative z-10 flex items-center">
                            Join as a Patron
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-[#e76f51] to-amber-500 opacity-0 group-hover:opacity-100"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </Link>
                      </Button>
                    </MagneticButton>

                    <MagneticButton>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-amber-500 text-amber-500 hover:bg-amber-500/10 group"
                      >
                        <span className="flex items-center">
                          Learn More
                          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                      </Button>
                    </MagneticButton>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
