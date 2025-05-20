"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Palette, Heart, Church, ArrowRight, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [userType, setUserType] = useState("artist")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In Phase 1, this is just a placeholder for form submission
    setIsSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-40 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
        <p className="text-gray-600">Join the Redeemed Creative Arts community</p>
      </div>

      {isSubmitted ? (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Registration Received!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering with Redeemed Creative Arts. In Phase 1, this is a placeholder for the
            registration process. Full functionality will be implemented in Phase 2.
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700" asChild>
            <Link href="/">
              Return to Home <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className=" p-8 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label>I am registering as a:</Label>
              <RadioGroup
                defaultValue="artist"
                value={userType}
                onValueChange={setUserType}
                className="grid grid-cols-1 gap-4"
              >
                <div
                  className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${userType === "artist" ? "border-amber-600 bg-amber-500" : "border-gray-200"}`}
                >
                  <RadioGroupItem value="artist" id="artist" />
                  <Label htmlFor="artist" className="flex items-center cursor-pointer">
                    <Palette className="h-5 w-5 text-amber-600 mr-2" />
                    <span>Artist</span>
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${userType === "patron" ? "border-amber-600 bg-amber-500" : "border-gray-200"}`}
                >
                  <RadioGroupItem value="patron" id="patron" />
                  <Label htmlFor="patron" className="flex items-center cursor-pointer">
                    <Heart className="h-5 w-5 text-amber-600 mr-2" />
                    <span>Patron</span>
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${userType === "church" ? "border-amber-600 bg-amber-500" : "border-gray-200"}`}
                >
                  <RadioGroupItem value="church" id="church" />
                  <Label htmlFor="church" className="flex items-center cursor-pointer">
                    <Church className="h-5 w-5 text-amber-600 mr-2" />
                    <span>Church/Organization</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{userType === "church" ? "Organization Name" : "Full Name"}</Label>
              <Input
                id="name"
                placeholder={userType === "church" ? "Enter organization name" : "Enter your full name"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email address" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" required />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="helperOpt"
                defaultChecked
                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
              />
              <label htmlFor="helperOpt" className="text-sm text-gray-600">
                I want to be a Helper (optional)
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-amber-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-amber-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
              Create Account
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-amber-600 hover:underline">
                Log In
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
