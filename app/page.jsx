"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules"
import { ArrowRight, Heart, Church, Palette, Star } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"

// Real images from Unsplash
const heroImage = "https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?q=80&w=2070&auto=format&fit=crop"
const artworkImages = [
  "https://images.unsplash.com/photo-1544413164-5f1b361f5b69?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579541591970-e5795a602732?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482245294234-b3f2f8d5f1a4?q=80&w=2030&auto=format&fit=crop",
]

export default function Home() {
  const containerRef = useRef(null)

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
    <div className="flex flex-col">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage || "/placeholder.svg"}
            alt="Christian artwork background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171717]/90 to-[#0a0a0a]/90 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" initial="hidden" animate="visible" variants={staggerContainerVariants}>
              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100" variants={itemVariants}>
                Where Faith Meets{" "}
                <span className="text-amber-500 relative inline-block">
                  Creativity
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                  ></motion.span>
                </span>
              </motion.h1>
              <motion.p className="text-lg md:text-xl text-gray-300" variants={itemVariants}>
                Connecting Christian visual artists, patrons, and churches in a supportive community that celebrates
                faith-inspired creativity.
              </motion.p>
              <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
                <Link
                  href="/artist-info"
                  className="inline-flex items-center px-6 py-3 rounded-md bg-amber-600 hover:bg-amber-700 text-black font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transform hover:-translate-y-1"
                >
                  Join as Artist <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/patron-info"
                  className="inline-flex items-center px-6 py-3 rounded-md border border-amber-600 text-amber-500 hover:bg-amber-900/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Support Artists <Heart className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-transparent z-10 rounded-xl"></div>
              <Image
                src={heroImage || "/placeholder.svg"}
                alt="Christian artwork showcase"
                fill
                className="object-cover"
                priority
                quality={90}
              />
              <motion.div
                className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg z-20"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="text-white text-sm">Inspiring faith through art</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-10 right-1/4 w-20 h-20 rounded-full bg-amber-500/10 backdrop-blur-md z-0"
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-10 left-1/4 w-32 h-32 rounded-full bg-amber-500/5 backdrop-blur-md z-0"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-amber-500/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            ></motion.div>
          ))}
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Who We Serve
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Artists */}
            <motion.div
              className="bg-[#171717] rounded-xl p-6 shadow-md flex flex-col items-center text-center border border-[#333333] hover:border-amber-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transform hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="bg-amber-900/30 p-4 rounded-full mb-4 relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Palette className="h-8 w-8 text-amber-500" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-500/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-amber-500">Christian Visual Artists</h3>
              <p className="text-gray-300 mb-4">
                Share your God-given talents, sell your artwork, and connect with a community that values faith-inspired
                creativity.
              </p>
              <Link
                href="/artist-info"
                className="text-amber-500 font-medium hover:text-amber-400 mt-auto inline-flex items-center group"
              >
                Learn More{" "}
                <ArrowRight className="inline h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Patrons */}
            <motion.div
              className="bg-[#171717] rounded-xl p-6 shadow-md flex flex-col items-center text-center border border-[#333333] hover:border-amber-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transform hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="bg-amber-900/30 p-4 rounded-full mb-4 relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Heart className="h-8 w-8 text-amber-500" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-500/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                ></motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-amber-500">Patrons & Supporters</h3>
              <p className="text-gray-300 mb-4">
                Discover and support Christian artists, donate to causes, vote in contests, and earn rewards for your
                engagement.
              </p>
              <Link
                href="/patron-info"
                className="text-amber-500 font-medium hover:text-amber-400 mt-auto inline-flex items-center group"
              >
                Learn More{" "}
                <ArrowRight className="inline h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Churches */}
            <motion.div
              className="bg-[#171717] rounded-xl p-6 shadow-md flex flex-col items-center text-center border border-[#333333] hover:border-amber-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transform hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="bg-amber-900/30 p-4 rounded-full mb-4 relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Church className="h-8 w-8 text-amber-500" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-500/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                ></motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-amber-500">Churches & Organizations</h3>
              <p className="text-gray-300 mb-4">
                Find talented Christian artists for events, create donation campaigns, and engage with a faith-based
                creative community.
              </p>
              <Link
                href="/church-info"
                className="text-amber-500 font-medium hover:text-amber-400 mt-auto inline-flex items-center group"
              >
                Learn More{" "}
                <ArrowRight className="inline h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#111111] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"
            animate={{
              x: [50, -50, 50],
              y: [-50, 50, -50],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"
            animate={{
              x: [-50, 50, -50],
              y: [50, -50, 50],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          ></motion.div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.h2 className="text-3xl font-bold mb-4 text-gray-100" variants={itemVariants}>
              Membership Tiers
            </motion.h2>
            <motion.p className="text-center text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
              Choose the membership level that best fits your needs and goals within our community.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Free Tier */}
            <motion.div
              className="bg-[#171717] rounded-xl p-6 shadow-md border border-[#333333] hover:border-gray-500 transition-all duration-500 relative overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 text-center text-gray-100">Free</h3>
                <p className="text-3xl font-bold text-center mb-6 text-gray-100">
                  $0<span className="text-sm font-normal text-gray-400">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Basic profile</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">View and vote on artwork</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Participate in community</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Basic point earning</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 rounded-md border border-[#333333] text-gray-300 hover:bg-[#222222] transition-all duration-300 relative z-10 overflow-hidden group"
                >
                  <span className="relative z-10">Get Started</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </Link>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 to-gray-700"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              ></motion.div>
            </motion.div>

            {/* Tier 1 */}
            <motion.div
              className="bg-[#171717] rounded-xl p-6 shadow-xl border-2 border-amber-600 relative overflow-hidden group z-20"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              initial={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute -right-20 -top-20 w-40 h-40 bg-amber-600/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
              <div className="absolute top-0 right-0 bg-amber-600 text-black px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg z-20">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 bg-amber-500 rounded-bl-lg rounded-tr-lg z-[-1]"
                ></motion.div>
                <span className="relative z-10">Popular</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 text-center text-gray-100">Tier 1</h3>
                <p className="text-3xl font-bold text-center mb-6 text-gray-100">
                  $9.99<span className="text-sm font-normal text-gray-400">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Everything in Free</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Enhanced profile visibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Sell up to 25 artworks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Participate in contests</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">2x point earning rate</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-700 text-black font-medium transition-all duration-300 relative overflow-hidden group hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                >
                  <span className="relative z-10">Upgrade Now</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </Link>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              ></motion.div>
            </motion.div>

            {/* Tier 2 */}
            <motion.div
              className="bg-[#171717] rounded-xl p-6 shadow-md border border-[#333333] hover:border-amber-700 transition-all duration-500 relative overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 text-center text-gray-100">Tier 2</h3>
                <p className="text-3xl font-bold text-center mb-6 text-gray-100">
                  $19.99<span className="text-sm font-normal text-gray-400">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Everything in Tier 1</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Unlimited artwork uploads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Create & sell courses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">Priority helper status</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">3x point earning rate</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 rounded-md border border-[#333333] text-gray-300 hover:bg-amber-900/30 hover:border-amber-700 hover:text-amber-500 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Upgrade Now</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-amber-800/30 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </Link>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 to-amber-900"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Artwork */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#111111] to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Featured Artwork
          </motion.h2>

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
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
          >
            {artworkImages.map((image, index) => (
              <SwiperSlide key={index} style={{ width: "300px", height: "400px" }}>
                <div className="relative w-full h-full group">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Featured artwork ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-medium">Artwork Title {index + 1}</h3>
                    <p className="text-white/80 text-sm">Artist Name</p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-amber-500" : "text-gray-500"}`}
                          fill={i < 4 ? "#f59e0b" : "none"}
                        />
                      ))}
                      <span className="text-white/80 text-xs ml-2">4.0 (24 reviews)</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5 shadow-sm">
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                      <Heart className="h-4 w-4 text-amber-500 cursor-pointer" />
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-16">
            <Link
              href="#"
              className="inline-flex items-center px-6 py-3 rounded-md border border-amber-600 text-amber-500 hover:bg-amber-900/30 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10">View All Artwork</span>
              <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-amber-800/30 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#171717] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          ></motion.div>
        </div>

        <motion.div
          className="container mx-auto max-w-6xl text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.h2 className="text-3xl font-bold mb-4 text-gray-100" variants={itemVariants}>
            Join Our Faith-Based Creative Community
          </motion.h2>
          <motion.p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto" variants={itemVariants}>
            Whether you're an artist, patron, or church, there's a place for you in our growing community of
            faith-inspired creatives.
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 rounded-md bg-amber-600 hover:bg-amber-700 text-black font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transform hover:-translate-y-1 group relative overflow-hidden"
            >
              <span className="relative z-10">Sign Up Now</span>
              <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 rounded-md border border-amber-600 text-amber-500 hover:bg-amber-900/30 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden"
            >
              <span className="relative z-10">Learn More</span>
              <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-amber-800/30 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        ></motion.div>

        <motion.div
          className="container mx-auto max-w-3xl text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.h2 className="text-2xl font-bold mb-4 text-gray-100" variants={itemVariants}>
            Stay Updated
          </motion.h2>
          <motion.p className="text-gray-300 mb-6" variants={itemVariants}>
            Subscribe to our newsletter to receive updates on new artists, events, and opportunities.
          </motion.p>
          <motion.form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" variants={itemVariants}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-12 w-full rounded-md border border-[#333333] bg-[#171717] px-4 py-2 text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              required
            />
            <motion.button
              type="submit"
              className="whitespace-nowrap px-6 py-3 rounded-md bg-amber-600 hover:bg-amber-700 text-black font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Subscribe</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </motion.button>
          </motion.form>
        </motion.div>
      </section>
    </div>
  )
}
