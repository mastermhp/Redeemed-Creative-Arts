"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  CheckCircle,
  XCircle,
  Clock,
  ImageIcon,
  BookOpen,
  Calendar,
  ShoppingBag,
  Eye,
  RefreshCw,
  Filter,
} from "lucide-react"
import Image from "next/image"

export default function AdminApprovalsPage() {
  const [approvals, setApprovals] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })
  const [selectedItem, setSelectedItem] = useState(null)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    fetchApprovals()
  }, [filter, pagination.page])

  const fetchApprovals = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        type: filter,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      const response = await fetch(`/api/admin/approvals?${params}`)
      const data = await response.json()

      if (response.ok) {
        setApprovals(data.approvals)
        setPagination((prev) => ({
          ...prev,
          total: data.pagination.total,
          pages: data.pagination.pages,
        }))
      } else {
        console.error("Failed to fetch approvals:", data.error)
      }
    } catch (error) {
      console.error("Error fetching approvals:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async (id, type, action, reason = "") => {
    try {
      const response = await fetch("/api/admin/approvals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          type,
          action,
          reason,
        }),
      })

      if (response.ok) {
        fetchApprovals()
        setShowPreviewDialog(false)
        setShowRejectDialog(false)
        setRejectionReason("")
      } else {
        const data = await response.json()
        alert(data.error || `Failed to ${action} item`)
      }
    } catch (error) {
      console.error(`Error ${action} item:`, error)
      alert(`Failed to ${action} item`)
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "artwork":
        return <ImageIcon className="h-5 w-5 text-purple-500" />
      case "course":
        return <BookOpen className="h-5 w-5 text-blue-500" />
      case "event":
        return <Calendar className="h-5 w-5 text-green-500" />
      case "product":
        return <ShoppingBag className="h-5 w-5 text-orange-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeBadge = (type) => {
    const colors = {
      artwork: "bg-purple-500",
      course: "bg-blue-500",
      event: "bg-green-500",
      product: "bg-orange-500",
    }

    return <Badge className={colors[type] || "bg-gray-500"}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>
  }

  const getItemTitle = (item) => {
    return item.title || item.name || "Untitled"
  }

  const getItemImage = (item) => {
    return item.imageUrl || item.image || "/placeholder.svg?height=64&width=64"
  }

  const getSubmitterName = (item) => {
    return (
      item.submitter?.name ||
      item.artist?.name ||
      item.instructor?.name ||
      item.organizer?.name ||
      item.seller?.name ||
      "Unknown"
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Approval Queue</h1>
            <p className="text-gray-600">Review and approve pending content submissions</p>
          </div>
          <Button onClick={fetchApprovals} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pending</p>
                  <p className="text-2xl font-bold">{pagination.total}</p>
                </div>
                <Clock className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Artworks</p>
                  <p className="text-2xl font-bold">{approvals.filter((a) => a.type === "artwork").length}</p>
                </div>
                <ImageIcon className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Courses</p>
                  <p className="text-2xl font-bold">{approvals.filter((a) => a.type === "course").length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Events</p>
                  <p className="text-2xl font-bold">{approvals.filter((a) => a.type === "event").length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Products</p>
                  <p className="text-2xl font-bold">{approvals.filter((a) => a.type === "product").length}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Card className="mb-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="artworks">Artworks</SelectItem>
                  <SelectItem value="courses">Courses</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="products">Products</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={fetchApprovals} className="bg-amber-500 hover:bg-amber-600">
                Apply Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Approvals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvals.map((item) => (
            <Card
              key={`${item.type}-${item._id}`}
              className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  {getTypeBadge(item.type)}
                  <div className="flex items-center gap-2">{getTypeIcon(item.type)}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={getItemImage(item) || "/placeholder.svg"}
                    alt={getItemTitle(item)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{getItemTitle(item)}</h3>
                  <p className="text-sm text-gray-600">by {getSubmitterName(item)}</p>
                  {item.description && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Submitted {new Date(item.createdAt).toLocaleDateString()}</span>
                  {item.price && <span>${item.price}</span>}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedItem(item)
                      setShowPreviewDialog(true)
                    }}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApproval(item._id, item.type, "approve")}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setSelectedItem(item)
                      setShowRejectDialog(true)
                    }}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {approvals.length === 0 && (
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
              <p className="text-gray-600">No pending approvals at the moment.</p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.pages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.pages}
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
            >
              Next
            </Button>
          </div>
        )}

        {/* Preview Dialog */}
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Content Preview</DialogTitle>
              <DialogDescription>Review content details before approval</DialogDescription>
            </DialogHeader>
            {selectedItem && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={getItemImage(selectedItem) || "/placeholder.svg"}
                      alt={getItemTitle(selectedItem)}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeBadge(selectedItem.type)}
                      {getTypeIcon(selectedItem.type)}
                    </div>
                    <h3 className="text-xl font-bold">{getItemTitle(selectedItem)}</h3>
                    <p className="text-gray-600">by {getSubmitterName(selectedItem)}</p>
                  </div>
                  <div className="space-y-2">
                    {selectedItem.category && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Category:</span>
                        <Badge variant="outline">{selectedItem.category}</Badge>
                      </div>
                    )}
                    {selectedItem.price && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Price:</span>
                        <span>${selectedItem.price}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Submitted:</span>
                      <span>{new Date(selectedItem.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {selectedItem.description && (
                    <div>
                      <span className="font-medium">Description:</span>
                      <p className="text-gray-600 mt-1">{selectedItem.description}</p>
                    </div>
                  )}
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => handleApproval(selectedItem._id, selectedItem.type, "approve")}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        setShowPreviewDialog(false)
                        setShowRejectDialog(true)
                      }}
                      variant="destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Content</DialogTitle>
              <DialogDescription>Please provide a reason for rejecting this content</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">Rejection Reason</Label>
                <Textarea
                  id="reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter reason for rejection..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedItem) {
                    handleApproval(selectedItem._id, selectedItem.type, "reject", rejectionReason)
                  }
                }}
                variant="destructive"
              >
                Reject Content
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
