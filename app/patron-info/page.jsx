"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Heart, Gift, Award, DollarSign, ThumbsUp } from 'lucide-react'

export default function PatronInfoPage() {
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

  // Free stock images for patrons
  const patronShowcaseImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.51.17%E2%80%AFAM-voqzdXE4pg5P8vv6paVLeEtIoijpXd.png"
  const patronImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.50.44%E2%80%AFAM-2Mnff0J8bLX1LYi8T5GQjU2FQCae0Z.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.51.01%E2%80%AFAM-le4766DQfqDBPuSwIsAwCW8B1lAo9W.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.51.33%E2%80%AFAM-RGeK6k7iUoUMEeM9gLGI2CGMQhdJqe.png"
  ]

  return (
    <div className="container mx-auto px-4 py-40 max-w-6xl relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [-50, 50, -50],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [50, -50, 50],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
      </div>

      <motion.div 
        className="text-center mb-12 relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
      >
        <motion.h1 className="text-4xl font-bold mb-4 text-gray-100" variants={itemVariants}>
          For Patrons & Supporters
        </motion.h1>
        <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
          Discover and support Christian artists, engage with faith-inspired creativity, and make a difference.
        </motion.p>
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative h-[300px] rounded-xl overflow-hidden shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image
              src={patronShowcaseImage || "/placeholder.svg"}
              alt="Support artists"
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <motion.div
              className="absolute bottom-4 left-4 text-white"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold">Support Creativity</h3>
              <p className="text-sm">Make a difference through art</p>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-4 text-gray-100">Support Faith-Inspired Creativity</h2>
            <p className="text-gray-300 mb-4">
              As a patron on Redeemed Creative Arts, you play a vital role in nurturing and supporting Christian visual
              artists who share their God-given talents.
            </p>
            <p className="text-gray-300 mb-6">
              Discover beautiful artwork that reflects your faith, connect with artists who share your values, and help
              spread the Gospel through the power of visual creativity.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
                <span className="relative z-10">Join as a Patron</span> 
                <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section 
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-gray-100" variants={itemVariants}>
          Benefits for Patrons
        </motion.h2>
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainerVariants}>
          <motion.div
            className="bg-[#171717] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transform hover:-translate-y-2"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <motion.div
              className="bg-amber-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Heart className="h-6 w-6 text-amber-500" />
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-500/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-amber-500">Discover Art</h3>
            <p className="text-gray-300">
              Explore a curated collection of faith-inspired artwork from talented Christian artists around the world.
            </p>
          </motion.div>
          <motion.div
            className="bg-[#171717] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transform hover:-translate-y-2"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <motion.div
              className="bg-amber-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <DollarSign className="h-6 w-6 text-amber-500" />
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-500/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
              ></motion.div>
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-amber-500">Support Artists</h3>
            <p className="text-gray-300">
              Purchase artwork, donate to artists, and contribute to campaigns that help Christian creatives thrive.
            </p>
          </motion.div>
          <motion.div
            className="bg-[#171717] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transform hover:-translate-y-2"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <motion.div
              className="bg-amber-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ThumbsUp className="h-6 w-6 text-amber-500" />
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-500/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
              ></motion.div>
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-amber-500">Vote & Engage</h3>
            <p className="text-gray-300">
              Vote in contests, comment on artwork, and engage with a community that values faith-inspired creativity.
            </p>
          </motion.div>
          <motion.div
            className="bg-[#171717] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transform hover:-translate-y-2"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <motion.div
              className="bg-amber-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Award className="h-6 w-6 text-amber-500" />
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-500/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.9 }}
              ></motion.div>
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-amber-500">Earn Rewards</h3>
            <p className="text-gray-300">
              Earn points for your engagement and redeem them for rewards like gift cards, discounts, and special
              features.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Ways to Support */}
      <motion.section 
        className="mb-16 bg-[#171717] p-8 rounded-xl relative z-10 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
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
        
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-gray-100 relative z-10" variants={itemVariants}>
          Ways to Support Artists
        </motion.h2>
        <motion.div className="grid md:grid-cols-2 gap-8 relative z-10" variants={staggerContainerVariants}>
          <motion.div 
            className="bg-[#0f0f0f] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-start mb-4">
              <motion.div 
                className="bg-amber-900/30 p-2 rounded-full mr-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <DollarSign className="h-5 w-5 text-amber-500" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-amber-500">Direct Donations</h3>
                <p className="text-gray-300">
                  Support artists directly with one-time or recurring donations to help them continue their creative
                  ministry.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-[#0f0f0f] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-start mb-4">
              <motion.div 
                className="bg-amber-900/30 p-2 rounded-full mr-4"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Gift className="h-5 w-5 text-amber-500" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-amber-500">Gift Points</h3>
                <p className="text-gray-300">
                  Share your earned points with artists to help them access platform benefits and rewards.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-[#0f0f0f] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-start mb-4">
              <motion.div 
                className="bg-amber-900/30 p-2 rounded-full mr-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Heart className="h-5 w-5 text-amber-500" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-amber-500">Purchase Artwork</h3>
                <p className="text-gray-300">
                  Buy original artwork, prints, or digital downloads to enjoy in your home while supporting artists.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-[#0f0f0f] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-start mb-4">
              <motion.div 
                className="bg-amber-900/30 p-2 rounded-full mr-4"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Award className="h-5 w-5 text-amber-500" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-amber-500">Matching Donations</h3>
                <p className="text-gray-300">
                  Create matching campaigns to multiply the impact of community donations to artists and causes.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Membership Tiers */}
      <motion.section 
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-gray-100" variants={itemVariants}>
          Patron Membership Options
        </motion.h2>
        <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainerVariants}>
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
                  <span className="text-gray-300">Basic patron profile</span>
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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="w-full relative overflow-hidden group">
                  <span className="relative z-10">Get Started</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </Button>
              </motion.div>
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
                  <span className="text-gray-300">Direct message artists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">Create donation campaigns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">2x point earning rate</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">Helper program eligibility</span>
                </li>
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 relative overflow-hidden group hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                  <span className="relative z-10">Upgrade Now</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </Button>
              </motion.div>
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
                  <span className="text-gray-300">Create matching campaigns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">Priority helper status</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">Featured patron recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">3x point earning rate</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">Early access to new artwork</span>
                </li>
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="w-full relative overflow-hidden group">
                  <span className="relative z-10">Upgrade Now</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-amber-800/30 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </Button>
              </motion.div>
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
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-gray-100" variants={itemVariants}>
          Patron Testimonials
        </motion.h2>
        <motion.div className="grid md:grid-cols-3 gap-6" variants={staggerContainerVariants}>
          {[1, 2, 3].map((testimonial, index) => (
            <motion.div
              key={testimonial}
              className="bg-[#171717] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={patronImages[index % patronImages.length] || "/placeholder.svg"}
                    alt={`Patron ${testimonial}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">Patron Name {testimonial}</h3>
                  <p className="text-sm text-gray-400">Supporter</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "I love being able to support Christian artists who create beautiful work that reflects my faith. The
                platform makes it easy to discover new artists and engage with a community that shares my values."
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FAQ */}
      <motion.section 
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-gray-100" variants={itemVariants}>
          Frequently Asked Questions
        </motion.h2>
        <motion.div className="space-y-6 max-w-4xl mx-auto" variants={staggerContainerVariants}>
          {[
            {
              question: "How do I support artists on the platform?",
              answer: "You can support artists in multiple ways: purchase their artwork, make direct donations, create matching campaigns, gift points, vote in contests, and engage with their content through comments and shares."
            },
            {
              question: "What are points and how do I earn them?",
              answer: "Points are earned through platform engagement such as logging in regularly, voting on artwork, making donations, sharing content, and purchasing artwork. Points can be redeemed for rewards or gifted to artists."
            },
            {
              question: "How do matching donations work?",
              answer: "With a Tier 2 membership, you can create matching campaigns where you pledge to match donations from other patrons up to a specified amount. This multiplies the impact of community support for artists and causes."
            },
            {
              question: "Can I be both a patron and a helper?",
              answer: "Yes! Many patrons also opt in to the Helper program to offer their talents to churches and organizations. You can select this option during registration or from your dashboard."
            }
          ].map((faq, index) => (
            <motion.div 
              key={index} 
              className="bg-[#0f0f0f] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-amber-500">{faq.question}</h3>
              <p className="text-gray-300">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="text-center bg-[#171717] p-12 rounded-xl relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
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
        
        <motion.div className="relative z-10">
          <motion.h2 className="text-3xl font-bold mb-4 text-gray-100" variants={itemVariants}>
            Ready to Support Christian Artists?
          </motion.h2>
          <motion.p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto" variants={itemVariants}>
            Join our community of patrons and help spread faith-inspired creativity throughout the world.
          </motion.p>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
              <span className="relative z-10">Join as a Patron</span> 
              <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}
