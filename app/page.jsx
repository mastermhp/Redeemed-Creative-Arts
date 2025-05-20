// "use client"

// import { useRef, useEffect, useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import {
//   ArrowRight,
//   Palette,
//   Heart,
//   Church,
//   Users,
//   Star,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUpRight,
// } from "lucide-react"

// // Import Swiper and modules
// import { Swiper, SwiperSlide } from "swiper/react"
// import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules"

// // Import Swiper styles
// import "swiper/css"
// import "swiper/css/effect-coverflow"
// import "swiper/css/pagination"
// import "swiper/css/navigation"

// // Real images from Unsplash
// const heroImage = "https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?q=80&w=2070&auto=format&fit=crop"
// const artworkImages = [
//   "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2145&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=2145&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=2071&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1533158388470-9a56699990c6?q=80&w=2070&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?q=80&w=1974&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1482245294234-b3f2f8d5f1a4?q=80&w=2030&auto=format&fit=crop",
// ]

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "Christian Artist",
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
//     quote:
//       "Redeemed Creative Arts has transformed my artistic journey. I've found a community that understands the intersection of faith and creativity.",
//   },
//   {
//     name: "Michael Thompson",
//     role: "Church Art Director",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
//     quote:
//       "Finding talented Christian artists used to be challenging. This platform has connected our church with incredible artists who share our vision.",
//   },
//   {
//     name: "Rebecca Martinez",
//     role: "Art Patron",
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
//     quote:
//       "Supporting faith-based art has never been easier. I love discovering new artists and knowing my patronage helps spread God's message through creativity.",
//   },
// ]

// const artistImage = "https://images.unsplash.com/photo-1544413164-5f1b361f5b69?q=80&w=1974&auto=format&fit=crop"
// const patronImage = "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop"
// const churchImage = "https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2070&auto=format&fit=crop"

// export default function Home() {
//   const containerRef = useRef(null)
//   const [isVisible, setIsVisible] = useState(false)
//   const [activeTestimonial, setActiveTestimonial] = useState(0)

//   useEffect(() => {
//     setIsVisible(true)

//     const interval = setInterval(() => {
//       setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [])

//   const fadeInUpVariants = {
//     hidden: { opacity: 0, y: 60 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   }

//   const floatingAnimation = {
//     y: [0, -10, 0],
//     transition: {
//       duration: 3,
//       repeat: Number.POSITIVE_INFINITY,
//       repeatType: "reverse",
//       ease: "easeInOut",
//     },
//   }

//   return (
//     <div className="relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="fixed inset-0 overflow-hidden -z-10">
//         <motion.div
//           className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
//           animate={{
//             x: [50, -50, 50],
//             y: [-50, 50, -50],
//           }}
//           transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
//         ></motion.div>
//         <motion.div
//           className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px]"
//           animate={{
//             x: [-50, 50, -50],
//             y: [50, -50, 50],
//           }}
//           transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
//         ></motion.div>
//         <motion.div
//           className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#e76f51]/5 rounded-full blur-[100px]"
//           animate={{
//             x: [0, 100, 0],
//             y: [0, -100, 0],
//           }}
//           transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
//         ></motion.div>
//       </div>

//       <div className="container mx-auto px-4 py-24 max-w-6xl relative">
//         {/* Hero Section */}
//         <motion.div
//           className="pt-20 md:pt-32 mb-24 relative z-10"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.div
//             className="text-center mb-12"
//             initial="hidden"
//             animate="visible"
//             variants={staggerContainerVariants}
//           >
//             <motion.div className="mb-6 inline-block" variants={itemVariants} animate={floatingAnimation}>
//               <span className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20">
//                 Faith-Inspired Creativity
//               </span>
//             </motion.div>
//             <motion.h1
//               className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-foreground"
//               variants={itemVariants}
//             >
//               <span className="text-amber-500 relative">
//                 Redeemed
//                 <motion.span
//                   className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500/30"
//                   initial={{ width: 0 }}
//                   animate={{ width: "100%" }}
//                   transition={{ delay: 0.5, duration: 0.8 }}
//                 ></motion.span>
//               </span>{" "}
//               <span className="relative">
//                 Creative Arts
//                 <motion.div
//                   className="absolute -z-10 -inset-1 bg-[#e76f51]/10 rounded-lg blur-sm"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.8, duration: 0.5 }}
//                 ></motion.div>
//               </span>
//             </motion.h1>
//             <motion.p
//               className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
//               variants={itemVariants}
//             >
//               Building bridges between Artists, Patrons, and Churches.
//             </motion.p>
//             <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
//               <Link href="/register">
//                 <Button
//                   size="lg"
//                   className="bg-amber-500 text-white hover:bg-white hover:text-black transition-all duration-500 group relative overflow-hidden"
//                 >
//                   <span className="relative z-10">Join Our Community</span>
//                   <motion.span
//                     className="absolute inset-0 bg-white"
//                     initial={{ x: "-100%" }}
//                     whileHover={{ x: 0 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                   <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
//                 </Button>
//               </Link>
//               <Link href="/about">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-500 relative overflow-hidden group"
//                 >
//                   <span className="relative z-10">Learn More</span>
//                   <motion.span
//                     className="absolute inset-0 bg-amber-500"
//                     initial={{ y: "100%" }}
//                     whileHover={{ y: 0 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </Button>
//               </Link>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             className="relative h-[300px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl"
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <Image
//               src={heroImage || "/placeholder.svg"}
//               alt="Redeemed Creative Arts"
//               fill
//               className="object-cover"
//               priority
//             />
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
//               initial={{ opacity: 0.5 }}
//               whileHover={{ opacity: 0.3 }}
//               transition={{ duration: 0.3 }}
//             ></motion.div>
//             <motion.div
//               className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.5 }}
//             >
//               <h2 className="text-2xl md:text-3xl font-bold text-amber-500 mb-2">Faith-Inspired Creativity</h2>
//               <p className="text-lg text-[#e76f51] max-w-2xl">
//                 A community where Christian artists, supporters, and churches connect to celebrate God-given talents.
//               </p>
//             </motion.div>
//           </motion.div>
//         </motion.div>

//         {/* Featured Artwork Slider */}
//         <motion.section
//           className="mb-24 relative z-10"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainerVariants}
//         >
//           <motion.h2 className="text-3xl font-bold mb-8 text-center text-foreground" variants={itemVariants}>
//             <span className="relative">
//               Featured Artwork
//               <motion.div
//                 className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-amber-500/30"
//                 initial={{ width: 0, left: "50%" }}
//                 whileInView={{ width: "50%", left: "25%" }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.3, duration: 0.8 }}
//               ></motion.div>
//             </span>
//           </motion.h2>

