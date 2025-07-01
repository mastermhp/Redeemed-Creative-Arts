import { Inter } from "next/font/google"
import "./globals.css"
import AnimationProvider from "@/components/animation-provider"
import { AuthProvider } from "@/lib/hooks/useAuth"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Redeemed Creative Arts",
  description: "Connecting faith and creativity through art",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <AnimationProvider>
            <div className="flex min-h-screen flex-col bg-white">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AnimationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
