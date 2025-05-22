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
  Award,
  Download,
  Video,
  Palette,
  Heart,
  Church,
  DollarSign,
  CheckCircle,
} from "lucide-react"

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const categories = [
    { id: "all", name: "All Courses", icon: <BookOpen className="h-4 w-4" /> },
    { id: "techniques", name: "Art Techniques", icon: <Palette className="h-4 w-4" /> },
    { id: "faith", name: "Faith Integration", icon: <Heart className="h-4 w-4" /> },
    { id: "business", name: "Business Skills", icon: <DollarSign className="h-4 w-4" /> },
    { id: "ministry", name: "Ministry Resources", icon: <Church className="h-4 w-4" /> },
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
      title: "Watercolor Worship: Painting Your Faith",
      instructor: "Sarah Johnson",
      category: "techniques",
      level: "beginner",
      price: 89,
      originalPrice: 129,
      duration: "6 hours",
      lessons: 24,
      students: 1247,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=400",
      description: "Learn to create beautiful watercolor paintings that express your faith and worship through art.",
      featured: true,
      bestseller: true,
      includes: ["24 video lessons", "Downloadable resources", "Community access", "Certificate of completion"],
    },
    {
      id: 2,
      title: "Biblical Storytelling Through Art",
      instructor: "Michael Chen",
      category: "faith",
      level: "intermediate",
      price: 149,
      duration: "8 hours",
      lessons: 32,
      students: 892,
      rating: 4.8,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=400",
      description: "Master the art of visual storytelling using biblical narratives and Christian themes.",
      featured: true,
      bestseller: false,
      includes: ["32 video lessons", "Project templates", "Feedback sessions", "Lifetime access"],
    },
    {
      id: 3,
      title: "Building Your Christian Art Business",
      instructor: "Emma Davis",
      category: "business",
      level: "intermediate",
      price: 199,
      originalPrice: 249,
      duration: "10 hours",
      lessons: 40,
      students: 567,
      rating: 4.7,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=400",
      description: "Learn how to turn your artistic gifts into a sustainable business that honors God.",
      featured: false,
      bestseller: true,
      includes: ["40 video lessons", "Business templates", "Marketing guides", "1-on-1 consultation"],
    },
    {
      id: 4,
      title: "Digital Art for Ministry",
      instructor: "David Wilson",
      category: "ministry",
      level: "beginner",
      price: 79,
      duration: "5 hours",
      lessons: 20,
      students: 1156,
      rating: 4.6,
      reviews: 312,
      image: "/placeholder.svg?height=300&width=400",
      description: "Create compelling digital artwork for church presentations, social media, and ministry materials.",
      featured: false,
      bestseller: false,
      includes: ["20 video lessons", "Design templates", "Software tutorials", "Resource library"],
    },
    {
      id: 5,
      title: "Advanced Oil Painting Techniques",
      instructor: "Lisa Martinez",
      category: "techniques",
      level: "advanced",
      price: 249,
      duration: "12 hours",
      lessons: 48,
      students: 234,
      rating: 4.9,
      reviews: 67,
      image: "/placeholder.svg?height=300&width=400",
      description: "Master advanced oil painting techniques used by the great masters of Christian art.",
      featured: true,
      bestseller: false,
      includes: ["48 video lessons", "Master studies", "Technique guides", "Personal feedback"],
    },
    {
      id: 6,
      title: "Art Therapy and Spiritual Healing",
      instructor: "Robert Kim",
      category: "faith",
      level: "intermediate",
      price: 169,
      duration: "7 hours",
      lessons: 28,
      students: 445,
      rating: 4.8,
      reviews: 145,
      image: "/placeholder.svg?height=300&width=400",
      description: "Explore how art can be used as a tool for spiritual healing and emotional wellness.",
      featured: false,
      bestseller: false,
      includes: ["28 video lessons", "Healing exercises", "Prayer guides", "Support community"],
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
            backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
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
              <BookOpen className="h-10 w-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Art Courses
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Learn from experienced Christian artists and grow in your artistic journey while deepening your faith
              through creative expression.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Video className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">HD Video Lessons</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Download className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Downloadable Resources</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Users className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Community Access</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Award className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Certificates</span>
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
                        <CardDescription className="text-gray-200">by {course.instructor}</CardDescription>
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
                    <p className="text-gray-200 mb-3 line-clamp-2 text-sm">{course.description}</p>

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
                          <div key={index} className="flex items-center gap-2 text-xs text-gray-200">
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

      {/* Instructors Section */}
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
                Expert Instructors
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Learn from experienced Christian artists who are passionate about sharing their knowledge and faith
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Sarah Johnson", "Michael Chen", "Emma Davis"].map((instructor, index) => (
              <motion.div
                key={instructor}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-[#e76f51] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Palette className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{instructor}</h3>
                <p className="text-gray-200 mb-2">Professional Christian Artist</p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.9</span>
                  <span className="text-xs text-gray-500">(500+ reviews)</span>
                </div>
                <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-50">
                  View Profile
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
