"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Loader2, XCircle } from "lucide-react"
import toast from "react-hot-toast"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState("verifying") // verifying, success, error
  const [message, setMessage] = useState("")
  const [pointsAwarded, setPointsAwarded] = useState(0)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    if (!token) {
      setStatus("error")
      setMessage("Invalid verification link")
      return
    }

    verifyEmail(token)
  }, [searchParams])

  const verifyEmail = async (token) => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
        setPointsAwarded(data.pointsAwarded || 0)
        toast.success("Email verified successfully!")
      } else {
        setStatus("error")
        setMessage(data.error || "Verification failed")
        toast.error(data.error || "Verification failed")
      }
    } catch (error) {
      console.error("Email verification error:", error)
      setStatus("error")
      setMessage("Verification failed. Please try again.")
      toast.error("Verification failed. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-40 max-w-md">
      <Card className="border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          {status === "verifying" && (
            <>
              <Loader2 className="h-16 w-16 text-amber-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold mb-2">Verifying Email</h2>
              <p className="text-gray-600">Please wait while we verify your email address...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
              <p className="text-gray-600 mb-4">{message}</p>

              {pointsAwarded > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-medium">
                    🎉 Congratulations! You earned {pointsAwarded} bonus points!
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                  <Link href="/login">Continue to Login</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
              <p className="text-gray-600 mb-6">{message}</p>

              <div className="space-y-3">
                <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                  <Link href="/register">Create New Account</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/login">Back to Login</Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
