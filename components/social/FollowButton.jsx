"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/hooks/useAuth"
import { useToast } from "@/lib/hooks/use-toast"
import { UserPlus, UserMinus, Loader2 } from "lucide-react"

export default function FollowButton({ userId, initialFollowing = false, onFollowChange }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const [loading, setLoading] = useState(false)

  const handleFollow = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to follow users",
        variant: "destructive",
      })
      return
    }

    if (user._id === userId) {
      toast({
        title: "Invalid action",
        description: "You cannot follow yourself",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          action: isFollowing ? "unfollow" : "follow",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsFollowing(data.following)
        onFollowChange?.(data.following)

        toast({
          title: "Success",
          description: data.message,
        })
      } else {
        throw new Error(data.error || "Failed to update follow status")
      }
    } catch (error) {
      console.error("Follow error:", error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user || user._id === userId) {
    return null
  }

  return (
    <Button
      onClick={handleFollow}
      disabled={loading}
      variant={isFollowing ? "outline" : "default"}
      size="sm"
      className={`transition-all duration-300 ${
        isFollowing
          ? "border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      }`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isFollowing ? (
        <>
          <UserMinus className="h-4 w-4 mr-2" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4 mr-2" />
          Follow
        </>
      )}
    </Button>
  )
}
