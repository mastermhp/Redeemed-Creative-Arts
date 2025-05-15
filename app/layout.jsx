import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimationProvider from "@/components/animation-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Redeemed Creative Arts",
  description: "A faith-based community platform for Christian visual artists, patrons, and churches",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimationProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AnimationProvider>
      </body>
    </html>
  )
}
