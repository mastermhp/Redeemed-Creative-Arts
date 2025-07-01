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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
// import { useToast } from "@/hooks/use-toast"
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
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Play,
  MapPin,
  Clock,
  Plus,
  ImageIcon,
} from "lucide-react"
import { useToast } from "@/lib/hooks/use-toast"

export default function ArtistDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [artworks, setArtworks] = useState([])
  const [courses, setCourses] = useState([])
  const [products, setProducts] = useState([])
  const [events, setEvents] = useState([])
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
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [activeTab, setActiveTab] = useState("overview")
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
  })

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    level: "",
    duration: "",
    thumbnail: null,
  })

  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: [],
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

  const [uploading, setUploading] = useState(false)

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

      // Fetch artworks
      const artworksResponse = await fetch("/api/dashboard/artist/artworks", {
        credentials: "include",
      })
      if (artworksResponse.ok) {
        const artworksData = await artworksResponse.json()
        setArtworks(artworksData.artworks || [])
      }

      // Fetch courses
      const coursesResponse = await fetch("/api/dashboard/artist/courses", {
        credentials: "include",
      })
      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json()
        setCourses(coursesData.courses || [])
      }

      // Fetch products
      const productsResponse = await fetch("/api/dashboard/artist/shop", {
        credentials: "include",
      })
      if (productsResponse.ok) {
        const productsData = await productsResponse.json()
        setProducts(productsData.products || [])
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
          if (artworkForm.isForSale) {
            formData.append("price", artworkForm.price)
          }
          artworkForm.images.forEach((image) => {
            formData.append("images", image)
          })
          break

        case "course":
          endpoint = "/api/dashboard/artist/courses"
          formData.append("title", courseForm.title)
          formData.append("description", courseForm.description)
          formData.append("category", courseForm.category)
          formData.append("price", courseForm.price)
          formData.append("level", courseForm.level)
          formData.append("duration", courseForm.duration)
          if (courseForm.thumbnail) {
            formData.append("thumbnail", courseForm.thumbnail)
          }
          break

        case "product":
          endpoint = "/api/dashboard/artist/shop"
          formData.append("title", productForm.title)
          formData.append("description", productForm.description)
          formData.append("category", productForm.category)
          formData.append("price", productForm.price)
          formData.append("stock", productForm.stock)
          productForm.images.forEach((image) => {
            formData.append("images", image)
          })
          break

        case "event":
          endpoint = "/api/dashboard/artist/events"
          formData.append("title", eventForm.title)
          formData.append("description", eventForm.description)
          formData.append("type", eventForm.type)
          formData.append("startDate", eventForm.startDate)
          if (eventForm.endDate) {
            formData.append("endDate", eventForm.endDate)
          }
          if (eventForm.location) {
            formData.append("location", eventForm.location)
          }
          if (eventForm.banner) {
            formData.append("banner", eventForm.banner)
          }
          break
      }

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} uploaded successfully!`,
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
    })
    setCourseForm({
      title: "",
      description: "",
      category: "",
      price: "",
      level: "",
      duration: "",
      thumbnail: null,
    })
    setProductForm({
      title: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      images: [],
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
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
      case "published":
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleEditArtwork = (artwork) => {
    setSelectedArtwork(artwork)
    setEditDialogOpen(true)
  }

  const handleDeleteArtwork = (artwork) => {
    setSelectedArtwork(artwork)
    setDeleteDialogOpen(true)
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
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Artist Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage your creative portfolio and grow your artistic ministry</p>
          </div>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Create New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Create New Content</DialogTitle>
                <DialogDescription>Choose what type of content you'd like to create</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Upload Type Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { type: "artwork", icon: ImageIcon, label: "Artwork", color: "purple" },
                    { type: "course", icon: BookOpen, label: "Course", color: "blue" },
                    { type: "product", icon: ShoppingBag, label: "Product", color: "green" },
                    { type: "event", icon: Calendar, label: "Event", color: "orange" },
                  ].map(({ type, icon: Icon, label, color }) => (
                    <button
                      key={type}
                      onClick={() => setUploadType(type)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        uploadType === type
                          ? `border-${color}-500 bg-${color}-50`
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 mx-auto mb-2 ${uploadType === type ? `text-${color}-600` : "text-gray-400"}`}
                      />
                      <p className={`font-medium ${uploadType === type ? `text-${color}-700` : "text-gray-600"}`}>
                        {label}
                      </p>
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
                              <SelectItem value="mixed-media">Mixed Media</SelectItem>
                              <SelectItem value="drawing">Drawing</SelectItem>
                              <SelectItem value="printmaking">Printmaking</SelectItem>
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

                      <div>
                        <Label htmlFor="artwork-images">Images * (Max 5)</Label>
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
                              <SelectItem value="business">Art Business</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
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
                          placeholder="Describe what students will learn..."
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
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="course-duration">Duration (minutes)</Label>
                          <Input
                            id="course-duration"
                            type="number"
                            value={courseForm.duration}
                            onChange={(e) => setCourseForm((prev) => ({ ...prev, duration: e.target.value }))}
                            placeholder="120"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="course-price">Price ($)</Label>
                          <Input
                            id="course-price"
                            type="number"
                            value={courseForm.price}
                            onChange={(e) => setCourseForm((prev) => ({ ...prev, price: e.target.value }))}
                            placeholder="0.00"
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
                    </>
                  )}

                  {uploadType === "product" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="product-title">Product Title *</Label>
                          <Input
                            id="product-title"
                            value={productForm.title}
                            onChange={(e) => setProductForm((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter product title"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="product-category">Category *</Label>
                          <Select
                            value={productForm.category}
                            onValueChange={(value) => setProductForm((prev) => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="original">Original Artwork</SelectItem>
                              <SelectItem value="prints">Prints</SelectItem>
                              <SelectItem value="merchandise">Merchandise</SelectItem>
                              <SelectItem value="gift-cards">Gift Cards</SelectItem>
                              <SelectItem value="digital">Digital Downloads</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="product-description">Description *</Label>
                        <Textarea
                          id="product-description"
                          value={productForm.description}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your product..."
                          rows={4}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="product-price">Price ($) *</Label>
                          <Input
                            id="product-price"
                            type="number"
                            value={productForm.price}
                            onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="product-stock">Stock Quantity</Label>
                          <Input
                            id="product-stock"
                            type="number"
                            value={productForm.stock}
                            onChange={(e) => setProductForm((prev) => ({ ...prev, stock: e.target.value }))}
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="product-images">Product Images * (Max 5)</Label>
                        <Input
                          id="product-images"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => setProductForm((prev) => ({ ...prev, images: Array.from(e.target.files) }))}
                          className="mt-1"
                          required
                        />
                        {productForm.images.length > 0 && (
                          <p className="text-sm text-gray-600 mt-1">{productForm.images.length} image(s) selected</p>
                        )}
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
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="exhibition">Exhibition</SelectItem>
                              <SelectItem value="webinar">Webinar</SelectItem>
                              <SelectItem value="retreat">Retreat</SelectItem>
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

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="event-startDate">Start Date *</Label>
                          <Input
                            id="event-startDate"
                            type="datetime-local"
                            value={eventForm.startDate}
                            onChange={(e) => setEventForm((prev) => ({ ...prev, startDate: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="event-endDate">End Date</Label>
                          <Input
                            id="event-endDate"
                            type="datetime-local"
                            value={eventForm.endDate}
                            onChange={(e) => setEventForm((prev) => ({ ...prev, endDate: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="event-location">Location</Label>
                        <Input
                          id="event-location"
                          value={eventForm.location}
                          onChange={(e) => setEventForm((prev) => ({ ...prev, location: e.target.value }))}
                          placeholder="Event location or 'Online'"
                        />
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

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="artworks" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <ImageIcon className="w-4 h-4 mr-2" />
              Artworks
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="contests" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Award className="w-4 h-4 mr-2" />
              Contests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
                  <CardTitle className="text-xl font-bold">Quick Stats</CardTitle>
                  <CardDescription>Your creative portfolio at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{artworks.length}</div>
                      <div className="text-sm text-purple-600">Artworks</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
                      <div className="text-sm text-blue-600">Courses</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{products.length}</div>
                      <div className="text-sm text-green-600">Products</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{events.length}</div>
                      <div className="text-sm text-orange-600">Events</div>
                    </div>
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
                  {[...artworks.slice(0, 3), ...courses.slice(0, 2), ...products.slice(0, 2)].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-white/50 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                        {item.image || item.thumbnail ? (
                          <img
                            src={item.image || item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">
                          {item.status || "Active"} • {item.createdAt || "Recently created"}
                        </p>
                      </div>
                      <Badge className={getStatusColor(item.status || "active")}>{item.status || "Active"}</Badge>
                    </div>
                  ))}
                  {artworks.length === 0 && courses.length === 0 && products.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No recent activity. Start creating to see updates here!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="artworks" className="space-y-6">
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
              {artworks.map((artwork) => (
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
                      </div>
                      <span>{artwork.createdAt}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                        onClick={() => handleEditArtwork(artwork)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 bg-white/50 hover:bg-red-50 border-white/30"
                        onClick={() => handleDeleteArtwork(artwork)}
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
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="aspect-video relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg overflow-hidden">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-blue-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-black/50 text-white border-0">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.duration}min
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.enrollmentCount || 0} students
                      </span>
                      <span className="font-medium text-green-600">${course.price || 0}</span>
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
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {courses.length === 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No courses created</h3>
                  <p className="text-gray-600 mb-6">Share your knowledge and skills by creating your first course</p>
                  <Button
                    onClick={() => {
                      setUploadType("course")
                      setUploadDialogOpen(true)
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Course
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="shop" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="aspect-square relative bg-gradient-to-br from-green-100 to-blue-100 rounded-t-lg overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-16 h-16 text-green-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-green-600 text-white border-0">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {product.price}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Stock: {product.stock || 0}</span>
                      <span>Sales: {product.sales || 0}</span>
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

            {products.length === 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No products in your shop</h3>
                  <p className="text-gray-600 mb-6">Start selling your artwork, prints, or merchandise</p>
                  <Button
                    onClick={() => {
                      setUploadType("product")
                      setUploadDialogOpen(true)
                    }}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Product
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="contests" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
