"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Settings,
  Bell,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Database,
  Activity,
  UserCheck,
  Flag,
  CreditCard,
  Shield,
  Crown,
  Award,
  Building,
  Palette,
  Target,
  Heart,
} from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data for design elements (will be replaced with real data when available)
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "user_registration",
      message: "New artist Sarah Johnson registered",
      timestamp: "2 minutes ago",
      status: "info",
      userType: "artist",
    },
    {
      id: 2,
      type: "donation",
      message: "$500 donation to Easter Campaign",
      timestamp: "15 minutes ago",
      status: "success",
      amount: 500,
    },
    {
      id: 3,
      type: "content_report",
      message: "Artwork reported for review",
      timestamp: "1 hour ago",
      status: "warning",
      contentId: "art_123",
    },
    {
      id: 4,
      type: "contest_submission",
      message: "New contest entry submitted",
      timestamp: "2 hours ago",
      status: "info",
      contestId: "contest_456",
    },
    {
      id: 5,
      type: "helper_booking",
      message: "Helper booked for church event",
      timestamp: "3 hours ago",
      status: "success",
      eventId: "event_789",
    },
  ])

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      type: "artwork",
      title: "Sacred Heart Painting",
      submitter: "Michael Chen",
      submittedAt: "2024-01-20",
      status: "pending",
      category: "Traditional Art",
      tier: "tier2",
    },
    {
      id: 2,
      type: "contest",
      title: "Spring Revival Art Contest",
      submitter: "Grace Church",
      submittedAt: "2024-01-19",
      status: "pending",
      category: "Contest",
      tier: "tier1",
    },
    {
      id: 3,
      type: "user_verification",
      title: "Artist Profile Verification",
      submitter: "Emma Rodriguez",
      submittedAt: "2024-01-18",
      status: "pending",
      category: "Verification",
      tier: "tier2",
    },
    {
      id: 4,
      type: "campaign",
      title: "Youth Art Program Funding",
      submitter: "Faith Baptist Church",
      submittedAt: "2024-01-17",
      status: "pending",
      category: "Campaign",
      tier: "tier1",
    },
  ])

  const [systemMetrics, setSystemMetrics] = useState([
    { name: "Server Uptime", value: "99.9%", status: "good" },
    { name: "Database Performance", value: "Fast", status: "good" },
    { name: "API Response Time", value: "120ms", status: "good" },
    { name: "Storage Usage", value: "67%", status: "warning" },
    { name: "Active Sessions", value: "234", status: "good" },
    { name: "Error Rate", value: "0.1%", status: "good" },
  ])

  const [selectedUser, setSelectedUser] = useState(null)
  const [userActionDialog, setUserActionDialog] = useState(false)
  const [actionType, setActionType] = useState("")

  useEffect(() => {
    fetchAdminStats()
  }, [])

  const fetchAdminStats = async () => {
    try {
      const response = await fetch("/api/dashboard/admin/stats", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to fetch stats")
      }
    } catch (error) {
      console.error("Failed to fetch admin stats:", error)
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = (id, type) => {
    setPendingApprovals((prev) => prev.filter((item) => item.id !== id))
    console.log("Approved:", id, type)
  }

  const handleReject = (id, type) => {
    setPendingApprovals((prev) => prev.filter((item) => item.id !== id))
    console.log("Rejected:", id, type)
  }

  const handleUserAction = (user, action) => {
    setSelectedUser(user)
    setActionType(action)
    setUserActionDialog(true)
  }

  const executeUserAction = () => {
    // This would make API calls to update user status
    console.log(`${actionType} user:`, selectedUser)
    setUserActionDialog(false)
    setSelectedUser(null)
    setActionType("")
  }

  const getTierBadge = (tier) => {
    return tier === "tier2" ? (
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>
      case "suspended":
        return <Badge className="bg-yellow-500 text-white">Suspended</Badge>
      case "banned":
        return <Badge className="bg-red-500 text-white">Banned</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getUserTypeIcon = (userType) => {
    switch (userType) {
      case "artist":
        return <Palette className="h-4 w-4" />
      case "patron":
        return <Heart className="h-4 w-4" />
      case "church":
        return <Building className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6 my-32">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-gray-200 rounded-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6 my-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchAdminStats}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6 my-32">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-300 text-lg">Platform management and oversight 🛡️</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge className="bg-red-500/20 text-red-200 border-red-400">
                  <Shield className="h-3 w-3 mr-1" />
                  Super Admin
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Activity className="h-3 w-3 mr-1" />
                  System Health: 98%
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Bell className="h-4 w-4 mr-2" />
                Alerts ({stats?.pendingArtworks || 0})
              </Button>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-1">
            <TabsTrigger value="overview" className="rounded-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg">
              Users
            </TabsTrigger>
            <TabsTrigger value="content" className="rounded-lg">
              Content
            </TabsTrigger>
            <TabsTrigger value="donations" className="rounded-lg">
              Donations
            </TabsTrigger>
            <TabsTrigger value="system" className="rounded-lg">
              System
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg">
              Settings
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
                      <p className="text-blue-100 text-sm font-medium">Total Users</p>
                      <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
                      <p className="text-blue-100 text-xs">Platform-wide users</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Total Donations</p>
                      <p className="text-3xl font-bold">${stats?.totalDonations || 0}</p>
                      <p className="text-green-100 text-xs">Platform revenue</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Pending Approvals</p>
                      <p className="text-3xl font-bold">{stats?.pendingArtworks || 0}</p>
                      <p className="text-orange-100 text-xs">Requires attention</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Total Artworks</p>
                      <p className="text-3xl font-bold">{stats?.totalArtworks || 0}</p>
                      <p className="text-purple-100 text-xs">All platform content</p>
                    </div>
                    <Activity className="h-8 w-8 text-purple-200" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                </CardContent>
              </Card>
            </div>

            {/* User Distribution & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    User Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(stats?.usersByType || {}).map(([type, count]) => (
                    <div key={type} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {type === "artist" && <Palette className="h-4 w-4 text-blue-500" />}
                          {type === "patron" && <Heart className="h-4 w-4 text-green-500" />}
                          {type === "church" && <Building className="h-4 w-4 text-purple-500" />}
                          <span className="text-sm capitalize">{type}s</span>
                        </div>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            type === "artist"
                              ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                              : type === "patron"
                                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                : "bg-gradient-to-r from-purple-500 to-pink-500"
                          }`}
                          style={{ width: `${stats?.totalUsers ? (count / stats.totalUsers) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-green-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                      {activity.userType && (
                        <Badge variant="outline" className="text-xs">
                          {activity.userType}
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Top Artists */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-yellow-600" />
                  Top Artists
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.topArtists?.map((artist, index) => (
                    <div key={artist._id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        {index === 0 ? (
                          <Crown className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{artist.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {artist.points?.total || 0} points • {artist.points?.level || "bronze"} level
                        </p>
                      </div>
                      <Badge variant="outline">{artist.artistInfo?.specialties?.[0] || "Artist"}</Badge>
                    </div>
                  )) || <p className="text-center text-muted-foreground py-8">No artist data available</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                User Management
              </h2>
              <div className="flex gap-3">
                <Button variant="outline" className="bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Export Users
                </Button>
                <Button>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Bulk Actions
                </Button>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <Palette className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold text-blue-600">{stats?.usersByType?.artist || 0}</h3>
                  <p className="text-blue-600 font-medium">Artists</p>
                  <p className="text-sm text-gray-600 mt-2">Creative professionals</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-green-600">{stats?.usersByType?.patron || 0}</h3>
                  <p className="text-green-600 font-medium">Patrons</p>
                  <p className="text-sm text-gray-600 mt-2">Art supporters</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <Building className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold text-purple-600">{stats?.usersByType?.church || 0}</h3>
                  <p className="text-purple-600 font-medium">Churches</p>
                  <p className="text-sm text-gray-600 mt-2">Ministry organizations</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Users */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentUsers?.map((user) => (
                    <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {getUserTypeIcon(user.userType)}
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.userType === "admin" ? "default" : "secondary"}>{user.userType}</Badge>
                        <Badge variant={user.isActive ? "default" : "destructive"}>
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  )) || <p className="text-center text-muted-foreground py-8">No recent users to display</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Content Moderation
              </h2>
              <div className="flex gap-3">
                <Button variant="outline" className="bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Review Queue
                </Button>
                <Button>
                  <Flag className="h-4 w-4 mr-2" />
                  Flagged Content
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                    Content Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Artworks</span>
                    <span className="font-medium">{stats?.totalArtworks || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Review</span>
                    <span className="font-medium text-yellow-600">{stats?.pendingArtworks || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Events</span>
                    <span className="font-medium">{stats?.totalEvents || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Users</span>
                    <span className="font-medium">{stats?.activeUsers || 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Flag className="h-5 w-5 mr-2 text-red-600" />
                    Platform Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Engagement</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Content Quality</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Platform Stability</span>
                    <span className="font-medium">99%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "99%" }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Donation Management
              </h2>
              <div className="flex gap-3">
                <Button variant="outline" className="bg-transparent">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-green-600">${stats?.totalDonations || 0}</h3>
                  <p className="text-green-600 font-medium">Total Donations</p>
                  <p className="text-sm text-gray-600 mt-2">All-time platform donations</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold text-blue-600">${stats?.monthlyRevenue || 0}</h3>
                  <p className="text-blue-600 font-medium">This Month</p>
                  <p className="text-sm text-gray-600 mt-2">Current month revenue</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold text-purple-600">{stats?.totalEvents || 0}</h3>
                  <p className="text-purple-600 font-medium">Active Events</p>
                  <p className="text-sm text-gray-600 mt-2">Platform-wide events</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                  <h3 className="text-2xl font-bold text-orange-600">
                    $
                    {stats?.totalDonations && stats?.totalUsers
                      ? Math.round(stats.totalDonations / stats.totalUsers)
                      : 0}
                  </h3>
                  <p className="text-orange-600 font-medium">Avg per User</p>
                  <p className="text-sm text-gray-600 mt-2">Average donation amount</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                  Payment Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg bg-green-50">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="font-medium">Successful</p>
                    <p className="text-2xl font-bold text-green-600">98.7%</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-red-50">
                    <XCircle className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <p className="font-medium">Failed</p>
                    <p className="text-2xl font-bold text-red-600">1.3%</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-yellow-50">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="font-medium">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">3</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-blue-50">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="font-medium">Growth</p>
                    <p className="text-2xl font-bold text-blue-600">+18%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
                System Health
              </h2>
              <Button variant="outline" className="bg-transparent">
                <Database className="h-4 w-4 mr-2" />
                System Logs
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemMetrics.map((metric, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          metric.status === "good"
                            ? "bg-green-500"
                            : metric.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-600" />
                  Database Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Connection Status</span>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Response Time</span>
                  <span className="font-medium">45ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Connections</span>
                  <span className="font-medium">12/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Storage Used</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">2.3GB / 10GB</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Platform Settings
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="platformName">Platform Name</Label>
                      <Input id="platformName" defaultValue="Redeemed Creative Arts" />
                    </div>
                    <div>
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input id="supportEmail" defaultValue="support@redeemedcreativearts.com" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">User Registration</p>
                      <p className="text-sm text-gray-500">Allow new user registrations</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Content Moderation</p>
                      <p className="text-sm text-gray-500">Require approval for new content</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-gray-500">Put platform in maintenance mode</p>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>

                  <Button className="w-full">Save General Settings</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-gray-500">Auto-logout inactive users</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rate Limiting</p>
                      <p className="text-sm text-gray-500">Enable API rate limiting</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>

                  <Button className="w-full">Save Security Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* User Action Dialog */}
        <Dialog open={userActionDialog} onOpenChange={setUserActionDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Confirm User Action
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to {actionType} {selectedUser?.name}?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800">
                  This action will {actionType} the user account.{" "}
                  {actionType === "ban" && "This action is permanent and cannot be undone."}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={executeUserAction}
                  className={`flex-1 ${
                    actionType === "ban"
                      ? "bg-red-500 hover:bg-red-600"
                      : actionType === "suspend"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  Confirm {actionType}
                </Button>
                <Button variant="outline" onClick={() => setUserActionDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
