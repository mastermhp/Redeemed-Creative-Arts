"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/hooks/useAuth"
import { useToast } from "@/lib/hooks/use-toast"
import FollowButton from "./FollowButton"
import { Users, UserPlus, Heart, Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function FollowList({ userId, userName }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("following")
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [pagination, setPagination] = useState({
    following: { currentPage: 1, hasNextPage: false },
    followers: { currentPage: 1, hasNextPage: false },
  })

  useEffect(() => {
    if (userId) {
      fetchFollows("following")
      fetchFollows("followers")
    }
  }, [userId])

  const fetchFollows = async (type, page = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/follow?type=${type}&userId=${userId}&page=${page}&limit=20`, {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()

        if (type === "following") {
          setFollowing(page === 1 ? data.users : [...following, ...data.users])
        } else {
          setFollowers(page === 1 ? data.users : [...followers, ...data.users])
        }

        setPagination((prev) => ({
          ...prev,
          [type]: {
            currentPage: data.pagination.currentPage,
            hasNextPage: data.pagination.hasNextPage,
          },
        }))
      }
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error)
      toast({
        title: "Error",
        description: `Failed to load ${type}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadMore = (type) => {
    const nextPage = pagination[type].currentPage + 1
    fetchFollows(type, nextPage)
  }

  const handleFollowChange = (targetUserId, isFollowing) => {
    // Update local state when follow status changes
    if (isFollowing) {
      // Add to following list if current user is viewing their own profile
      if (user && user._id === userId) {
        // This would need the user data to add to following list
        // For now, we'll just refresh the data
        fetchFollows("following")
      }
    } else {
      // Remove from following list
      setFollowing((prev) => prev.filter((u) => u._id !== targetUserId))
    }
  }

  const getUserTypeColor = (userType) => {
    switch (userType) {
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

  const filterUsers = (users) => {
    if (!searchTerm) return users
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userType.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const UserCard = ({ user: followUser, showFollowButton = true }) => (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
        {followUser.profileImage ? (
          <img
            src={followUser.profileImage || "/placeholder.svg"}
            alt={followUser.name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <Users className="w-6 h-6 text-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{followUser.name}</h4>
        <div className="flex items-center space-x-2 mt-1">
          <Badge className={`text-xs ${getUserTypeColor(followUser.userType)}`}>{followUser.userType}</Badge>
          {followUser.location && <span className="text-xs text-gray-500 truncate">{followUser.location}</span>}
        </div>
        {followUser.bio && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{followUser.bio}</p>}
        {followUser.followedAt && (
          <p className="text-xs text-gray-400 mt-1">Followed {new Date(followUser.followedAt).toLocaleDateString()}</p>
        )}
      </div>

      {showFollowButton && (
        <FollowButton
          userId={followUser._id}
          initialFollowing={false}
          onFollowChange={(isFollowing) => handleFollowChange(followUser._id, isFollowing)}
        />
      )}
    </div>
  )

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          {userName ? `${userName}'s Network` : "User Network"}
        </CardTitle>
        <CardDescription>Connect with other members of our creative community</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="following" className="flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Following ({following.length})
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Followers ({followers.length})
            </TabsTrigger>
          </TabsList>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <TabsContent value="following" className="space-y-4">
            {loading && following.length === 0 ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filterUsers(following).length > 0 ? (
              <>
                <div className="space-y-3">
                  {filterUsers(following).map((followUser) => (
                    <UserCard key={followUser._id} user={followUser} />
                  ))}
                </div>

                {pagination.following.hasNextPage && (
                  <div className="text-center">
                    <Button onClick={() => loadMore("following")} variant="outline" disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Load More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "No users found" : "Not following anyone yet"}
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Start following other artists, patrons, and churches to build your network"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="followers" className="space-y-4">
            {loading && followers.length === 0 ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filterUsers(followers).length > 0 ? (
              <>
                <div className="space-y-3">
                  {filterUsers(followers).map((follower) => (
                    <UserCard key={follower._id} user={follower} showFollowButton={user && user._id !== follower._id} />
                  ))}
                </div>

                {pagination.followers.hasNextPage && (
                  <div className="text-center">
                    <Button onClick={() => loadMore("followers")} variant="outline" disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Load More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "No users found" : "No followers yet"}
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Share great content and engage with the community to gain followers"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