//           <motion.div variants={itemVariants}>
//             <Swiper
//               effect={"coverflow"}
//               grabCursor={true}
//               centeredSlides={true}
//               slidesPerView={"auto"}
//               coverflowEffect={{
//                 rotate: 50,
//                 stretch: 0,
//                 depth: 100,
//                 modifier: 1,
//                 slideShadows: true,
//               }}
//               autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: false,
//               }}
//               pagination={{ clickable: true }}
//               navigation={{
//                 nextEl: ".swiper-button-next",
//                 prevEl: ".swiper-button-prev",
//               }}
//               modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
//               className="mySwiper"
//             >
//               {artworkImages.map((image, index) => (
//                 <SwiperSlide key={index} className="max-w-[300px] md:max-w-[400px]">
//                   <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden group">
//                     <Image
//                       src={image || "/placeholder.svg"}
//                       alt={`Featured Artwork ${index + 1}`}
//                       fill
//                       className="object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
//                       <div className="p-4 w-full">
//                         <h3 className="text-white text-lg font-bold">Artwork Title {index + 1}</h3>
//                         <p className="text-white/80 text-sm">By Christian Artist</p>
//                       </div>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//               <div className="swiper-button-next after:content-[''] w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
//                 <ChevronRight className="w-6 h-6" />
//               </div>
//               <div className="swiper-button-prev after:content-[''] w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
//                 <ChevronLeft className="w-6 h-6" />
//               </div>
//             </Swiper>
//           </motion.div>
//         </motion.section>

//         {/* Mission Statement */}
//         <motion.section
//           className="mb-24 relative z-10 overflow-hidden"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainerVariants}
//         >
//           <motion.div
//             className="bg-gradient-to-br from-card to-card/50 p-8 md:p-12 rounded-xl border border-[#e76f51] relative overflow-hidden"
//             variants={itemVariants}
//             whileHover={{ y: -5 }}
//             transition={{ type: "spring", stiffness: 300, damping: 15 }}
//           >
//             {/* Animated background elements */}
//             <motion.div
//               className="absolute -top-20 -right-20 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 x: [0, 20, 0],
//                 y: [0, -20, 0],
//               }}
//               transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
//             ></motion.div>

//             <motion.div
//               className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#e76f51]/10 rounded-full blur-3xl"
//               animate={{
//                 scale: [1.2, 1, 1.2],
//                 x: [0, -20, 0],
//                 y: [0, 20, 0],
//               }}
//               transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
//             ></motion.div>

//             {/* Animated particles */}
//             {Array.from({ length: 8 }).map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-2 h-2 rounded-full bg-amber-500/30"
//                 style={{
//                   top: `${Math.random() * 100}%`,
//                   left: `${Math.random() * 100}%`,
//                 }}
//                 animate={{
//                   y: [0, -20, 0],
//                   opacity: [0, 1, 0],
//                 }}
//                 transition={{
//                   duration: 3 + Math.random() * 2,
//                   repeat: Number.POSITIVE_INFINITY,
//                   delay: Math.random() * 2,
//                 }}
//               />
//             ))}

//             <div className="relative z-10">
//               <motion.div
//                 className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-500 to-[#e76f51] p-0.5 shadow-lg"
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//               >
//                 <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
//                   <motion.div
//                     animate={{
//                       scale: [1, 1.2, 1],
//                       rotate: [0, 10, -10, 0],
//                     }}
//                     transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Heart className="h-10 w-10 text-[#e76f51]" />
//                   </motion.div>
//                 </div>
//               </motion.div>

//               <motion.h2
//                 className="text-4xl font-bold mb-8 text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-[#e76f51]">
//                   Our Mission
//                 </span>
//               </motion.h2>

//               <motion.div
//                 className="max-w-4xl mx-auto relative"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//               >
//                 <motion.div
//                   className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-[#e76f51]"
//                   initial={{ height: 0 }}
//                   whileInView={{ height: "100%" }}
//                   transition={{ duration: 1, delay: 0.5 }}
//                 ></motion.div>

//                 <p className="text-lg md:text-xl text-muted-foreground leading-relaxed pl-4">
//                   At Redeemed Creative Arts, our mission is to uplift and empower Christian artists by fostering a
//                   dynamic community where creativity, faith, and fellowship thrive together. We connect visual artists,
//                   patrons, and churches to celebrate God-given talents, encourage meaningful engagement, and build
//                   sustainable ministries that inspire, teach, and bless communities. Through art, education, and
//                   collaboration, we aim to glorify Christ, enrich the church body, and nurture the next generation of
//                   creators for His Kingdom.
//                 </p>
//               </motion.div>

//               <motion.div
//                 className="mt-10 flex justify-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.8 }}
//               >
//                 <Link href="/about-mission">
//                   <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 group">
//                     Learn More About Our Mission
//                     <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </Button>
//                 </Link>
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.section>

//         {/* Who We Serve */}
//         <motion.section
//           className="mb-24 relative z-10"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainerVariants}
//         >
//           <motion.div className="text-center mb-16" variants={itemVariants}>
//             <motion.div
//               className="inline-block mb-4 relative"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <motion.span
//                 className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20"
//                 animate={floatingAnimation}
//               >
//                 Our Community
//               </motion.span>
//             </motion.div>

//             <motion.h2
//               className="text-4xl font-bold mb-4 text-center"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-[#e76f51]">
//                 Who We Serve
//               </span>
//             </motion.h2>

