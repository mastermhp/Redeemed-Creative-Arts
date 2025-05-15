"use client"

import { useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import AOS from "aos"
import "aos/dist/aos.css"

export default function AnimationProvider({ children }) {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50,
      easing: "ease-out-cubic",
    })
  }, [])

  return <AnimatePresence mode="wait">{children}</AnimatePresence>
}
