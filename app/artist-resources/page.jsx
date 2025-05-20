"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Download, ExternalLink, FileText, Filter, Lightbulb, Play, Search, Video, X, ChevronDown, ChevronRight, Bookmark, Star, Clock, Calendar, Users, Sparkles, Palette, Feather, Briefcase, GraduationCap, Heart } from 'lucide-react'
import ResourceCard from "./_components/ResourceCard"
// import ResourceCard from "@/components/ResourceCard" // Declare ResourceCard

// Sample resources data
const resources = [
  {
    id: 1,
    title: "Faith-Based Art: A Comprehensive Guide",
    type: "E-Book",
    category: "Guide",
    author: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A comprehensive guide to creating meaningful faith-based artwork that resonates with viewers and glorifies God.",
    downloadable: true,
    featured: true,
    date: "May 15, 2023",
    readTime: "45 min read"
  },
  {
    id: 2,
    title: "Color Theory for Christian Symbolism",
    type: "Tutorial",
    category: "Technique",
    author: "Michael Chen",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f87f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Learn how to use color theory to enhance Christian symbolism in your artwork and create more impactful visual messages.",
    downloadable: false,
    featured: true,
    date: "June 3, 2023",
    readTime: "30 min read"
  },
  {
    id: 3,
    title: "Biblical Narratives in Visual Art",
    type: "Video Course",
    category: "Inspiration",
    author: "Emma Wilson",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A video course exploring how to effectively translate biblical narratives into compelling visual art that engages viewers.",
    downloadable: false,
    featured: false,
    date: "April 22, 2023",
    readTime: "2 hours total"
  },
  {
    id: 4,
    title: "Marketing Your Christian Art Online",
    type: "Webinar",
    category: "Business",
    author: "David Martinez",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Learn effective strategies for marketing your faith-based artwork online while staying true to your values and mission.",
    downloadable: true,
    featured: false,
    date: "July 10, 2023",
    readTime: "90 min"
  },
  {
    id: 5,
    title: "Prophetic Art: Techniques and Approaches",
    type: "Workshop",
    category: "Technique",
    author: "Olivia Taylor",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Explore techniques and approaches for creating prophetic art that speaks to the heart and spirit of viewers.",
    downloadable: true,
    featured: true,
    date: "May 28, 2023",
    readTime: "3 hours total"
  },
  {
    id: 6,
    title: "Art as Ministry: Serving Through Creativity",
    type: "E-Book",
    category: "Ministry",
    author: "James Wilson",
    image: "https://images.unsplash.com/photo-1456086227500-b28b0645b729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Discover how to use your artistic gifts as a form of ministry and service to your community and church.",
    downloadable: true,
    featured: false,
    date: "June 15, 2023",
    readTime: "60 min read"
  },
  {
    id: 7,
    title: "Pricing Your Artwork: A Guide for Christian Artists",
    type: "Guide",
    category: "Business",
    author: "Sophia Lee",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A practical guide to pricing your artwork fairly while honoring your time, talent, and the value of your creative work.",
    downloadable: true,
    featured: false,
    date: "July 5, 2023",
    readTime: "40 min read"
  },
  {
    id: 8,
    title: "Sacred Geometry in Christian Art",
    type: "Tutorial",
    category: "Technique",
    author: "Noah Garcia",
    image: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Learn how to incorporate sacred geometry principles into your Christian artwork for added depth and meaning.",
    downloadable: false,
    featured: true,
    date: "April 30, 2023",
    readTime: "35 min read"
  },
  {
    id: 9,
    title: "Building a Portfolio as a Christian Artist",
    type: "Workshop",
    category: "Business",
    author: "Ava Robinson",
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A comprehensive workshop on building a cohesive portfolio that showcases your faith-based artwork effectively.",
    downloadable: true,
    featured: false,
    date: "June 22, 2023",
    readTime: "2.5 hours total"
  },
  {
    id: 10,
    title: "Digital Art for Ministry",
    type: "Video Course",
    category: "Technique",
    author: "Liam Johnson",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A beginner-friendly course on using digital tools to create impactful artwork for ministry and outreach.",
    downloadable: false,
    featured: false,
    date: "May 10, 2023",
    readTime: "4 hours total"
  }
]

// Categories for filtering
const categories = [
  "All",
  "Guide",
  "Technique",
  "Inspiration",
  "Business",
  "Ministry"
]

