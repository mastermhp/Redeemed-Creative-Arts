"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Heart,
  ArrowRight,
  ChevronUp,
  Sparkles,
  Music,
  Users,
  Calendar,
  BookOpen,
  Phone,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [hoveredIcon, setHoveredIcon] = useState(null)
  const [emailValue, setEmailValue] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const footerRef = useRef(null)
  const isFooterInView = useInView(footerRef, { once: false, amount: 0.2 })

  const handleSubscribe = (e) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmailValue("")
    setTimeout(() => setIsSubscribed(false), 5000)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const socialLinks = [
    { icon: <Facebook size={22} />, name: "Facebook", url: "#", color: "bg-blue-500" },
    { icon: <Twitter size={22} />, name: "Twitter", url: "#", color: "bg-sky-400" },
    { icon: <Instagram size={22} />, name: "Instagram", url: "#", color: "bg-pink-500" },
    { icon: <Youtube size={22} />, name: "YouTube", url: "#", color: "bg-red-600" },
    { icon: <Mail size={22} />, name: "Email", url: "mailto:newmandesigners@gmail.com", color: "bg-amber-600" },
  ]

  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "For Artists", url: "/artist-info" },
    { name: "For Patrons", url: "/patron-info" },
    { name: "For Churches", url: "/church-info" },
    { name: "Contact Us", url: "/contact" },
  ]

  const legalLinks = [
    { name: "Terms of Service", url: "/terms" },
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Artist Disclaimer", url: "/artist-disclaimer" },
    { name: "Helper Agreement", url: "/helper-agreement" },
  ]

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-950 dark:to-slate-900 border-t border-amber-200 dark:border-amber-800/30 pt-20 overflow-hidden"
      initial="hidden"
      animate={isFooterInView ? "visible" : "hidden"}
      variants={footerVariants}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-300/10 dark:bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400/10 dark:bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      {/* Back to Top Button */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.button
          onClick={scrollToTop}
          className="group bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
        </motion.button>
      </div>

      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* About */}
          <motion.div className="md:col-span-4 space-y-6" variants={itemVariants}>
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isFooterInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-600/50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">Redeemed Creative Arts</h3>
              </motion.div>

              <p className="text-slate-600 dark:text-amber-200/80">
                Building bridges between Artists, Patrons, and Churches to foster a thriving Christian creative
                community.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className={`relative p-3 rounded-full text-white transition-all duration-300 ${
                    hoveredIcon === index ? link.color : "bg-amber-600"
                  }`}
                  aria-label={link.name}
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  {link.icon}
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={hoveredIcon === index ? { scale: 1.5, opacity: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  />
                </motion.a>
              ))}
            </div>

            <div className="pt-4">
              <h4 className="text-lg font-semibold mb-3 text-amber-800 dark:text-amber-300">
                Subscribe to Our Newsletter
              </h4>

              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg border border-amber-200 dark:border-amber-700/50"
                >
                  <p className="flex items-center text-amber-700 dark:text-amber-300">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Thank you for subscribing!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    required
                    className="bg-white dark:bg-amber-900/20 border-amber-200 dark:border-amber-700 focus:ring-amber-500"
                  />
                  <Button type="submit" className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="md:col-span-3 space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 relative inline-block">
              Quick Links
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-amber-500 dark:bg-amber-400"
                initial={{ width: 0 }}
                animate={isFooterInView ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} variants={itemVariants} whileHover={{ x: 5 }}>
                  <Link
                    href={link.url}
                    className="text-slate-600 dark:text-amber-200/80 hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div className="md:col-span-2 space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 relative inline-block">
              Legal
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-amber-500 dark:bg-amber-400"
                initial={{ width: 0 }}
                animate={isFooterInView ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </h3>

            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <motion.li key={index} variants={itemVariants} whileHover={{ x: 5 }}>
                  <Link
                    href={link.url}
                    className="text-slate-600 dark:text-amber-200/80 hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="md:col-span-3 space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 relative inline-block">
              Contact Us
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-amber-500 dark:bg-amber-400"
                initial={{ width: 0 }}
                animate={isFooterInView ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </h3>

            <ul className="space-y-4">
              <motion.li className="flex items-start" variants={itemVariants}>
                <div className="bg-amber-100 dark:bg-amber-800/30 p-2 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <a
                    href="mailto:newmandesigners@gmail.com"
                    className="text-slate-600 dark:text-amber-200/80 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    newmandesigners@gmail.com
                  </a>
                </div>
              </motion.li>

              <motion.li className="flex items-start" variants={itemVariants}>
                <div className="bg-amber-100 dark:bg-amber-800/30 p-2 rounded-full mr-3">
                  <Phone className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-600 dark:text-amber-200/80">(555) 123-4567</p>
                </div>
              </motion.li>

              <motion.li className="flex items-start" variants={itemVariants}>
                <div className="bg-amber-100 dark:bg-amber-800/30 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-600 dark:text-amber-200/80">Mon-Fri: 9am - 5pm EST</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 py-10 border-t border-amber-200/50 dark:border-amber-800/30 mb-10"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full">
              <Music className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300">Artist Support</h4>
              <p className="text-sm text-slate-600 dark:text-amber-200/70">Empowering Christian artists</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full">
              <Heart className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300">Patron Engagement</h4>
              <p className="text-sm text-slate-600 dark:text-amber-200/70">Supporting the arts community</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full">
              <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300">Church Partnerships</h4>
              <p className="text-sm text-slate-600 dark:text-amber-200/70">Connecting with ministries</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300">Resources</h4>
              <p className="text-sm text-slate-600 dark:text-amber-200/70">Tools for creative growth</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="pt-8 pb-10 border-t border-amber-200/50 dark:border-amber-800/30 text-center"
          variants={itemVariants}
        >
          <p className="text-slate-600 dark:text-amber-200/70 mb-2">
            &copy; {currentYear} Redeemed Creative Arts. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-amber-200/50 flex items-center justify-center">
            Made with <Heart size={12} className="mx-1 text-amber-600 animate-pulse" /> for the Christian creative
            community
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
