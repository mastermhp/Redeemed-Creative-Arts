"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/lib/hooks/use-toast"
import { UserPlus, Loader2, Mail, Gift } from "lucide-react"

export default function InviteUserDialog({ trigger }) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    userType: "",
    message: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/invitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Invitation sent!",
          description: `Invitation sent to ${formData.email}. You'll earn points when they join!`,
        })
        setOpen(false)
        setFormData({ email: "", userType: "", message: "" })
      } else {
        throw new Error(data.error || "Failed to send invitation")
      }
    } catch (error) {
      console.error("Invitation error:", error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getPointsReward = (userType) => {
    switch (userType) {
      case "church":
        return "1,000 points"
      case "artist":
      case "patron":
        return "50 points + milestone bonuses"
      default:
        return "Points vary by type"
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2 text-blue-600" />
            Invite Someone to Join
          </DialogTitle>
          <DialogDescription>
            Invite friends to join our creative community and earn points when they sign up!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="friend@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="userType">Account Type</Label>
            <Select
              value={formData.userType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, userType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="artist">
                  <div className="flex items-center justify-between w-full">
                    <span>Artist</span>
                    <span className="text-xs text-green-600 ml-2">+50 pts</span>
                  </div>
                </SelectItem>
                <SelectItem value="patron">
                  <div className="flex items-center justify-between w-full">
                    <span>Patron</span>
                    <span className="text-xs text-green-600 ml-2">+50 pts</span>
                  </div>
                </SelectItem>
                <SelectItem value="church">
                  <div className="flex items-center justify-between w-full">
                    <span>Church</span>
                    <span className="text-xs text-green-600 ml-2">+1,000 pts</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Add a personal message to your invitation..."
              rows={3}
            />
          </div>

          {formData.userType && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <Gift className="h-4 w-4 text-green-600 mr-2" />
                <span className="font-medium text-green-800">Reward Preview</span>
              </div>
              <p className="text-sm text-green-700">
                You'll earn <strong>{getPointsReward(formData.userType)}</strong> when they join!
              </p>
              {formData.userType !== "church" && (
                <p className="text-xs text-green-600 mt-1">+ Additional 200 points when they upgrade to premium</p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.email || !formData.userType}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitation
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
