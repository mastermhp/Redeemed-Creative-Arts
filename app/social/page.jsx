"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/hooks/useAuth"
import FollowList from "@/components/social/FollowList"
import InviteUserDialog from "@/components/social/InviteUserDialog"
import LeaderboardWidget from "@/components/social/LeaderboardWidget"
import { Users, UserPlus, Trophy, Gift, Star } from "lucide-react"

export default function SocialPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-32">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Community Hub
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow artists, patrons, and churches. Build your network and grow together in faith and
            creativity.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4">
          <InviteUserDialog
            trigger={
              <div className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Invite Friends
              </div>
            }
          />
        </div>

        <Tabs defaultValue="network" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
            <TabsTrigger value="network" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Users className="h-4 w-4 mr-2" />
              My Network
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Trophy className="h-4 w-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="invitations" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              <UserPlus className="h-4 w-4 mr-2" />
              Invitations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="space-y-6">
            {user ? (
              <FollowList userId={user._id} userName={user.name} />
            ) : (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Sign in to view your network</h3>
                  <p className="text-gray-600">Connect with other community members and build your creative network</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <LeaderboardWidget />
          </TabsContent>

          <TabsContent value="invitations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Send Invitations */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="h-5 w-5 mr-2 text-green-600" />
                    Send Invitations
                  </CardTitle>
                  <CardDescription>Invite friends to join our creative community and earn points</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-3">Invitation Rewards</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">Church invitation</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="font-medium text-green-800">1,000 points</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">Artist/Patron invitation</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="font-medium text-green-800">50 points</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">When they reach 200 points</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="font-medium text-green-800">+50 points</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">Premium upgrade bonus</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="font-medium text-green-800">+200 points</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <InviteUserDialog />
                </CardContent>
              </Card>

              {/* Invitation History */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-2 text-blue-600" />
                    Invitation History
                  </CardTitle>
                  <CardDescription>Track your sent invitations and earned rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No invitations sent yet</h3>
                        <p className="text-gray-600 mb-4">
                          Start inviting friends to earn points and grow our community
                        </p>
                        <InviteUserDialog
                          trigger={
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer inline-flex items-center">
                              <UserPlus className="h-4 w-4 mr-2" />
                              Send Your First Invitation
                            </div>
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to view invitations</h3>
                      <p className="text-gray-600">Track your invitation history and earned rewards</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
