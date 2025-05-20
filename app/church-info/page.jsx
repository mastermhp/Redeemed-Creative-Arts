"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Check,
  Users,
  Calendar,
  ChevronDown,
  Church,
  Heart,
  Sparkles,
  Globe,
  Star,
  MessageCircle,
  Palette,
  Bookmark,
  Clock,
  Award,
  Zap,
} from "lucide-react"

// Custom cursor component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if cursor is over a clickable element
      const target = e.target
      const isClickable =
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsPointer(isClickable)
      setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (typeof window === "undefined") return null

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: none;
        }
      `}</style>
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
              animate={{
                x: position.x - 16,
                y: position.y - 16,
                scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
              style={{
                backgroundColor: isPointer ? "rgba(245, 158, 11, 0.5)" : "rgba(255, 255, 255, 0.5)",
              }}
            />
            <motion.div
              className="fixed top-0 left-0 w-2 h-2 rounded-full bg-amber-500 pointer-events-none z-50"
              animate={{
                x: position.x - 1,
                y: position.y - 1,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 50, stiffness: 500 }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// 3D Tilt Card Component
const TiltCard = ({ children, className, scale = 1.05, rotationIntensity = 10 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Calculate rotation (inverted for natural feel)
    const rotateY = (x / (rect.width / 2)) * rotationIntensity
    const rotateX = -(y / (rect.height / 2)) * rotationIntensity

    setRotation({ x: rotateX, y: rotateY })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotation({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? scale : 1,
        z: isHovered ? 50 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        mass: 0.5,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  )
}

// Magnetic Button Component
const MagneticButton = ({ children, className, strength = 20 }) => {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!buttonRef.current || !isHovered) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()

    // Calculate mouse position relative to button center
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Calculate movement (stronger when closer to center)
    const moveX = (x / rect.width) * strength
    const moveY = (y / rect.height) * strength

    setPosition({ x: moveX, y: moveY })
  }

  return (
    <motion.div
      ref={buttonRef}
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setPosition({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {children}
    </motion.div>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2, className }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: countRef,
    offset: ["start 80%", "end 20%"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      if (progress > 0) {
        const timer = setTimeout(() => {
          setCount(value)
        }, 300)
        return () => clearTimeout(timer)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, value])

  return (
    <motion.span
      ref={countRef}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {count}
      </motion.span>
    </motion.span>
  )
}

// Animated Text Component
const AnimatedText = ({ text, className, once = true, delay = 0 }) => {
  const words = text.split(" ")

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                damping: 12,
              },
            },
            hidden: {
              opacity: 0,
              y: 20,
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Accordion Component
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
          className="bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#333333] hover:border-amber-600 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <button
            className="flex justify-between items-center w-full p-6 text-left"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-xl font-semibold text-amber-500">{item.question}</h3>
            <motion.div animate={{ rotate: activeIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-5 w-5 text-amber-500" />
            </motion.div>
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
                <div className="p-6 pt-0 text-gray-300">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

// Church images from various sources
const churchImages = {
  hero: "https://images.unsplash.com/photo-1601065200897-e2f6b6e1ad4a?q=80&w=1000&auto=format&fit=crop",
  stainedGlass: "https://images.unsplash.com/photo-1508949398691-d2f8c4c1b14f?q=80&w=1000&auto=format&fit=crop",
  worship: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop",
  community: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop",
  art: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop",
  event: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
  testimonial1: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop",
  testimonial2: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?q=80&w=1000&auto=format&fit=crop",
  testimonial3: "https://images.unsplash.com/photo-1541802645635-11f2286a7482?q=80&w=1000&auto=format&fit=crop",
  gallery1: "https://images.unsplash.com/photo-1530856021941-02c71be5926f?q=80&w=1000&auto=format&fit=crop",
  gallery2: "https://images.unsplash.com/photo-1529154691717-3306083d869e?q=80&w=1000&auto=format&fit=crop",
  gallery3: "https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=1000&auto=format&fit=crop",
  gallery4: "https://images.unsplash.com/photo-1529154166925-574a0236a4f4?q=80&w=1000&auto=format&fit=crop",
  gallery5: "https://images.unsplash.com/photo-1529154136899-4efcf8173be9?q=80&w=1000&auto=format&fit=crop",
  gallery6: "https://images.unsplash.com/photo-1529154291061-638d3809cd59?q=80&w=1000&auto=format&fit=crop",
}

export default function ChurchInfoPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const [activeTab, setActiveTab] = useState(0)

  // Parallax effect for background elements
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const bgY3 = useTransform(scrollYProgress, [0, 1], [0, -300])

  // Stats for counter section
  const stats = [
    { value: 250, label: "Churches", icon: Church },
    { value: 1500, label: "Artists", icon: Palette },
    { value: 350, label: "Events", icon: Calendar },
    { value: 5000, label: "Artworks", icon: Heart },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "How does the Helper booking process work?",
      answer:
        "Our streamlined process makes it easy to find and book creative talent. Browse our directory of Helpers, filter by skills and location, and send booking requests through the platform. Once a Helper accepts, you can communicate directly to finalize details. After the event, you can leave reviews to help the community.",
    },
    {
      question: "Can we create fundraising campaigns?",
      answer:
        "Yes, Tier 2 members can create donation campaigns and challenges to support ministry initiatives. You can set goals, track progress, and engage the community in supporting your cause through art-based fundraising. Our platform provides tools to showcase your campaign and reach potential donors.",
    },
    {
      question: "How do we promote our events on the platform?",
      answer:
        "You can create and promote events through your organization dashboard. Events will be visible to the community, and Tier 2 members receive priority placement in event listings and promotional opportunities. We also offer featured event spots and social media promotion for special events.",
    },
    {
      question: "Are there resources for integrating art into worship?",
      answer:
        "Yes, we provide resources, guides, and case studies on how to effectively integrate visual arts into worship environments, community outreach, and spiritual formation. These resources include video tutorials, downloadable guides, and consultation services with experienced ministry leaders.",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      name: "Grace Community Church",
      role: "Medium-sized congregation",
      image: churchImages.testimonial1,
      quote:
        "Redeemed Creative Arts transformed our worship space with beautiful artwork that reflects our values. The artists we connected with understood our vision and brought it to life in ways we couldn't have imagined.",
    },
    {
      name: "Hillside Fellowship",
      role: "Multi-campus church",
      image: churchImages.testimonial2,
      quote:
        "Finding creative talent for our special events used to be challenging. Now we can easily connect with Christian artists who share our faith and vision. It's been a game-changer for our ministry.",
    },
    {
      name: "New Life Ministries",
      role: "Urban outreach organization",
      image: churchImages.testimonial3,
      quote:
        "The platform has helped us engage our community through art-based outreach programs. We've seen incredible response as people connect with faith through visual creativity.",
    },
  ]

  // Gallery images
  const galleryImages = [
    { src: churchImages.gallery1, alt: "Church artwork installation" },
    { src: churchImages.gallery2, alt: "Worship environment design" },
    { src: churchImages.gallery3, alt: "Community art event" },
    { src: churchImages.gallery4, alt: "Children's ministry artwork" },
    { src: churchImages.gallery5, alt: "Seasonal church decoration" },
    { src: churchImages.gallery6, alt: "Outreach art program" },
  ]

  // Tabs for the "Ways to Engage" section
  const engagementTabs = [
    {
      title: "Worship Environments",
      icon: Church,
      content:
        "Transform your worship spaces with meaningful artwork that enhances the spiritual experience. From sanctuary installations to seasonal decorations, find artists who can create visual elements that support your message and mission.",
      image: churchImages.worship,
    },
    {
      title: "Community Outreach",
      icon: Users,
      content:
        "Use art as a bridge to connect with your community. Host art-based outreach events, create public installations, and engage people through visual storytelling that communicates faith in accessible ways.",
      image: churchImages.community,
    },
    {
      title: "Special Events",
      icon: Calendar,
      content:
        "Enhance your special events with custom artwork, live art demonstrations, and interactive installations. From conferences to holiday celebrations, find creative talent that will make your events memorable.",
      image: churchImages.event,
    },
  ]

  return (
    <div className="relative overflow-hidden bg-[#080808]" ref={containerRef}>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px]"
          style={{ y: bgY1 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]"
          style={{ y: bgY2 }}
        />
        <motion.div
          className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]"
          style={{ y: bgY3 }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background video/image with parallax */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10" />
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "easeOut" }}
          >
            <Image
              src={churchImages.stainedGlass || "/placeholder.svg"}
              alt="Stained glass window"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-4 relative z-10 mt-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <Church className="h-16 w-16 text-amber-500 mx-auto" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-500/20"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>

            <motion.h1
              className="text-6xl font-bold mb-6 text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block">Inspire Your Ministry</span>
              <span className="block text-amber-500">Through Sacred Art</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Connect with Christian artists, transform your spaces, and engage your community through faith-inspired
              visual creativity.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <MagneticButton>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
                  <span className="relative z-10">Join as an Organization</span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
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
                  className="border-white/20 hover:bg-white/10 text-white group relative overflow-hidden"
                >
                  <span className="relative z-10">Explore Artists</span>
                  <motion.span
                    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <ChevronDown className="h-8 w-8 text-white/70" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
              hidden: {},
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 50 },
                }}
                transition={{ duration: 0.8 }}
              >
                <TiltCard className="bg-[#111111]/80 backdrop-blur-lg p-6 rounded-xl border border-white/10 h-full">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative mb-4">
                      <stat.icon className="h-10 w-10 text-amber-500" />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-amber-500/20"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">
                      <AnimatedCounter value={stat.value} className="text-4xl font-bold text-white" />
                      <span className="text-amber-500">+</span>
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="bg-amber-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto relative">
                <Sparkles className="h-8 w-8 text-amber-500" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-500/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4 text-white">
              <AnimatedText text="Enhance Your Ministry Through Art" className="text-4xl font-bold" />
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <AnimatedText
                text="Discover how faith-inspired visual arts can transform your spaces, engage your community, and deepen spiritual experiences."
                className="text-xl text-gray-300"
                delay={0.3}
              />
            </p>
          </motion.div>

          {/* Two-column section */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-white">
                <span className="text-amber-500">Connect</span> with Creative Talent
              </h3>
              <p className="text-gray-300 mb-6">
                Redeemed Creative Arts connects churches and faith-based organizations with talented Christian visual
                artists who can help bring your vision to life.
              </p>
              <p className="text-gray-300 mb-8">
                Whether you're looking for artwork for your facilities, creative talent for events, or ways to engage
                your congregation through visual arts, our platform provides the connections and resources you need.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Find artists who share your faith and values",
                  "Commission custom artwork for your spaces",
                  "Book creative talent for events and programs",
                  "Access resources for integrating art into ministry",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-amber-900/30 p-1 rounded-full mr-3 mt-1">
                      <Check className="h-4 w-4 text-amber-500" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>

              <MagneticButton>
                <Button className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
                  <span className="relative z-10">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <TiltCard className="rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)] border border-amber-900/30">
                <div className="relative h-[500px] overflow-hidden">
                  <Image
                    src={churchImages.art || "/placeholder.svg"}
                    alt="Church artwork"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h4 className="text-2xl font-bold text-white mb-2">Transform Your Spaces</h4>
                    <p className="text-gray-300">
                      Beautiful artwork that reflects your faith and enhances worship experiences
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* Ways to Engage Section with Tabs */}
          <motion.div
            className="mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-block mb-4"
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="bg-amber-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto relative">
                  <Globe className="h-8 w-8 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 text-white">
                <AnimatedText text="Ways to Engage Your Community" className="text-4xl font-bold" />
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                <AnimatedText
                  text="Discover creative approaches to engage your congregation and community through visual arts."
                  className="text-xl text-gray-300"
                  delay={0.3}
                />
              </p>
            </div>

            {/* Tabs navigation */}
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <div className="flex space-x-2 p-1 bg-[#111111]/80 backdrop-blur-lg rounded-full border border-white/10">
                {engagementTabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-full flex items-center transition-all duration-300 ${
                      activeTab === index
                        ? "bg-amber-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    <span>{tab.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="bg-[#111111]/80 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-amber-500 mb-4">{engagementTabs[activeTab].title}</h3>
                    <p className="text-gray-300 mb-6">{engagementTabs[activeTab].content}</p>
                    <MagneticButton>
                      <Button className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden w-fit">
                        <span className="relative z-10">Explore Ideas</span>
                        <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </MagneticButton>
                  </div>
                  <div className="relative h-[400px] md:h-auto">
                    <Image
                      src={engagementTabs[activeTab].image || "/placeholder.svg"}
                      alt={engagementTabs[activeTab].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent md:bg-gradient-to-l" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Helper Program Section */}
          <motion.div
            className="mb-32 bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            />

            <div className="p-12 relative z-10">
              <div className="text-center mb-12">
                <motion.div
                  className="inline-block mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="bg-amber-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto relative">
                    <Heart className="h-8 w-8 text-amber-500" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-amber-500/20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                </motion.div>
                <h2 className="text-4xl font-bold mb-4 text-white">
                  <AnimatedText text="The Helper Program" className="text-4xl font-bold" />
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  <AnimatedText
                    text="Connect with Christian artists who have volunteered to offer their creative talents to churches and ministries."
                    className="text-xl text-gray-300"
                    delay={0.3}
                  />
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-6 text-amber-500">Connect with Creative Talent</h3>
                  <p className="text-gray-300 mb-6">
                    The Helper program connects your organization with Christian artists who have opted to offer their
                    creative services for events, projects, and ministries.
                  </p>
                  <p className="text-gray-300 mb-6">
                    Browse our directory of Helpers, filter by skill set and location, and book the perfect creative
                    talent for your needs. Helpers can be paid or volunteer, depending on your arrangement.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: Palette, text: "Find artists for worship environments" },
                      { icon: Calendar, text: "Book talent for special events" },
                      { icon: Users, text: "Engage artists for community outreach" },
                      { icon: Star, text: "Rate and review your experience" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="bg-amber-900/30 p-1.5 rounded-full mr-3 mt-0.5">
                          <item.icon className="h-4 w-4 text-amber-500" />
                        </div>
                        <span className="text-gray-300 text-sm">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <MagneticButton>
                    <Button className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
                      <span className="relative z-10">Find Helpers</span>
                      <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </MagneticButton>
                </div>

                <div className="order-1 md:order-2">
                  <TiltCard className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)] border border-amber-900/30">
                    <div className="relative h-[400px] overflow-hidden">
                      <Image
                        src={churchImages.community || "/placeholder.svg"}
                        alt="Helper program"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h4 className="text-2xl font-bold text-white mb-2">Creative Collaboration</h4>
                        <p className="text-gray-300">Artists serving ministry through their God-given talents</p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gallery Section */}
          <motion.div
            className="mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-block mb-4"
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="bg-amber-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto relative">
                  <Palette className="h-8 w-8 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 text-white">
                <AnimatedText text="Inspiring Church Art Projects" className="text-4xl font-bold" />
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                <AnimatedText
                  text="Browse examples of how churches have integrated visual arts into their ministries."
                  className="text-xl text-gray-300"
                  delay={0.3}
                />
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TiltCard
                    className="rounded-xl overflow-hidden h-[250px] md:h-[300px]"
                    scale={1.03}
                    rotationIntensity={5}
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-lg font-bold text-white">{image.alt}</h4>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <MagneticButton>
                <Button
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 text-white group relative overflow-hidden"
                >
                  <span className="relative z-10">View More Projects</span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <motion.span
                    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Membership Tiers */}
          <motion.div
            className="mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-block mb-4"
                initial={{ scale: 0, rotate: 90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="bg-amber-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto relative">
                  <Award className="h-8 w-8 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 text-white">
                <AnimatedText text="Organization Membership Options" className="text-4xl font-bold" />
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                <AnimatedText
                  text="Choose the membership tier that best fits your organization's needs and goals."
                  className="text-xl text-gray-300"
                  delay={0.3}
                />
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Free Tier */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <TiltCard className="h-full">
                  <div className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] rounded-2xl p-8 shadow-lg border border-white/10 h-full flex flex-col">
                    <div className="mb-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
                        <div className="text-4xl font-bold text-white mb-2">
                          $0
                          <span className="text-sm font-normal text-gray-400">/month</span>
                        </div>
                        <div className="text-gray-400 mb-6">For small organizations</div>
                      </div>

                      <motion.div
                        className="h-1 w-full bg-gradient-to-r from-gray-500 to-gray-700 rounded-full mb-6"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>

                    <div className="space-y-4 mb-8 flex-grow">
                      {[
                        "Basic organization profile",
                        "Browse artist directory",
                        "Participate in community",
                        "Basic point earning",
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="bg-gray-800 p-1 rounded-full mr-3 mt-0.5">
                            <Check className="h-4 w-4 text-gray-400" />
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <MagneticButton className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-white/20 hover:bg-white/10 text-white group relative overflow-hidden"
                      >
                        <span className="relative z-10">Get Started</span>
                        <motion.span
                          className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </MagneticButton>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Tier 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:-mt-4 md:mb-4"
              >
                <TiltCard className="h-full" scale={1.07}>
                  <div className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] rounded-2xl p-8 shadow-[0_0_30px_rgba(245,158,11,0.2)] border-2 border-amber-600 h-full flex flex-col relative">
                    <div className="absolute top-0 right-0 bg-amber-600 text-black px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute inset-0 bg-amber-500 rounded-bl-lg rounded-tr-lg z-[-1]"
                      />
                      <span className="relative z-10">Popular</span>
                    </div>

                    <div className="mb-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2 text-white">Tier 1</h3>
                        <div className="text-4xl font-bold text-white mb-2">
                          $9.99
                          <span className="text-sm font-normal text-gray-400">/month</span>
                        </div>
                        <div className="text-gray-400 mb-6">For growing ministries</div>
                      </div>

                      <motion.div
                        className="h-1 w-full bg-gradient-to-r from-amber-500 to-amber-700 rounded-full mb-6"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      />
                    </div>

                    <div className="space-y-4 mb-8 flex-grow">
                      {[
                        "Everything in Free",
                        "Enhanced profile visibility",
                        "Book up to 5 helpers monthly",
                        "Create basic events",
                        "2x point earning rate",
                        "Priority support",
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="bg-amber-900/30 p-1 rounded-full mr-3 mt-0.5">
                            <Check className="h-4 w-4 text-amber-500" />
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <MagneticButton className="w-full">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
                        <span className="relative z-10">Upgrade Now</span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </MagneticButton>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Tier 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <TiltCard className="h-full">
                  <div className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] rounded-2xl p-8 shadow-lg border border-white/10 h-full flex flex-col">
                    <div className="mb-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2 text-white">Tier 2</h3>
                        <div className="text-4xl font-bold text-white mb-2">
                          $19.99
                          <span className="text-sm font-normal text-gray-400">/month</span>
                        </div>
                        <div className="text-gray-400 mb-6">For established organizations</div>
                      </div>

                      <motion.div
                        className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-900 rounded-full mb-6"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </div>

                    <div className="space-y-4 mb-8 flex-grow">
                      {[
                        "Everything in Tier 1",
                        "Unlimited helper bookings",
                        "Create donation campaigns",
                        "Featured organization status",
                        "3x point earning rate",
                        "Priority event promotion",
                        "Dedicated account manager",
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="bg-amber-900/30 p-1 rounded-full mr-3 mt-0.5">
                            <Check className="h-4 w-4 text-amber-500" />
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <MagneticButton className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-amber-700/50 hover:bg-amber-900/20 text-white group relative overflow-hidden"
                      >
                        <span className="relative z-10">Upgrade Now</span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-amber-800/30 opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </MagneticButton>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            className="mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-block mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="bg-amber-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto relative">
                  <MessageCircle className="h-8 w-8 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 text-white">
                <AnimatedText text="What Churches Are Saying" className="text-4xl font-bold" />
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                <AnimatedText
                  text="Hear from organizations that have transformed their ministries through faith-inspired art."
                  className="text-xl text-gray-300"
                  delay={0.3}
                />
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <TiltCard className="h-full">
                    <div className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] rounded-2xl p-8 shadow-lg border border-white/10 h-full">
                      <div className="flex items-center mb-6">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-amber-600">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{testimonial.name}</h3>
                          <p className="text-sm text-amber-500">{testimonial.role}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.667 13.333H5.33366C5.33366 8 9.33366 5.333 13.3337 5.333L12.0003 8C10.667 9.333 10.667 11.333 10.667 13.333ZM21.3337 13.333H16.0003C16.0003 8 20.0003 5.333 24.0003 5.333L22.667 8C21.3337 9.333 21.3337 11.333 21.3337 13.333Z"
                            fill="rgba(245,158,11,0.5)"
                          />
                        </svg>
                      </div>

                      <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>

                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-amber-500" />
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-block mb-4"
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="bg-amber-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto relative">
                  <Bookmark className="h-8 w-8 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 text-white">
                <AnimatedText text="Frequently Asked Questions" className="text-4xl font-bold" />
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                <AnimatedText
                  text="Find answers to common questions about our platform and services."
                  className="text-xl text-gray-300"
                  delay={0.3}
                />
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative z-10 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />

        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl p-12 border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10 text-center">
              <motion.div
                className="inline-block mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="bg-amber-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto relative">
                  <Zap className="h-8 w-8 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </motion.div>

              <h2 className="text-4xl font-bold mb-4 text-white">
                <AnimatedText text="Ready to Transform Your Ministry?" className="text-4xl font-bold" />
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                <AnimatedText
                  text="Join our community of churches and faith-based organizations to connect with Christian artists and enhance your ministry through visual creativity."
                  className="text-xl text-gray-300"
                  delay={0.3}
                />
              </p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <MagneticButton>
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
                    <span className="relative z-10">Join as an Organization</span>
                    <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
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
                    className="border-white/20 hover:bg-white/10 text-white group relative overflow-hidden"
                  >
                    <span className="relative z-10">Schedule a Demo</span>
                    <motion.span
                      className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </MagneticButton>
              </motion.div>

              <motion.div
                className="mt-8 text-gray-400 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Clock className="h-4 w-4" />
                <span>Get started in less than 5 minutes</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
