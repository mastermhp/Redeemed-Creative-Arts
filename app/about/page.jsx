"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Palette, Heart, Church, Users, MapPin } from "lucide-react"

export default function AboutPage() {
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

  // Free stock images
  const missionImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.51.33%E2%80%AFAM-RGeK6k7iUoUMEeM9gLGI2CGMQhdJqe.png"
  const artistImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.50.44%E2%80%AFAM-2Mnff0J8bLX1LYi8T5GQjU2FQCae0Z.png"
  const patronImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.51.01%E2%80%AFAM-le4766DQfqDBPuSwIsAwCW8B1lAo9W.png"
  const churchImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-16%20at%201.51.17%E2%80%AFAM-voqzdXE4pg5P8vv6paVLeEtIoijpXd.png"

  return (
    <div className="container mx-auto px-4 py-44 max-w-6xl relative overflow-hidden">
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

      {/* Header Section */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
      >
        <motion.h1 className="text-4xl font-bold mb-2 text-gray-100" variants={itemVariants}>
          About Us
        </motion.h1>
        <motion.h2 className="text-2xl font-semibold mb-4 text-amber-500" variants={itemVariants}>
          REDEEMED CREATIVE ARTS
        </motion.h2>
        <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
          Celebrating the Gifts of Christian Visual Artists, Supporters, and Faith-Based Communities
        </motion.p>
      </motion.div>

      {/* Mission Section */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Our Mission</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              At Redeemed Creative Arts, we believe that art is a powerful ministry. For generations, visual
              storytelling has been a voice for the Church, offering hope, truth, and creativity that uplifts the body
              of Christ.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to create an active and growing online community where visual artists, patrons, and
              churches/Christian organizations connect, engage, serve and support one another on the journey of faith
              and artistic ministry.
            </p>
          </motion.div>
          <motion.div
            className="relative h-[300px] rounded-xl overflow-hidden shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image
              src={missionImage || "/placeholder.svg"}
              alt="Our mission"
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
              <h3 className="text-xl font-bold">Faith Through Art</h3>
              <p className="text-sm">Connecting creativity and ministry</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Who We Serve Section */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-gray-100" variants={itemVariants}>
          Who We Serve
        </motion.h2>

        {/* Artists */}
        <motion.div
          className="mb-12 bg-[#171717] p-8 rounded-xl relative z-10 overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
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

          <div className="grid md:grid-cols-3 gap-8 items-start relative z-10">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-amber-900/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Palette className="h-6 w-6 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  ></motion.div>
                </motion.div>
                <h3 className="text-2xl font-semibold text-amber-500">Artists</h3>
              </div>

              <p className="text-gray-300 mb-4">
                We welcome visual artists in all mediums—from painters and muralists to sculptors, photographers,
                videographers, and digital creators. Artists can:
              </p>

              <ul className="space-y-2 text-gray-300 mb-4">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Showcase their work to a faith-based audience.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>
                    Participate in site-wide events, win awards, earn money and redeem points for exclusive-to-site
                    rewards.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Sell artwork and offer coursework packages.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>
                    Connect with patrons and churches, expand their ministry reach through newsletters, emails, homepage
                    features, service and social media promotions.
                  </span>
                </li>
              </ul>

              <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#333333] mt-4">
                <p className="text-sm text-gray-300 italic">
                  <span className="font-semibold text-amber-500">Disclaimer:</span> By uploading artwork to Redeemed
                  Creative Arts, artists affirm they are the sole creators and rightful owners of the artwork. Redeemed
                  Creative Arts is not responsible for verifying ownership and will not be held liable for any
                  infringements. See our full Artist Disclaimer. AI art is NOT permitted.
                </p>
              </div>
            </div>

            <motion.div
              className="relative h-[200px] md:h-full rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src={artistImage || "/placeholder.svg"}
                alt="Artists"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Patrons & Supporters */}
        <motion.div
          className="mb-12 bg-[#171717] p-8 rounded-xl relative z-10 overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          ></motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-start relative z-10">
            <motion.div
              className="relative h-[200px] md:h-full rounded-xl overflow-hidden shadow-lg md:order-1 order-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src={patronImage || "/placeholder.svg"}
                alt="Patrons & Supporters"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </motion.div>

            <div className="md:col-span-2 md:order-2 order-1">
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-amber-900/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Heart className="h-6 w-6 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                  ></motion.div>
                </motion.div>
                <h3 className="text-2xl font-semibold text-amber-500">Patrons & Supporters</h3>
              </div>

              <p className="text-gray-300 mb-4">Our patrons are the heartbeat of our community. They:</p>

              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Engage with artists and other supporters.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Vote on submissions, donate, gift points, and make purchases.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>
                    Earn points and rewards—such as discounts, monetary awards, gas cards, and exclusive experiences.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Encourage artists with feedback and support the ministries they love.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Offer talents to local churches and faith-based communities – all while earning money!</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Churches & Christian Organizations */}
        <motion.div
          className="mb-12 bg-[#171717] p-8 rounded-xl relative z-10 overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          ></motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-start relative z-10">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-amber-900/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Church className="h-6 w-6 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                  ></motion.div>
                </motion.div>
                <h3 className="text-2xl font-semibold text-amber-500">Churches & Christian Organizations</h3>
              </div>

              <p className="text-gray-300 mb-4">
                Redeemed Creative Arts is designed to be an extension of your church or ministry's outreach and
                engagement. Churches can:
              </p>

              <ul className="space-y-2 text-gray-300 mb-6">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Use the platform as a part of their youth, adult, and community programs.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Encourage members to submit videos, artwork, and creative projects.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>
                    Earn points toward rewards like movie tickets, theme park trips, conventions, and national vacation
                    packages for pastors and leaders.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Feature church talent, youth, and members on the website for recognition and celebration.</span>
                </li>
              </ul>

              <p className="text-gray-300 mb-4">Churches and members in the Membership can also:</p>

              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Invite local communities to events.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>
                    Connect with local talent, musicians, and presenters (with subsidized costs for a limited time).
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Register as traveling paid or unpaid talent or hosts.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Submit reviews and ratings to foster positive, faith-based interactions.</span>
                </li>
              </ul>
            </div>

            <motion.div
              className="relative h-[200px] md:h-full rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src={churchImage || "/placeholder.svg"}
                alt="Churches & Christian Organizations"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Our Audience Section */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-gray-100" variants={itemVariants}>
          Our Audience
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
        >
          {[
            { icon: <Church className="h-6 w-6 text-amber-500" />, text: "Faith-based ministries" },
            { icon: <Church className="h-6 w-6 text-amber-500" />, text: "Churches and Christian organizations" },
            { icon: <Users className="h-6 w-6 text-amber-500" />, text: "Conventions and networks of churches" },
            { icon: <Palette className="h-6 w-6 text-amber-500" />, text: "Christian artists of all ages" },
            { icon: <Heart className="h-6 w-6 text-amber-500" />, text: "Christian supporters and patrons" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#0f0f0f] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="flex items-center">
                <motion.div
                  className="bg-amber-900/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.icon}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                  ></motion.div>
                </motion.div>
                <p className="text-gray-300 font-medium">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Location & Shipping Policy */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div
          className="bg-[#171717] p-8 rounded-xl relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          ></motion.div>

          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <motion.div
                className="bg-amber-900/30 p-3 rounded-full mr-4 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <MapPin className="h-6 w-6 text-amber-500" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-500/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
              </motion.div>
              <h3 className="text-2xl font-semibold text-amber-500">Location & Shipping Policy</h3>
            </div>

            <p className="text-gray-300">
              Our online store currently serves U.S. customers only. Artists who wish to sell internationally are
              responsible for setting their own pricing and shipping policies.
            </p>
          </div>
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
            Join Our Community
          </motion.h2>
          <motion.p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto" variants={itemVariants}>
            At Redeemed Creative Arts, we celebrate the creativity God has placed in His people. Together, we can build
            a space where art becomes worship, engagement becomes ministry, and the global Church is enriched by the
            voices of artists of all ages.
          </motion.p>
          <motion.p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto" variants={itemVariants}>
            We invite you to create, support, serve and connect today.
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
                <span className="relative z-10">Join as an Artist</span>
                <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="group relative overflow-hidden">
                <span className="relative z-10">Become a Patron</span>
                <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}
