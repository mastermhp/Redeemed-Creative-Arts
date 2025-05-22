"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Gift,
  Heart,
  ShoppingCart,
  Mail,
  Calendar,
  CreditCard,
  Check,
  Sparkles,
  Users,
  Palette,
  Church,
} from "lucide-react"

export default function GiftCards() {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [deliveryMethod, setDeliveryMethod] = useState("email")
  const [selectedDesign, setSelectedDesign] = useState("faith")

  const amounts = [25, 50, 100, 150, 200, 500]
  const customAmount = ""

  const designs = [
    {
      id: "faith",
      name: "Faith & Hope",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Beautiful design featuring faith-inspired artwork",
    },
    {
      id: "artistic",
      name: "Artistic Palette",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      description: "Perfect for art lovers with paintbrush and palette design",
    },
    {
      id: "scripture",
      name: "Scripture Verse",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      description: "Elegant typography with inspiring Bible verse",
    },
    {
      id: "church",
      name: "Church Community",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Designed for church communities and ministries",
    },
    {
      id: "seasonal",
      name: "Seasonal",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      description: "Special seasonal designs for holidays and celebrations",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
      description: "Clean, simple design perfect for any occasion",
    },
  ]

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
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=800&fit=crop')",
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
              <Gift className="h-10 w-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 to-[#e76f51] bg-clip-text text-transparent">
                Gift Cards
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Give the gift of faith-inspired art. Perfect for artists, art lovers, and anyone who appreciates beautiful
              Christian artwork.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                <Mail className="h-6 w-6 text-amber-500" />
                <div className="text-left">
                  <p className="font-medium">Instant Delivery</p>
                  <p className="text-sm text-gray-200">Email or print at home</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                <Calendar className="h-6 w-6 text-amber-500" />
                <div className="text-left">
                  <p className="font-medium">Never Expires</p>
                  <p className="text-sm text-gray-200">Use anytime, no rush</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                <Sparkles className="h-6 w-6 text-amber-500" />
                <div className="text-left">
                  <p className="font-medium">Any Amount</p>
                  <p className="text-sm text-gray-200">$25 to $500 or custom</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gift Card Builder */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Configuration */}
              <div className="space-y-8">
                {/* Amount Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Choose Amount</h2>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {amounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => setSelectedAmount(amount)}
                        className={
                          selectedAmount === amount
                            ? "bg-gradient-to-r from-amber-500 to-[#e76f51] text-white"
                            : "border-gray-200 hover:border-amber-500"
                        }
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-200">Custom amount:</span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 w-32"
                      min="25"
                      max="1000"
                    />
                  </div>
                </motion.div>

                {/* Design Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Choose Design</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {designs.map((design) => (
                      <div
                        key={design.id}
                        onClick={() => setSelectedDesign(design.id)}
                        className={`cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                          selectedDesign === design.id
                            ? "border-amber-500 shadow-lg"
                            : "border-gray-200 hover:border-amber-300"
                        }`}
                      >
                        <img
                          src={design.image || "/placeholder.svg"}
                          alt={design.name}
                          className="w-full h-24 object-cover rounded-t-lg"
                        />
                        <div className="p-3">
                          <h3 className="font-medium text-sm">{design.name}</h3>
                          <p className="text-xs text-gray-200">{design.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Delivery Method */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Delivery Method</h2>
                  <div className="space-y-3">
                    <div
                      onClick={() => setDeliveryMethod("email")}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        deliveryMethod === "email"
                          ? "border-amber-500 bg-amber-500/10"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                    >
                      <Mail className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium">Email Delivery</p>
                        <p className="text-sm text-gray-200">Instant delivery to recipient's email</p>
                      </div>
                      {deliveryMethod === "email" && <Check className="h-5 w-5 text-amber-500 ml-auto" />}
                    </div>

                    <div
                      onClick={() => setDeliveryMethod("print")}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        deliveryMethod === "print"
                          ? "border-amber-500 bg-amber-500/10"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                    >
                      <CreditCard className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium">Print at Home</p>
                        <p className="text-sm text-gray-200">Download and print beautiful gift card</p>
                      </div>
                      {deliveryMethod === "print" && <Check className="h-5 w-5 text-amber-500 ml-auto" />}
                    </div>
                  </div>
                </motion.div>

                {/* Recipient Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Recipient Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Recipient's Name"
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="email"
                        placeholder="Recipient's Email"
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <textarea
                      placeholder="Personal message (optional)"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="date"
                        placeholder="Send Date (optional)"
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Preview */}
              <div className="lg:sticky lg:top-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Gift Card Preview</h2>
                  <Card className="overflow-hidden shadow-xl">
                    <div className="relative">
                      <img
                        src={designs.find((d) => d.id === selectedDesign)?.image || "/placeholder.svg"}
                        alt="Gift card design"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold">Redeemed Creative Arts</h3>
                        <p className="text-lg">Gift Card</p>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="text-2xl font-bold text-amber-500">${selectedAmount}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-200">Gift Card Code</p>
                          <p className="font-mono text-lg">RCAG-XXXX-XXXX-XXXX</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-200">Valid Until</p>
                          <p className="font-medium">Never Expires</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-200">Redeemable For</p>
                          <p className="font-medium">Original artwork, prints, merchandise, and courses</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Purchase Summary */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Gift Card Value</span>
                          <span>${selectedAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing Fee</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery</span>
                          <span>Free</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-amber-500">${selectedAmount}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-[#e76f51] text-white hover:shadow-lg">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Purchase Gift Card
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
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
                Perfect Gift For
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Our gift cards are ideal for anyone who loves faith-inspired art and creativity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Palette className="h-8 w-8" />,
                title: "Artists",
                description: "Support their creative journey with art supplies and resources",
              },
              {
                icon: <Church className="h-8 w-8" />,
                title: "Church Members",
                description: "Perfect for church events, appreciation gifts, and celebrations",
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Art Lovers",
                description: "For those who appreciate beautiful Christian artwork and prints",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Family & Friends",
                description: "Meaningful gifts for birthdays, holidays, and special occasions",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-[#e76f51] rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-200">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
