"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Play,
  Users,
  Star,
  Download,
  Video,
  Church,
  Heart,
  CheckCircle,
  ArrowRight,
  Music,
  Presentation,
  ImageIcon,
  Calendar,
} from "lucide-react"

export default function CoursesForChurches() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const categories = [
    { id: "all", name: "All Categories", icon: <BookOpen className="h-4 w-4" /> },
    { id: "worship", name: "Worship Arts", icon: <Music className="h-4 w-4" /> },
    { id: "visual", name: "Visual Arts", icon: <ImageIcon className="h-4 w-4" /> },
    { id: "leadership", name: "Leadership", icon: <Users className="h-4 w-4" /> },
    { id: "outreach", name: "Outreach", icon: <Heart className="h-4 w-4" /> },
  ]

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ]

  const courses = [
    {
      id: 1,
      title: "Integrating Visual Arts in Worship",
      instructor: "Pastor Michael Chen",
      category: "worship",
      level: "intermediate",
      price: 149,
      duration: "8 hours",
      lessons: 32,
      students: 892,
      rating: 4.8,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1438232992991-995b7058377d?q=80&w=400",
      description:
        "Learn how to effectively incorporate visual arts into your worship services to enhance the experience and deepen spiritual connection.",
      featured: true,
      bestseller: true,
      includes: ["32 video lessons", "Service planning templates", "Resource library", "Implementation guides"],
    },
    {
      id: 2,
      title: "Creating a Church Arts Ministry",
      instructor: "Sarah Johnson",
      category: "leadership",
      level: "beginner",
      price: 129,
      originalPrice: 179,
      duration: "6 hours",
      lessons: 24,
      students: 1247,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400",
      description:
        "A comprehensive guide to establishing and growing a thriving arts ministry in your church community.",
      featured: true,
      bestseller: false,
      includes: ["24 video lessons", "Ministry structure templates", "Budget planning", "Volunteer recruitment"],
    },
    {
      id: 3,
      title: "Visual Storytelling for Sermons",
      instructor: "David Wilson",
      category: "visual",
      level: "intermediate",
      price: 99,
      duration: "5 hours",
      lessons: 20,
      students: 756,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=400",
      description:
        "Enhance your sermon delivery with powerful visual elements that help communicate biblical truths more effectively.",
      featured: false,
      bestseller: true,
      includes: ["20 video lessons", "Presentation templates", "Visual library", "Software tutorials"],
    },
    {
      id: 4,
      title: "Art as Outreach: Community Engagement",
      instructor: "Emma Davis",
      category: "outreach",
      level: "all-levels",
      price: 119,
      duration: "7 hours",
      lessons: 28,
      students: 567,
      rating: 4.6,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=400",
      description:
        "Discover how to use art as a powerful tool for community outreach, evangelism, and building bridges to your neighborhood.",
      featured: false,
      bestseller: false,
      includes: ["28 video lessons", "Event planning guides", "Outreach strategies", "Case studies"],
    },
    {
      id: 5,
      title: "Worship Environment Design",
      instructor: "Lisa Martinez",
      category: "worship",
      level: "intermediate",
      price: 169,
      duration: "9 hours",
      lessons: 36,
      students: 423,
      rating: 4.8,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1477238134895-98438ad85c30?q=80&w=1200",
      description:
        "Learn to create meaningful worship environments that enhance the congregation's experience through intentional design.",
      featured: true,
      bestseller: false,
      includes: ["36 video lessons", "Design principles", "Seasonal planning", "Budget-friendly ideas"],
    },
    {
      id: 6,
      title: "Digital Media for Church Communications",
      instructor: "Robert Kim",
      category: "visual",
      level: "beginner",
      price: 89,
      originalPrice: 119,
      duration: "6 hours",
      lessons: 24,
      students: 1089,
      rating: 4.7,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200",
      description:
        "Master the essentials of digital media creation for effective church communications across multiple platforms.",
      featured: false,
      bestseller: true,
      includes: ["24 video lessons", "Template library", "Software tutorials", "Social media strategy"],
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    return matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen py-40">
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
            backgroundImage: "url('https://images.unsplash.com/photo-1477238134895-98438ad85c30?q=80&w=1200')",
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
              <Church className="h-10 w-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Courses For Churches
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Equip your church with the knowledge and resources to integrate arts into worship, outreach, and ministry
              for deeper spiritual engagement.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Music className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Worship Enhancement</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Presentation className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Visual Resources</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Users className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Ministry Development</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Heart className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Community Outreach</span>
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

            {/* Level and Sort */}
            <div className="flex gap-2">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>

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
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/10 backdrop-blur-sm h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-3 left-3 flex gap-2">
                      {course.featured && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">Featured</Badge>
                      )}
                      {course.bestseller && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Bestseller
                        </Badge>
                      )}
                      {course.originalPrice && <Badge variant="destructive">Sale</Badge>}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {course.duration}
                    </div>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button size="sm" className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Preview Course
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-amber-500 transition-colors line-clamp-2">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">by {course.instructor}</CardDescription>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs capitalize">
                            {course.level}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {categories.find((cat) => cat.id === course.category)?.name}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-xs text-gray-500">({course.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1">
                    <p className="text-gray-400 mb-3 line-clamp-2 text-sm">{course.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-700">What's included:</p>
                      <div className="space-y-1">
                        {course.includes.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{item}</span>
                          </div>
                        ))}
                        {course.includes.length > 2 && (
                          <p className="text-xs text-gray-500">+{course.includes.length - 2} more</p>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-amber-500">${course.price}</span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg"
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Church Success Stories */}
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
                Church Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how churches have transformed their ministries through our courses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Grace Community Church",
                location: "Denver, CO",
                quote:
                  "After implementing what we learned in the Visual Arts in Worship course, our congregation has experienced deeper engagement and spiritual connection during services.",
                image: "https://images.unsplash.com/photo-1438232992991-995b7058377d?q=80&w=200",
                course: "Visual Arts in Worship",
              },
              {
                name: "New Life Fellowship",
                location: "Austin, TX",
                quote:
                  "Our new arts ministry has become one of our fastest-growing programs, attracting both church members and community participants who might not otherwise attend.",
                image: "https://images.unsplash.com/photo-1477238134895-98438ad85c30?q=80&w=200",
                course: "Creating a Church Arts Ministry",
              },
              {
                name: "Cornerstone Church",
                location: "Seattle, WA",
                quote:
                  "The community outreach strategies we learned have helped us connect with our neighborhood in meaningful ways, resulting in new relationships and church growth.",
                image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=200",
                course: "Art as Outreach",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-amber-500 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.location}</p>
                    <Badge variant="outline" className="mt-1">
                      {testimonial.course}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button className="bg-gradient-to-r from-amber-500 to-[#e76f51] text-white">
              Browse All Church Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Free Church Resources
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Access these complimentary resources to support your church's arts ministry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Worship Planning Guide",
                description: "Templates and ideas for integrating arts into worship services",
                icon: <Calendar className="h-8 w-8" />,
              },
              {
                title: "Visual Media Pack",
                description: "Free backgrounds and graphics for church presentations",
                icon: <ImageIcon className="h-8 w-8" />,
              },
              {
                title: "Ministry Launch Kit",
                description: "Essential resources for starting an arts ministry",
                icon: <Church className="h-8 w-8" />,
              },
              {
                title: "Outreach Event Ideas",
                description: "Creative concepts for community engagement through arts",
                icon: <Heart className="h-8 w-8" />,
              },
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/30 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500/20 to-[#e76f51]/20 rounded-full flex items-center justify-center text-amber-500 mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-400 mb-4">{resource.description}</p>
                <Button variant="outline" className="w-full border-amber-500 text-amber-500 hover:bg-amber-50">
                  Download Free
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