//             <motion.p
//               className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               Our platform brings together three key communities in the Christian creative ecosystem
//             </motion.p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8 md:gap-12">
//             {/* Artists */}
//             <motion.div
//               className="group"
//               variants={itemVariants}
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-amber-500 group-hover:border-[#e76f51] transition-all duration-500 h-full transform-gpu group-hover:shadow-2xl group-hover:shadow-amber-500/20">
//                 <div className="relative h-64 overflow-hidden">
//                   <Image
//                     src={artistImage || "/placeholder.svg"}
//                     alt="Artists"
//                     fill
//                     className="object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
//                     whileHover={{ opacity: 0.7 }}
//                     transition={{ duration: 0.3 }}
//                   ></motion.div>

//                   <motion.div
//                     className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
//                     whileHover={{ scale: 1.1, rotate: 10 }}
//                     transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                   >
//                     <Palette className="h-6 w-6 text-[#e76f51]" />
//                   </motion.div>

//                   <motion.div
//                     className="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                   ></motion.div>
//                 </div>

//                 <div className="p-8 relative">
//                   <motion.div
//                     className="absolute -top-10 right-8 w-20 h-20 bg-amber-500/10 rounded-full blur-xl"
//                     animate={{
//                       scale: [1, 1.2, 1],
//                     }}
//                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                   ></motion.div>

//                   <h3 className="text-2xl font-bold mb-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300 relative inline-block">
//                     For Artists
//                     <motion.div
//                       className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e76f51]"
//                       initial={{ width: 0 }}
//                       whileInView={{ width: "100%" }}
//                       transition={{ duration: 0.5, delay: 0.5 }}
//                     ></motion.div>
//                   </h3>

//                   <p className="text-muted-foreground mb-6">
//                     Showcase your faith-inspired art, connect with supporters, and grow your creative ministry.
//                   </p>

//                   <motion.ul
//                     className="space-y-4 mb-8"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.3 }}
//                   >
//                     {["Showcase your artwork", "Sell originals and prints", "Connect with churches"].map((item, i) => (
//                       <motion.li
//                         key={i}
//                         className="flex items-start"
//                         initial={{ x: -10, opacity: 0 }}
//                         whileInView={{ x: 0, opacity: 1 }}
//                         transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
//                       >
//                         <div className="mr-3 mt-1 bg-amber-500/20 rounded-full p-1 group-hover:bg-[#e76f51]/20 transition-colors duration-300">
//                           <Check className="h-4 w-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300" />
//                         </div>
//                         <span className="text-muted-foreground">{item}</span>
//                       </motion.li>
//                     ))}
//                   </motion.ul>

//                   <Link href="/artist-info">
//                     <Button className="w-full bg-gradient-to-r from-amber-500/80 to-amber-500/80 text-white hover:from-[#e76f51] hover:to-[#e76f51] transition-all duration-500 group relative overflow-hidden">
//                       <span className="relative z-10 group-hover:text-white transition-colors duration-300">
//                         Learn More
//                       </span>
//                       <motion.span
//                         className="absolute right-4 group-hover:translate-x-1 transition-transform duration-300"
//                         animate={{ x: [0, 5, 0] }}
//                         transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
//                       >
//                         <ArrowRight className="h-4 w-4" />
//                       </motion.span>
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Patrons */}
//             <motion.div
//               className="group"
//               variants={itemVariants}
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-amber-500 group-hover:border-[#e76f51] transition-all duration-500 h-full transform-gpu group-hover:shadow-2xl group-hover:shadow-amber-500/20">
//                 <div className="relative h-64 overflow-hidden">
//                   <Image
//                     src={patronImage || "/placeholder.svg"}
//                     alt="Patrons"
//                     fill
//                     className="object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
//                     whileHover={{ opacity: 0.7 }}
//                     transition={{ duration: 0.3 }}
//                   ></motion.div>

//                   <motion.div
//                     className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
//                     whileHover={{ scale: 1.1, rotate: 10 }}
//                     transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                   >
//                     <Heart className="h-6 w-6 text-[#e76f51]" />
//                   </motion.div>

//                   <motion.div
//                     className="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                   ></motion.div>
//                 </div>

//                 <div className="p-8 relative">
//                   <motion.div
//                     className="absolute -top-10 right-8 w-20 h-20 bg-amber-500/10 rounded-full blur-xl"
//                     animate={{
//                       scale: [1, 1.2, 1],
//                     }}
//                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                   ></motion.div>

//                   <h3 className="text-2xl font-bold mb-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300 relative inline-block">
//                     For Patrons
//                     <motion.div
//                       className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e76f51]"
//                       initial={{ width: 0 }}
//                       whileInView={{ width: "100%" }}
//                       transition={{ duration: 0.5, delay: 0.6 }}
//                     ></motion.div>
//                   </h3>

//                   <p className="text-muted-foreground mb-6">
//                     Discover faith-inspired art, support Christian artists, and engage with a community that shares your
//                     values.
//                   </p>

//                   <motion.ul
//                     className="space-y-4 mb-8"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.3 }}
//                   >
//                     {["Discover Christian artists", "Support creative ministries", "Earn rewards and recognition"].map(
//                       (item, i) => (
//                         <motion.li
//                           key={i}
//                           className="flex items-start"
//                           initial={{ x: -10, opacity: 0 }}
//                           whileInView={{ x: 0, opacity: 1 }}
//                           transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
//                         >
//                           <div className="mr-3 mt-1 bg-amber-500/20 rounded-full p-1 group-hover:bg-[#e76f51]/20 transition-colors duration-300">
//                             <Check className="h-4 w-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300" />
//                           </div>
//                           <span className="text-muted-foreground">{item}</span>
//                         </motion.li>
//                       ),
//                     )}
//                   </motion.ul>

//                   <Link href="/patron-info">
//                     <Button className="w-full bg-gradient-to-r from-amber-500/80 to-amber-500/80 text-white hover:from-[#e76f51] hover:to-[#e76f51] transition-all duration-500 group relative overflow-hidden">
//                       <span className="relative z-10 group-hover:text-white transition-colors duration-300">
//                         Learn More
//                       </span>
//                       <motion.span
//                         className="absolute right-4 group-hover:translate-x-1 transition-transform duration-300"
//                         animate={{ x: [0, 5, 0] }}
//                         transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
//                       >
//                         <ArrowRight className="h-4 w-4" />
//                       </motion.span>
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Churches */}
//             <motion.div
//               className="group"
//               variants={itemVariants}
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-amber-500 group-hover:border-[#e76f51] transition-all duration-500 h-full transform-gpu group-hover:shadow-2xl group-hover:shadow-amber-500/20">
//                 <div className="relative h-64 overflow-hidden">
//                   <Image
//                     src={churchImage || "/placeholder.svg"}
//                     alt="Churches"
//                     fill
//                     className="object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
//                     whileHover={{ opacity: 0.7 }}
//                     transition={{ duration: 0.3 }}
//                   ></motion.div>

//                   <motion.div
//                     className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
//                     whileHover={{ scale: 1.1, rotate: 10 }}
//                     transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                   >
//                     <Church className="h-6 w-6 text-[#e76f51]" />
//                   </motion.div>

//                   <motion.div
//                     className="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                   ></motion.div>
//                 </div>

//                 <div className="p-8 relative">
//                   <motion.div
//                     className="absolute -top-10 right-8 w-20 h-20 bg-amber-500/10 rounded-full blur-xl"
//                     animate={{
//                       scale: [1, 1.2, 1],
//                     }}
//                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                   ></motion.div>

//                   <h3 className="text-2xl font-bold mb-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300 relative inline-block">
//                     For Churches
//                     <motion.div
//                       className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e76f51]"
//                       initial={{ width: 0 }}
//                       whileInView={{ width: "100%" }}
//                       transition={{ duration: 0.5, delay: 0.7 }}
//                     ></motion.div>
//                   </h3>

//                   <p className="text-muted-foreground mb-6">
//                     Connect with Christian artists, enhance your ministry through visual arts, and engage your
//                     community.
//                   </p>

//                   <motion.ul
//                     className="space-y-4 mb-8"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.3 }}
//                   >
//                     {["Find creative talent", "Host art-focused events", "Engage your congregation"].map((item, i) => (
//                       <motion.li
//                         key={i}
//                         className="flex items-start"
//                         initial={{ x: -10, opacity: 0 }}
//                         whileInView={{ x: 0, opacity: 1 }}
//                         transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
//                       >
//                         <div className="mr-3 mt-1 bg-amber-500/20 rounded-full p-1 group-hover:bg-[#e76f51]/20 transition-colors duration-300">
//                           <Check className="h-4 w-4 text-amber-500 group-hover:text-[#e76f51] transition-colors duration-300" />
//                         </div>
//                         <span className="text-muted-foreground">{item}</span>
//                       </motion.li>
//                     ))}
//                   </motion.ul>

//                   <Link href="/church-info">
//                     <Button className="w-full bg-gradient-to-r from-amber-500/80 to-amber-500/80 text-white hover:from-[#e76f51] hover:to-[#e76f51] transition-all duration-500 group relative overflow-hidden">
//                       <span className="relative z-10 group-hover:text-white transition-colors duration-300">
//                         Learn More
//                       </span>
//                       <motion.span
//                         className="absolute right-4 group-hover:translate-x-1 transition-transform duration-300"
//                         animate={{ x: [0, 5, 0] }}
//                         transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
//                       >
//                         <ArrowRight className="h-4 w-4" />
//                       </motion.span>
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.section>

//         {/* Testimonials */}
//         <motion.section
//           className="mb-24 relative z-10"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainerVariants}
//         >
//           <motion.h2 className="text-3xl font-bold mb-12 text-center text-foreground" variants={itemVariants}>
//             <span className="relative">
//               What Our Community Says
//               <motion.div
//                 className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-amber-500/30"
//                 initial={{ width: 0, left: "50%" }}
//                 whileInView={{ width: "50%", left: "25%" }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.3, duration: 0.8 }}
//               ></motion.div>
//             </span>
//           </motion.h2>

//           <div className="relative h-[300px] md:h-[250px]">
//             <AnimatePresence mode="wait">
//               {testimonials.map(
//                 (testimonial, index) =>
//                   index === activeTestimonial && (
//                     <motion.div
//                       key={index}
//                       className="absolute inset-0"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       transition={{ duration: 0.5 }}
//                     >
//                       <div className="bg-card p-8 rounded-xl border border-amber-500/20 shadow-lg flex flex-col md:flex-row items-center gap-6 h-full">
//                         <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">
//                           <Image
//                             src={testimonial.image || "/placeholder.svg"}
//                             alt={testimonial.name}
//                             fill
//                             className="object-cover rounded-full"
//                           />
//                           <motion.div
//                             className="absolute -inset-1 rounded-full border-2 border-amber-500/50"
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                           ></motion.div>
//                         </div>
//                         <div className="text-center md:text-left">
//                           <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
//                           <h3 className="font-bold text-amber-500">{testimonial.name}</h3>
//                           <p className="text-sm text-muted-foreground">{testimonial.role}</p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ),
//               )}
//             </AnimatePresence>
//           </div>

//           <div className="flex justify-center mt-6 gap-2">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                   index === activeTestimonial ? "bg-amber-500" : "bg-amber-500/30"
//                 }`}
//                 onClick={() => setActiveTestimonial(index)}
//               />
//             ))}
//           </div>
//         </motion.section>

//         {/* Core Values */}
//         <motion.section
//           className="mb-24 relative z-10 overflow-hidden"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainerVariants}
//         >
//           <motion.div
//             className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]"
//             animate={{
//               scale: [1, 1.2, 1],
//               x: [0, -20, 0],
//               y: [0, 20, 0],
//             }}
//             transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
//           ></motion.div>

//           <motion.div
//             className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e76f51]/5 rounded-full blur-[100px]"
//             animate={{
//               scale: [1.2, 1, 1.2],
//               x: [0, 20, 0],
//               y: [0, -20, 0],
//             }}
//             transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
//           ></motion.div>

//           <motion.div className="text-center mb-16" variants={itemVariants}>
//             <motion.div
//               className="inline-block mb-4"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <motion.span
//                 className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20"
//                 animate={floatingAnimation}
//               >
//                 What Guides Us
//               </motion.span>
//             </motion.div>

//             <motion.h2
//               className="text-4xl font-bold mb-4 text-center"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-[#e76f51]">
//                 Our Core Values
//               </span>
//             </motion.h2>

//             <motion.p
//               className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               The principles that guide our community and mission
//             </motion.p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Faith-Driven Creativity",
//                 description:
//                   "We believe all creative gifts are given by God and should be used to honor Him and edify the body of Christ.",
//                 icon: <Star className="h-6 w-6 text-amber-500" />,
//                 color: "amber-500",
//                 gradient: "from-amber-500 to-amber-400",
//               },
//               {
//                 title: "Community & Collaboration",
//                 description:
//                   "We foster authentic connections between artists, patrons, and ministries, encouraging mutual support, mentorship, service and collective worship through art.",
//                 icon: <Users className="h-6 w-6 text-[#e76f51]" />,
//                 color: "[#e76f51]",
//                 gradient: "from-[#e76f51] to-[#e76f51]/80",
//               },
//               {
//                 title: "Integrity & Stewardship",
//                 description:
//                   "We uphold honesty, respect for intellectual property, and transparency in all interactions, ensuring that artists and contributors are supported with fairness and accountability.",
//                 icon: <Check className="h-6 w-6 text-amber-500" />,
//                 color: "amber-500",
//                 gradient: "from-amber-500 to-amber-400",
//               },
//               {
//                 title: "Celebration of Diversity",
//                 description:
//                   "We celebrate the diverse gifts and backgrounds of artists across all mediums, ages, and cultures, reflecting the beauty of God's creation.",
//                 icon: <Heart className="h-6 w-6 text-[#e76f51]" />,
//                 color: "[#e76f51]",
//                 gradient: "from-[#e76f51] to-[#e76f51]/80",
//               },
//               {
//                 title: "Empowerment & Encouragement",
//                 description:
//                   "We equip artists, supporters, and churches to grow in their calling by providing tools, recognition, and opportunities to impact communities through art and other talents.",
//                 icon: <Users className="h-6 w-6 text-amber-500" />,
//                 color: "amber-500",
//                 gradient: "from-amber-500 to-amber-400",
//               },
//               {
//                 title: "Excellence & Innovation",
//                 description:
//                   "We encourage the pursuit of excellence in artistry, innovation in presentation, and creativity in outreach, all grounded in biblical principles.",
//                 icon: <Star className="h-6 w-6 text-[#e76f51]" />,
//                 color: "[#e76f51]",
//                 gradient: "from-[#e76f51] to-[#e76f51]/80",
//               },
//             ].map((value, index) => (
//               <motion.div
//                 key={index}
//                 className="group"
//                 variants={itemVariants}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 * index }}
//                 whileHover={{
//                   y: -10,
//                   transition: { type: "spring", stiffness: 400, damping: 10 },
//                 }}
//               >
//                 <div className="bg-card rounded-xl overflow-hidden h-full relative p-1 transform-gpu">
//                   <motion.div
//                     className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
//                   ></motion.div>

//                   <div className="relative bg-card rounded-lg p-6 h-full z-10">
//                     <motion.div
//                       className={`bg-${value.color}/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-${value.color}/30 transition-colors duration-300`}
//                       whileHover={{ scale: 1.1, rotate: 10 }}
//                       transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                     >
//                       {value.icon}
//                     </motion.div>

//                     <h3
//                       className={`text-xl font-semibold mb-3 text-${value.color} group-hover:text-${value.color} transition-colors duration-300`}
//                     >
//                       {value.title}
//                     </h3>

//                     <motion.div
//                       className={`h-0.5 w-12 bg-${value.color}/50 mb-4`}
//                       initial={{ width: 0 }}
//                       whileInView={{ width: 48 }}
//                       transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
//                     ></motion.div>

//                     <p className="text-muted-foreground">{value.description}</p>

//                     <motion.div
//                       className={`absolute bottom-2 right-2 w-12 h-12 rounded-full bg-${value.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
//                       animate={{
//                         scale: [1, 1.2, 1],
//                       }}
//                       transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                     ></motion.div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         {/* Vision Statement */}
//         <motion.section
//           className="mb-24 relative z-10 overflow-hidden"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainerVariants}
//         >
//           <motion.div
//             className="bg-gradient-to-br from-card to-card/50 p-8 md:p-12 rounded-xl border border-amber-500/30 relative overflow-hidden"
//             variants={itemVariants}
//             whileHover={{ y: -5 }}
//             transition={{ type: "spring", stiffness: 300, damping: 15 }}
//           >
//             {/* Animated background elements */}
//             <motion.div
//               className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 x: [0, -20, 0],
//                 y: [0, 20, 0],
//               }}
//               transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
//             ></motion.div>

//             <motion.div
//               className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e76f51]/5 rounded-full blur-[100px]"
//               animate={{
//                 scale: [1.2, 1, 1.2],
//                 x: [0, 20, 0],
//                 y: [0, -20, 0],
//               }}
//               transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
//             ></motion.div>

//             {/* Animated particles */}
//             {Array.from({ length: 12 }).map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-1 h-1 rounded-full bg-amber-500/40"
//                 style={{
//                   top: `${Math.random() * 100}%`,
//                   left: `${Math.random() * 100}%`,
//                 }}
//                 animate={{
//                   y: [0, -30, 0],
//                   opacity: [0, 1, 0],
//                   scale: [0, 1, 0],
//                 }}
//                 transition={{
//                   duration: 3 + Math.random() * 2,
//                   repeat: Number.POSITIVE_INFINITY,
//                   delay: Math.random() * 2,
//                 }}
//               />
//             ))}

//             <div className="relative z-10">
//               <motion.div
//                 className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-500 to-[#e76f51] p-0.5 shadow-lg"
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//               >
//                 <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
//                   <motion.div
//                     animate={{
//                       scale: [1, 1.2, 1],
//                       rotate: [0, 10, -10, 0],
//                     }}
//                     transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Star className="h-10 w-10 text-amber-500" />
//                   </motion.div>
//                 </div>
//               </motion.div>

//               <motion.h2
//                 className="text-4xl font-bold mb-8 text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-[#e76f51]">
//                   Our Vision
//                 </span>
//               </motion.h2>

//               <motion.div
//                 className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-amber-500/10 shadow-xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//               >
//                 <motion.div
//                   className="absolute -left-2 -right-2 -top-2 -bottom-2 border border-amber-500/20 rounded-xl opacity-0 group-hover:opacity-100"
//                   animate={{
//                     scale: [1, 1.02, 1],
//                   }}
//                   transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                 ></motion.div>

//                 <div className="flex flex-col md:flex-row gap-8 items-center">
//                   <motion.div
//                     className="w-full md:w-1/3 relative"
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: 0.5 }}
//                   >
//                     <div className="aspect-square relative rounded-xl overflow-hidden border-2 border-amber-500/20">
//                       <Image
//                         src="data:image/jpeg;base64,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"
//                         alt="Vision"
//                         fill
//                         className="object-cover"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
//                     </div>

