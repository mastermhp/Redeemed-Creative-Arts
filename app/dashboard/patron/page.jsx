"use client"

import { useState, useEffect } from "react"
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
import { useAuth } from "@/lib/hooks/useAuth"
import { dashboardApi, donationApi } from "@/lib/api"
import { toast } from "react-hot-toast"
import {
  Heart,
  DollarSign,
  Users,
  Gift,
  Star,
  Plus,
  Eye,
  Target,
  Award,
  ThumbsUp,
  Crown,
  Shield,
  Zap,
  ShoppingCart,
  Loader2,
  AlertTriangle,
} from "lucide-react"

export default function PatronDashboard() {
  const { user: authUser, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})
  const [donations, setDonations] = useState([])
  const [supportedArtists, setSupportedArtists] = useState([])
  const [campaigns, setCampaigns] = useState([])

  const [donationDialog, setDonationDialog] = useState(false)
  const [giftPointsDialog, setGiftPointsDialog] = useState(false)
  const [newDonation, setNewDonation] = useState({
    recipientId: "",
    amount: "",
    message: "",
    isAnonymous: false,
  })

  // Fetch dashboard data
  useEffect(() => {
    if (authUser && authUser.userType === "patron") {
      fetchDashboardData()
    }
  }, [authUser])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch all dashboard data in parallel
      const [statsData, donationsData, artistsData, campaignsData] = await Promise.all([
        dashboardApi.getPatronStats(authUser.id),
        dashboardApi.getPatronDonations(authUser.id),
        dashboardApi.getSupportedArtists(authUser.id),
        dashboardApi.getActiveCampaigns(),
      ])

      setStats(statsData)
      setDonations(donationsData.donations || [])
      setSupportedArtists(artistsData.supportedArtists || [])
      setCampaigns(campaignsData.campaigns || [])
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleDonate = (campaignId) => {
    setDonationDialog(true)
  }

  const handleSubmitDonation = async (e) => {
    e.preventDefault()
    try {
      await donationApi.makeDonation(newDonation)

      setDonationDialog(false)
      setNewDonation({
        recipientId: "",
        amount: "",
        message: "",
        isAnonymous: false,
      })

      toast.success("Donation submitted successfully!")
      fetchDashboardData() // Refresh data
    } catch (error) {
      console.error("Donation error:", error)
      toast.error("Failed to process donation")
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-6 my-32">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!authUser || authUser.userType !== "patron") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-6 my-32">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <p>Access denied. Patron account required.</p>
          </div>
        </div>
      </div>
    )
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
              <p className="text-emerald-100 text-lg">Welcome back, {stats.userInfo?.name || authUser.name}! 💝</p>
              <div className="flex items-center gap-4 mt-4">
                {getTierBadge(stats.userInfo?.tier)}
                <div
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${getLevelColor(stats.userInfo?.points?.level)} text-white font-bold`}
                >
                  <Award className="h-4 w-4 inline mr-2" />
                  {stats.userInfo?.points?.current?.toLocaleString() || 0} pts
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Heart className="h-3 w-3 mr-1" />
                  Impact Score: {stats.impactScore || 0}%
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => handleDonate()}
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
                      <p className="text-3xl font-bold">${stats.totalDonated || 0}</p>
                      <p className="text-emerald-100 text-xs">+${stats.currentMonthDonated || 0} this month</p>
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
                      <p className="text-3xl font-bold">{stats.artistsSupported || 0}</p>
                      <p className="text-blue-100 text-xs">Unique artists helped</p>
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
                      <p className="text-purple-100 text-sm font-medium">Campaigns Supported</p>
                      <p className="text-3xl font-bold">{stats.campaignsSupported || 0}</p>
                      <p className="text-purple-100 text-xs">Active campaigns</p>
                    </div>
                    <Target className="h-8 w-8 text-purple-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Impact Score</p>
                      <p className="text-3xl font-bold">{stats.impactScore || 0}%</p>
                      <p className="text-orange-100 text-xs">Community impact</p>
                    </div>
                    <Heart className="h-8 w-8 text-orange-200" />
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
                      ${stats.currentMonthDonated || 0} / ${stats.monthlyGoal || 500}
                    </span>
                  </div>
                  <Progress
                    value={((stats.currentMonthDonated || 0) / (stats.monthlyGoal || 500)) * 100}
                    className="h-3"
                  />
                  <p className="text-sm text-green-600">
                    ${(stats.monthlyGoal || 500) - (stats.currentMonthDonated || 0)} remaining to reach your goal
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Donation History
              </h2>
              <Button
                onClick={() => handleDonate()}
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

            {donations.length === 0 && (
              <div className="text-center py-12">
                <Gift className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No Donations Yet</h3>
                <p className="text-gray-500 mb-4">Start supporting artists and making an impact!</p>
                <Button onClick={() => handleDonate()}>
                  <Gift className="h-4 w-4 mr-2" />
                  Make Your First Donation
                </Button>
              </div>
            )}
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
                          {getTierBadge(artist.tier)}
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
                        onClick={() => handleDonate()}
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

            {supportedArtists.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No Artists Supported Yet</h3>
                <p className="text-gray-500 mb-4">Start supporting talented Christian artists!</p>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Discover Artists
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Other tabs with placeholder content */}
          <TabsContent value="voting" className="space-y-6">
            <div className="text-center py-12">
              <ThumbsUp className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No Active Contests</h3>
              <p className="text-gray-500">Check back later for artwork voting opportunities!</p>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Active Campaigns
              </h2>
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

            {campaigns.length === 0 && (
              <div className="text-center py-12">
                <Target className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No Active Campaigns</h3>
                <p className="text-gray-500">Check back later for fundraising opportunities!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="shop" className="space-y-6">
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Shop Coming Soon</h3>
              <p className="text-gray-500">Browse and purchase artwork, prints, and Christian art supplies!</p>
            </div>
          </TabsContent>

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
                      <Input id="name" defaultValue={stats.userInfo?.name || authUser.name} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={stats.userInfo?.email || authUser.email} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="monthlyGoal">Monthly Giving Goal</Label>
                    <Input id="monthlyGoal" type="number" defaultValue={stats.monthlyGoal || 500} />
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
            <form onSubmit={handleSubmitDonation} className="space-y-4">
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
                  min="1"
                  step="0.01"
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
      </div>
    </div>
  )
}
