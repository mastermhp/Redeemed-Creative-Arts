"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Heart, Star, ShoppingCart, Eye, ArrowRight, Award, Brush, Frame } from "lucide-react"

export default function OriginalArtwork() {
  const [viewMode, setViewMode] = useState("grid")
  const [selectedMedium, setSelectedMedium] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  const mediums = [
    { id: "all", name: "All Mediums" },
    { id: "oil", name: "Oil Painting" },
    { id: "acrylic", name: "Acrylic" },
    { id: "watercolor", name: "Watercolor" },
    { id: "mixed", name: "Mixed Media" },
    { id: "digital", name: "Digital Art" },
  ]

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under500", name: "Under $500" },
    { id: "500-1000", name: "$500 - $1,000" },
    { id: "1000-2000", name: "$1,000 - $2,000" },
    { id: "over2000", name: "Over $2,000" },
  ]

  const artworks = [
    {
      id: 1,
      title: "Divine Light Breaking Through",
      artist: "Sarah Johnson",
      medium: "oil",
      price: 1200,
      originalPrice: 1500,
      size: '24" x 36"',
      year: 2024,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 24,
      description:
        "A powerful oil painting depicting the divine light breaking through storm clouds, symbolizing hope and faith in difficult times.",
      featured: true,
      sold: false,
      certificate: true,
    },
    {
      id: 2,
      title: "The Good Shepherd",
      artist: "Michael Chen",
      medium: "acrylic",
      price: 800,
      size: '20" x 24"',
      year: 2024,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 18,
      description:
        "A serene acrylic painting showing Jesus as the Good Shepherd, surrounded by peaceful sheep in a beautiful landscape.",
      featured: true,
      sold: false,
      certificate: true,
    },
    {
      id: 3,
      title: "Resurrection Morning",
      artist: "Emma Davis",
      medium: "watercolor",
      price: 600,
      size: '16" x 20"',
      year: 2023,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 32,
      description: "A delicate watercolor capturing the beauty and hope of Easter morning with soft, ethereal colors.",
      featured: false,
      sold: false,
      certificate: true,
    },
    {
      id: 4,
      title: "Praying Hands",
      artist: "David Wilson",
      medium: "mixed",
      price: 950,
      size: '18" x 24"',
      year: 2024,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 15,
      description:
        "A moving mixed media piece combining traditional painting with textural elements to create depth and emotion.",
      featured: true,
      sold: false,
      certificate: true,
    },
    {
      id: 5,
      title: "Garden of Gethsemane",
      artist: "Lisa Martinez",
      medium: "oil",
      price: 1800,
      size: '30" x 40"',
      year: 2024,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop",
      rating: 5.0,
      reviews: 8,
      description:
        "A masterful oil painting depicting the sacred Garden of Gethsemane with incredible detail and emotional depth.",
      featured: true,
      sold: false,
      certificate: true,
    },
    {
      id: 6,
      title: "Angels Among Us",
      artist: "Robert Kim",
      medium: "digital",
      price: 450,
      size: 'Digital Print 24" x 32"',
      year: 2024,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 42,
      description:
        "A contemporary digital artwork exploring the presence of angels in our daily lives with modern artistic techniques.",
      featured: false,
      sold: false,
      certificate: true,
    },
  ]

  return (
    <div className="min-h-screen py-40 bg-gradient-to-br from-gray-500/10 via-white/10 to-amber-500/10">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-[#e76f51]/10" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop')",
            backgroundSize: "cover",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-[#e76f51] rounded-full mb-6"
            >
              <Palette className="h-10 w-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Original Artwork
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Discover one-of-a-kind original artworks created by talented Christian artists. Each piece is unique and
              comes with a certificate of authenticity.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Certificate of Authenticity</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Frame className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Professional Framing Available</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Brush className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Direct from Artists</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white/50 backdrop-blur-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Medium Filter */}
            <div className="flex flex-wrap gap-2">
              {mediums.map((medium) => (
                <Button
                  key={medium.id}
                  variant={selectedMedium === medium.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMedium(medium.id)}
                  className={
                    selectedMedium === medium.id
                      ? "bg-gradient-to-r from-amber-500 to-[#e76f51] text-white"
                      : "border-gray-200 hover:border-amber-500"
                  }
                >
                  {medium.name}
                </Button>
              ))}
            </div>

            {/* Price Range */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/10 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <img
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {artwork.featured && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">
                        Featured
                      </Badge>
                    )}

                    {artwork.originalPrice && (
                      <Badge variant="destructive" className="absolute top-3 right-3">
                        Sale
                      </Badge>
                    )}

                    {artwork.certificate && (
                      <div className="absolute bottom-3 left-3 bg-white/10 backdrop-blur-sm rounded-full p-2">
                        <Award className="h-4 w-4 text-amber-500" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl group-hover:text-amber-500 transition-colors">
                          {artwork.title}
                        </CardTitle>
                        <CardDescription className="text-gray-200">
                          by {artwork.artist} • {artwork.year}
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                          <span>{artwork.medium}</span>
                          <span>{artwork.size}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{artwork.rating}</span>
                        <span className="text-xs text-gray-300">({artwork.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-200 mb-4 line-clamp-3">{artwork.description}</p>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-amber-500">${artwork.price.toLocaleString()}</span>
                      {artwork.originalPrice && (
                        <span className="text-lg text-gray-300 line-through">
                          ${artwork.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Spotlight */}
      <section className="py-16 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Featured Artists
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Meet the talented artists behind these beautiful original works
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Sarah Johnson", "Michael Chen", "Emma Davis"].map((artist, index) => (
              <motion.div
                key={artist}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-[#e76f51] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Palette className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{artist}</h3>
                <p className="text-gray-200 mb-4">Specializing in spiritual and inspirational artwork</p>
                <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-50">
                  View Portfolio
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
