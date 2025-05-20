"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Clock, Users, ArrowRight, ChevronRight, Star, Heart, Sparkles, Globe, Calendar, Music, Edit, Maximize, Minimize, Plus, Minus, Search, Navigation } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [hoverCard, setHoverCard] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mapZoom, setMapZoom] = useState(14)
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [mapLocation, setMapLocation] = useState({
    lat: 34.0522,
    lng: -118.2437,
    address: "123 Faith Avenue, Creative City, CA 12345"
  })
  const [searchAddress, setSearchAddress] = useState("")

  const heroRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const faqRef = useRef(null)
  const newsletterRef = useRef(null)
  const teamRef = useRef(null)
  const testimonialsRef = useRef(null)
  const mapRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 })
  const isFormInView = useInView(formRef, { once: false, amount: 0.3 })
  const isInfoInView = useInView(infoRef, { once: false, amount: 0.3 })
  const isFaqInView = useInView(faqRef, { once: false, amount: 0.3 })
  const isNewsletterInView = useInView(newsletterRef, { once: false, amount: 0.3 })
  const isTeamInView = useInView(teamRef, { once: false, amount: 0.3 })
  const isTestimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 })
  const isMapInView = useInView(mapRef, { once: false, amount: 0.3 })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.2])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      e.target.reset()
    }, 5000)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    setIsSubscribed(true)
    setTimeout(() => {
      setIsSubscribed(false)
      e.target.reset()
    }, 5000)
  }

  const handleMapSearch = (e) => {
    e.preventDefault()
    // In a real implementation, this would use a geocoding API
    // For now, we'll just update with dummy data
    setMapLocation({
      lat: 34.0522 + (Math.random() * 0.02 - 0.01),
      lng: -118.2437 + (Math.random() * 0.02 - 0.01),
      address: searchAddress || "123 Faith Avenue, Creative City, CA 12345"
    })
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & Creative Director",
      image: "/placeholder.svg?height=400&width=400",
      email: "sarah@redeemedcreativearts.com",
    },
    {
      name: "Michael Chen",
      role: "Artist Relations",
      image: "/placeholder.svg?height=400&width=400",
      email: "michael@redeemedcreativearts.com",
    },
    {
      name: "Olivia Williams",
      role: "Church Partnerships",
      image: "/placeholder.svg?height=400&width=400",
      email: "olivia@redeemedcreativearts.com",
    },
    {
      name: "David Rodriguez",
      role: "Patron Engagement",
      image: "/placeholder.svg?height=400&width=400",
      email: "david@redeemedcreativearts.com",
    },
  ]

  const testimonials = [
    {
      name: "Pastor James Wilson",
      role: "Grace Community Church",
      quote:
        "Redeemed Creative Arts has transformed how our church engages with artists. The platform made it easy to find talented Christian artists for our events.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Emma Thompson",
      role: "Visual Artist",
      quote:
        "As an artist, I've found a supportive community that values my work and connects me with opportunities that align with my faith.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Robert Davis",
      role: "Arts Patron",
      quote:
        "Supporting Christian artists through this platform has been a blessing. I love seeing how my contributions help create meaningful art.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const faqs = [
    {
      question: "When will the platform be fully functional?",
      answer:
        "We're building Redeemed Creative Arts in phases. Phase 1 focuses on the platform foundation, Phase 2 adds core functionality, and Phase 3 introduces advanced features. We expect full functionality by Q4 2023.",
    },
    {
      question: "How can I get involved during Phase 1?",
      answer:
        "You can sign up for our newsletter to stay updated on our progress and be notified when we launch new features. You can also join our early access program to test new features before they're released.",
    },
    {
      question: "Is there a mobile app planned?",
      answer:
        "Yes, we're planning to develop a mobile app in the future. Our current focus is on building a responsive web platform first, but we expect to launch iOS and Android apps in 2024.",
    },
    {
      question: "How are artists vetted for the platform?",
      answer:
        "We have a thorough application process that reviews an artist's work, statement of faith, and professional background. Our team ensures all artists align with our mission and values.",
    },
    {
      question: "What percentage of donations go directly to artists?",
      answer:
        "We're committed to supporting artists, with 85% of all donations going directly to the artists. The remaining 15% covers platform maintenance, development, and administrative costs.",
    },
  ]

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["info@redeemedcreativearts.com", "support@redeemedcreativearts.com"],
      color: "from-amber-500 to-amber-700",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["(555) 123-4567", "Monday - Friday, 9am - 5pm EST"],
      color: "from-amber-600 to-amber-800",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: ["123 Faith Avenue", "Creative City, CA 12345"],
      color: "from-amber-700 to-amber-900",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Office Hours",
      details: ["Monday - Friday: 9am - 5pm", "Saturday: 10am - 2pm"],
      color: "from-amber-800 to-amber-950",
    },
  ]

  const contactCategories = [
    { id: "general", label: "General Inquiry", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { id: "artist", label: "Artist Support", icon: <Music className="h-4 w-4 mr-2" /> },
    { id: "church", label: "Church Partnership", icon: <Users className="h-4 w-4 mr-2" /> },
    { id: "patron", label: "Patron Information", icon: <Heart className="h-4 w-4 mr-2" /> },
    { id: "events", label: "Events & Calendar", icon: <Calendar className="h-4 w-4 mr-2" /> },
  ]

  const floatingElements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white dark:from-amber-950 dark:to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute rounded-full bg-gradient-to-r from-amber-300/10 to-amber-500/10 dark:from-amber-500/10 dark:to-amber-700/10"
            style={{
              width: el.size,
              height: el.size,
              left: `${el.x}%`,
              top: `${el.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, Math.random() + 0.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: el.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: el.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 to-amber-700/70 mix-blend-multiply" />
          <motion.div
            className="absolute inset-0 bg-[url('/placeholder.svg?height=1200&width=2000')] bg-cover bg-center"
            animate={{ scale: isHeroInView ? 1 : 1.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isHeroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Let's Connect
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We're here to answer your questions and help you navigate the world of Christian creative arts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                className="bg-white text-amber-700 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => {
                  formRef.current.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full backdrop-blur-sm"
                onClick={() => {
                  mapRef.current.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Find Us
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-50 to-transparent dark:from-amber-950 dark:to-transparent"
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </motion.div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Contact Form and Info Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            className="relative overflow-hidden rounded-3xl shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 opacity-90" />

            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

            <div className="relative p-8 md:p-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isFormInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold mb-4 text-white">Get in Touch</h2>
                <div className="h-1 w-20 bg-white/30 rounded-full" />
              </motion.div>

              {/* Contact Categories */}
              <motion.div
                className="flex flex-wrap gap-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {contactCategories.map((category) => (
                  <button
                    key={category.id}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === category.id
                        ? "bg-white text-amber-700 shadow-lg"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                    onClick={() => setActiveTab(category.id)}
                  >
                    {category.icon}
                    {category.label}
                  </button>
                ))}
              </motion.div>

              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    />
                    <CheckCircle className="h-20 w-20 text-white mb-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Message Sent!</h3>
                  <p className="text-white/80 mb-6 max-w-md">
                    Thank you for reaching out. We'll get back to you as soon as possible, usually within 24-48 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="border-white text-white hover:bg-white/20"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-white/90">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="Your first name"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-white/90">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Your last name"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/90">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-white/90">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/90">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      rows={5}
                      required
                      className="resize-none bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="userType"
                      className="h-4 w-4 rounded border-white/30 text-amber-600 focus:ring-amber-600 bg-white/10"
                    />
                    <label htmlFor="userType" className="text-sm text-white/80">
                      I'm interested in joining as an artist, patron, or church/organization.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-white text-amber-700 hover:bg-white/90 transition-all duration-300 group"
                  >
                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </Button>
                </motion.form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            ref={infoRef}
            className="space-y-10"
            initial={{ opacity: 0, x: 50 }}
            animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <motion.h2
                className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                How Can We Help You?
              </motion.h2>
              <motion.p
                className="text-slate-600 dark:text-amber-200/80 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Whether you're an artist looking to join our platform, a patron interested in supporting Christian art,
                or a church seeking creative talent, we're here to assist you on your journey.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  onMouseEnter={() => setHoverCard(index)}
                  onMouseLeave={() => setHoverCard(null)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-90 group-hover:scale-105 transition-transform duration-500`}
                  />

                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                      backgroundPosition:
                        hoverCard === index
                          ? `calc(50% + ${(mousePosition.x - window.innerWidth / 2) * 0.02}px) calc(50% + ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
                          : "50% 50%",
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 30 }}
                    style={{
                      backgroundImage: "url('/placeholder.svg?height=400&width=400')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  <div className="relative p-6 text-white">
                    <div className="bg-white/20 p-3 rounded-full w-fit mb-4">{method.icon}</div>
                    <h3 className="font-bold text-xl mb-2">{method.title}</h3>
                    {method.details.map((detail, i) => (
                      <p key={i} className="text-white/90">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Interactive Map Section */}
        <motion.div
          ref={mapRef}
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isMapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={isMapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find Us
            </motion.h2>
            <motion.p
              className="text-slate-600 dark:text-amber-200/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isMapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Visit our office or explore Christian artists in your area
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden shadow-xl border border-amber-200/20 dark:border-amber-800/20"
              initial={{ opacity: 0, y: 30 }}
              animate={isMapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Interactive Map */}
              <div className="absolute inset-0 bg-amber-100/10 dark:bg-amber-900/10">
                {/* This would be replaced with an actual map component in production */}
                <div className="relative w-full h-full overflow-hidden">
                  {/* Map Background */}
                  <div 
                    className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=1000')] bg-cover bg-center"
                    style={{
                      transform: `scale(${1 + (mapZoom - 10) * 0.1})`,
                      transformOrigin: '50% 50%',
                      transition: 'transform 0.5s ease-out'
                    }}
                  />
                  
                  {/* Map Overlay */}
                  <div className="absolute inset-0 bg-amber-800/10 backdrop-blur-[2px]"></div>
                  
                  {/* Map Pin */}
                  <motion.div 
                    className="absolute"
                    style={{ 
                      left: `calc(50% + ${(mapLocation.lng + 118.2437) * 100}px)`, 
                      top: `calc(50% - ${(mapLocation.lat - 34.0522) * 100}px)`,
                      zIndex: 10
                    }}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative">
                      <MapPin className="h-10 w-10 text-amber-600 drop-shadow-lg" />
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-6 h-6 bg-amber-600/20 rounded-full -translate-x-1/2 translate-y-1/2"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop"
                        }}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button 
                      size="sm" 
                      className="bg-white/80 hover:bg-white text-amber-800 backdrop-blur-sm rounded-full h-10 w-10 p-0"
                      onClick={() => setMapZoom(Math.min(mapZoom + 1, 20))}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-white/80 hover:bg-white text-amber-800 backdrop-blur-sm rounded-full h-10 w-10 p-0"
                      onClick={() => setMapZoom(Math.max(mapZoom - 1, 10))}
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-white/80 hover:bg-white text-amber-800 backdrop-blur-sm rounded-full h-10 w-10 p-0"
                      onClick={() => setIsEditingLocation(!isEditingLocation)}
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Map Attribution */}
                  <div className="absolute bottom-2 right-2 text-xs text-amber-800/70 bg-white/70 px-2 py-1 rounded-md backdrop-blur-sm">
                    Interactive Map • Redeemed Creative Arts
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-1 bg-white dark:bg-amber-900/20 rounded-2xl shadow-xl p-6 border border-amber-200/20 dark:border-amber-800/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={isMapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-200">Location Details</h3>
              
              {isEditingLocation ? (
                <form onSubmit={handleMapSearch} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="searchAddress" className="text-sm font-medium text-slate-600 dark:text-amber-200/80">
                      Search Address
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="searchAddress"
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}
                        placeholder="Enter address or location"
                        className="border-amber-200 dark:border-amber-700 focus:ring-amber-500"
                      />
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="latitude" className="text-sm font-medium text-slate-600 dark:text-amber-200/80">
                        Latitude
                      </label>
                      <Input
                        id="latitude"
                        value={mapLocation.lat.toFixed(6)}
                        onChange={(e) => setMapLocation({...mapLocation, lat: parseFloat(e.target.value) || 0})}
                        className="border-amber-200 dark:border-amber-700 focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="longitude" className="text-sm font-medium text-slate-600 dark:text-amber-200/80">
                        Longitude
                      </label>
                      <Input
                        id="longitude"
                        value={mapLocation.lng.toFixed(6)}
                        onChange={(e) => setMapLocation({...mapLocation, lng: parseFloat(e.target.value) || 0})}
                        className="border-amber-200 dark:border-amber-700 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    className="w-full bg-amber-600 hover:bg-amber-700 mt-2"
                    onClick={() => setIsEditingLocation(false)}
                  >
                    Save Location
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Our Address</h4>
                      <p className="text-slate-600 dark:text-amber-200/80">{mapLocation.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full">
                      <Navigation className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Coordinates</h4>
                      <p className="text-slate-600 dark:text-amber-200/80">
                        {mapLocation.lat.toFixed(6)}, {mapLocation.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      onClick={() => setIsEditingLocation(true)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Location
                    </Button>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/30"
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mt-8 pt-8 border-t border-amber-200/30 dark:border-amber-700/30">
                <h4 className="font-semibold text-lg mb-4 text-amber-800 dark:text-amber-200">Nearby Attractions</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-600 dark:text-amber-200/80">
                    <ChevronRight className="h-4 w-4 text-amber-600 mr-2" />
                    Creative Arts Museum (0.3 miles)
                  </li>
                  <li className="flex items-center text-slate-600 dark:text-amber-200/80">
                    <ChevronRight className="h-4 w-4 text-amber-600 mr-2" />
                    Faith Community Center (0.5 miles)
                  </li>
                  <li className="flex items-center text-slate-600 dark:text-amber-200/80">
                    <ChevronRight className="h-4 w-4 text-amber-600 mr-2" />
                    Inspiration Park (0.7 miles)
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          ref={faqRef}
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="text-slate-600 dark:text-amber-200/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Find answers to common questions about Redeemed Creative Arts
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-amber-900/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 dark:border-amber-800/30 hover:border-amber-200 dark:hover:border-amber-700/50"
                initial={{ opacity: 0, y: 30 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-3 flex items-start">
                  <span className="text-amber-600 dark:text-amber-400 mr-3 mt-1">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-amber-200/80 pl-8">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button
              variant="outline"
              className="border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/30"
            >
              View All FAQs
            </Button>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          ref={teamRef}
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              className="text-slate-600 dark:text-amber-200/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              The passionate people behind Redeemed Creative Arts
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-800/40 to-transparent opacity-90 flex flex-col justify-end p-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-amber-200 mb-3">{member.role}</p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          ref={testimonialsRef}
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              What People Are Saying
            </motion.h2>
            <motion.p
              className="text-slate-600 dark:text-amber-200/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Hear from our community of artists, patrons, and churches
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-amber-900/20 rounded-2xl p-8 shadow-lg relative overflow-hidden border border-amber-100 dark:border-amber-800/30"
                initial={{ opacity: 0, y: 30 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 right-0 -mt-6 -mr-6">
                  <div className="text-amber-100 dark:text-amber-900 opacity-20">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.5 8.5L6 11V13H9.5V19H4V13L9.5 8.5ZM19.5 8.5L16 11V13H19.5V19H14V13L19.5 8.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <p className="text-slate-600 dark:text-amber-200/80 mb-6 italic">"{testimonial.quote}"</p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-amber-300/70">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          ref={newsletterRef}
          className="relative overflow-hidden rounded-3xl mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isNewsletterInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-700/90 to-amber-900/90 mix-blend-multiply" />
            <motion.div
              className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center"
              animate={{
                scale: isNewsletterInView ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>

          <div className="relative p-10 md:p-16 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isNewsletterInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isNewsletterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Stay Connected
            </motion.h2>

            <motion.p
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isNewsletterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Subscribe to our newsletter for updates on new features, events, and inspiring stories from our community.
            </motion.p>

            {isSubscribed ? (
              <motion.div
                className="flex flex-col items-center justify-center py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/20"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  />
                  <CheckCircle className="h-16 w-16 text-white mb-4" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Thank You for Subscribing!</h3>
                <p className="text-white/80">You'll now receive updates about Redeemed Creative Arts.</p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isNewsletterInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Input
                  type="email"
                  placeholder="Your email address"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30"
                />
                <Button type="submit" className="bg-white text-amber-700 hover:bg-white/90 whitespace-nowrap group">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
