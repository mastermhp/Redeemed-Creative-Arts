import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Dashboard Coming Soon</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The dashboard functionality will be implemented in Phase 2 of the Redeemed Creative Arts platform development.
        </p>
      </div>

      <div className="bg-amber-50 p-8 rounded-xl mb-12">
        <h2 className="text-2xl font-bold mb-4">Phase 2 Dashboard Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">For Artists</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Upload and manage artwork</li>
              <li>• Track points and votes</li>
              <li>• Submit to contests</li>
              <li>• Monitor sales and donations</li>
              <li>• Manage helper availability</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">For Patrons</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Donate and vote</li>
              <li>• Comment on artwork</li>
              <li>• Gift points to artists</li>
              <li>• Track engagement rewards</li>
              <li>• Manage helper availability</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">For Churches</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Book helpers</li>
              <li>• Create events</li>
              <li>• Monitor engagement</li>
              <li>• Create donation campaigns</li>
              <li>• Track community impact</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-700 mb-6">
          We're currently in Phase 1, focusing on building the platform foundation. Check back soon for updates on our
          progress!
        </p>
        <Button className="bg-amber-600 hover:bg-amber-700" asChild>
          <Link href="/">
            Return to Home <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
