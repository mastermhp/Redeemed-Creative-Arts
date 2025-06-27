"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Star,
  Ban,
  UserX,
  Edit,
} from "lucide-react"

export default function AdminDashboard() {
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@redeemedcreativearts.com",
    userType: "admin",
    points: { current: 0, level: "admin" },
  })

  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalArtists: 342,
    totalPatrons: 678,
    totalChurches: 227,
    totalDonations: 45620,
    pendingApprovals: 12,
    activeContests: 8,
    systemHealth: 98,
    totalArtworks: 1847,
    flaggedContent: 5,
    monthlyGrowth: 15.2,
    revenueThisMonth: 12450,
  })

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

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      userType: "artist",
      tier: "tier2",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      points: 2450,
      artworks: 24,
      earnings: 3240,
    },
    {
      id: 2,
      name: "David Thompson",
      email: "david@example.com",
      userType: "patron",
      tier: "tier2",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "1 day ago",
      points: 1850,
      donated: 5420,
      supported: 12,
    },
    {
      id: 3,
      name: "Grace Community Church",
      email: "admin@gracechurch.org",
      userType: "church",
      tier: "tier1",
      status: "active",
      joinDate: "2024-01-05",
      lastActive: "5 hours ago",
      points: 980,
      events: 15,
      raised: 8420,
    },
    {
      id: 4,
      name: "Michael Chen",
      email: "michael@example.com",
      userType: "artist",
      tier: "tier1",
      status: "suspended",
      joinDate: "2024-01-01",
      lastActive: "1 week ago",
      points: 1200,
      artworks: 8,
      earnings: 890,
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
    if (actionType === "ban") {
      setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? { ...u, status: "banned" } : u)))
    } else if (actionType === "suspend") {
      setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? { ...u, status: "suspended" } : u)))
    } else if (actionType === "activate") {
      setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? { ...u, status: "active" } : u)))
    }
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
                  System Health: {stats.systemHealth}%
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
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
                      <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                      <p className="text-blue-100 text-xs">+{stats.monthlyGrowth}% this month</p>
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
                      <p className="text-3xl font-bold">${stats.totalDonations.toLocaleString()}</p>
                      <p className="text-green-100 text-xs">+18% this month</p>
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
                      <p className="text-purple-100 text-sm font-medium">System Health</p>
                      <p className="text-3xl font-bold">{stats.systemHealth}%</p>
                      <p className="text-purple-100 text-xs">All systems operational</p>
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
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Patrons</span>
                      </div>
                      <span className="text-sm font-medium">{stats.totalPatrons}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${(stats.totalPatrons / stats.totalUsers) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Artists</span>
                      </div>
                      <span className="text-sm font-medium">{stats.totalArtists}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                        style={{ width: `${(stats.totalArtists / stats.totalUsers) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Churches</span>
                      </div>
                      <span className="text-sm font-medium">{stats.totalChurches}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${(stats.totalChurches / stats.totalUsers) * 100}%` }}
                      ></div>
                    </div>
                  </div>
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

            {/* Pending Approvals */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-600" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Submitter</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {item.type.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.submitter}</TableCell>
                        <TableCell>{getTierBadge(item.tier)}</TableCell>
                        <TableCell>{item.submittedAt}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApprove(item.id, item.type)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(item.id, item.type)}
                              className="bg-transparent"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                  <h3 className="text-2xl font-bold text-blue-600">{stats.totalArtists}</h3>
                  <p className="text-blue-600 font-medium">Artists</p>
                  <p className="text-sm text-gray-600 mt-2">+15 this month</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-green-600">{stats.totalPatrons}</h3>
                  <p className="text-green-600 font-medium">Patrons</p>
                  <p className="text-sm text-gray-600 mt-2">+28 this month</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <Building className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold text-purple-600">{stats.totalChurches}</h3>
                  <p className="text-purple-600 font-medium">Churches</p>
                  <p className="text-sm text-gray-600 mt-2">+8 this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Users Table */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getUserTypeIcon(user.userType)}
                            <span className="capitalize">{user.userType}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getTierBadge(user.tier)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400" />
                            <span>{user.points}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>Joined: {user.joinDate}</p>
                            <p className="text-gray-500">Last: {user.lastActive}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user, "edit")}
                              className="bg-transparent"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            {user.status === "active" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUserAction(user, "suspend")}
                                className="bg-transparent text-yellow-600 hover:bg-yellow-50"
                              >
                                <UserX className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUserAction(user, "activate")}
                                className="bg-transparent text-green-600 hover:bg-green-50"
                              >
                                <UserCheck className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user, "ban")}
                              className="bg-transparent text-red-600 hover:bg-red-50"
                            >
                              <Ban className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                    <span className="font-medium">{stats.totalArtworks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Review</span>
                    <span className="font-medium text-yellow-600">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flagged Content</span>
                    <span className="font-medium text-red-600">{stats.flaggedContent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Contests</span>
                    <span className="font-medium">{stats.activeContests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Approved Today</span>
                    <span className="font-medium text-green-600">15</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Flag className="h-5 w-5 mr-2 text-red-600" />
                    Recent Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Inappropriate artwork reported</p>
                      <p className="text-xs text-gray-500">2 hours ago • Reported by 3 users</p>
                    </div>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Review
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Spam comment detected</p>
                      <p className="text-xs text-gray-500">4 hours ago • Auto-flagged</p>
                    </div>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Review
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Contest entry flagged</p>
                      <p className="text-xs text-gray-500">1 day ago • Copyright concern</p>
                    </div>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Review
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
                  <h3 className="text-2xl font-bold text-green-600">${stats.totalDonations.toLocaleString()}</h3>
                  <p className="text-green-600 font-medium">Total Donations</p>
                  <p className="text-sm text-gray-600 mt-2">All-time platform donations</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold text-blue-600">${stats.revenueThisMonth.toLocaleString()}</h3>
                  <p className="text-blue-600 font-medium">This Month</p>
                  <p className="text-sm text-gray-600 mt-2">+18% vs last month</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold text-purple-600">127</h3>
                  <p className="text-purple-600 font-medium">Active Campaigns</p>
                  <p className="text-sm text-gray-600 mt-2">Across all churches</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                  <h3 className="text-2xl font-bold text-orange-600">$127</h3>
                  <p className="text-orange-600 font-medium">Average Donation</p>
                  <p className="text-sm text-gray-600 mt-2">+$12 vs last month</p>
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
