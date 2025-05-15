"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, LogIn } from "lucide-react"

export default function LoginPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In Phase 1, this is just a placeholder for form submission
    setIsSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Log In</h1>
        <p className="text-gray-600">Welcome back to Redeemed Creative Arts</p>
      </div>

      {isSubmitted ? (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <LogIn className="h-16 w-16 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Login Received!</h2>
          <p className="text-gray-600 mb-6">
            In Phase 1, this is a placeholder for the login process. Full functionality will be implemented in Phase 2.
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700" asChild>
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email address" required />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-amber-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
              <LogIn className="mr-2 h-4 w-4" /> Log In
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-amber-600 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
