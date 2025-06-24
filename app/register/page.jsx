"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Palette, Heart, Church, ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const [userType, setUserType] = useState("artist")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isHelper: false,
    organizationName: "",
    denomination: "",
    specialties: [],
  })

  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match")
        setIsLoading(false)
        return
      }

      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters")
        setIsLoading(false)
        return
      }

      // Prepare data
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType,
        isHelper: formData.isHelper,
      }

      // Add user-type specific data
      if (userType === "church") {
        registrationData.organizationName = formData.organizationName
        registrationData.denomination = formData.denomination
      }

      if (userType === "artist") {
        registrationData.specialties = formData.specialties
      }

      // Submit registration
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast.success("Registration successful! Please check your email to verify your account.")
      } else {
        toast.error(data.error || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-40 max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for joining Redeemed Creative Arts! We've sent a verification email to your inbox. Please verify
            your email to complete your registration and start earning points.
          </p>
          <div className="space-y-3">
            <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
              <Link href="/login">
                Continue to Login <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-40 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
        <p className="text-gray-600">Join the Redeemed Creative Arts community</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md">
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
                className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${
                  userType === "artist" ? "border-amber-600 bg-amber-50" : "border-gray-200"
                }`}
              >
                <RadioGroupItem value="artist" id="artist" />
                <Label htmlFor="artist" className="flex items-center cursor-pointer">
                  <Palette className="h-5 w-5 text-amber-600 mr-2" />
                  <span>Artist</span>
                </Label>
              </div>
              <div
                className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${
                  userType === "patron" ? "border-amber-600 bg-amber-50" : "border-gray-200"
                }`}
              >
                <RadioGroupItem value="patron" id="patron" />
                <Label htmlFor="patron" className="flex items-center cursor-pointer">
                  <Heart className="h-5 w-5 text-amber-600 mr-2" />
                  <span>Patron</span>
                </Label>
              </div>
              <div
                className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${
                  userType === "church" ? "border-amber-600 bg-amber-50" : "border-gray-200"
                }`}
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
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={userType === "church" ? "Enter organization name" : "Enter your full name"}
              required
            />
          </div>

          {userType === "church" && (
            <div className="space-y-2">
              <Label htmlFor="organizationName">Contact Person Name</Label>
              <Input
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                placeholder="Enter contact person's name"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password (min. 6 characters)"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="helperOpt"
              name="isHelper"
              checked={formData.isHelper}
              onChange={handleInputChange}
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

          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-600 hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
