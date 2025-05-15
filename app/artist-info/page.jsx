"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Palette, Award, DollarSign, Users, BookOpen, Church } from "lucide-react"

// Free stock images from Unsplash
const artistImages = {
  hero: "https://sjc.microlink.io/y3KgIhgW75V0jOrXxzvsNL0QEeY--nMU76iLnz41-YjxegvV-Z9lciictFrK6rqLlSUlTbHt3BV5tjQd8F5ARA.jpeg",
  showcase:
    "https://sjc.microlink.io/y3KgIhgW75V0jOrXxzvsNL0QEeY--nMU76iLnz41-YjxegvV-Z9lciictFrK6rqLlSUlTbHt3BV5tjQd8F5ARA.jpeg",
  testimonial1:
    "https://sjc.microlink.io/y3KgIhgW75V0jOrXxzvsNL0QEeY--nMU76iLnz41-YjxegvV-Z9lciictFrK6rqLlSUlTbHt3BV5tjQd8F5ARA.jpeg",
  testimonial2:
    "https://sjc.microlink.io/y3KgIhgW75V0jOrXxzvsNL0QEeY--nMU76iLnz41-YjxegvV-Z9lciictFrK6rqLlSUlTbHt3BV5tjQd8F5ARA.jpeg",
  testimonial3:
    "https://sjc.microlink.io/y3KgIhgW75V0jOrXxzvsNL0QEeY--nMU76iLnz41-YjxegvV-Z9lciictFrK6rqLlSUlTbHt3BV5tjQd8F5ARA.jpeg",
}

