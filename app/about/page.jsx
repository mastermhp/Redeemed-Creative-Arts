"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Palette,
  Heart,
  Church,
  Users,
  MapPin,
  Star,
  Sparkles,
  Lightbulb,
  Brush,
  Feather,
  Award,
  Gift,
  MessageCircle,
  Calendar,
  Bookmark,
  Zap,
  ArrowUpRight,
  MousePointer,
  Coffee,
} from "lucide-react"

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

// Main component
export default function AboutPage() {
  const containerRef = useRef(null)
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")

  // New high-quality images
  const images = {
    hero: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop",
    mission: "https://images.unsplash.com/photo-1579965342575-16428a7c8881?q=80&w=2000&auto=format&fit=crop",
    artist1: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop",
    artist2: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop",
    patron: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop",
    church: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2000&auto=format&fit=crop",
    team1: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
    team2: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop",
    team3: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000&auto=format&fit=crop",
    gallery1: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop",
    gallery2: "https://images.unsplash.com/photo-1579965342575-16428a7c8881?q=80&w=2000&auto=format&fit=crop",
    gallery3: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop",
    gallery4: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop",
    gallery5: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2000&auto=format&fit=crop",
    gallery6: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop",
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

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
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
              backgroundImage: `url(${images.hero})`,
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
                text="About Redeemed Creative Arts"
                className="text-6xl font-bold mb-6 text-white leading-tight"
              />

              <AnimatedText
                text="Celebrating the Gifts of Christian Visual Artists, Supporters, and Faith-Based Communities"
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
                      Explore Our Mission
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
                      Join Our Community
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
                { count: 2000, label: "Patrons", icon: <Heart className="h-8 w-8 text-amber-500" /> },
                { count: 150, label: "Churches", icon: <Church className="h-8 w-8 text-amber-500" /> },
                { count: 5000, label: "Artworks", icon: <Feather className="h-8 w-8 text-amber-500" /> },
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

        {/* Mission Section with Parallax */}
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
                    <span className="text-amber-500 font-medium">Our Purpose</span>
                  </div>

                  <AnimatedText text="Our Mission & Vision" className="text-4xl font-bold mb-6 text-white" />

                  <div className="space-y-6">
                    <motion.p
                      className="text-gray-300 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      At Redeemed Creative Arts, we believe that art is a powerful ministry. For generations, visual
                      storytelling has been a voice for the Church, offering hope, truth, and creativity that uplifts
                      the body of Christ.
                    </motion.p>

                    <motion.p
                      className="text-gray-300 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      Our mission is to create an active and growing online community where visual artists, patrons, and
                      churches/Christian organizations connect, engage, serve and support one another on the journey of
                      faith and artistic ministry.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="flex flex-wrap gap-4 mt-8"
                    >
                      {["Community", "Faith", "Creativity", "Support"].map((tag, i) => (
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
                      src={images.mission || "/placeholder.svg"}
                      alt="Our mission"
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
                        <h3 className="text-2xl font-bold text-white mb-2">Faith Through Art</h3>
                        <p className="text-gray-300">Connecting creativity and ministry</p>

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

        {/* Who We Serve Section with 3D Cards */}
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
                <Users className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Our Community</span>
              </motion.div>

              <AnimatedText text="Who We Serve" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Connecting artists, patrons, and churches in a vibrant creative community"
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                delay={0.3}
              />
            </motion.div>

            {/* Artists Card */}
            <div className="space-y-24">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                className="relative"
              >
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 order-2 md:order-1">
                    <div className="bg-[#171717] p-8 md:p-12 rounded-3xl border border-[#333] relative overflow-hidden group hover:border-amber-500 transition-all duration-500">
                      <motion.div
                        className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          x: [0, 20, 0],
                          y: [0, -20, 0],
                        }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <motion.div
                            className="bg-amber-900/30 p-4 rounded-full mr-5 flex items-center justify-center relative"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Palette className="h-8 w-8 text-amber-500" />
                            <motion.div
                              className="absolute inset-0 rounded-full bg-amber-500/20"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            />
                          </motion.div>
                          <h3 className="text-3xl font-bold text-amber-500">Artists</h3>
                        </div>

                        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                          We welcome visual artists in all mediums—from painters and muralists to sculptors,
                          photographers, videographers, and digital creators.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          {[
                            {
                              icon: <Brush className="h-5 w-5 text-amber-500" />,
                              text: "Showcase work to a faith-based audience",
                            },
                            {
                              icon: <Award className="h-5 w-5 text-amber-500" />,
                              text: "Participate in events and win awards",
                            },
                            {
                              icon: <Gift className="h-5 w-5 text-amber-500" />,
                              text: "Sell artwork and offer courses",
                            },
                            {
                              icon: <Users className="h-5 w-5 text-amber-500" />,
                              text: "Connect with patrons and churches",
                            },
                          ].map((item, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start p-4 rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-colors duration-300"
                              whileHover={{ y: -5, x: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              <div className="bg-amber-900/20 p-2 rounded-full mr-3 flex-shrink-0">{item.icon}</div>
                              <p className="text-gray-300">{item.text}</p>
                            </motion.div>
                          ))}
                        </div>

                        <div className="bg-[#0f0f0f] p-5 rounded-xl border border-[#333] mt-6 group-hover:border-amber-500/50 transition-all duration-500">
                          <p className="text-sm text-gray-300">
                            <span className="font-semibold text-amber-500">Disclaimer:</span> By uploading artwork,
                            artists affirm they are the sole creators and rightful owners. AI art is NOT permitted.
                          </p>
                        </div>

                        <motion.div
                          className="mt-8"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <MagneticButton>
                            <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] hover:from-[#e76f51] hover:to-amber-500 text-white group">
                              <span className="flex items-center">
                                Join as an Artist
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </Button>
                          </MagneticButton>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 order-1 md:order-2">
                    <div className="relative">
                      <TiltCard className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl shadow-amber-900/10">
                        <Image
                          src={images.artist1 || "/placeholder.svg"}
                          alt="Artists"
                          fill
                          className="object-cover transition-all duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                        <motion.div
                          className="absolute inset-0 flex items-end p-8"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Creative Expression</h3>
                            <p className="text-gray-300">Sharing God's gifts through visual arts</p>
                          </div>
                        </motion.div>
                      </TiltCard>

                      <motion.div
                        className="absolute -top-6 -right-6 w-32 h-32 rounded-full z-[-1]"
                        style={{
                          background: "linear-gradient(45deg, rgba(245,158,11,0.2) 0%, rgba(231,111,81,0.2) 100%)",
                          filter: "blur(40px)",
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />

                      <motion.div
                        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full z-[-1]"
                        style={{
                          background: "linear-gradient(45deg, rgba(231,111,81,0.2) 0%, rgba(245,158,11,0.2) 100%)",
                          filter: "blur(40px)",
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: 0.5,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Patrons Card */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                className="relative"
              >
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5">
                    <div className="relative">
                      <TiltCard className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl shadow-amber-900/10">
                        <Image
                          src={images.patron || "/placeholder.svg"}
                          alt="Patrons"
                          fill
                          className="object-cover transition-all duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                        <motion.div
                          className="absolute inset-0 flex items-end p-8"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Heartfelt Support</h3>
                            <p className="text-gray-300">Empowering artists through patronage</p>
                          </div>
                        </motion.div>
                      </TiltCard>

                      <motion.div
                        className="absolute -top-6 -left-6 w-32 h-32 rounded-full z-[-1]"
                        style={{
                          background: "linear-gradient(45deg, rgba(245,158,11,0.2) 0%, rgba(231,111,81,0.2) 100%)",
                          filter: "blur(40px)",
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />

                      <motion.div
                        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full z-[-1]"
                        style={{
                          background: "linear-gradient(45deg, rgba(231,111,81,0.2) 0%, rgba(245,158,11,0.2) 100%)",
                          filter: "blur(40px)",
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: 0.5,
                        }}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <div className="bg-[#171717] p-8 md:p-12 rounded-3xl border border-[#333] relative overflow-hidden group hover:border-amber-500 transition-all duration-500">
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
                        <div className="flex items-center mb-6">
                          <motion.div
                            className="bg-amber-900/30 p-4 rounded-full mr-5 flex items-center justify-center relative"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Heart className="h-8 w-8 text-amber-500" />
                            <motion.div
                              className="absolute inset-0 rounded-full bg-amber-500/20"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                            />
                          </motion.div>
                          <h3 className="text-3xl font-bold text-amber-500">Patrons & Supporters</h3>
                        </div>

                        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                          Our patrons are the heartbeat of our community, providing essential support and encouragement
                          to Christian artists.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          {[
                            {
                              icon: <MessageCircle className="h-5 w-5 text-amber-500" />,
                              text: "Engage with artists and other supporters",
                            },
                            {
                              icon: <Star className="h-5 w-5 text-amber-500" />,
                              text: "Vote on submissions and make purchases",
                            },
                            {
                              icon: <Gift className="h-5 w-5 text-amber-500" />,
                              text: "Earn points and exclusive rewards",
                            },
                            {
                              icon: <Heart className="h-5 w-5 text-amber-500" />,
                              text: "Encourage artists with feedback and support",
                            },
                          ].map((item, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start p-4 rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-colors duration-300"
                              whileHover={{ y: -5, x: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              <div className="bg-amber-900/20 p-2 rounded-full mr-3 flex-shrink-0">{item.icon}</div>
                              <p className="text-gray-300">{item.text}</p>
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          className="mt-8"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <MagneticButton>
                            <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] hover:from-[#e76f51] hover:to-amber-500 text-white group">
                              <span className="flex items-center">
                                Become a Patron
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </Button>
                          </MagneticButton>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Churches Card */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                className="relative"
              >
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 order-2 md:order-1">
                    <div className="bg-[#171717] p-8 md:p-12 rounded-3xl border border-[#333] relative overflow-hidden group hover:border-amber-500 transition-all duration-500">
                      <motion.div
                        className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          x: [0, 20, 0],
                          y: [0, -20, 0],
                        }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <motion.div
                            className="bg-amber-900/30 p-4 rounded-full mr-5 flex items-center justify-center relative"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Church className="h-8 w-8 text-amber-500" />
                            <motion.div
                              className="absolute inset-0 rounded-full bg-amber-500/20"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                            />
                          </motion.div>
                          <h3 className="text-3xl font-bold text-amber-500">Churches & Organizations</h3>
                        </div>

                        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                          Redeemed Creative Arts is designed to be an extension of your church or ministry's outreach
                          and engagement.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          {[
                            {
                              icon: <Users className="h-5 w-5 text-amber-500" />,
                              text: "Use the platform for youth and community programs",
                            },
                            {
                              icon: <Feather className="h-5 w-5 text-amber-500" />,
                              text: "Encourage members to submit creative projects",
                            },
                            {
                              icon: <Award className="h-5 w-5 text-amber-500" />,
                              text: "Earn points toward rewards and packages",
                            },
                            {
                              icon: <Calendar className="h-5 w-5 text-amber-500" />,
                              text: "Invite communities to events and connect with talent",
                            },
                          ].map((item, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start p-4 rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-colors duration-300"
                              whileHover={{ y: -5, x: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              <div className="bg-amber-900/20 p-2 rounded-full mr-3 flex-shrink-0">{item.icon}</div>
                              <p className="text-gray-300">{item.text}</p>
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          className="mt-8"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <MagneticButton>
                            <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] hover:from-[#e76f51] hover:to-amber-500 text-white group">
                              <span className="flex items-center">
                                Register Your Church
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </Button>
                          </MagneticButton>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 order-1 md:order-2">
                    <div className="relative">
                      <TiltCard className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl shadow-amber-900/10">
                        <Image
                          src={images.church || "/placeholder.svg"}
                          alt="Churches"
                          fill
                          className="object-cover transition-all duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                        <motion.div
                          className="absolute inset-0 flex items-end p-8"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Faith Communities</h3>
                            <p className="text-gray-300">Extending ministry through creative expression</p>
                          </div>
                        </motion.div>
                      </TiltCard>

                      <motion.div
                        className="absolute -top-6 -right-6 w-32 h-32 rounded-full z-[-1]"
                        style={{
                          background: "linear-gradient(45deg, rgba(245,158,11,0.2) 0%, rgba(231,111,81,0.2) 100%)",
                          filter: "blur(40px)",
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />

                      <motion.div
                        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full z-[-1]"
                        style={{
                          background: "linear-gradient(45deg, rgba(231,111,81,0.2) 0%, rgba(245,158,11,0.2) 100%)",
                          filter: "blur(40px)",
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: 0.5,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
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
                <Palette className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Featured Work</span>
              </motion.div>

              <AnimatedText text="Inspiring Creations" className="text-4xl font-bold mb-6 text-white" />

              <AnimatedText
                text="Explore a sample of the beautiful artwork from our community"
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                delay={0.3}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { img: images.gallery1, title: "Divine Light", artist: "Sarah Johnson" },
                { img: images.gallery2, title: "Heavenly Creation", artist: "Michael Chen" },
                { img: images.gallery3, title: "Faith Journey", artist: "Rebecca Williams" },
                { img: images.gallery4, title: "Eternal Hope", artist: "David Miller" },
                { img: images.gallery5, title: "Sacred Moments", artist: "Emily Taylor" },
                { img: images.gallery6, title: "Spiritual Awakening", artist: "James Wilson" },
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="group">
                  <TiltCard className="rounded-xl overflow-hidden aspect-square shadow-lg relative">
                    <Image
                      src={item.img || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <motion.div
                      className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 0 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm">by {item.artist}</p>

                      <motion.div
                        className="mt-4 flex items-center text-amber-500"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="mr-2 font-medium text-sm">View artwork</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="absolute top-4 right-4 bg-black/30 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Bookmark className="h-4 w-4 text-amber-500" />
                    </motion.div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>

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

        {/* Location & Shipping Section */}
        <section className="py-16 bg-[#0f0f0f] relative overflow-hidden">
          <AnimatedGradient className="opacity-30" />

          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-[#171717] p-8 md:p-12 rounded-3xl border border-[#333] relative overflow-hidden group hover:border-amber-500 transition-all duration-500">
                <motion.div
                  className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="bg-amber-900/30 p-4 rounded-full mr-5 flex items-center justify-center relative"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <MapPin className="h-8 w-8 text-amber-500" />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-amber-500/20"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-amber-500">Location & Shipping Policy</h3>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Our online store currently serves U.S. customers only. Artists who wish to sell internationally are
                    responsible for setting their own pricing and shipping policies.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="flex items-start p-4 rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-colors duration-300"
                      whileHover={{ y: -5, x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <div className="bg-amber-900/20 p-2 rounded-full mr-3 flex-shrink-0">
                        <Zap className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Fast Domestic Shipping</h4>
                        <p className="text-gray-300 text-sm">Quick delivery throughout the United States</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start p-4 rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-colors duration-300"
                      whileHover={{ y: -5, x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <div className="bg-amber-900/20 p-2 rounded-full mr-3 flex-shrink-0">
                        <Coffee className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Artist Support</h4>
                        <p className="text-gray-300 text-sm">Direct assistance for international shipping needs</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 relative overflow-hidden">
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
                    text="Join Our Creative Community"
                    className="text-4xl md:text-5xl font-bold mb-6 text-white"
                  />

                  <AnimatedText
                    text="At Redeemed Creative Arts, we celebrate the creativity God has placed in His people. Together, we can build a space where art becomes worship, engagement becomes ministry, and the global Church is enriched by the voices of artists of all ages."
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
                      >
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
                      </Button>
                    </MagneticButton>

                    <MagneticButton>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-amber-500 text-amber-500 hover:bg-amber-500/10 group"
                      >
                        <span className="flex items-center">
                          Become a Patron
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </MagneticButton>

                    <MagneticButton>
                      <Button size="lg" variant="ghost" className="text-white hover:bg-white/5 group">
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
