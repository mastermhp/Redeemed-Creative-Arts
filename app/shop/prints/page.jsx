"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Heart, Star, ShoppingCart, Printer, Package, Truck, Shield, Award } from "lucide-react"

export default function Prints() {
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const sizes = [
    { id: "all", name: "All Sizes" },
    { id: "small", name: "Small (8x10, 11x14)" },
    { id: "medium", name: "Medium (16x20, 18x24)" },
    { id: "large", name: "Large (24x36, 30x40)" },
    { id: "custom", name: "Custom Sizes" },
  ]

  const types = [
    { id: "all", name: "All Types" },
    { id: "giclee", name: "Giclée Prints" },
    { id: "canvas", name: "Canvas Prints" },
    { id: "metal", name: "Metal Prints" },
    { id: "acrylic", name: "Acrylic Prints" },
    { id: "poster", name: "Poster Prints" },
  ]

  const prints = [
    {
      id: 1,
      title: "Faith Journey",
      artist: "Michael Chen",
      type: "giclee",
      sizes: ["8x10", "11x14", "16x20", "24x36"],
      prices: { "8x10": 25, "11x14": 35, "16x20": 55, "24x36": 85 },
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 156,
      description: "A beautiful illustration depicting the journey of faith with vibrant colors and inspiring imagery.",
      bestseller: true,
      limitedEdition: false,
    },
    {
      id: 2,
      title: "Psalm 23 Typography",
      artist: "Sarah Johnson",
      type: "canvas",
      sizes: ["11x14", "16x20", "24x36"],
      prices: { "11x14": 45, "16x20": 65, "24x36": 95 },
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 203,
      description: "Beautiful typography design featuring Psalm 23 with elegant calligraphy and decorative elements.",
      bestseller: true,
      limitedEdition: true,
    },
    {
      id: 3,
      title: "Cross at Sunset",
      artist: "David Wilson",
      type: "metal",
      sizes: ["12x16", "18x24", "24x32"],
      prices: { "12x16": 75, "18x24": 125, "24x32": 185 },
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 89,
      description: "Stunning metal print of a cross silhouetted against a beautiful sunset sky.",
      bestseller: false,
      limitedEdition: false,
    },
    {
      id: 4,
      title: "Bible Verse Collection",
      artist: "Emma Davis",
      type: "poster",
      sizes: ["8x10", "11x14", "16x20"],
      prices: { "8x10": 15, "11x14": 25, "16x20": 35 },
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 312,
      description: "Set of inspirational Bible verse posters perfect for home or office decoration.",
      bestseller: true,
      limitedEdition: false,
    },
    {
      id: 5,
      title: "Angels Among Us",
      artist: "Lisa Martinez",
      type: "acrylic",
      sizes: ["16x20", "24x36", "30x40"],
      prices: { "16x20": 95, "24x36": 145, "30x40": 195 },
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 67,
      description: "Ethereal acrylic print featuring angels in a heavenly scene with luminous quality.",
      bestseller: false,
      limitedEdition: true,
    },
    {
      id: 6,
      title: "The Lord's Prayer",
      artist: "Robert Kim",
      type: "giclee",
      sizes: ["11x14", "16x20", "24x36"],
      prices: { "11x14": 40, "16x20": 60, "24x36": 90 },
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 145,
      description: "Elegant design featuring The Lord's Prayer with beautiful floral border elements.",
      bestseller: true,
      limitedEdition: false,
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
              "url('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=800&fit=crop')",
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
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Art Prints
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              High-quality prints of beautiful Christian artwork. Available in multiple sizes and premium materials to
              fit any space and budget.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Printer className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Package className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Secure Packaging</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Truck className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Shield className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Satisfaction Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white/50 backdrop-blur-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Size Filter */}
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  key={size.id}
                  variant={selectedSize === size.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(size.id)}
                  className={
                    selectedSize === size.id
                      ? "bg-gradient-to-r from-amber-500 to-[#e76f51] text-white"
                      : "border-gray-200 hover:border-amber-500"
                  }
                >
                  {size.name}
                </Button>
              ))}
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Prints Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prints.map((print) => (
              <motion.div
                key={print.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/10 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <img
                      src={print.image || "/placeholder.svg"}
                      alt={print.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-3 left-3 flex gap-2">
                      {print.bestseller && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">Bestseller</Badge>
                      )}
                      {print.limitedEdition && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          Limited Edition
                        </Badge>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Quick Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl group-hover:text-amber-500 transition-colors">
                          {print.title}
                        </CardTitle>
                        <CardDescription className="text-gray-200">by {print.artist}</CardDescription>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {print.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{print.rating}</span>
                        <span className="text-xs text-gray-500">({print.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-200 mb-4 line-clamp-2">{print.description}</p>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Available Sizes:</p>
                      <div className="flex flex-wrap gap-1">
                        {print.sizes.map((size) => (
                          <Badge key={size} variant="secondary" className="text-xs">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Starting at</span>
                      <span className="text-2xl font-bold text-amber-500">
                        ${Math.min(...Object.values(print.prices))}
                      </span>
                    </div>
                    <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Select Size
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Print Quality Info */}
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
                Premium Print Quality
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              We use only the finest materials and printing techniques to ensure your artwork looks stunning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Printer className="h-8 w-8" />,
                title: "Giclée Printing",
                description: "Museum-quality archival inks for vibrant, long-lasting colors",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Premium Papers",
                description: "Acid-free, cotton-based papers that resist fading and yellowing",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "UV Protection",
                description: "All prints include UV-resistant coating for enhanced durability",
              },
              {
                icon: <Package className="h-8 w-8" />,
                title: "Secure Shipping",
                description: "Carefully packaged in protective tubes or flat mailers",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-[#e76f51] rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
