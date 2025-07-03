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
  Users,
  Calendar,
  Heart,
  TrendingUp,
  Target,
  Award,
  Settings,
  Loader2,
  AlertTriangle,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  Edit,
  UserCheck,
  BarChart3,
} from "lucide-react"

export default function ChurchDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [stats, setStats] = useState({
    overview: {
      helpersBooked: 0,
      eventsCreated: 0,
      campaignsActive: 0,
      totalDonations: 0,
      artistsSupported: 0,
      communityEngagement: 0,
    },
    engagement: {
      monthlyEvents: 0,
      monthlyHelpers: 0,
      monthlyDonations: 0,
      engagementGrowth: 0,
      communityReach: 0,
    },
    impact: {
      totalImpactScore: 0,
      goalsAchieved: 0,
      totalGoals: 0,
      monthlyProgress: 0,
    },
  })

  const [helpers, setHelpers] = useState([])
  const [events, setEvents] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [communityImpact, setCommunityImpact] = useState(null)
  const [availableHelpers, setAvailableHelpers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Dialog states
  const [bookHelperDialog, setBookHelperDialog] = useState(false)
  const [createEventDialog, setCreateEventDialog] = useState(false)
  const [createCampaignDialog, setCreateCampaignDialog] = useState(false)
  const [impactGoalsDialog, setImpactGoalsDialog] = useState(false)

  // Form states
  const [helperBookingForm, setHelperBookingForm] = useState({
    helperId: "",
    eventDate: "",
    duration: "",
    description: "",
    requirements: "",
  })

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    type: "",
    startDate: "",
    endDate: "",
    location: "",
    maxAttendees: "",
    isPublic: true,
    banner: null,
  })

  const [campaignForm, setCampaignForm] = useState({
    title: "",
    description: "",
    targetAmount: "",
    endDate: "",
    category: "",
    isMatching: false,
    matchingRatio: "",
  })

  const [impactGoalsForm, setImpactGoalsForm] = useState({
    artistsSupported: "",
    totalDonations: "",
    eventsHosted: "",
    helpersBooked: "",
  })

  const [submitting, setSubmitting] = useState(false)

  // Check authentication and user type
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login")
        return
      }
      if (user.userType !== "church") {
        router.push("/dashboard")
        return
      }
      fetchDashboardData()
    }
  }, [user, authLoading, router])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch church stats
      const statsResponse = await fetch("/api/dashboard/church/stats", {
        credentials: "include",
      })
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch helpers
      const helpersResponse = await fetch("/api/dashboard/church/helpers", {
        credentials: "include",
      })
      if (helpersResponse.ok) {
        const helpersData = await helpersResponse.json()
        setHelpers(helpersData.helpers || [])
      }

      // Fetch events
      const eventsResponse = await fetch("/api/dashboard/church/events", {
        credentials: "include",
      })
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json()
        setEvents(eventsData.events || [])
      }

      // Fetch campaigns
      const campaignsResponse = await fetch("/api/dashboard/church/campaigns", {
        credentials: "include",
      })
      if (campaignsResponse.ok) {
        const campaignsData = await campaignsResponse.json()
        setCampaigns(campaignsData.campaigns || [])
      }

      // Fetch community impact
      const impactResponse = await fetch("/api/community-impact", {
        credentials: "include",
      })
      if (impactResponse.ok) {
        const impactData = await impactResponse.json()
        setCommunityImpact(impactData.impact)
        if (impactData.impact?.goals) {
          setImpactGoalsForm({
            artistsSupported: impactData.impact.goals.artistsSupported?.target || "",
            totalDonations: impactData.impact.goals.totalDonations?.target || "",
            eventsHosted: impactData.impact.goals.eventsHosted?.target || "",
            helpersBooked: impactData.impact.goals.helpersBooked?.target || "",
          })
        }
      }

      // Fetch available helpers
      const availableHelpersResponse = await fetch("/api/helpers?available=true", {
        credentials: "include",
      })
      if (availableHelpersResponse.ok) {
        const availableHelpersData = await availableHelpersResponse.json()
        setAvailableHelpers(availableHelpersData.helpers || [])
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

  const handleBookHelper = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/helpers/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(helperBookingForm),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Helper booked successfully!",
        })
        setBookHelperDialog(false)
        setHelperBookingForm({ helperId: "", eventDate: "", duration: "", description: "", requirements: "" })
        fetchDashboardData()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to book helper")
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

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      Object.keys(eventForm).forEach((key) => {
        if (eventForm[key] !== null && eventForm[key] !== "") {
          formData.append(key, eventForm[key])
        }
      })

      const response = await fetch("/api/dashboard/church/events", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Event created successfully!",
        })
        setCreateEventDialog(false)
        setEventForm({
          title: "",
          description: "",
          type: "",
          startDate: "",
          endDate: "",
          location: "",
          maxAttendees: "",
          isPublic: true,
          banner: null,
        })
        fetchDashboardData()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to create event")
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

  const handleCreateCampaign = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/dashboard/church/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(campaignForm),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Campaign created successfully!",
        })
        setCreateCampaignDialog(false)
        setCampaignForm({
          title: "",
          description: "",
          targetAmount: "",
          endDate: "",
          category: "",
          isMatching: false,
          matchingRatio: "",
        })
        fetchDashboardData()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to create campaign")
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

  const handleUpdateImpactGoals = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const goals = {
        artistsSupported: {
          target: Number.parseInt(impactGoalsForm.artistsSupported) || 0,
          achieved: communityImpact?.metrics?.artistsSupported || 0,
        },
        totalDonations: {
          target: Number.parseFloat(impactGoalsForm.totalDonations) || 0,
          achieved: communityImpact?.metrics?.totalDonations || 0,
        },
        eventsHosted: {
          target: Number.parseInt(impactGoalsForm.eventsHosted) || 0,
          achieved: communityImpact?.metrics?.eventsHosted || 0,
        },
        helpersBooked: {
          target: Number.parseInt(impactGoalsForm.helpersBooked) || 0,
          achieved: communityImpact?.metrics?.helpersBooked || 0,
        },
      }

      const response = await fetch("/api/community-impact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ impactId: communityImpact._id, goals }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Impact goals updated successfully!",
        })
        setImpactGoalsDialog(false)
        fetchDashboardData()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to update goals")
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-lg text-gray-600">Loading your church dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || user.userType !== "church") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Access denied. Church account required.</p>
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
              Church Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage your community impact and support creative ministry</p>
          </div>
          <div className="flex space-x-3">
            <Dialog open={bookHelperDialog} onOpenChange={setBookHelperDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  <UserCheck className="w-5 h-5 mr-2" />
                  Book Helper
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book a Helper</DialogTitle>
                  <DialogDescription>Find assistance for your church events and activities</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBookHelper} className="space-y-4">
                  <div>
                    <Label htmlFor="helperId">Select Helper</Label>
                    <Select
                      value={helperBookingForm.helperId}
                      onValueChange={(value) => setHelperBookingForm((prev) => ({ ...prev, helperId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a helper" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableHelpers.map((helper) => (
                          <SelectItem key={helper.id} value={helper.id}>
                            {helper.name} - {helper.skills?.join(", ") || "General Help"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventDate">Event Date</Label>
                      <Input
                        id="eventDate"
                        type="datetime-local"
                        value={helperBookingForm.eventDate}
                        onChange={(e) => setHelperBookingForm((prev) => ({ ...prev, eventDate: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration (hours)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={helperBookingForm.duration}
                        onChange={(e) => setHelperBookingForm((prev) => ({ ...prev, duration: e.target.value }))}
                        placeholder="4"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Event Description</Label>
                    <Textarea
                      id="description"
                      value={helperBookingForm.description}
                      onChange={(e) => setHelperBookingForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the event and what help is needed..."
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={helperBookingForm.requirements}
                      onChange={(e) => setHelperBookingForm((prev) => ({ ...prev, requirements: e.target.value }))}
                      placeholder="Any special skills or equipment needed..."
                      rows={2}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setBookHelperDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <UserCheck className="w-4 h-4 mr-2" />
                      )}
                      Book Helper
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={createEventDialog} onOpenChange={setCreateEventDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/50 hover:bg-white/80 border-white/30">
                  <Calendar className="w-5 h-5 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>Organize community events and activities</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={eventForm.title}
                        onChange={(e) => setEventForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter event title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Event Type</Label>
                      <Select
                        value={eventForm.type}
                        onValueChange={(value) => setEventForm((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="worship">Worship Service</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="retreat">Retreat</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="community">Community Event</SelectItem>
                          <SelectItem value="fundraiser">Fundraiser</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={eventForm.description}
                      onChange={(e) => setEventForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your event..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date & Time</Label>
                      <Input
                        id="startDate"
                        type="datetime-local"
                        value={eventForm.startDate}
                        onChange={(e) => setEventForm((prev) => ({ ...prev, startDate: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date & Time</Label>
                      <Input
                        id="endDate"
                        type="datetime-local"
                        value={eventForm.endDate}
                        onChange={(e) => setEventForm((prev) => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={eventForm.location}
                        onChange={(e) => setEventForm((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Event location or 'Online'"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxAttendees">Max Attendees</Label>
                      <Input
                        id="maxAttendees"
                        type="number"
                        value={eventForm.maxAttendees}
                        onChange={(e) => setEventForm((prev) => ({ ...prev, maxAttendees: e.target.value }))}
                        placeholder="100"
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={eventForm.isPublic}
                      onChange={(e) => setEventForm((prev) => ({ ...prev, isPublic: e.target.checked }))}
                    />
                    <Label htmlFor="isPublic">Make this event public</Label>
                  </div>
                  <div>
                    <Label htmlFor="banner">Event Banner</Label>
                    <Input
                      id="banner"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEventForm((prev) => ({ ...prev, banner: e.target.files[0] }))}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setCreateEventDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Calendar className="w-4 h-4 mr-2" />
                      )}
                      Create Event
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={createCampaignDialog} onOpenChange={setCreateCampaignDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/50 hover:bg-white/80 border-white/30">
                  <Heart className="w-5 h-5 mr-2" />
                  Create Campaign
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Donation Campaign</DialogTitle>
                  <DialogDescription>Launch a fundraising campaign for your community</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateCampaign} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Campaign Title</Label>
                    <Input
                      id="title"
                      value={campaignForm.title}
                      onChange={(e) => setCampaignForm((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter campaign title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={campaignForm.description}
                      onChange={(e) => setCampaignForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your campaign goals..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="targetAmount">Target Amount ($)</Label>
                      <Input
                        id="targetAmount"
                        type="number"
                        value={campaignForm.targetAmount}
                        onChange={(e) => setCampaignForm((prev) => ({ ...prev, targetAmount: e.target.value }))}
                        placeholder="1000.00"
                        min="1"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={campaignForm.endDate}
                        onChange={(e) => setCampaignForm((prev) => ({ ...prev, endDate: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={campaignForm.category}
                      onValueChange={(value) => setCampaignForm((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="artist-support">Artist Support</SelectItem>
                        <SelectItem value="community-outreach">Community Outreach</SelectItem>
                        <SelectItem value="building-fund">Building Fund</SelectItem>
                        <SelectItem value="missions">Missions</SelectItem>
                        <SelectItem value="youth-ministry">Youth Ministry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isMatching"
                      checked={campaignForm.isMatching}
                      onChange={(e) => setCampaignForm((prev) => ({ ...prev, isMatching: e.target.checked }))}
                    />
                    <Label htmlFor="isMatching">Enable matching donations</Label>
                  </div>
                  {campaignForm.isMatching && (
                    <div>
                      <Label htmlFor="matchingRatio">Matching Ratio (e.g., 1:1, 2:1)</Label>
                      <Input
                        id="matchingRatio"
                        value={campaignForm.matchingRatio}
                        onChange={(e) => setCampaignForm((prev) => ({ ...prev, matchingRatio: e.target.value }))}
                        placeholder="1:1"
                      />
                    </div>
                  )}
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setCreateCampaignDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Heart className="w-4 h-4 mr-2" />
                      )}
                      Create Campaign
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Helpers Booked</CardTitle>
              <UserCheck className="h-5 w-5 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.overview?.helpersBooked || 0}</div>
              <p className="text-xs text-blue-200">+{stats.engagement?.monthlyHelpers || 0} this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Events Created</CardTitle>
              <Calendar className="h-5 w-5 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.overview?.eventsCreated || 0}</div>
              <p className="text-xs text-purple-200">+{stats.engagement?.monthlyEvents || 0} this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Community Impact</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.overview?.communityEngagement || 0}</div>
              <p className="text-xs text-green-200">{stats.overview?.artistsSupported || 0} artists supported</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Active Campaigns</CardTitle>
              <Heart className="h-5 w-5 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.overview?.campaignsActive || 0}</div>
              <p className="text-xs text-orange-200">
                ${(stats.overview?.totalDonations || 0).toLocaleString()} raised
              </p>
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
            <TabsTrigger value="helpers" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <UserCheck className="w-4 h-4 mr-2" />
              Helpers
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Heart className="w-4 h-4 mr-2" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <BarChart3 className="w-4 h-4 mr-2" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="impact" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Target className="w-4 h-4 mr-2" />
              Impact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Monthly Progress</CardTitle>
                  <CardDescription>Your community engagement this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Helpers Booked</span>
                      <span>{stats.engagement?.monthlyHelpers || 0}</span>
                    </div>
                    <Progress
                      value={Math.min(((stats.engagement?.monthlyHelpers || 0) / 10) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Events Created</span>
                      <span>{stats.engagement?.monthlyEvents || 0}</span>
                    </div>
                    <Progress
                      value={Math.min(((stats.engagement?.monthlyEvents || 0) / 5) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Donations Facilitated</span>
                      <span>${stats.engagement?.monthlyDonations || 0}</span>
                    </div>
                    <Progress
                      value={Math.min(((stats.engagement?.monthlyDonations || 0) / 1000) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Community Reach</CardTitle>
                  <CardDescription>Your ministry's impact metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {stats.engagement?.communityReach || 0}
                    </div>
                    <p className="text-gray-600 mb-4">People Reached</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Growth Rate</span>
                        <span>+{stats.engagement?.engagementGrowth || 0}%</span>
                      </div>
                      <Progress value={Math.min(stats.engagement?.engagementGrowth || 0, 100)} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                <CardDescription>Latest church activities and bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {helpers.slice(0, 5).map((helper, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-white/50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Booked {helper.helperName}</h4>
                        <p className="text-sm text-gray-600">
                          for {helper.eventDescription} • {helper.eventDate}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">{helper.status}</Badge>
                    </div>
                  ))}
                  {helpers.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No recent activity. Start booking helpers to see updates here!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="helpers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpers.map((helper) => (
                <Card key={helper.id} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{helper.helperName}</CardTitle>
                        <CardDescription>{helper.eventDescription}</CardDescription>
                      </div>
                      <Badge
                        className={`${
                          helper.status === "confirmed"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : helper.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        {helper.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {helper.eventDate}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {helper.duration} hours
                      </div>
                      {helper.hourlyRate && (
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />${helper.hourlyRate}/hour
                        </div>
                      )}
                    </div>
                    {helper.skills && helper.skills.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {helper.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {helpers.length === 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="text-center py-12">
                  <UserCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No helpers booked yet</h3>
                  <p className="text-gray-600 mb-6">Find skilled volunteers to help with your church events</p>
                  <Button
                    onClick={() => setBookHelperDialog(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Book Your First Helper
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.type}</CardDescription>
                      </div>
                      <Badge
                        className={`${
                          event.status === "upcoming"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : event.status === "ongoing"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.startDate}
                      </div>
                      {event.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                      )}
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendeeCount || 0} / {event.maxAttendees || "∞"} attendees
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
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
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No events created yet</h3>
                  <p className="text-gray-600 mb-6">Start organizing community events and activities</p>
                  <Button
                    onClick={() => setCreateEventDialog(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Your First Event
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{campaign.title}</CardTitle>
                        <CardDescription>{campaign.category}</CardDescription>
                      </div>
                      <Badge
                        className={`${
                          campaign.status === "active"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : campaign.status === "completed"
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>
                            ${campaign.currentAmount || 0} / ${campaign.targetAmount}
                          </span>
                        </div>
                        <Progress
                          value={Math.min(((campaign.currentAmount || 0) / campaign.targetAmount) * 100, 100)}
                          className="h-2"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Donors: {campaign.donorCount || 0}</span>
                        <span>Ends: {campaign.endDate}</span>
                      </div>
                      {campaign.isMatching && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                          Matching {campaign.matchingRatio}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/50 hover:bg-white/80 border-white/30"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {campaigns.length === 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No campaigns created yet</h3>
                  <p className="text-gray-600 mb-6">Launch fundraising campaigns to support your community</p>
                  <Button
                    onClick={() => setCreateCampaignDialog(true)}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Create Your First Campaign
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Engagement Metrics</CardTitle>
                  <CardDescription>Track your community interaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Monthly Helpers</span>
                      <Badge variant="outline">{stats.engagement?.monthlyHelpers || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly Events</span>
                      <Badge variant="outline">{stats.engagement?.monthlyEvents || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly Donations</span>
                      <Badge variant="outline">${stats.engagement?.monthlyDonations || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Community Reach</span>
                      <Badge variant="outline">{stats.engagement?.communityReach || 0} people</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Growth Trends</CardTitle>
                  <CardDescription>Your ministry's growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Engagement Growth</span>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">+{stats.engagement?.engagementGrowth || 0}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Helper Retention</span>
                      <span className="text-blue-600">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Event Attendance</span>
                      <span className="text-purple-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Campaign Success</span>
                      <span className="text-green-600">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Engagement Goals</CardTitle>
                <CardDescription>Track your ministry objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <UserCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(((stats.engagement?.monthlyHelpers || 0) / 10) * 100)}%
                    </div>
                    <div className="text-sm text-blue-600">Monthly Helpers</div>
                    <div className="text-xs text-gray-500 mt-1">Goal: 10 helpers</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(((stats.engagement?.monthlyEvents || 0) / 5) * 100)}%
                    </div>
                    <div className="text-sm text-purple-600">Monthly Events</div>
                    <div className="text-xs text-gray-500 mt-1">Goal: 5 events</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(((stats.engagement?.monthlyDonations || 0) / 1000) * 100)}%
                    </div>
                    <div className="text-sm text-green-600">Monthly Donations</div>
                    <div className="text-xs text-gray-500 mt-1">Goal: $1,000</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-bold">Community Impact Goals</CardTitle>
                    <CardDescription>Set and track your ministry's impact objectives</CardDescription>
                  </div>
                  <Dialog open={impactGoalsDialog} onOpenChange={setImpactGoalsDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-white/50 hover:bg-white/80 border-white/30">
                        <Settings className="w-4 h-4 mr-2" />
                        Update Goals
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Impact Goals</DialogTitle>
                        <DialogDescription>Set targets for your community impact metrics</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateImpactGoals} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="artistsSupported">Artists Supported</Label>
                            <Input
                              id="artistsSupported"
                              type="number"
                              value={impactGoalsForm.artistsSupported}
                              onChange={(e) =>
                                setImpactGoalsForm((prev) => ({ ...prev, artistsSupported: e.target.value }))
                              }
                              placeholder="10"
                              min="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="totalDonations">Total Donations ($)</Label>
                            <Input
                              id="totalDonations"
                              type="number"
                              value={impactGoalsForm.totalDonations}
                              onChange={(e) =>
                                setImpactGoalsForm((prev) => ({ ...prev, totalDonations: e.target.value }))
                              }
                              placeholder="1000.00"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="eventsHosted">Events Hosted</Label>
                            <Input
                              id="eventsHosted"
                              type="number"
                              value={impactGoalsForm.eventsHosted}
                              onChange={(e) =>
                                setImpactGoalsForm((prev) => ({ ...prev, eventsHosted: e.target.value }))
                              }
                              placeholder="5"
                              min="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="helpersBooked">Helpers Booked</Label>
                            <Input
                              id="helpersBooked"
                              type="number"
                              value={impactGoalsForm.helpersBooked}
                              onChange={(e) =>
                                setImpactGoalsForm((prev) => ({ ...prev, helpersBooked: e.target.value }))
                              }
                              placeholder="20"
                              min="0"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setImpactGoalsDialog(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={submitting}>
                            {submitting ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Target className="w-4 h-4 mr-2" />
                            )}
                            Update Goals
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {communityImpact ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">
                        {communityImpact.metrics?.artistsSupported || 0}
                      </div>
                      <div className="text-sm text-blue-600">Artists Supported</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Goal: {communityImpact.goals?.artistsSupported?.target || 0}
                      </div>
                      <Progress
                        value={Math.min(
                          ((communityImpact.metrics?.artistsSupported || 0) /
                            (communityImpact.goals?.artistsSupported?.target || 1)) *
                            100,
                          100,
                        )}
                        className="h-2 mt-2"
                      />
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">
                        ${(communityImpact.metrics?.totalDonations || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">Total Donations</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Goal: ${(communityImpact.goals?.totalDonations?.target || 0).toLocaleString()}
                      </div>
                      <Progress
                        value={Math.min(
                          ((communityImpact.metrics?.totalDonations || 0) /
                            (communityImpact.goals?.totalDonations?.target || 1)) *
                            100,
                          100,
                        )}
                        className="h-2 mt-2"
                      />
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">
                        {communityImpact.metrics?.eventsHosted || 0}
                      </div>
                      <div className="text-sm text-purple-600">Events Hosted</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Goal: {communityImpact.goals?.eventsHosted?.target || 0}
                      </div>
                      <Progress
                        value={Math.min(
                          ((communityImpact.metrics?.eventsHosted || 0) /
                            (communityImpact.goals?.eventsHosted?.target || 1)) *
                            100,
                          100,
                        )}
                        className="h-2 mt-2"
                      />
                    </div>

                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <UserCheck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">
                        {communityImpact.metrics?.helpersBooked || 0}
                      </div>
                      <div className="text-sm text-orange-600">Helpers Booked</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Goal: {communityImpact.goals?.helpersBooked?.target || 0}
                      </div>
                      <Progress
                        value={Math.min(
                          ((communityImpact.metrics?.helpersBooked || 0) /
                            (communityImpact.goals?.helpersBooked?.target || 1)) *
                            100,
                          100,
                        )}
                        className="h-2 mt-2"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No impact data yet</h3>
                    <p className="text-gray-600 mb-6">Start setting goals to track your community impact</p>
                    <Button
                      onClick={() => setImpactGoalsDialog(true)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Set Impact Goals
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {communityImpact?.achievements && communityImpact.achievements.length > 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Recent Achievements</CardTitle>
                  <CardDescription>Celebrate your ministry milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communityImpact.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-orange-600">+{achievement.points} points</div>
                          <div className="text-xs text-gray-500">
                            {new Date(achievement.achievedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
