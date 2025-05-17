"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { FileText, Shield, AlertTriangle, Users, DollarSign, Ban, MessageSquare, Lock, Heart } from "lucide-react"

export default function TermsPage() {
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
        <motion.h1 className="text-4xl font-bold mb-4 text-foreground" variants={itemVariants}>
          Terms of Service
        </motion.h1>
        <motion.p className="text-lg text-muted-foreground max-w-3xl mx-auto" variants={itemVariants}>
          Effective Date: May 17, 2025
        </motion.p>
        <motion.p className="text-muted-foreground max-w-3xl mx-auto mt-4" variants={itemVariants}>
          Welcome to Redeemed Creative Arts. By accessing or using our website (the "Site"), you agree to comply with
          and be bound by the following Terms of Service ("Terms"). Please read these carefully before using the Site.
          If you do not agree to these Terms, please do not use the Site.
        </motion.p>
      </motion.div>

      {/* Terms Content */}
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
            {/* Overview of the Platform */}
            <div>
              <div className="flex items-start">
                <div className="bg-primary/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-primary">1. Overview of the Platform</h2>
                  <p className="text-muted-foreground">
                    Redeemed Creative Arts is a faith-based creative community designed to connect artists, patrons, and
                    churches/organizations. The platform fosters engagement, sales, and support for Christian visual
                    artists, offering a marketplace, interactive features, and opportunities for ministries and
                    organizations to support and showcase creative works.
                  </p>
                </div>
              </div>
            </div>

            {/* Types of Accounts */}
            <div>
              <div className="flex items-start">
                <div className="bg-primary/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-primary">2. Types of Accounts</h2>

                  <h3 className="text-lg font-medium mb-2 text-foreground">Artists</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>Must be human artists submitting original works created solely by them.</li>
                    <li>AI-generated art is strictly prohibited.</li>
                    <li>
                      Artists are responsible for all content uploaded and must ensure they hold the rights to the works
                      submitted.
                    </li>
                    <li>
                      Artists grant Redeemed Creative Arts a limited, non-exclusive license to display and promote their
                      artwork within the platform and in affiliated marketing.
                    </li>
                    <li>
                      Artists can earn points, participate in promotions, and submit courses for sale, with all content
                      being subject to review.
                    </li>
                    <li>
                      Can volunteer as a paid or unpaid talent – offering their service or talent to local churches,
                      organizations or events. The platform can pay all or some of the set payment on behalf of members
                      in the "Church Subscriber Membership"
                    </li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-foreground">Patrons (Supporters and Helpers)</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                    <li>
                      Can engage with artists, make purchases, earn points, donate, and participate in community
                      activities.
                    </li>
                    <li>
                      Can send feedback to artists, churches, and organizations but cannot leave official ratings for
                      talent or churches—this is reserved for church accounts.
                    </li>
                    <li>
                      Can volunteer as a paid or unpaid talent – offering their service or talent to local churches,
                      organizations or events. The platform can pay all or some of the set payment on behalf of members
                      in the "Church Subscriber Membership"
                    </li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2 text-foreground">Churches/Organizations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Can use the site for ministry engagement, competitions, events, and rewards programs.</li>
                    <li>
                      Can submit and manage talent outreach, provide ratings and reviews, and access enhanced engagement
                      features.
                    </li>
                    <li>Churches may not submit AI-generated art or videos.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Intellectual Property & Licensing */}
            <div>
              <div className="flex items-start">
                <div className="bg-secondary/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-secondary">3. Intellectual Property & Licensing</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      All content, including artwork, text, videos, and other materials, remain the property of the
                      submitting user (artist or church).
                    </li>
                    <li>
                      Redeemed Creative Arts retains a non-exclusive right to feature, display, and market submitted
                      works within the platform and related promotions.
                    </li>
                    <li>
                      No artwork or content may be reproduced, copied, or distributed without express written permission
                      from the artist and Redeemed Creative Arts.
                    </li>
                    <li>
                      Custom printed products using submitted art are exclusively produced and distributed by Redeemed
                      Creative Arts through approved third-party partners.
                    </li>
                    <li>Buyers and users do not acquire ownership or reproduction rights upon purchasing an item.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Order Fulfillment */}
            <div>
              <div className="flex items-start">
                <div className="bg-accent/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <DollarSign className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-accent">4. Order Fulfillment</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>All, or some, product orders are fulfilled by approved third-party vendors.</li>
                    <li>
                      Redeemed Creative Arts is not responsible for delays, errors, or damages caused by the fulfillment
                      provider, but will assist in resolving any disputes that arise.
                    </li>
                    <li>
                      Buyers acknowledge they are purchasing from Redeemed Creative Arts, with products being fulfilled
                      by third parties.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Prohibited Activities */}
            <div>
              <div className="flex items-start">
                <div className="bg-destructive/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Ban className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-destructive">5. Prohibited Activities</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Submission of AI-generated art or content.</li>
                    <li>Uploading art that infringes on third-party intellectual property rights.</li>
                    <li>Offensive, discriminatory, or abusive behavior toward other users.</li>
                    <li>Circumventing the platform's monetization or fulfillment systems.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Artist & Helper Conduct Clause */}
            <div>
              <div className="flex items-start">
                <div className="bg-primary/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-primary">6. Artist & Helper Conduct Clause</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      All Helpers, Artists, Patrons, and Churches ("Users") agree to act in accordance with Christian
                      values, respect, integrity, and community standards while engaging on the platform or providing
                      services.
                    </li>
                    <li>
                      Redeemed Creative Arts has zero tolerance for any misconduct, illegal activity, or unethical
                      behavior performed by any Helper, Artist, Patron, or Church.
                    </li>
                    <li>
                      Users understand that all engagements, presentations, services, and volunteer work are conducted
                      at their own risk, and Redeemed Creative Arts is not responsible for the conduct, legality, or
                      fitness of any participant or Helper.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Community Standards & Content Guidelines */}
            <div>
              <div className="flex items-start">
                <div className="bg-secondary/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-secondary">
                    7. Community Standards & Content Guidelines
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      All submitted Artwork must adhere to Redeemed Creative Arts' community standards, which require
                      family-friendly, faith-centered, and respectful content.
                    </li>
                    <li>
                      Artwork must not contain violent, obscene, hateful, discriminatory, or otherwise offensive
                      material.
                    </li>
                    <li>
                      The Platform reserves the right to remove, reject, or restrict any Artwork at its sole discretion
                      if it is found to violate these standards.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Content Rights Clause */}
            <div>
              <div className="flex items-start">
                <div className="bg-accent/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-accent">8. User Content Rights Clause</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      Users may submit talent profiles, availability, videos, experiences, and other personal
                      information for visibility on the platform.
                    </li>
                    <li>
                      Talent controls their own visibility settings, including distance preferences, availability, and
                      services they wish to offer.
                    </li>
                    <li>
                      Redeemed Creative Arts respects the privacy and safety of its users, but all profiles created will
                      be considered public within the scope of the platform.
                    </li>
                    <li>
                      Churches and organizations are considered public entities and do not control how talents are
                      listed or surfaced outside of their account preferences.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Dispute Resolution Clause */}
            <div>
              <div className="flex items-start">
                <div className="bg-primary/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-primary">9. Dispute Resolution Clause</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      Redeemed Creative Arts is not responsible for disputes between users, including but not limited to
                      Helpers, Churches, Patrons, or Artists.
                    </li>
                    <li>
                      Any disputes regarding payments, services, cancellations, or misconduct must be resolved directly
                      between the involved parties.
                    </li>
                    <li>
                      In the case of severe claims, Redeemed Creative Arts reserves the right to investigate reported
                      misconduct and take necessary action, including account suspension.
                    </li>
                    <li>
                      Users agree to first attempt mediation through Redeemed Creative Arts' community support before
                      pursuing any external legal remedies.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Refunds & Returns Clause */}
            <div>
              <div className="flex items-start">
                <div className="bg-secondary/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <DollarSign className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-secondary">10. Refunds & Returns Clause</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      Payments for services, events, talent bookings, or memberships are non-refundable unless
                      explicitly stated otherwise by Redeemed Creative Arts.
                    </li>
                    <li>
                      Customized products, commissioned works, and digital services provided through the platform are
                      non-returnable and non-refundable.
                    </li>
                    <li>
                      Redeemed Creative Arts does not guarantee satisfaction with the services provided by Helpers or
                      Churches, as all engagements are arranged at the user's discretion and risk.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Donations & Transparency Clause */}
            <div>
              <div className="flex items-start">
                <div className="bg-accent/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Heart className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-accent">11. Donations & Transparency Clause</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      Donations made to Redeemed Creative Arts are voluntary, non-refundable, and do not substitute for
                      Membership fees.
                    </li>
                    <li>
                      A percentage of donations is allocated to support the Redeemed Creative Arts team, community
                      initiatives, and event logistics.
                    </li>
                    <li>
                      All donors, regardless of account status, may earn points redeemable for certain rewards, but
                      Redeemed Creative Arts is not obligated to provide specific returns on donations.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Community Guidelines & Conduct */}
            <div>
              <div className="flex items-start">
                <div className="bg-primary/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-primary">12. Community Guidelines & Conduct</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      Users agree to foster a respectful and encouraging environment aligned with Christian values.
                    </li>
                    <li>
                      Redeemed Creative Arts reserves the right to suspend or remove accounts that violate these
                      standards or abuse the community.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div>
              <div className="flex items-start">
                <div className="bg-destructive/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-destructive">13. Limitation of Liability</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      Redeemed Creative Arts provides this platform "as-is" and does not guarantee uninterrupted or
                      error-free service.
                    </li>
                    <li>
                      Under no circumstances will Redeemed Creative Arts, its partners, or affiliates be liable for any
                      indirect, incidental, or consequential damages arising from the use of the Site, its services, or
                      products.
                    </li>
                    <li>
                      Redeemed Creative Arts is not responsible for the safety, quality, or legality of services
                      provided by Helpers, talent, churches, or any participants.
                    </li>
                    <li>
                      Users engage at their own risk, and Redeemed Creative Arts disclaims any and all liability for
                      injury, loss, damages, or legal actions arising from services rendered, including travel
                      arrangements, events, or presentations.
                    </li>
                    <li>
                      Redeemed Creative Arts does not employ or endorse any Helper or Church, and all arrangements are
                      made between the parties independently.
                    </li>
                    <li>
                      Donations do not guarantee any specific outcomes or rewards and are given at the donor's
                      discretion.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Indemnification */}
            <div>
              <div className="flex items-start">
                <div className="bg-secondary/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-secondary">14. Indemnification</h2>
                  <p className="text-muted-foreground">
                    Users agree to indemnify and hold harmless Redeemed Creative Arts and its affiliates from any
                    claims, demands, or liabilities resulting from the user's content, actions, or misuse of the
                    platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Digital Agreement & Consent */}
            <div>
              <div className="flex items-start">
                <div className="bg-accent/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <Lock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-accent">15. Digital Agreement & Consent</h2>
                  <p className="text-muted-foreground">
                    By using the site, creating an account, or making a purchase, you agree to these Terms of Service
                    and all associated policies (including Artist Disclaimer, Rights Agreement, and Buyer Terms).
                  </p>
                </div>
              </div>
            </div>

            {/* Updates to Terms */}
            <div>
              <div className="flex items-start">
                <div className="bg-primary/30 p-3 rounded-full mr-4 flex items-center justify-center mt-1">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-primary">16. Updates to Terms</h2>
                  <p className="text-muted-foreground">
                    Redeemed Creative Arts reserves the right to modify these Terms at any time. Continued use of the
                    Site after changes are posted will constitute acceptance of the revised Terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 p-6 bg-background rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-4 text-primary">Contact Information</h3>
              <p className="text-muted-foreground">
                For any questions or concerns regarding these Terms, please contact us at:{" "}
                <a href="mailto:newmandesigners@gmail.com" className="text-primary hover:underline">
                  newmandesigners@gmail.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}
