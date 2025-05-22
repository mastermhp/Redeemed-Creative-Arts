"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Gift,
  Heart,
  Star,
  ShoppingCart,
  Shirt,
  Coffee,
  Book,
  Palette,
  Package,
  Truck,
  Shield,
  Award,
} from "lucide-react"

export default function Merchandise() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const categories = [
    { id: "all", name: "All Items", icon: <Gift className="h-4 w-4" /> },
    { id: "apparel", name: "Apparel", icon: <Shirt className="h-4 w-4" /> },
    { id: "accessories", name: "Accessories", icon: <Coffee className="h-4 w-4" /> },
    { id: "books", name: "Books & Journals", icon: <Book className="h-4 w-4" /> },
    { id: "art-supplies", name: "Art Supplies", icon: <Palette className="h-4 w-4" /> },
  ]

  const merchandise = [
    {
      id: 1,
      title: "Redeemed Creative Arts T-Shirt",
      category: "apparel",
      price: 25,
      originalPrice: 30,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Navy", "Heather Gray"],
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 124,
      description:
        "Comfortable 100% cotton t-shirt featuring the Redeemed Creative Arts logo with inspiring design elements.",
      bestseller: true,
      newArrival: false,
    },
    {
      id: 2,
      title: "Faith & Art Coffee Mug",
      category: "accessories",
      price: 15,
      sizes: ["11oz", "15oz"],
      colors: ["White", "Black"],
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 89,
      description: "Ceramic coffee mug with beautiful faith-inspired artwork. Perfect for your morning devotions.",
      bestseller: true,
      newArrival: false,
    },
    {
      id: 3,
      title: "Creative Worship Journal",
      category: "books",
      price: 20,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 156,
      description: "Beautifully designed journal with prompts for creative worship and artistic expression.",
      bestseller: false,
      newArrival: true,
    },
    {
      id: 4,
      title: "Artist's Prayer Hoodie",
      category: "apparel",
      price: 45,
      originalPrice: 55,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Charcoal", "Navy", "Burgundy"],
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 67,
      description: "Cozy hoodie featuring 'The Artist's Prayer' with beautiful calligraphy design.",
      bestseller: false,
      newArrival: true,
    },
    {
      id: 5,
      title: "Professional Watercolor Set",
      category: "art-supplies",
      price: 85,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 43,
      description: "High-quality watercolor paint set perfect for creating beautiful Christian artwork.",
      bestseller: true,
      newArrival: false,
    },
    {
      id: 6,
      title: "Scripture Art Tote Bag",
      category: "accessories",
      price: 18,
      colors: ["Natural", "Black", "Navy"],
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 92,
      description: "Durable canvas tote bag featuring beautiful scripture typography design.",
      bestseller: false,
      newArrival: false,
    },
    {
      id: 7,
      title: "Faith-Based Art Techniques Book",
      category: "books",
      price: 35,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 78,
      description:
        "Comprehensive guide to incorporating faith into your artistic practice with step-by-step tutorials.",
      bestseller: true,
      newArrival: false,
    },
    {
      id: 8,
      title: "Inspirational Sticker Pack",
      category: "accessories",
      price: 8,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 203,
      description:
        "Set of 20 waterproof stickers with faith-based designs perfect for laptops, water bottles, and more.",
      bestseller: false,
      newArrival: true,
    },
  ]

  const filteredMerchandise = merchandise.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory,
  )

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
              "url('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=800&fit=crop')",
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
              <Gift className="h-10 w-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Merchandise
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Show your faith and support Christian artists with our collection of apparel, accessories, books, and art
              supplies.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Package className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Quality Materials</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Truck className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Shield className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Award className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Artist Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white/50 backdrop-blur-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
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

      {/* Merchandise Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMerchandise.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/10 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.bestseller && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">Bestseller</Badge>
                      )}
                      {item.newArrival && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          New
                        </Badge>
                      )}
                      {item.originalPrice && <Badge variant="destructive">Sale</Badge>}
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

                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg group-hover:text-amber-500 transition-colors">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-gray-200">
                          {categories.find((cat) => cat.id === item.category)?.name}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-xs text-gray-500">({item.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-200 mb-3 line-clamp-2 text-sm">{item.description}</p>

                    {item.sizes && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">Sizes:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.sizes.slice(0, 4).map((size) => (
                            <Badge key={size} variant="secondary" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                          {item.sizes.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.sizes.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {item.colors && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">Colors:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.colors.slice(0, 3).map((color) => (
                            <Badge key={color} variant="outline" className="text-xs">
                              {color}
                            </Badge>
                          ))}
                          {item.colors.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.colors.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-amber-500">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
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
                Shop by Category
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Find the perfect items to express your faith and support Christian artists
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-[#e76f51] rounded-full mx-auto mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-200">
                  {category.id === "apparel" && "T-shirts, hoodies, and more"}
                  {category.id === "accessories" && "Mugs, bags, and daily essentials"}
                  {category.id === "books" && "Journals, guides, and inspiration"}
                  {category.id === "art-supplies" && "Professional tools for artists"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
