"use client"

import { useState, useEffect } from "react"
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
import { useAuth } from "@/lib/hooks/useAuth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
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
  ShoppingCart,
  BookOpen,
  Zap,
  Crown,
  Shield,
  AlertTriangle,
  Loader2,
} from "lucide-react"

export default function ArtistDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})
  const [artworks, setArtworks] = useState([])
  const [contests, setContests] = useState([])
  const [helperBookings, setHelperBookings] = useState([])

  const [uploadDialog, setUploadDialog] = useState(false)
  const [aiAgreementDialog, setAiAgreementDialog] = useState(false)
  const [newArtwork, setNewArtwork] = useState({
    title: "",
    description: "",
    category: "",
    medium: "",
    price: "",
    tags: "",
    isForSale: false,
  })

  // Check authentication and user type
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login")
        return
      }
      if (user.userType !== "artist") {
        router.push("/dashboard")
        return
      }
      fetchDashboardData()
    }
  }, [user, authLoading, router])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Mock data for now - replace with real API calls
      setStats({
        totalArtworks: 12,
        totalViews: 1543,
        totalEarnings: 2850,
        activeContests: 3,
        monthlyGrowth: 15,
        userInfo: user,
      })

      setArtworks([
        {
          id: 1,
          title: "Divine Light",
          description: "A beautiful representation of God's light",
          image: "/placeholder.svg?height=200&width=300",
          views: 234,
          likes: 45,
          price: 150,
          status: "approved",
          isFeatured: true,
        },
        {
          id: 2,
          title: "Faith Journey",
          description: "Abstract piece showing spiritual growth",
          image: "/placeholder.svg?height=200&width=300",
          views: 189,
          likes: 32,
          price: 0,
          status: "pending",
          isFeatured: false,
        },
      ])

      setContests([])
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleUploadArtwork = () => {
    if (!user?.agreements?.noAIConfirmation) {
      setAiAgreementDialog(true)
      return
    }
    setUploadDialog(true)
  }

  const handleAIAgreement = async () => {
    try {
      const response = await fetch("/api/user/agreements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noAIConfirmation: true }),
      })

      if (response.ok) {
        setAiAgreementDialog(false)
        setUploadDialog(true)
        toast.success("Agreement confirmed")
      } else {
        toast.error("Failed to update agreement")
      }
    } catch (error) {
      toast.error("Failed to update agreement")
    }
  }

  const handleSubmitArtwork = async (e) => {
    e.preventDefault()
    try {
      const artworkData = {
        ...newArtwork,
        tags: newArtwork.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        pricing: {
          isForSale: newArtwork.isForSale,
          price: newArtwork.isForSale ? Number.parseFloat(newArtwork.price) : 0,
        },
      }

      // Mock API call - replace with real endpoint
      console.log("Creating artwork:", artworkData)

      setUploadDialog(false)
      setNewArtwork({
        title: "",
        description: "",
        category: "",
        medium: "",
        price: "",
        tags: "",
        isForSale: false,
      })

      toast.success("Artwork uploaded successfully!")
      fetchDashboardData()
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload artwork")
    }
  }

  const getTierBadge = (tier) => {
    return tier === "tier2" || tier === "gold" || tier === "platinum" || tier === "diamond" ? (
      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <Crown className="h-3 w-3 mr-1" />
        Pro
      </Badge>
    ) : (
      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <Shield className="h-3 w-3 mr-1" />
        Basic
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 my-32">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || user.userType !== "artist") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 my-32">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <p>Access denied. Artist account required.</p>
          </div>
        </div>
      </div>
    )
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
              <p className="text-indigo-100 text-lg">Welcome back, {user?.name}! ✨</p>
              <div className="flex items-center gap-4 mt-4">
                {getTierBadge(user?.membership?.tier)}
                {user?.isHelper && (
                  <Badge className="bg-green-500/20 text-green-100 border-green-400">
                    <Users className="h-3 w-3 mr-1" />
                    Helper
                  </Badge>
                )}
                <div
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${getLevelColor(user?.points?.level)} text-white font-bold`}
                >
                  <Award className="h-4 w-4 inline mr-2" />
                  {user?.points?.current?.toLocaleString() || 0} pts
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
            {user?.isHelper && (
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
                      <p className="text-3xl font-bold">{stats.totalArtworks || 0}</p>
                      <p className="text-blue-100 text-xs">+{stats.monthlyGrowth || 0}% this month</p>
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
                      <p className="text-3xl font-bold">{stats.totalViews?.toLocaleString() || 0}</p>
                      <p className="text-green-100 text-xs">Across all artworks</p>
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
                      <p className="text-purple-100 text-sm font-medium">Total Points</p>
                      <p className="text-3xl font-bold">{stats.totalEarnings || 0}</p>
                      <p className="text-purple-100 text-xs">Points earned</p>
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
                      <p className="text-3xl font-bold">{stats.activeContests || 0}</p>
                      <p className="text-orange-100 text-xs">Available to join</p>
                    </div>
                    <Trophy className="h-8 w-8 text-orange-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>
            </div>

            {/* Helper Stats (if user is helper) */}
            {user?.isHelper && (
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
                      <div className="text-2xl font-bold text-emerald-600">{user.helperInfo?.rating?.average || 0}</div>
                      <p className="text-sm text-emerald-600">Rating</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{user.helperInfo?.rating?.count || 0}</div>
                      <p className="text-sm text-emerald-600">Jobs Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{stats.helperBookings || 0}</div>
                      <p className="text-sm text-emerald-600">Active Bookings</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">$0</div>
                      <p className="text-sm text-emerald-600">Helper Earnings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
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
                        artwork.status === "approved"
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
                      {artwork.price > 0 && <span className="font-bold text-green-600">${artwork.price}</span>}
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

            {artworks.length === 0 && (
              <div className="text-center py-12">
                <Palette className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No Artworks Yet</h3>
                <p className="text-gray-500 mb-4">Start building your gallery by uploading your first artwork!</p>
                <Button onClick={handleUploadArtwork}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First Artwork
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Other tabs remain the same but with real data integration */}
          <TabsContent value="contests" className="space-y-6">
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No Active Contests</h3>
              <p className="text-gray-500">Check back later for exciting art contests!</p>
            </div>
          </TabsContent>

          <TabsContent value="shop" className="space-y-6">
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Shop Coming Soon</h3>
              <p className="text-gray-500">Browse and purchase art supplies, prints, and more!</p>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Courses Coming Soon</h3>
              <p className="text-gray-500">Learn new techniques and improve your artistic skills!</p>
            </div>
          </TabsContent>

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
                      <Input id="name" defaultValue={user?.name} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={user?.email} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Artist Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your artistic journey..."
                      defaultValue={
                        user?.bio || "Passionate Christian artist specializing in contemporary religious art..."
                      }
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
                    <Checkbox id="helper" checked={user?.isHelper || false} />
                    <Label htmlFor="helper">Available as Helper</Label>
                  </div>
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
                      <SelectItem value="painting">Traditional Painting</SelectItem>
                      <SelectItem value="sculpture">Sculpture</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="mixed-media">Mixed Media</SelectItem>
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
                  <Label htmlFor="medium">Medium</Label>
                  <Input
                    id="medium"
                    value={newArtwork.medium}
                    onChange={(e) => setNewArtwork({ ...newArtwork, medium: e.target.value })}
                    placeholder="Oil on canvas, Digital, etc."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={newArtwork.tags}
                    onChange={(e) => setNewArtwork({ ...newArtwork, tags: e.target.value })}
                    placeholder="christian, faith, hope, love"
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

              {newArtwork.isForSale && (
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newArtwork.price}
                    onChange={(e) => setNewArtwork({ ...newArtwork, price: e.target.value })}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

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
