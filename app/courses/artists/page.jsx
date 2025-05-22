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
  Palette,
  Heart,
  CheckCircle,
  ArrowRight,
  Brush,
  Sparkles,
  ImageIcon,
} from "lucide-react"

export default function CoursesForArtists() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const categories = [
    { id: "all", name: "All Categories", icon: <BookOpen className="h-4 w-4" /> },
    { id: "techniques", name: "Art Techniques", icon: <Brush className="h-4 w-4" /> },
    { id: "business", name: "Business Skills", icon: <ImageIcon className="h-4 w-4" /> },
    { id: "faith", name: "Faith Integration", icon: <Heart className="h-4 w-4" /> },
    { id: "digital", name: "Digital Art", icon: <Brush className="h-4 w-4" /> },
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
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=400",
      description: "Learn to create beautiful watercolor paintings that express your faith and worship through art.",
      featured: true,
      bestseller: true,
      includes: ["24 video lessons", "Downloadable resources", "Community access", "Certificate of completion"],
    },
    {
      id: 2,
      title: "Building Your Art Business",
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
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400",
      description: "Learn how to turn your artistic gifts into a sustainable business that honors God.",
      featured: false,
      bestseller: true,
      includes: ["40 video lessons", "Business templates", "Marketing guides", "1-on-1 consultation"],
    },
    {
      id: 3,
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
      image: "https://images.unsplash.com/photo-1579762593175-20226054cad0?q=80&w=400",
      description: "Master advanced oil painting techniques used by the great masters of Christian art.",
      featured: true,
      bestseller: false,
      includes: ["48 video lessons", "Master studies", "Technique guides", "Personal feedback"],
    },
    {
      id: 4,
      title: "Digital Illustration for Christian Artists",
      instructor: "Robert Kim",
      category: "digital",
      level: "intermediate",
      price: 149,
      duration: "8 hours",
      lessons: 32,
      students: 789,
      rating: 4.8,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1626785776144-60967b0f800f?q=80&w=400",
      description: "Create stunning digital illustrations with Christian themes using modern software and techniques.",
      featured: false,
      bestseller: false,
      includes: ["32 video lessons", "Software tutorials", "Digital brushes", "Project files"],
    },
    {
      id: 5,
      title: "Integrating Faith in Your Artistic Practice",
      instructor: "Michael Chen",
      category: "faith",
      level: "all-levels",
      price: 129,
      duration: "7 hours",
      lessons: 28,
      students: 456,
      rating: 4.8,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400",
      description:
        "Discover how to authentically express your faith through your art in a way that resonates with viewers.",
      featured: true,
      bestseller: false,
      includes: ["28 video lessons", "Spiritual exercises", "Artist interviews", "Community discussions"],
    },
    {
      id: 6,
      title: "Social Media Marketing for Artists",
      instructor: "David Wilson",
      category: "business",
      level: "beginner",
      price: 79,
      duration: "5 hours",
      lessons: 20,
      students: 1023,
      rating: 4.6,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400",
      description:
        "Learn how to effectively market your Christian art on social media platforms to reach your audience.",
      featured: false,
      bestseller: true,
      includes: ["20 video lessons", "Platform guides", "Content calendar", "Analytics overview"],
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
            backgroundImage: "url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200')",
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
                Courses For Artists
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Develop your artistic skills, grow your business, and integrate your faith into your creative practice
              with our specialized courses for Christian artists.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Brush className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Artistic Techniques</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <ImageIcon className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Business Skills</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Heart className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Faith Integration</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Career Growth</span>
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

      {/* Artist Success Stories */}
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
                Artist Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hear from artists who have transformed their creative practice through our courses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jessica R.",
                location: "Portland, OR",
                quote:
                  "The watercolor course completely transformed my approach to painting. I now have the confidence to create art that truly expresses my faith.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
                course: "Watercolor Worship",
              },
              {
                name: "Marcus T.",
                location: "Atlanta, GA",
                quote:
                  "Thanks to the business skills course, I was able to quit my day job and pursue my art full-time. My income has tripled and I'm reaching more people with my message.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
                course: "Building Your Art Business",
              },
              {
                name: "Olivia K.",
                location: "Chicago, IL",
                quote:
                  "Learning to integrate my faith into my digital art has opened doors to ministry opportunities I never imagined. This course was truly life-changing.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
                course: "Digital Illustration",
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
              Browse All Artist Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Artist Resources */}
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
                Free Artist Resources
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Access these complimentary resources to support your artistic journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Artist Prayer Guide",
                description: "Daily prayers and devotionals for creative inspiration",
                icon: <Heart className="h-8 w-8" />,
              },
              {
                title: "Business Starter Kit",
                description: "Essential templates and guides for your art business",
                icon: <ImageIcon className="h-8 w-8" />,
              },
              {
                title: "Color Theory Basics",
                description: "Fundamental principles of color for Christian symbolism",
                icon: <Palette className="h-8 w-8" />,
              },
              {
                title: "Digital Art Brushes",
                description: "Free brush pack for digital painting and illustration",
                icon: <Brush className="h-8 w-8" />,
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
