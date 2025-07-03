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
import toast from "react-hot-toast"
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  Plus,
  Edit,
  Bell,
  Target,
  DollarSign,
  TrendingUp,
  UserCheck,
  Crown,
  Shield,
  Award,
  Zap,
  Building,
  Heart,
  ShoppingCart,
  MessageCircle,
  ThumbsUp,
  Share,
  Eye,
} from "lucide-react"

export default function ChurchDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    upcomingEvents: 0,
    totalHelpers: 0,
    activeCampaigns: 0,
    totalRaised: 0,
    eventsThisMonth: 0,
    helpersBooked: 0,
    communityReach: 0,
    artworksCommissioned: 0,
  })

  const [events, setEvents] = useState([])
  const [helpers, setHelpers] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  const [createEventDialog, setCreateEventDialog] = useState(false)
  const [createCampaignDialog, setCreateCampaignDialog] = useState(false)
  const [bookHelperDialog, setBookHelperDialog] = useState(false)

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    helpersNeeded: 1,
    budget: "",
    skills: [],
    expectedAttendees: 100,
    category: "worship",
  })

  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    goal: "",
    category: "church-improvement",
  })

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch stats
      const statsResponse = await fetch("/api/dashboard/church/stats")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData.stats)
        setRecentActivity(statsData.recentActivity)
      }

      // Fetch events
      const eventsResponse = await fetch("/api/dashboard/church/events")
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json()
        setEvents(eventsData.events)
      }

      // Fetch helpers
      const helpersResponse = await fetch("/api/dashboard/church/helpers")
      if (helpersResponse.ok) {
        const helpersData = await helpersResponse.json()
        setHelpers(helpersData.helpers)
      }

      // Fetch campaigns
      const campaignsResponse = await fetch("/api/dashboard/church/campaigns")
      if (campaignsResponse.ok) {
        const campaignsData = await campaignsResponse.json()
        setCampaigns(campaignsData.campaigns)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/dashboard/church/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      })

      if (response.ok) {
        toast.success("Event created successfully!")
        setCreateEventDialog(false)
        setNewEvent({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          helpersNeeded: 1,
          budget: "",
          skills: [],
          expectedAttendees: 100,
          category: "worship",
        })
        fetchDashboardData()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to create event")
      }
    } catch (error) {
      console.error("Create event error:", error)
      toast.error("Failed to create event")
    }
  }

  const handleCreateCampaign = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/dashboard/church/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampaign),
      })

      if (response.ok) {
        toast.success("Campaign created successfully!")
        setCreateCampaignDialog(false)
        setNewCampaign({
          title: "",
          description: "",
          goal: "",
          category: "church-improvement",
        })
        fetchDashboardData()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to create campaign")
      }
    } catch (error) {
      console.error("Create campaign error:", error)
      toast.error("Failed to create campaign")
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 my-32">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 my-32">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Church Dashboard</h1>
              <p className="text-blue-100 text-lg">
                Welcome back, {user?.churchInfo?.organizationName || user?.name}! ⛪
              </p>
              <div className="flex items-center gap-4 mt-4">
                {getTierBadge(user?.membership?.tier || "tier1")}
                <div
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${getLevelColor(user?.points?.level)} text-white font-bold`}
                >
                  <Award className="h-4 w-4 inline mr-2" />
                  {user?.points?.current?.toLocaleString() || 0} pts
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Building className="h-3 w-3 mr-1" />
                  {user?.churchInfo?.size || "Small Church"}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => setCreateEventDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Event
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
            <TabsTrigger value="events" className="rounded-lg">
              Events
            </TabsTrigger>
            <TabsTrigger value="helpers" className="rounded-lg">
              Helpers
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="rounded-lg">
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="community" className="rounded-lg">
              Community
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
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Upcoming Events</p>
                      <p className="text-3xl font-bold">{stats.upcomingEvents}</p>
                      <p className="text-blue-100 text-xs">Next in 5 days</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Available Helpers</p>
                      <p className="text-3xl font-bold">{stats.totalHelpers}</p>
                      <p className="text-green-100 text-xs">+3 new this month</p>
                    </div>
                    <Users className="h-8 w-8 text-green-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Total Raised</p>
                      <p className="text-3xl font-bold">${stats.totalRaised}</p>
                      <p className="text-purple-100 text-xs">+18% this month</p>
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
                      <p className="text-orange-100 text-sm font-medium">Community Reach</p>
                      <p className="text-3xl font-bold">{stats.communityReach}</p>
                      <p className="text-orange-100 text-xs">People impacted</p>
                    </div>
                    <Heart className="h-8 w-8 text-orange-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.slice(0, 3).map((event) => (
                    <div key={event._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-bold">{event.title}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                        <div className="flex items-center mt-2 gap-4">
                          <span className="flex items-center text-xs text-gray-500">
                            <Users className="h-3 w-3 mr-1" />
                            {event.helpersBooked?.length || 0}/{event.helpersNeeded} helpers
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <DollarSign className="h-3 w-3 mr-1" />${event.budget}
                          </span>
                        </div>
                      </div>
                      <Badge variant={event.status === "fully_booked" ? "default" : "secondary"}>
                        {event.status === "fully_booked" ? "Full" : "Open"}
                      </Badge>
                    </div>
                  ))}
                  {events.length === 0 && <p className="text-gray-500 text-center py-4">No upcoming events</p>}
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
                      onClick={() => setCreateEventDialog(true)}
                    >
                      <Calendar className="h-6 w-6 mb-2 text-blue-600" />
                      <span className="text-sm font-medium">Create Event</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100"
                    >
                      <Users className="h-6 w-6 mb-2 text-green-600" />
                      <span className="text-sm font-medium">Find Helpers</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100"
                      onClick={() => setCreateCampaignDialog(true)}
                    >
                      <Target className="h-6 w-6 mb-2 text-purple-600" />
                      <span className="text-sm font-medium">Start Campaign</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:from-orange-100 hover:to-red-100"
                    >
                      <TrendingUp className="h-6 w-6 mb-2 text-orange-600" />
                      <span className="text-sm font-medium">View Reports</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Campaigns Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-600" />
                  Active Fundraising Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold">{campaign.title}</h4>
                        <Badge variant="outline">{campaign.category}</Badge>
                        {campaign.matchingAvailable && (
                          <Badge className="bg-green-100 text-green-700">
                            <Zap className="h-3 w-3 mr-1" />
                            {campaign.matchRatio * 100}% Match
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm font-medium">
                        ${campaign.raised} / ${campaign.goal}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{campaign.supporters} supporters</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>
                ))}
                {campaigns.length === 0 && <p className="text-gray-500 text-center py-4">No active campaigns</p>}
              </CardContent>
            </Card>

            {/* Community Impact Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Community Impact This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600">Events Hosted</p>
                    <p className="text-lg font-bold text-blue-600">{stats.eventsThisMonth}</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto text-green-600 mb-2" />
                    <p className="text-sm text-gray-600">Helpers Booked</p>
                    <p className="text-lg font-bold text-green-600">{stats.helpersBooked}</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Heart className="h-6 w-6 mx-auto text-purple-600 mb-2" />
                    <p className="text-sm text-gray-600">Community Reach</p>
                    <p className="text-lg font-bold text-purple-600">{stats.communityReach}</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Award className="h-6 w-6 mx-auto text-orange-600 mb-2" />
                    <p className="text-sm text-gray-600">Artworks Commissioned</p>
                    <p className="text-lg font-bold text-orange-600">{stats.artworksCommissioned}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Event Management
              </h2>
              <Button
                onClick={() => setCreateEventDialog(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Event
              </Button>
            </div>

            <div className="grid gap-6">
              {events.map((event) => (
                <Card key={event._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <Badge variant={event.status === "fully_booked" ? "default" : "secondary"}>
                            {event.status === "fully_booked" ? "Fully Booked" : "Open"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{event.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-orange-500" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-green-500" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-purple-500" />
                            <span>
                              {event.helpersBooked?.length || 0}/{event.helpersNeeded} helpers
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                            <span>Budget: ${event.budget}</span>
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-2 text-red-500" />
                            <span>Expected: {event.expectedAttendees} attendees</span>
                          </div>
                        </div>

                        {event.skills && event.skills.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Skills Needed:</p>
                            <div className="flex flex-wrap gap-2">
                              {event.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Users className="h-3 w-3 mr-1" />
                          Manage Helpers
                        </Button>
                      </div>
                    </div>

                    {event.status !== "fully_booked" && (
                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Need {event.helpersNeeded - (event.helpersBooked?.length || 0)} more helpers
                        </p>
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500">
                          <Plus className="h-3 w-3 mr-1" />
                          Find Helpers
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {events.length === 0 && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-600 mb-2">No Events Yet</h3>
                    <p className="text-gray-500 mb-4">Create your first event to get started!</p>
                    <Button onClick={() => setCreateEventDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Helpers Tab */}
          <TabsContent value="helpers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Available Helpers
              </h2>
              <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Browse All Helpers
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpers.map((helper) => (
                <Card key={helper.id} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={helper.avatar || "/placeholder.svg?height=50&width=50"}
                        alt={helper.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-green-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold">{helper.name}</h3>
                        <p className="text-sm text-gray-600">{helper.distance}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {helper.tier === "tier2" ? (
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
                            <span className="text-xs">{helper.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {helper.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {helper.specialties && helper.specialties.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {helper.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Completed Jobs</p>
                          <p className="font-bold">{helper.completedJobs}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Hourly Rate</p>
                          <p className="font-bold text-green-600">${helper.hourlyRate}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant={helper.availability === "available" ? "default" : "secondary"}>
                          {helper.availability}
                        </Badge>
                        <span className="text-xs text-gray-500">Last worked: {helper.lastWorked}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        disabled={helper.availability !== "available"}
                        onClick={() => setBookHelperDialog(true)}
                      >
                        <UserCheck className="h-3 w-3 mr-1" />
                        Book Helper
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {helpers.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">No Helpers Available</h3>
                  <p className="text-gray-500">Check back later for available helpers in your area.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Fundraising Campaigns
              </h2>
              <Button
                onClick={() => setCreateCampaignDialog(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>

            <div className="grid gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{campaign.title}</h3>
                          <Badge variant="outline">{campaign.category}</Badge>
                          {campaign.matchingAvailable && (
                            <Badge className="bg-green-100 text-green-700">
                              <Zap className="h-3 w-3 mr-1" />
                              {campaign.matchRatio * 100}% Matching
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{campaign.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">
                              ${campaign.raised} / ${campaign.goal}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                              style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{campaign.supporters} supporters</span>
                          <span>{campaign.daysLeft} days remaining</span>
                        </div>
                      </div>

                      <div className="ml-4 flex flex-col gap-2">
                        <Badge variant="default">Active</Badge>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {campaigns.length === 0 && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Target className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-600 mb-2">No Campaigns Yet</h3>
                    <p className="text-gray-500 mb-4">Start your first fundraising campaign!</p>
                    <Button onClick={() => setCreateCampaignDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Campaign
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Community Impact Dashboard
              </h2>
              <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 mx-auto text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-red-600">{stats.communityReach}</h3>
                  <p className="text-red-600 font-medium">People Reached</p>
                  <p className="text-sm text-gray-600 mt-2">Through our art programs and events</p>
                  <div className="mt-3 text-xs text-green-600">+18% from last month</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <Building className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold text-blue-600">{stats.artworksCommissioned}</h3>
                  <p className="text-blue-600 font-medium">Artworks Commissioned</p>
                  <p className="text-sm text-gray-600 mt-2">Beautiful pieces for our community</p>
                  <div className="mt-3 text-xs text-green-600">+2 this month</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-green-600">{stats.eventsThisMonth}</h3>
                  <p className="text-green-600 font-medium">Events This Month</p>
                  <p className="text-sm text-gray-600 mt-2">Bringing art and faith together</p>
                  <div className="mt-3 text-xs text-green-600">On track with goals</div>
                </CardContent>
              </Card>
            </div>

            {/* Engagement Monitoring */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-purple-600" />
                  Engagement Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <MessageCircle className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <p className="text-lg font-bold text-purple-600">156</p>
                    <p className="text-sm text-gray-600">Comments on Events</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <ThumbsUp className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <p className="text-lg font-bold text-blue-600">89</p>
                    <p className="text-sm text-gray-600">Event Likes</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Share className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <p className="text-lg font-bold text-green-600">34</p>
                    <p className="text-sm text-gray-600">Social Shares</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Star className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                    <p className="text-lg font-bold text-orange-600">4.8</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                </div>

                {/* Goals Progress */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Monthly Goals Progress</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Events Hosted</span>
                        <span>{stats.eventsThisMonth}/8</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                          style={{ width: `${(stats.eventsThisMonth / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Community Reach</span>
                        <span>{stats.communityReach}/500</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${(stats.communityReach / 500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Helpers Engaged</span>
                        <span>{stats.helpersBooked}/15</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${(stats.helpersBooked / 15) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Community Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm mb-1">{activity.description}</p>
                      <p className="text-xs text-gray-600">{activity.timestamp}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
                {recentActivity.length === 0 && <p className="text-gray-500 text-center py-4">No recent activity</p>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shop Tab */}
          <TabsContent value="shop" className="space-y-6">
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Church Shop Coming Soon</h3>
              <p className="text-gray-500">Purchase art supplies, commission artwork, and support artists!</p>
              <Button className="mt-4 bg-transparent" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notify Me When Available
              </Button>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Church Profile
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Organization Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input id="orgName" defaultValue={user?.churchInfo?.organizationName || ""} />
                    </div>
                    <div>
                      <Label htmlFor="denomination">Denomination</Label>
                      <Input id="denomination" defaultValue={user?.churchInfo?.denomination || ""} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pastor">Pastor Name</Label>
                      <Input id="pastor" defaultValue={user?.churchInfo?.pastor || ""} />
                    </div>
                    <div>
                      <Label htmlFor="artsContact">Arts Ministry Contact</Label>
                      <Input id="artsContact" defaultValue={user?.churchInfo?.artsMinistryContact || ""} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="size">Church Size</Label>
                    <Select defaultValue={user?.churchInfo?.size || "100-500"}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100">Under 100 members</SelectItem>
                        <SelectItem value="100-500">100-500 members</SelectItem>
                        <SelectItem value="500-1000">500-1000 members</SelectItem>
                        <SelectItem value="1000-plus">1000+ members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Save Profile</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Event Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-approve Helper Applications</p>
                      <p className="text-sm text-gray-500">Automatically approve qualified helpers</p>
                    </div>
                    <Checkbox />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Event Reminders</p>
                      <p className="text-sm text-gray-500">Send reminders to helpers before events</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public Event Listings</p>
                      <p className="text-sm text-gray-500">Make your events visible to the community</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                  <Button className="w-full">Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Event Dialog */}
        <Dialog open={createEventDialog} onOpenChange={setCreateEventDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Create New Event
              </DialogTitle>
              <DialogDescription>Plan and organize your church art event</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventTitle">Event Title</Label>
                  <Input
                    id="eventTitle"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Easter Sunday Service"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="Main Sanctuary"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Describe your event and what help you need"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={newEvent.budget}
                    onChange={(e) => setNewEvent({ ...newEvent, budget: e.target.value })}
                    placeholder="500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="helpersNeeded">Helpers Needed</Label>
                  <Input
                    id="helpersNeeded"
                    type="number"
                    value={newEvent.helpersNeeded}
                    onChange={(e) => setNewEvent({ ...newEvent, helpersNeeded: Number.parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expectedAttendees">Expected Attendees</Label>
                  <Input
                    id="expectedAttendees"
                    type="number"
                    value={newEvent.expectedAttendees}
                    onChange={(e) => setNewEvent({ ...newEvent, expectedAttendees: Number.parseInt(e.target.value) })}
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <Label>Skills Required</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {[
                    "Live Painting",
                    "Setup",
                    "Photography",
                    "Art Instruction",
                    "Youth Ministry",
                    "Event Management",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={newEvent.skills.includes(skill)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewEvent({ ...newEvent, skills: [...newEvent.skills, skill] })
                          } else {
                            setNewEvent({ ...newEvent, skills: newEvent.skills.filter((s) => s !== skill) })
                          }
                        }}
                      />
                      <Label htmlFor={skill} className="text-sm">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
                <Button type="button" variant="outline" onClick={() => setCreateEventDialog(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Create Campaign Dialog */}
        <Dialog open={createCampaignDialog} onOpenChange={setCreateCampaignDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-purple-500" />
                Create Fundraising Campaign
              </DialogTitle>
              <DialogDescription>Start a campaign to raise funds for your art projects</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <Label htmlFor="campaignTitle">Campaign Title</Label>
                <Input
                  id="campaignTitle"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  placeholder="Sanctuary Beautification"
                  required
                />
              </div>
              <div>
                <Label htmlFor="campaignGoal">Funding Goal ($)</Label>
                <Input
                  id="campaignGoal"
                  type="number"
                  value={newCampaign.goal}
                  onChange={(e) => setNewCampaign({ ...newCampaign, goal: e.target.value })}
                  placeholder="5000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="campaignDescription">Description</Label>
                <Textarea
                  id="campaignDescription"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  placeholder="Describe your project and how the funds will be used"
                  required
                />
              </div>
              <div>
                <Label htmlFor="campaignCategory">Category</Label>
                <Select
                  value={newCampaign.category}
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="church-improvement">Church Improvement</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="community">Community Outreach</SelectItem>
                    <SelectItem value="youth">Youth Programs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
                <Button type="button" variant="outline" onClick={() => setCreateCampaignDialog(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Book Helper Dialog */}
        <Dialog open={bookHelperDialog} onOpenChange={setBookHelperDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-green-500" />
                Book Helper
              </DialogTitle>
              <DialogDescription>Request a helper for your event</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="eventSelect">Select Event</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events
                      .filter((event) => event.status !== "fully_booked")
                      .map((event) => (
                        <SelectItem key={event._id} value={event._id}>
                          {event.title} - {new Date(event.date).toLocaleDateString()}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="role">Role/Responsibility</Label>
                <Input id="role" placeholder="Live Painter, Setup Assistant, etc." />
              </div>
              <div>
                <Label htmlFor="message">Message to Helper</Label>
                <Textarea id="message" placeholder="Additional details about the role and expectations" />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
                <Button type="button" variant="outline" onClick={() => setBookHelperDialog(false)}>
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
