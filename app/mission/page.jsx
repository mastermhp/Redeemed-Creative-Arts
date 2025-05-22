"use client"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Goal, Heart, Lightbulb, MousePointer } from "lucide-react"

// Mission page background and image
const missionImage = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop"
const backgroundImage = "https://images.unsplash.com/photo-1579965342575-16428a7c8881?q=80&w=2000&auto=format&fit=crop"

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

// Parallax section component
const ParallaxSection = ({ children, baseVelocity = 100 }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, baseVelocity])

  return (
    <motion.div ref={containerRef} style={{ y }} className="relative">
      {children}
    </motion.div>
  )
}

export default function MissionPage() {
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
                <Goal className="h-12 w-12 text-amber-500" />
              </div>
            </motion.div>

            <AnimatedText text="Our Mission" className="text-6xl font-bold mb-6 text-white leading-tight" />

            <AnimatedText
              text="Connecting Artists, Patrons, and Churches in a Vibrant Creative Community"
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

              <Link href="/vision">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500/10 group"
                >
                  <span className="flex items-center">
                    Our Vision
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

      {/* Mission Statement Section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          className="absolute -z-10 inset-0 opacity-10"
          style={{
            backgroundImage: `url(${missionImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a] -z-10"></div>

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

                <AnimatedText text="Our Mission Statement" className="text-4xl font-bold mb-6 text-white" />

                <div className="space-y-6">
                  <motion.p
                    className="text-gray-300 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    At Redeemed Creative Arts, our mission is to uplift and empower Christian artists by fostering a
                    dynamic community where creativity, faith, and fellowship thrive together.
                  </motion.p>

                  <motion.p
                    className="text-gray-300 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    We connect visual artists, patrons, and churches to celebrate God-given talents, encourage
                    meaningful engagement, and build sustainable ministries that inspire, teach, and bless communities.
                  </motion.p>

                  <motion.p
                    className="text-gray-300 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    Through art, education, and collaboration, we aim to glorify Christ, enrich the church body, and
                    nurture the next generation of creators for His Kingdom.
                  </motion.p>
                </div>
              </motion.div>
            </ParallaxSection>

            <ParallaxSection baseVelocity={20}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-amber-900/10">
                  <Image
                    src={missionImage || "/placeholder.svg"}
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
                    </motion.div>
                  </div>
                </div>

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

      {/* Mission Pillars Section */}
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
              <Heart className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-amber-500 font-medium">Mission Pillars</span>
            </motion.div>

            <AnimatedText text="How We Fulfill Our Mission" className="text-4xl font-bold mb-6 text-white" />

            <AnimatedText
              text="Our mission is supported by these key pillars that guide our work"
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              delay={0.3}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Community Building",
                description:
                  "Creating spaces where artists, patrons, and churches can connect, collaborate, and grow together in faith and creativity.",
                icon: <Heart className="h-10 w-10 text-amber-500" />,
              },
              {
                title: "Artist Development",
                description:
                  "Providing resources, education, and opportunities for Christian artists to develop their skills and expand their reach.",
                icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
              },
              {
                title: "Ministry Support",
                description:
                  "Helping churches and ministries leverage visual arts to enhance worship, education, and outreach in their communities.",
                icon: <Goal className="h-10 w-10 text-amber-500" />,
              },
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="bg-[#171717] p-8 rounded-xl border border-[#333] hover:border-amber-500 transition-all duration-300"
              >
                <div className="bg-amber-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  {pillar.icon}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-amber-500 mb-4 text-center">{pillar.title}</h3>
                <p className="text-gray-300 text-center">{pillar.description}</p>
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
                <AnimatedText
                  text="Join Us in Our Mission"
                  className="text-4xl md:text-5xl font-bold mb-6 text-white"
                />

                <AnimatedText
                  text="Together, we can build a space where art becomes worship, engagement becomes ministry, and the global Church is enriched by the voices of artists of all ages."
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

                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-amber-500 text-amber-500 hover:bg-amber-500/10 group"
                    >
                      <span className="flex items-center">
                        Contact Us
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
