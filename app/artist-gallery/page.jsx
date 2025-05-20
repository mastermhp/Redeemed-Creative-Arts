"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  MessageSquare,
  Share2,
  Filter,
  Search,
  ChevronDown,
  X,
  Plus,
  Palette,
  Sparkles,
  Bookmark,
  Eye,
  Download,
  Maximize2,
  Check,
} from "lucide-react";

// Sample artwork data
const artworks = [
  {
    id: 1,
    title: "Divine Light",
    artist: "Sarah Johnson",
    medium: "Oil on Canvas",
    category: "Painting",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 245,
    comments: 32,
    featured: true,
  },
  {
    id: 2,
    title: "Redemption Path",
    artist: "Michael Chen",
    medium: "Digital Art",
    category: "Digital",
    image: "/artworkImages2.png",
    likes: 189,
    comments: 24,
    featured: false,
  },
  {
    id: 3,
    title: "Heavenly Grace",
    artist: "Emma Wilson",
    medium: "Watercolor",
    category: "Painting",
    image: "/artworkImages1.png",
    likes: 312,
    comments: 41,
    featured: true,
  },
  {
    id: 4,
    title: "Faith Journey",
    artist: "David Martinez",
    medium: "Acrylic on Canvas",
    category: "Painting",
    image:
      "/artworkImages3.png",
    likes: 178,
    comments: 19,
    featured: false,
  },
  {
    id: 5,
    title: "Sacred Geometry",
    artist: "Olivia Taylor",
    medium: "Mixed Media",
    category: "Mixed Media",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 267,
    comments: 35,
    featured: true,
  },
  {
    id: 6,
    title: "Eternal Hope",
    artist: "James Wilson",
    medium: "Photography",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 203,
    comments: 27,
    featured: false,
  },
  {
    id: 7,
    title: "Divine Inspiration",
    artist: "Sophia Lee",
    medium: "Sculpture",
    category: "Sculpture",
    image:
      "https://images.unsplash.com/photo-1576773689115-5cd2b0223523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 156,
    comments: 18,
    featured: false,
  },
  {
    id: 8,
    title: "Spiritual Awakening",
    artist: "Noah Garcia",
    medium: "Digital Art",
    category: "Digital",
    image:
      "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 289,
    comments: 38,
    featured: true,
  },
];

// Categories for filtering
const categories = [
  "All",
  "Painting",
  "Digital",
  "Photography",
  "Sculpture",
  "Mixed Media",
];

