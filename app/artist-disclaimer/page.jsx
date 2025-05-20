"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertTriangle,
  Check,
  Copyright,
  Shield,
  Ban,
  FileText,
  AlertCircle,
  Sparkles,
  Download,
  Printer,
  Share2,
} from "lucide-react"
import Link from "next/link"

export default function ArtistDisclaimerPage() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const containerRef = useRef(null)
  const sectionsRef = useRef([])

  // Parallax effect for background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Handle intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = document.querySelectorAll("[data-section]")
    sections.forEach((section) => {
      observer.observe(section)
      sectionsRef.current.push(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  // Confetti effect when agreement is checked
  useEffect(() => {
    if (disclaimerAccepted) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [disclaimerAccepted])

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

  const navItems = [
    { id: "ownership", label: "Ownership", icon: <Copyright className="h-4 w-4" /> },
    { id: "ai-prohibition", label: "AI Prohibition", icon: <Ban className="h-4 w-4" /> },
    { id: "indemnification", label: "Legal", icon: <Shield className="h-4 w-4" /> },
    { id: "artwork-use", label: "Usage", icon: <FileText className="h-4 w-4" /> },
    { id: "standards", label: "Standards", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "acknowledgment", label: "Agreement", icon: <AlertTriangle className="h-4 w-4" /> },
  ]

  // Confetti animation
  const renderConfetti = () => {
    return Array.from({ length: 50 }).map((_, index) => {
      const size = Math.random() * 10 + 5
      const colors = ["#FFD700", "#FF6347", "#4169E1", "#32CD32", "#FF69B4", "#9370DB"]
      const color = colors[Math.floor(Math.random() * colors.length)]
      const left = Math.random() * 100
      const animationDuration = Math.random() * 2 + 1
      const delay = Math.random() * 0.5

      return (
        <motion.div
          key={index}
          className="fixed z-50 rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            left: `${left}%`,
            top: "-20px",
          }}
          initial={{ y: -20, opacity: 1 }}
          animate={{
            y: window.innerHeight + 50,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: animationDuration,
            delay: delay,
            ease: "easeOut",
          }}
        />
      )
    })
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
        style={{ y: backgroundY1 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl"
        style={{ y: backgroundY2 }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      {/* Confetti effect */}
      <AnimatePresence>{showConfetti && renderConfetti()}</AnimatePresence>

      {/* Sticky navigation */}
      <div className="fixed top-32 left-4 z-30 hidden lg:block">
        <motion.div
          className="bg-card/80 backdrop-blur-lg p-4 rounded-xl border border-border shadow-lg"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-sm font-semibold mb-3 text-primary">Quick Navigation</h3>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <motion.li key={item.id} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={`#${item.id}`}
                  className={`flex items-center gap-2 text-xs py-2 px-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(item.id).scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {item.icon}
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="fixed top-32 right-4 z-30 hidden lg:block">
        <motion.div
          className="bg-card/80 backdrop-blur-lg p-4 rounded-xl border border-border shadow-lg flex flex-col gap-3"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            className="flex items-center gap-2 text-xs py-2 px-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </motion.button>
          <motion.button
            className="flex items-center gap-2 text-xs py-2 px-3 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Printer className="h-4 w-4" />
            Print
          </motion.button>
          <motion.button
            className="flex items-center gap-2 text-xs py-2 px-3 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="h-4 w-4" />
            Share
          </motion.button>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-32 max-w-4xl relative z-10">
        <motion.div
          className="text-center mb-16 relative"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
          >
            <div className="relative">
              <div className="bg-primary/20 p-5 rounded-full">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <motion.div
                className="absolute -inset-2 rounded-full bg-primary/10 z-[-1]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.2, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            variants={itemVariants}
          >
            Artist Disclaimer
          </motion.h1>

          <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto" variants={itemVariants}>
            Please review our terms carefully. This agreement outlines your rights and responsibilities as an artist on
            our platform.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-3 mt-8" variants={itemVariants}>
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-card rounded-full border border-border text-xs font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(item.id).scrollIntoView({ behavior: "smooth" })
                }}
              >
                {item.icon}
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Disclaimer Content */}
        <motion.section
          className="space-y-16 relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          {/* Ownership & Originality */}
          <motion.div
            id="ownership"
            data-section
            className="bg-card p-8 rounded-xl border border-border relative overflow-hidden"
            variants={fadeInUpVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10">
              <div className="flex items-start mb-6">
                <motion.div
                  className="bg-primary/20 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Copyright className="h-6 w-6 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-2">Ownership & Originality</h2>
                  <p className="text-muted-foreground text-sm">
                    Your creative work belongs to you. Here's what that means.
                  </p>
                </div>
              </div>

              <div className="text-muted-foreground space-y-4 pl-14">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  By uploading artwork, images, videos, or any creative content ("Artwork") to Redeemed Creative Arts
                  (the "Platform"), you (the "Artist") confirm that:
                </motion.p>

                <motion.ul
                  className="list-none space-y-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {[
                    "You are the sole creator and rightful owner of the Artwork submitted.",
                    "You affirm that you have not infringed upon the intellectual property rights, copyrights, trademarks, or other proprietary rights of any third party in the creation of your Artwork.",
                    "You understand and agree that it is solely your responsibility to ensure all submissions are your own original work.",
                    "The Platform reserves the right to review any submitted Artwork for appropriateness and compliance with community standards; however, the Platform is not responsible for verifying the originality or ownership of the Artwork.",
                    "In the event that any submitted Artwork is found to infringe upon the rights of any third party, or if a claim of infringement is made, the Artist agrees to indemnify, defend, and hold harmless the Platform and its affiliates, partners, directors, employees, and representatives from any legal liability, including but not limited to monetary penalties, legal fees, or claims resulting from such infringement.",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 pl-2"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                      }}
                    >
                      <motion.div
                        className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                        whileHover={{ scale: 1.2, backgroundColor: "rgba(var(--primary), 0.3)" }}
                      >
                        <Check className="h-3 w-3 text-primary" />
                      </motion.div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>

          {/* Strict Prohibition of AI-Generated Artwork */}
          <motion.div
            id="ai-prohibition"
            data-section
            className="bg-card p-8 rounded-xl border border-border relative overflow-hidden"
            variants={fadeInUpVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-destructive/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10">
              <div className="flex items-start mb-6">
                <motion.div
                  className="bg-destructive/20 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Ban className="h-6 w-6 text-destructive" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-semibold text-destructive mb-2">
                    Strict Prohibition of AI-Generated Artwork
                  </h2>
                  <p className="text-muted-foreground text-sm">We celebrate human creativity inspired by faith.</p>
                </div>
              </div>

              <div className="text-muted-foreground space-y-4 pl-14">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Redeemed Creative Arts is a platform dedicated to uplifting human creativity inspired by faith and
                  divine purpose. As such:
                </motion.p>

                <motion.div
                  className="relative p-6 bg-destructive/5 rounded-lg border border-destructive/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.ul
                    className="list-none space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.4,
                        },
                      },
                    }}
                  >
                    {[
                      "The use of Artificial Intelligence (AI), machine learning tools, or generative AI platforms (such as MidJourney, DALL·E, Stable Diffusion, or similar tools) to create, significantly alter, or enhance Artwork submitted to the Platform is strictly prohibited.",
                      "Any Artwork determined to be AI-generated, or heavily AI-manipulated, will be removed at the sole discretion of the Platform, and may result in account suspension, removal from community activities, forfeiture of points and rewards, and permanent banning.",
                      "Artists who violate this policy may also face legal action if submissions infringe upon third-party rights or if Artists receive rewards from this Platform under false pretenses.",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                        }}
                      >
                        <motion.div
                          className="h-5 w-5 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                          whileHover={{ scale: 1.2, backgroundColor: "rgba(var(--destructive), 0.3)" }}
                        >
                          <AlertTriangle className="h-3 w-3 text-destructive" />
                        </motion.div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Indemnification & Legal Responsibility */}
          <motion.div
            id="indemnification"
            data-section
            className="bg-card p-8 rounded-xl border border-border relative overflow-hidden"
            variants={fadeInUpVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="absolute -top-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10">
              <div className="flex items-start mb-6">
                <motion.div
                  className="bg-secondary/20 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Shield className="h-6 w-6 text-secondary" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-semibold text-secondary mb-2">Indemnification & Legal Responsibility</h2>
                  <p className="text-muted-foreground text-sm">Understanding your legal obligations.</p>
                </div>
              </div>

              <div className="text-muted-foreground space-y-4 pl-14">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                >
                  {[
                    {
                      title: "Legal Responsibility",
                      content:
                        "By submitting Artwork, the Artist agrees to assume all legal responsibility and liability for the submission, including any claims arising from the content, ownership, or originality of the Artwork.",
                    },
                    {
                      title: "Indemnification",
                      content:
                        "The Artist agrees to indemnify and hold harmless Redeemed Creative Arts, its affiliates, partners, and representatives from any claims, damages, costs, expenses (including attorney's fees), or liabilities arising from the Artist's submissions or actions on the Platform.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-secondary/5 p-5 rounded-lg border border-secondary/20"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                      }}
                      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(var(--secondary), 0.2)" }}
                    >
                      <h3 className="font-medium text-secondary mb-2">{item.title}</h3>
                      <p className="text-sm">{item.content}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Use of Artwork on the Platform */}
          <motion.div
            id="artwork-use"
            data-section
            className="bg-card p-8 rounded-xl border border-border relative overflow-hidden"
            variants={fadeInUpVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10">
              <div className="flex items-start mb-6">
                <motion.div
                  className="bg-accent/20 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FileText className="h-6 w-6 text-accent" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-semibold text-accent mb-2">Use of Artwork on the Platform</h2>
                  <p className="text-muted-foreground text-sm">How we showcase your creative work.</p>
                </div>
              </div>

              <div className="text-muted-foreground space-y-4 pl-14">
                <motion.div
                  className="relative p-6 bg-accent/5 rounded-lg border border-accent/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="font-medium text-accent mb-3">Platform License</h3>
                      <p className="text-sm">
                        By submitting Artwork to Redeemed Creative Arts, you grant the Platform a non-exclusive,
                        royalty-free, worldwide license to display, promote, share, and feature the Artwork within the
                        Platform, newsletters, social media, and other affiliated channels, always crediting you as the
                        Artist.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="font-medium text-accent mb-3">Ownership Retention</h3>
                      <p className="text-sm">
                        The Artist retains full ownership and copyright over their submitted Artwork. This agreement
                        does not transfer ownership rights to the Platform.
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-accent">
                        <Sparkles className="h-4 w-4" />
                        <span>Your creative work remains yours forever.</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Community Standards & Content Guidelines */}
          <motion.div
            id="standards"
            data-section
            className="bg-card p-8 rounded-xl border border-border relative overflow-hidden"
            variants={fadeInUpVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10">
              <div className="flex items-start mb-6">
                <motion.div
                  className="bg-primary/20 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <AlertCircle className="h-6 w-6 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-2">Community Standards & Content Guidelines</h2>
                  <p className="text-muted-foreground text-sm">Creating a positive, faith-centered community.</p>
                </div>
              </div>

              <div className="text-muted-foreground space-y-4 pl-14">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {[
                    {
                      title: "Faith-Centered",
                      content:
                        "All submitted Artwork must adhere to Redeemed Creative Arts' community standards, which require family-friendly, faith-centered, and respectful content.",
                    },
                    {
                      title: "Appropriate Content",
                      content:
                        "Artwork must not contain violent, obscene, hateful, discriminatory, or otherwise offensive material.",
                    },
                    {
                      title: "Platform Discretion",
                      content:
                        "The Platform reserves the right to remove, reject, or restrict any Artwork at its sole discretion if it is found to violate these standards.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-primary/5 p-5 rounded-lg border border-primary/20"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                      }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 30px -15px rgba(var(--primary), 0.2)",
                        backgroundColor: "rgba(var(--primary), 0.1)",
                      }}
                    >
                      <h3 className="font-medium text-primary mb-2">{item.title}</h3>
                      <p className="text-sm">{item.content}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Final Acknowledgment */}
          <motion.div
            id="acknowledgment"
            data-section
            className="bg-card p-8 rounded-xl border border-border relative overflow-hidden"
            variants={fadeInUpVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10">
              <div className="flex items-start mb-6">
                <motion.div
                  className="bg-accent/20 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <AlertTriangle className="h-6 w-6 text-accent" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-semibold text-accent mb-2">Final Acknowledgment</h2>
                  <p className="text-muted-foreground text-sm">Confirming your understanding and agreement.</p>
                </div>
              </div>

              <div className="text-muted-foreground space-y-4 pl-14">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-base font-medium"
                >
                  By uploading and submitting Artwork to Redeemed Creative Arts, you fully acknowledge and agree to the
                  terms of this Artist Disclaimer. Failure to comply with these terms may result in immediate removal of
                  your Artwork, account restrictions, legal action where actionable, and potential permanent termination
                  of your access to the Platform.
                </motion.p>

                {/* Digital Agreement */}
                <motion.div
                  className="mt-8 p-6 bg-background rounded-lg border border-border shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold mb-6 text-accent">Digital Agreement</h3>

                  <div className="flex items-center space-x-3 mb-8">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Checkbox
                        id="agreement"
                        checked={disclaimerAccepted}
                        onCheckedChange={setDisclaimerAccepted}
                        className="h-5 w-5 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                      />
                    </motion.div>
                    <label
                      htmlFor="agreement"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                    >
                      I have read and agree to the Artist Disclaimer
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className={`w-full ${
                          disclaimerAccepted
                            ? "bg-accent hover:bg-accent/90"
                            : "bg-muted hover:bg-muted/90 cursor-not-allowed"
                        } group relative overflow-hidden h-12`}
                        disabled={!disclaimerAccepted}
                      >
                        <span className="relative z-10 flex items-center text-base">
                          <Check className="mr-2 h-5 w-5" /> I AGREE TO THE TERMS
                        </span>
                        {disclaimerAccepted && (
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-accent/80 to-accent"
                            initial={{ x: "100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.4 }}
                          />
                        )}
                      </Button>
                    </motion.div>

                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link href="/artist-gallery">
                        <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 h-12">
                          <span className="flex items-center text-base">CONTINUE TO GALLERY</span>
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
