import { NextResponse } from "next/server"
import connectDB from "@/lib/database"
import Artwork from "@/models/Artwork"
import Transaction from "@/models/Transaction"
import User from "@/models/User"
import { getServerSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const user = await User.findById(session.userId)
    if (!user || user.userType !== "artist") {
      return NextResponse.json({ error: "Artist access required" }, { status: 403 })
    }

    // Get artist's artworks that are for sale
    const artworks = await Artwork.find({
      artist: session.userId,
      "pricing.isForSale": true,
    }).select("title images pricing engagement")

    // Get sales transactions
    const sales = await Transaction.find({
      artistId: session.userId,
      type: "artwork_sale",
      status: "completed",
    })
      .populate("artworkId", "title images")
      .populate("buyerId", "name email")
      .sort({ createdAt: -1 })

    // Calculate sales stats
    const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)
    const totalOrders = sales.length
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

    // Monthly sales data
    const monthlySales = {}
    sales.forEach((sale) => {
      const month = sale.createdAt.toISOString().slice(0, 7) // YYYY-MM
      monthlySales[month] = (monthlySales[month] || 0) + sale.amount
    })

    return NextResponse.json({
      artworks,
      sales,
      stats: {
        totalSales,
        totalOrders,
        avgOrderValue,
        monthlySales,
      },
    })
  } catch (error) {
    console.error("Artist sales API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
