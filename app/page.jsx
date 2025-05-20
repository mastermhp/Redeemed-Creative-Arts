"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Palette,
  Heart,
  Church,
  Users,
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react"

// Import Swiper and modules
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

// Real images from Unsplash
const heroImage = "https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?q=80&w=2070&auto=format&fit=crop"
const artworkImages = [
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2145&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=2145&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533158388470-9a56699990c6?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482245294234-b3f2f8d5f1a4?q=80&w=2030&auto=format&fit=crop",
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Christian Artist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    quote:
      "Redeemed Creative Arts has transformed my artistic journey. I've found a community that understands the intersection of faith and creativity.",
  },
  {
    name: "Michael Thompson",
    role: "Church Art Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    quote:
      "Finding talented Christian artists used to be challenging. This platform has connected our church with incredible artists who share our vision.",
  },
  {
    name: "Rebecca Martinez",
    role: "Art Patron",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    quote:
      "Supporting faith-based art has never been easier. I love discovering new artists and knowing my patronage helps spread God's message through creativity.",
  },
]

const artistImage = "https://images.unsplash.com/photo-1544413164-5f1b361f5b69?q=80&w=1974&auto=format&fit=crop"
const patronImage = "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop"
const churchImage = "https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2070&auto=format&fit=crop"

export default function Home() {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
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

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
          animate={{
            x: [50, -50, 50],
            y: [-50, 50, -50],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px]"
          animate={{
            x: [-50, 50, -50],
            y: [50, -50, 50],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#e76f51]/5 rounded-full blur-[100px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 py-24 max-w-6xl relative">
        {/* Hero Section */}
        <motion.div
          className="pt-20 md:pt-32 mb-24 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            <motion.div className="mb-6 inline-block" variants={itemVariants} animate={floatingAnimation}>
              <span className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20">
                Faith-Inspired Creativity
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-foreground"
              variants={itemVariants}
            >
              <span className="text-amber-500 relative">
                Redeemed
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500/30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                ></motion.span>
              </span>{" "}
              <span className="relative">
                Creative Arts
                <motion.div
                  className="absolute -z-10 -inset-1 bg-[#e76f51]/10 rounded-lg blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                ></motion.div>
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
              variants={itemVariants}
            >
              Building bridges between Artists, Patrons, and Churches.
            </motion.p>
            <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-amber-500 text-white hover:bg-white hover:text-black transition-all duration-500 group relative overflow-hidden"
                >
                  <span className="relative z-10">Join Our Community</span>
                  <motion.span
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-500 relative overflow-hidden group"
                >
                  <span className="relative z-10">Learn More</span>
                  <motion.span
                    className="absolute inset-0 bg-amber-500"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-[300px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={heroImage || "/placeholder.svg"}
              alt="Redeemed Creative Arts"
              fill
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
              initial={{ opacity: 0.5 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-amber-500 mb-2">Faith-Inspired Creativity</h2>
              <p className="text-lg text-[#e76f51] max-w-2xl">
                A community where Christian artists, supporters, and churches connect to celebrate God-given talents.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Featured Artwork Slider */}
        <motion.section
          className="mb-24 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.h2 className="text-3xl font-bold mb-8 text-center text-foreground" variants={itemVariants}>
            <span className="relative">
              Featured Artwork
              <motion.div
                className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-amber-500/30"
                initial={{ width: 0, left: "50%" }}
                whileInView={{ width: "50%", left: "25%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              ></motion.div>
            </span>
          </motion.h2>

          <motion.div variants={itemVariants}>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
              className="mySwiper"
            >
              {artworkImages.map((image, index) => (
                <SwiperSlide key={index} className="max-w-[300px] md:max-w-[400px]">
                  <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden group">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Featured Artwork ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-white text-lg font-bold">Artwork Title {index + 1}</h3>
                        <p className="text-white/80 text-sm">By Christian Artist</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-button-next after:content-[''] w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                <ChevronRight className="w-6 h-6" />
              </div>
              <div className="swiper-button-prev after:content-[''] w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                <ChevronLeft className="w-6 h-6" />
              </div>
            </Swiper>
          </motion.div>
        </motion.section>

        {/* Mission Statement */}
        <motion.section
          className="mb-24 relative z-10 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.div
            className="bg-gradient-to-br from-card to-card/50 p-8 md:p-12 rounded-xl border border-[#e76f51] relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>

            <motion.div
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#e76f51]/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
            ></motion.div>

            {/* Animated particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-amber-500/30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            <div className="relative z-10">
              <motion.div
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-500 to-[#e76f51] p-0.5 shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Heart className="h-10 w-10 text-[#e76f51]" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h2
                className="text-4xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-[#e76f51]">
                  Our Mission
                </span>
              </motion.h2>

              <motion.div
                className="max-w-4xl mx-auto relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-[#e76f51]"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed pl-4">
                  At Redeemed Creative Arts, our mission is to uplift and empower Christian artists by fostering a
                  dynamic community where creativity, faith, and fellowship thrive together. We connect visual artists,
                  patrons, and churches to celebrate God-given talents, encourage meaningful engagement, and build
                  sustainable ministries that inspire, teach, and bless communities. Through art, education, and
                  collaboration, we aim to glorify Christ, enrich the church body, and nurture the next generation of
                  creators for His Kingdom.
                </p>
              </motion.div>

              <motion.div
                className="mt-10 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Link href="/about-mission">
                  <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 group">
                    Learn More About Our Mission
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Who We Serve */}
        <motion.section
          className="mb-24 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.div
              className="inline-block mb-4 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20"
                animate={floatingAnimation}
              >
                Our Community
              </motion.span>
            </motion.div>

            <motion.h2
              className="text-4xl font-bold mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-[#e76f51]">
                Who We Serve
              </span>
            </motion.h2>

            <motion.p
              className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Our platform brings together three key communities in the Christian creative ecosystem
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Artists */}
            <motion.div
              className="group"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-amber-500 group-hover:border-[#e76f51] transition-all duration-500 h-full transform-gpu group-hover:shadow-2xl group-hover:shadow-amber-500/20">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={artistImage || "/placeholder.svg"}
                    alt="Artists"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>

                  <motion.div
                    className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Palette className="h-6 w-6 text-[#e76f51]" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  ></motion.div>
                </div>

                <div className="p-8 relative">
                  <motion.div
                    className="absolute -top-10 right-8 w-20 h-20 bg-amber-500/10 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  ></motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300 relative inline-block">
                    For Artists
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e76f51]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    ></motion.div>
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    Showcase your faith-inspired art, connect with supporters, and grow your creative ministry.
                  </p>

                  <motion.ul
                    className="space-y-4 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {["Showcase your artwork", "Sell originals and prints", "Connect with churches"].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                      >
                        <div className="mr-3 mt-1 bg-amber-500/20 rounded-full p-1 group-hover:bg-[#e76f51]/20 transition-colors duration-300">
                          <Check className="h-4 w-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <Link href="/artist-info">
                    <Button className="w-full bg-gradient-to-r from-amber-500/80 to-amber-500/80 text-white hover:from-[#e76f51] hover:to-[#e76f51] transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Learn More
                      </span>
                      <motion.span
                        className="absolute right-4 group-hover:translate-x-1 transition-transform duration-300"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Patrons */}
            <motion.div
              className="group"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-amber-500 group-hover:border-[#e76f51] transition-all duration-500 h-full transform-gpu group-hover:shadow-2xl group-hover:shadow-amber-500/20">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={patronImage || "/placeholder.svg"}
                    alt="Patrons"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>

                  <motion.div
                    className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Heart className="h-6 w-6 text-[#e76f51]" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  ></motion.div>
                </div>

                <div className="p-8 relative">
                  <motion.div
                    className="absolute -top-10 right-8 w-20 h-20 bg-amber-500/10 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  ></motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300 relative inline-block">
                    For Patrons
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e76f51]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    ></motion.div>
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    Discover faith-inspired art, support Christian artists, and engage with a community that shares your
                    values.
                  </p>

                  <motion.ul
                    className="space-y-4 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {["Discover Christian artists", "Support creative ministries", "Earn rewards and recognition"].map(
                      (item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                        >
                          <div className="mr-3 mt-1 bg-amber-500/20 rounded-full p-1 group-hover:bg-[#e76f51]/20 transition-colors duration-300">
                            <Check className="h-4 w-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300" />
                          </div>
                          <span className="text-muted-foreground">{item}</span>
                        </motion.li>
                      ),
                    )}
                  </motion.ul>

                  <Link href="/patron-info">
                    <Button className="w-full bg-gradient-to-r from-amber-500/80 to-amber-500/80 text-white hover:from-[#e76f51] hover:to-[#e76f51] transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Learn More
                      </span>
                      <motion.span
                        className="absolute right-4 group-hover:translate-x-1 transition-transform duration-300"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Churches */}
            <motion.div
              className="group"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-amber-500 group-hover:border-[#e76f51] transition-all duration-500 h-full transform-gpu group-hover:shadow-2xl group-hover:shadow-amber-500/20">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={churchImage || "/placeholder.svg"}
                    alt="Churches"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>

                  <motion.div
                    className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Church className="h-6 w-6 text-[#e76f51]" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  ></motion.div>
                </div>

                <div className="p-8 relative">
                  <motion.div
                    className="absolute -top-10 right-8 w-20 h-20 bg-amber-500/10 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  ></motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300 relative inline-block">
                    For Churches
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e76f51]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    ></motion.div>
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    Connect with Christian artists, enhance your ministry through visual arts, and engage your
                    community.
                  </p>

                  <motion.ul
                    className="space-y-4 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {["Find creative talent", "Host art-focused events", "Engage your congregation"].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      >
                        <div className="mr-3 mt-1 bg-amber-500/20 rounded-full p-1 group-hover:bg-[#e76f51]/20 transition-colors duration-300">
                          <Check className="h-4 w-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <Link href="/church-info">
                    <Button className="w-full bg-gradient-to-r from-amber-500/80 to-amber-500/80 text-white hover:from-[#e76f51] hover:to-[#e76f51] transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Learn More
                      </span>
                      <motion.span
                        className="absolute right-4 group-hover:translate-x-1 transition-transform duration-300"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          className="mb-24 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.h2 className="text-3xl font-bold mb-12 text-center text-foreground" variants={itemVariants}>
            <span className="relative">
              What Our Community Says
              <motion.div
                className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-amber-500/30"
                initial={{ width: 0, left: "50%" }}
                whileInView={{ width: "50%", left: "25%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              ></motion.div>
            </span>
          </motion.h2>

          <div className="relative h-[300px] md:h-[250px]">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  index === activeTestimonial && (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-card p-8 rounded-xl border border-amber-500/20 shadow-lg flex flex-col md:flex-row items-center gap-6 h-full">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover rounded-full"
                          />
                          <motion.div
                            className="absolute -inset-1 rounded-full border-2 border-amber-500/50"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          ></motion.div>
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                          <h3 className="font-bold text-amber-500">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeTestimonial ? "bg-amber-500" : "bg-amber-500/30"
                }`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </motion.section>

        {/* Core Values */}
        <motion.section
          className="mb-24 relative z-10 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          ></motion.div>

          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e76f51]/5 rounded-full blur-[100px]"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          ></motion.div>

          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20"
                animate={floatingAnimation}
              >
                What Guides Us
              </motion.span>
            </motion.div>

            <motion.h2
              className="text-4xl font-bold mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-[#e76f51]">
                Our Core Values
              </span>
            </motion.h2>

            <motion.p
              className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              The principles that guide our community and mission
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Faith-Driven Creativity",
                description:
                  "We believe all creative gifts are given by God and should be used to honor Him and edify the body of Christ.",
                icon: <Star className="h-6 w-6 text-amber-500" />,
                color: "amber-500",
                gradient: "from-amber-500 to-amber-400",
              },
              {
                title: "Community & Collaboration",
                description:
                  "We foster authentic connections between artists, patrons, and ministries, encouraging mutual support, mentorship, service and collective worship through art.",
                icon: <Users className="h-6 w-6 text-[#e76f51]" />,
                color: "[#e76f51]",
                gradient: "from-[#e76f51] to-[#e76f51]/80",
              },
              {
                title: "Integrity & Stewardship",
                description:
                  "We uphold honesty, respect for intellectual property, and transparency in all interactions, ensuring that artists and contributors are supported with fairness and accountability.",
                icon: <Check className="h-6 w-6 text-amber-500" />,
                color: "amber-500",
                gradient: "from-amber-500 to-amber-400",
              },
              {
                title: "Celebration of Diversity",
                description:
                  "We celebrate the diverse gifts and backgrounds of artists across all mediums, ages, and cultures, reflecting the beauty of God's creation.",
                icon: <Heart className="h-6 w-6 text-[#e76f51]" />,
                color: "[#e76f51]",
                gradient: "from-[#e76f51] to-[#e76f51]/80",
              },
              {
                title: "Empowerment & Encouragement",
                description:
                  "We equip artists, supporters, and churches to grow in their calling by providing tools, recognition, and opportunities to impact communities through art and other talents.",
                icon: <Users className="h-6 w-6 text-amber-500" />,
                color: "amber-500",
                gradient: "from-amber-500 to-amber-400",
              },
              {
                title: "Excellence & Innovation",
                description:
                  "We encourage the pursuit of excellence in artistry, innovation in presentation, and creativity in outreach, all grounded in biblical principles.",
                icon: <Star className="h-6 w-6 text-[#e76f51]" />,
                color: "[#e76f51]",
                gradient: "from-[#e76f51] to-[#e76f51]/80",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                <div className="bg-card rounded-xl overflow-hidden h-full relative p-1 transform-gpu">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
                  ></motion.div>

                  <div className="relative bg-card rounded-lg p-6 h-full z-10">
                    <motion.div
                      className={`bg-${value.color}/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-${value.color}/30 transition-colors duration-300`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {value.icon}
                    </motion.div>

                    <h3
                      className={`text-xl font-semibold mb-3 text-${value.color} group-hover:text-${value.color} transition-colors duration-300`}
                    >
                      {value.title}
                    </h3>

                    <motion.div
                      className={`h-0.5 w-12 bg-${value.color}/50 mb-4`}
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    ></motion.div>

                    <p className="text-muted-foreground">{value.description}</p>

                    <motion.div
                      className={`absolute bottom-2 right-2 w-12 h-12 rounded-full bg-${value.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Vision Statement */}
        <motion.section
          className="mb-24 relative z-10 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.div
            className="bg-gradient-to-br from-card to-card/50 p-8 md:p-12 rounded-xl border border-amber-500/30 relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>

            <motion.div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e76f51]/5 rounded-full blur-[100px]"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
            ></motion.div>

            {/* Animated particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-amber-500/40"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            <div className="relative z-10">
              <motion.div
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-500 to-[#e76f51] p-0.5 shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Star className="h-10 w-10 text-amber-500" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h2
                className="text-4xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-[#e76f51]">
                  Our Vision
                </span>
              </motion.h2>

              <motion.div
                className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-amber-500/10 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  className="absolute -left-2 -right-2 -top-2 -bottom-2 border border-amber-500/20 rounded-xl opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <motion.div
                    className="w-full md:w-1/3 relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="aspect-square relative rounded-xl overflow-hidden border-2 border-amber-500/20">
                      <Image
                        src="https://images.unsplash.com/photo-1579541592411-e7e4615ad7a3?q=80&w=1974&auto=format&fit=crop"
                        alt="Vision"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    </div>

                    <motion.div
                      className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-[#e76f51]/20 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    ></motion.div>
                  </motion.div>

                  <motion.div
                    className="w-full md:w-2/3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed relative">
                      <span className="text-4xl font-serif text-amber-500/40 absolute -top-4 -left-4">"</span>
                      To cultivate an active, Christ-centered creative community where artists, patrons, and ministries
                      unite to inspire, uplift, serve and glorify God through the power of visual arts and storytelling,
                      fostering engagement, support, and spiritual growth. We support individuals and groups in their
                      efforts to provide faith-based services to churches, Christian events, and charitable
                      organizations.
                      <span className="text-4xl font-serif text-amber-500/40 absolute -bottom-8 -right-4">"</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="mt-12 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Link href="/about-vision">
                  <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 group">
                    Learn More About Our Vision
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Stats Counter */}
        <motion.section
          className="mb-24 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500+", label: "Artists", icon: <Palette className="h-6 w-6 text-amber-500" /> },
              { value: "1,200+", label: "Patrons", icon: <Heart className="h-6 w-6 text-[#e76f51]" /> },
              { value: "300+", label: "Churches", icon: <Church className="h-6 w-6 text-amber-500" /> },
              { value: "5,000+", label: "Artworks", icon: <Star className="h-6 w-6 text-[#e76f51]" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-card p-6 rounded-lg border border-amber-500/20 text-center"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
              >
                <motion.div
                  className="mx-auto w-12 h-12 rounded-full bg-card flex items-center justify-center mb-4"
                  animate={floatingAnimation}
                >
                  {stat.icon}
                </motion.div>
                <motion.h3
                  className="text-3xl font-bold text-foreground mb-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.div
            className="bg-card p-12 rounded-xl border border-border relative overflow-hidden"
            variants={itemVariants}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
            <motion.div
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            ></motion.div>

            <div className="relative z-10">
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-[#e76f51] p-0.5"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <Heart className="h-8 w-8 text-[#e76f51]" />
                </div>
              </motion.div>

              <h2 className="text-3xl font-bold mb-4 text-foreground">Join Our Community Today</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Whether you're an artist, patron, or church, there's a place for you in our faith-based creative
                community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-amber-500 text-white hover:bg-white hover:text-amber-500 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Sign Up Now</span>
                    <motion.span
                      className="absolute inset-0 bg-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45 relative z-10" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white relative overflow-hidden group"
                  >
                    <span className="relative z-10">Contact Us</span>
                    <motion.span
                      className="absolute inset-0 bg-amber-500"
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
