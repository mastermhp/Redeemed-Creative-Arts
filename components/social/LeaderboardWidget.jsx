"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Crown, Medal, Star, Users, TrendingUp, Loader2 } from "lucide-react"

export default function LeaderboardWidget({ compact = false }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("monthly")
  const [userType, setUserType] = useState("all")
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  useEffect(() => {
    fetchLeaderboard()
  }, [period, userType, year, month])

  const fetchLeaderboard = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        period,
        userType,
        year: year.toString(),
        limit: compact ? "5" : "50",
      })

      if (period === "monthly") {
        params.append("month", month.toString())
      }

      const response = await fetch(`/api/leaderboard?${params}`, {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data.leaderboard)
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-orange-500" />
      default:
        return <span className="text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getUserTypeColor = (type) => {
    switch (type) {
      case "artist":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "patron":
        return "bg-green-100 text-green-800 border-green-200"
      case "church":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatPoints = (points) => {
    return points?.toLocaleString() || "0"
  }

  if (compact) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
            Top Contributors
          </CardTitle>
          <CardDescription>This month's leaders</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((entry) => (
                <div key={entry.user.id} className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">{getRankIcon(entry.rank)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{entry.user.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getUserTypeColor(entry.user.userType)}`}>
                        {entry.user.userType}
                      </Badge>
                      <span className="text-xs text-gray-500">{formatPoints(entry.points)} pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
              Community Leaderboard
            </CardTitle>
            <CardDescription>Top contributors in our creative community</CardDescription>
          </div>
          <Button onClick={fetchLeaderboard} disabled={loading} variant="outline" size="sm">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingUp className="h-4 w-4" />}
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="artist">Artists</SelectItem>
              <SelectItem value="patron">Patrons</SelectItem>
              <SelectItem value="church">Churches</SelectItem>
            </SelectContent>
          </Select>

          {period === "monthly" && (
            <Select value={month.toString()} onValueChange={(value) => setMonth(Number.parseInt(value))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {new Date(2024, i).toLocaleDateString("en-US", { month: "long" })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select value={year.toString()} onValueChange={(value) => setYear(Number.parseInt(value))}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }, (_, i) => {
                const currentYear = new Date().getFullYear()
                const yearOption = currentYear - i
                return (
                  <SelectItem key={yearOption} value={yearOption.toString()}>
                    {yearOption}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="leaderboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leaderboard">Rankings</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                    </div>
                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.user.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                      entry.rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-center w-10 h-10">{getRankIcon(entry.rank)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 truncate">{entry.user.name}</h4>
                        <Badge className={`text-xs ${getUserTypeColor(entry.user.userType)}`}>
                          {entry.user.userType}
                        </Badge>
                      </div>
                      {entry.user.location && <p className="text-sm text-gray-500 truncate">{entry.user.location}</p>}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold text-gray-900">{formatPoints(entry.points)}</span>
                      </div>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No rankings yet</h3>
                <p className="text-gray-600">Be the first to earn points and claim the top spot!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(stats).map(([type, data]) => (
                <Card key={type} className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="h-5 w-5 text-gray-600 mr-2" />
                        <span className="font-medium text-gray-900 capitalize">{type}s</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{data.totalUsers}</p>
                          <p className="text-xs text-gray-500">Total Users</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-blue-600">{formatPoints(data.totalPoints)}</p>
                          <p className="text-xs text-gray-500">Total Points</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">{formatPoints(data.averagePoints)}</p>
                          <p className="text-xs text-gray-500">Average Points</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-600">{formatPoints(data.topScore)}</p>
                          <p className="text-xs text-gray-500">Top Score</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
