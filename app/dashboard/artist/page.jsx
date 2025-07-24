"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/hooks/useAuth"
import { useRouter } from "next/navigation"
import {
  Upload,
  Eye,
  Heart,
  Star,
  Award,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Loader2,
  AlertTriangle,
  ShoppingBag,
  BookOpen,
  Calendar,
  Users,
  DollarSign,
  Package,
  Clock,
  Plus,
  ImageIcon,
  Crown,
  Gift,
  MessageSquare,
  BarChart3,
  Coins,
  Megaphone,
  CheckCircle,
  XCircle,
  ExternalLink,
  Zap,
  Target,
  Handshake,
  Home,
  FileText,
  TrendingUp,
  MapPin,
} from "lucide-react"
import { useToast } from "@/lib/hooks/use-toast"

export default function ArtistDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [artworks, setArtworks] = useState([])
  const [posts, setPosts] = useState([])
  const [courses, setCourses] = useState([])
  const [products, setProducts] = useState([])
  const [merchandise, setMerchandise] = useState([])
  const [events, setEvents] = useState([])
  const [tips, setTips] = useState([])
  const [commissions, setCommissions] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [stats, setStats] = useState({
    overview: {
      totalArtworks: 0,
      approvedArtworks: 0,
      pendingArtworks: 0,
      rejectedArtworks: 0,
      totalViews: 0,
      totalLikes: 0,
      totalShares: 0,
      featuredCount: 0,
    },
    engagement: {
      totalViews: 0,
      totalLikes: 0,
      monthlyViews: 0,
      monthlyLikes: 0,
      viewsGrowth: 0,
      likesGrowth: 0,
      averageViews: 0,
      averageLikes: 0,
      engagementRate: 0,
    },
    points: {
      current: 0,
      total: 0,
      level: "bronze",
      thisMonth: 0,
    },
    categories: [],
    recentActivity: [],
    topArtworks: [],
    monthly: [],
  })
  const [contests, setContests] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [pointsDialogOpen, setPointsDialogOpen] = useState(false)
  const [subscriptionInfo, setSubscriptionInfo] = useState(null)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [activeSection, setActiveSection] = useState("overview")
  const [uploadType, setUploadType] = useState("artwork")

  // Form states
  const [artworkForm, setArtworkForm] = useState({
    title: "",
    description: "",
    category: "",
    medium: "",
    tags: "",
    price: "",
    isForSale: false,
    images: [],
    location: "",
    socialHandle: "",
    commissionAvailable: false,
    allowAds: false,
    noAIConfirmation: false,
  })

  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    visibility: "public",
    tags: "",
    commentsEnabled: true,
    status: "published",
    images: [],
  })

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    price: "",
    thumbnail: null,
  })

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    type: "",
    startDate: "",
    endDate: "",
    location: "",
    banner: null,
  })

  const [merchandiseForm, setMerchandiseForm] = useState({
    title: "",
    description: "",
    itemType: "",
    basePrice: "",
    variants: [],
    artworkId: "",
    images: [],
  })

  const [pointsExchange, setPointsExchange] = useState({
    type: "",
    amount: "",
    details: {},
  })

  const [uploading, setUploading] = useState(false)

  // Sidebar navigation items
  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "artworks", label: "Artworks", icon: ImageIcon },
    { id: "posts", label: "Posts", icon: FileText },
    { id: "tips", label: "Tips", icon: Gift },
    { id: "commissions", label: "Commissions", icon: Handshake },
    { id: "merchandise", label: "Merchandise", icon: ShoppingBag },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "events", label: "Events", icon: Calendar },
    { id: "contests", label: "Contests", icon: Award },
  ]

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

      // Fetch stats
      const statsResponse = await fetch("/api/dashboard/artist/stats", {
        credentials: "include",
      })
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch artworks with subscription info
      const artworksResponse = await fetch("/api/dashboard/artist/artworks", {
        credentials: "include",
      })
      if (artworksResponse.ok) {
        const artworksData = await artworksResponse.json()
        setArtworks(artworksData.artworks || [])
        setSubscriptionInfo(artworksData.subscription)
      }

      // Fetch posts
      const postsResponse = await fetch("/api/dashboard/artist/posts", {
        credentials: "include",
      })
      if (postsResponse.ok) {
        const postsData = await postsResponse.json()
        setPosts(postsData.posts || [])
      }

      // Fetch tips
      const tipsResponse = await fetch("/api/dashboard/artist/tips", {
        credentials: "include",
      })
      if (tipsResponse.ok) {
        const tipsData = await tipsResponse.json()
        setTips(tipsData.tips || [])
      }

      // Fetch commissions
      const commissionsResponse = await fetch("/api/dashboard/artist/commissions", {
        credentials: "include",
      })
      if (commissionsResponse.ok) {
        const commissionsData = await commissionsResponse.json()
        setCommissions(commissionsData.commissions || [])
      }

      // Fetch merchandise (only for paid subscribers)
      const merchandiseResponse = await fetch("/api/dashboard/artist/merchandise", {
        credentials: "include",
      })
      if (merchandiseResponse.ok) {
        const merchandiseData = await merchandiseResponse.json()
        setMerchandise(merchandiseData.products || [])
      }

      // Fetch analytics
      const analyticsResponse = await fetch("/api/dashboard/artist/analytics", {
        credentials: "include",
      })
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json()
        setAnalytics(analyticsData)
      }

      // Fetch courses
      const coursesResponse = await fetch("/api/dashboard/artist/courses", {
        credentials: "include",
      })
      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json()
        setCourses(coursesData.courses || [])
      }

      // Fetch events
      const eventsResponse = await fetch("/api/dashboard/artist/events", {
        credentials: "include",
      })
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json()
        setEvents(eventsData.events || [])
      }

      // Fetch contests
      const contestsResponse = await fetch("/api/dashboard/artist/contests", {
        credentials: "include",
      })
      if (contestsResponse.ok) {
        const contestsData = await contestsResponse.json()
        setContests(contestsData.contests || [])
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUploadSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      let endpoint = ""
      const formData = new FormData()

      switch (uploadType) {
        case "artwork":
          endpoint = "/api/dashboard/artist/artworks"
          formData.append("title", artworkForm.title)
          formData.append("description", artworkForm.description)
          formData.append("category", artworkForm.category)
          formData.append("medium", artworkForm.medium || "Mixed Media")
          formData.append("tags", artworkForm.tags)
          formData.append("isForSale", artworkForm.isForSale)
          formData.append("location", artworkForm.location)
          formData.append("socialHandle", artworkForm.socialHandle)
          formData.append("commissionAvailable", artworkForm.commissionAvailable)
          formData.append("allowAds", artworkForm.allowAds)
          formData.append("noAIConfirmation", artworkForm.noAIConfirmation)
          if (artworkForm.isForSale) {
            formData.append("price", artworkForm.price)
          }
          artworkForm.images.forEach((image) => {
            formData.append("images", image)
          })
          break

        case "post":
          endpoint = "/api/dashboard/artist/posts"
          formData.append("title", postForm.title)
          formData.append("content", postForm.content)
          formData.append("visibility", postForm.visibility)
          formData.append("tags", postForm.tags)
          formData.append("commentsEnabled", postForm.commentsEnabled)
          formData.append("status", postForm.status)
          postForm.images.forEach((image) => {
            formData.append("images", image)
          })
          break

        case "course":
          endpoint = "/api/dashboard/artist/courses"
          formData.append("title", courseForm.title)
          formData.append("description", courseForm.description)
          formData.append("category", courseForm.category)
          formData.append("level", courseForm.level)
          formData.append("duration", courseForm.duration)
          formData.append("price", courseForm.price)
          if (courseForm.thumbnail) {
            formData.append("thumbnail", courseForm.thumbnail)
          }
          break

        case "event":
          endpoint = "/api/dashboard/artist/events"
          formData.append("title", eventForm.title)
          formData.append("description", eventForm.description)
          formData.append("type", eventForm.type)
          formData.append("startDate", eventForm.startDate)
          formData.append("endDate", eventForm.endDate)
          formData.append("location", eventForm.location)
          if (eventForm.banner) {
            formData.append("banner", eventForm.banner)
          }
          break

        case "merchandise":
          endpoint = "/api/dashboard/artist/merchandise"
          formData.append("title", merchandiseForm.title)
          formData.append("description", merchandiseForm.description)
          formData.append("itemType", merchandiseForm.itemType)
          formData.append("basePrice", merchandiseForm.basePrice)
          formData.append("variants", JSON.stringify(merchandiseForm.variants))
          if (merchandiseForm.artworkId) {
            formData.append("artworkId", merchandiseForm.artworkId)
          }
          merchandiseForm.images.forEach((image) => {
            formData.append("images", image)
          })
          break
      }

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Success",
          description: result.message,
        })
        setUploadDialogOpen(false)
        resetForms()
        fetchDashboardData()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handlePointsExchange = async () => {
    try {
      const response = await fetch("/api/points/exchange", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pointsExchange),
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Success",
          description: result.message,
        })
        setPointsDialogOpen(false)
        setPointsExchange({ type: "", amount: "", details: {} })
        fetchDashboardData()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Exchange failed")
      }
    } catch (error) {
      console.error("Points exchange error:", error)
      toast({
        title: "Exchange failed",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const resetForms = () => {
    setArtworkForm({
      title: "",
      description: "",
      category: "",
      medium: "",
      tags: "",
      price: "",
      isForSale: false,
      images: [],
      location: "",
      socialHandle: "",
      commissionAvailable: false,
      allowAds: false,
      noAIConfirmation: false,
    })
    setPostForm({
      title: "",
      content: "",
      visibility: "public",
      tags: "",
      commentsEnabled: true,
      status: "published",
      images: [],
    })
    setCourseForm({
      title: "",
      description: "",
      category: "",
      level: "",
      duration: "",
      price: "",
      thumbnail: null,
    })
    setEventForm({
      title: "",
      description: "",
      type: "",
      startDate: "",
      endDate: "",
      location: "",
      banner: null,
    })
    setMerchandiseForm({
      title: "",
      description: "",
      itemType: "",
      basePrice: "",
      variants: [],
      artworkId: "",
      images: [],
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
      case "published":
      case "active":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
      case "inactive":
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSubscriptionBadge = (tier) => {
    switch (tier) {
      case "tier2":
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Crown className="w-3 h-3 mr-1" />
            Tier 2 Pro
          </Badge>
        )
      case "tier1":
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <Star className="w-3 h-3 mr-1" />
            Tier 1
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Users className="w-3 h-3 mr-1" />
            Free
          </Badge>
        )
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-lg text-gray-600">Loading your creative dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || user.userType !== "artist") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Access denied. Artist account required.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-32">
      <div className="container mx-auto p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl sticky top-6">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    {subscriptionInfo && getSubscriptionBadge(subscriptionInfo.tier)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeSection === item.id
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                            : "text-gray-700 hover:bg-white/50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    )
                  })}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <Button
                      onClick={() => setPointsDialogOpen(true)}
                      variant="outline"
                      className="w-full bg-white/50 border-white/30"
                    >
                      <Coins className="w-4 h-4 mr-2" />
                      {stats.points?.current || 0} Points
                    </Button>
                    <Button
                      onClick={() => setUploadDialogOpen(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Artist Dashboard
                </h1>
                <p className="text-gray-600 text-lg">Manage your creative portfolio and grow your artistic ministry</p>
                {subscriptionInfo && subscriptionInfo.tier === "free" && (
                  <div className="mt-2 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700">
                      <Zap className="w-4 h-4 inline mr-1" />
                      You're using {subscriptionInfo.currentCount}/{subscriptionInfo.maxArtworks} artwork uploads.{" "}
                      <Button variant="link" className="p-0 h-auto text-purple-700 underline">
                        Upgrade to upload more
                      </Button>
                    </p>
                  </div>
                )}
              </div>
              <Button
                onClick={() => router.push(`/artists/${user._id}`)}
                variant="outline"
                className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Public Profile
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-100">Total Artworks</CardTitle>
                  <ImageIcon className="h-5 w-5 text-purple-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.overview?.totalArtworks || 0}</div>
                  <p className="text-xs text-purple-200">{stats.overview?.approvedArtworks || 0} approved</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-100">Total Views</CardTitle>
                  <Eye className="h-5 w-5 text-blue-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{(stats.engagement?.totalViews || 0).toLocaleString()}</div>
                  <p className="text-xs text-blue-200">+{stats.engagement?.monthlyViews || 0} this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-100">Total Likes</CardTitle>
                  <Heart className="h-5 w-5 text-green-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{(stats.engagement?.totalLikes || 0).toLocaleString()}</div>
                  <p className="text-xs text-green-200">+{stats.engagement?.monthlyLikes || 0} this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-100">Points Earned</CardTitle>
                  <Star className="h-5 w-5 text-orange-200" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.points?.current || 0}</div>
                  <p className="text-xs text-orange-200">{stats.points?.total || 0} total earned</p>
                </CardContent>
              </Card>
            </div>

            {/* Dynamic Content Based on Active Section */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">Performance Overview</CardTitle>
                      <CardDescription>Your creative impact metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Views Growth</span>
                          <span>{stats.engagement?.monthlyViews || 0} this month</span>
                        </div>
                        <Progress
                          value={Math.min(((stats.engagement?.monthlyViews || 0) / 1000) * 100, 100)}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Likes Growth</span>
                          <span>{stats.engagement?.monthlyLikes || 0} this month</span>
                        </div>
                        <Progress
                          value={Math.min(((stats.engagement?.monthlyLikes || 0) / 100) * 100, 100)}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Engagement Rate</span>
                          <span>{stats.engagement?.engagementRate || 0}%</span>
                        </div>
                        <Progress value={Math.min(stats.engagement?.engagementRate || 0, 100)} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">Subscription Benefits</CardTitle>
                      <CardDescription>Your current plan and features</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Current Plan</span>
                          {getSubscriptionBadge(subscriptionInfo?.tier || "free")}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Artwork Uploads</span>
                            <span className="font-medium">
                              {subscriptionInfo?.currentCount || 0}/
                              {subscriptionInfo?.maxArtworks === -1 ? "∞" : subscriptionInfo?.maxArtworks || 5}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span>Point Multiplier</span>
                            <span className="font-medium">
                              {subscriptionInfo?.tier === "tier2"
                                ? "3x"
                                : subscriptionInfo?.tier === "tier1"
                                  ? "2x"
                                  : "1x"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span>Merchandise Sales</span>
                            <span
                              className={`font-medium ${subscriptionInfo?.tier !== "free" ? "text-green-600" : "text-gray-400"}`}
                            >
                              {subscriptionInfo?.tier !== "free" ? "✓ Available" : "✗ Upgrade Required"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span>Advanced Analytics</span>
                            <span
                              className={`font-medium ${subscriptionInfo?.tier !== "free" ? "text-green-600" : "text-gray-400"}`}
                            >
                              {subscriptionInfo?.tier !== "free" ? "✓ Available" : "✗ Upgrade Required"}
                            </span>
                          </div>
                        </div>

                        {subscriptionInfo?.tier === "free" && (
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 mt-4">
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade to Unlock More Features
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                    <CardDescription>Latest updates across your creative portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...artworks.slice(0, 3), ...tips.slice(0, 2), ...commissions.slice(0, 2)].map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-white/50 rounded-lg">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                            {item.image || item.sender ? (
                              <img
                                src={item.image || item.sender?.profileImage || "/placeholder.svg"}
                                alt={item.title || "Activity"}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {item.title || (item.amount ? `$${item.amount} tip received` : "Activity")}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.status || "Active"} • {item.createdAt || "Recently created"}
                            </p>
                          </div>
                          <Badge className={getStatusColor(item.status || "active")}>{item.status || "Active"}</Badge>
                        </div>
                      ))}
                      {artworks.length === 0 && tips.length === 0 && commissions.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No recent activity. Start creating to see updates here!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "artworks" && (
              <div className="space-y-6">
                {/* Filters */}
                <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search artworks..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white/50"
                        />
                      </div>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full sm:w-48 bg-white/50">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-48 bg-white/50">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                          <SelectItem value="views">Most Viewed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Artworks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artworks
                    .filter((artwork) => {
                      const matchesSearch =
                        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        artwork.description.toLowerCase().includes(searchTerm.toLowerCase())
                      const matchesStatus = filterStatus === "all" || artwork.status === filterStatus
                      return matchesSearch && matchesStatus
                    })
                    .map((artwork) => (
                      <Card
                        key={artwork.id}
                        className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                      >
                        <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                          {artwork.image ? (
                            <img
                              src={artwork.image || "/placeholder.svg"}
                              alt={artwork.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-16 h-16 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3">
                            <Badge className={getStatusColor(artwork.status)}>{artwork.status}</Badge>
                          </div>
                          {artwork.isFeatured && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            </div>
                          )}
                          {artwork.allowAds && (
                            <div className="absolute bottom-3 left-3">
                              <Badge className="bg-gradient-to-r from-green-400 to-blue-400 text-white border-0">
                                <Megaphone className="w-3 h-3 mr-1" />
                                Ad Eligible
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg truncate text-gray-900">{artwork.title}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{artwork.description}</p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {artwork.views || 0}
                              </span>
                              <span className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                {artwork.likes || 0}
                              </span>
                              <span className="flex items-center">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                {artwork.comments || 0}
                              </span>
                            </div>
                            <span>{artwork.createdAt}</span>
                          </div>

                          {artwork.isForSale && (
                            <div className="mb-4 p-2 bg-green-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-green-700">For Sale</span>
                                <span className="font-semibold text-green-800">${artwork.price}</span>
                              </div>
                              {artwork.noAIConfirmation && (
                                <div className="flex items-center mt-1">
                                  <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
                                  <span className="text-xs text-green-600">No AI Confirmed</span>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/50 hover:bg-white/80 border-white/30"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-white/50 hover:bg-red-50 border-white/30"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {artworks.length === 0 && (
                  <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardContent className="text-center py-12">
                      <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No artworks found</h3>
                      <p className="text-gray-600 mb-6">
                        {searchTerm || filterStatus !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "Start by uploading your first artwork to share your creative vision"}
                      </p>
                      <Button
                        onClick={() => {
                          setUploadType("artwork")
                          setUploadDialogOpen(true)
                        }}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Your First Artwork
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeSection === "posts" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Card
                      key={post.id}
                      className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="aspect-video relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg overflow-hidden">
                        {post.images && post.images.length > 0 ? (
                          <img
                            src={post.images[0].url || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-16 h-16 text-blue-400" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <Badge
                            className={`${
                              post.visibility === "public"
                                ? "bg-green-600"
                                : post.visibility === "patrons"
                                  ? "bg-blue-600"
                                  : "bg-purple-600"
                            } text-white border-0`}
                          >
                            {post.visibility}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {post.likesCount || 0}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {post.commentsCount || 0}
                            </span>
                          </div>
                          <span>{post.createdAt}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white/80 border-white/30">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {posts.length === 0 && (
                  <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardContent className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No posts created</h3>
                      <p className="text-gray-600 mb-6">Share your thoughts and updates with your community</p>
                      <Button
                        onClick={() => {
                          setUploadType("post")
                          setUploadDialogOpen(true)
                        }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Post
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeSection === "tips" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-green-100">Total Tips</CardTitle>
                      <Gift className="h-5 w-5 text-green-200" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{tips.length}</div>
                      <p className="text-xs text-green-200">From generous patrons</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-blue-100">Total Amount</CardTitle>
                      <DollarSign className="h-5 w-5 text-blue-200" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        ${tips.reduce((sum, tip) => sum + tip.amount, 0).toFixed(2)}
                      </div>
                      <p className="text-xs text-blue-200">Lifetime earnings</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-purple-100">Average Tip</CardTitle>
                      <Target className="h-5 w-5 text-purple-200" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        $
                        {tips.length > 0
                          ? (tips.reduce((sum, tip) => sum + tip.amount, 0) / tips.length).toFixed(2)
                          : "0.00"}
                      </div>
                      <p className="text-xs text-purple-200">Per tip received</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Recent Tips</CardTitle>
                    <CardDescription>Tips received from your supporters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tips.map((tip) => (
                        <div key={tip.id} className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                            {tip.sender && !tip.isAnonymous ? (
                              <img
                                src={tip.sender.profileImage || "/placeholder.svg"}
                                alt={tip.sender.name}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <Gift className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">
                                {tip.isAnonymous ? "Anonymous Supporter" : tip.sender?.name || "Unknown"}
                              </h4>
                              <span className="font-bold text-green-600">${tip.amount}</span>
                            </div>
                            {tip.message && <p className="text-sm text-gray-600 mt-1">"{tip.message}"</p>}
                            <p className="text-xs text-gray-500 mt-1">{tip.createdAt}</p>
                          </div>
                        </div>
                      ))}
                      {tips.length === 0 && (
                        <div className="text-center py-8">
                          <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-gray-900 mb-2">No tips received yet</h3>
                          <p className="text-gray-600">Share your artwork to start receiving tips from supporters</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "commissions" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  {["pending", "accepted", "completed", "cancelled"].map((status) => (
                    <Card key={status} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium capitalize">{status}</CardTitle>
                        <Handshake className="h-4 w-4 text-gray-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {commissions.filter((c) => c.status === status).length}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Commission Requests</CardTitle>
                    <CardDescription>Manage your commission requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {commissions.map((commission) => (
                        <div key={commission.id} className="p-4 bg-white/50 rounded-lg border border-gray-200">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <img
                                src={commission.client.profileImage || "/placeholder.svg"}
                                alt={commission.client.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">{commission.title}</h4>
                                <p className="text-sm text-gray-600">by {commission.client.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(commission.status)}>{commission.status}</Badge>
                              <p className="text-sm font-semibold text-gray-900 mt-1">${commission.budget}</p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-3">{commission.description}</p>

                          {commission.deadline && (
                            <p className="text-xs text-gray-500 mb-3">
                              <Clock className="w-3 h-3 inline mr-1" />
                              Deadline: {new Date(commission.deadline).toLocaleDateString()}
                            </p>
                          )}

                          {commission.status === "pending" && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => {
                                  // Handle accept commission
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                                onClick={() => {
                                  // Handle decline commission
                                }}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Decline
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                      {commissions.length === 0 && (
                        <div className="text-center py-8">
                          <Handshake className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-gray-900 mb-2">No commission requests</h3>
                          <p className="text-gray-600">
                            Enable commissions on your artworks to start receiving requests
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "merchandise" && (
              <div className="space-y-6">
                {subscriptionInfo?.tier === "free" ? (
                  <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardContent className="text-center py-12">
                      <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Merchandise Creation</h3>
                      <p className="text-gray-600 mb-6">
                        Upgrade to a paid subscription to create and sell custom merchandise with your artwork
                      </p>
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade Now
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {merchandise.map((item) => (
                        <Card
                          key={item.id}
                          className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                        >
                          <div className="aspect-square relative bg-gradient-to-br from-green-100 to-blue-100 rounded-t-lg overflow-hidden">
                            {item.image ? (
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-16 h-16 text-green-400" />
                              </div>
                            )}
                            <div className="absolute top-3 right-3">
                              <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                            </div>
                            <div className="absolute bottom-3 left-3">
                              <Badge className="bg-green-600 text-white border-0">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {item.price}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <span>Stock: {item.stock || "On-demand"}</span>
                              <span>Sales: {item.sales || 0}</span>
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/50 hover:bg-white/80 border-white/30"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {merchandise.length === 0 && (
                      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                        <CardContent className="text-center py-12">
                          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-gray-900 mb-2">No merchandise created</h3>
                          <p className="text-gray-600 mb-6">Create custom merchandise featuring your artwork</p>
                          <Button
                            onClick={() => {
                              setUploadType("merchandise")
                              setUploadDialogOpen(true)
                            }}
                            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Merchandise
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </div>
            )}

            {activeSection === "analytics" && (
              <div className="space-y-6">
                {analytics?.subscription?.hasAdvancedAnalytics ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                          <DollarSign className="h-4 w-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            ${analytics?.basic?.totalRevenue?.toFixed(2) || "0.00"}
                          </div>
                          <p className="text-xs text-gray-500">From sales & commissions</p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                          <TrendingUp className="h-4 w-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{analytics?.basic?.engagementRate || 0}%</div>
                          <p className="text-xs text-gray-500">Likes + shares / views</p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Avg. Views</CardTitle>
                          <Eye className="h-4 w-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{analytics?.basic?.averageViews || 0}</div>
                          <p className="text-xs text-gray-500">Per artwork</p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                          <ShoppingBag className="h-4 w-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{analytics?.basic?.totalSales || 0}</div>
                          <p className="text-xs text-gray-500">Completed transactions</p>
                        </CardContent>
                      </Card>
                    </div>

                    {analytics?.advanced && (
                      <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                            <CardHeader>
                              <CardTitle className="text-xl font-bold">Top Performing Artworks</CardTitle>
                              <CardDescription>Your most viewed and liked pieces</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {analytics.advanced.topArtworks?.map((artwork, index) => (
                                  <div key={artwork.id} className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                      {index + 1}
                                    </div>
                                    <img
                                      src={artwork.image || "/placeholder.svg"}
                                      alt={artwork.title}
                                      className="w-12 h-12 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                      <h4 className="font-medium text-gray-900">{artwork.title}</h4>
                                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span className="flex items-center">
                                          <Eye className="w-3 h-3 mr-1" />
                                          {artwork.views}
                                        </span>
                                        <span className="flex items-center">
                                          <Heart className="w-3 h-3 mr-1" />
                                          {artwork.likes}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                            <CardHeader>
                              <CardTitle className="text-xl font-bold">Category Performance</CardTitle>
                              <CardDescription>Performance breakdown by artwork category</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {analytics.advanced.categoryPerformance?.map((category) => (
                                  <div key={category._id} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium capitalize">{category._id}</span>
                                      <span className="text-sm text-gray-500">{category.count} artworks</span>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="flex justify-between text-sm">
                                        <span>Avg. Views</span>
                                        <span>{Math.round(category.avgViews || 0)}</span>
                                      </div>
                                      <Progress
                                        value={Math.min((category.avgViews / 1000) * 100, 100)}
                                        className="h-2"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardContent className="text-center py-12">
                      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Advanced Analytics</h3>
                      <p className="text-gray-600 mb-6">
                        Upgrade to a paid subscription to access detailed analytics and insights
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900">{analytics?.basic?.totalViews || 0}</div>
                          <div className="text-sm text-gray-600">Total Views</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900">{analytics?.basic?.totalLikes || 0}</div>
                          <div className="text-sm text-gray-600">Total Likes</div>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade for Advanced Analytics
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeSection === "events" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.map((event) => (
                    <Card
                      key={event.id}
                      className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="aspect-video relative bg-gradient-to-br from-orange-100 to-red-100 rounded-t-lg overflow-hidden">
                        {event.banner ? (
                          <img
                            src={event.banner || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Calendar className="w-16 h-16 text-orange-400" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">{event.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>

                        <div className="space-y-2 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(event.startDate).toLocaleDateString()}
                          </div>
                          {event.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {event.location}
                            </div>
                          )}
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {event.attendeeCount || 0} attendees
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white/80 border-white/30">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {events.length === 0 && (
                  <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardContent className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No events scheduled</h3>
                      <p className="text-gray-600 mb-6">
                        Create workshops, exhibitions, or other events to engage your community
                      </p>
                      <Button
                        onClick={() => {
                          setUploadType("event")
                          setUploadDialogOpen(true)
                        }}
                        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Event
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeSection === "contests" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contests.map((contest) => (
                    <Card
                      key={contest.id}
                      className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl text-gray-900">{contest.title}</CardTitle>
                            <CardDescription className="mt-1 text-gray-600">{contest.theme}</CardDescription>
                          </div>
                          <Badge className={getStatusColor(contest.status)}>{contest.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{contest.description}</p>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Prize:</span>
                            <span className="font-medium text-gray-900">{contest.prize}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Participants:</span>
                            <span className="text-gray-900">{contest.participantCount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Ends:</span>
                            <span className="text-gray-900">{new Date(contest.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                          {contest.hasEntered ? (
                            <Button variant="outline" className="w-full bg-white/50 border-white/30" disabled>
                              <Award className="w-4 h-4 mr-2" />
                              Already Entered
                            </Button>
                          ) : (
                            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                              <Award className="w-4 h-4 mr-2" />
                              Enter Contest
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {contests.length === 0 && (
                  <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardContent className="text-center py-12">
                      <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No active contests</h3>
                      <p className="text-gray-600">
                        Check back later for new contest opportunities to showcase your talent
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Create New Content</DialogTitle>
              <DialogDescription>Choose what type of content you'd like to create</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Upload Type Selection */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { type: "artwork", icon: ImageIcon, label: "Artwork", color: "purple", available: true },
                  { type: "post", icon: FileText, label: "Post", color: "blue", available: true },
                  {
                    type: "course",
                    icon: BookOpen,
                    label: "Course",
                    color: "green",
                    available: subscriptionInfo?.tier === "tier2",
                  },
                  {
                    type: "merchandise",
                    icon: ShoppingBag,
                    label: "Merchandise",
                    color: "emerald",
                    available: subscriptionInfo?.tier !== "free",
                  },
                  { type: "event", icon: Calendar, label: "Event", color: "orange", available: true },
                ].map(({ type, icon: Icon, label, color, available }) => (
                  <button
                    key={type}
                    onClick={() => available && setUploadType(type)}
                    disabled={!available}
                    className={`p-4 rounded-xl border-2 transition-all relative ${
                      uploadType === type
                        ? `border-${color}-500 bg-${color}-50`
                        : available
                          ? "border-gray-200 hover:border-gray-300"
                          : "border-gray-100 bg-gray-50 cursor-not-allowed"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mx-auto mb-2 ${
                        uploadType === type ? `text-${color}-600` : available ? "text-gray-400" : "text-gray-300"
                      }`}
                    />
                    <p
                      className={`font-medium ${
                        uploadType === type ? `text-${color}-700` : available ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </p>
                    {!available && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                        <Crown className="w-5 h-5 text-purple-500" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Dynamic Form Based on Upload Type */}
              <form onSubmit={handleUploadSubmit} className="space-y-6">
                {uploadType === "artwork" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="artwork-title">Title *</Label>
                        <Input
                          id="artwork-title"
                          value={artworkForm.title}
                          onChange={(e) => setArtworkForm((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter artwork title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="artwork-category">Category *</Label>
                        <Select
                          value={artworkForm.category}
                          onValueChange={(value) => setArtworkForm((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="painting">Painting</SelectItem>
                            <SelectItem value="digital">Digital Art</SelectItem>
                            <SelectItem value="photography">Photography</SelectItem>
                            <SelectItem value="sculpture">Sculpture</SelectItem>
                            <SelectItem value="mural">Mural</SelectItem>
                            <SelectItem value="mixed-media">Mixed Media</SelectItem>
                            <SelectItem value="drawing">Drawing</SelectItem>
                            <SelectItem value="printmaking">Printmaking</SelectItem>
                            <SelectItem value="video">Video Art</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="artwork-description">Description *</Label>
                      <Textarea
                        id="artwork-description"
                        value={artworkForm.description}
                        onChange={(e) => setArtworkForm((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your artwork and its inspiration..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="artwork-medium">Medium</Label>
                        <Input
                          id="artwork-medium"
                          value={artworkForm.medium}
                          onChange={(e) => setArtworkForm((prev) => ({ ...prev, medium: e.target.value }))}
                          placeholder="e.g., Oil on canvas, Digital, Watercolor"
                        />
                      </div>
                      <div>
                        <Label htmlFor="artwork-tags">Tags</Label>
                        <Input
                          id="artwork-tags"
                          value={artworkForm.tags}
                          onChange={(e) => setArtworkForm((prev) => ({ ...prev, tags: e.target.value }))}
                          placeholder="faith, hope, abstract, colorful"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="artwork-isForSale"
                            checked={artworkForm.isForSale}
                            onChange={(e) => setArtworkForm((prev) => ({ ...prev, isForSale: e.target.checked }))}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="artwork-isForSale">Available for sale</Label>
                        </div>
                        {artworkForm.isForSale && (
                          <div>
                            <Label htmlFor="artwork-price">Price ($)</Label>
                            <Input
                              id="artwork-price"
                              type="number"
                              value={artworkForm.price}
                              onChange={(e) => setArtworkForm((prev) => ({ ...prev, price: e.target.value }))}
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="artwork-commission"
                          checked={artworkForm.commissionAvailable}
                          onChange={(e) =>
                            setArtworkForm((prev) => ({ ...prev, commissionAvailable: e.target.checked }))
                          }
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="artwork-commission">Accept commission requests</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="artwork-ads"
                          checked={artworkForm.allowAds}
                          onChange={(e) => setArtworkForm((prev) => ({ ...prev, allowAds: e.target.checked }))}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="artwork-ads">
                          Allow this artwork to be promoted in ads (if selected as winner)
                        </Label>
                      </div>

                      {artworkForm.isForSale && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="artwork-no-ai"
                              checked={artworkForm.noAIConfirmation}
                              onChange={(e) =>
                                setArtworkForm((prev) => ({ ...prev, noAIConfirmation: e.target.checked }))
                              }
                              className="rounded border-gray-300"
                              required
                            />
                            <Label htmlFor="artwork-no-ai" className="text-yellow-800">
                              I confirm this artwork is NOT AI-generated *
                            </Label>
                          </div>
                          <p className="text-sm text-yellow-700 mt-2">
                            <AlertTriangle className="w-4 h-4 inline mr-1" />
                            Required for all artwork listed for sale. AI-generated art is not permitted for commercial
                            use on our platform.
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="artwork-images">Images * (Max 10)</Label>
                      <Input
                        id="artwork-images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setArtworkForm((prev) => ({ ...prev, images: Array.from(e.target.files) }))}
                        className="mt-1"
                        required
                      />
                      {artworkForm.images.length > 0 && (
                        <p className="text-sm text-gray-600 mt-1">{artworkForm.images.length} image(s) selected</p>
                      )}
                    </div>
                  </>
                )}

                {uploadType === "post" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="post-title">Post Title *</Label>
                        <Input
                          id="post-title"
                          value={postForm.title}
                          onChange={(e) => setPostForm((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter post title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="post-visibility">Visibility *</Label>
                        <Select
                          value={postForm.visibility}
                          onValueChange={(value) => setPostForm((prev) => ({ ...prev, visibility: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public (Everyone)</SelectItem>
                            <SelectItem value="patrons">Patrons Only</SelectItem>
                            <SelectItem value="subscribers">Subscribers Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="post-content">Content *</Label>
                      <Textarea
                        id="post-content"
                        value={postForm.content}
                        onChange={(e) => setPostForm((prev) => ({ ...prev, content: e.target.value }))}
                        placeholder="Share your thoughts, updates, or inspiration..."
                        rows={6}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="post-tags">Tags</Label>
                      <Input
                        id="post-tags"
                        value={postForm.tags}
                        onChange={(e) => setPostForm((prev) => ({ ...prev, tags: e.target.value }))}
                        placeholder="inspiration, faith, art, community"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="post-comments"
                        checked={postForm.commentsEnabled}
                        onChange={(e) => setPostForm((prev) => ({ ...prev, commentsEnabled: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="post-comments">Enable comments</Label>
                    </div>

                    <div>
                      <Label htmlFor="post-images">Images (Optional, Max 5)</Label>
                      <Input
                        id="post-images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setPostForm((prev) => ({ ...prev, images: Array.from(e.target.files) }))}
                        className="mt-1"
                      />
                      {postForm.images.length > 0 && (
                        <p className="text-sm text-gray-600 mt-1">{postForm.images.length} image(s) selected</p>
                      )}
                    </div>
                  </>
                )}

                {uploadType === "course" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="course-title">Course Title *</Label>
                        <Input
                          id="course-title"
                          value={courseForm.title}
                          onChange={(e) => setCourseForm((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter course title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="course-category">Category *</Label>
                        <Select
                          value={courseForm.category}
                          onValueChange={(value) => setCourseForm((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="painting">Painting</SelectItem>
                            <SelectItem value="digital-art">Digital Art</SelectItem>
                            <SelectItem value="photography">Photography</SelectItem>
                            <SelectItem value="sculpture">Sculpture</SelectItem>
                            <SelectItem value="drawing">Drawing</SelectItem>
                            <SelectItem value="mixed-media">Mixed Media</SelectItem>
                            <SelectItem value="art-history">Art History</SelectItem>
                            <SelectItem value="business">Art Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="course-description">Description *</Label>
                      <Textarea
                        id="course-description"
                        value={courseForm.description}
                        onChange={(e) => setCourseForm((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what students will learn in this course..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="course-level">Level *</Label>
                        <Select
                          value={courseForm.level}
                          onValueChange={(value) => setCourseForm((prev) => ({ ...prev, level: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="all-levels">All Levels</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="course-duration">Duration (hours)</Label>
                        <Input
                          id="course-duration"
                          type="number"
                          value={courseForm.duration}
                          onChange={(e) => setCourseForm((prev) => ({ ...prev, duration: e.target.value }))}
                          placeholder="2"
                          min="1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="course-price">Price ($)</Label>
                        <Input
                          id="course-price"
                          type="number"
                          value={courseForm.price}
                          onChange={(e) => setCourseForm((prev) => ({ ...prev, price: e.target.value }))}
                          placeholder="29.99"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="course-thumbnail">Course Thumbnail</Label>
                      <Input
                        id="course-thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCourseForm((prev) => ({ ...prev, thumbnail: e.target.files[0] }))}
                        className="mt-1"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <BookOpen className="w-4 h-4 inline mr-1" />
                        Course creation is available for Tier 2 subscribers. You can add lessons, assignments, and
                        resources after creating the course.
                      </p>
                    </div>
                  </>
                )}

                {uploadType === "event" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="event-title">Event Title *</Label>
                        <Input
                          id="event-title"
                          value={eventForm.title}
                          onChange={(e) => setEventForm((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter event title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-type">Event Type *</Label>
                        <Select
                          value={eventForm.type}
                          onValueChange={(value) => setEventForm((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="exhibition">Exhibition</SelectItem>
                            <SelectItem value="gallery-opening">Gallery Opening</SelectItem>
                            <SelectItem value="art-fair">Art Fair</SelectItem>
                            <SelectItem value="class">Art Class</SelectItem>
                            <SelectItem value="meetup">Artist Meetup</SelectItem>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="event-description">Description *</Label>
                      <Textarea
                        id="event-description"
                        value={eventForm.description}
                        onChange={(e) => setEventForm((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your event..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="event-start">Start Date *</Label>
                        <Input
                          id="event-start"
                          type="datetime-local"
                          value={eventForm.startDate}
                          onChange={(e) => setEventForm((prev) => ({ ...prev, startDate: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-end">End Date</Label>
                        <Input
                          id="event-end"
                          type="datetime-local"
                          value={eventForm.endDate}
                          onChange={(e) => setEventForm((prev) => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-location">Location</Label>
                        <Input
                          id="event-location"
                          value={eventForm.location}
                          onChange={(e) => setEventForm((prev) => ({ ...prev, location: e.target.value }))}
                          placeholder="Online or Physical Address"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="event-banner">Event Banner</Label>
                      <Input
                        id="event-banner"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEventForm((prev) => ({ ...prev, banner: e.target.files[0] }))}
                        className="mt-1"
                      />
                    </div>
                  </>
                )}

                {uploadType === "merchandise" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="merch-title">Product Title *</Label>
                        <Input
                          id="merch-title"
                          value={merchandiseForm.title}
                          onChange={(e) => setMerchandiseForm((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter product title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="merch-type">Item Type *</Label>
                        <Select
                          value={merchandiseForm.itemType}
                          onValueChange={(value) => setMerchandiseForm((prev) => ({ ...prev, itemType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select item type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="t-shirt">T-Shirt</SelectItem>
                            <SelectItem value="bookmark">Bookmark</SelectItem>
                            <SelectItem value="bible-cover">Bible Cover</SelectItem>
                            <SelectItem value="fan">Church Fan</SelectItem>
                            <SelectItem value="pencil">Pencil</SelectItem>
                            <SelectItem value="mug">Mug</SelectItem>
                            <SelectItem value="tote-bag">Tote Bag</SelectItem>
                            <SelectItem value="sticker">Sticker</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="merch-description">Description *</Label>
                      <Textarea
                        id="merch-description"
                        value={merchandiseForm.description}
                        onChange={(e) => setMerchandiseForm((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your merchandise..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="merch-price">Base Price ($) *</Label>
                        <Input
                          id="merch-price"
                          type="number"
                          value={merchandiseForm.basePrice}
                          onChange={(e) => setMerchandiseForm((prev) => ({ ...prev, basePrice: e.target.value }))}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="merch-artwork">Reference Artwork (Optional)</Label>
                        <Select
                          value={merchandiseForm.artworkId}
                          onValueChange={(value) => setMerchandiseForm((prev) => ({ ...prev, artworkId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select artwork" />
                          </SelectTrigger>
                          <SelectContent>
                            {artworks.map((artwork) => (
                              <SelectItem key={artwork.id} value={artwork.id}>
                                {artwork.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="merch-images">Product Images * (Max 5)</Label>
                      <Input
                        id="merch-images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) =>
                          setMerchandiseForm((prev) => ({ ...prev, images: Array.from(e.target.files) }))
                        }
                        className="mt-1"
                        required
                      />
                      {merchandiseForm.images.length > 0 && (
                        <p className="text-sm text-gray-600 mt-1">{merchandiseForm.images.length} image(s) selected</p>
                      )}
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <Package className="w-4 h-4 inline mr-1" />
                        Merchandise is fulfilled by our third-party printing partner. Items will be printed on-demand
                        and shipped directly to customers.
                      </p>
                    </div>
                  </>
                )}

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={uploading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      `Create ${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}`
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* Points Exchange Dialog */}
        <Dialog open={pointsDialogOpen} onOpenChange={setPointsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Exchange Points</DialogTitle>
              <DialogDescription>
                Convert your {stats.points?.current || 0} points into rewards, cash, or donations
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { type: "cash", icon: DollarSign, label: "Cash", rate: "100 pts = $1" },
                  { type: "gift_card", icon: Gift, label: "Gift Card", rate: "500 pts = $5" },
                  { type: "store_credit", icon: ShoppingBag, label: "Store Credit", rate: "100 pts = $1.50" },
                  { type: "ads", icon: Megaphone, label: "Ad Promotion", rate: "100 pts = 1 day" },
                  { type: "charity", icon: Heart, label: "Charity", rate: "50 pts = $0.50" },
                ].map(({ type, icon: Icon, label, rate }) => (
                  <button
                    key={type}
                    onClick={() => setPointsExchange((prev) => ({ ...prev, type }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      pointsExchange.type === type
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mx-auto mb-2 ${
                        pointsExchange.type === type ? "text-purple-600" : "text-gray-400"
                      }`}
                    />
                    <p className={`font-medium ${pointsExchange.type === type ? "text-purple-700" : "text-gray-600"}`}>
                      {label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{rate}</p>
                  </button>
                ))}
              </div>

              {pointsExchange.type && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="exchange-amount">Points to Exchange</Label>
                    <Input
                      id="exchange-amount"
                      type="number"
                      value={pointsExchange.amount}
                      onChange={(e) => setPointsExchange((prev) => ({ ...prev, amount: e.target.value }))}
                      placeholder="Enter amount"
                      min="1"
                      max={stats.points?.current || 0}
                    />
                  </div>

                  {pointsExchange.type === "charity" && (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="charity-name">Charity/Organization</Label>
                        <Select
                          value={pointsExchange.details.charityName || ""}
                          onValueChange={(value) =>
                            setPointsExchange((prev) => ({
                              ...prev,
                              details: { ...prev.details, charityName: value },
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select charity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="red_cross">Red Cross</SelectItem>
                            <SelectItem value="salvation_army">Salvation Army</SelectItem>
                            <SelectItem value="world_vision">World Vision</SelectItem>
                            <SelectItem value="platform_support">Support Platform</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="split-percentage">Donation Split (%)</Label>
                        <Input
                          id="split-percentage"
                          type="number"
                          value={pointsExchange.details.splitPercentage || 100}
                          onChange={(e) =>
                            setPointsExchange((prev) => ({
                              ...prev,
                              details: { ...prev.details, splitPercentage: Number.parseInt(e.target.value) },
                            }))
                          }
                          min="1"
                          max="100"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Percentage going to charity (remainder supports platform)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setPointsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handlePointsExchange}
                disabled={!pointsExchange.type || !pointsExchange.amount}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Exchange Points
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
