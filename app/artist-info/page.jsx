"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Check,
  Palette,
  Award,
  DollarSign,
  Users,
  BookOpen,
  Church,
  Star,
  Heart,
  Sparkles,
  Brush,
  Zap,
  Gift,
  MessageCircle,
  ArrowUpRight,
  MousePointer,
  PenTool,
  Lightbulb,
  Layers,
  Globe,
  Bookmark,
  Share2,
  Plus,
  Minus,
} from "lucide-react"

// High-quality images from Unsplash
const artistImages = {
  hero: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop",
  showcase: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop",
  gallery1: "https://images.unsplash.com/photo-1579965342575-16428a7c8881?q=80&w=2000&auto=format&fit=crop",
  gallery2: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop",
  gallery3: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop",
  gallery4: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop",
  testimonial1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  testimonial2: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  testimonial3: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  artist1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  artist2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  artist3: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop",
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
export default function ArtistInfoPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Sample artwork data
  const artworks = [
    { image: artistImages.artwork1, title: "Divine Light", artist: "Sarah Johnson", category: "painting" },
    { image: artistImages.artwork2, title: "Heavenly Creation", artist: "Michael Chen", category: "digital" },
    { image: artistImages.artwork3, title: "Faith Journey", artist: "Rebecca Williams", category: "photography" },
    { image: artistImages.artwork4, title: "Eternal Hope", artist: "David Miller", category: "sculpture" },
  ]

  // FAQ data
  const faqItems = [
    {
      question: "What types of art can I share on the platform?",
      answer:
        "We welcome all forms of visual art including painting, drawing, photography, digital art, sculpture, and more. All artwork should align with Christian values and be appropriate for our faith-based community.",
    },
    {
      question: "How do I get paid for my artwork sales?",
      answer:
        "When your artwork sells, the payment is processed through our secure system. After a small platform fee, the funds are transferred to your connected payment account. Detailed payment information will be available in Phase 2.",
    },
    {
      question: "What is the Helper program?",
      answer:
        "The Helper program connects artists with churches and organizations that need creative services. As a Helper, you can offer your artistic talents for events, projects, and ministries. You can opt in during registration or from your dashboard.",
    },
    {
      question: 'How does the "No AI Art" verification work?',
      answer:
        "We value authentic human creativity. Our platform includes a verification process where artists confirm their work is created by them, not generated by AI. This maintains the integrity of our community's creative expression.",
    },
    {
      question: "Can I offer art classes or workshops through the platform?",
      answer:
        "Yes! Tier 2 members can create and sell courses, workshops, and tutorials. This is a great way to share your skills and generate additional income while helping others develop their artistic abilities.",
    },
    {
      question: "How can I increase my visibility on the platform?",
      answer:
        "Engage regularly by uploading new artwork, participating in contests, interacting with other artists, and sharing your profile on social media. Tier 1 and Tier 2 members also receive enhanced visibility features and promotional opportunities.",
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
              backgroundImage: `url(${artistImages.hero})`,
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
                  <Palette className="h-12 w-12 text-amber-500" />
                </div>
              </motion.div>

              <AnimatedText
                text="For Christian Visual Artists"
                className="text-6xl font-bold mb-6 text-white leading-tight"
              />

              <AnimatedText
                text="Share your God-given talents, connect with supporters, and grow your artistic ministry"
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
                      Join as an Artist
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
                { count: 500, label: "Artists", icon: <Brush className="h-8 w-8 text-amber-500" /> },
                { count: 2500, label: "Artworks", icon: <Palette className="h-8 w-8 text-amber-500" /> },
                { count: 150, label: "Churches", icon: <Church className="h-8 w-8 text-amber-500" /> },
                { count: 10000, label: "Monthly Views", icon: <Globe className="h-8 w-8 text-amber-500" /> },
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

        {/* Showcase Section with Parallax */}
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
                    <span className="text-amber-500 font-medium">Showcase Your Work</span>
                  </div>

                  <AnimatedText text="Share Your Faith-Inspired Art" className="text-4xl font-bold mb-6 text-white" />

                  <div className="space-y-6">
                    <motion.p
                      className="text-gray-300 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      Redeemed Creative Arts provides a dedicated platform for Christian visual artists to share their
                      work with a community that values faith-inspired creativity.
                    </motion.p>

                    <motion.p
                      className="text-gray-300 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      Whether you're a painter, photographer, digital artist, sculptor, or work in any other visual
                      medium, our platform helps you connect with patrons, churches, and other artists who share your
                      values.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="flex flex-wrap gap-4 mt-8"
                    >
                      {["Painting", "Photography", "Digital Art", "Sculpture", "Mixed Media"].map((tag, i) => (
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
                      src={artistImages.showcase || "/placeholder.svg"}
                      alt="Artist showcase"
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
                        <h3 className="text-2xl font-bold text-white mb-2">Express Your Faith</h3>
                        <p className="text-gray-300">Through your unique artistic vision</p>

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

              <AnimatedText text="Benefits for Artists" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Unlock powerful tools and opportunities to grow your artistic ministry"
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
                  icon: <Palette className="h-10 w-10 text-amber-500" />,
                  title: "Showcase Your Work",
                  description:
                    "Upload and display your artwork in a beautiful gallery format that highlights your unique style and vision.",
                  color: "from-amber-500/20 to-amber-600/20",
                },
                {
                  icon: <DollarSign className="h-10 w-10 text-amber-500" />,
                  title: "Sell Your Creations",
                  description:
                    "Set your own prices and sell original artwork, prints, and digital downloads directly to interested buyers.",
                  color: "from-amber-600/20 to-amber-700/20",
                },
                {
                  icon: <Users className="h-10 w-10 text-amber-500" />,
                  title: "Build a Following",
                  description:
                    "Connect with patrons who appreciate faith-based art and build a dedicated following for your creative ministry.",
                  color: "from-amber-700/20 to-amber-800/20",
                },
                {
                  icon: <Award className="h-10 w-10 text-amber-500" />,
                  title: "Enter Contests",
                  description:
                    "Participate in platform-wide contests and challenges to gain exposure and win prizes for your artwork.",
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

        {/* More Benefits Section */}
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
                <span className="text-amber-500 font-medium">Advanced Features</span>
              </motion.div>

              <AnimatedText text="More Ways to Grow" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Expand your reach and impact with these powerful opportunities"
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
                  icon: <BookOpen className="h-12 w-12 text-amber-500" />,
                  title: "Create & Sell Courses",
                  description:
                    "Share your artistic knowledge by creating and selling courses to help others develop their skills. Available for Tier 2 members.",
                  features: [
                    "Create video tutorials and lessons",
                    "Set your own pricing structure",
                    "Engage with students directly",
                    "Build your reputation as an instructor",
                  ],
                  image: artistImages.gallery1,
                },
                {
                  icon: <Church className="h-12 w-12 text-amber-500" />,
                  title: "Become a Helper",
                  description:
                    "Offer your artistic services to churches and organizations for events, projects, and ministries as part of our Helper program.",
                  features: [
                    "Connect with churches needing artistic services",
                    "Participate in ministry projects",
                    "Receive compensation for your work",
                    "Expand your portfolio with meaningful projects",
                  ],
                  image: artistImages.gallery2,
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-[#171717] rounded-3xl overflow-hidden border border-[#333] hover:border-amber-500 transition-all duration-500 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={benefit.image || "/placeholder.svg"}
                      alt={benefit.title}
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
                        {benefit.icon}
                      </motion.div>

                      <h3 className="text-3xl font-bold text-white mb-2">{benefit.title}</h3>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">{benefit.description}</p>

                    <div className="space-y-3 mb-8">
                      {benefit.features.map((feature, i) => (
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
                <Brush className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Featured Work</span>
              </motion.div>

              <AnimatedText text="Inspiring Creations" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Explore a sample of the beautiful artwork from our community"
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

              <AnimatedText text="Artist Membership Tiers" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Choose the plan that fits your artistic journey"
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
                        "Basic artist profile",
                        "Upload up to 5 artworks",
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
                        "Sell up to 25 artworks",
                        "Participate in contests",
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
                        "Unlimited artwork uploads",
                        "Create & sell courses",
                        "Priority helper status",
                        "Featured artist opportunities",
                        "3x point earning rate",
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

              <AnimatedText text="Artist Testimonials" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Hear from artists who are thriving in our community"
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
                  name: "Sarah Johnson",
                  role: "Painter",
                  image: artistImages.testimonial1,
                  quote:
                    "Redeemed Creative Arts has been a blessing for my artistic ministry. I've connected with patrons who truly appreciate faith-inspired art and found opportunities I wouldn't have discovered elsewhere.",
                },
                {
                  name: "Michael Chen",
                  role: "Digital Artist",
                  image: artistImages.testimonial2,
                  quote:
                    "The platform has transformed how I share my faith through art. Not only have I sold more pieces, but I've also connected with churches that now commission regular work from me.",
                },
                {
                  name: "Rebecca Williams",
                  role: "Photographer",
                  image: artistImages.testimonial3,
                  quote:
                    "As a Christian photographer, I struggled to find the right audience. This community understands the heart behind my work and has helped me grow both spiritually and professionally.",
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
                <PenTool className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Common Questions</span>
              </motion.div>

              <AnimatedText text="Frequently Asked Questions" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Find answers to common questions about our artist platform"
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
                    text="Ready to Share Your Faith-Inspired Art?"
                    className="text-4xl md:text-5xl font-bold mb-6 text-white"
                  />

                  <AnimatedText
                    text="Join our community of Christian artists and start sharing your God-given talents with the world."
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
                            Join as an Artist
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
