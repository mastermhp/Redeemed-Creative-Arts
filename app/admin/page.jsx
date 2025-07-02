"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Trophy,
  AlertCircle,
  BarChart3,
  Settings,
  Bell,
  ImageIcon,
  BookOpen,
  Calendar,
  ShoppingBag,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
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
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    totalPatrons: 0,
    totalChurches: 0,
    totalAdmins: 0,
    totalDonations: 0,
    totalContests: 0,
    pendingApprovals: 0,
    activeHelpers: 0,
    totalArtworks: 0,
    totalCourses: 0,
    totalEvents: 0,
    totalProducts: 0,
    usersByType: {},
    topArtists: [],
    recentUsers: [],
    monthlyRevenue: 0,
    activeUsers: 0,
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  // Additional state for enhanced functionality
  const [pendingApprovals, setPendingApprovals] = useState([])
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
    fetchDashboardData()
    fetchPendingApprovals()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("Fetching dashboard data...")

      // Fetch from both endpoints to get comprehensive data
      const [dashboardResponse, adminStatsResponse] = await Promise.all([
        fetch("/api/admin/dashboard", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }),
        fetch("/api/dashboard/admin/stats", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }),
      ])

      console.log("Dashboard response status:", dashboardResponse.status)
      console.log("Admin stats response status:", adminStatsResponse.status)

      let dashboardData = {}
      let adminStatsData = {}

      if (dashboardResponse.ok) {
        dashboardData = await dashboardResponse.json()
        console.log("Dashboard data:", dashboardData)
      }

      if (adminStatsResponse.ok) {
        adminStatsData = await adminStatsResponse.json()
        console.log("Admin stats data:", adminStatsData)
      }

      // Merge data from both sources
      const mergedStats = {
        totalUsers: dashboardData.stats?.totalUsers || adminStatsData.totalUsers || 0,
        totalArtists: dashboardData.stats?.totalArtists || adminStatsData.usersByType?.artist || 0,
        totalPatrons: dashboardData.stats?.totalPatrons || adminStatsData.usersByType?.patron || 0,
        totalChurches: dashboardData.stats?.totalChurches || adminStatsData.usersByType?.church || 0,
        totalAdmins: dashboardData.stats?.totalAdmins || adminStatsData.usersByType?.admin || 0,
        totalDonations: dashboardData.stats?.totalDonations || adminStatsData.totalDonations || 0,
        totalContests: dashboardData.stats?.totalContests || adminStatsData.totalContests || 0,
        pendingApprovals: dashboardData.stats?.pendingApprovals || adminStatsData.pendingArtworks || 0,
        activeHelpers: dashboardData.stats?.activeHelpers || 0,
        totalArtworks: dashboardData.stats?.totalArtworks || adminStatsData.totalArtworks || 0,
        totalCourses: dashboardData.stats?.totalCourses || 0,
        totalEvents: dashboardData.stats?.totalEvents || adminStatsData.totalEvents || 0,
        totalProducts: dashboardData.stats?.totalProducts || 0,
        usersByType: adminStatsData.usersByType || {
          artist: dashboardData.stats?.totalArtists || 0,
          patron: dashboardData.stats?.totalPatrons || 0,
          church: dashboardData.stats?.totalChurches || 0,
          admin: dashboardData.stats?.totalAdmins || 0,
        },
        topArtists: adminStatsData.topArtists || [],
        recentUsers: adminStatsData.recentUsers || [],
        monthlyRevenue: adminStatsData.monthlyRevenue || 0,
        activeUsers: adminStatsData.activeUsers || 0,
      }

      setStats(mergedStats)
      setRecentActivity(dashboardData.recentActivity || [])

      if (!dashboardResponse.ok && !adminStatsResponse.ok) {
        setError("Failed to fetch dashboard data from both sources")
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError("Could not connect to the server")
    } finally {
      setLoading(false)
    }
  }

  const fetchPendingApprovals = async () => {
    try {
      const response = await fetch("/api/admin/approvals", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const data = await response.json()
        setPendingApprovals(data.approvals || [])
      }
    } catch (error) {
      console.error("Error fetching pending approvals:", error)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDashboardData()
    await fetchPendingApprovals()
    setRefreshing(false)
  }

  const handleApprove = async (id, type) => {
    try {
      const response = await fetch(`/api/admin/approvals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      })

      if (response.ok) {
        setPendingApprovals((prev) => prev.filter((item) => item.id !== id))
        await handleRefresh()
      }
    } catch (error) {
      console.error("Error approving item:", error)
    }
  }

  const handleReject = async (id, type) => {
    try {
      const response = await fetch(`/api/admin/approvals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject" }),
      })

      if (response.ok) {
        setPendingApprovals((prev) => prev.filter((item) => item.id !== id))
        await handleRefresh()
      }
    } catch (error) {
      console.error("Error rejecting item:", error)
    }
  }

  const handleUserAction = (user, action) => {
    setSelectedUser(user)
    setActionType(action)
    setUserActionDialog(true)
  }

  const executeUserAction = async () => {
    try {
      const response = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: actionType,
          isActive: actionType === "activate",
          isBanned: actionType === "ban",
          banReason: actionType === "ban" ? "Administrative action" : undefined,
        }),
      })

      if (response.ok) {
        await handleRefresh()
      }
    } catch (error) {
      console.error(`Error ${actionType} user:`, error)
    } finally {
      setUserActionDialog(false)
      setSelectedUser(null)
      setActionType("")
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "user_registration":
        return <Users className="h-4 w-4 text-blue-500" />
      case "artwork_submission":
        return <ImageIcon className="h-4 w-4 text-purple-500" />
      case "donation":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "contest":
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case "course":
        return <BookOpen className="h-4 w-4 text-cyan-500" />
      case "event":
        return <Calendar className="h-4 w-4 text-pink-500" />
      case "product":
        return <ShoppingBag className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>
      case "approved":
        return <Badge className="bg-green-500 text-white">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-500 text-white">Rejected</Badge>
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
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
            <Button onClick={fetchDashboardData}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 p-8 text-white mb-8">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-300 text-lg">
                Complete administrative control for Redeemed Creative Arts platform 🛡️
              </p>
              {error && (
                <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                  Error: {error}
                </div>
              )}
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
              <Button
                onClick={handleRefresh}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh Data"}
              </Button>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Bell className="h-4 w-4 mr-2" />
                Alerts ({stats.pendingApprovals})
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

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-xs text-blue-100">
                        <span className="w-2 h-2 rounded-full bg-white/60"></span>
                        Artists: {stats.totalArtists}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-blue-100">
                        <span className="w-2 h-2 rounded-full bg-white/60"></span>
                        Patrons: {stats.totalPatrons}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-white hover:bg-white/20"
                      onClick={() => router.push("/admin/users")}
                    >
                      View All
                    </Button>
                  </div>
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
                  <p className="text-purple-100 text-sm font-medium">Total Artworks</p>
                  <p className="text-3xl font-bold">{stats.totalArtworks}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1 text-xs text-purple-100">
                      <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                      Pending: {stats.pendingApprovals}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-white hover:bg-white/20"
                      onClick={() => router.push("/admin/artworks")}
                    >
                      View All
                    </Button>
                  </div>
                </div>
                <ImageIcon className="h-8 w-8 text-purple-200" />
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Donations</p>
                  <p className="text-3xl font-bold">${stats.totalDonations.toLocaleString()}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-green-100">Active campaigns: 3</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-white hover:bg-white/20"
                      onClick={() => router.push("/admin/donations")}
                    >
                      View All
                    </Button>
                  </div>
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
                  <p className="text-3xl font-bold">{stats.pendingApprovals}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-orange-100">Requires attention</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-white hover:bg-white/20"
                      onClick={() => router.push("/admin/approvals")}
                    >
                      Review
                    </Button>
                  </div>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-200" />
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">Coming soon</p>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/admin/courses")}>
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">Platform events</p>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/admin/events")}>
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <ShoppingBag className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">Coming soon</p>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/admin/products")}>
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contests</CardTitle>
              <Trophy className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContests}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">Platform contests</p>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/admin/contests")}>
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white/80 backdrop-blur-sm shadow-sm rounded-lg p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Breakdown */}
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    User Distribution
                  </CardTitle>
                  <CardDescription>Distribution of user types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(stats.usersByType).map(([type, count]) => (
                      <div key={type} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {type === "artist" && <Palette className="h-4 w-4 text-blue-500" />}
                            {type === "patron" && <Heart className="h-4 w-4 text-green-500" />}
                            {type === "church" && <Building className="h-4 w-4 text-purple-500" />}
                            {type === "admin" && <Shield className="h-4 w-4 text-red-500" />}
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
                                  : type === "church"
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                    : "bg-gradient-to-r from-red-500 to-orange-500"
                            }`}
                            style={{
                              width: stats.totalUsers ? `${(count / stats.totalUsers) * 100}%` : "0%",
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-green-600" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Latest platform activities</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRefresh}>
                    <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {recentActivity.length > 0 ? (
                      recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm">{activity.description}</p>
                              {activity.status && getStatusBadge(activity.status)}
                            </div>
                            <p className="text-xs text-gray-500">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-gray-500">No recent activity</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Activity will appear here as users interact with the platform
                        </p>
                      </div>
                    )}
                  </div>
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
                  {stats.topArtists?.length > 0 ? (
                    stats.topArtists.map((artist, index) => (
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
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No artist data available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used administrative actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => router.push("/admin/users/create")}
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    Add New User
                  </Button>
                  <Button onClick={() => router.push("/admin/approvals")} variant="outline">
                    Review Approvals ({stats.pendingApprovals})
                  </Button>
                  <Button onClick={() => router.push("/admin/reports")} variant="outline">
                    View Reports
                  </Button>
                  <Button onClick={() => router.push("/admin/settings")} variant="outline">
                    System Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <Palette className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold text-blue-600">{stats.usersByType?.artist || 0}</h3>
                  <p className="text-blue-600 font-medium">Artists</p>
                  <p className="text-sm text-gray-600 mt-2">Creative professionals</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-green-600">{stats.usersByType?.patron || 0}</h3>
                  <p className="text-green-600 font-medium">Patrons</p>
                  <p className="text-sm text-gray-600 mt-2">Art supporters</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <Building className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold text-purple-600">{stats.usersByType?.church || 0}</h3>
                  <p className="text-purple-600 font-medium">Churches</p>
                  <p className="text-sm text-gray-600 mt-2">Ministry organizations</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 mx-auto text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-red-600">{stats.usersByType?.admin || 0}</h3>
                  <p className="text-red-600 font-medium">Admins</p>
                  <p className="text-sm text-gray-600 mt-2">System administrators</p>
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
                  {stats.recentUsers?.length > 0 ? (
                    stats.recentUsers.map((user) => (
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
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user, user.isActive ? "suspend" : "activate")}
                            >
                              {user.isActive ? "Suspend" : "Activate"}
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleUserAction(user, "ban")}>
                              Ban
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No recent users to display</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button onClick={() => router.push("/admin/users")} className="bg-amber-500 hover:bg-amber-600">
                      View All Users
                    </Button>
                    <Button onClick={() => router.push("/admin/users/create")} variant="outline">
                      Create User
                    </Button>
                    <Button onClick={() => router.push("/admin/users/export")} variant="outline">
                      Export Users
                    </Button>
                    <Button onClick={() => router.push("/admin/users/permissions")} variant="outline">
                      Manage Permissions
                    </Button>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-3">User Management Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-amber-500" />
                        <span>Ban or suspend user accounts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-amber-500" />
                        <span>Reset user passwords</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-amber-500" />
                        <span>Modify user roles and permissions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-amber-500" />
                        <span>View user activity logs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-amber-500" />
                        <span>Manage verification status</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => router.push("/admin/artworks")} className="bg-amber-500 hover:bg-amber-600">
                Manage Artworks
              </Button>
              <Button onClick={() => router.push("/admin/courses")} variant="outline">
                Manage Courses
              </Button>
              <Button onClick={() => router.push("/admin/events")} variant="outline">
                Manage Events
              </Button>
              <Button onClick={() => router.push("/admin/products")} variant="outline">
                Manage Products
              </Button>
              <Button onClick={() => router.push("/admin/contests")} variant="outline">
                Manage Contests
              </Button>
              <Button onClick={() => router.push("/admin/featured")} variant="outline">
                Featured Content
              </Button>
              <Button onClick={() => router.push("/admin/resources")} variant="outline">
                Resources
              </Button>
              <Button onClick={() => router.push("/admin/content/bulk")} variant="outline">
                Bulk Actions
              </Button>
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
                    <span className="font-medium">{stats.totalArtworks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Review</span>
                    <span className="font-medium text-yellow-600">{stats.pendingApprovals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Events</span>
                    <span className="font-medium">{stats.totalEvents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Users</span>
                    <span className="font-medium">{stats.activeUsers}</span>
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

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Content Moderation Tools</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <span>Review and approve new content</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <span>Flag inappropriate content</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <span>Feature high-quality content</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <span>Bulk edit or delete content</span>
                </li>
              </ul>
            </div>
          </TabsContent>

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
                  <h3 className="text-2xl font-bold text-green-600">${stats.totalDonations}</h3>
                  <p className="text-green-600 font-medium">Total Donations</p>
                  <p className="text-sm text-gray-600 mt-2">All-time platform donations</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold text-blue-600">${stats.monthlyRevenue}</h3>
                  <p className="text-blue-600 font-medium">This Month</p>
                  <p className="text-sm text-gray-600 mt-2">Current month revenue</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold text-purple-600">{stats.totalEvents}</h3>
                  <p className="text-purple-600 font-medium">Active Events</p>
                  <p className="text-sm text-gray-600 mt-2">Platform-wide events</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                  <h3 className="text-2xl font-bold text-orange-600">
                    $
                    {stats.totalDonations && stats.totalUsers ? Math.round(stats.totalDonations / stats.totalUsers) : 0}
                  </h3>
                  <p className="text-orange-600 font-medium">Avg per User</p>
                  <p className="text-sm text-gray-600 mt-2">Average donation amount</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Donation Management</CardTitle>
                <DollarSign className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => router.push("/admin/donations")} className="bg-amber-500 hover:bg-amber-600">
                    View All Donations
                  </Button>
                  <Button onClick={() => router.push("/admin/campaigns/create")} variant="outline">
                    Create Campaign
                  </Button>
                  <Button onClick={() => router.push("/admin/matching-funds")} variant="outline">
                    Matching Funds
                  </Button>
                  <Button onClick={() => router.push("/admin/donations/reports")} variant="outline">
                    Donation Reports
                  </Button>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Financial Management Tools</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-amber-500" />
                      <span>Process refunds and adjustments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-amber-500" />
                      <span>Generate financial reports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-amber-500" />
                      <span>Manage payment methods</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-amber-500" />
                      <span>Set up recurring donations</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

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

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platform Analytics</CardTitle>
                <BarChart3 className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => router.push("/admin/analytics/users")}
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    User Analytics
                  </Button>
                  <Button onClick={() => router.push("/admin/analytics/content")} variant="outline">
                    Content Analytics
                  </Button>
                  <Button onClick={() => router.push("/admin/analytics/financial")} variant="outline">
                    Financial Analytics
                  </Button>
                  <Button onClick={() => router.push("/admin/analytics/performance")} variant="outline">
                    Performance Metrics
                  </Button>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Analytics Dashboard</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-center text-sm text-gray-500">
                      <BarChart3 className="h-16 w-16 mx-auto text-amber-500 opacity-50 mb-2" />
                      <p>Interactive analytics dashboard will be displayed here</p>
                      <p className="mt-2">
                        <Button variant="link" size="sm" className="text-amber-500">
                          View Full Analytics
                        </Button>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Notifications</CardTitle>
                <Bell className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => router.push("/admin/notifications")}
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    View All Notifications
                  </Button>
                  <Button onClick={() => router.push("/admin/notifications/create")} variant="outline">
                    Send Notification
                  </Button>
                  <Button onClick={() => router.push("/admin/notifications/templates")} variant="outline">
                    Notification Templates
                  </Button>
                  <Button onClick={() => router.push("/admin/notifications/settings")} variant="outline">
                    Notification Settings
                  </Button>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Recent System Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Bell className="h-4 w-4 text-amber-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">System Maintenance</p>
                        <p className="text-xs text-gray-500">Scheduled maintenance completed successfully</p>
                      </div>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Bell className="h-4 w-4 text-amber-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New Feature Deployed</p>
                        <p className="text-xs text-gray-500">Enhanced artwork upload functionality</p>
                      </div>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Bell className="h-4 w-4 text-amber-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Security Alert</p>
                        <p className="text-xs text-gray-500">Multiple failed login attempts detected</p>
                      </div>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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

            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Settings</CardTitle>
                <Settings className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => router.push("/admin/settings/general")}
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    General Settings
                  </Button>
                  <Button onClick={() => router.push("/admin/settings/email")} variant="outline">
                    Email Templates
                  </Button>
                  <Button onClick={() => router.push("/admin/settings/payment")} variant="outline">
                    Payment Settings
                  </Button>
                  <Button onClick={() => router.push("/admin/settings/security")} variant="outline">
                    Security Settings
                  </Button>
                  <Button onClick={() => router.push("/admin/settings/integrations")} variant="outline">
                    Integrations
                  </Button>
                  <Button onClick={() => router.push("/admin/settings/appearance")} variant="outline">
                    Appearance
                  </Button>
                  <Button onClick={() => router.push("/admin/settings/backup")} variant="outline">
                    Backup & Restore
                  </Button>
                  <Button onClick={() => router.push("/admin/settings/logs")} variant="outline">
                    System Logs
                  </Button>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Advanced Settings</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-amber-500" />
                        <span>Maintenance Mode</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-amber-500" />
                        <span>API Access</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-amber-500" />
                        <span>Database Management</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Metrics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-600" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
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

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Database Status</h3>
                  <div className="space-y-4">
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
                  </div>
                </div>
              </CardContent>
            </Card>
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
