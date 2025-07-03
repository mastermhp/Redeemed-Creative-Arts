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
import { useAuth } from "@/lib/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useToast } from "@/lib/hooks/use-toast"
import {
  Heart,
  Star,
  Gift,
  MessageCircle,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  Loader2,
  AlertTriangle,
  Plus,
  Eye,
  Settings,
  Target,
  Zap,
} from "lucide-react"

export default function PatronDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [stats, setStats] = useState({
    overview: {
      totalDonations: 0,
      artistsSupported: 0,
      pointsGifted: 0,
      commentsPosted: 0,
      votesSubmitted: 0,
      currentPoints: 0,
      totalPoints: 0,
    },
    engagement: {
      monthlyDonations: 0,
      monthlyComments: 0,
      monthlyVotes: 0,
      engagementScore: 0,
      rewardStreak: 0,
    },
    rewards: {
      available: 0,
      claimed: 0,
      totalPoints: 0,
    },
  })

  const [donations, setDonations] = useState([])
  const [supportedArtists, setSupportedArtists] = useState([])
  const [engagementRewards, setEngagementRewards] = useState([])
  const [helperAvailability, setHelperAvailability] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Dialog states
  const [giftPointsDialog, setGiftPointsDialog] = useState(false)
  const [donateDialog, setDonateDialog] = useState(false)
  const [helperDialog, setHelperDialog] = useState(false)

  // Form states
  const [giftForm, setGiftForm] = useState({
    recipientId: "",
    amount: "",
    message: "",
  })

  const [donationForm, setDonationForm] = useState({
    artistId: "",
    amount: "",
    message: "",
    isAnonymous: false,
  })

  const [helperForm, setHelperForm] = useState({
    isAvailable: false,
    skills: [],
    hourlyRate: "",
    availability: {
      monday: { available: false, hours: "" },
      tuesday: { available: false, hours: "" },
      wednesday: { available: false, hours: "" },
      thursday: { available: false, hours: "" },
      friday: { available: false, hours: "" },
      saturday: { available: false, hours: "" },
      sunday: { available: false, hours: "" },
    },
  })

  const [submitting, setSubmitting] = useState(false)

  // Check authentication and user type
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login")
        return
      }
      if (user.userType !== "patron") {
        router.push("/dashboard")
        return
      }
      fetchDashboardData()
    }
  }, [user, authLoading, router])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch patron stats
      const statsResponse = await fetch("/api/dashboard/patron/stats", {
        credentials: "include",
      })
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch donations
      const donationsResponse = await fetch("/api/dashboard/patron/donations", {
        credentials: "include",
      })
      if (donationsResponse.ok) {
        const donationsData = await donationsResponse.json()
        setDonations(donationsData.donations || [])
      }

      // Fetch supported artists
      const artistsResponse = await fetch("/api/dashboard/patron/supported-artists", {
        credentials: "include",
      })
      if (artistsResponse.ok) {
        const artistsData = await artistsResponse.json()
        setSupportedArtists(artistsData.artists || [])
      }

      // Fetch engagement rewards
      const rewardsResponse = await fetch("/api/engagement/rewards", {
        credentials: "include",
      })
      if (rewardsResponse.ok) {
        const rewardsData = await rewardsResponse.json()
        setEngagementRewards(rewardsData.rewards || [])
      }

      // Fetch helper availability
      const helperResponse = await fetch("/api/helpers/availability", {
        credentials: "include",
      })
      if (helperResponse.ok) {
        const helperData = await helperResponse.json()
        setHelperAvailability(helperData.helper)
        if (helperData.helper) {
          setHelperForm({
            isAvailable: helperData.helper.isAvailable,
            skills: helperData.helper.skills || [],
            hourlyRate: helperData.helper.hourlyRate || "",
            availability: helperData.helper.availability || helperForm.availability,
          })
        }
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

  const handleGiftPoints = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/points/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(giftForm),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Points gifted successfully!",
        })
        setGiftPointsDialog(false)
        setGiftForm({ recipientId: "", amount: "", message: "" })
        fetchDashboardData()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to gift points")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDonate = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(donationForm),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Donation submitted successfully!",
        })
        setDonateDialog(false)
        setDonationForm({ artistId: "", amount: "", message: "", isAnonymous: false })
        fetchDashboardData()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit donation")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateHelperAvailability = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/helpers/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(helperForm),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Helper availability updated successfully!",
        })
        setHelperDialog(false)
        fetchDashboardData()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to update availability")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const claimRewards = async (rewardIds) => {
    try {
      const response = await fetch("/api/engagement/rewards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ rewardIds }),
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Success",
          description: `Claimed ${result.pointsEarned} points from ${result.claimedRewards} rewards!`,
        })
        fetchDashboardData()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to claim rewards")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-lg text-gray-600">Loading your patron dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || user.userType !== "patron") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Access denied. Patron account required.</p>
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
              Patron Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Support artists and engage with the creative community</p>
          </div>
          <div className="flex space-x-3">
            <Dialog open={donateDialog} onOpenChange={setDonateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make a Donation</DialogTitle>
                  <DialogDescription>Support an artist with your contribution</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleDonate} className="space-y-4">
                  <div>
                    <Label htmlFor="artistId">Select Artist</Label>
                    <Select
                      value={donationForm.artistId}
                      onValueChange={(value) => setDonationForm((prev) => ({ ...prev, artistId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an artist to support" />
                      </SelectTrigger>
                      <SelectContent>
                        {supportedArtists.map((artist) => (
                          <SelectItem key={artist.id} value={artist.id}>
                            {artist.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={donationForm.amount}
                      onChange={(e) => setDonationForm((prev) => ({ ...prev, amount: e.target.value }))}
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={donationForm.message}
                      onChange={(e) => setDonationForm((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Leave an encouraging message..."
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isAnonymous"
                      checked={donationForm.isAnonymous}
                      onChange={(e) => setDonationForm((prev) => ({ ...prev, isAnonymous: e.target.checked }))}
                    />
                    <Label htmlFor="isAnonymous">Make this donation anonymous</Label>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setDonateDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Heart className="w-4 h-4 mr-2" />
                      )}
                      Donate
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={giftPointsDialog} onOpenChange={setGiftPointsDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/50 hover:bg-white/80 border-white/30">
                  <Gift className="w-5 h-5 mr-2" />
                  Gift Points
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Gift Points to Artist</DialogTitle>
                  <DialogDescription>Share your points to encourage and support artists</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleGiftPoints} className="space-y-4">
                  <div>
                    <Label htmlFor="recipientId">Select Artist</Label>
                    <Select
                      value={giftForm.recipientId}
                      onValueChange={(value) => setGiftForm((prev) => ({ ...prev, recipientId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an artist" />
                      </SelectTrigger>
                      <SelectContent>
                        {supportedArtists.map((artist) => (
                          <SelectItem key={artist.id} value={artist.id}>
                            {artist.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount">Points Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={giftForm.amount}
                      onChange={(e) => setGiftForm((prev) => ({ ...prev, amount: e.target.value }))}
                      placeholder="0"
                      min="1"
                      max="1000"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">Available: {stats.overview.currentPoints} points</p>
                  </div>
                  <div>
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={giftForm.message}
                      onChange={(e) => setGiftForm((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Add a personal message..."
                      rows={3}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setGiftPointsDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Gift className="w-4 h-4 mr-2" />
                      )}
                      Gift Points
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Total Donations</CardTitle>
              <DollarSign className="h-5 w-5 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${(stats.overview?.totalDonations || 0).toLocaleString()}</div>
              <p className="text-xs text-green-200">{stats.overview?.artistsSupported || 0} artists supported</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Points Gifted</CardTitle>
              <Gift className="h-5 w-5 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{(stats.overview?.pointsGifted || 0).toLocaleString()}</div>
              <p className="text-xs text-purple-200">{stats.overview?.currentPoints || 0} available</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Engagement</CardTitle>
              <MessageCircle className="h-5 w-5 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {(stats.overview?.commentsPosted || 0) + (stats.overview?.votesSubmitted || 0)}
              </div>
              <p className="text-xs text-blue-200">
                {stats.overview?.commentsPosted || 0} comments, {stats.overview?.votesSubmitted || 0} votes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Reward Points</CardTitle>
              <Star className="h-5 w-5 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.rewards?.available || 0}</div>
              <p className="text-xs text-orange-200">{stats.rewards?.totalPoints || 0} total earned</p>
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
            <TabsTrigger value="donations" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Heart className="w-4 h-4 mr-2" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <MessageCircle className="w-4 h-4 mr-2" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Award className="w-4 h-4 mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="artists" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Users className="w-4 h-4 mr-2" />
              Artists
            </TabsTrigger>
            <TabsTrigger value="helper" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Settings className="w-4 h-4 mr-2" />
              Helper
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Monthly Impact</CardTitle>
                  <CardDescription>Your contribution this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Donations</span>
                      <span>${stats.engagement?.monthlyDonations || 0}</span>
                    </div>
                    <Progress
                      value={Math.min(((stats.engagement?.monthlyDonations || 0) / 500) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Comments</span>
                      <span>{stats.engagement?.monthlyComments || 0}</span>
                    </div>
                    <Progress
                      value={Math.min(((stats.engagement?.monthlyComments || 0) / 50) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Votes</span>
                      <span>{stats.engagement?.monthlyVotes || 0}</span>
                    </div>
                    <Progress
                      value={Math.min(((stats.engagement?.monthlyVotes || 0) / 100) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Engagement Score</CardTitle>
                  <CardDescription>Your community involvement level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {stats.engagement?.engagementScore || 0}
                    </div>
                    <p className="text-gray-600 mb-4">Community Impact Score</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Reward Streak</span>
                        <span>{stats.engagement?.rewardStreak || 0} days</span>
                      </div>
                      <Progress
                        value={Math.min(((stats.engagement?.rewardStreak || 0) / 30) * 100, 100)}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                <CardDescription>Your latest contributions and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations.slice(0, 5).map((donation, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-white/50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Donated ${donation.amount}</h4>
                        <p className="text-sm text-gray-600">
                          to {donation.artistName} • {donation.createdAt}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                    </div>
                  ))}
                  {donations.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No recent activity. Start supporting artists to see updates here!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation) => (
                <Card key={donation.id} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">${donation.amount}</CardTitle>
                        <CardDescription>to {donation.artistName}</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">{donation.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {donation.message && <p className="text-sm text-gray-600 mb-3 italic">"{donation.message}"</p>}
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{donation.createdAt}</span>
                      <span>{donation.isAnonymous ? "Anonymous" : "Public"}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {donations.length === 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No donations yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start supporting artists to make a difference in their creative journey
                  </p>
                  <Button
                    onClick={() => setDonateDialog(true)}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Make Your First Donation
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Comment Activity</CardTitle>
                  <CardDescription>Your artwork interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Comments</span>
                      <Badge variant="outline">{stats.overview?.commentsPosted || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <Badge variant="outline">{stats.engagement?.monthlyComments || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average per Week</span>
                      <Badge variant="outline">{Math.round((stats.engagement?.monthlyComments || 0) / 4)}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Voting Activity</CardTitle>
                  <CardDescription>Your artwork ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Votes</span>
                      <Badge variant="outline">{stats.overview?.votesSubmitted || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <Badge variant="outline">{stats.engagement?.monthlyVotes || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Rating</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>4.2</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Engagement Goals</CardTitle>
                <CardDescription>Track your community involvement progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(((stats.engagement?.monthlyComments || 0) / 20) * 100)}%
                    </div>
                    <div className="text-sm text-blue-600">Monthly Comments</div>
                    <div className="text-xs text-gray-500 mt-1">Goal: 20 comments</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(((stats.engagement?.monthlyVotes || 0) / 50) * 100)}%
                    </div>
                    <div className="text-sm text-purple-600">Monthly Votes</div>
                    <div className="text-xs text-gray-500 mt-1">Goal: 50 votes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{stats.engagement?.rewardStreak || 0}</div>
                    <div className="text-sm text-green-600">Day Streak</div>
                    <div className="text-xs text-gray-500 mt-1">Keep it up!</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-bold">Engagement Rewards</CardTitle>
                    <CardDescription>Earn points for your community participation</CardDescription>
                  </div>
                  {engagementRewards.filter((r) => !r.claimed).length > 0 && (
                    <Button
                      onClick={() => claimRewards(engagementRewards.filter((r) => !r.claimed).map((r) => r._id))}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Claim All ({engagementRewards.filter((r) => !r.claimed).length})
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engagementRewards.map((reward) => (
                    <div
                      key={reward._id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        reward.claimed
                          ? "bg-gray-50 border-gray-200"
                          : "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            reward.claimed ? "bg-gray-300" : "bg-gradient-to-r from-orange-400 to-yellow-400"
                          }`}
                        >
                          <Award className={`w-5 h-5 ${reward.claimed ? "text-gray-600" : "text-white"}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{reward.description}</h4>
                          <p className="text-sm text-gray-600">
                            {reward.points} points • {new Date(reward.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        {reward.claimed ? (
                          <Badge className="bg-gray-100 text-gray-600 border-gray-200">Claimed</Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => claimRewards([reward._id])}
                            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                          >
                            Claim
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {engagementRewards.length === 0 && (
                    <div className="text-center py-8">
                      <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No rewards yet</h3>
                      <p className="text-gray-600">Start engaging with the community to earn rewards!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="artists" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportedArtists.map((artist) => (
                <Card key={artist.id} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                        {artist.profileImage ? (
                          <img
                            src={artist.profileImage || "/placeholder.svg"}
                            alt={artist.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <Users className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{artist.name}</CardTitle>
                        <CardDescription>{artist.specialty || "Artist"}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Total Supported:</span>
                        <span className="font-medium">${artist.totalSupported || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Artworks:</span>
                        <span>{artist.artworkCount || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Donation:</span>
                        <span>{artist.lastDonation || "Never"}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                        onClick={() => {
                          setDonationForm((prev) => ({ ...prev, artistId: artist.id }))
                          setDonateDialog(true)
                        }}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        Donate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                        onClick={() => {
                          setGiftForm((prev) => ({ ...prev, recipientId: artist.id }))
                          setGiftPointsDialog(true)
                        }}
                      >
                        <Gift className="w-4 h-4 mr-1" />
                        Gift
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {supportedArtists.length === 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No artists supported yet</h3>
                  <p className="text-gray-600 mb-6">Discover and support talented Christian artists</p>
                  <Button
                    onClick={() => router.push("/artist-gallery")}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Browse Artists
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="helper" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-bold">Helper Availability</CardTitle>
                    <CardDescription>Manage your availability to help churches and events</CardDescription>
                  </div>
                  <Dialog open={helperDialog} onOpenChange={setHelperDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-white/50 hover:bg-white/80 border-white/30">
                        <Settings className="w-4 h-4 mr-2" />
                        Update Availability
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Update Helper Availability</DialogTitle>
                        <DialogDescription>Set your availability and skills to help churches</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateHelperAvailability} className="space-y-6">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isAvailable"
                            checked={helperForm.isAvailable}
                            onChange={(e) => setHelperForm((prev) => ({ ...prev, isAvailable: e.target.checked }))}
                          />
                          <Label htmlFor="isAvailable">I am available to help</Label>
                        </div>

                        <div>
                          <Label htmlFor="skills">Skills (comma-separated)</Label>
                          <Input
                            id="skills"
                            value={helperForm.skills.join(", ")}
                            onChange={(e) =>
                              setHelperForm((prev) => ({
                                ...prev,
                                skills: e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter((s) => s),
                              }))
                            }
                            placeholder="e.g., Photography, Event Setup, Audio/Visual, Decoration"
                          />
                        </div>

                        <div>
                          <Label htmlFor="hourlyRate">Hourly Rate ($ - optional)</Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            value={helperForm.hourlyRate}
                            onChange={(e) => setHelperForm((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>

                        <div>
                          <Label>Weekly Availability</Label>
                          <div className="space-y-3 mt-2">
                            {Object.entries(helperForm.availability).map(([day, dayData]) => (
                              <div key={day} className="flex items-center space-x-4">
                                <div className="w-24">
                                  <input
                                    type="checkbox"
                                    id={`${day}-available`}
                                    checked={dayData.available}
                                    onChange={(e) =>
                                      setHelperForm((prev) => ({
                                        ...prev,
                                        availability: {
                                          ...prev.availability,
                                          [day]: { ...dayData, available: e.target.checked },
                                        },
                                      }))
                                    }
                                    className="mr-2"
                                  />
                                  <Label htmlFor={`${day}-available`} className="capitalize">
                                    {day}
                                  </Label>
                                </div>
                                {dayData.available && (
                                  <Input
                                    placeholder="e.g., 9:00 AM - 5:00 PM"
                                    value={dayData.hours}
                                    onChange={(e) =>
                                      setHelperForm((prev) => ({
                                        ...prev,
                                        availability: {
                                          ...prev.availability,
                                          [day]: { ...dayData, hours: e.target.value },
                                        },
                                      }))
                                    }
                                    className="flex-1"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setHelperDialog(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={submitting}>
                            {submitting ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Settings className="w-4 h-4 mr-2" />
                            )}
                            Update Availability
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {helperAvailability ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <Badge
                        className={
                          helperAvailability.isAvailable
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }
                      >
                        {helperAvailability.isAvailable ? "Available" : "Not Available"}
                      </Badge>
                    </div>

                    {helperAvailability.skills && helperAvailability.skills.length > 0 && (
                      <div>
                        <span className="font-medium">Skills:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {helperAvailability.skills.map((skill, index) => (
                            <Badge key={index} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {helperAvailability.hourlyRate && (
                      <div className="flex items-center justify-between">
                        <span>Hourly Rate:</span>
                        <span className="font-medium">${helperAvailability.hourlyRate}/hour</span>
                      </div>
                    )}

                    <div>
                      <span className="font-medium">Weekly Schedule:</span>
                      <div className="mt-2 space-y-1">
                        {Object.entries(helperAvailability.availability || {}).map(([day, dayData]) => (
                          <div key={day} className="flex justify-between text-sm">
                            <span className="capitalize">{day}:</span>
                            <span>{dayData.available ? dayData.hours || "Available" : "Not Available"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Helper Profile Not Set</h3>
                    <p className="text-gray-600 mb-6">
                      Set up your helper profile to assist churches with their events
                    </p>
                    <Button
                      onClick={() => setHelperDialog(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Set Up Helper Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
