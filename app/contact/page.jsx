"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In Phase 1, this is just a placeholder for form submission
    setIsSubmitted(true)
    // Reset form after submission
    e.target.reset()
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    // In Phase 1, this is just a placeholder for newsletter subscription
    setIsSubscribed(true)
    // Reset form after submission
    e.target.reset()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about Redeemed Creative Arts? We're here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-4">
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="Your first name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Your last name" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email address" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="What is this regarding?" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" rows={5} required className="resize-none" />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="userType"
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                />
                <label htmlFor="userType" className="text-sm text-gray-600">
                  I'm interested in joining as an artist, patron, or church/organization.
                </label>
              </div>

              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Mail className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-gray-600">info@redeemedcreativearts.com</p>
                <p className="text-gray-600">support@redeemedcreativearts.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Phone className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Call Us</h3>
                <p className="text-gray-600">(555) 123-4567</p>
                <p className="text-gray-600">Monday - Friday, 9am - 5pm EST</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <MapPin className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-gray-600">123 Faith Avenue</p>
                <p className="text-gray-600">Creative City, CA 12345</p>
              </div>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="bg-amber-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">When will the platform be fully functional?</h4>
                <p className="text-sm text-gray-600">
                  We're building Redeemed Creative Arts in phases. Phase 1 focuses on the platform foundation, Phase 2
                  adds core functionality, and Phase 3 introduces advanced features.
                </p>
              </div>
              <div>
                <h4 className="font-medium">How can I get involved during Phase 1?</h4>
                <p className="text-sm text-gray-600">
                  You can sign up for our newsletter to stay updated on our progress and be notified when we launch new
                  features.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Is there a mobile app planned?</h4>
                <p className="text-sm text-gray-600">
                  Yes, we're planning to develop a mobile app in the future. Our current focus is on building a
                  responsive web platform first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-amber-50 p-8 rounded-xl text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive updates on our progress, new features, and community news.
        </p>

        {isSubscribed ? (
          <div className="flex flex-col items-center justify-center py-4">
            <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
            <h3 className="text-xl font-semibold mb-2">Thank You for Subscribing!</h3>
            <p className="text-gray-600">You'll now receive updates about Redeemed Creative Arts.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="Your email address" required />
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        )}
      </div>

      {/* Map Placeholder */}
      <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg mb-16">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Map Placeholder</p>
        </div>
      </div>
    </div>
  )
}
