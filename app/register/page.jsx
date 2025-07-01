"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Heart, Church, ArrowRight, CheckCircle, Loader2, Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const [userType, setUserType] = useState("artist")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isHelper: false,
    // Artist specific
    specialties: [],
    experience: "",
    // Church specific
    organizationName: "",
    denomination: "",
    size: "",
    pastor: "",
    artsMinistryContact: "",
    // Agreements
    termsAccepted: false,
    privacyAccepted: false,
    artistDisclaimer: false,
    noAIConfirmation: false,
  })

  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSpecialtyChange = (specialty, checked) => {
    setFormData((prev) => ({
      ...prev,
      specialties: checked ? [...prev.specialties, specialty] : prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required")
      return false
    }

    if (!formData.email.trim()) {
      toast.error("Email is required")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return false
    }

    if (!formData.password) {
      toast.error("Password is required")
      return false
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters with uppercase, lowercase, and number")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return false
    }

    if (!formData.termsAccepted) {
      toast.error("You must accept the Terms of Service")
      return false
    }

    if (!formData.privacyAccepted) {
      toast.error("You must accept the Privacy Policy")
      return false
    }

    if (userType === "artist" && !formData.artistDisclaimer) {
      toast.error("Artists must accept the Artist Disclaimer")
      return false
    }

    if (userType === "artist" && !formData.noAIConfirmation) {
      toast.error("Artists must confirm no AI-generated content")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Prepare data
      const registrationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userType,
        agreements: {
          termsAccepted: formData.termsAccepted,
          privacyAccepted: formData.privacyAccepted,
          artistDisclaimer: formData.artistDisclaimer,
          noAIConfirmation: formData.noAIConfirmation,
        },
      }

      // Add user-type specific data
      if (userType === "artist") {
        registrationData.artistInfo = {
          specialties: formData.specialties,
          experience: formData.experience,
        }
      }

      if (userType === "church") {
        registrationData.churchInfo = {
          organizationName: formData.organizationName,
          denomination: formData.denomination,
          size: formData.size,
          pastor: formData.pastor,
          artsMinistryContact: formData.artsMinistryContact,
        }
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
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 text-center">
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
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const specialtyOptions = [
    "Digital Art",
    "Traditional Painting",
    "Sculpture",
    "Photography",
    "Illustration",
    "Graphic Design",
    "Calligraphy",
    "Mixed Media",
    "Watercolor",
    "Oil Painting",
    "Acrylic Painting",
    "Drawing",
    "Printmaking",
    "Ceramics",
    "Jewelry Making",
  ]

  return (
    <div className="container mx-auto px-4 py-40 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
        <p className="text-gray-600">Join the Redeemed Creative Arts community</p>
      </div>

      <Card className="border-0 shadow-xl">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">I am registering as a:</Label>
              <RadioGroup value={userType} onValueChange={setUserType} className="grid grid-cols-1 gap-4">
                <div
                  className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    userType === "artist" ? "border-amber-600 bg-amber-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value="artist" id="artist" />
                  <Label htmlFor="artist" className="flex items-center cursor-pointer flex-1">
                    <Palette className="h-5 w-5 text-amber-600 mr-3" />
                    <div>
                      <div className="font-medium">Artist</div>
                      <div className="text-sm text-gray-500">Create and share your faith-inspired artwork</div>
                    </div>
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    userType === "patron" ? "border-amber-600 bg-amber-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value="patron" id="patron" />
                  <Label htmlFor="patron" className="flex items-center cursor-pointer flex-1">
                    <Heart className="h-5 w-5 text-amber-600 mr-3" />
                    <div>
                      <div className="font-medium">Patron</div>
                      <div className="text-sm text-gray-500">Support and collect Christian art</div>
                    </div>
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    userType === "church" ? "border-amber-600 bg-amber-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value="church" id="church" />
                  <Label htmlFor="church" className="flex items-center cursor-pointer flex-1">
                    <Church className="h-5 w-5 text-amber-600 mr-3" />
                    <div>
                      <div className="font-medium">Church/Organization</div>
                      <div className="text-sm text-gray-500">Connect with artists for ministry needs</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{userType === "church" ? "Contact Person Name" : "Full Name"} *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={userType === "church" ? "Enter contact person's name" : "Enter your full name"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
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
            </div>

            {/* Church-specific fields */}
            {userType === "church" && (
              <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800">Church Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      placeholder="Enter church/organization name"
                      required={userType === "church"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="denomination">Denomination</Label>
                    <Input
                      id="denomination"
                      name="denomination"
                      value={formData.denomination}
                      onChange={handleInputChange}
                      placeholder="e.g., Baptist, Methodist, Non-denominational"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Church Size</Label>
                    <Select
                      value={formData.size}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, size: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select church size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100">Under 100 members</SelectItem>
                        <SelectItem value="100-300">100-300 members</SelectItem>
                        <SelectItem value="300-500">300-500 members</SelectItem>
                        <SelectItem value="500-1000">500-1000 members</SelectItem>
                        <SelectItem value="over-1000">Over 1000 members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pastor">Pastor Name</Label>
                    <Input
                      id="pastor"
                      name="pastor"
                      value={formData.pastor}
                      onChange={handleInputChange}
                      placeholder="Enter pastor's name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="artsMinistryContact">Arts Ministry Contact</Label>
                  <Input
                    id="artsMinistryContact"
                    name="artsMinistryContact"
                    value={formData.artsMinistryContact}
                    onChange={handleInputChange}
                    placeholder="Person responsible for arts ministry"
                  />
                </div>
              </div>
            )}

            {/* Artist-specific fields */}
            {userType === "artist" && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800">Artist Information</h3>

                <div className="space-y-2">
                  <Label>Artistic Specialties</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {specialtyOptions.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={specialty}
                          checked={formData.specialties.includes(specialty)}
                          onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked)}
                        />
                        <Label htmlFor={specialty} className="text-sm">
                          {specialty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                      <SelectItem value="professional">Professional (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Must be 8+ characters with uppercase, lowercase, and number</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Helper Option */}
            <div className="flex items-center space-x-2 p-4 bg-green-50 rounded-lg border border-green-200">
              <Checkbox
                id="helperOpt"
                name="isHelper"
                checked={formData.isHelper}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isHelper: checked }))}
              />
              <Label htmlFor="helperOpt" className="text-sm">
                <span className="font-medium">I want to be a Helper</span>
                <span className="block text-gray-600">Help churches and fellow artists with events and projects</span>
              </Label>
            </div>

            {/* Legal Agreements */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800">Legal Agreements</h3>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, termsAccepted: checked }))}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-amber-600 hover:underline" target="_blank">
                      Terms of Service
                    </Link>{" "}
                    *
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacy"
                    name="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, privacyAccepted: checked }))}
                    required
                  />
                  <Label htmlFor="privacy" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link href="/privacy" className="text-amber-600 hover:underline" target="_blank">
                      Privacy Policy
                    </Link>{" "}
                    *
                  </Label>
                </div>

                {userType === "artist" && (
                  <>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="artistDisclaimer"
                        name="artistDisclaimer"
                        checked={formData.artistDisclaimer}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, artistDisclaimer: checked }))}
                        required
                      />
                      <Label htmlFor="artistDisclaimer" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <Link href="/artist-disclaimer" className="text-amber-600 hover:underline" target="_blank">
                          Artist Disclaimer
                        </Link>{" "}
                        *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="noAI"
                        name="noAIConfirmation"
                        checked={formData.noAIConfirmation}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, noAIConfirmation: checked }))}
                        required
                      />
                      <Label htmlFor="noAI" className="text-sm leading-relaxed">
                        I confirm that I will not upload AI-generated artwork and that all my submissions will be
                        original, human-created art *
                      </Label>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 h-12 text-lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-amber-600 hover:underline font-medium">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