export default function ArtistInfoPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Initialize AOS if needed
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 50,
        easing: "ease-out-cubic",
      })
    }
  }, [])

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
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={staggerContainerVariants}
      >
        <motion.h1 className="text-4xl font-bold mb-4 text-amber-500" variants={itemVariants}>
          For Christian Visual Artists
        </motion.h1>
        <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
          Share your God-given talents, connect with supporters, and grow your artistic ministry.
        </motion.p>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="mb-16"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={staggerContainerVariants}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div className="order-2 md:order-1" variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-4 text-amber-500">Showcase Your Faith-Inspired Art</h2>
            <p className="text-gray-300 mb-4">
              Redeemed Creative Arts provides a dedicated platform for Christian visual artists to share their work with
              a community that values faith-inspired creativity.
            </p>
            <p className="text-gray-300 mb-6">
              Whether you're a painter, photographer, digital artist, sculptor, or work in any other visual medium, our
              platform helps you connect with patrons, churches, and other artists who share your values.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button className="bg-amber-600 hover:bg-amber-700 hover-glow group relative overflow-hidden">
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
          </motion.div>
          <motion.div
            className="relative h-[300px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2 hover-lift"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src={artistImages.hero || "/placeholder.svg"}
              alt="Artist showcase"
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <motion.div
              className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-white text-sm">Express your faith through art</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-amber-500" variants={itemVariants}>
          Benefits for Artists
        </motion.h2>
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainerVariants}>
          {[
            {
              icon: <Palette className="h-6 w-6 text-amber-600" />,
              title: "Showcase Your Work",
              description:
                "Upload and display your artwork in a beautiful gallery format that highlights your unique style and vision.",
            },
            {
              icon: <DollarSign className="h-6 w-6 text-amber-600" />,
              title: "Sell Your Creations",
              description:
                "Set your own prices and sell original artwork, prints, and digital downloads directly to interested buyers.",
            },
            {
              icon: <Users className="h-6 w-6 text-amber-600" />,
              title: "Build a Following",
              description:
                "Connect with patrons who appreciate faith-based art and build a dedicated following for your creative ministry.",
            },
            {
              icon: <Award className="h-6 w-6 text-amber-600" />,
              title: "Enter Contests",
              description:
                "Participate in platform-wide contests and challenges to gain exposure and win prizes for your artwork.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-[#171717] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transform hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-amber-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 relative">
                {benefit.icon}
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-500/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                ></motion.div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-amber-500">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* More Benefits */}
      <motion.section
        className="mb-16 bg-[#171717] p-8 rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-amber-500" variants={itemVariants}>
          More Ways to Grow
        </motion.h2>
        <motion.div className="grid md:grid-cols-2 gap-8" variants={staggerContainerVariants}>
          {[
            {
              icon: <BookOpen className="h-5 w-5 text-amber-600" />,
              title: "Create & Sell Courses",
              description:
                "Share your artistic knowledge by creating and selling courses to help others develop their skills. Available for Tier 2 members.",
            },
            {
              icon: <Church className="h-5 w-5 text-amber-600" />,
              title: "Become a Helper",
              description:
                "Offer your artistic services to churches and organizations for events, projects, and ministries as part of our Helper program.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-[#0f0f0f] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-start mb-4">
                <div className="bg-amber-900/30 p-2 rounded-full mr-4">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-amber-500">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Membership Tiers */}
      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-amber-500" variants={itemVariants}>
          Artist Membership Options
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
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Basic artist profile</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Upload up to 5 artworks</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Participate in community</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Basic point earning</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full hover:bg-[#222222] hover:text-amber-500 hover:border-amber-500"
              >
                Get Started
              </Button>
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
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Everything in Free</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Enhanced profile visibility</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Sell up to 25 artworks</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Participate in contests</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">2x point earning rate</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Helper program eligibility</span>
                </li>
              </ul>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                Upgrade Now
              </Button>
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
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Everything in Tier 1</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Unlimited artwork uploads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Create & sell courses</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Priority helper status</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">Featured artist opportunities</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">3x point earning rate</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full hover:bg-amber-900/30 hover:text-amber-500 hover:border-amber-700"
              >
                Upgrade Now
              </Button>
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
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-amber-500" variants={itemVariants}>
          Artist Testimonials
        </motion.h2>
        <motion.div className="grid md:grid-cols-3 gap-6" variants={staggerContainerVariants}>
          {[1, 2, 3].map((testimonial, index) => (
            <motion.div
              key={testimonial}
              className="bg-[#171717] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transform hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={artistImages[`testimonial${testimonial || "/placeholder.svg"}`]}
                    alt={`Artist ${testimonial}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-500">Artist Name {testimonial}</h3>
                  <p className="text-sm text-gray-400">Visual Artist</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Redeemed Creative Arts has been a blessing for my artistic ministry. I've connected with patrons who
                truly appreciate faith-inspired art and found opportunities I wouldn't have discovered elsewhere."
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-amber-500" variants={itemVariants}>
          Frequently Asked Questions
        </motion.h2>
        <motion.div className="space-y-6 max-w-4xl mx-auto" variants={staggerContainerVariants}>
          {[
            {
              question: "What types of art can I share on the platform?",
              answer:
                "We welcome all forms of visual art including painting, drawing, photography, digital art, sculpture, and more. All artwork should align with Christian values and be appropriate for our faith-based community.",
            },
            {
              question: "How do I get paid for my artwork sales?",
              answer:
                "When your artwork sells, the payment is processed through our secure system. After a small platform fee, the funds are transferred to your connected payment account. Detailed payment information will be available in Phase 2.",
            },
            {
              question: "What is the Helper program?",
              answer:
                "The Helper program connects artists with churches and organizations that need creative services. As a Helper, you can offer your artistic talents for events, projects, and ministries. You can opt in during registration or from your dashboard.",
            },
            {
              question: 'How does the "No AI Art" verification work?',
              answer:
                "We value authentic human creativity. Our platform includes a verification process where artists confirm their work is created by them, not generated by AI. This maintains the integrity of our community's creative expression.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[#171717] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-amber-500">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
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
        <motion.h2 className="text-3xl font-bold mb-4 text-amber-500" variants={itemVariants}>
          Ready to Share Your Faith-Inspired Art?
        </motion.h2>
        <motion.p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto" variants={itemVariants}>
          Join our community of Christian artists and start sharing your God-given talents with the world.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] group relative overflow-hidden"
            asChild
          >
            <Link href="/register">
              <span className="relative z-10">Join as an Artist</span>
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
