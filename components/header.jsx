"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/hooks/useAuth"
import {
  Menu,
  X,
  ChevronDown,
  Palette,
  Heart,
  Church,
  LogIn,
  UserPlus,
  ArrowRight,
  Info,
  Phone,
  ShoppingCart,
  BookOpen,
  DollarSign,
  Gift,
  Home,
  Grid,
  Star,
  Trophy,
  User,
  Settings,
  LogOut,
  Crown,
  Shield,
  Zap,
  Bell,
  ChevronRight,
  Award,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [pointsMenuOpen, setPointsMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [loadingNotifications, setLoadingNotifications] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()
  const headerRef = useRef(null)
  const [clickOutsideEnabled, setClickOutsideEnabled] = useState(false)
  const [notificationLoading, setNotificationLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Get auth state
  const { user, loading, logout } = useAuth()

  // Helper function to safely get points value
  const getUserPoints = (user) => {
    if (!user?.points) return 0
    if (typeof user.points === "number") return user.points
    if (typeof user.points === "object") return user.points.current || 0
    return 0
  }

  // Helper function to get user level
  const getUserLevel = (user) => {
    if (!user?.points) return "bronze"
    if (typeof user.points === "object" && user.points.level) return user.points.level

    const points = getUserPoints(user)
    if (points >= 10000) return "diamond"
    if (points >= 5000) return "platinum"
    if (points >= 2000) return "gold"
    if (points >= 500) return "silver"
    return "bronze"
  }

  // Get level color and icon
  const getLevelInfo = (level) => {
    switch (level) {
      case "diamond":
        return { color: "from-cyan-400 to-blue-400", icon: Crown, name: "Diamond" }
      case "platinum":
        return { color: "from-gray-400 to-gray-600", icon: Crown, name: "Platinum" }
      case "gold":
        return { color: "from-yellow-400 to-orange-400", icon: Award, name: "Gold" }
      case "silver":
        return { color: "from-gray-300 to-gray-400", icon: Star, name: "Silver" }
      default:
        return { color: "from-orange-400 to-red-400", icon: Shield, name: "Bronze" }
    }
  }

  // Calculate progress to next level
  const getProgressToNextLevel = (points) => {
    if (points >= 10000) return { progress: 100, nextLevel: "Max Level", pointsNeeded: 0 }
    if (points >= 5000)
      return { progress: ((points - 5000) / 5000) * 100, nextLevel: "Diamond", pointsNeeded: 10000 - points }
    if (points >= 2000)
      return { progress: ((points - 2000) / 3000) * 100, nextLevel: "Platinum", pointsNeeded: 5000 - points }
    if (points >= 500)
      return { progress: ((points - 500) / 1500) * 100, nextLevel: "Gold", pointsNeeded: 2000 - points }
    return { progress: (points / 500) * 100, nextLevel: "Silver", pointsNeeded: 500 - points }
  }

  const fetchNotifications = async () => {
    if (!user) return

    setNotificationLoading(true)
    try {
      const response = await fetch("/api/notifications", {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications || [])
        setUnreadCount(data.notifications?.filter((n) => !n.isRead).length || 0)
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    } finally {
      setNotificationLoading(false)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: "PATCH",
        credentials: "include",
      })

      if (response.ok) {
        setNotifications((prev) => prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n)))
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const currentPoints = getUserPoints(user)
  const currentLevel = getUserLevel(user)
  const levelInfo = getLevelInfo(currentLevel)
  const LevelIcon = levelInfo.icon

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/artist-gallery" },
    { name: "About", href: "/about" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ]

  // Fetch notifications from database
  // const fetchNotifications = async () => {
  //   if (!user) return

  //   setLoadingNotifications(true)
  //   try {
  //     const response = await fetch("/api/notifications?limit=5", {
  //       credentials: "include",
  //     })
  //     if (response.ok) {
  //       const data = await response.json()
  //       setNotifications(data.notifications || [])
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch notifications:", error)
  //   } finally {
  //     setLoadingNotifications(false)
  //   }
  // }

  // Fetch notifications when user is available
  // useEffect(() => {
  //   if (user) {
  //     fetchNotifications()
  //   }
  // }, [user])

  // const unreadCount = notifications.filter((n) => !n.isRead).length

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / scrollHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setUserMenuOpen(false)
    setPointsMenuOpen(false)
    setNotificationsOpen(false)
  }, [pathname])

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target) && clickOutsideEnabled) {
        setOpenDropdown(null)
        setUserMenuOpen(false)
        setPointsMenuOpen(false)
        setNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [clickOutsideEnabled])

  // Main navigation structure
  const mainNavLinks = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: "Gallery",
      href: "/artist-gallery",
      icon: <Grid className="h-4 w-4" />,
    },
    {
      name: "Discover",
      icon: <Grid className="h-4 w-4" />,
      megaMenu: true,
      sections: [
        {
          title: "About Us",
          icon: <Info className="h-5 w-5 text-amber-500" />,
          links: [
            { name: "Our Mission", href: "/mission" },
            { name: "Our Vision", href: "/vision" },
            { name: "Core Values", href: "/core-values" },
            { name: "Our Team", href: "/about-team" },
            { name: "Membership", href: "/membership" },
          ],
        },
        {
          title: "For Artists",
          icon: <Palette className="h-5 w-5 text-amber-500" />,
          links: [
            { name: "Artist Information", href: "/artist-info" },
            { name: "Artist Disclaimer", href: "/artist-disclaimer" },
            { name: "Artist Gallery", href: "/artist-gallery" },
            { name: "Artist Resources", href: "/artist-resources" },
            { name: "Success Stories", href: "/artist-success-stories" },
          ],
        },
        {
          title: "For Patrons",
          icon: <Heart className="h-5 w-5 text-amber-500" />,
          links: [
            { name: "Patron Information", href: "/patron-info" },
            { name: "Helper Agreement", href: "/helper-agreement" },
            { name: "Support an Artist", href: "/support-artist" },
            { name: "Patron Benefits", href: "/patron-benefits" },
            { name: "Patron Stories", href: "/patron-stories" },
          ],
        },
        {
          title: "For Churches",
          icon: <Church className="h-5 w-5 text-amber-500" />,
          links: [
            { name: "Church Information", href: "/church-info" },
            { name: "Ministry Opportunities", href: "/ministry-opportunities" },
            { name: "Event Hosting", href: "/event-hosting" },
            { name: "Church Resources", href: "/church-resources" },
          ],
        },
      ],
    },
    {
      name: "Shop",
      href: "/shop",
      icon: <ShoppingCart className="h-4 w-4" />,
      dropdown: [
        { name: "All Products", href: "/shop" },
        { name: "Original Artwork", href: "/shop/original" },
        { name: "Prints", href: "/shop/prints" },
        { name: "Merchandise", href: "/shop/merchandise" },
        { name: "Gift Cards", href: "/shop/gift-cards" },
      ],
    },
    {
      name: "Courses",
      href: "/courses",
      icon: <BookOpen className="h-4 w-4" />,
      dropdown: [
        { name: "All Courses", href: "/courses" },
        { name: "For Artists", href: "/courses/artists" },
        { name: "For Churches", href: "/courses/churches" },
        { name: "Workshops", href: "/courses/workshops" },
        { name: "Webinars", href: "/courses/webinars" },
      ],
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <Phone className="h-4 w-4" />,
    },
  ]

  const [openDropdown, setOpenDropdown] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)

  const handleDropdownToggle = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(index)
      setClickOutsideEnabled(true)
    }
  }

  // Get user level and badge based on points
  const getUserLevelBadge = (pointsObj) => {
    // Handle both old number format and new object format
    let userPoints = 0
    if (typeof pointsObj === "object" && pointsObj !== null) {
      userPoints = pointsObj.current || pointsObj.total || 0
    } else if (typeof pointsObj === "number") {
      userPoints = pointsObj
    }

    if (userPoints >= 10000)
      return { level: "Diamond", color: "from-blue-400 to-purple-500", icon: <Crown className="h-4 w-4" /> }
    if (userPoints >= 5000)
      return { level: "Platinum", color: "from-gray-300 to-gray-500", icon: <Trophy className="h-4 w-4" /> }
    if (userPoints >= 2000)
      return { level: "Gold", color: "from-yellow-400 to-orange-500", icon: <Star className="h-4 w-4" /> }
    if (userPoints >= 500)
      return { level: "Silver", color: "from-gray-200 to-gray-400", icon: <Zap className="h-4 w-4" /> }
    return { level: "Bronze", color: "from-orange-300 to-orange-600", icon: <Shield className="h-4 w-4" /> }
  }

  const userLevel = user ? getUserLevelBadge(user.points) : null

  // Get actual points value from database structure
  const getUserPointsValue = (pointsObj) => {
    if (typeof pointsObj === "object" && pointsObj !== null) {
      return pointsObj.current || pointsObj.total || 0
    } else if (typeof pointsObj === "number") {
      return pointsObj
    }
    return 0
  }

  const userPoints = user ? getUserPointsValue(user.points) : 0

  const getNextLevelThreshold = (points) => {
    if (points < 500) return 500
    if (points < 2000) return 2000
    if (points < 5000) return 5000
    if (points < 10000) return 10000
    return 20000 // Next tier after Diamond
  }

  // Mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          notificationId,
          action: "markRead",
        }),
      })
      // Refresh notifications
      fetchNotifications()
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  // Animation variants
  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
  }

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1 + i * 0.1 },
    }),
    hover: { y: -3, transition: { duration: 0.3, ease: "easeOut" } },
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: { duration: 0.2 },
    },
  }

  const megaMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  }

  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
    hover: { x: 5, transition: { duration: 0.2 } },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 + i * 0.1 },
    }),
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  }

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="animate-pulse bg-gray-200 h-8 w-48 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg py-2" : "bg-white/90 backdrop-blur-md py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={logoVariants}
              className="relative z-10"
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2.5 rounded-xl transition-all duration-500 group-hover:shadow-lg group-hover:shadow-amber-500/25">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 z-[-1]"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Redeemed
                  </span>
                  <span className="text-xs text-gray-600 font-medium">Creative Arts</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {mainNavLinks.map((link, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  custom={index}
                  variants={navItemVariants}
                  onHoverStart={() => setHoveredItem(index)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  {link.megaMenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(index)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-300 ${
                          openDropdown === index
                            ? "text-amber-600 bg-amber-50"
                            : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.icon}
                          {link.name}
                        </span>
                        <motion.div
                          animate={{ rotate: openDropdown === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-1"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>

                      {/* Hover indicator */}
                      {hoveredItem === index && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          layoutId="navIndicator"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "100%" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      <AnimatePresence>
                        {openDropdown === index && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={megaMenuVariants}
                            className="absolute left-1/2 -translate-x-1/2 mt-4 ml-20 w-[800px] rounded-2xl shadow-2xl bg-white ring-1 ring-black/5 z-50 overflow-hidden border border-gray-100"
                          >
                            <div className="grid grid-cols-4 gap-0 p-8">
                              {link.sections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="space-y-4">
                                  <div className="flex items-center gap-3 mb-4">
                                    {section.icon}
                                    <h3 className="font-semibold text-gray-800">{section.title}</h3>
                                  </div>
                                  <ul className="space-y-3">
                                    {section.links.map((subLink, subLinkIndex) => (
                                      <motion.li key={subLinkIndex} variants={dropdownItemVariants} whileHover="hover">
                                        <Link
                                          href={subLink.href}
                                          className={`flex items-center justify-between text-sm ${
                                            pathname === subLink.href
                                              ? "text-amber-600 font-medium"
                                              : "text-gray-600 hover:text-amber-600"
                                          } transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-amber-50`}
                                          onClick={() => setOpenDropdown(null)}
                                        >
                                          {subLink.name}
                                          <motion.div
                                            initial={{ opacity: 0, x: -5 }}
                                            whileHover={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2 }}
                                          >
                                            <ArrowRight className="h-3 w-3" />
                                          </motion.div>
                                        </Link>
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 flex justify-between items-center border-t border-gray-100">
                              <p className="text-sm text-gray-600">Discover all our resources and opportunities</p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-amber-600 border-amber-300 hover:bg-amber-600 hover:text-white transition-all duration-300 bg-transparent"
                              >
                                View All
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : link.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(index)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-300 ${
                          pathname === link.href || openDropdown === index
                            ? "text-amber-600 bg-amber-50"
                            : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.icon}
                          {link.name}
                        </span>
                        <motion.div
                          animate={{ rotate: openDropdown === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-1"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>

                      {/* Hover indicator */}
                      {hoveredItem === index && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          layoutId="navIndicator"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "100%" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      <AnimatePresence>
                        {openDropdown === index && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="absolute left-0 mt-2 w-64 rounded-xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden border border-gray-100"
                          >
                            <div className="py-2">
                              {link.dropdown.map((dropdownItem, dropdownIndex) => (
                                <motion.div key={dropdownIndex} variants={dropdownItemVariants} whileHover="hover">
                                  <Link
                                    href={dropdownItem.href}
                                    className={`flex items-center justify-between px-4 py-3 text-sm ${
                                      pathname === dropdownItem.href
                                        ? "text-amber-600 bg-amber-50 font-medium"
                                        : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                                    } transition-colors duration-300`}
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {dropdownItem.name}
                                    <motion.div
                                      initial={{ opacity: 0, x: -5 }}
                                      whileHover={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ArrowRight className="h-3 w-3" />
                                    </motion.div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="relative">
                      <Link
                        href={link.href}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${
                          pathname === link.href
                            ? "text-amber-600 bg-amber-50 font-semibold"
                            : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                        }`}
                      >
                        {link.icon}
                        {link.name}
                      </Link>

                      {/* Hover indicator */}
                      {hoveredItem === index && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          layoutId="navIndicator"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "100%" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <>
                  {/* Points Display Button */}
                  <motion.div
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    custom={0}
                    variants={buttonVariants}
                    className="relative"
                  >
                    <button
                      onClick={() => {
                        setPointsMenuOpen(!pointsMenuOpen)
                        setUserMenuOpen(false)
                        setNotificationsOpen(false)
                        setOpenDropdown(null)
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                        pointsMenuOpen ? "bg-amber-50 shadow-md" : "hover:bg-amber-50"
                      }`}
                    >
                      <div className={`bg-gradient-to-r ${userLevel?.color} p-1.5 rounded-full`}>
                        <div className="text-white">{userLevel?.icon}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-amber-600">{userPoints?.toLocaleString()}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${pointsMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {pointsMenuOpen && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          className="absolute right-0 mt-2 w-80 rounded-xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden border border-gray-100"
                        >
                          <div className="p-6">
                            <div className="text-center mb-6">
                              <div
                                className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${userLevel?.color} p-0.5 rounded-full`}
                              >
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                  <div className={`bg-gradient-to-br ${userLevel?.color} p-3 rounded-full`}>
                                    <div className="text-white">{userLevel?.icon}</div>
                                  </div>
                                </div>
                              </div>
                              <h3 className="text-xl font-bold text-gray-800">{userLevel?.level} Member</h3>
                              <div className="flex items-center justify-center space-x-2 mt-2">
                                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                                <span className="text-2xl font-bold text-amber-600">
                                  {userPoints?.toLocaleString()}
                                </span>
                                <span className="text-gray-500">points</span>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Next Level Progress</h4>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`bg-gradient-to-r ${userLevel?.color} h-2 rounded-full transition-all duration-500`}
                                    style={{
                                      width: `${Math.min(100, ((userPoints % 2000) / 2000) * 100)}%`,
                                    }}
                                  ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                  {Math.max(0, getNextLevelThreshold(userPoints) - userPoints)} points to next level
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-600">This Month</p>
                                  <p className="text-lg font-bold text-gray-800">+245</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-600">Rank</p>
                                  <p className="text-lg font-bold text-gray-800">#42</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="border-t border-gray-100 p-4">
                            <Link href="/points-history" onClick={() => setPointsMenuOpen(false)}>
                              <Button variant="ghost" size="sm" className="w-full text-amber-600 hover:bg-amber-50">
                                View Points History
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Notifications */}
                  <motion.div
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    custom={1}
                    variants={buttonVariants}
                    className="relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-full relative"
                      onClick={() => {
                        setNotificationsOpen(!notificationsOpen)
                        setUserMenuOpen(false)
                        setPointsMenuOpen(false)
                        setOpenDropdown(null)
                        if (!notificationsOpen) {
                          fetchNotifications()
                        }
                      }}
                    >
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                          {unreadCount}
                        </span>
                      )}
                    </Button>

                    <AnimatePresence>
                      {notificationsOpen && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          className="absolute right-0 mt-2 w-80 rounded-xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden border border-gray-100"
                        >
                          <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-800">Notifications</h3>
                              {unreadCount > 0 && (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                  {unreadCount} new
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {loadingNotifications ? (
                              <div className="p-4 text-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500 mx-auto"></div>
                                <p className="text-sm text-gray-500 mt-2">Loading notifications...</p>
                              </div>
                            ) : notifications.length > 0 ? (
                              notifications.map((notification) => (
                                <div
                                  key={notification._id}
                                  className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                                    !notification.isRead ? "bg-amber-50/50" : ""
                                  }`}
                                  onClick={() => {
                                    if (!notification.isRead) {
                                      markNotificationAsRead(notification._id)
                                    }
                                  }}
                                >
                                  <div className="flex items-start space-x-3">
                                    <div
                                      className={`w-2 h-2 rounded-full mt-2 ${!notification.isRead ? "bg-amber-500" : "bg-gray-300"}`}
                                    ></div>
                                    <div className="flex-1">
                                      <p className="text-sm text-gray-800">{notification.message}</p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {new Date(notification.createdAt).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="p-8 text-center">
                                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">No notifications yet</p>
                              </div>
                            )}
                          </div>
                          {notifications.length > 0 && (
                            <div className="p-3 border-t border-gray-100">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-amber-600 hover:bg-amber-50"
                                onClick={() => setNotificationsOpen(false)}
                              >
                                <Link href="/notifications">View All Notifications</Link>
                              </Button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Donate Button */}
                  <motion.div
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    custom={2}
                    variants={buttonVariants}
                    className="relative"
                  >
                    <Link href="/donate">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 relative overflow-hidden group font-semibold rounded-full px-6"
                      >
                        <span className="relative z-10 flex items-center">
                          <Gift className="h-4 w-4 mr-2" />
                          Donate
                        </span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"
                          initial={{ x: "100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </Button>
                    </Link>
                  </motion.div>

                  {/* User Avatar & Menu */}
                  <motion.div
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    custom={3}
                    variants={buttonVariants}
                    className="relative"
                  >
                    <button
                      onClick={() => {
                        setUserMenuOpen(!userMenuOpen)
                        setNotificationsOpen(false)
                        setPointsMenuOpen(false)
                        setOpenDropdown(null)
                      }}
                      className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-50 transition-colors duration-300"
                    >
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${userLevel?.color} p-0.5`}>
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            {user.userType === "admin" ? (
                              <Crown className="h-5 w-5 text-purple-600" />
                            ) : (
                              <User className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                        </div>
                        {user.userType === "admin" && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                            <Crown className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="hidden xl:block text-left">
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.userType}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden border border-gray-100"
                        >
                          <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${userLevel?.color} p-0.5`}>
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                  {user.userType === "admin" ? (
                                    <Crown className="h-6 w-6 text-purple-600" />
                                  ) : (
                                    <User className="h-6 w-6 text-gray-600" />
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${userLevel?.color} text-white font-medium`}
                                  >
                                    {userLevel?.level}
                                  </span>
                                  {user.userType === "admin" && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
                                      Admin
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="py-2">
                            <Link
                              href={`/dashboard/${user.userType}`}
                              className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <span className="flex items-center">
                                <Grid className="h-4 w-4 mr-3" />
                                Dashboard
                              </span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>

                            <Link
                              href="/profile"
                              className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <span className="flex items-center">
                                <User className="h-4 w-4 mr-3" />
                                Profile
                              </span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>

                            <Link
                              href="/settings"
                              className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <span className="flex items-center">
                                <Settings className="h-4 w-4 mr-3" />
                                Settings
                              </span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </div>

                          <div className="border-t border-gray-100 py-2">
                            <button
                              onClick={() => {
                                logout()
                                setUserMenuOpen(false)
                              }}
                              className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="h-4 w-4 mr-3" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Donate Button for Non-logged in users */}
                  <motion.div
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    custom={1}
                    variants={buttonVariants}
                    className="relative"
                  >
                    <Link href="/donate">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 relative overflow-hidden group font-semibold rounded-full px-6"
                      >
                        <span className="relative z-10 flex items-center">
                          <Gift className="h-4 w-4 mr-2" />
                          Donate
                        </span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"
                          initial={{ x: "100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    custom={2}
                    variants={buttonVariants}
                  >
                    <Link href="/login">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 rounded-full px-6 bg-transparent"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Log in
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    custom={3}
                    variants={buttonVariants}
                  >
                    <Link href="/register">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 relative overflow-hidden group rounded-full px-6"
                      >
                        <span className="relative z-10 flex items-center">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Sign up
                        </span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800"
                          initial={{ x: "100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </Button>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Points Display */}
              {user && (
                <button
                  onClick={() => {
                    setPointsMenuOpen(!pointsMenuOpen)
                    setUserMenuOpen(false)
                    setNotificationsOpen(false)
                  }}
                  className={`bg-gradient-to-r ${userLevel?.color} p-0.5 rounded-full`}
                >
                  <div className="bg-white px-3 py-1 rounded-full flex items-center space-x-2">
                    <div className={`bg-gradient-to-r ${userLevel?.color} p-1 rounded-full`}>
                      <div className="text-white">{userLevel?.icon}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-amber-600">{userPoints?.toLocaleString()}</span>
                    </div>
                  </div>
                </button>
              )}

              {!user && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link href="/donate">
                    <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                      <Gift className="h-4 w-4 mr-1.5" />
                      Donate
                    </Button>
                  </Link>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-full"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 overflow-hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-6">
                {/* Mobile User Info */}
                {user && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${userLevel?.color} p-0.5`}>
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          {user.userType === "admin" ? (
                            <Crown className="h-6 w-6 text-purple-600" />
                          ) : (
                            <User className="h-6 w-6 text-gray-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600 capitalize">{user.userType}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${userLevel?.color} text-white font-medium`}
                          >
                            {userLevel?.level}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-amber-600">{userPoints?.toLocaleString()} pts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <nav className="flex flex-col space-y-2">
                  {mainNavLinks.map((link, index) => (
                    <motion.div key={index} variants={navItemVariants} custom={index} className="overflow-hidden">
                      {link.megaMenu ? (
                        <div>
                          <button
                            onClick={() => handleDropdownToggle(index)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between ${
                              openDropdown === index
                                ? "text-amber-600 bg-amber-50"
                                : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                            } transition-colors duration-300`}
                          >
                            <span className="flex items-center gap-3">
                              {link.icon}
                              {link.name}
                            </span>
                            <motion.div
                              animate={{
                                rotate: openDropdown === index ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {openDropdown === index && (
                              <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={dropdownVariants}
                                className="pl-8 mt-2 border-l-2 border-amber-500/20 ml-6 overflow-hidden"
                              >
                                {link.sections.map((section, sectionIndex) => (
                                  <div key={sectionIndex} className="mb-4">
                                    <div className="flex items-center gap-2 mb-3 mt-4">
                                      {section.icon}
                                      <h3 className="font-semibold text-gray-800 text-sm">{section.title}</h3>
                                    </div>
                                    {section.links.map((subLink, subLinkIndex) => (
                                      <motion.div key={subLinkIndex} variants={dropdownItemVariants} whileHover="hover">
                                        <Link
                                          href={subLink.href}
                                          className={`flex items-center justify-between px-4 py-2 text-sm rounded-lg ${
                                            pathname === subLink.href
                                              ? "text-amber-600 bg-amber-50 font-medium"
                                              : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                                          } transition-colors duration-300`}
                                        >
                                          {subLink.name}
                                          <motion.div
                                            initial={{ opacity: 0, x: -5 }}
                                            whileHover={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2 }}
                                          >
                                            <ArrowRight className="h-3 w-3" />
                                          </motion.div>
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : link.dropdown ? (
                        <div>
                          <button
                            onClick={() => handleDropdownToggle(index)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between ${
                              pathname === link.href || openDropdown === index
                                ? "text-amber-600 bg-amber-50"
                                : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                            } transition-colors duration-300`}
                          >
                            <span className="flex items-center gap-3">
                              {link.icon}
                              {link.name}
                            </span>
                            <motion.div
                              animate={{
                                rotate: openDropdown === index ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {openDropdown === index && (
                              <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={dropdownVariants}
                                className="pl-8 mt-2 border-l-2 border-amber-500/20 ml-6 overflow-hidden"
                              >
                                {link.dropdown.map((dropdownItem, dropdownIndex) => (
                                  <motion.div key={dropdownIndex} variants={dropdownItemVariants} whileHover="hover">
                                    <Link
                                      href={dropdownItem.href}
                                      className={`flex items-center justify-between px-4 py-3 text-sm rounded-lg ${
                                        pathname === dropdownItem.href
                                          ? "text-amber-600 bg-amber-50 font-medium"
                                          : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                                      } transition-colors duration-300`}
                                    >
                                      {dropdownItem.name}
                                      <motion.div
                                        initial={{ opacity: 0, x: -5 }}
                                        whileHover={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ArrowRight className="h-3 w-3" />
                                      </motion.div>
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                            pathname === link.href
                              ? "text-amber-600 bg-amber-50"
                              : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                          } transition-colors duration-300 flex items-center gap-3`}
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Auth Buttons */}
                <motion.div
                  className="mt-8 flex flex-col space-y-3"
                  variants={navItemVariants}
                  custom={mainNavLinks.length}
                >
                  {user ? (
                    <>
                      <Link href={`/dashboard/${user.userType}`} className="w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-amber-500 text-amber-600 hover:bg-amber-50 rounded-xl bg-transparent"
                        >
                          <Grid className="h-4 w-4 mr-3" />
                          Dashboard
                        </Button>
                      </Link>

                      <Link href="/profile" className="w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl bg-transparent"
                        >
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </Button>
                      </Link>

                      <Button
                        onClick={logout}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50 rounded-xl bg-transparent"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-amber-500 text-amber-600 hover:bg-amber-50 rounded-xl bg-transparent"
                        >
                          <LogIn className="h-4 w-4 mr-3" />
                          Log in
                        </Button>
                      </Link>

                      <Link href="/register" className="w-full">
                        <Button
                          size="sm"
                          className="w-full justify-start bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:shadow-md hover:shadow-gray-500/20 transition-all duration-300 relative overflow-hidden group rounded-xl"
                        >
                          <span className="relative z-10 flex items-center">
                            <UserPlus className="h-4 w-4 mr-3" />
                            Sign up
                          </span>
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800"
                            initial={{ x: "100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.4 }}
                          />
                        </Button>
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 z-50"
        style={{ scaleX: scrollProgress / 100, transformOrigin: "0%" }}
      />
    </>
  )
}

export default Header
