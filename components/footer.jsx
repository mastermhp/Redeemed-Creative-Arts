"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Palette, Facebook, Twitter, Instagram, Youtube, Mail, ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 10 } },
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
  }

  return (
    <footer className="bg-[#0f0f0f] text-gray-300 relative overflow-hidden">
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

      {/* Newsletter section */}
      <div className="border-b border-[#222222] relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.h3 className="text-2xl font-bold mb-4 text-amber-500" variants={itemVariants}>
              Join Our Newsletter
            </motion.h3>
            <motion.p className="text-gray-400 mb-6" variants={itemVariants}>
              Get the latest updates on new artists, events, and opportunities delivered to your inbox.
            </motion.p>
            <motion.form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="pl-10 w-full h-12 rounded-md border border-[#333333] bg-[#171717] px-4 py-2 text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="whitespace-nowrap px-6 py-3 rounded-md bg-amber-600 hover:bg-amber-700 text-black font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          {/* Logo and Description */}
          <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="bg-amber-900/30 p-1.5 rounded-full transition-all duration-300 group-hover:bg-amber-800/50">
                <Palette className="h-6 w-6 text-amber-500 transition-all duration-300 group-hover:text-amber-400" />
              </div>
              <span className="font-bold text-xl text-amber-500 transition-all duration-300 group-hover:text-amber-400">
                Redeemed Creative Arts
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              A faith-based community platform connecting Christian visual artists, patrons, and churches in a
              supportive environment that celebrates creativity inspired by faith.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="bg-[#171717] p-2 rounded-full text-gray-500 hover:text-amber-500 hover:bg-[#222222] transition-colors duration-300"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a
                href="#"
                className="bg-[#171717] p-2 rounded-full text-gray-500 hover:text-amber-500 hover:bg-[#222222] transition-colors duration-300"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                className="bg-[#171717] p-2 rounded-full text-gray-500 hover:text-amber-500 hover:bg-[#222222] transition-colors duration-300"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a
                href="#"
                className="bg-[#171717] p-2 rounded-full text-gray-500 hover:text-amber-500 hover:bg-[#222222] transition-colors duration-300"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-amber-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-amber-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/artist-info"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-amber-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Artist Info
                </Link>
              </li>
              <li>
                <Link
                  href="/patron-info"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-amber-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Patron Info
                </Link>
              </li>
              <li>
                <Link
                  href="/church-info"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-amber-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Church Info
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-amber-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-amber-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-amber-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/helper-agreement"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-amber-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Helper Agreement
                </Link>
              </li>
              <li>
                <Link
                  href="/artist-disclaimer"
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-amber-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Artist Disclaimer
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-[#333333] mt-12 pt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>&copy; {new Date().getFullYear()} Redeemed Creative Arts. All rights reserved.</p>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-amber-600 text-black shadow-lg z-50 ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  )
}
