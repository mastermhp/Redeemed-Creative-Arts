"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Users, Calendar, DollarSign, Search } from 'lucide-react'

export default function ChurchInfoPage() {
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

  // Free stock images for churches
  const churchShowcaseImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.51.33%E2%80%AFAM-RGeK6k7iUoUMEeM9gLGI2CGMQhdJqe.png"
  const helperProgramImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.50.44%E2%80%AFAM-2Mnff0J8bLX1LYi8T5GQjU2FQCae0Z.png"
  const churchImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.51.01%E2%80%AFAM-le4766DQfqDBPuSwIsAwCW8B1lAo9W.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.51.17%E2%80%AFAM-voqzdXE4pg5P8vv6paVLeEtIoijpXd.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.53.03%E2%80%AFAM-lq78IInk388X18D6qVfrKfslByagvu.png"
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl relative overflow-hidden">
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
          For Churches & Faith-Based Organizations
        </motion.h1>
        <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
          Connect with Christian artists, find creative talent, and engage your community through faith-inspired art.
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
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-4 text-gray-100">Enhance Your Ministry Through Art</h2>
            <p className="text-gray-300 mb-4">
              Redeemed Creative Arts connects churches and faith-based organizations with talented Christian visual
              artists who can help bring your vision to life.
            </p>
            <p className="text-gray-300 mb-6">
              Whether you're looking for artwork for your facilities, creative talent for events, or ways to engage your
              congregation through visual arts, our platform provides the connections and resources you need.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
                <span className="relative z-10">Join as an Organization</span> 
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
          <motion.div
            className="relative h-[300px] rounded-xl overflow-hidden shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image
              src={churchShowcaseImage || "/placeholder.svg"}
              alt="Church ministry"
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
              <h3 className="text-xl font-bold">Enhance Ministry</h3>
              <p className="text-sm">Through visual creativity</p>
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
          Benefits for Churches & Organizations
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
              <Search className="h-6 w-6 text-amber-500" />
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-500/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-amber-500">Find Talent</h3>
            <p className="text-gray-300">
              Discover and connect with Christian visual artists who can contribute to your ministry and events.
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
              <Calendar className="h-6 w-6 text-amber-500" />
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-500/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
              ></motion.div>
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-amber-500">Host Events</h3>
            <p className="text-gray-300">
              Create and promote art-focused events, workshops, and exhibitions for your community.
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
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
              ></motion.div>
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-amber-500">Fundraise</h3>
            <p className="text-gray-300">
              Create donation campaigns and challenges to support your ministry through art-based initiatives.
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
              <Users className="h-6 w-6 text-amber-500" />
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-500/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.9 }}
              ></motion.div>
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-amber-500">Engage Community</h3>
            <p className="text-gray-300">
              Connect your congregation with faith-inspired art and creative opportunities that deepen spiritual growth.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Helper Program */}
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
          The Helper Program
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            className="relative h-[300px] rounded-xl overflow-hidden shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image
              src={helperProgramImage || "/placeholder.svg"}
              alt="Helper program"
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
              <h3 className="text-xl font-bold">Creative Collaboration</h3>
              <p className="text-sm">Artists serving ministry</p>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-4 text-amber-500">Connect with Creative Talent</h3>
            <p className="text-gray-300 mb-4">
              The Helper program connects your organization with Christian artists who have opted to offer their
              creative services for events, projects, and ministries.
            </p>
            <p className="text-gray-300 mb-4">
              Browse our directory of Helpers, filter by skill set and location, and book the perfect creative talent
              for your needs. Helpers can be paid or volunteer, depending on your arrangement.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-300">Find artists for worship environments</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-300">Book talent for special events</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-300">Engage artists for community outreach</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-300">Rate and review your experience</span>
              </li>
            </ul>
          </motion.div>
        </div>
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
          Organization Membership Options
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
                  <span className="text-gray-300">Basic organization profile</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">Browse artist directory</span>
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
                  <span className="text-gray-300">Book up to 5 helpers monthly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">Create basic events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">2x point earning rate</span>
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
                  <span className="text-gray-300">Unlimited helper bookings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">Create donation campaigns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">Featured organization status</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">3x point earning rate</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-300">Priority event promotion</span>
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
          Organization Testimonials
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
                    src={churchImages[index % churchImages.length] || "/placeholder.svg"}
                    alt={`Church ${testimonial}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">Church Name {testimonial}</h3>
                  <p className="text-sm text-gray-400">Faith Organization</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Redeemed Creative Arts has been an incredible resource for our church. We've found talented artists for
                our events and connected with a community that shares our passion for faith-inspired creativity."
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
              question: "How does the Helper booking process work?",
              answer: "Browse our directory of Helpers, filter by skills and location, and send booking requests through the platform. Once a Helper accepts, you can communicate directly to finalize details. After the event, you can leave reviews to help the community."
            },
            {
              question: "Can we create fundraising campaigns?",
              answer: "Yes, Tier 2 members can create donation campaigns and challenges to support ministry initiatives. You can set goals, track progress, and engage the community in supporting your cause through art-based fundraising."
            },
            {
              question: "How do we promote our events on the platform?",
              answer: "You can create and promote events through your organization dashboard. Events will be visible to the community, and Tier 2 members receive priority placement in event listings and promotional opportunities."
            },
            {
              question: "Are there resources for integrating art into worship?",
              answer: "Yes, we provide resources, guides, and case studies on how to effectively integrate visual arts into worship environments, community outreach, and spiritual formation. These resources will be available in Phase 2."
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
            Enhance Your Ministry Through Art
          </motion.h2>
          <motion.p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto" variants={itemVariants}>
            Join our community of churches and faith-based organizations to connect with Christian artists and enhance
            your ministry through visual creativity.
          </motion.p>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
              <span className="relative z-10">Join as an Organization</span> 
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
