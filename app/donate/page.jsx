"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Heart,
  DollarSign,
  Users,
  Gift,
  Sparkles,
  CheckCircle,
  CreditCard,
  Building,
  Briefcase,
  Award,
  Repeat,
  Palette,
  BookOpen,
  Church,
} from "lucide-react"

export default function Donate() {
  const [donationAmount, setDonationAmount] = useState(50)
  const [donationType, setDonationType] = useState("one-time")
  const [selectedFund, setSelectedFund] = useState("general")
  const [customAmount, setCustomAmount] = useState("")

  const donationAmounts = [25, 50, 100, 250, 500, 1000]

  const funds = [
    { id: "general", name: "General Fund", description: "Support all our programs and initiatives" },
    { id: "artists", name: "Artist Support", description: "Directly support Christian artists in need" },
    { id: "education", name: "Education Programs", description: "Fund art education and workshops" },
    { id: "community", name: "Community Outreach", description: "Help bring art to underserved communities" },
    { id: "ministry", name: "Ministry Resources", description: "Develop resources for churches and ministries" },
  ]

  const handleAmountClick = (amount) => {
    setDonationAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value)
    setDonationAmount(0)
  }

  return (
    <div className="min-h-screen py-40 bg-gradient-to-br from-gray-500/10 via-white/10 to-amber-500/10">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-[#e76f51]/10" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1607000975631-e5ff6de1eb00?q=80&w=1200')",
            backgroundSize: "cover",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-[#e76f51] rounded-full mb-6"
            >
              <Heart className="h-10 w-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Support Our Mission
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Your generous donation helps us empower Christian artists, provide resources to churches, and spread the
              Gospel through creative expression.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                <Gift className="h-6 w-6 text-amber-500" />
                <div className="text-left">
                  <p className="font-medium">Tax Deductible</p>
                  <p className="text-sm text-gray-400">All donations are tax-deductible</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                <Sparkles className="h-6 w-6 text-amber-500" />
                <div className="text-left">
                  <p className="font-medium">100% Impact</p>
                  <p className="text-sm text-gray-400">Every dollar goes to our mission</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                <CheckCircle className="h-6 w-6 text-amber-500" />
                <div className="text-left">
                  <p className="font-medium">Secure Giving</p>
                  <p className="text-sm text-gray-400">Safe and encrypted transactions</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Form */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>

                  {/* Donation Type */}
                  <div className="mb-6">
                    <p className="text-lg font-medium mb-3">Donation Type</p>
                    <div className="flex gap-4">
                      <Button
                        variant={donationType === "one-time" ? "default" : "outline"}
                        onClick={() => setDonationType("one-time")}
                        className={
                          donationType === "one-time"
                            ? "bg-gradient-to-r from-amber-500 to-[#e76f51] text-white flex-1"
                            : "border-gray-200 hover:border-amber-500 flex-1"
                        }
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        One-Time
                      </Button>
                      <Button
                        variant={donationType === "monthly" ? "default" : "outline"}
                        onClick={() => setDonationType("monthly")}
                        className={
                          donationType === "monthly"
                            ? "bg-gradient-to-r from-amber-500 to-[#e76f51] text-white flex-1"
                            : "border-gray-200 hover:border-amber-500 flex-1"
                        }
                      >
                        <Repeat className="h-4 w-4 mr-2" />
                        Monthly
                      </Button>
                    </div>
                  </div>

                  {/* Fund Selection */}
                  <div className="mb-6">
                    <p className="text-lg font-medium mb-3">Select a Fund</p>
                    <div className="grid grid-cols-1 gap-3">
                      {funds.map((fund) => (
                        <div
                          key={fund.id}
                          onClick={() => setSelectedFund(fund.id)}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            selectedFund === fund.id
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-gray-200 hover:border-amber-300"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-[#e76f51] flex items-center justify-center text-white">
                            {fund.id === "general" && <Gift className="h-5 w-5" />}
                            {fund.id === "artists" && <Palette className="h-5 w-5" />}
                            {fund.id === "education" && <BookOpen className="h-5 w-5" />}
                            {fund.id === "community" && <Users className="h-5 w-5" />}
                            {fund.id === "ministry" && <Church className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium">{fund.name}</p>
                            <p className="text-sm text-gray-400">{fund.description}</p>
                          </div>
                          {selectedFund === fund.id && <CheckCircle className="h-5 w-5 text-amber-500 ml-auto" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div className="mb-6">
                    <p className="text-lg font-medium mb-3">Select Amount</p>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={donationAmount === amount && !customAmount ? "default" : "outline"}
                          onClick={() => handleAmountClick(amount)}
                          className={
                            donationAmount === amount && !customAmount
                              ? "bg-gradient-to-r from-amber-500 to-[#e76f51] text-white"
                              : "border-gray-200 hover:border-amber-500"
                          }
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Custom amount:</span>
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 w-full"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="mb-6">
                    <p className="text-lg font-medium mb-3">Your Information</p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number (Optional)"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="anonymous" className="mt-1" />
                        <label htmlFor="anonymous" className="text-sm text-gray-400">
                          Make this donation anonymous
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="newsletter" className="mt-1" />
                        <label htmlFor="newsletter" className="text-sm text-gray-400">
                          Sign me up for the newsletter to stay updated on how my donation is making an impact
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="mb-6">
                    <p className="text-lg font-medium mb-3">Payment Method</p>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <Button variant="outline" className="flex-1 border-gray-200 hover:border-amber-500">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Credit Card
                        </Button>
                        <Button variant="outline" className="flex-1 border-gray-200 hover:border-amber-500">
                          <img
                            src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png"
                            alt="PayPal"
                            className="h-5 mr-2"
                          />
                          PayPal
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="col-span-2 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg py-6 text-lg">
                    <Heart className="h-5 w-5 mr-2" />
                    Complete Donation
                  </Button>
                </motion.div>
              </div>

              {/* Right Side - Summary and Impact */}
              <div className="lg:sticky lg:top-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Donation Summary */}
                  <Card className="mb-6 shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Donation Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Donation Type</span>
                          <span className="font-medium capitalize">{donationType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fund</span>
                          <span className="font-medium">{funds.find((f) => f.id === selectedFund)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount</span>
                          <span className="font-medium text-amber-500">
                            ${customAmount || donationAmount}
                            {donationType === "monthly" && <span className="text-gray-500 text-sm"> /month</span>}
                          </span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-amber-500">
                            ${customAmount || donationAmount}
                            {donationType === "monthly" && <span className="text-gray-500 text-sm"> /month</span>}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Impact Section */}
                  <Card className="mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-0">
                    <CardHeader>
                      <CardTitle>Your Impact</CardTitle>
                      <CardDescription>Here's how your donation will help</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-[#e76f51] flex items-center justify-center text-white">
                            <Palette className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Support Christian Artists</p>
                            <p className="text-sm text-gray-400">
                              Help artists create faith-inspired work through grants and resources
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-[#e76f51] flex items-center justify-center text-white">
                            <Church className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Equip Churches</p>
                            <p className="text-sm text-gray-400">
                              Provide resources for churches to integrate arts into ministry
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-[#e76f51] flex items-center justify-center text-white">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Educational Programs</p>
                            <p className="text-sm text-gray-400">
                              Fund workshops, courses, and resources for artistic development
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-[#e76f51] flex items-center justify-center text-white">
                            <Users className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Community Outreach</p>
                            <p className="text-sm text-gray-400">
                              Bring art programs to underserved communities and spread the Gospel
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Other Ways to Give */}
                  <Card className="border-0">
                    <CardHeader>
                      <CardTitle>Other Ways to Give</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <Building className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">By Check</p>
                            <p className="text-sm text-gray-400">
                              Make checks payable to "Redeemed Creative Arts" and mail to:
                              <br />
                              123 Faith Street, Artville, CA 90210
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <Briefcase className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Corporate Matching</p>
                            <p className="text-sm text-gray-400">
                              Many employers match charitable contributions. Check with your HR department.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <Award className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Legacy Giving</p>
                            <p className="text-sm text-gray-400">
                              Include Redeemed Creative Arts in your estate planning. Contact us for details.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Donor Stories
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how your donations are making a difference in the lives of artists and communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John D.",
                role: "Monthly Donor",
                quote:
                  "Supporting Redeemed Creative Arts has been one of the most rewarding decisions I've made. Seeing how they empower Christian artists to share their faith through creativity is truly inspiring.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
              },
              {
                name: "Sarah M.",
                role: "Church Leader",
                quote:
                  "The resources provided by Redeemed Creative Arts have transformed our church's approach to worship and outreach. Their ministry resources are invaluable to our community.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
              },
              {
                name: "Michael T.",
                role: "Corporate Sponsor",
                quote:
                  "As a business owner, I wanted to support a cause that aligns with my values. Redeemed Creative Arts' mission to spread the Gospel through art resonated deeply with me.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-amber-500 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