//                     <motion.div
//                       className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-[#e76f51]/20 rounded-full blur-xl"
//                       animate={{
//                         scale: [1, 1.2, 1],
//                       }}
//                       transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                     ></motion.div>
//                   </motion.div>

//                   <motion.div
//                     className="w-full md:w-2/3"
//                     initial={{ opacity: 0, x: 20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: 0.6 }}
//                   >
//                     <p className="text-lg md:text-xl text-muted-foreground leading-relaxed relative">
//                       <span className="text-4xl font-serif text-amber-500/40 absolute -top-4 -left-4">"</span>
//                       To cultivate an active, Christ-centered creative community where artists, patrons, and ministries
//                       unite to inspire, uplift, serve and glorify God through the power of visual arts and storytelling,
//                       fostering engagement, support, and spiritual growth. We support individuals and groups in their
//                       efforts to provide faith-based services to churches, Christian events, and charitable
//                       organizations.
//                       <span className="text-4xl font-serif text-amber-500/40 absolute -bottom-8 -right-4">"</span>
//                     </p>
//                   </motion.div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 className="mt-12 flex justify-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.8 }}
//               >
//                 <Link href="/about-vision">
//                   <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 group">
//                     Learn More About Our Vision
//                     <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </Button>
//                 </Link>
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.section>

