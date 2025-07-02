"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Palette,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Download,
  Star,
  Search,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
  Database,
  Server,
  UserCheck,
  UserX,
  UserPlus,
  Crown,
  Church,
  Brush,
  HandHeart,
  Ban,
  CheckCheck,
  Plus,
  FileText,
  ImageIcon,
  Archive,
  Award,
  CalculatorIcon as Calc,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Dashboard data state
  const [dashboardData, setDashboardData] = useState({
    users: { total: 0, artists: 0, patrons: 0, churches: 0, admins: 0, active: 0, suspended: 0, banned: 0 },
    content: { artworks: 0, events: 0, courses: 0, contests: 0, approved: 0, pending: 0, rejected: 0 },
    financial: { totalDonations: 0, monthlyRevenue: 0, averagePerUser: 0, successRate: 0 },
    system: { uptime: 0, performance: 0, storage: 0, apiCalls: 0 },
    recent: { users: [], artworks: [], donations: [], activities: [] },
  })

  // User management state
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [userFilter, setUserFilter] = useState("all")
  const [userSearch, setUserSearch] = useState("")
  const [userSort, setUserSort] = useState("newest")
  const [userPage, setUserPage] = useState(1)
  const [userLimit] = useState(20)
  const [totalUsers, setTotalUsers] = useState(0)

  // Content management state
  const [artworks, setArtworks] = useState([])
  const [selectedArtworks, setSelectedArtworks] = useState([])
  const [artworkFilter, setArtworkFilter] = useState("all")
  const [artworkSearch, setArtworkSearch] = useState("")
  const [artworkSort, setArtworkSort] = useState("newest")
  const [artworkPage, setArtworkPage] = useState(1)
  const [artworkLimit] = useState(20)
  const [totalArtworks, setTotalArtworks] = useState(0)

  // Financial management state
  const [donations, setDonations] = useState([])
  const [selectedDonations, setSelectedDonations] = useState([])
  const [donationFilter, setDonationFilter] = useState("all")
  const [donationSearch, setDonationSearch] = useState("")
  const [donationSort, setDonationSort] = useState("newest")
  const [donationPage, setDonationPage] = useState(1)
  const [donationLimit] = useState(20)
  const [totalDonations, setTotalDonations] = useState(0)

  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    twoFactorRequired: false,
    sessionTimeout: 30,
    maxFileSize: 10,
    allowedFileTypes: ["jpg", "jpeg", "png", "gif", "pdf"],
    rateLimit: 100,
    backupFrequency: "daily",
    logLevel: "info",
  })

  // Analytics state
  const [analytics, setAnalytics] = useState({
    userGrowth: [],
    contentGrowth: [],
    revenueGrowth: [],
    engagementMetrics: [],
    topArtists: [],
    topPatrons: [],
    popularContent: [],
    systemMetrics: [],
  })

  // Dialog states
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showArtworkDialog, setShowArtworkDialog] = useState(false)
  const [showDonationDialog, setShowDonationDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [showBulkActionDialog, setShowBulkActionDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [bulkAction, setBulkAction] = useState("")

  // Form states
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    userType: "artist",
    status: "active",
    bio: "",
    location: "",
    website: "",
    socialMedia: { instagram: "", twitter: "", facebook: "" },
  })

  const [artworkForm, setArtworkForm] = useState({
    title: "",
    description: "",
    category: "",
    medium: "",
    tags: "",
    status: "pending",
    featured: false,
    price: 0,
    forSale: false,
  })

  const [donationForm, setDonationForm] = useState({
    amount: 0,
    donor: "",
    recipient: "",
    campaign: "",
    status: "completed",
    anonymous: false,
    message: "",
  })

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")

      // Fetch from multiple endpoints and merge data
      const [dashboardRes, statsRes] = await Promise.all([
        fetch("/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/dashboard/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      let dashboardData = {}
      let statsData = {}

      if (dashboardRes.ok) {
        dashboardData = await dashboardRes.json()
      }

      if (statsRes.ok) {
        statsData = await statsRes.json()
      }

      // Merge data with fallbacks
      const mergedData = {
        users: {
          total: dashboardData.users?.total || statsData.users?.total || 0,
          artists: dashboardData.users?.artists || statsData.users?.artists || 0,
          patrons: dashboardData.users?.patrons || statsData.users?.patrons || 0,
          churches: dashboardData.users?.churches || statsData.users?.churches || 0,
          admins: dashboardData.users?.admins || statsData.users?.admins || 0,
          active: dashboardData.users?.active || statsData.users?.active || 0,
          suspended: dashboardData.users?.suspended || statsData.users?.suspended || 0,
          banned: dashboardData.users?.banned || statsData.users?.banned || 0,
        },
        content: {
          artworks: dashboardData.content?.artworks || statsData.content?.artworks || 0,
          events: dashboardData.content?.events || statsData.content?.events || 0,
          courses: dashboardData.content?.courses || statsData.content?.courses || 0,
          contests: dashboardData.content?.contests || statsData.content?.contests || 0,
          approved: dashboardData.content?.approved || statsData.content?.approved || 0,
          pending: dashboardData.content?.pending || statsData.content?.pending || 0,
          rejected: dashboardData.content?.rejected || statsData.content?.rejected || 0,
        },
        financial: {
          totalDonations: dashboardData.financial?.totalDonations || statsData.financial?.totalDonations || 0,
          monthlyRevenue: dashboardData.financial?.monthlyRevenue || statsData.financial?.monthlyRevenue || 0,
          averagePerUser: dashboardData.financial?.averagePerUser || statsData.financial?.averagePerUser || 0,
          successRate: dashboardData.financial?.successRate || statsData.financial?.successRate || 0,
        },
        system: {
          uptime: dashboardData.system?.uptime || statsData.system?.uptime || 99.9,
          performance: dashboardData.system?.performance || statsData.system?.performance || 85,
          storage: dashboardData.system?.storage || statsData.system?.storage || 45,
          apiCalls: dashboardData.system?.apiCalls || statsData.system?.apiCalls || 12500,
        },
        recent: {
          users: dashboardData.recent?.users || statsData.recent?.users || [],
          artworks: dashboardData.recent?.artworks || statsData.recent?.artworks || [],
          donations: dashboardData.recent?.donations || statsData.recent?.donations || [],
          activities: dashboardData.recent?.activities || statsData.recent?.activities || [],
        },
      }

      setDashboardData(mergedData)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  // Fetch users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const params = new URLSearchParams({
        page: userPage.toString(),
        limit: userLimit.toString(),
        filter: userFilter,
        search: userSearch,
        sort: userSort,
      })

      const response = await fetch(`/api/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || [])
        setTotalUsers(data.total || 0)
      } else {
        throw new Error("Failed to fetch users")
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      setError("Failed to load users")
    }
  }

  // Fetch artworks
  const fetchArtworks = async () => {
    try {
      const token = localStorage.getItem("token")
      const params = new URLSearchParams({
        page: artworkPage.toString(),
        limit: artworkLimit.toString(),
        filter: artworkFilter,
        search: artworkSearch,
        sort: artworkSort,
      })

      const response = await fetch(`/api/admin/artworks?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setArtworks(data.artworks || [])
        setTotalArtworks(data.total || 0)
      } else {
        throw new Error("Failed to fetch artworks")
      }
    } catch (error) {
      console.error("Error fetching artworks:", error)
      setError("Failed to load artworks")
    }
  }

  // Fetch donations
  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token")
      const params = new URLSearchParams({
        page: donationPage.toString(),
        limit: donationLimit.toString(),
        filter: donationFilter,
        search: donationSearch,
        sort: donationSort,
      })

      const response = await fetch(`/api/admin/donations?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setDonations(data.donations || [])
        setTotalDonations(data.total || 0)
      } else {
        throw new Error("Failed to fetch donations")
      }
    } catch (error) {
      console.error("Error fetching donations:", error)
      setError("Failed to load donations")
    }
  }

  // User management functions
  const handleUserAction = async (userId, action) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      })

      if (response.ok) {
        setSuccess(`User ${action} successfully`)
        fetchUsers()
        fetchDashboardData()
      } else {
        throw new Error(`Failed to ${action} user`)
      }
    } catch (error) {
      console.error(`Error ${action} user:`, error)
      setError(`Failed to ${action} user`)
    }
  }

  const handleBulkUserAction = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/users/bulk", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userIds: selectedUsers,
          action: bulkAction,
        }),
      })

      if (response.ok) {
        setSuccess(`Bulk ${bulkAction} completed successfully`)
        setSelectedUsers([])
        setShowBulkActionDialog(false)
        fetchUsers()
        fetchDashboardData()
      } else {
        throw new Error(`Failed to perform bulk ${bulkAction}`)
      }
    } catch (error) {
      console.error(`Error performing bulk ${bulkAction}:`, error)
      setError(`Failed to perform bulk ${bulkAction}`)
    }
  }

  // Artwork management functions
  const handleArtworkAction = async (artworkId, action) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/artworks/${artworkId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      })

      if (response.ok) {
        setSuccess(`Artwork ${action} successfully`)
        fetchArtworks()
        fetchDashboardData()
      } else {
        throw new Error(`Failed to ${action} artwork`)
      }
    } catch (error) {
      console.error(`Error ${action} artwork:`, error)
      setError(`Failed to ${action} artwork`)
    }
  }

  // System settings functions
  const handleSettingsUpdate = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(systemSettings),
      })

      if (response.ok) {
        setSuccess("Settings updated successfully")
        setShowSettingsDialog(false)
      } else {
        throw new Error("Failed to update settings")
      }
    } catch (error) {
      console.error("Error updating settings:", error)
      setError("Failed to update settings")
    }
  }

  // Export functions
  const handleExportData = async (type) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/export/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${type}-export-${new Date().toISOString().split("T")[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        setSuccess(`${type} data exported successfully`)
      } else {
        throw new Error(`Failed to export ${type} data`)
      }
    } catch (error) {
      console.error(`Error exporting ${type} data:`, error)
      setError(`Failed to export ${type} data`)
    }
  }

  // Utility functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
      case "rejected":
        return "bg-red-100 text-red-800"
      case "banned":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUserTypeIcon = (userType) => {
    switch (userType) {
      case "artist":
        return <Brush className="h-4 w-4" />
      case "patron":
        return <HandHeart className="h-4 w-4" />
      case "church":
        return <Church className="h-4 w-4" />
      case "admin":
        return <Crown className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  // Effects
  useEffect(() => {
    fetchDashboardData()
  }, [])

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers()
    } else if (activeTab === "content") {
      fetchArtworks()
    } else if (activeTab === "financial") {
      fetchDonations()
    }
  }, [
    activeTab,
    userPage,
    userFilter,
    userSearch,
    userSort,
    artworkPage,
    artworkFilter,
    artworkSearch,
    artworkSort,
    donationPage,
    donationFilter,
    donationSearch,
    donationSort,
  ])

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("")
        setSuccess("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6 py-32">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your platform from here</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => fetchDashboardData()} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setShowSettingsDialog(true)} variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.users.total.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{dashboardData.users.active} active users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
                <Palette className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.content.artworks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{dashboardData.content.pending} pending approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(dashboardData.financial.totalDonations)}</div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(dashboardData.financial.monthlyRevenue)} this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.system.uptime}%</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.system.apiCalls.toLocaleString()} API calls today
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Breakdown</CardTitle>
                <CardDescription>Distribution of user types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brush className="h-4 w-4 text-blue-500" />
                    <span>Artists</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{dashboardData.users.artists}</span>
                    <Badge variant="secondary">
                      {((dashboardData.users.artists / dashboardData.users.total) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HandHeart className="h-4 w-4 text-green-500" />
                    <span>Patrons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{dashboardData.users.patrons}</span>
                    <Badge variant="secondary">
                      {((dashboardData.users.patrons / dashboardData.users.total) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Church className="h-4 w-4 text-purple-500" />
                    <span>Churches</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{dashboardData.users.churches}</span>
                    <Badge variant="secondary">
                      {((dashboardData.users.churches / dashboardData.users.total) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    <span>Admins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{dashboardData.users.admins}</span>
                    <Badge variant="secondary">
                      {((dashboardData.users.admins / dashboardData.users.total) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>System Uptime</span>
                    <span className="font-medium">{dashboardData.system.uptime}%</span>
                  </div>
                  <Progress value={dashboardData.system.uptime} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Performance Score</span>
                    <span className="font-medium">{dashboardData.system.performance}%</span>
                  </div>
                  <Progress value={dashboardData.system.performance} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Storage Usage</span>
                    <span className="font-medium">{dashboardData.system.storage}%</span>
                  </div>
                  <Progress value={dashboardData.system.storage} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>User Engagement</span>
                    <span className="font-medium">
                      {((dashboardData.users.active / dashboardData.users.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={(dashboardData.users.active / dashboardData.users.total) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recent.users.length > 0 ? (
                    dashboardData.recent.users.slice(0, 5).map((user, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getUserTypeIcon(user.userType)}
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(user.createdAt)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No recent users</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Artworks</CardTitle>
                <CardDescription>Latest artwork submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recent.artworks.length > 0 ? (
                    dashboardData.recent.artworks.slice(0, 5).map((artwork, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Palette className="h-4 w-4" />
                          <div>
                            <p className="font-medium">{artwork.title}</p>
                            <p className="text-sm text-muted-foreground">by {artwork.artist?.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(artwork.status)}>{artwork.status}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(artwork.createdAt)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No recent artworks</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* User Management Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">User Management</h2>
              <p className="text-muted-foreground">Manage platform users and their permissions</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => handleExportData("users")} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setShowUserDialog(true)} size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          {/* User Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user-search">Search Users</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="user-search"
                      placeholder="Search by name or email..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-filter">Filter by Type</Label>
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="artist">Artists</SelectItem>
                      <SelectItem value="patron">Patrons</SelectItem>
                      <SelectItem value="church">Churches</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-status">Filter by Status</Label>
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-sort">Sort by</Label>
                  <Select value={userSort} onValueChange={setUserSort}>
                    <SelectTrigger>
                      <SelectValue placeholder="Newest First" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="name-desc">Name Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""} selected
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => {
                        setBulkAction("activate")
                        setShowBulkActionDialog(true)
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                    <Button
                      onClick={() => {
                        setBulkAction("suspend")
                        setShowBulkActionDialog(true)
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <UserX className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                    <Button
                      onClick={() => {
                        setBulkAction("ban")
                        setShowBulkActionDialog(true)
                      }}
                      variant="destructive"
                      size="sm"
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Ban
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Users Table */}
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedUsers.length === users.length && users.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedUsers(users.map((user) => user._id))
                          } else {
                            setSelectedUsers([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user._id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUsers([...selectedUsers, user._id])
                            } else {
                              setSelectedUsers(selectedUsers.filter((id) => id !== user._id))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            {getUserTypeIcon(user.userType)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.userType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>{formatDate(user.lastActive || user.updatedAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            onClick={() => {
                              setSelectedItem(user)
                              setShowUserDialog(true)
                            }}
                            variant="ghost"
                            size="sm"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedItem(user)
                              setUserForm({
                                name: user.name,
                                email: user.email,
                                userType: user.userType,
                                status: user.status,
                                bio: user.bio || "",
                                location: user.location || "",
                                website: user.website || "",
                                socialMedia: user.socialMedia || { instagram: "", twitter: "", facebook: "" },
                              })
                              setShowUserDialog(true)
                            }}
                            variant="ghost"
                            size="sm"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.status === "active" ? (
                            <Button onClick={() => handleUserAction(user._id, "suspend")} variant="ghost" size="sm">
                              <UserX className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button onClick={() => handleUserAction(user._id, "activate")} variant="ghost" size="sm">
                              <UserCheck className="h-4 w-4" />
                            </Button>
                          )}
                          <Button onClick={() => handleUserAction(user._id, "ban")} variant="ghost" size="sm">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {(userPage - 1) * userLimit + 1} to {Math.min(userPage * userLimit, totalUsers)} of{" "}
                  {totalUsers} users
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setUserPage(Math.max(1, userPage - 1))}
                    disabled={userPage === 1}
                    variant="outline"
                    size="sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {userPage} of {Math.ceil(totalUsers / userLimit)}
                  </span>
                  <Button
                    onClick={() => setUserPage(Math.min(Math.ceil(totalUsers / userLimit), userPage + 1))}
                    disabled={userPage >= Math.ceil(totalUsers / userLimit)}
                    variant="outline"
                    size="sm"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          {/* Content Management Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Content Management</h2>
              <p className="text-muted-foreground">Manage artworks, events, and other content</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => handleExportData("artworks")} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setShowArtworkDialog(true)} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </div>
          </div>

          {/* Content Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
                <Palette className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.content.artworks}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.content.pending}</div>
                <p className="text-xs text-muted-foreground">Requires review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured Content</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Currently featured</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.2K</div>
                <p className="text-xs text-muted-foreground">+8% from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="artwork-search">Search Content</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="artwork-search"
                      placeholder="Search by title or artist..."
                      value={artworkSearch}
                      onChange={(e) => setArtworkSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artwork-filter">Filter by Status</Label>
                  <Select value={artworkFilter} onValueChange={setArtworkFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Content" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Content</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artwork-category">Filter by Category</Label>
                  <Select value={artworkFilter} onValueChange={setArtworkFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="painting">Painting</SelectItem>
                      <SelectItem value="sculpture">Sculpture</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="digital">Digital Art</SelectItem>
                      <SelectItem value="mixed-media">Mixed Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artwork-sort">Sort by</Label>
                  <Select value={artworkSort} onValueChange={setArtworkSort}>
                    <SelectTrigger>
                      <SelectValue placeholder="Newest First" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="title">Title A-Z</SelectItem>
                      <SelectItem value="title-desc">Title Z-A</SelectItem>
                      <SelectItem value="views">Most Viewed</SelectItem>
                      <SelectItem value="likes">Most Liked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedArtworks.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedArtworks.length} artwork{selectedArtworks.length > 1 ? "s" : ""} selected
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => {
                        setBulkAction("approve")
                        setShowBulkActionDialog(true)
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <CheckCheck className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        setBulkAction("reject")
                        setShowBulkActionDialog(true)
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => {
                        setBulkAction("feature")
                        setShowBulkActionDialog(true)
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Feature
                    </Button>
                    <Button
                      onClick={() => {
                        setBulkAction("delete")
                        setShowBulkActionDialog(true)
                      }}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Artworks Table */}
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedArtworks.length === artworks.length && artworks.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedArtworks(artworks.map((artwork) => artwork._id))
                          } else {
                            setSelectedArtworks([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Artwork</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artworks.map((artwork) => (
                    <TableRow key={artwork._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedArtworks.includes(artwork._id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedArtworks([...selectedArtworks, artwork._id])
                            } else {
                              setSelectedArtworks(selectedArtworks.filter((id) => id !== artwork._id))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            {artwork.images && artwork.images.length > 0 ? (
                              <img
                                src={artwork.images[0].url || "/placeholder.svg"}
                                alt={artwork.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{artwork.title}</p>
                            <p className="text-sm text-muted-foreground">{artwork.description?.substring(0, 50)}...</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Brush className="h-4 w-4" />
                          <span>{artwork.artist?.name || "Unknown Artist"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{artwork.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(artwork.status)}>{artwork.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{artwork.engagement?.views || 0}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(artwork.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            onClick={() => {
                              setSelectedItem(artwork)
                              setShowArtworkDialog(true)
                            }}
                            variant="ghost"
                            size="sm"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleArtworkAction(artwork._id, "approve")}
                            variant="ghost"
                            size="sm"
                            disabled={artwork.status === "approved"}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleArtworkAction(artwork._id, "reject")}
                            variant="ghost"
                            size="sm"
                            disabled={artwork.status === "rejected"}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => handleArtworkAction(artwork._id, "feature")} variant="ghost" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {(artworkPage - 1) * artworkLimit + 1} to{" "}
                  {Math.min(artworkPage * artworkLimit, totalArtworks)} of {totalArtworks} artworks
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setArtworkPage(Math.max(1, artworkPage - 1))}
                    disabled={artworkPage === 1}
                    variant="outline"
                    size="sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {artworkPage} of {Math.ceil(totalArtworks / artworkLimit)}
                  </span>
                  <Button
                    onClick={() => setArtworkPage(Math.min(Math.ceil(totalArtworks / artworkLimit), artworkPage + 1))}
                    disabled={artworkPage >= Math.ceil(totalArtworks / artworkLimit)}
                    variant="outline"
                    size="sm"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          {/* Financial Management Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Financial Management</h2>
              <p className="text-muted-foreground">Monitor donations, transactions, and revenue</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => handleExportData("donations")} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setShowDonationDialog(true)} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>

          {/* Financial Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(dashboardData.financial.totalDonations)}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(dashboardData.financial.monthlyRevenue)}</div>
                <p className="text-xs text-muted-foreground">Current month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
                <Calc className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(dashboardData.financial.averagePerUser)}</div>
                <p className="text-xs text-muted-foreground">Per transaction</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.financial.successRate}%</div>
                <p className="text-xs text-muted-foreground">Payment success</p>
              </CardContent>
            </Card>
          </div>

          {/* Donation Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donation-search">Search Donations</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="donation-search"
                      placeholder="Search by donor or recipient..."
                      value={donationSearch}
                      onChange={(e) => setDonationSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donation-filter">Filter by Status</Label>
                  <Select value={donationFilter} onValueChange={setDonationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Donations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Donations</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donation-amount">Filter by Amount</Label>
                  <Select value={donationFilter} onValueChange={setDonationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Amounts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Amounts</SelectItem>
                      <SelectItem value="small">Under $50</SelectItem>
                      <SelectItem value="medium">$50 - $200</SelectItem>
                      <SelectItem value="large">$200 - $500</SelectItem>
                      <SelectItem value="major">Over $500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donation-sort">Sort by</Label>
                  <Select value={donationSort} onValueChange={setDonationSort}>
                    <SelectTrigger>
                      <SelectValue placeholder="Newest First" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="amount-high">Highest Amount</SelectItem>
                      <SelectItem value="amount-low">Lowest Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donations Table */}
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation._id}>
                      <TableCell className="font-mono text-sm">{donation._id.substring(0, 8)}...</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <HandHeart className="h-4 w-4" />
                          <span>{donation.donor?.name || "Anonymous"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Brush className="h-4 w-4" />
                          <span>{donation.recipient?.name || "General Fund"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(donation.amount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
                      </TableCell>
                      <TableCell>{formatDateTime(donation.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            onClick={() => {
                              setSelectedItem(donation)
                              setShowDonationDialog(true)
                            }}
                            variant="ghost"
                            size="sm"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              // Handle refund
                            }}
                            variant="ghost"
                            size="sm"
                            disabled={donation.status !== "completed"}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {(donationPage - 1) * donationLimit + 1} to{" "}
                  {Math.min(donationPage * donationLimit, totalDonations)} of {totalDonations} donations
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setDonationPage(Math.max(1, donationPage - 1))}
                    disabled={donationPage === 1}
                    variant="outline"
                    size="sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {donationPage} of {Math.ceil(totalDonations / donationLimit)}
                  </span>
                  <Button
                    onClick={() =>
                      setDonationPage(Math.min(Math.ceil(totalDonations / donationLimit), donationPage + 1))
                    }
                    disabled={donationPage >= Math.ceil(totalDonations / donationLimit)}
                    variant="outline"
                    size="sm"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Analytics & Reports</h2>
              <p className="text-muted-foreground">Detailed insights and performance metrics</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => handleExportData("analytics")} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="h-8 w-8 mr-2" />
                  Chart placeholder - User growth data
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue and donation patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <LineChart className="h-8 w-8 mr-2" />
                  Chart placeholder - Revenue trends
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Engagement</CardTitle>
                <CardDescription>Views, likes, and shares distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <PieChart className="h-8 w-8 mr-2" />
                  Chart placeholder - Content engagement
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Most successful artists and content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>Top Artist</span>
                    </div>
                    <span className="font-medium">Sarah Johnson</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Most Liked</span>
                    </div>
                    <span className="font-medium">"Divine Light" - 1.2K likes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span>Most Viewed</span>
                    </div>
                    <span className="font-medium">"Sacred Geometry" - 5.8K views</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span>Top Donor</span>
                    </div>
                    <span className="font-medium">Grace Community Church</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">System Administration</h2>
              <p className="text-muted-foreground">System settings, security, and maintenance</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setShowSettingsDialog(true)} variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>

          {/* System Health */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Server Status</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Online</div>
                <p className="text-xs text-muted-foreground">Uptime: {dashboardData.system.uptime}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Database</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Healthy</div>
                <p className="text-xs text-muted-foreground">Response time: 45ms</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage</CardTitle>
                <Archive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.system.storage}%</div>
                <p className="text-xs text-muted-foreground">Used of 1TB capacity</p>
              </CardContent>
            </Card>
          </div>

          {/* System Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.twoFactorRequired}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, twoFactorRequired: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.registrationEnabled}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, registrationEnabled: checked })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, sessionTimeout: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rate Limit (requests/minute)</Label>
                  <Input
                    type="number"
                    value={systemSettings.rateLimit}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, rateLimit: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>General system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Put system in maintenance mode</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, maintenanceMode: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send system email notifications</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.emailNotifications}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, emailNotifications: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max File Size (MB)</Label>
                  <Input
                    type="number"
                    value={systemSettings.maxFileSize}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, maxFileSize: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Select
                    value={systemSettings.backupFrequency}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, backupFrequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Actions */}
          <Card>
            <CardHeader>
              <CardTitle>System Actions</CardTitle>
              <CardDescription>Perform system maintenance and administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                  <Database className="h-6 w-6 mb-2" />
                  Backup Database
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                  <RefreshCw className="h-6 w-6 mb-2" />
                  Clear Cache
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                  <FileText className="h-6 w-6 mb-2" />
                  View Logs
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                  <Shield className="h-6 w-6 mb-2" />
                  Security Scan
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                  <Activity className="h-6 w-6 mb-2" />
                  Performance Test
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                  <Archive className="h-6 w-6 mb-2" />
                  Archive Old Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}

      {/* User Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedItem ? "User Details" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {selectedItem ? "View and edit user information" : "Create a new user account"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Name</Label>
              <Input
                id="user-name"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email">Email</Label>
              <Input
                id="user-email"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-type">User Type</Label>
              <Select
                value={userForm.userType}
                onValueChange={(value) => setUserForm({ ...userForm, userType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artist">Artist</SelectItem>
                  <SelectItem value="patron">Patron</SelectItem>
                  <SelectItem value="church">Church</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-status">Status</Label>
              <Select value={userForm.status} onValueChange={(value) => setUserForm({ ...userForm, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="user-bio">Bio</Label>
              <Textarea
                id="user-bio"
                value={userForm.bio}
                onChange={(e) => setUserForm({ ...userForm, bio: e.target.value })}
                placeholder="Enter user bio"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle user save
                setShowUserDialog(false)
              }}
            >
              {selectedItem ? "Update User" : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Action Dialog */}
      <Dialog open={showBulkActionDialog} onOpenChange={setShowBulkActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Bulk Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to {bulkAction} the selected items? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkActionDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleBulkUserAction}
              variant={bulkAction === "delete" || bulkAction === "ban" ? "destructive" : "default"}
            >
              Confirm {bulkAction}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>System Settings</DialogTitle>
            <DialogDescription>Configure system-wide settings and preferences</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.twoFactorRequired}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, twoFactorRequired: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, sessionTimeout: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">General</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Put system in maintenance mode</p>
                  </div>
                  <Checkbox
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, maintenanceMode: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max File Size (MB)</Label>
                  <Input
                    type="number"
                    value={systemSettings.maxFileSize}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, maxFileSize: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSettingsUpdate}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