export default function ArtistGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const heroRef = useRef(null);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isMobile]);

  // Parallax scroll effect for hero section
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);

  // Filter artworks based on category and search
  const filteredArtworks = artworks.filter((artwork) => {
    const matchesCategory =
      selectedCategory === "All" || artwork.category === selectedCategory;
    const matchesSearch =
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        staggerChildren: 0.1,
      },
    },
  };

  const artworkCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      },
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const filterItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference",
    },
    button: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference",
    },
    artwork: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      mixBlendMode: "difference",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  // Word-by-word animation
  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

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
    ));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/95 pt-24 pb-20 overflow-hidden">
      {/* Custom cursor (desktop only) */}
      {!isMobile && (
        <motion.div
          className="fixed w-8 h-8 rounded-full pointer-events-none z-50 flex items-center justify-center"
          variants={cursorVariants}
          animate={cursorVariant}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            mass: 0.5,
          }}
        >
          {cursorVariant === "artwork" && (
            <Eye className="text-white h-6 w-6" />
          )}
        </motion.div>
      )}

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative h-[70vh] overflow-hidden mb-16"
        style={{ opacity: heroOpacity }}
      >
        {/* Background image with parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Art gallery"
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
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full">
                  <Palette className="h-10 w-10 text-white" />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 z-[-1]"
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
              {splitText("Artist Gallery")}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-200 mb-8"
              variants={fadeInUpVariants}
            >
              {splitText(
                "Discover and explore faith-inspired artwork from our talented community of Christian artists."
              )}
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              className="flex flex-wrap gap-4 justify-center"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="mr-2 h-4 w-4" /> Explore Gallery
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
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
                  <Plus className="mr-2 h-4 w-4" /> Submit Your Artwork
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-8 w-8 text-white/70" />
        </motion.div>
      </motion.div>

      {/* Gallery Section */}
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Search and Filter */}
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
              placeholder="Search by title or artist..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-card border border-border focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-300"
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

          {/* Filter */}
          <motion.div
            className="relative w-full md:w-auto"
            variants={fadeInUpVariants}
          >
            <Button
              variant="outline"
              className="w-full md:w-auto flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <Filter className="h-4 w-4" />
              Filter by Category
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-64 rounded-lg bg-card border border-border shadow-lg z-30 overflow-hidden"
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
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-500"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        variants={filterItemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        custom={index}
                        onMouseEnter={() => setCursorVariant("button")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        {category}
                        {selectedCategory === category && (
                          <motion.span
                            className="float-right"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 15,
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Featured Artworks */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-8 flex items-center"
            variants={fadeInUpVariants}
          >
            <Sparkles className="mr-2 h-6 w-6 text-purple-500" />
            Featured Artworks
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainerVariants}
          >
            {filteredArtworks
              .filter((artwork) => artwork.featured)
              .map((artwork) => (
                <motion.div
                  key={artwork.id}
                  className="group relative"
                  variants={artworkCardVariants}
                  whileHover="hover"
                  onMouseEnter={() => setCursorVariant("artwork")}
                  onMouseLeave={() => setCursorVariant("default")}
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Featured badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Featured
                    </div>

                    {/* Artwork info overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {artwork.title}
                      </h3>
                      <p className="text-white/80 mb-3">by {artwork.artist}</p>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/70">
                          {artwork.medium}
                        </span>

                        <div className="flex gap-3">
                          <div className="flex items-center text-white/80">
                            <Heart className="h-4 w-4 mr-1" />
                            <span className="text-sm">{artwork.likes}</span>
                          </div>
                          <div className="flex items-center text-white/80">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span className="text-sm">{artwork.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>

        {/* All Artworks */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-8 flex items-center"
            variants={fadeInUpVariants}
          >
            <Palette className="mr-2 h-6 w-6 text-purple-500" />
            {selectedCategory === "All"
              ? "All Artworks"
              : `${selectedCategory} Artworks`}
          </motion.h2>

          {filteredArtworks.length === 0 ? (
            <motion.div
              className="text-center py-16"
              variants={fadeInUpVariants}
            >
              <div className="mb-4">
                <Search className="h-12 w-12 text-muted-foreground mx-auto" />
              </div>
              <h3 className="text-xl font-medium mb-2">No artworks found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={staggerContainerVariants}
            >
              {filteredArtworks.map((artwork) => (
                <motion.div
                  key={artwork.id}
                  className="group relative bg-card rounded-xl overflow-hidden border border-border"
                  variants={artworkCardVariants}
                  whileHover="hover"
                  onMouseEnter={() => setCursorVariant("artwork")}
                  onMouseLeave={() => setCursorVariant("default")}
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Quick action buttons */}
                    <div className="absolute top-0 left-0 right-0 p-3 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium mb-1 group-hover:text-purple-500 transition-colors">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      by {artwork.artist}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-muted rounded-full">
                        {artwork.category}
                      </span>

                      <div className="flex gap-3 text-muted-foreground">
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          <span className="text-xs">{artwork.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          <span className="text-xs">{artwork.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Load More Artworks
          </Button>
        </motion.div>
      </div>

      {/* Artwork Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              className="bg-card rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="relative aspect-video">
                  <Image
                    src={selectedArtwork.image || "/placeholder.svg"}
                    alt={selectedArtwork.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <button
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full"
                  onClick={() => setSelectedArtwork(null)}
                >
                  <X className="h-5 w-5" />
                </button>

                <button className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full">
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {selectedArtwork.title}
                    </h2>
                    <p className="text-muted-foreground">
                      by {selectedArtwork.artist}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Medium
                    </h3>
                    <p>{selectedArtwork.medium}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Category
                    </h3>
                    <p>{selectedArtwork.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Engagement
                    </h3>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-purple-500" />
                        <span>{selectedArtwork.likes} likes</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1 text-purple-500" />
                        <span>{selectedArtwork.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Description
                  </h3>
                  <p className="text-muted-foreground">
                    This beautiful artwork represents the artist's
                    interpretation of faith and spirituality. The piece explores
                    themes of redemption, hope, and divine inspiration through a
                    unique visual language that speaks to the soul.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" /> View Comments
                  </Button>
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" /> View Artist Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <motion.div
        className="container mx-auto px-4 mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div
          className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-amber-500/10 rounded-2xl p-8 md:p-12 border border-purple-500/20 backdrop-blur-sm relative overflow-hidden"
          variants={fadeInUpVariants}
        >
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}
          />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              className="inline-block mb-6"
              variants={fadeInUpVariants}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 z-[-1]"
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

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUpVariants}
            >
              Ready to Share Your Faith-Inspired Art?
            </motion.h2>

            <motion.p
              className="text-muted-foreground mb-8"
              variants={fadeInUpVariants}
            >
              Join our community of Christian artists and share your creative
              expressions of faith. Get feedback, connect with patrons, and
              inspire others with your God-given talent.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              variants={fadeInUpVariants}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Submit Your Artwork
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
              >
                <span className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Learn More
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