//         {/* Stats Counter */}
//         <motion.section
//           className="mb-24 relative z-10"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainerVariants}
//         >
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               { value: "500+", label: "Artists", icon: <Palette className="h-6 w-6 text-amber-500" /> },
//               { value: "1,200+", label: "Patrons", icon: <Heart className="h-6 w-6 text-[#e76f51]" /> },
//               { value: "300+", label: "Churches", icon: <Church className="h-6 w-6 text-amber-500" /> },
//               { value: "5,000+", label: "Artworks", icon: <Star className="h-6 w-6 text-[#e76f51]" /> },
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-card p-6 rounded-lg border border-amber-500/20 text-center"
//                 variants={itemVariants}
//                 whileHover={{
//                   y: -5,
//                   boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
//                 }}
//               >
//                 <motion.div
//                   className="mx-auto w-12 h-12 rounded-full bg-card flex items-center justify-center mb-4"
//                   animate={floatingAnimation}
//                 >
//                   {stat.icon}
//                 </motion.div>
//                 <motion.h3
//                   className="text-3xl font-bold text-foreground mb-1"
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                 >
//                   {stat.value}
//                 </motion.h3>
//                 <p className="text-muted-foreground">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         {/* Call to Action */}
//         <motion.section
//           className="text-center relative z-10"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={staggerContainerVariants}
//         >
//           <motion.div
//             className="bg-card p-12 rounded-xl border border-border relative overflow-hidden"
//             variants={itemVariants}
//           >
//             <motion.div
//               className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 x: [0, 20, 0],
//                 y: [0, -20, 0],
//               }}
//               transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
//             ></motion.div>
//             <motion.div
//               className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 x: [0, -20, 0],
//                 y: [0, 20, 0],
//               }}
//               transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
//             ></motion.div>

