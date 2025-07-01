export default function ForgotPasswordLoading() {
  return (
    <div className="container mx-auto px-4 py-40 max-w-md">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}
