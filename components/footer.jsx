"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, Mail, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
      },
    },
  }

  return (
    <motion.footer
      className="bg-card border-t border-border mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Redeemed Creative Arts</h3>
            <p className="text-sm text-muted-foreground">Building bridges between Artists, Patrons, and Churches.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/artist-info"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  For Artists
                </Link>
              </li>
              <li>
                <Link
                  href="/patron-info"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  For Patrons
                </Link>
              </li>
              <li>
                <Link
                  href="/church-info"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  For Churches
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/artist-disclaimer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Artist Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/helper-agreement"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Helper Agreement
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Contact Us</h3>
            <p className="text-sm text-muted-foreground flex items-center">
              <Mail size={16} className="mr-2" />
              <a href="mailto:newmandesigners@gmail.com" className="hover:text-primary transition-colors">
                newmandesigners@gmail.com
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              We'd love to hear from you! Reach out with any questions or feedback.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Redeemed Creative Arts. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center">
            Made with <Heart size={12} className="mx-1 text-accent" /> for the Christian creative community
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
