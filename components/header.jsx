// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { Menu, X, ChevronDown, Palette, Heart, Church, User, LogIn } from "lucide-react"

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       const offset = window.scrollY
//       if (offset > 50) {
//         setScrolled(true)
//       } else {
//         setScrolled(false)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])

//   const navVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         staggerChildren: 0.1,
//         delayChildren: 0.3,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0 },
//   }

//   return (
//     <motion.header
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className={`${
//         scrolled ? "bg-[#171717]/90 backdrop-blur-md shadow-lg" : "bg-[#171717] border-b border-[#333333]"
//       } sticky top-0 z-50 transition-all duration-300`}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
//             <Link href="/" className="flex items-center space-x-2 group">
//               <div className="bg-amber-900/30 p-1.5 rounded-full transition-all duration-300 group-hover:bg-amber-800/50">
//                 <Palette className="h-6 w-6 text-amber-500 transition-all duration-300 group-hover:text-amber-400" />
//               </div>
//               <span className="font-bold text-xl text-amber-500 transition-all duration-300 group-hover:text-amber-400">
//                 Redeemed Creative Arts
//               </span>
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <motion.nav
//             className="hidden md:flex items-center space-x-6"
//             variants={navVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.div variants={itemVariants}>
//               <Link
//                 href="/"
//                 className="text-gray-300 hover:text-amber-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 Home
//               </Link>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <Link
//                 href="/about"
//                 className="text-gray-300 hover:text-amber-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 About Us
//               </Link>
//             </motion.div>

//             <motion.div variants={itemVariants} className="relative group">
//               <button className="flex items-center text-gray-300 hover:text-amber-500 font-medium">
//                 Join As{" "}
//                 <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
//               </button>
//               <div className="absolute left-0 mt-2 w-48 bg-[#171717] rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-[#333333] transform origin-top scale-95 group-hover:scale-100">
//                 <Link
//                   href="/artist-info"
//                   className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#222222] hover:text-amber-500 transition-colors duration-200"
//                 >
//                   <Palette className="mr-2 h-4 w-4 text-amber-500" />
//                   Artist
//                 </Link>
//                 <Link
//                   href="/patron-info"
//                   className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#222222] hover:text-amber-500 transition-colors duration-200"
//                 >
//                   <Heart className="mr-2 h-4 w-4 text-amber-500" />
//                   Patron
//                 </Link>
//                 <Link
//                   href="/church-info"
//                   className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#222222] hover:text-amber-500 transition-colors duration-200"
//                 >
//                   <Church className="mr-2 h-4 w-4 text-amber-500" />
//                   Church/Organization
//                 </Link>
//               </div>
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <Link
//                 href="/contact"
//                 className="text-gray-300 hover:text-amber-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full"
//               >
//                 Contact
//               </Link>
//             </motion.div>
//           </motion.nav>

//           {/* Auth Buttons */}
//           <motion.div
//             className="hidden md:flex items-center space-x-3"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <Link
//               href="/login"
//               className="px-3 py-1.5 text-sm border border-[#333333] rounded-md text-gray-300 hover:bg-[#222222] hover:text-amber-500 hover:border-amber-500 transition-all duration-300 flex items-center"
//             >
//               <LogIn className="mr-2 h-4 w-4" />
//               Log In
//             </Link>
//             <Link
//               href="/register"
//               className="px-3 py-1.5 text-sm bg-amber-600 hover:bg-amber-700 rounded-md text-black font-medium flex items-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"
//             >
//               <User className="mr-2 h-4 w-4" />
//               Sign Up
//             </Link>
//           </motion.div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             className="md:hidden p-2 rounded-md text-gray-300 hover:bg-[#222222] transition-colors duration-300"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </motion.button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <motion.div
//         className={`md:hidden bg-[#171717] border-t border-[#333333] py-2 ${isMenuOpen ? "block" : "hidden"}`}
//         initial={{ height: 0, opacity: 0 }}
//         animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="container mx-auto px-4 space-y-1">
//           <Link
//             href="/"
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#222222] hover:text-amber-500 transition-colors duration-200"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             href="/about"
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#222222] hover:text-amber-500 transition-colors duration-200"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             About Us
//           </Link>
//           <Link
//             href="/artist-info"
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#222222] hover:text-amber-500 transition-colors duration-200"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Artist Info
//           </Link>
//           <Link
//             href="/patron-info"
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#222222] hover:text-amber-500 transition-colors duration-200"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Patron Info
//           </Link>
//           <Link
//             href="/church-info"
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#222222] hover:text-amber-500 transition-colors duration-200"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Church Info
//           </Link>
//           <Link
//             href="/contact"
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#222222] hover:text-amber-500 transition-colors duration-200"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Contact
//           </Link>
//           <div className="pt-4 pb-3 border-t border-[#333333]">
//             <div className="flex items-center px-3">
//               <Link
//                 href="/login"
//                 className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-[#222222] hover:text-amber-500 transition-colors duration-200 text-center"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Log In
//               </Link>
//             </div>
//             <div className="mt-3 px-3">
//               <Link
//                 href="/register"
//                 className="block w-full px-3 py-2 rounded-md text-base font-medium bg-amber-600 text-black hover:bg-amber-700 transition-colors duration-200 text-center"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.header>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Palette } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "For Artists",
      href: "/artist-info",
      dropdown: [
        { name: "Artist Information", href: "/artist-info" },
        { name: "Artist Disclaimer", href: "/artist-disclaimer" },
      ],
    },
    {
      name: "For Patrons",
      href: "/patron-info",
      dropdown: [
        { name: "Patron Information", href: "/patron-info" },
        { name: "Helper Agreement", href: "/helper-agreement" },
      ],
    },
    {
      name: "For Churches",
      href: "/church-info",
      dropdown: [{ name: "Church Information", href: "/church-info" }],
    },
    { name: "Contact", href: "/contact" },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="bg-amber-900/30 p-1.5 rounded-full transition-all duration-300 group-hover:bg-amber-800/50">
                  <Palette className="h-6 w-6 text-amber-500 transition-all duration-300 group-hover:text-amber-400" />
                </div>
                <span className="font-bold text-xl text-amber-500 transition-all duration-300 group-hover:text-amber-400">
                  Redeemed Creative Arts
                </span>
              </Link>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(index)}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                        pathname === link.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          openDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5 z-50"
                      >
                        <div className="py-1">
                          {link.dropdown.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              href={dropdownItem.href}
                              className={`block px-4 py-2 text-sm ${
                                pathname === dropdownItem.href
                                  ? "text-primary bg-muted"
                                  : "text-foreground hover:text-primary hover:bg-muted"
                              }`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-primary hover:bg-muted"
              >
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:bg-muted"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-card border-t border-border"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                          pathname === link.href
                            ? "text-primary bg-muted"
                            : "text-foreground hover:text-primary hover:bg-muted"
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform ${
                            openDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 mt-1 space-y-1"
                        >
                          {link.dropdown.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              href={dropdownItem.href}
                              className={`block px-3 py-2 rounded-md text-sm ${
                                pathname === dropdownItem.href
                                  ? "text-primary bg-muted"
                                  : "text-foreground hover:text-primary hover:bg-muted"
                              }`}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === link.href
                          ? "text-primary bg-muted"
                          : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-4 flex flex-col space-y-2">
              <Link href="/login" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