// Resource types for filtering
const resourceTypes = [
  "All Types",
  "E-Book",
  "Tutorial",
  "Video Course",
  "Webinar",
  "Workshop",
  "Guide"
]

export default function ArtistResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All Types")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false)
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [expandedFAQs, setExpandedFAQs] = useState([])
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorHovered, setCursorHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  
  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    
    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isMobile])
  
  // Parallax scroll effect for hero section
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0])
  
  // Filter resources based on category, type, and search
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
    const matchesType = selectedType === "All Types" || resource.type === selectedType
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })
  
  // Get featured resources
  const featuredResources = resources.filter(resource => resource.featured)
  
  // Toggle FAQ expansion
  const toggleFAQ = (id) => {
    setExpandedFAQs(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }
  
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
        staggerChildren: 0.1,
      },
    },
  }

  const resourceCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5 
      } 
    },
    hover: { 
      y: -10,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }
  
  const filterItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  }
  
  const tabVariants = {
    inactive: { 
      color: "var(--muted-foreground)",
      borderColor: "transparent" 
    },
    active: { 
      color: "var(--foreground)",
      borderColor: "var(--primary)" 
    }
  }
  
  const faqVariants = {
    closed: { height: "auto" },
    open: { height: "auto" }
  }
  
  const faqContentVariants = {
    closed: { opacity: 0, height: 0 },
    open: { 
      opacity: 1, 
      height: "auto",
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  }
  
  // Word-by-word animation
  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.3
      }
    })
  }
  
  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={wordAnimation}
        className="inline-block mr-1"
      >
        {word}
      </motion.span>
    ))
  }
  
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I access downloadable resources?",
      answer: "After clicking on a downloadable resource, you'll be prompted to log in to your account. Once logged in, you can download the resource directly to your device. All downloads are tracked in your account dashboard for easy access later."
    },
    {
      id: 2,
      question: "Can I contribute my own resources to the platform?",
      answer: "Yes! We welcome contributions from our community members. To submit a resource, go to your dashboard and select 'Submit Resource.' Your submission will be reviewed by our team, and if approved, it will be published on the platform with proper attribution."
    },
    {
      id: 3,
      question: "Are all resources free to access?",
      answer: "Most resources are free for registered users. Some premium resources may require a subscription or one-time purchase. Free and premium resources are clearly marked on the platform."
    },
    {
      id: 4,
      question: "How often are new resources added?",
      answer: "We add new resources weekly. Subscribe to our newsletter to stay updated on the latest additions to our resource library."
    },
    {
      id: 5,
      question: "Can I request specific resources or topics?",
      answer: "We value your input. Use the 'Resource Request' form in your dashboard to suggest topics or specific resources you'd like to see added to the platform."
    }
  ]
  
  // Upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Faith & Art Webinar Series",
      date: "June 15, 2023",
      time: "7:00 PM EST",
      host: "Dr. Sarah Johnson",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Digital Art Workshop for Beginners",
      date: "June 22, 2023",
      time: "2:00 PM EST",
      host: "Michael Chen",
      image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Art Business Masterclass",
      date: "July 5, 2023",
      time: "6:30 PM EST",
      host: "Sophia Lee",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/95 pt-24 pb-20 overflow-hidden">
      {/* Custom cursor (desktop only) */}
      {!isMobile && (
        <motion.div 
          className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:flex items-center justify-center"
          animate={{
            x: cursorPosition.x - 16,
            y: cursorPosition.y - 16,
            scale: cursorHovered ? 1.5 : 1,
            opacity: cursorHovered ? 1 : 0.5,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
        >
          <motion.div 
            className="w-full h-full rounded-full bg-white"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
      
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative h-[60vh] overflow-hidden mb-16"
        style={{ opacity: heroOpacity }}
      >
        {/* Background image with parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <Image
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Art resources"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </motion.div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background z-10"></div>
        
        {/* Hero content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="text-center max-w-4xl"
          >
            <motion.div 
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-4 rounded-full">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 z-[-1]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.2, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-6xl font-bold mb-6 text-white"
              variants={fadeInUpVariants}
            >
              {splitText("Artist Resources")}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-200 mb-8"
              variants={fadeInUpVariants}
            >
              {splitText("Discover tools, guides, and educational materials to help you grow as a Christian artist and expand your creative ministry.")}
            </motion.p>
            
            <motion.div
              variants={fadeInUpVariants}
              className="flex flex-wrap gap-4 justify-center"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Lightbulb className="mr-2 h-4 w-4" /> Explore Resources
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
              >
                <span className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" /> View Upcoming Events
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-white/70" />
        </motion.div>
      </motion.div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Tabs */}
        <motion.div 
          className="mb-12 border-b border-border"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          <div className="flex overflow-x-auto hide-scrollbar">
            <motion.button
              className={`px-6 py-3 font-medium text-base border-b-2 transition-colors ${activeTab === 'all' ? 'border-teal-500 text-foreground' : 'border-transparent text-muted-foreground'}`}
              onClick={() => setActiveTab('all')}
              variants={tabVariants}
              animate={activeTab === 'all' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <span className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" /> All Resources
              </span>
            </motion.button>
            
            <motion.button
              className={`px-6 py-3 font-medium text-base border-b-2 transition-colors ${activeTab === 'featured' ? 'border-teal-500 text-foreground' : 'border-transparent text-muted-foreground'}`}
              onClick={() => setActiveTab('featured')}
              variants={tabVariants}
              animate={activeTab === 'featured' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <span className="flex items-center">
                <Star className="mr-2 h-4 w-4" /> Featured
              </span>
            </motion.button>
            
            <motion.button
              className={`px-6 py-3 font-medium text-base border-b-2 transition-colors ${activeTab === 'downloadable' ? 'border-teal-500 text-foreground' : 'border-transparent text-muted-foreground'}`}
              onClick={() => setActiveTab('downloadable')}
              variants={tabVariants}
              animate={activeTab === 'downloadable' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <span className="flex items-center">
                <Download className="mr-2 h-4 w-4" /> Downloadable
              </span>
            </motion.button>
            
            <motion.button
              className={`px-6 py-3 font-medium text-base border-b-2 transition-colors ${activeTab === 'events' ? 'border-teal-500 text-foreground' : 'border-transparent text-muted-foreground'}`}
              onClick={() => setActiveTab('events')}
              variants={tabVariants}
              animate={activeTab === 'events' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <span className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> Upcoming Events
              </span>
            </motion.button>
            
            <motion.button
              className={`px-6 py-3 font-medium text-base border-b-2 transition-colors ${activeTab === 'faq' ? 'border-teal-500 text-foreground' : 'border-transparent text-muted-foreground'}`}
              onClick={() => setActiveTab('faq')}
              variants={tabVariants}
              animate={activeTab === 'faq' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <span className="flex items-center">
                <Lightbulb className="mr-2 h-4 w-4" /> FAQ
              </span>
            </motion.button>
          </div>
        </motion.div>
        
        {/* Search and Filter (only show for resources tabs) */}
        {(activeTab === 'all' || activeTab === 'featured' || activeTab === 'downloadable') && (
          <motion.div 
            className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            {/* Search */}
            <motion.div 
              className="relative w-full md:w-96"
              variants={fadeInUpVariants}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-3 rounded-full bg-card border border-border focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </motion.div>
            
            <div className="flex gap-4 w-full md:w-auto">
              {/* Category Filter */}
              <motion.div 
                className="relative w-full md:w-auto"
                variants={fadeInUpVariants}
              >
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto flex items-center gap-2"
                  onClick={() => {
                    setIsCategoryFilterOpen(!isCategoryFilterOpen)
                    setIsTypeFilterOpen(false)
                  }}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <Filter className="h-4 w-4" />
                  {selectedCategory}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryFilterOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                <AnimatePresence>
                  {isCategoryFilterOpen && (
                    <motion.div 
                      className="absolute left-0 right-0 md:left-auto md:right-0 mt-2 w-full md:w-64 rounded-lg bg-card border border-border shadow-lg z-30 overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-2">
                        {categories.map((category, index) => (
                          <motion.button
                            key={category}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                              selectedCategory === category 
                                ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-500' 
                                : 'hover:bg-muted'
                            }`}
                            onClick={() => {
                              setSelectedCategory(category)
                              setIsCategoryFilterOpen(false)
                            }}
                            variants={filterItemVariants}
                            whileHover="hover"
                            whileTap="tap"
                            custom={index}
                            onMouseEnter={() => setCursorHovered(true)}
                            onMouseLeave={() => setCursorHovered(false)}
                          >
                            {category}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Type Filter */}
              <motion.div 
                className="relative w-full md:w-auto"
                variants={fadeInUpVariants}
              >
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto flex items-center gap-2"
                  onClick={() => {
                    setIsTypeFilterOpen(!isTypeFilterOpen)
                    setIsCategoryFilterOpen(false)
                  }}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  <FileText className="h-4 w-4" />
                  {selectedType}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isTypeFilterOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                <AnimatePresence>
                  {isTypeFilterOpen && (
                    <motion.div 
                      className="absolute left-0 right-0 md:left-auto md:right-0 mt-2 w-full md:w-64 rounded-lg bg-card border border-border shadow-lg z-30 overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-2">
                        {resourceTypes.map((type, index) => (
                          <motion.button
                            key={type}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                              selectedType === type 
                                ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-500' 
                                : 'hover:bg-muted'
                            }`}
                            onClick={() => {
                              setSelectedType(type)
                              setIsTypeFilterOpen(false)
                            }}
                            variants={filterItemVariants}
                            whileHover="hover"
                            whileTap="tap"
                            custom={index}
                            onMouseEnter={() => setCursorHovered(true)}
                            onMouseLeave={() => setCursorHovered(false)}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* All Resources Tab */}
        {activeTab === 'all' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="mb-16"
          >
            {filteredResources.length === 0 ? (
              <motion.div 
                className="text-center py-16"
                variants={fadeInUpVariants}
              >
                <div className="mb-4">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">No resources found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainerVariants}
              >
                {filteredResources.map((resource) => (
                  <ResourceCard 
                    key={resource.id}
                    resource={resource}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
        
        {/* Featured Resources Tab */}
        {activeTab === 'featured' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="mb-16"
          >
            {filteredResources.filter(r => r.featured).length === 0 ? (
              <motion.div 
                className="text-center py-16"
                variants={fadeInUpVariants}
              >
                <div className="mb-4">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">No featured resources found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainerVariants}
              >
                {filteredResources.filter(r => r.featured).map((resource) => (
                  <ResourceCard 
                    key={resource.id}
                    resource={resource}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
        
        {/* Downloadable Resources Tab */}
        {activeTab === 'downloadable' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="mb-16"
          >
            {filteredResources.filter(r => r.downloadable).length === 0 ? (
              <motion.div 
                className="text-center py-16"
                variants={fadeInUpVariants}
              >
                <div className="mb-4">
                  <Download className="h-12 w-12 text-muted-foreground mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">No downloadable resources found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainerVariants}
              >
                {filteredResources.filter(r => r.downloadable).map((resource) => (
                  <ResourceCard 
                    key={resource.id}
                    resource={resource}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
        
        {/* Upcoming Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="mb-16"
          >
            {upcomingEvents.length === 0 ? (
              <motion.div 
                className="text-center py-16"
                variants={fadeInUpVariants}
              >
                <div className="mb-4">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">No upcoming events found</h3>
                <p className="text-muted-foreground">Stay tuned for future events</p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainerVariants}
              >
                {upcomingEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    className="bg-card p-6 rounded-lg shadow-md"
                    variants={resourceCardVariants}
                    whileHover="hover"
                  >
                    <div className="mb-4">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={300}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      <span className="mr-2"><Calendar className="inline-block mr-1 h-4 w-4" /> {event.date}</span>
                      <span><Clock className="inline-block mr-1 h-4 w-4" /> {event.time}</span>
                    </p>
                    <p className="text-base mb-6">{event.description}</p>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
                    >
                      <span className="flex items-center">
                        <Play className="mr-2 h-4 w-4" /> Register Now
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
        
        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="mb-16"
          >
            {faqs.map((faq) => (
              <motion.div 
                key={faq.id}
                className="bg-card p-6 rounded-lg shadow-md mb-6"
                variants={faqVariants}
                initial="closed"
                animate={expandedFAQs.includes(faq.id) ? "open" : "closed"}
              >
                <motion.h3 
                  className="text-xl font-medium mb-4 cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                  variants={faqContentVariants}
                  initial="closed"
                  animate={expandedFAQs.includes(faq.id) ? "open" : "closed"}
                >
                  {faq.question}
                </motion.h3>
                <motion.div 
                  className="text-base text-muted-foreground"
                  variants={faqContentVariants}
                  initial="closed"
                  animate={expandedFAQs.includes(faq.id) ? "open" : "closed"}
                >
                  {faq.answer}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
