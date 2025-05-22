"use client"
import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, Heart, Check, Feather, Award, MousePointer, Sparkles } from "lucide-react"

// Core values page background and image
const coreValuesImage = "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop"
const backgroundImage = "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop"

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

export default function CoreValuesPage() {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef)

  // Scroll-triggered animations
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.5, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

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

  const coreValues = [
    {
      title: "Faith-Driven Creativity",
      description:
        "We believe all creative gifts are given by God and should be used to honor Him and edify the body of Christ.",
      icon: <Star className="h-10 w-10 text-amber-500" />,
      color: "amber-500",
      gradient: "from-amber-500 to-amber-400",
    },
    {
      title: "Community & Collaboration",
      description:
        "We foster authentic connections between artists, patrons, and ministries, encouraging mutual support, mentorship, service and collective worship through art.",
      icon: <Users className="h-10 w-10 text-[#e76f51]" />,
      color: "[#e76f51]",
      gradient: "from-[#e76f51] to-[#e76f51]/80",
    },
    {
      title: "Integrity & Stewardship",
      description:
        "We uphold honesty, respect for intellectual property, and transparency in all interactions, ensuring that artists and contributors are supported with fairness and accountability.",
      icon: <Check className="h-10 w-10 text-amber-500" />,
      color: "amber-500",
      gradient: "from-amber-500 to-amber-400",
    },
    {
      title: "Celebration of Diversity",
      description:
        "We celebrate the diverse gifts and backgrounds of artists across all mediums, ages, and cultures, reflecting the beauty of God's creation.",
      icon: <Heart className="h-10 w-10 text-[#e76f51]" />,
      color: "[#e76f51]",
      gradient: "from-[#e76f51] to-[#e76f51]/80",
    },
    {
      title: "Empowerment & Encouragement",
      description:
        "We equip artists, supporters, and churches to grow in their calling by providing tools, recognition, and opportunities to impact communities through art and other talents.",
      icon: <Feather className="h-10 w-10 text-amber-500" />,
      color: "amber-500",
      gradient: "from-amber-500 to-amber-400",
    },
    {
      title: "Excellence & Innovation",
      description:
        "We encourage the pursuit of excellence in artistry, innovation in presentation, and creativity in outreach, all grounded in biblical principles.",
      icon: <Award className="h-10 w-10 text-[#e76f51]" />,
      color: "[#e76f51]",
      gradient: "from-[#e76f51] to-[#e76f51]/80",
    },
  ]

  return (
    <div className="relative overflow-hidden bg-[#0a0a0a]" ref={containerRef}>
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

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
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
                <Sparkles className="h-12 w-12 text-amber-500" />
              </div>
            </motion.div>

            <AnimatedText text="Our Core Values" className="text-6xl font-bold mb-6 text-white leading-tight" />

            <AnimatedText
              text="The Principles That Guide Our Community and Mission"
              className="text-xl text-gray-300 mb-10"
              delay={0.5}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-[#e76f51] hover:from-[#e76f51] hover:to-amber-500 text-white group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    About Us
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>

              <Link href="/mission">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500/10 group"
                >
                  <span className="flex items-center">
                    Our Mission
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
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

      {/* Core Values Section */}
      <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
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
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-amber-500 font-medium">What Guides Us</span>
            </motion.div>

            <AnimatedText text="The Values We Live By" className="text-4xl font-bold mb-6 text-white" />

            <AnimatedText
              text="These core principles shape everything we do at Redeemed Creative Arts"
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              delay={0.3}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                <div
                  className={`border border-${value.color} bg-[#171717] rounded-[40px] overflow-hidden h-full relative p-1 transform-gpu`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} border-2 border-${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
                  ></motion.div>

                  <div className="relative bg-[#171717] rounded-lg p-6 h-full z-10">
                    <div className="flex items-center justify-center">
                      <motion.div
                        className={`bg-${value.color}/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-300`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        {value.icon}
                      </motion.div>
                    </div>

                    <h3
                      className={`text-xl text-center font-bold mb-3 text-${value.color} group-hover:text-white transition-colors duration-300`}
                    >
                      {value.title}
                    </h3>

                    <motion.div
                      className={`h-0.5 w-12 bg-${value.color}/50 mx-auto mb-4`}
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    ></motion.div>

                    <p className="text-gray-300 text-center">{value.description}</p>

                    <motion.div
                      className={`absolute bottom-2 right-2 w-12 h-12 rounded-full bg-${value.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values in Action Section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          className="absolute -z-10 inset-0 opacity-10"
          style={{
            backgroundImage: `url(${coreValuesImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a] -z-10"></div>

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
              className="inline-flex items-center bg-[#e76f51]/10 px-4 py-2 rounded-full mb-6"
            >
              <Heart className="h-5 w-5 text-[#e76f51] mr-2" />
              <span className="text-[#e76f51] font-medium">Values in Action</span>
            </motion.div>

            <AnimatedText text="How We Live Our Values" className="text-4xl font-bold mb-6 text-white" />

            <AnimatedText
              text="Our values aren't just words—they're the foundation of everything we do"
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              delay={0.3}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Artist Support Programs",
                description:
                  "We provide mentorship, resources, and platforms for Christian artists to develop their skills and share their work with a wider audience.",
                icon: <Feather className="h-6 w-6 text-amber-500" />,
              },
              {
                title: "Community Events",
                description:
                  "We host regular gatherings, workshops, and exhibitions that bring together artists, patrons, and churches to build relationships and foster collaboration.",
                icon: <Users className="h-6 w-6 text-amber-500" />,
              },
              {
                title: "Church Partnerships",
                description:
                  "We work closely with churches to help them integrate visual arts into their ministry and connect with talented Christian artists.",
                icon: <Heart className="h-6 w-6 text-amber-500" />,
              },
              {
                title: "Ethical Marketplace",
                description:
                  "Our platform ensures fair compensation for artists while providing patrons with authentic, faith-inspired artwork that honors both creator and Creator.",
                icon: <Check className="h-6 w-6 text-amber-500" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="bg-[#171717] p-8 rounded-xl border border-[#333] hover:border-amber-500 transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="bg-amber-900/30 p-3 rounded-full mr-5 flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
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

              <div className="relative z-10">
                <AnimatedText text="Share Our Values" className="text-4xl md:text-5xl font-bold mb-6 text-white" />

                <AnimatedText
                  text="Join a community that celebrates creativity, upholds integrity, and fosters authentic connections through faith-inspired art."
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
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-[#e76f51] hover:from-[#e76f51] hover:to-amber-500 text-white group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        Join Our Community
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>

                  <Link href="/vision">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-amber-500 text-amber-500 hover:bg-amber-500/10 group"
                    >
                      <span className="flex items-center">
                        Explore Our Vision
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
