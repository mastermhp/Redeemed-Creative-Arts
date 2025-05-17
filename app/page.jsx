"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Palette, Heart, Church, Users, Star, Check } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"

// Real images from Unsplash
const heroImage = "https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?q=80&w=2070&auto=format&fit=crop"
const artworkImages = [
  "",
  "",
  "",
  "",
  "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482245294234-b3f2f8d5f1a4?q=80&w=2030&auto=format&fit=crop",
]

 const artistImage =
    "https://images.unsplash.com/photo-1544413164-5f1b361f5b69?q=80&w=1974&auto=format&fit=crop"
  const patronImage =
    // "https://images.unsplash.com/photo-1579541591970-e5795a602732?q=80&w=2070&auto=format&fit=crop"
    "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop"
  const churchImage =
    "https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2070&auto=format&fit=crop"

export default function Home() {
  const containerRef = useRef(null)

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

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [-50, 50, -50],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [50, -50, 50],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
      </div>

      {/* Hero Section */}
      <div className="pt-20 md:pt-32 mb-16 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
            variants={itemVariants}
          >
            <span className="text-primary">Redeemed</span> Creative Arts
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            Building bridges between Artists, Patrons, and Churches.
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
            <Link href="/register">
              <Button size="lg" className="bg-coral-red text-white hover:bg-white hover:text-black transition-all duration-1000 group">
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image
            src={heroImage || "/placeholder.svg"}
            alt="Redeemed Creative Arts"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Faith-Inspired Creativity</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A community where Christian artists, supporters, and churches connect to celebrate God-given talents.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div
          className="bg-card p-8 md:p-10 rounded-xl border border-border relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
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

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              At Redeemed Creative Arts, our mission is to uplift and empower Christian artists by fostering a dynamic
              community where creativity, faith, and fellowship thrive together. We connect visual artists, patrons, and
              churches to celebrate God-given talents, encourage meaningful engagement, and build sustainable ministries
              that inspire, teach, and bless communities. Through art, education, and collaboration, we aim to glorify
              Christ, enrich the church body, and nurture the next generation of creators for His Kingdom.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Who We Serve */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-foreground" variants={itemVariants}>
          Who We Serve
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Artists */}
          <motion.div
            className="bg-card rounded-xl overflow-hidden shadow-lg border border-border group hover:border-primary transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="relative h-48">
              <Image
                src={artistImage || "/placeholder.svg"}
                alt="Artists"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              <div className="absolute top-4 left-4 bg-primary/90 p-2 rounded-full">
                <Palette className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">For Artists</h3>
              <p className="text-muted-foreground mb-4">
                Showcase your faith-inspired art, connect with supporters, and grow your creative ministry.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Showcase your artwork</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Sell originals and prints</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Connect with churches</span>
                </li>
              </ul>
              <Link href="/artist-info">
                <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Patrons */}
          <motion.div
            className="bg-card rounded-xl overflow-hidden shadow-lg border border-border group hover:border-primary transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="relative h-48">
              <Image
                src={patronImage || "/placeholder.svg"}
                alt="Patrons"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              <div className="absolute top-4 left-4 bg-accent/90 p-2 rounded-full">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-accent">For Patrons</h3>
              <p className="text-muted-foreground mb-4">
                Discover faith-inspired art, support Christian artists, and engage with a community that shares your
                values.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Discover Christian artists</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Support creative ministries</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Earn rewards and recognition</span>
                </li>
              </ul>
              <Link href="/patron-info">
                <Button className="w-full bg-accent/10 text-accent hover:bg-accent hover:text-primary-foreground group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Churches */}
          <motion.div
            className="bg-card rounded-xl overflow-hidden shadow-lg border border-border group hover:border-primary transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="relative h-48">
              <Image
                src={churchImage || "/placeholder.svg"}
                alt="Churches"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              <div className="absolute top-4 left-4 bg-secondary/90 p-2 rounded-full">
                <Church className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-secondary">For Churches</h3>
              <p className="text-muted-foreground mb-4">
                Connect with Christian artists, enhance your ministry through visual arts, and engage your community.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Find creative talent</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Host art-focused events</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-secondary mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Engage your congregation</span>
                </li>
              </ul>
              <Link href="/church-info">
                <Button className="w-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-foreground" variants={itemVariants}>
          Our Core Values
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Faith-Driven Creativity",
              description:
                "We believe all creative gifts are given by God and should be used to honor Him and edify the body of Christ.",
              icon: <Star className="h-6 w-6 text-primary" />,
              color: "primary",
            },
            {
              title: "Community & Collaboration",
              description:
                "We foster authentic connections between artists, patrons, and ministries, encouraging mutual support, mentorship, service and collective worship through art.",
              icon: <Users className="h-6 w-6 text-accent" />,
              color: "accent",
            },
            {
              title: "Integrity & Stewardship",
              description:
                "We uphold honesty, respect for intellectual property, and transparency in all interactions, ensuring that artists and contributors are supported with fairness and accountability.",
              icon: <Check className="h-6 w-6 text-secondary" />,
              color: "secondary",
            },
            {
              title: "Celebration of Diversity",
              description:
                "We celebrate the diverse gifts and backgrounds of artists across all mediums, ages, and cultures, reflecting the beauty of God's creation.",
              icon: <Heart className="h-6 w-6 text-destructive" />,
              color: "destructive",
            },
            {
              title: "Empowerment & Encouragement",
              description:
                "We equip artists, supporters, and churches to grow in their calling by providing tools, recognition, and opportunities to impact communities through art and other talents.",
              icon: <Users className="h-6 w-6 text-primary" />,
              color: "primary",
            },
            {
              title: "Excellence & Innovation",
              description:
                "We encourage the pursuit of excellence in artistry, innovation in presentation, and creativity in outreach, all grounded in biblical principles.",
              icon: <Star className="h-6 w-6 text-accent" />,
              color: "accent",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className={`bg-card p-6 rounded-lg shadow-md border border-border hover:border-${value.color} transition-all duration-300 hover:shadow-lg`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className={`bg-${value.color}/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                {value.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 text-${value.color}`}>{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Vision Statement */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div
          className="bg-card p-8 md:p-10 rounded-xl border border-border relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
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
            <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              To cultivate an active, Christ-centered creative community where artists, patrons, and ministries unite to
              inspire, uplift, serve and glorify God through the power of visual arts and storytelling, fostering
              engagement, support, and spiritual growth. We support individuals and groups in their efforts to provide
              faith-based services to churches, Christian events, and charitable organizations.
            </p>
          </div>
        </motion.div>
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
            <h2 className="text-3xl font-bold mb-4 text-foreground">Join Our Community Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Whether you're an artist, patron, or church, there's a place for you in our faith-based creative
              community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}
