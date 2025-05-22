"use client"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, Compass, MousePointer, Lightbulb, Target, Map } from "lucide-react"

// Vision page background and image
const visionImage = "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop"
const backgroundImage = "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2000&auto=format&fit=crop"

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

export default function VisionPage() {
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
                <Eye className="h-12 w-12 text-amber-500" />
              </div>
            </motion.div>

            <AnimatedText text="Our Vision" className="text-6xl font-bold mb-6 text-white leading-tight" />

            <AnimatedText
              text="Building a Future Where Faith and Creativity Flourish Together"
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

      {/* Vision Statement Section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          className="absolute -z-10 inset-0 opacity-10"
          style={{
            backgroundImage: `url(${visionImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a] -z-10"></div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center bg-amber-500/10 px-4 py-2 rounded-full mb-6">
                <Eye className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-500 font-medium">Our Vision Statement</span>
              </div>

              <AnimatedText text="What We're Building" className="text-4xl font-bold mb-6 text-white" />

              <div className="bg-[#171717] p-8 rounded-xl border border-[#333] relative overflow-hidden">
                <motion.div
                  className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative">
                  <p className="text-2xl text-gray-300 leading-relaxed italic mb-6 relative">
                    <span className="text-4xl font-serif text-amber-500/40 absolute -top-4 -left-4">"</span>
                    To cultivate an active, Christ-centered creative community where artists, patrons, and ministries
                    unite to inspire, uplift, serve and glorify God through the power of visual arts and storytelling,
                    fostering engagement, support, and spiritual growth.
                    <span className="text-4xl font-serif text-amber-500/40 absolute -bottom-4 right-0">"</span>
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                    We support individuals and groups in their efforts to provide faith-based services to churches,
                    Christian events, and charitable organizations.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-amber-900/10">
                <Image
                  src={visionImage || "/placeholder.svg"}
                  alt="Our vision"
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
                    <h3 className="text-2xl font-bold text-white mb-2">A Vibrant Community</h3>
                    <p className="text-gray-300">United in faith and creativity</p>
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
          </div>
        </div>
      </section>

      {/* Vision Pillars Section */}
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
              <Compass className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-amber-500 font-medium">Vision Pillars</span>
            </motion.div>

            <AnimatedText text="Our Vision for the Future" className="text-4xl font-bold mb-6 text-white" />

            <AnimatedText
              text="Key areas where we're working to make our vision a reality"
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              delay={0.3}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Global Creative Network",
                description:
                  "Building a worldwide network of Christian artists, patrons, and churches that transcends geographical boundaries.",
                icon: <Map className="h-10 w-10 text-amber-500" />,
              },
              {
                title: "Faith-Inspired Innovation",
                description:
                  "Pioneering new ways to integrate faith and art through cutting-edge technology and creative approaches.",
                icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
              },
              {
                title: "Sustainable Creative Ministries",
                description:
                  "Developing models that allow artists to build sustainable ministries that serve the Church and broader community.",
                icon: <Target className="h-10 w-10 text-amber-500" />,
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

      {/* Future Goals Section */}
      <section className="py-24 relative overflow-hidden">
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
              <Target className="h-5 w-5 text-[#e76f51] mr-2" />
              <span className="text-[#e76f51] font-medium">Future Goals</span>
            </motion.div>

            <AnimatedText text="Where We're Heading" className="text-4xl font-bold mb-6 text-white" />

            <AnimatedText
              text="Strategic initiatives we're pursuing to fulfill our vision"
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              delay={0.3}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Educational Platform",
                description:
                  "Developing comprehensive educational resources to help artists grow in both technical skill and faith integration.",
                icon: <Lightbulb className="h-6 w-6 text-amber-500" />,
              },
              {
                title: "Church Resource Center",
                description:
                  "Creating a hub where churches can find resources, artists, and guidance for integrating visual arts into their ministry.",
                icon: <Map className="h-6 w-6 text-amber-500" />,
              },
              {
                title: "Global Art Exhibitions",
                description:
                  "Organizing international exhibitions that showcase faith-inspired art and connect artists with global audiences.",
                icon: <Eye className="h-6 w-6 text-amber-500" />,
              },
              {
                title: "Artist Residency Programs",
                description:
                  "Establishing residency programs that allow artists to develop their craft in supportive, faith-centered environments.",
                icon: <Compass className="h-6 w-6 text-amber-500" />,
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
                <AnimatedText
                  text="Help Us Realize Our Vision"
                  className="text-4xl md:text-5xl font-bold mb-6 text-white"
                />

                <AnimatedText
                  text="Join us in building a future where faith-inspired creativity flourishes and transforms communities around the world."
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

                  <Link href="/donate">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-amber-500 text-amber-500 hover:bg-amber-500/10 group"
                    >
                      <span className="flex items-center">
                        Support Our Vision
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
