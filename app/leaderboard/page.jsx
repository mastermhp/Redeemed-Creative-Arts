"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LeaderboardWidget from "@/components/social/LeaderboardWidget"
import InviteUserDialog from "@/components/social/InviteUserDialog"
import { Trophy, Users, Gift, Star, TrendingUp, Award } from "lucide-react"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-32">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Community Leaderboard
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrate our most active community members and see how you rank among fellow creators, supporters, and
            churches
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-purple-200" />
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-purple-200 text-sm">Active Members</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <div className="text-2xl font-bold">2.4M</div>
              <div className="text-blue-200 text-sm">Points Earned</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Gift className="h-8 w-8 mx-auto mb-3 text-green-200" />
              <div className="text-2xl font-bold">156</div>
              <div className="text-green-200 text-sm">Invitations Sent</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-orange-200" />
              <div className="text-2xl font-bold">+18%</div>
              <div className="text-orange-200 text-sm">Growth This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <LeaderboardWidget />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Invite Users */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-green-600" />
                  Earn More Points
                </CardTitle>
                <CardDescription>Invite friends and earn points when they join</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Invitation Rewards</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Church: 1,000 points</li>
                    <li>• Artist/Patron: 50 points + bonuses</li>
                    <li>• Premium upgrade: +200 points</li>
                  </ul>
                </div>

                <InviteUserDialog
                  trigger={
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      <Gift className="h-4 w-4 mr-2" />
                      Invite Someone
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            {/* Point System Info */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-600" />
                  How to Earn Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Daily login</span>
                    <span className="font-medium text-green-600">+5 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Upload artwork</span>
                    <span className="font-medium text-green-600">+20 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Receive donation</span>
                    <span className="font-medium text-green-600">+10 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comment on artwork</span>
                    <span className="font-medium text-green-600">+3 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Get comment upvote</span>
                    <span className="font-medium text-green-600">+1 pt</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Follow someone</span>
                    <span className="font-medium text-green-600">+2 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Get followed</span>
                    <span className="font-medium text-green-600">+5 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-purple-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">Top Artist</p>
                      <p className="text-xs text-gray-600">Sarah M. - December 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Gift className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Top Patron</p>
                      <p className="text-xs text-gray-600">John D. - December 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Most Active Church</p>
                      <p className="text-xs text-gray-600">Grace Community - December 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
