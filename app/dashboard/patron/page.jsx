"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Heart,
  DollarSign,
  Users,
  Gift,
  Star,
  Plus,
  Eye,
  Bell,
  Target,
  Award,
  MessageCircle,
  ThumbsUp,
  Crown,
  Shield,
  Sparkles,
  Zap,
  ShoppingCart,
} from "lucide-react"

export default function PatronDashboard() {
  const [user, setUser] = useState({
    name: "David Thompson",
    email: "david@example.com",
    userType: "patron",
    tier: "tier2", // tier1 or tier2
    points: { current: 2450, total: 5680, level: "gold" },
    membership: { tier: "gold", subscriptionStatus: "active" },
    monthlyGoal: 500,
    currentMonthDonated: 320,
  })

  const [stats, setStats] = useState({
    totalDonated: 5420,
    artistsSupported: 12,
    campaignsSupported: 8,
    impactScore: 94,
    artworksLiked: 156,
    commentsPosted: 43,
    pointsGifted: 890,
    votescast: 67,
  })

  const [donations, setDonations] = useState([
    {
      id: 1,
      recipient: "Sarah Johnson",
      recipientType: "artist",
      amount: 150,
      campaign: "Easter Art Collection",
      date: "2024-01-20",
      status: "completed",
      matchingFunds: 75,
      impact: "Helped complete 3 artworks",
      artwork: "Divine Light Series",
    },
    {
      id: 2,
      recipient: "Grace Community Church",
      recipientType: "church",
      amount: 300,
      campaign: "Youth Art Program",
      date: "2024-01-15",
      status: "completed",
      matchingFunds: 150,
      impact: "Supported 15 young artists",
      artwork: "Community Mural Project",
    },
    {
      id: 3,
      recipient: "Michael Chen",
      recipientType: "artist",
      amount: 200,
      campaign: "Biblical Illustrations",
      date: "2024-01-10",
      status: "pending",
      matchingFunds: 100,
      impact: "In progress",
      artwork: "Parables Collection",
    },
  ])

  const [supportedArtists, setSupportedArtists] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Digital Art",
      totalSupported: 450,
      artworksCreated: 8,
      lastDonation: "2024-01-20",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4.9,
      tier: "tier2",
      recentWork: "Divine Light",
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "Traditional Painting",
      totalSupported: 350,
      artworksCreated: 5,
      lastDonation: "2024-01-10",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4.8,
      tier: "tier1",
      recentWork: "Sacred Geometry",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      specialty: "Sculpture",
      totalSupported: 280,
      artworksCreated: 3,
      lastDonation: "2024-01-05",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4.7,
      tier: "tier2",
      recentWork: "Angels Among Us",
    },
  ])

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Easter Celebration Art",
      organizer: "Faith Community Church",
      goal: 2000,
      raised: 1450,
      daysLeft: 15,
      supporters: 23,
      description: "Creating beautiful Easter artwork for our community celebration",
      image: "/placeholder.svg?height=100&width=150",
      matchingAvailable: true,
      matchRatio: 0.5,
    },
    {
      id: 2,
      title: "Youth Art Mentorship",
      organizer: "Creative Arts Ministry",
      goal: 1500,
      raised: 890,
      daysLeft: 22,
      supporters: 18,
      description: "Providing art supplies and mentorship for young artists",
      image: "/placeholder.svg?height=100&width=150",
      matchingAvailable: false,
      matchRatio: 0,
    },
  ])

  const [artworksToVote, setArtworksToVote] = useState([
    {
      id: 1,
      title: "Heavenly Light",
      artist: "Sarah Johnson",
      category: "Digital Art",
      image: "/placeholder.svg?height=200&width=300",
      votes: 45,
      hasVoted: false,
      contest: "Easter Celebration Contest",
    },
    {
      id: 2,
      title: "Sacred Path",
      artist: "Michael Chen",
      category: "Traditional",
      image: "/placeholder.svg?height=200&width=300",
      votes: 38,
      hasVoted: true,
      contest: "Spring Revival Contest",
    },
  ])

  const [donationDialog, setDonationDialog] = useState(false)
  const [giftPointsDialog, setGiftPointsDialog] = useState(false)
  const [newDonation, setNewDonation] = useState({
    recipientId: "",
    amount: "",
    message: "",
    isAnonymous: false,
  })

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

  const handleDonate = (campaignId) => {
    setDonationDialog(true)
  }

  const handleVote = (artworkId) => {
    setArtworksToVote((prev) =>
      prev.map((artwork) =>
        artwork.id === artworkId ? { ...artwork, hasVoted: true, votes: artwork.votes + 1 } : artwork,
      ),
    )
  }

  const handleGiftPoints = () => {
    setGiftPointsDialog(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-6 my-32">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Patron Dashboard</h1>
              <p className="text-emerald-100 text-lg">Welcome back, {user.name}! 💝</p>
              <div className="flex items-center gap-4 mt-4">
                {getTierBadge(user.tier)}
                <div
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${getLevelColor(user.points.level)} text-white font-bold`}
                >
                  <Award className="h-4 w-4 inline mr-2" />
                  {user.points.current.toLocaleString()} pts
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Heart className="h-3 w-3 mr-1" />
                  Impact Score: {stats.impactScore}%
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={handleDonate}
              >
                <Gift className="h-4 w-4 mr-2" />
                Make Donation
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
            <TabsTrigger value="donations" className="rounded-lg">
              Donations
            </TabsTrigger>
            <TabsTrigger value="artists" className="rounded-lg">
              My Artists
            </TabsTrigger>
            <TabsTrigger value="voting" className="rounded-lg">
              Vote & Comment
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="rounded-lg">
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="shop" className="rounded-lg">
              Shop
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-lg">
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium">Total Donated</p>
                      <p className="text-3xl font-bold">${stats.totalDonated}</p>
                      <p className="text-emerald-100 text-xs">+$320 this month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-emerald-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Artists Supported</p>
                      <p className="text-3xl font-bold">{stats.artistsSupported}</p>
                      <p className="text-blue-100 text-xs">+2 this month</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Engagement</p>
                      <p className="text-3xl font-bold">{stats.artworksLiked}</p>
                      <p className="text-purple-100 text-xs">{stats.commentsPosted} comments</p>
                    </div>
                    <Heart className="h-8 w-8 text-purple-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Impact Score</p>
                      <p className="text-3xl font-bold">{stats.impactScore}%</p>
                      <p className="text-orange-100 text-xs">+5% this month</p>
                    </div>
                    <Target className="h-8 w-8 text-orange-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Goal Progress */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Target className="h-5 w-5 mr-2" />
                  Monthly Giving Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      ${user.currentMonthDonated} / ${user.monthlyGoal}
                    </span>
                  </div>
                  <Progress value={(user.currentMonthDonated / user.monthlyGoal) * 100} className="h-3" />
                  <p className="text-sm text-green-600">
                    ${user.monthlyGoal - user.currentMonthDonated} remaining to reach your goal
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Impact & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                    Recent Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">3 artworks completed</p>
                      <p className="text-xs text-gray-500">From your Easter campaign support</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">15 youth artists helped</p>
                      <p className="text-xs text-gray-500">Through art program funding</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">2 churches beautified</p>
                      <p className="text-xs text-gray-500">With commissioned artwork</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100"
                      onClick={handleDonate}
                    >
                      <Gift className="h-6 w-6 mb-2 text-green-600" />
                      <span className="text-sm font-medium">Quick Donate</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100"
                      onClick={handleGiftPoints}
                    >
                      <Star className="h-6 w-6 mb-2 text-purple-600" />
                      <span className="text-sm font-medium">Gift Points</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100"
                    >
                      <ThumbsUp className="h-6 w-6 mb-2 text-blue-600" />
                      <span className="text-sm font-medium">Vote on Art</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:from-orange-100 hover:to-red-100"
                    >
                      <Users className="h-6 w-6 mb-2 text-orange-600" />
                      <span className="text-sm font-medium">Find Artists</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Donation History
              </h2>
              <Button
                onClick={handleDonate}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Donation
              </Button>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Matching</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Impact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {donation.recipient.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{donation.recipient}</p>
                              <p className="text-sm text-gray-500 capitalize">{donation.recipientType}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{donation.campaign}</p>
                            <p className="text-sm text-gray-500">{donation.artwork}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">${donation.amount}</TableCell>
                        <TableCell className="text-blue-600">+${donation.matchingFunds}</TableCell>
                        <TableCell>{donation.date}</TableCell>
                        <TableCell>
                          <Badge variant={donation.status === "completed" ? "default" : "secondary"}>
                            {donation.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm max-w-xs">{donation.impact}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Artists Tab */}
          <TabsContent value="artists" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Artists I Support
              </h2>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Discover Artists
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportedArtists.map((artist) => (
                <Card key={artist.id} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={artist.avatar || "/placeholder.svg"}
                        alt={artist.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold">{artist.name}</h3>
                        <p className="text-sm text-gray-600">{artist.specialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {artist.tier === "tier2" ? (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                              <Crown className="h-2 w-2 mr-1" />
                              Pro
                            </Badge>
                          ) : (
                            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">
                              <Shield className="h-2 w-2 mr-1" />
                              Basic
                            </Badge>
                          )}
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-xs">{artist.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Total Supported</p>
                        <p className="font-bold text-green-600">${artist.totalSupported}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Artworks Created</p>
                        <p className="font-bold">{artist.artworksCreated}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Recent Work:</p>
                      <p className="text-sm font-medium">{artist.recentWork}</p>
                      <p className="text-xs text-gray-500">Last donation: {artist.lastDonation}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Support
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-3 w-3 mr-1" />
                        View Work
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Voting & Comments Tab */}
          <TabsContent value="voting" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Vote & Comment on Artwork
              </h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-700">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {stats.votescast} votes cast
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {stats.commentsPosted} comments
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artworksToVote.map((artwork) => (
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
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/70 text-white">{artwork.contest}</Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/90 text-gray-800">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {artwork.votes}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{artwork.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {artwork.artist}</p>
                    <p className="text-xs text-gray-500 mb-4">{artwork.category}</p>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={artwork.hasVoted}
                        onClick={() => handleVote(artwork.id)}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {artwork.hasVoted ? "Voted" : "Vote"}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Active Campaigns
              </h2>
              <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent">
                <Target className="h-4 w-4 mr-2" />
                Browse All Campaigns
              </Button>
            </div>

            <div className="grid gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        className="w-32 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{campaign.title}</h3>
                            <p className="text-gray-600">by {campaign.organizer}</p>
                            {campaign.matchingAvailable && (
                              <Badge className="bg-green-100 text-green-700 mt-1">
                                <Zap className="h-3 w-3 mr-1" />
                                {campaign.matchRatio * 100}% Matching Available
                              </Badge>
                            )}
                          </div>
                          <Button
                            onClick={() => handleDonate(campaign.id)}
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                          >
                            <Gift className="h-4 w-4 mr-2" />
                            Donate
                          </Button>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">
                              ${campaign.raised} / ${campaign.goal}
                            </span>
                          </div>
                          <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{campaign.supporters} supporters</span>
                          <span>{campaign.daysLeft} days left</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Shop Tab */}
          <TabsContent value="shop" className="space-y-6">
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Shop Coming Soon</h3>
              <p className="text-gray-500">Browse and purchase artwork, prints, and Christian art supplies!</p>
              <Button className="mt-4 bg-transparent" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notify Me When Available
              </Button>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Patron Profile
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
                    <Label htmlFor="bio">About Me</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your passion for supporting Christian arts..."
                      defaultValue="Passionate supporter of Christian arts and community outreach..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="monthlyGoal">Monthly Giving Goal</Label>
                      <Input
                        id="monthlyGoal"
                        type="number"
                        defaultValue={user.monthlyGoal}
                        onChange={(e) => setUser((prev) => ({ ...prev, monthlyGoal: Number.parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="interests">Areas of Interest</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your interests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="youth">Youth Programs</SelectItem>
                          <SelectItem value="church">Church Beautification</SelectItem>
                          <SelectItem value="community">Community Outreach</SelectItem>
                          <SelectItem value="education">Art Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">Save Profile</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Donation Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-match Donations</p>
                      <p className="text-sm text-gray-500">Automatically match eligible donations</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Monthly Giving Reminders</p>
                      <p className="text-sm text-gray-500">Get reminded about your monthly goal</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Impact Reports</p>
                      <p className="text-sm text-gray-500">Receive monthly impact reports</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <Button className="w-full">Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Donation Dialog */}
        <Dialog open={donationDialog} onOpenChange={setDonationDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Gift className="h-5 w-5 mr-2 text-green-500" />
                Make a Donation
              </DialogTitle>
              <DialogDescription>Support an artist or campaign in their creative journey</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="recipient">Select Recipient</Label>
                <Select
                  value={newDonation.recipientId}
                  onValueChange={(value) => setNewDonation({ ...newDonation, recipientId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedArtists.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id.toString()}>
                        {artist.name} - {artist.specialty}
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
                  value={newDonation.amount}
                  onChange={(e) => setNewDonation({ ...newDonation, amount: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea
                  id="message"
                  value={newDonation.message}
                  onChange={(e) => setNewDonation({ ...newDonation, message: e.target.value })}
                  placeholder="Encouraging message for the artist"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={newDonation.isAnonymous}
                  onChange={(e) => setNewDonation({ ...newDonation, isAnonymous: e.target.checked })}
                />
                <Label htmlFor="anonymous">Make this donation anonymous</Label>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Donate
                </Button>
                <Button type="button" variant="outline" onClick={() => setDonationDialog(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Gift Points Dialog */}
        <Dialog open={giftPointsDialog} onOpenChange={setGiftPointsDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-purple-500" />
                Gift Points
              </DialogTitle>
              <DialogDescription>Share your points with artists to show appreciation</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="pointsRecipient">Select Artist</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedArtists.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id.toString()}>
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pointsAmount">Points to Gift</Label>
                <Input id="pointsAmount" type="number" placeholder="50" max={user.points.current} />
                <p className="text-xs text-gray-500 mt-1">You have {user.points.current} points available</p>
              </div>
              <div>
                <Label htmlFor="pointsMessage">Message</Label>
                <Textarea id="pointsMessage" placeholder="Great work on your latest piece!" />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Gift Points
                </Button>
                <Button type="button" variant="outline" onClick={() => setGiftPointsDialog(false)}>
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
