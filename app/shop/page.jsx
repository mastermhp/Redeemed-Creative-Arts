"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star, Search, Grid, List, Eye, Palette, Sparkles, Gift, Download } from "lucide-react"

export default function Shop() {
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])

  const categories = [
    { id: "all", name: "All Products", icon: <Grid className="h-4 w-4" /> },
    { id: "original", name: "Original Artwork", icon: <Palette className="h-4 w-4" /> },
    { id: "prints", name: "Prints", icon: <Sparkles className="h-4 w-4" /> },
    { id: "merchandise", name: "Merchandise", icon: <Gift className="h-4 w-4" /> },
    { id: "digital", name: "Digital Downloads", icon: <Download className="h-4 w-4" /> },
  ]

  const products = [
    {
      id: 1,
      title: "Divine Light",
      artist: "Sarah Johnson",
      category: "original",
      price: 1200,
      originalPrice: 1500,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 24,
      description: "A stunning oil painting depicting the divine light breaking through darkness",
      tags: ["oil painting", "spiritual", "light"],
      featured: true,
    },
    {
      id: 2,
      title: "Faith Journey Print",
      artist: "Michael Chen",
      category: "prints",
      price: 45,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 156,
      description: "High-quality giclee print of a beautiful faith journey illustration",
      tags: ["print", "journey", "faith"],
      featured: true,
    },
    {
      id: 3,
      title: "Redeemed T-Shirt",
      artist: "Redeemed Team",
      category: "merchandise",
      price: 25,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 89,
      description: "Comfortable cotton t-shirt with inspiring Redeemed design",
      tags: ["apparel", "cotton", "inspiring"],
      featured: false,
    },
    {
      id: 4,
      title: "Digital Art Pack",
      artist: "Emma Davis",
      category: "digital",
      price: 15,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 203,
      description: "Collection of 10 high-resolution digital artworks for personal use",
      tags: ["digital", "collection", "high-res"],
      featured: false,
    },
    {
      id: 5,
      title: "Grace Canvas",
      artist: "David Wilson",
      category: "original",
      price: 800,
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 12,
      description: "Acrylic painting showcasing the beauty of divine grace",
      tags: ["acrylic", "grace", "divine"],
      featured: true,
    },
    {
      id: 6,
      title: "Hope Poster Set",
      artist: "Lisa Martinez",
      category: "prints",
      price: 35,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 78,
      description: "Set of 3 inspirational posters perfect for home or office",
      tags: ["poster", "set", "inspirational"],
      featured: false,
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return b.featured ? 1 : -1
    }
  })

  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

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
              "url('https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=800&fit=crop')",
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
              <ShoppingCart className="h-10 w-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Art Shop
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Discover beautiful Christian art, prints, and merchandise created by talented artists in our community
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg">
                <Eye className="h-5 w-5 mr-2" />
                Browse Collection
              </Button>
              <Button variant="outline" size="lg" className="border-amber-500 text-amber-500 hover:bg-amber-50">
                <Heart className="h-5 w-5 mr-2" />
                View Favorites
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white/10 backdrop-blur-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-amber-500 to-[#e76f51] text-white"
                      : "border-gray-200 hover:border-amber-500"
                  }
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </div>

            {/* View and Sort */}
            <div className="flex items-center gap-2">
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

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
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            <AnimatePresence>
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/20 backdrop-blur-sm">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {product.featured && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">
                          Featured
                        </Badge>
                      )}

                      {product.originalPrice && (
                        <Badge variant="destructive" className="absolute top-3 right-3">
                          Sale
                        </Badge>
                      )}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => toggleFavorite(product.id)}
                            className="bg-white/10 hover:bg-white"
                          >
                            <Heart
                              className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-amber-500 transition-colors">
                            {product.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-300">by {product.artist}</CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-xs text-gray-300">({product.reviews})</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-200 mb-3 line-clamp-2">{product.description}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-amber-500">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-300 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-md"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {sortedProducts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">No products found</h3>
              <p className="text-gray-300">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-amber-500/30 rounded-lg shadow-xl p-4 border z-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-[#e76f51] rounded-full flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart</p>
              <p className="text-sm text-gray-300">
                Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
              </p>
            </div>
            <Button size="sm" className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">
              View Cart
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
