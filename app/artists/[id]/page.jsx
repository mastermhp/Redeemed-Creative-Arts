"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { useAuth } from "@/lib/hooks/useAuth"
import { useParams, useRouter } from "next/navigation"
import {
  Heart,
  MessageSquare,
  Share2,
  Eye,
  MapPin,
  Calendar,
  Star,
  Crown,
  Users,
  ImageIcon,
  FileText,
  Play,
  Palette,
  Camera,
  Loader2,
  AlertTriangle,
  Send,
  Gift,
  Handshake,
  Instagram,
  Twitter,
  Facebook,
  Globe,
  Plus,
  Settings,
  ArrowUp,
  TrendingUp,
  Award,
  Bookmark,
  MoreHorizontal,
  Lock,
  Unlock,
  Save,
} from "lucide-react"
import { useToast } from "@/lib/hooks/use-toast"

export default function ArtistProfilePage() {
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [artist, setArtist] = useState(null)
  const [content, setContent] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("posts")
  const [messageDialogOpen, setMessageDialogOpen] = useState(false)
  const [tipDialogOpen, setTipDialogOpen] = useState(false)
  const [commissionDialogOpen, setCommissionDialogOpen] = useState(false)
  const [postDialogOpen, setPostDialogOpen] = useState(false)
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const [message, setMessage] = useState("")
  const [tipAmount, setTipAmount] = useState("")
  const [tipMessage, setTipMessage] = useState("")
  const [isAnonymousTip, setIsAnonymousTip] = useState(false)
  const [commissionDetails, setCommissionDetails] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  })

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    visibility: "public",
    images: [],
    postType: "text", // text, art, video, sculpt, digital, photo
  })

  const [editProfile, setEditProfile] = useState({
    name: "",
    bio: "",
    location: {
      city: "",
      state: "",
      country: "",
    },
    socialLinks: {
      instagram: "",
      twitter: "",
      facebook: "",
      website: "",
    },
    profileImage: null,
    coverImage: null,
  })

  const [sending, setSending] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Post type options
  const postTypes = [
    { value: "text", label: "Text Post", icon: FileText },
    { value: "art", label: "Art", icon: Palette },
    { value: "video", label: "Video", icon: Play },
    { value: "sculpt", label: "Sculpture", icon: Star },
    { value: "digital", label: "Digital Art", icon: ImageIcon },
    { value: "photo", label: "Photography", icon: Camera },
  ]

  useEffect(() => {
    if (params.id) {
      fetchArtistProfile()
    }
  }, [params.id, activeTab])

  useEffect(() => {
    if (artist && user && user._id === artist.id) {
      setEditProfile({
        name: artist.name || "",
        bio: artist.bio || "",
        location: {
          city: artist.location?.city || "",
          state: artist.location?.state || "",
          country: artist.location?.country || "",
        },
        socialLinks: {
          instagram: artist.socialLinks?.instagram || "",
          twitter: artist.socialLinks?.twitter || "",
          facebook: artist.socialLinks?.facebook || "",
          website: artist.socialLinks?.website || "",
        },
        profileImage: null,
        coverImage: null,
      })
    }
  }, [artist, user])

  const fetchArtistProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/artists/${params.id}?tab=${activeTab}`, {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setArtist(data.artist)
        setContent(data.content)
        setPosts(data.posts || [])
        setIsFollowing(data.isFollowing || false)
      } else {
        throw new Error("Failed to fetch artist profile")
      }
    } catch (error) {
      console.error("Error fetching artist profile:", error)
      toast({
        title: "Error",
        description: "Failed to load artist profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to follow artists",
        variant: "destructive",
      })
      return
    }

    try {
      setFollowLoading(true)
      const response = await fetch(`/api/artists/${params.id}/follow`, {
        method: isFollowing ? "DELETE" : "POST",
        credentials: "include",
      })

      if (response.ok) {
        setIsFollowing(!isFollowing)
        toast({
          title: isFollowing ? "Unfollowed" : "Following",
          description: `You are now ${isFollowing ? "no longer following" : "following"} ${artist.name}`,
        })
      }
    } catch (error) {
      console.error("Follow error:", error)
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive",
      })
    } finally {
      setFollowLoading(false)
    }
  }

  const handleUpvoteArtwork = async (artworkId) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to upvote artworks",
        variant: "destructive",
      })
      return
    }

    if (user.userType !== "artist") {
      toast({
        title: "Artists Only",
        description: "Only artists can upvote other artists' work",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/artworks/${artworkId}/upvote`, {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        toast({
          title: "Upvoted!",
          description: "You've helped boost this artist's visibility",
        })
        fetchArtistProfile()
      }
    } catch (error) {
      console.error("Upvote error:", error)
      toast({
        title: "Error",
        description: "Failed to upvote artwork",
        variant: "destructive",
      })
    }
  }

  const handleLikeContent = async (contentId, type) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to like content",
        variant: "destructive",
      })
      return
    }

    try {
      const endpoint = type === "post" ? `/api/posts/${contentId}/like` : `/api/artworks/${contentId}/like`
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        fetchArtistProfile()
      }
    } catch (error) {
      console.error("Like error:", error)
    }
  }

  const handleCreatePost = async () => {
    if (!user || user._id !== artist.id) {
      toast({
        title: "Access Denied",
        description: "You can only post on your own profile",
        variant: "destructive",
      })
      return
    }

    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing Fields",
        description: "Please fill in title and content",
        variant: "destructive",
      })
      return
    }

    try {
      setSending(true)
      const formData = new FormData()
      formData.append("title", newPost.title)
      formData.append("content", newPost.content)
      formData.append("visibility", newPost.visibility)
      formData.append("postType", newPost.postType)
      newPost.images.forEach((image) => {
        formData.append("images", image)
      })

      const response = await fetch("/api/dashboard/artist/posts", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Post Created",
          description: "Your post has been published successfully",
        })
        setPostDialogOpen(false)
        setNewPost({ title: "", content: "", visibility: "public", images: [], postType: "text" })
        fetchArtistProfile()
      }
    } catch (error) {
      console.error("Create post error:", error)
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const handleUpdateProfile = async () => {
    if (!user || user._id !== artist.id) {
      toast({
        title: "Access Denied",
        description: "You can only edit your own profile",
        variant: "destructive",
      })
      return
    }

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("name", editProfile.name)
      formData.append("bio", editProfile.bio)
      formData.append("location", JSON.stringify(editProfile.location))
      formData.append("socialLinks", JSON.stringify(editProfile.socialLinks))
      
      if (editProfile.profileImage) {
        formData.append("profileImage", editProfile.profileImage)
      }
      if (editProfile.coverImage) {
        formData.append("coverImage", editProfile.coverImage)
      }

      const response = await fetch("/api/dashboard/artist/profile", {
        method: "PUT",
        credentials: "include",
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully",
        })
        setEditProfileDialogOpen(false)
        fetchArtistProfile()
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      console.error("Update profile error:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to send messages",
        variant: "destructive",
      })
      return
    }

    if (user.userType === "patron" && artist.userType === "artist") {
      if (user.membership?.tier === "free") {
        toast({
          title: "Subscription Required",
          description: "Upgrade your subscription to message artists",
          variant: "destructive",
        })
        return
      }
    }

    if (!message.trim()) return

    try {
      setSending(true)
      const response = await fetch("/api/messages", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId: artist.id,
          content: message,
        }),
      })

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully",
        })
        setMessageDialogOpen(false)
        setMessage("")
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const handleSendTip = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to send tips",
        variant: "destructive",
      })
      return
    }

    if (!tipAmount || Number.parseFloat(tipAmount) <= 0) return

    try {
      setSending(true)
      const response = await fetch("/api/tips", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistId: artist.id,
          amount: Number.parseFloat(tipAmount),
          message: tipMessage,
          isAnonymous: isAnonymousTip,
        }),
      })

      if (response.ok) {
        toast({
          title: "Tip Sent",
          description: "Your tip has been sent successfully",
        })
        setTipDialogOpen(false)
        setTipAmount("")
        setTipMessage("")
        setIsAnonymousTip(false)
      } else {
        throw new Error("Failed to send tip")
      }
    } catch (error) {
      console.error("Error sending tip:", error)
      toast({
        title: "Error",
        description: "Failed to send tip",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const handleRequestCommission = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to request commissions",
        variant: "destructive",
      })
      return
    }

    if (!commissionDetails.title || !commissionDetails.description || !commissionDetails.budget) return

    try {
      setSending(true)
      const response = await fetch("/api/commissions", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistId: artist.id,
          ...commissionDetails,
          budget: Number.parseFloat(commissionDetails.budget),
        }),
      })

      if (response.ok) {
        toast({
          title: "Commission Requested",
          description: "Your commission request has been sent successfully",
        })
        setCommissionDialogOpen(false)
        setCommissionDetails({
          title: "",
          description: "",
          budget: "",
          deadline: "",
        })
      } else {
        throw new Error("Failed to request commission")
      }
    } catch (error) {
      console.error("Error requesting commission:", error)
      toast({
        title: "Error",
        description: "Failed to request commission",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const getSubscriptionBadge = (tier) => {
    switch (tier) {
      case "tier2":
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Crown className="w-3 h-3 mr-1" />
            Pro Artist
          </Badge>
        )
      case "tier1":
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <Star className="w-3 h-3 mr-1" />
            Artist Plus
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Users className="w-3 h-3 mr-1" />
            Community Artist
          </Badge>
        )
    }
  }

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return Instagram
      case "twitter":
        return Twitter
      case "facebook":
        return Facebook
      default:
        return Globe
    }
  }

  const getTabIcon = (tab) => {
    switch (tab) {
      case "posts":
        return FileText
      case "art":
        return Palette
      case "video":
        return Play
      case "sculpt":
        return Star
      case "digital":
        return ImageIcon
      case "photography":
        return Camera
      default:
        return ImageIcon
    }
  }

  const canViewContent = (visibility) => {
    if (visibility === "public") return true
    if (!user) return false
    if (user._id === artist.id) return true
    if (visibility === "patrons" && user.userType === "patron") return true
    if (visibility === "subscribers" && user.membership?.tier !== "free") return true
    return false
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-lg text-gray-600">Loading artist profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Artist not found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-32">
      <div className="container mx-auto p-6 space-y-8">
        {/* Artist Header */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl overflow-hidden">
          <div className="relative">
            {/* Custom Cover Image or Default Gradient */}
            <div
              className={`h-64 ${
                artist.coverImage
                  ? "bg-cover bg-center"
                  : artist.membershipTier !== "free"
                    ? "bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400"
                    : "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600"
              }`}
              style={artist.coverImage ? { backgroundImage: `url(${artist.coverImage})` } : {}}
            >
              {artist.membershipTier === "free" && (
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/80 text-gray-700">
                    Standard Theme
                  </Badge>
                </div>
              )}
            </div>

            {/* Profile Content */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={artist.profileImage || "/placeholder.svg"}
                    alt={artist.name}
                    className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2">{getSubscriptionBadge(artist.membershipTier)}</div>
                </div>

                {/* Artist Info */}
                <div className="flex-1 mt-4 md:mt-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-gray-900">{artist.name}</h1>
                    {artist.isVerified && (
                      <Badge className="bg-blue-500 text-white">
                        <Award className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  {artist.bio && <p className="text-gray-600 mb-4 max-w-2xl text-lg">{artist.bio}</p>}

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    {artist.location?.city && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {artist.location.city}, {artist.location.state || artist.location.country}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {new Date(artist.joinedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {artist.stats.followers || 0} followers
                    </div>
                  </div>

                  {/* Social Links */}
                  {artist.socialLinks && Object.keys(artist.socialLinks).length > 0 && (
                    <div className="flex items-center gap-3 mb-4">
                      {Object.entries(artist.socialLinks).map(([platform, url]) => {
                        const Icon = getSocialIcon(platform)
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Icon className="w-4 h-4 text-gray-600" />
                          </a>
                        )
                      })}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-8 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-gray-900 text-xl">{artist.stats.totalArtworks}</div>
                      <div className="text-gray-500">Artworks</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 text-xl">{artist.stats.totalViews.toLocaleString()}</div>
                      <div className="text-gray-500">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 text-xl">{artist.stats.totalLikes.toLocaleString()}</div>
                      <div className="text-gray-500">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 text-xl">{artist.stats.totalUpvotes || 0}</div>
                      <div className="text-gray-500">Artist Upvotes</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-4 md:mt-0">
                  {user && user._id === artist.id ? (
                    // Own profile - show edit and add post buttons
                    <>
                      <Dialog open={editProfileDialogOpen} onOpenChange={setEditProfileDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                            <Settings className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>Update your profile information and images</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Profile Image Upload */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">Profile Picture</h3>
                              <div className="flex items-center space-x-4">
                                <img
                                  src={artist.profileImage || "/placeholder.svg"}
                                  alt="Current profile"
                                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                />
                                <div className="flex-1">
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      setEditProfile((prev) => ({ ...prev, profileImage: e.target.files[0] }))
                                    }
                                    className="mb-2"
                                  />
                                  <p className="text-sm text-gray-500">Upload a new profile picture (JPG, PNG, max 5MB)</p>
                                </div>
                              </div>
                            </div>

                            {/* Cover Image Upload */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">Cover Image</h3>
                              <div className="space-y-4">
                                <div
                                  className={`h-32 rounded-lg ${
                                    artist.coverImage
                                      ? "bg-cover bg-center"
                                      : "bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400"
                                  }`}
                                  style={artist.coverImage ? { backgroundImage: `url(${artist.coverImage})` } : {}}
                                />
                                <div>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      setEditProfile((prev) => ({ ...prev, coverImage: e.target.files[0] }))
                                    }
                                    className="mb-2"
                                  />
                                  <p className="text-sm text-gray-500">Upload a new cover image (JPG, PNG, max 10MB)</p>
                                </div>
                              </div>
                            </div>

                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                  value={editProfile.name}
                                  onChange={(e) => setEditProfile((prev) => ({ ...prev, name: e.target.value }))}
                                  placeholder="Your name"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Bio</label>
                                <Textarea
                                  value={editProfile.bio}
                                  onChange={(e) => setEditProfile((prev) => ({ ...prev, bio: e.target.value }))}
                                  placeholder="Tell us about yourself..."
                                  rows={3}
                                />
                              </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">Location</h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <label className="text-sm font-medium">City</label>
                                  <Input
                                    value={editProfile.location.city}
                                    onChange={(e) =>
                                      setEditProfile((prev) => ({
                                        ...prev,
                                        location: { ...prev.location, city: e.target.value },
                                      }))
                                    }
                                    placeholder="City"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">State</label>
                                  <Input
                                    value={editProfile.location.state}
                                    onChange={(e) =>
                                      setEditProfile((prev) => ({
                                        ...prev,
                                        location: { ...prev.location, state: e.target.value },
                                      }))
                                    }
                                    placeholder="State"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Country</label>
                                  <Input
                                    value={editProfile.location.country}
                                    onChange={(e) =>
                                      setEditProfile((prev) => ({
                                        ...prev,
                                        location: { ...prev.location, country: e.target.value },
                                      }))
                                    }
                                    placeholder="Country"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Social Links */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">Social Links</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Instagram</label>
                                  <Input
                                    value={editProfile.socialLinks.instagram}
                                    onChange={(e) =>
                                      setEditProfile((prev) => ({
                                        ...prev,
                                        socialLinks: { ...prev.socialLinks, instagram: e.target.value },
                                      }))
                                    }
                                    placeholder="https://instagram.com/username"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Twitter</label>
                                  <Input
                                    value={editProfile.socialLinks.twitter}
                                    onChange={(e) =>
                                      setEditProfile((prev) => ({
                                        ...prev,
                                        socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                                      }))
                                    }
                                    placeholder="https://twitter.com/username"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Facebook</label>
                                  <Input
                                    value={editProfile.socialLinks.facebook}
                                    onChange={(e) =>
                                      setEditProfile((prev) => ({
                                        ...prev,
                                        socialLinks: { ...prev.socialLinks, facebook: e.target.value },
                                      }))
                                    }
                                    placeholder="https://facebook.com/username"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Website</label>
                                  <Input
                                    value={editProfile.socialLinks.website}
                                    onChange={(e) =>
                                      setEditProfile((prev) => ({
                                        ...prev,
                                        socialLinks: { ...prev.socialLinks, website: e.target.value },
                                      }))
                                    }
                                    placeholder="https://yourwebsite.com"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditProfileDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateProfile} disabled={uploading}>
                              {uploading ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Updating...
                                </>
                              ) : (
                                <>
                                  <Save className="w-4 h-4 mr-2" />
                                  Save Changes
                                </>
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="bg-white/50 border-white/30">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Post
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Create New Post</DialogTitle>
                            <DialogDescription>Share an update with your followers</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Post Type</label>
                              <Select value={newPost.postType} onValueChange={(value) => setNewPost((prev) => ({ ...prev, postType: value }))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select post type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {postTypes.map((type) => {
                                    const Icon = type.icon
                                    return (
                                      <SelectItem key={type.value} value={type.value}>
                                        <div className="flex items-center">
                                          <Icon className="w-4 h-4 mr-2" />
                                          {type.label}
                                        </div>
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Post Title</label>
                              <Input
                                value={newPost.title}
                                onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter post title"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Content</label>
                              <Textarea
                                value={newPost.content}
                                onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                                placeholder="What's on your mind?"
                                rows={4}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Visibility</label>
                              <Select value={newPost.visibility} onValueChange={(value) => setNewPost((prev) => ({ ...prev, visibility: value }))}>
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
                            <div>
                              <label className="text-sm font-medium">Images (Optional)</label>
                              <Input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) =>
                                  setNewPost((prev) => ({ ...prev, images: Array.from(e.target.files) }))
                                }
                              />
                              {newPost.images.length > 0 && (
                                <p className="text-sm text-gray-500 mt-1">{newPost.images.length} image(s) selected</p>
                              )}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setPostDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleCreatePost} disabled={sending}>
                              {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                              Publish Post
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : (
                    // Other artist's profile - show interaction buttons
                    <>
                      <Button
                        onClick={handleFollow}
                        disabled={followLoading}
                        className={`${
                          isFollowing
                            ? "bg-gray-600 hover:bg-gray-700"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        }`}
                      >
                        {followLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : isFollowing ? (
                          <Users className="w-4 h-4 mr-2" />
                        ) : (
                          <Plus className="w-4 h-4 mr-2" />
                        )}
                        {isFollowing ? "Following" : "Follow"}
                      </Button>

                      {user && (
                        <>
                          <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="bg-white/50 border-white/30">
                                <Send className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Send Message to {artist.name}</DialogTitle>
                                <DialogDescription>
                                  {user?.userType === "artist"
                                    ? "Connect with fellow artists and share your creative journey"
                                    : user?.userType === "patron"
                                      ? user.membership?.tier === "free"
                                        ? "Upgrade your subscription to message artists"
                                        : "Reach out to this talented artist"
                                      : "Send a message to this artist"}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  placeholder="Write your message..."
                                  rows={4}
                                  disabled={user?.userType === "patron" && user.membership?.tier === "free"}
                                />
                                {user?.userType === "patron" && user.membership?.tier === "free" && (
                                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-sm text-yellow-700">
                                      <Lock className="w-4 h-4 inline mr-1" />
                                      Upgrade your subscription to message artists directly
                                    </p>
                                  </div>
                                )}
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleSendMessage}
                                  disabled={
                                    sending ||
                                    !message.trim() ||
                                    (user?.userType === "patron" && user.membership?.tier === "free")
                                  }
                                >
                                  {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                  Send Message
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={tipDialogOpen} onOpenChange={setTipDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="bg-white/50 border-white/30">
                                <Gift className="w-4 h-4 mr-2" />
                                Send Tip
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Send Tip to {artist.name}</DialogTitle>
                                <DialogDescription>Show your appreciation for their amazing work</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Tip Amount ($)</label>
                                  <Input
                                    type="number"
                                    value={tipAmount}
                                    onChange={(e) => setTipAmount(e.target.value)}
                                    placeholder="5.00"
                                    min="1"
                                    step="0.01"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Message (Optional)</label>
                                  <Textarea
                                    value={tipMessage}
                                    onChange={(e) => setTipMessage(e.target.value)}
                                    placeholder="Your work inspires me..."
                                    rows={3}
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="anonymous-tip"
                                    checked={isAnonymousTip}
                                    onChange={(e) => setIsAnonymousTip(e.target.checked)}
                                    className="rounded border-gray-300"
                                  />
                                  <label htmlFor="anonymous-tip" className="text-sm">
                                    Send anonymously
                                  </label>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setTipDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleSendTip}
                                  disabled={sending || !tipAmount || Number.parseFloat(tipAmount) <= 0}
                                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                                >
                                  {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                  Send ${tipAmount || "0.00"}
                                </Button>
                              </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Dialog open={commissionDialogOpen} onOpenChange={setCommissionDialogOpen}>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="bg-white/50 border-white/30">
                                  <Handshake className="w-4 h-4 mr-2" />
                                  Commission
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Request Commission from {artist.name}</DialogTitle>
                                  <DialogDescription>
                                    Request a custom artwork or project from this talented artist
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-medium">Project Title *</label>
                                    <Input
                                      value={commissionDetails.title}
                                      onChange={(e) =>
                                        setCommissionDetails((prev) => ({ ...prev, title: e.target.value }))
                                      }
                                      placeholder="Custom Portrait, Logo Design, etc."
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Project Description *</label>
                                    <Textarea
                                      value={commissionDetails.description}
                                      onChange={(e) =>
                                        setCommissionDetails((prev) => ({ ...prev, description: e.target.value }))
                                      }
                                      placeholder="Describe your vision, style preferences, dimensions, etc."
                                      rows={4}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Budget ($) *</label>
                                      <Input
                                        type="number"
                                        value={commissionDetails.budget}
                                        onChange={(e) =>
                                          setCommissionDetails((prev) => ({ ...prev, budget: e.target.value }))
                                        }
                                        placeholder="100.00"
                                        min="1"
                                        step="0.01"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Deadline (Optional)</label>
                                      <Input
                                        type="date"
                                        value={commissionDetails.deadline}
                                        onChange={(e) =>
                                          setCommissionDetails((prev) => ({ ...prev, deadline: e.target.value }))
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setCommissionDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={handleRequestCommission}
                                    disabled={
                                      sending ||
                                      !commissionDetails.title ||
                                      !commissionDetails.description ||
                                      !commissionDetails.budget
                                    }
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                  >
                                    {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                    Send Request
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                      )}

                      <Button variant="outline" className="bg-white/50 border-white/30">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Content Tabs */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6 lg:grid-cols-7">
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Posts</span>
                </TabsTrigger>
                <TabsTrigger value="art" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Art</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  <span className="hidden sm:inline">Video</span>
                </TabsTrigger>
                <TabsTrigger value="sculpt" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span className="hidden sm:inline">Sculpt</span>
                </TabsTrigger>
                <TabsTrigger value="digital" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Digital</span>
                </TabsTrigger>
                <TabsTrigger value="photography" className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  <span className="hidden sm:inline">Photo</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            {/* Posts Tab Content */}
            {activeTab === "posts" && (
              <div className="space-y-6">
                {posts
                  .filter((post) => canViewContent(post.visibility))
                  .map((post) => (
                    <Card key={post.id} className="bg-white/50 backdrop-blur-sm border-white/20 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={artist.profileImage || "/placeholder.svg"}
                              alt={artist.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900">{artist.name}</h3>
                              <div className="flex items-center space-x-2">
                                <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                                {post.postType && post.postType !== "text" && (
                                  <Badge variant="outline" className="text-xs">
                                    {postTypes.find(t => t.value === post.postType)?.label || post.postType}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={`${
                                post.visibility === "public"
                                  ? "bg-green-100 text-green-800"
                                  : post.visibility === "patrons"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {post.visibility === "public" ? (
                                <Unlock className="w-3 h-3 mr-1" />
                              ) : (
                                <Lock className="w-3 h-3 mr-1" />
                              )}
                              {post.visibility}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

                        {post.images && post.images.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {post.images.map((image, index) => (
                              <img
                                key={index}
                                src={image.url || "/placeholder.svg"}
                                alt={`Post image ${index + 1}`}
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )}

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-6">
                            <button
                              onClick={() => handleLikeContent(post.id, "post")}
                              className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <Heart className="w-5 h-5" />
                              <span>{post.likesCount || 0}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                              <MessageSquare className="w-5 h-5" />
                              <span>{post.commentsCount || 0}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                              <Share2 className="w-5 h-5" />
                              <span>Share</span>
                            </button>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Bookmark className="w-5 h-5" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {posts.filter((post) => canViewContent(post.visibility)).length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No posts available</h3>
                    <p className="text-gray-600">
                      {user && user._id === artist.id
                        ? "Share your first post with your followers"
                        : "This artist hasn't shared any posts yet"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Artwork Tabs Content */}
            {activeTab !== "posts" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.map((item) => (
                  <Card
                    key={item.id}
                    className="bg-white/50 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0].url || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-gray-400" />
                        </div>
                      )}

                      {/* Artist Upvote Button (Only for other artists) */}
                      {user && user.userType === "artist" && user._id !== artist.id && (
                        <div className="absolute top-3 left-3">
                          <Button
                            size="sm"
                            onClick={() => handleUpvoteArtwork(item.id)}
                            className="bg-white/80 hover:bg-white text-gray-700 hover:text-purple-600 shadow-md"
                          >
                            <ArrowUp className="w-4 h-4 mr-1" />
                            <TrendingUp className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {/* Price Badge for Artworks */}
                      {item.type === "artwork" && item.isForSale && (
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-green-600 text-white border-0">${item.price}</Badge>
                        </div>
                      )}

                      {/* Upvote Count */}
                      {item.upvotes > 0 && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-purple-600 text-white border-0">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {item.upvotes}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-1">{item.title}</h3>
                      {item.type === "artwork" && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {item.views || 0}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {item.likes || 0}
                          </span>
                          {user && user.userType === "artist" && (
                            <span className="flex items-center">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              {item.upvotes || 0}
                            </span>
                          )}
                        </div>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleLikeContent(item.id, item.type)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.type === "artwork" && item.category && (
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {content.length === 0 && activeTab !== "posts" && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const Icon = getTabIcon(activeTab)
                    return <Icon className="w-8 h-8 text-gray-400" />
                  })()}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No {activeTab} found</h3>
                <p className="text-gray-600">
                  {user && user._id === artist.id
                    ? `Upload your first ${activeTab} artwork to get started`
                    : `This artist hasn't shared any ${activeTab} artworks yet`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}