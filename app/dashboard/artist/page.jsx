"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Palette,
  Upload,
  Star,
  Heart,
  Eye,
  DollarSign,
  Trophy,
  Users,
  Plus,
  Edit,
  Share2,
  Award,
  Calendar,
  BarChart3,
  ShoppingCart,
  BookOpen,
  Zap,
  Crown,
  Shield,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export default function ArtistDashboard() {
  const [user, setUser] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    userType: "artist",
    tier: "tier2", // tier1 or tier2
    isHelper: true,
    points: { current: 2450, total: 5680, level: "gold" },
    membership: { tier: "gold", subscriptionStatus: "active" },
    agreements: { noAIConfirmation: false },
    helperInfo: {
      skills: ["Live Painting", "Digital Art", "Art Instruction"],
      availability: "weekends",
      rating: 4.9,
      completedJobs: 15,
    },
  })

  const [stats, setStats] = useState({
    totalArtworks: 24,
    totalViews: 15420,
    totalLikes: 892,
    totalEarnings: 3240,
    activeContests: 3,
    completedSales: 12,
    helperBookings: 8,
    monthlyGrowth: 12.5,
  })

  const [artworks, setArtworks] = useState([
    {
      id: 1,
      title: "Divine Light",
      category: "Digital Art",
      status: "published",
      views: 1240,
      likes: 89,
      earnings: 450,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-15",
      isFeatured: true,
      price: 299,
      description: "A beautiful representation of God's light breaking through darkness",
    },
    {
      id: 2,
      title: "Sacred Geometry",
      category: "Traditional",
      status: "pending",
      views: 890,
      likes: 67,
      earnings: 0,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-10",
      isFeatured: false,
      price: 199,
      description: "Exploring sacred patterns in Christian symbolism",
    },
    {
      id: 3,
      title: "Heavenly Chorus",
      category: "Mixed Media",
      status: "published",
      views: 2100,
      likes: 156,
      earnings: 780,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-05",
      isFeatured: false,
      price: 399,
      description: "Angels singing praises in harmonious colors",
    },
  ])

  const [contests, setContests] = useState([
    {
      id: 1,
      title: "Easter Celebration Art",
      deadline: "2024-03-15",
      prize: "$1,000",
      participants: 45,
      status: "active",
      submitted: false,
      description: "Create artwork celebrating the resurrection of Christ",
      requirements: ["Original artwork", "Christian theme", "High resolution"],
    },
    {
      id: 2,
      title: "Church Architecture",
      deadline: "2024-04-01",
      prize: "$750",
      participants: 32,
      status: "active",
      submitted: true,
      description: "Showcase beautiful church architecture and design",
      requirements: ["Photography or digital art", "Church building focus"],
    },
  ])

  const [helperBookings, setHelperBookings] = useState([
    {
      id: 1,
      eventTitle: "Easter Sunday Service",
      church: "Grace Community Church",
      date: "2024-03-31",
      time: "10:00 AM",
      duration: "3 hours",
      payment: 150,
      status: "confirmed",
      skills: ["Live Painting"],
    },
    {
      id: 2,
      eventTitle: "Youth Art Workshop",
      church: "Faith Baptist Church",
      date: "2024-04-05",
      time: "2:00 PM",
      duration: "2 hours",
      payment: 100,
      status: "pending",
      skills: ["Art Instruction"],
    },
  ])

  const [uploadDialog, setUploadDialog] = useState(false)
  const [aiAgreementDialog, setAiAgreementDialog] = useState(false)
  const [newArtwork, setNewArtwork] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    tags: "",
    isForSale: false,
  })

  const handleUploadArtwork = () => {
    if (!user.agreements.noAIConfirmation) {
      setAiAgreementDialog(true)
      return
    }
    setUploadDialog(true)
  }

  const handleAIAgreement = () => {
    setUser((prev) => ({
      ...prev,
      agreements: { ...prev.agreements, noAIConfirmation: true },
    }))
    setAiAgreementDialog(false)
    setUploadDialog(true)
  }

  const handleSubmitArtwork = async (e) => {
    e.preventDefault()
    // Handle artwork upload
    console.log("Uploading artwork:", newArtwork)
    setUploadDialog(false)
    setNewArtwork({ title: "", description: "", category: "", price: "", tags: "", isForSale: false })
  }

  const getTierBadge = (tier) => {
    return tier === "tier2" ? (
      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <Crown className="h-3 w-3 mr-1" />
        Tier 2 Pro
      </Badge>
    ) : (
      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <Shield className="h-3 w-3 mr-1" />
        Tier 1
      </Badge>
    )
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "diamond":
        return "from-cyan-400 to-blue-400"
      case "platinum":
        return "from-gray-400 to-gray-600"
      case "gold":
        return "from-yellow-400 to-orange-400"
      case "silver":
        return "from-gray-300 to-gray-400"
      default:
        return "from-orange-400 to-red-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 my-32">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Artist Dashboard</h1>
              <p className="text-indigo-100 text-lg">Welcome back, {user.name}! ✨</p>
              <div className="flex items-center gap-4 mt-4">
                {getTierBadge(user.tier)}
                {user.isHelper && (
                  <Badge className="bg-green-500/20 text-green-100 border-green-400">
                    <Users className="h-3 w-3 mr-1" />
                    Helper
                  </Badge>
                )}
                <div
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${getLevelColor(user.points.level)} text-white font-bold`}
                >
                  <Award className="h-4 w-4 inline mr-2" />
                  {user.points.current.toLocaleString()} pts
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={handleUploadArtwork}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Artwork
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-1">
            <TabsTrigger value="overview" className="rounded-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="artworks" className="rounded-lg">
              My Gallery
            </TabsTrigger>
            <TabsTrigger value="contests" className="rounded-lg">
              Contests
            </TabsTrigger>
            {user.isHelper && (
              <TabsTrigger value="helper" className="rounded-lg">
                Helper Jobs
              </TabsTrigger>
            )}
            <TabsTrigger value="shop" className="rounded-lg">
              Shop
            </TabsTrigger>
            <TabsTrigger value="courses" className="rounded-lg">
              Courses
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-lg">
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Artworks</p>
                      <p className="text-3xl font-bold">{stats.totalArtworks}</p>
                      <p className="text-blue-100 text-xs">+3 this month</p>
                    </div>
                    <Palette className="h-8 w-8 text-blue-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Total Views</p>
                      <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
                      <p className="text-green-100 text-xs">+{stats.monthlyGrowth}% growth</p>
                    </div>
                    <Eye className="h-8 w-8 text-green-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Total Earnings</p>
                      <p className="text-3xl font-bold">${stats.totalEarnings}</p>
                      <p className="text-purple-100 text-xs">+15% this month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Active Contests</p>
                      <p className="text-3xl font-bold">{stats.activeContests}</p>
                      <p className="text-orange-100 text-xs">2 submissions pending</p>
                    </div>
                    <Trophy className="h-8 w-8 text-orange-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>
            </div>

            {/* Helper Stats (if user is helper) */}
            {user.isHelper && (
              <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-l-emerald-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-emerald-700">
                    <Users className="h-5 w-5 mr-2" />
                    Helper Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{user.helperInfo.rating}</div>
                      <p className="text-sm text-emerald-600">Rating</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{user.helperInfo.completedJobs}</div>
                      <p className="text-sm text-emerald-600">Jobs Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{stats.helperBookings}</div>
                      <p className="text-sm text-emerald-600">Active Bookings</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">$1,200</div>
                      <p className="text-sm text-emerald-600">Helper Earnings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Your artwork "Divine Light" was purchased!</p>
                      <p className="text-xs text-gray-500">2 hours ago • +$450 earned</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New contest "Spring Revival" is now open</p>
                      <p className="text-xs text-gray-500">1 day ago • Prize: $1,500</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">You received 50 bonus points!</p>
                      <p className="text-xs text-gray-500">2 days ago • Level up reward</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-purple-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100"
                      onClick={handleUploadArtwork}
                    >
                      <Upload className="h-6 w-6 mb-2 text-blue-600" />
                      <span className="text-sm font-medium">Upload Art</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100"
                    >
                      <Trophy className="h-6 w-6 mb-2 text-purple-600" />
                      <span className="text-sm font-medium">Join Contest</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100"
                    >
                      <ShoppingCart className="h-6 w-6 mb-2 text-green-600" />
                      <span className="text-sm font-medium">Visit Shop</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:from-orange-100 hover:to-red-100"
                    >
                      <BookOpen className="h-6 w-6 mb-2 text-orange-600" />
                      <span className="text-sm font-medium">Take Course</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Gallery Tab */}
          <TabsContent value="artworks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Art Gallery
              </h2>
              <Button
                onClick={handleUploadArtwork}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Artwork
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <Card
                  key={artwork.id}
                  className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {artwork.isFeatured && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge
                      className={`absolute top-2 right-2 ${
                        artwork.status === "published"
                          ? "bg-green-500"
                          : artwork.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    >
                      {artwork.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{artwork.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{artwork.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {artwork.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {artwork.likes}
                        </span>
                      </div>
                      <span className="font-bold text-green-600">${artwork.price}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contests Tab */}
          <TabsContent value="contests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Art Contests
              </h2>
              <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent">
                <Trophy className="h-4 w-4 mr-2" />
                Browse All Contests
              </Button>
            </div>

            <div className="grid gap-6">
              {contests.map((contest) => (
                <Card key={contest.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{contest.title}</h3>
                        <p className="text-gray-600 mb-4">{contest.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                            <span>{contest.deadline}</span>
                          </div>
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                            <span className="font-bold text-green-600">{contest.prize}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-purple-500" />
                            <span>{contest.participants} participants</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-orange-500" />
                            <span>15 days left</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Requirements:</p>
                          <div className="flex flex-wrap gap-2">
                            {contest.requirements.map((req, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        {contest.submitted ? (
                          <Badge className="bg-green-500 mb-2">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Submitted
                          </Badge>
                        ) : (
                          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                            Submit Entry
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Helper Jobs Tab */}
          {user.isHelper && (
            <TabsContent value="helper" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Helper Bookings
                </h2>
                <Button
                  variant="outline"
                  className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Update Availability
                </Button>
              </div>

              <div className="grid gap-6">
                {helperBookings.map((booking) => (
                  <Card key={booking.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{booking.eventTitle}</h3>
                          <p className="text-gray-600 mb-4">at {booking.church}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-orange-500" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                              <span className="font-bold">${booking.payment}</span>
                            </div>
                            <div className="flex items-center">
                              <Target className="h-4 w-4 mr-2 text-purple-500" />
                              <span>{booking.duration}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {booking.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Badge
                          className={`${
                            booking.status === "confirmed"
                              ? "bg-green-500"
                              : booking.status === "pending"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                          }`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}

          {/* Shop Tab */}
          <TabsContent value="shop" className="space-y-6">
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Shop Coming Soon</h3>
              <p className="text-gray-500">Browse and purchase art supplies, prints, and more!</p>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Courses Coming Soon</h3>
              <p className="text-gray-500">Learn new techniques and improve your artistic skills!</p>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Artist Profile
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={user.email} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Artist Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your artistic journey..."
                      defaultValue="Passionate Christian artist specializing in contemporary religious art..."
                    />
                  </div>
                  <Button className="w-full">Save Profile</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Helper Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="helper"
                      checked={user.isHelper}
                      onCheckedChange={(checked) => setUser((prev) => ({ ...prev, isHelper: checked }))}
                    />
                    <Label htmlFor="helper">Available as Helper</Label>
                  </div>
                  {user.isHelper && (
                    <>
                      <div>
                        <Label htmlFor="skills">Skills</Label>
                        <Input
                          id="skills"
                          defaultValue={user.helperInfo.skills.join(", ")}
                          placeholder="Live Painting, Digital Art, Art Instruction"
                        />
                      </div>
                      <div>
                        <Label htmlFor="availability">Availability</Label>
                        <Select defaultValue={user.helperInfo.availability}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="weekends">Weekends</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  <Button className="w-full">Update Helper Profile</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Agreement Dialog */}
        <Dialog open={aiAgreementDialog} onOpenChange={setAiAgreementDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                No AI Art Agreement
              </DialogTitle>
              <DialogDescription>
                Before uploading artwork, please confirm that your art is original and not created using AI tools.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800">
                  I confirm that all artwork I upload is my original creation and was not generated using artificial
                  intelligence tools.
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAIAgreement} className="flex-1">
                  I Agree
                </Button>
                <Button variant="outline" onClick={() => setAiAgreementDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Upload Artwork Dialog */}
        <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Artwork</DialogTitle>
              <DialogDescription>Share your latest creation with the community</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitArtwork} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Artwork Title</Label>
                  <Input
                    id="title"
                    value={newArtwork.title}
                    onChange={(e) => setNewArtwork({ ...newArtwork, title: e.target.value })}
                    placeholder="Enter artwork title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newArtwork.category}
                    onValueChange={(value) => setNewArtwork({ ...newArtwork, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital Art</SelectItem>
                      <SelectItem value="traditional">Traditional Painting</SelectItem>
                      <SelectItem value="sculpture">Sculpture</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="mixed">Mixed Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newArtwork.description}
                  onChange={(e) => setNewArtwork({ ...newArtwork, description: e.target.value })}
                  placeholder="Describe your artwork and inspiration"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={newArtwork.tags}
                    onChange={(e) => setNewArtwork({ ...newArtwork, tags: e.target.value })}
                    placeholder="christian, faith, hope, love"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (optional)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newArtwork.price}
                    onChange={(e) => setNewArtwork({ ...newArtwork, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="forSale"
                  checked={newArtwork.isForSale}
                  onCheckedChange={(checked) => setNewArtwork({ ...newArtwork, isForSale: checked })}
                />
                <Label htmlFor="forSale">Available for purchase</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Artwork
                </Button>
                <Button type="button" variant="outline" onClick={() => setUploadDialog(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
