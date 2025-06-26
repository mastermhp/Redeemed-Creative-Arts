export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-10 bg-gray-200 rounded w-80 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-96"></div>
          </div>

          {/* Navigation tabs skeleton */}
          <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-md w-24"></div>
            ))}
          </div>

          {/* Stats cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>

          {/* Content area skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
