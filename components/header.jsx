"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  ChevronDown,
  Palette,
  Heart,
  Church,
  LogIn,
  UserPlus,
  Search,
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
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()
  const searchInputRef = useRef(null)
  const headerRef = useRef(null)
  const [clickOutsideEnabled, setClickOutsideEnabled] = useState(false)

  // Mock user points for demonstration
  const userPoints = 2450
  const userLevel = "Gold Member"

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
    setSearchOpen(false)
  }, [pathname])

  // Close dropdowns when search is opened
  useEffect(() => {
    if (searchOpen) {
      setOpenDropdown(null)
    }
  }, [searchOpen])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target) && clickOutsideEnabled) {
        setOpenDropdown(null)
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

  const searchVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "100%", transition: { duration: 0.3 } },
    exit: { opacity: 0, width: 0, transition: { duration: 0.3 } },
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

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-lg shadow-md py-2" : "bg-white/80 backdrop-blur-md py-3"
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
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="bg-amber-500/20 p-2 rounded-full transition-all duration-500 group-hover:bg-amber-500/30">
                    <Palette className="h-6 w-6 text-amber-500 transition-all duration-500 group-hover:text-[#e76f51]" />
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-amber-500/10 z-[-1]"
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
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-amber-500 transition-all duration-500 group-hover:text-[#e76f51]">
                    Redeemed
                  </span>
                  <span className="text-xs text-gray-600 transition-all duration-500 group-hover:text-amber-500">
                    Creative Arts
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Points Display - Desktop */}
            <div className="hidden lg:flex items-center bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-full border border-amber-200">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-amber-600">{userPoints.toLocaleString()}</span>
                  <span className="text-xs text-gray-600">pts</span>
                </div>
                <div className="h-4 w-px bg-amber-300"></div>
                <div className="flex items-center space-x-1">
                  <Trophy className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">{userLevel}</span>
                </div>
              </div>
            </div>

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
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 ${
                          openDropdown === index ? "text-amber-500" : "text-gray-700 hover:text-amber-500"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
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
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
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
                            className="absolute left-1/2 -translate-x-1/2 mt-4 ml-20 w-[800px] rounded-xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden"
                          >
                            <div className="grid grid-cols-4 gap-0 p-6">
                              {link.sections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="space-y-4">
                                  <div className="flex items-center gap-2 mb-3">
                                    {section.icon}
                                    <h3 className="font-semibold text-gray-800">{section.title}</h3>
                                  </div>
                                  <ul className="space-y-2">
                                    {section.links.map((subLink, subLinkIndex) => (
                                      <motion.li key={subLinkIndex} variants={dropdownItemVariants} whileHover="hover">
                                        <Link
                                          href={subLink.href}
                                          className={`flex items-center justify-between text-sm ${
                                            pathname === subLink.href
                                              ? "text-amber-500"
                                              : "text-gray-600 hover:text-amber-500"
                                          } transition-colors duration-300 py-1 px-2 rounded-md hover:bg-amber-500/5`}
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
                            <div className="bg-gray-50 p-4 flex justify-between items-center">
                              <p className="text-sm text-gray-600">Discover all our resources and opportunities</p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-white"
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
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 ${
                          pathname === link.href || openDropdown === index
                            ? "text-amber-500"
                            : "text-gray-700 hover:text-amber-500"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
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
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
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
                            className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-50 overflow-hidden"
                          >
                            <div className="py-1">
                              {link.dropdown.map((dropdownItem, dropdownIndex) => (
                                <motion.div key={dropdownIndex} variants={dropdownItemVariants} whileHover="hover">
                                  <Link
                                    href={dropdownItem.href}
                                    className={`flex items-center justify-between px-4 py-2 text-sm ${
                                      pathname === dropdownItem.href
                                        ? "text-amber-500 bg-amber-500/10"
                                        : "text-gray-700 hover:text-amber-500 hover:bg-amber-500/5"
                                    } transition-colors duration-300 hover:bg-amber-500/10`}
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
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 ${
                          pathname === link.href ? "text-amber-500" : "text-gray-700 hover:text-amber-500"
                        }`}
                      >
                        {link.icon}
                        {link.name}
                      </Link>

                      {/* Hover indicator */}
                      {hoveredItem === index && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
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

            {/* Auth Buttons & Search */}
            <div className="hidden lg:flex items-center space-x-2">
              <motion.div
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={0}
                variants={buttonVariants}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-amber-500 hover:bg-amber-500/10"
                  onClick={() => {
                    setSearchOpen(!searchOpen)
                    setOpenDropdown(null)
                  }}
                >
                  <Search className="h-5 w-5" />
                </Button>
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
                    className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 relative overflow-hidden group font-bold"
                  >
                    <span className="relative z-10 flex items-center">
                      <Gift className="h-4 w-4 mr-1.5" />
                      Donate
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-[#e76f51] to-amber-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </Button>
                </Link>
                {/* Pulsing effect */}
                <motion.div
                  className="absolute -inset-1 rounded-md bg-amber-500/20 z-[-1]"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>

              <motion.div
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={3}
                variants={buttonVariants}
              >
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300"
                  >
                    <LogIn className="h-4 w-4 mr-1.5" />
                    Log in
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={4}
                variants={buttonVariants}
              >
                <Link href="/register">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center">
                      <UserPlus className="h-4 w-4 mr-1.5" />
                      Sign up
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-[#e76f51] to-amber-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Points Display - Mobile */}
              <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 rounded-full border border-amber-200">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                <span className="text-xs font-bold text-amber-600">{userPoints.toLocaleString()}</span>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-amber-500 hover:bg-amber-500/10"
                  onClick={() => {
                    setSearchOpen(!searchOpen)
                    setOpenDropdown(null)
                  }}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* Donate Button for Mobile */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <Link href="/donate">
                  <Button size="sm" className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">
                    <Gift className="h-4 w-4 mr-1.5" />
                    Donate
                  </Button>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 hover:text-amber-500 hover:bg-amber-500/10"
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

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div initial="hidden" animate="visible" exit="exit" variants={searchVariants} className="py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for artists, artwork, events..."
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-50 border border-gray-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-700"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              <div className="container mx-auto px-4 py-4">
                {/* Mobile Points Display */}
                <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-amber-600">{userPoints.toLocaleString()} points</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-700">{userLevel}</span>
                    </div>
                  </div>
                </div>

                <nav className="flex flex-col space-y-1">
                  {mainNavLinks.map((link, index) => (
                    <motion.div key={index} variants={navItemVariants} custom={index} className="overflow-hidden">
                      {link.megaMenu ? (
                        <div>
                          <button
                            onClick={() => handleDropdownToggle(index)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                              openDropdown === index
                                ? "text-amber-500 bg-amber-500/10"
                                : "text-gray-700 hover:text-amber-500 hover:bg-amber-500/5"
                            } transition-colors duration-300`}
                          >
                            <span className="flex items-center gap-2">
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
                                className="pl-6 mt-1 border-l-2 border-amber-500/20 ml-4 overflow-hidden"
                              >
                                {link.sections.map((section, sectionIndex) => (
                                  <div key={sectionIndex} className="mb-4">
                                    <div className="flex items-center gap-2 mb-2 mt-3">
                                      {section.icon}
                                      <h3 className="font-semibold text-gray-800 text-sm">{section.title}</h3>
                                    </div>
                                    {section.links.map((subLink, subLinkIndex) => (
                                      <motion.div key={subLinkIndex} variants={dropdownItemVariants} whileHover="hover">
                                        <Link
                                          href={subLink.href}
                                          className={`flex items-center justify-between px-4 py-2 text-sm ${
                                            pathname === subLink.href
                                              ? "text-amber-500"
                                              : "text-gray-600 hover:text-amber-500"
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
                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                              pathname === link.href || openDropdown === index
                                ? "text-amber-500 bg-amber-500/10"
                                : "text-gray-700 hover:text-amber-500 hover:bg-amber-500/5"
                            } transition-colors duration-300`}
                          >
                            <span className="flex items-center gap-2">
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
                                className="pl-6 mt-1 border-l-2 border-amber-500/20 ml-4 overflow-hidden"
                              >
                                {link.dropdown.map((dropdownItem, dropdownIndex) => (
                                  <motion.div key={dropdownIndex} variants={dropdownItemVariants} whileHover="hover">
                                    <Link
                                      href={dropdownItem.href}
                                      className={`flex items-center justify-between px-4 py-2 text-sm ${
                                        pathname === dropdownItem.href
                                          ? "text-amber-500"
                                          : "text-gray-700 hover:text-amber-500"
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
                          className={`block px-3 py-2 rounded-md text-sm font-medium ${
                            pathname === link.href
                              ? "text-amber-500 bg-amber-500/10"
                              : "text-gray-700 hover:text-amber-500 hover:bg-amber-500/5"
                          } transition-colors duration-300 flex items-center gap-2`}
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="mt-6 flex flex-col space-y-3"
                  variants={navItemVariants}
                  custom={mainNavLinks.length}
                >
                  <Link href="/login" className="w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-amber-500 text-amber-500 hover:bg-amber-500/10"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Log in
                    </Button>
                  </Link>

                  <Link href="/register" className="w-full">
                    <Button
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-md hover:shadow-amber-500/20 transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign up
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-[#e76f51] to-amber-500"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-[#e76f51] z-50"
        style={{ scaleX: scrollProgress / 100, transformOrigin: "0%" }}
      />
    </>
  )
}

export default Header
