"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Check, Copyright, Shield, Ban, FileText, AlertCircle } from "lucide-react"

export default function ArtistDisclaimerPage() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
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
    <div className="container mx-auto px-4 py-32 max-w-4xl relative overflow-hidden">
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
          Artist Disclaimer – Redeemed Creative Arts
        </motion.h1>
        <motion.p className="text-lg text-muted-foreground max-w-3xl mx-auto" variants={itemVariants}>
          Use of the site indicates user agrees to adhere to this disclaimer
        </motion.p>
      </motion.div>

      {/* Disclaimer Content */}
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
            {/* Ownership & Originality */}
            <div>
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-primary/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Copyright className="h-6 w-6 text-primary" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-primary">Ownership & Originality</h2>
              </div>

              <div className="text-muted-foreground space-y-3 pl-14">
                <p>
                  By uploading artwork, images, videos, or any creative content ("Artwork") to Redeemed Creative Arts
                  (the "Platform"), you (the "Artist") confirm that:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You are the sole creator and rightful owner of the Artwork submitted.</li>
                  <li>
                    You affirm that you have not infringed upon the intellectual property rights, copyrights,
                    trademarks, or other proprietary rights of any third party in the creation of your Artwork.
                  </li>
                  <li>
                    You understand and agree that it is solely your responsibility to ensure all submissions are your
                    own original work.
                  </li>
                  <li>
                    The Platform reserves the right to review any submitted Artwork for appropriateness and compliance
                    with community standards; however, the Platform is not responsible for verifying the originality or
                    ownership of the Artwork.
                  </li>
                  <li>
                    In the event that any submitted Artwork is found to infringe upon the rights of any third party, or
                    if a claim of infringement is made, the Artist agrees to indemnify, defend, and hold harmless the
                    Platform and its affiliates, partners, directors, employees, and representatives from any legal
                    liability, including but not limited to monetary penalties, legal fees, or claims resulting from
                    such infringement.
                  </li>
                </ul>
              </div>
            </div>

            {/* Strict Prohibition of AI-Generated Artwork */}
            <div>
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-destructive/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Ban className="h-6 w-6 text-destructive" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-destructive">Strict Prohibition of AI-Generated Artwork</h2>
              </div>

              <div className="text-muted-foreground space-y-3 pl-14">
                <p>
                  Redeemed Creative Arts is a platform dedicated to uplifting human creativity inspired by faith and
                  divine purpose. As such:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    The use of Artificial Intelligence (AI), machine learning tools, or generative AI platforms (such as
                    MidJourney, DALL·E, Stable Diffusion, or similar tools) to create, significantly alter, or enhance
                    Artwork submitted to the Platform is strictly prohibited.
                  </li>
                  <li>
                    Any Artwork determined to be AI-generated, or heavily AI-manipulated, will be removed at the sole
                    discretion of the Platform, and may result in account suspension, removal from community activities,
                    forfeiture of points and rewards, and permanent banning.
                  </li>
                  <li>
                    Artists who violate this policy may also face legal action if submissions infringe upon third-party
                    rights or if Artists receive rewards from this Platform under false pretenses.
                  </li>
                </ul>
              </div>
            </div>

            {/* Indemnification & Legal Responsibility */}
            <div>
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-secondary/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Shield className="h-6 w-6 text-secondary" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-secondary">Indemnification & Legal Responsibility</h2>
              </div>

              <div className="text-muted-foreground space-y-3 pl-14">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    By submitting Artwork, the Artist agrees to assume all legal responsibility and liability for the
                    submission, including any claims arising from the content, ownership, or originality of the Artwork.
                  </li>
                  <li>
                    The Artist agrees to indemnify and hold harmless Redeemed Creative Arts, its affiliates, partners,
                    and representatives from any claims, damages, costs, expenses (including attorney's fees), or
                    liabilities arising from the Artist's submissions or actions on the Platform.
                  </li>
                </ul>
              </div>
            </div>

            {/* Use of Artwork on the Platform */}
            <div>
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-accent/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FileText className="h-6 w-6 text-accent" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-accent">Use of Artwork on the Platform</h2>
              </div>

              <div className="text-muted-foreground space-y-3 pl-14">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    By submitting Artwork to Redeemed Creative Arts, you grant the Platform a non-exclusive,
                    royalty-free, worldwide license to display, promote, share, and feature the Artwork within the
                    Platform, newsletters, social media, and other affiliated channels, always crediting you as the
                    Artist.
                  </li>
                  <li>The Artist retains full ownership and copyright over their submitted Artwork.</li>
                </ul>
              </div>
            </div>

            {/* Community Standards & Content Guidelines */}
            <div>
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-primary/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <AlertCircle className="h-6 w-6 text-primary" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-primary">Community Standards & Content Guidelines</h2>
              </div>

              <div className="text-muted-foreground space-y-3 pl-14">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    All submitted Artwork must adhere to Redeemed Creative Arts' community standards, which require
                    family-friendly, faith-centered, and respectful content.
                  </li>
                  <li>
                    Artwork must not contain violent, obscene, hateful, discriminatory, or otherwise offensive material.
                  </li>
                  <li>
                    The Platform reserves the right to remove, reject, or restrict any Artwork at its sole discretion if
                    it is found to violate these standards.
                  </li>
                </ul>
              </div>
            </div>

            {/* Final Acknowledgment */}
            <div>
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-accent/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <AlertTriangle className="h-6 w-6 text-accent" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-accent">Final Acknowledgment</h2>
              </div>

              <div className="text-muted-foreground space-y-3 pl-14">
                <p>
                  By uploading and submitting Artwork to Redeemed Creative Arts, you fully acknowledge and agree to the
                  terms of this Artist Disclaimer. Failure to comply with these terms may result in immediate removal of
                  your Artwork, account restrictions, legal action where actionable, and potential permanent termination
                  of your access to the Platform.
                </p>
              </div>
            </div>

            {/* Digital Agreement */}
            <div className="mt-8 p-6 bg-background rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-4 text-primary">Digital Agreement</h3>

              <div className="flex items-center space-x-2 mb-6">
                <Checkbox
                  id="agreement"
                  checked={disclaimerAccepted}
                  onCheckedChange={setDisclaimerAccepted}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor="agreement"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                >
                  I have read and agree to the Artist Disclaimer
                </label>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className={`w-full ${
                    disclaimerAccepted
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-muted hover:bg-muted/90 cursor-not-allowed"
                  } group relative overflow-hidden`}
                  disabled={!disclaimerAccepted}
                >
                  <span className="relative z-10 flex items-center">
                    <Check className="mr-2 h-4 w-4" /> I AGREE
                  </span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}
