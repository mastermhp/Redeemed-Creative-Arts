"use client"

import Link from "next/link"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
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
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={staggerContainerVariants}>
        <motion.h1 className="text-4xl font-bold mb-4" variants={itemVariants}>
          About Redeemed Creative Arts
        </motion.h1>
        <motion.p className="text-xl text-gray-400 max-w-3xl mx-auto" variants={itemVariants}>
          A faith-based community platform connecting Christian visual artists, patrons, and churches.
        </motion.p>
      </motion.div>

      {/* Mission and Vision */}
      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400 mb-4">
              Redeemed Creative Arts exists to create a thriving ecosystem where Christian visual artists can share
              their God-given talents, connect with supporters who value faith-inspired creativity, and partner with
              churches and organizations to spread the Gospel through art.
            </p>
            <p className="text-gray-400 mb-4">
              We believe that art has the power to communicate truth, inspire faith, and build community. Our platform
              provides the tools, connections, and support needed for Christian artists to flourish in their calling.
            </p>
          </motion.div>
          <motion.div
            className="relative h-[300px] rounded-xl overflow-hidden shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="https://sjc.microlink.io/y3KgIhgW75V0jOrXxzvsNL0QEeY--nMU76iLnz41-YjxegvV-Z9lciictFrK6rqLlSUlTbHt3BV5tjQd8F5ARA.jpeg"
              alt="Our mission"
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">Inspiring Faith</h3>
              <p className="text-sm">Through visual creativity</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values */}
      <motion.section
        className="mb-16 bg-[#171717] p-8 rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center" variants={itemVariants}>
          Our Core Values
        </motion.h2>
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainerVariants}>
          {[
            {
              title: "Faith-Centered",
              description:
                "We honor God in all we do, recognizing that our creativity flows from Him as the ultimate Creator.",
            },
            {
              title: "Community",
              description:
                "We foster meaningful connections between artists, patrons, and churches to create a supportive ecosystem.",
            },
            {
              title: "Excellence",
              description:
                "We encourage the highest quality in artistic expression, platform experience, and community engagement.",
            },
            {
              title: "Generosity",
              description:
                "We promote a culture of giving through our donation systems, challenges, and community support.",
            },
            {
              title: "Integrity",
              description:
                "We operate with transparency, honesty, and ethical practices in all our interactions and transactions.",
            },
            {
              title: "Innovation",
              description: "We embrace creative solutions and new technologies to better serve our community.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-[#0f0f0f] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transform hover:-translate-y-1"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-amber-500">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center" variants={itemVariants}>
          How It Works
        </motion.h2>
        <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainerVariants}>
          {[
            {
              step: 1,
              title: "Join the Community",
              description: "Sign up as an artist, patron, or church/organization and create your profile.",
            },
            {
              step: 2,
              title: "Connect & Engage",
              description: "Share artwork, support artists, participate in challenges, and build relationships.",
            },
            {
              step: 3,
              title: "Grow Together",
              description:
                "Earn points, unlock rewards, and help spread faith-inspired creativity throughout the world.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="bg-amber-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-2xl font-bold text-amber-500">{step.step}</span>
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-500/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                ></motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-amber-500">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Team (Placeholder) */}
      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center" variants={itemVariants}>
          Our Team
        </motion.h2>
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainerVariants}>
          {[1, 2, 3, 4].map((member) => (
            <motion.div
              key={member}
              className="text-center group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://sjc.microlink.io/y3KgIhgW75V0jOrXxzvsNL0QEeY--nMU76iLnz41-YjxegvV-Z9lciictFrK6rqLlSUlTbHt3BV5tjQd8F5ARA.jpeg"
                  alt={`Team member ${member}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-amber-500">Team Member {member}</h3>
              <p className="text-gray-400">Position</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="text-center bg-[#171717] p-12 rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-4" variants={itemVariants}>
          Join Our Community Today
        </motion.h2>
        <motion.p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto" variants={itemVariants}>
          Be part of a growing movement of Christian artists, patrons, and churches dedicated to spreading faith through
          creativity.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden" asChild>
            <Link href="/register">
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </Link>
          </Button>
        </motion.div>
      </motion.section>
    </div>
  )
}