//             <div className="relative z-10">
//               <motion.div
//                 className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-[#e76f51] p-0.5"
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//               >
//                 <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
//                   <Heart className="h-8 w-8 text-[#e76f51]" />
//                 </div>
//               </motion.div>

//               <h2 className="text-3xl font-bold mb-4 text-foreground">Join Our Community Today</h2>
//               <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
//                 Whether you're an artist, patron, or church, there's a place for you in our faith-based creative
//                 community.
//               </p>
//               <div className="flex flex-wrap justify-center gap-4">
//                 <Link href="/register">
//                   <Button
//                     size="lg"
//                     className="bg-amber-500 text-white hover:bg-white hover:text-amber-500 group relative overflow-hidden"
//                   >
//                     <span className="relative z-10">Sign Up Now</span>
//                     <motion.span
//                       className="absolute inset-0 bg-white"
//                       initial={{ x: "-100%" }}
//                       whileHover={{ x: 0 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                     <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45 relative z-10" />
//                   </Button>
//                 </Link>
//                 <Link href="/contact">
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white relative overflow-hidden group"
//                   >
//                     <span className="relative z-10">Contact Us</span>
//                     <motion.span
//                       className="absolute inset-0 bg-amber-500"
//                       initial={{ y: "100%" }}
//                       whileHover={{ y: 0 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </motion.section>
//       </div>
//     </div>
//   )
// }

"use client";

import React from "react";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Palette,
  Heart,
  Church,
  Users,
  Star,
  Check,
  Instagram,
  Facebook,
  Twitter,
  ArrowDown,
  Eye,
  EyeIcon,
  EyeClosed,
  EyeOff,
  ScanEye,
  LandPlot,
  Goal,
} from "lucide-react";

// Import Swiper and modules
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Real images from Unsplash
const heroImage =
  "https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?q=80&w=2070&auto=format&fit=crop";
const artworkImages = [
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2145&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=2145&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783928621-7a13d66a62b1?q=80&w=2145&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482245294234-b3f2f8d5f1a4?q=80&w=2030&auto=format&fit=crop",
];

const artistImage =
  "https://images.unsplash.com/photo-1544413164-5f1b361f5b69?q=80&w=1974&auto=format&fit=crop";
const patronImage =
  "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop";
const churchImage =
  "https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2070&auto=format&fit=crop";

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Visual Artist",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    quote:
      "Redeemed Creative Arts has transformed my artistic journey. I've found a supportive community that understands the intersection of faith and creativity.",
  },
  {
    name: "Michael Thompson",
    role: "Church Arts Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    quote:
      "Finding talented Christian artists used to be challenging. This platform has connected our church with incredible artists who share our vision and values.",
  },
  {
    name: "Rebecca Martinez",
    role: "Art Patron",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    quote:
      "Supporting faith-based artists brings me joy. I've discovered beautiful artwork that speaks to my soul and connects with my beliefs.",
  },
];

// Gallery images
const galleryImages = [
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2145&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579541591970-e5795a602732?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=2145&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783928621-7a13d66a62b1?q=80&w=2145&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?q=80&w=1974&auto=format&fit=crop",
];

// Stats
const stats = [
  { value: 500, label: "Artists", icon: <Palette className="h-6 w-6" /> },
  { value: 1200, label: "Patrons", icon: <Heart className="h-6 w-6" /> },
  { value: 350, label: "Churches", icon: <Church className="h-6 w-6" /> },
  { value: 5000, label: "Artworks", icon: <Star className="h-6 w-6" /> },
];

