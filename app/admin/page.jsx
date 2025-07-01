"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  DollarSign,
  Trophy,
  AlertCircle,
  BarChart3,
  Settings,
  ImageIcon,
  BookOpen,
  Calendar,
  ShoppingBag,
  Bell,
  Shield,
  RefreshCw,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    totalPatrons: 0,
    totalChurches: 0,
    totalDonations: 0,
    totalContests: 0,
    pendingApprovals: 0,
    activeHelpers: 0,
    totalArtworks: 0,
    totalCourses: 0,
    totalEvents: 0,
    totalProducts: 0,
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("Fetching dashboard data...")

      const response = await fetch("/api/admin/dashboard")
      console.log("Response status:", response.status)

      const data = await response.json()
      console.log("Response data:", data)

      if (response.ok) {
        setStats(data.stats)
        setRecentActivity(data.recentActivity || [])
      } else {
        setError(data.error || "Failed to fetch dashboard data")
        // Set default stats even on error
        setStats(
          data.stats || {
            totalUsers: 0,
            totalArtists: 0,
            totalPatrons: 0,
            totalChurches: 0,
            totalDonations: 0,
            totalContests: 0,
            pendingApprovals: 0,
            activeHelpers: 0,
            totalArtworks: 0,
            totalCourses: 0,
            totalEvents: 0,
            totalProducts: 0,
          },
        )
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError("Could not connect to the server")
      // Set default stats on error
      setStats({
        totalUsers: 0,
        totalArtists: 0,
        totalPatrons: 0,
        totalChurches: 0,
        totalDonations: 0,
        totalContests: 0,
        pendingApprovals: 0,
        activeHelpers: 0,
        totalArtworks: 0,
        totalCourses: 0,
        totalEvents: 0,
        totalProducts: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDashboardData()
    setRefreshing(false)
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
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
      case "approved":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Approved</span>
      case "rejected":
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Rejected</span>
      default:
        return null
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Complete administrative control for Redeemed Creative Arts platform</p>
            {error && (
              <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                Error: {error}
              </div>
            )}
          </div>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Artists: {stats.totalArtists}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Patrons: {stats.totalPatrons}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/admin/users")}>
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
              <ImageIcon className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArtworks}</div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  Pending: {stats.pendingApprovals}
                </div>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/admin/artworks")}>
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalDonations.toLocaleString()}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">Active campaigns: 3</p>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/admin/donations")}>
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">Requires attention</p>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/admin/approvals")}>
                  Review
                </Button>
              </div>
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
                <p className="text-xs text-muted-foreground">Coming soon</p>
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
                <p className="text-xs text-muted-foreground">Coming soon</p>
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
                  <CardTitle>User Breakdown</CardTitle>
                  <CardDescription>Distribution of user types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Artists</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-amber-500 h-2.5 rounded-full"
                            style={{
                              width: stats.totalUsers ? `${(stats.totalArtists / stats.totalUsers) * 100}%` : "0%",
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{stats.totalArtists}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Patrons</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-amber-500 h-2.5 rounded-full"
                            style={{
                              width: stats.totalUsers ? `${(stats.totalPatrons / stats.totalUsers) * 100}%` : "0%",
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{stats.totalPatrons}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Churches</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-amber-500 h-2.5 rounded-full"
                            style={{
                              width: stats.totalUsers ? `${(stats.totalChurches / stats.totalUsers) * 100}%` : "0%",
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{stats.totalChurches}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Admins</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-amber-500 h-2.5 rounded-full"
                            style={{
                              width: stats.totalUsers ? `${(stats.totalAdmins / stats.totalUsers) * 100}%` : "0%",
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{stats.totalAdmins}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
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
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage all platform content</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
