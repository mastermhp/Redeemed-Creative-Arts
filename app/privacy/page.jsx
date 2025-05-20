"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { FileText, Shield, Lock, Users, Database, Cookie, Clock, BabyIcon as Child, Globe, Mail } from "lucide-react"

export default function PrivacyPage() {
  const containerRef = useRef(null)

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [-50, 50, -50],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [50, -50, 50],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
      </div>

      <motion.div
        className="text-center mb-12 relative z-10 pt-20"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
      >
        <motion.h1 className="text-4xl font-bold mb-4 text-amber-500" variants={itemVariants}>
          Privacy Policy
        </motion.h1>
        <motion.p className="text-lg text-[#e76f51] max-w-3xl mx-auto" variants={itemVariants}>
          Effective Date: May 17, 2025
        </motion.p>
        <motion.p className="text-muted-foreground max-w-3xl mx-auto mt-4" variants={itemVariants}>
          Redeemed Creative Arts ("we," "us," or "our") respects the privacy of our users ("you" or "your") and is
          committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you visit our website (the "Site") and use our services. By using the
          Site, you consent to the data practices described in this Privacy Policy.
        </motion.p>
      </motion.div>

      {/* Privacy Policy Content */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div
          className="bg-card p-8 rounded-xl border border-border relative overflow-hidden"
          variants={itemVariants}
        >
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          ></motion.div>

          <div className="relative z-10 space-y-8">
            {/* Information We Collect */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Database className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">1. Information We Collect</h2>

                  <h3 className="text-lg font-medium mb-2 text-[#e76f51]">Personal Information</h3>
                  <p className="text-foreground mb-2">
                    We may collect personal information that you voluntarily provide when you:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Create an account (Artist, Patron, or Church/Organization).</li>
                    <li>Make purchases through the Site.</li>
                    <li>Subscribe to newsletters.</li>
                    <li>Participate in events, contests, or surveys.</li>
                    <li>Communicate with us via email, contact forms, or support channels.</li>
                  </ul>

                  <p className="text-[#e76f51] mb-2">This may include:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Name, email address, mailing address, and phone number.</li>
                    <li>Payment information (processed securely through third-party payment processors).</li>
                    <li>Profile information and content you upload (including artwork, video, and text).</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-[#e76f51]">Automatically Collected Information</h3>
                  <p className="text-muted-foreground mb-2">When you visit the Site, we may automatically collect:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>IP address.</li>
                    <li>Browser type and version.</li>
                    <li>Pages viewed and time spent on the Site.</li>
                    <li>Device identifiers.</li>
                    <li>Cookies and similar technologies.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <FileText className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-2">
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>To operate and maintain the Site.</li>
                    <li>To process transactions and manage accounts.</li>
                    <li>To provide customer support.</li>
                    <li>To personalize your experience and deliver content.</li>
                    <li>To send promotional emails and newsletters (you can opt out at any time).</li>
                    <li>To administer contests, giveaways, and surveys.</li>
                    <li>To detect, prevent, and address security or technical issues.</li>
                    <li>To comply with legal obligations.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sharing of Information */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Users className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">3. Sharing of Information</h2>
                  <p className="text-muted-foreground mb-2">
                    We do not sell your personal information to third parties. We may share your information with:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Third-party vendors: For order fulfillment, payment processing, and marketing support.</li>
                    <li>Service providers: To assist in website hosting, data analytics, and email delivery.</li>
                    <li>Law enforcement or regulatory bodies: When required by law or to protect our rights.</li>
                    <li>
                      Artists, Patrons, and Churches: Where interaction is part of platform services (e.g.,
                      artist-patron communications, church event participation).
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Third-Party Fulfillment Disclaimer */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Shield className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">4. Third-Party Fulfillment Disclaimer</h2>
                  <p className="text-muted-foreground">
                    All orders placed through Redeemed Creative Arts are fulfilled by third-party print and shipping
                    services. Redeemed Creative Arts is not responsible for the privacy practices of these vendors,
                    though we work with reputable partners to protect your data.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies & Tracking Technologies */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Cookie className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">5. Cookies & Tracking Technologies</h2>
                  <p className="text-muted-foreground mb-2">We use cookies and similar technologies to:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Improve website functionality.</li>
                    <li>Analyze usage.</li>
                    <li>Provide personalized content and ads.</li>
                    <li>You can control cookie settings through your browser preferences.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">6. Data Retention</h2>
                  <p className="text-muted-foreground mb-2">
                    We retain your personal information for as long as necessary to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Fulfill the purposes outlined in this policy.</li>
                    <li>Comply with legal obligations.</li>
                    <li>Resolve disputes.</li>
                    <li>
                      You may request account deletion by contacting us at{" "}
                      <a href="mailto:newmandesigners@gmail.com" className="text-[#e76f51] hover:underline">
                        newmandesigners@gmail.com
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            
            {/* Security of Your Information */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Lock className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">7. Security of Your Information</h2>
                  <p className="text-muted-foreground mb-2">
                    We implement reasonable security measures to protect your personal information from unauthorized
                    access, use, or disclosure. However, no method of transmission over the internet or electronic
                    storage is completely secure, so we cannot guarantee absolute security.
                  </p>
                </div>
              </div>
            </div>

            {/* Children's Privacy */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Child className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">8. Children's Privacy</h2>
                  <p className="text-muted-foreground mb-2">
                    Our Site is not intended for children under the age of 13. We do not knowingly collect personal
                    information from children under 13. If you are a parent or guardian and believe that your child has
                    provided us with personal information, please contact us, and we will take steps to delete such
                    information.
                  </p>
                </div>
              </div>
            </div>

            {/* International Data Transfer */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Globe className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">9. International Data Transfer</h2>
                  <p className="text-muted-foreground mb-2">
                    Your information may be transferred to and maintained on servers located outside of your country or
                    other governmental jurisdiction where the data protection laws may differ than those from your
                    jurisdiction.
                  </p>
                </div>
              </div>
            </div>

            {/* Changes to This Privacy Policy */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <FileText className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">10. Changes to This Privacy Policy</h2>
                  <p className="text-muted-foreground mb-2">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                    the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for
                    any changes.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <div className="flex items-start">
                <div className="bg-amber-500/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Mail className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-amber-500">11. Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:newmandesigners@gmail.com" className="text-[#e76f51] hover:underline">
                      newmandesigners@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}