// Counter animation component
const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);

  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = Number.parseInt(value.toString(), 10);

    // Don't run if start and end are the same
    if (start === end) return;

    const incrementTime = (duration / end) * 1000;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => {
      clearInterval(timer);
    };
  }, [value, duration, isInView]);

  return <span ref={countRef}>{count}</span>;
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    hover: {
      scale: 1.05,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#e76f51]/5 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 5,
          }}
        ></motion.div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-500/20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Hero Section with Parallax */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        ref={heroRef}
      >
        <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
          <Image
            src={heroImage || "/placeholder.svg"}
            alt="Redeemed Creative Arts"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
          >
            <motion.div
              className="mb-4 inline-block"
              variants={itemVariants}
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <span className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20">
                Faith-Inspired Creativity
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground"
              variants={itemVariants}
            >
              <span className="text-amber-500 inline-block">Redeemed</span>{" "}
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                Creative
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-[#e76f51]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Arts
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-8"
              variants={itemVariants}
            >
              Building bridges between{" "}
              <motion.span
                className="text-amber-500 font-medium"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 0,
                }}
              >
                Artists
              </motion.span>
              ,{" "}
              <motion.span
                className="text-[#e76f51] font-medium"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 0.7,
                }}
              >
                Patrons
              </motion.span>
              , and{" "}
              <motion.span
                className="text-primary font-medium"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 1.4,
                }}
              >
                Churches
              </motion.span>
              .
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={itemVariants}
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-amber-500 text-white hover:bg-white hover:text-black transition-all duration-1000 group relative overflow-hidden"
                >
                  <span className="relative z-10">Join Our Community</span>
                  <motion.span
                    className="absolute inset-0 bg-white z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:border-white hover:text-white transition-all duration-1000 relative overflow-hidden group"
                >
                  <span className="relative z-10">Learn More</span>
                  <motion.span
                    className="absolute inset-0 bg-amber-500 z-0"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-amber-500/30 bg-background/30 backdrop-blur-sm"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }}
          >
            <ArrowDown className="h-5 w-5 text-amber-500" />
          </Button>
        </motion.div>
      </section>

      {/* Featured Artwork Slider */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4 mb-12">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-[#e76f51]/10 text-[#e76f51] rounded-full text-sm font-medium border border-[#e76f51]/20">
                Featured Artwork
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground"
              variants={itemVariants}
            >
              Inspiring <span className="text-[#e76f51]">Faith-Based</span>{" "}
              Creations
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Explore a collection of stunning artwork from our talented
              Christian artists
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative px-4 md:px-10"
        >
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
            navigation={true}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            {artworkImages.map((image, index) => (
              <SwiperSlide
                key={index}
                className="max-w-[300px] md:max-w-[500px]"
              >
                <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                  <div className="relative h-[400px] w-full overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Artwork ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">
                      Artwork Title {index + 1}
                    </h3>
                    <p className="text-white/80">Artist Name</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      {/* Mission Statement with Parallax */}
      <section className="py-20 relative z-10 overflow-hidden">
        <motion.section
          className=" relative z-10 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.div
            className="bg-gradient-to-br from-card to-card/50 p-8 md:p-12 rounded-xl  relative overflow-hidden"
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
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: 2,
              }}
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
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Goal className="h-10 w-10 text-white" />
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
                  At Redeemed Creative Arts, our mission is to uplift and
                  empower Christian artists by fostering a dynamic community
                  where creativity, faith, and fellowship thrive together. We
                  connect visual artists, patrons, and churches to celebrate
                  God-given talents, encourage meaningful engagement, and build
                  sustainable ministries that inspire, teach, and bless
                  communities. Through art, education, and collaboration, we aim
                  to glorify Christ, enrich the church body, and nurture the
                  next generation of creators for His Kingdom.
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

        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${churchImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"></div>
        </motion.div>

        {/* <div className="container mx-auto px-4">
          <motion.div
            className="bg-card/80 backdrop-blur-md p-8 md:p-12 rounded-xl border border-[#e76f51] relative overflow-hidden max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>

            <div className="relative z-10">
              <motion.div
                className="w-16 h-16 rounded-full bg-[#e76f51]/10 flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Heart className="h-8 w-8 text-[#e76f51]" />
              </motion.div>

              <h2 className="text-3xl font-bold mb-6 text-center text-[#e76f51]">
                Our Mission
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                At{" "}
                <span className="text-amber-500 font-medium">
                  Redeemed Creative Arts
                </span>
                , our mission is to uplift and empower Christian artists by
                fostering a dynamic community where creativity, faith, and
                fellowship thrive together. We connect visual artists, patrons,
                and churches to celebrate God-given talents, encourage
                meaningful engagement, and build sustainable ministries that
                inspire, teach, and bless communities.
              </p>
            </div>
          </motion.div>
        </div> */}
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 relative z-10 bg-gradient-to-b from-background/95 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  {React.cloneElement(stat.icon, {
                    className: "h-6 w-6 text-amber-500",
                  })}
                </motion.div>
                <h3 className="text-4xl font-bold text-foreground mb-2">
                  <Counter value={stat.value} />+
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20">
                Our Community
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-amber-500"
              variants={itemVariants}
            >
              Who We Serve
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Our platform brings together three key groups to create a thriving
              creative ecosystem
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Artists */}
            <motion.div
              className="relative group"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
            >
              <motion.div
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-amber-500 group-hover:border-[#e76f51] transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64">
                  <Image
                    src={artistImage || "/placeholder.svg"}
                    alt="Artists"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      backgroundColor: "rgba(217, 119, 6, 0.8)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Palette className="h-6 w-6 text-[#e76f51]" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-500">
                    For Artists
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Showcase your faith-inspired art, connect with supporters,
                    and grow your creative ministry.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Showcase your artwork
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Sell originals and prints
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Connect with churches
                      </span>
                    </motion.li>
                  </ul>
                  <Link href="/artist-info">
                    <Button className="w-full bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10">Learn More</span>
                      <motion.span
                        className="absolute inset-0 bg-amber-500 z-0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Patrons */}
            <motion.div
              className="relative group"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
            >
              <motion.div
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-amber-500 group-hover:border-[#e76f51] transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64">
                  <Image
                    src={patronImage || "/placeholder.svg"}
                    alt="Patrons"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      backgroundColor: "rgba(217, 119, 6, 0.8)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart className="h-6 w-6 text-[#e76f51]" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-500">
                    For Patrons
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Discover faith-inspired art, support Christian artists, and
                    engage with a community that shares your values.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Discover Christian artists
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Support creative ministries
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Earn rewards and recognition
                      </span>
                    </motion.li>
                  </ul>
                  <Link href="/patron-info">
                    <Button className="w-full bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10">Learn More</span>
                      <motion.span
                        className="absolute inset-0 bg-amber-500 z-0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Churches */}
            <motion.div
              className="relative group"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHoverVariants}
            >
              <motion.div
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-amber-500 group-hover:border-[#e76f51] transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64">
                  <Image
                    src={churchImage || "/placeholder.svg"}
                    alt="Churches"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 left-4 bg-amber-900/60 p-3 rounded-full"
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      backgroundColor: "rgba(217, 119, 6, 0.8)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Church className="h-6 w-6 text-[#e76f51]" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-amber-500">
                    For Churches
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with Christian artists, enhance your ministry
                    through visual arts, and engage your community.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Find creative talent
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Host art-focused events
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <div className="bg-amber-500/10 p-1 rounded-full mr-2 shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Engage your congregation
                      </span>
                    </motion.li>
                  </ul>
                  <Link href="/church-info">
                    <Button className="w-full bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer transition-all duration-500 group relative overflow-hidden">
                      <span className="relative z-10">Learn More</span>
                      <motion.span
                        className="absolute inset-0 bg-amber-500 z-0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      {/* <section className="py-20 relative z-10 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-[#e76f51]/10 text-[#e76f51] rounded-full text-sm font-medium border border-[#e76f51]/20">
                Testimonials
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground"
              variants={itemVariants}
            >
              What Our <span className="text-[#e76f51]">Community</span> Says
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Hear from artists, patrons, and churches who have found value in
              our platform
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[Pagination, Autoplay]}
              className="testimonialSwiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="bg-card border border-border rounded-xl p-6 h-full flex flex-col"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <div className="mb-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < 4
                                ? "fill-amber-500 text-amber-500"
                                : "fill-muted text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section> */}

      {/* Testimonials */}
      <motion.section
        className="mb-24 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.div variants={itemVariants} className="mb-4 inline-block">
            <span className="px-4 py-1 bg-[#e76f51]/10 text-[#e76f51] rounded-full text-sm font-medium border border-[#e76f51]/20">
              Testimonials
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground"
            variants={itemVariants}
          >
            What Our <span className="text-[#e76f51]">Community</span> Says
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Hear from artists, patrons, and churches who have found value in our
            platform
          </motion.p>
        </motion.div>

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
                    <div className="max-w-5xl mx-auto bg-card p-8 rounded-xl border border-amber-500/20 shadow-lg flex flex-col md:flex-row items-center gap-6 h-full">
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
                          transition={{
                            duration: 8,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        ></motion.div>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-muted-foreground mb-4 italic">
                          "{testimonial.quote}"
                        </p>
                        <h3 className="font-bold text-amber-500">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
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

      {/* Gallery Grid with Hover Effects */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="px-4 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium border border-amber-500/20">
                Gallery
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground"
              variants={itemVariants}
            >
              Explore Our <span className="text-amber-500">Collection</span>
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              A glimpse into the diverse artwork created by our talented
              community
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative group overflow-hidden rounded-xl"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Gallery Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">
                      Artwork Title {index + 1}
                    </h3>
                    <p className="text-white/80">Artist Name</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-500"
              >
                View Full Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Values with Interactive Cards */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-background to-background/95">
        <div className="max-w-7xl mx-auto px-4">
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
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: 2,
              }}
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
                  <div className={`border border-${value.color} bg-card rounded-[40px] overflow-hidden h-full relative p-1 transform-gpu`}>
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${value.gradient} border-2 border-${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
                    ></motion.div>

                    <div className="relative bg-card rounded-lg p-6 h-full z-10">
                      <div className="flex items-center justify-center">
                        <motion.div
                          className={`bg-${value.color}/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-300`}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          {value.icon}
                        </motion.div>
                      </div>

                      <h3
                        className={`text-xl text-center font-bold mb-3 text-${value.color} group-hover:text-white transition-colors duration-300`}
                      >
                        {value.title}
                      </h3>

                      <motion.div
                        className={`h-0.5 w-12 bg-${value.color}/50 mb-4`}
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      ></motion.div>

                      <p className="text-muted-foreground text-center">
                        {value.description}
                      </p>

                      <motion.div
                        className={`absolute bottom-2 right-2 w-12 h-12 rounded-full bg-${value.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </section>

      {/* Vision Statement with Parallax */}
      <section className="py-20 relative z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${artworkImages[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-background/75 backdrop-blur-lg"></div>
        </motion.div>

        <div className="container mx-auto px-4">
          {/* Vision Statement */}
          <motion.section
            className="mb-24 relative z-10 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
          >
            <motion.div
              className="bg-gradient-to-br from-card to-card/50 p-8 md:p-12 rounded-xl  relative overflow-hidden"
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
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 2,
                }}
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
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <ScanEye className="h-10 w-10 text-white" />
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
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
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
                          src="data:image/jpeg;base64,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"
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
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      ></motion.div>
                    </motion.div>

                    <motion.div
                      className="w-full md:w-2/3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed relative">
                        <span className="text-4xl font-serif text-amber-500/40 absolute -top-4 -left-4">
                          "
                        </span>
                        To cultivate an active, Christ-centered creative
                        community where artists, patrons, and ministries unite
                        to inspire, uplift, serve and glorify God through the
                        power of visual arts and storytelling, fostering
                        engagement, support, and spiritual growth. We support
                        individuals and groups in their efforts to provide
                        faith-based services to churches, Christian events, and
                        charitable organizations.
                        <span className="text-4xl font-serif text-amber-500/40 absolute -bottom-8 -right-4">
                          "
                        </span>
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
        </div>
      </section>

      {/* Call to Action with Animated Background */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-card p-12 rounded-xl  relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
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
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
              }}
            ></motion.div>

            <div className="relative z-10 text-center">
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-[#e76f51] p-1 mx-auto mb-6"
                animate={{
                  rotate: 360,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  backgroundPosition: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <LandPlot className="h-10 w-10 text-white" />
                </div>
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Join Our <span className="text-amber-500">Community</span> Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Whether you're an artist, patron, or church, there's a place for
                you in our faith-based creative community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:opacity-90 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Sign Up Now</span>
                    <motion.span
                      className="absolute inset-0 bg-white z-0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-500"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>

              <motion.div
                className="flex justify-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border hover:border-amber-500 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Instagram className="h-5 w-5 text-amber-500" />
                </motion.a>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border hover:border-amber-500 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Facebook className="h-5 w-5 text-amber-500" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border hover:border-amber-500 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Twitter className="h-5 w-5 text-amber-500" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with animated elements */}
      {/* <footer className="py-10 relative z-10 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Heart className="h-5 w-5 text-amber-500" />
                </motion.div>
                <h3 className="text-xl font-bold">Redeemed Arts</h3>
              </motion.div>
              <motion.p
                className="text-sm text-muted-foreground mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Building bridges between Artists, Patrons, and Churches through
                faith-inspired creativity.
              </motion.p>
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-amber-500 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-amber-500 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-amber-500 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </motion.div>
            </div>

            <div>
              <motion.h4
                className="text-lg font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Quick Links
              </motion.h4>
              <motion.ul
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/artists"
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    Artists
                  </Link>
                </li>
                <li>
                  <Link
                    href="/patrons"
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    Patrons
                  </Link>
                </li>
                <li>
                  <Link
                    href="/churches"
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    Churches
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
              </motion.ul>
            </div>

            <div>
              <motion.h4
                className="text-lg font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Resources
              </motion.h4>
              <motion.ul
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-muted-foreground hover:text-amber-500 transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </motion.ul>
            </div>

            <div>
              <motion.h4
                className="text-lg font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Subscribe
              </motion.h4>
              <motion.p
                className="text-sm text-muted-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Stay updated with our latest news and events
              </motion.p>
              <motion.form
                className="flex gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button
                  type="submit"
                  className="bg-amber-500 text-white hover:bg-amber-600"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.form>
            </div>
          </div>

          <motion.div
            className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>
              © {new Date().getFullYear()} Redeemed Creative Arts. All rights
              reserved.
            </p>
          </motion.div>
        </div>
      </footer> */}
    </div>
  );
}
