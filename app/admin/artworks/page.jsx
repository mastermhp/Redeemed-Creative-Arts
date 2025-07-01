"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageIcon, Search, Filter, Eye, Check, X, Star, Trash2, RefreshCw } from "lucide-react"
import Image from "next/image"

export default function AdminArtworksPage() {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    status: "all", // Updated default value to 'all'
    category: "all", // Updated default value to 'all'
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)

  useEffect(() => {
    fetchArtworks()
  }, [filters, pagination.page])

  const fetchArtworks = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...filters,
      })

      const response = await fetch(`/api/admin/artworks?${params}`)
      const data = await response.json()

      if (response.ok) {
        setArtworks(data.artworks)
        setPagination((prev) => ({
          ...prev,
          total: data.pagination.total,
          pages: data.pagination.pages,
        }))
      } else {
        console.error("Failed to fetch artworks:", data.error)
      }
    } catch (error) {
      console.error("Error fetching artworks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleArtworkAction = async (artworkId, action, data = {}) => {
    try {
      let response

      if (action === "delete") {
        response = await fetch(`/api/admin/artworks/${artworkId}`, {
          method: "DELETE",
        })
      } else {
        const updateData = { ...data }

        if (action === "approve") {
          updateData.status = "approved"
        } else if (action === "reject") {
          updateData.status = "rejected"
        } else if (action === "feature") {
          updateData.featured = true
        } else if (action === "unfeature") {
          updateData.featured = false
        }

        response = await fetch(`/api/admin/artworks/${artworkId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        })
      }

      if (response.ok) {
        fetchArtworks()
        setShowPreviewDialog(false)
      } else {
        const data = await response.json()
        alert(data.error || `Failed to ${action} artwork`)
      }
    } catch (error) {
      console.error(`Error ${action} artwork:`, error)
      alert(`Failed to ${action} artwork`)
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-500",
      approved: "bg-green-500",
      rejected: "bg-red-500",
    }

    return <Badge className={colors[status] || "bg-gray-500"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const getCategoryBadge = (category) => {
    const colors = {
      painting: "bg-purple-500",
      sculpture: "bg-blue-500",
      digital: "bg-cyan-500",
      photography: "bg-green-500",
      mixed: "bg-orange-500",
    }

    return (
      <Badge variant="outline" className={`border-2 ${colors[category] || "border-gray-500"}`}>
        {category}
      </Badge>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Artwork Management</h1>
            <p className="text-gray-600">Review and manage all artwork submissions</p>
          </div>
          <Button onClick={fetchArtworks} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search artworks..."
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                  <SelectItem value="sculpture">Sculpture</SelectItem>
                  <SelectItem value="digital">Digital Art</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="mixed">Mixed Media</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={fetchArtworks} className="bg-amber-500 hover:bg-amber-600">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Artworks Table */}
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Artworks ({pagination.total})
            </CardTitle>
            <CardDescription>
              Showing {artworks.length} of {pagination.total} artworks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artworks.map((artwork) => (
                    <TableRow key={artwork._id}>
                      <TableCell>
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                          {artwork.imageUrl ? (
                            <Image
                              src={artwork.imageUrl || "/placeholder.svg"}
                              alt={artwork.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{artwork.title}</TableCell>
                      <TableCell>{artwork.artist?.name || "Unknown"}</TableCell>
                      <TableCell>{getCategoryBadge(artwork.category)}</TableCell>
                      <TableCell>{getStatusBadge(artwork.status)}</TableCell>
                      <TableCell>${artwork.price || 0}</TableCell>
                      <TableCell>{new Date(artwork.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedArtwork(artwork)
                              setShowPreviewDialog(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {artwork.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 hover:text-green-700 bg-transparent"
                                onClick={() => handleArtworkAction(artwork._id, "approve")}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                                onClick={() => handleArtworkAction(artwork._id, "reject")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {artwork.status === "approved" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-yellow-600 hover:text-yellow-700 bg-transparent"
                              onClick={() =>
                                handleArtworkAction(artwork._id, artwork.featured ? "unfeature" : "feature")
                              }
                            >
                              <Star className={`h-4 w-4 ${artwork.featured ? "fill-current" : ""}`} />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this artwork?")) {
                                handleArtworkAction(artwork._id, "delete")
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.pages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === pagination.pages}
                  onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artwork Preview Dialog */}
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Artwork Preview</DialogTitle>
              <DialogDescription>Review artwork details and take action</DialogDescription>
            </DialogHeader>
            {selectedArtwork && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                    {selectedArtwork.imageUrl ? (
                      <Image
                        src={selectedArtwork.imageUrl || "/placeholder.svg"}
                        alt={selectedArtwork.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedArtwork.title}</h3>
                    <p className="text-gray-600">by {selectedArtwork.artist?.name || "Unknown Artist"}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span>
                      {getStatusBadge(selectedArtwork.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Category:</span>
                      {getCategoryBadge(selectedArtwork.category)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Price:</span>
                      <span>${selectedArtwork.price || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Featured:</span>
                      <Badge variant={selectedArtwork.featured ? "default" : "secondary"}>
                        {selectedArtwork.featured ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Submitted:</span>
                      <span>{new Date(selectedArtwork.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {selectedArtwork.description && (
                    <div>
                      <span className="font-medium">Description:</span>
                      <p className="text-gray-600 mt-1">{selectedArtwork.description}</p>
                    </div>
                  )}
                  <div className="flex gap-2 pt-4">
                    {selectedArtwork.status === "pending" && (
                      <>
                        <Button
                          onClick={() => handleArtworkAction(selectedArtwork._id, "approve")}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleArtworkAction(selectedArtwork._id, "reject")}
                          variant="destructive"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                    {selectedArtwork.status === "approved" && (
                      <Button
                        onClick={() =>
                          handleArtworkAction(selectedArtwork._id, selectedArtwork.featured ? "unfeature" : "feature")
                        }
                        className="bg-yellow-500 hover:bg-yellow-600"
                      >
                        <Star className={`h-4 w-4 mr-2 ${selectedArtwork.featured ? "fill-current" : ""}`} />
                        {selectedArtwork.featured ? "Unfeature" : "Feature"}
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this artwork?")) {
                          handleArtworkAction(selectedArtwork._id, "delete")
                        }
                      }}
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
