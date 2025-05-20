"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Check,
  Heart,
  Calendar,
  Shield,
  Star,
  Eye,
  AlertCircle,
  Gift,
  Handshake,
  Lightbulb,
  FileText,
  UserCheck,
  Lock,
  Ban,
  Flag,
  HandIcon as PrayingHands,
  Users,
  DollarSign,
  Globe,
  FileTextIcon as FileText2,
  MessageSquare,
} from "lucide-react"

export default function HelperAgreementPage() {
  const [agreementAccepted, setAgreementAccepted] = useState(false)
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
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Helper code of conduct items with icons
  const helperCodeItems = [
    {
      icon: <PrayingHands className="h-5 w-5 text-amber-500" />,
      title: "Honor God in All I Do",
      description:
        "I will use my gifts to uplift the body of Christ, serve others with excellence, and represent my faith and community with integrity.",
    },
    {
      icon: <Handshake className="h-5 w-5 text-amber-500" />,
      title: "Serve with Respect & Kindness",
      description:
        "I will treat every person, church, and event with respect, humility, and patience. I will avoid any language, behavior, or actions that could cause offense or harm.",
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
      title: "Be Honest About My Talents & Experience",
      description:
        "I will accurately represent my skills, experience, and abilities. I will not mislead churches or organizations about what I can offer.",
    },
    {
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
      title: "Honor My Commitments",
      description:
        "If I commit to an event, service, or engagement, I will show up on time and prepared. If I cannot fulfill a commitment, I will notify the appropriate contacts as soon as possible.",
    },
    {
      icon: <Shield className="h-5 w-5 text-amber-500" />,
      title: "Follow All Safety, Legal & Ethical Standards",
      description:
        "I will respect local laws, safety protocols, and community guidelines. I will never engage in illegal activity, misconduct, or unethical behavior while serving through Redeemed Creative Arts.",
    },
    {
      icon: <Star className="h-5 w-5 text-amber-500" />,
      title: "Accept Ratings & Reviews Graciously",
      description:
        "I understand that churches and organizations may provide ratings and feedback on my service. I will receive feedback as an opportunity for growth, even if critical.",
    },
    {
      icon: <Eye className="h-5 w-5 text-amber-500" />,
      title: "Protect My Visibility & Privacy",
      description:
        "I understand that I control my visibility settings on the platform. I will keep my personal information secure and only share necessary details with trusted contacts.",
    },
    {
      icon: <Ban className="h-5 w-5 text-amber-500" />,
      title: "No Harassment or Inappropriate Behavior",
      description:
        "I will never engage in harassment, discrimination, or inappropriate behavior toward anyone in the Redeemed Creative Arts community.",
    },
    {
      icon: <Flag className="h-5 w-5 text-amber-500" />,
      title: "Report Any Issues or Misconduct",
      description:
        "If I witness or experience misconduct, I will report it to Redeemed Creative Arts support immediately.",
    },
    {
      icon: <Gift className="h-5 w-5 text-amber-500" />,
      title: "Serve with Generosity & Joy",
      description:
        "I will serve not just for rewards or recognition, but with a heart of generosity, joy, and love for my community.",
    },
  ]

  // Church code of conduct items with icons
  const churchCodeItems = [
    {
      icon: <PrayingHands className="h-5 w-5 text-amber-500" />,
      title: "Honor Christ in Every Engagement",
      description:
        "We will honor God by upholding integrity, respect, and kindness in all interactions on and off the platform. Our events, services, and outreach will reflect Biblical values of love, inclusivity, respect, and compassion.",
    },
    {
      icon: <Handshake className="h-5 w-5 text-amber-500" />,
      title: "Treat Helpers & Participants with Respect",
      description:
        "We will welcome Helpers, artists, and patrons as guests of our church or event, treating them with dignity and hospitality. We will not tolerate any form of discrimination, harassment, or abuse.",
    },
    {
      icon: <FileText className="h-5 w-5 text-amber-500" />,
      title: "Be Transparent About Opportunities & Expectations",
      description:
        "We will clearly communicate expectations, schedules, roles, and any financial commitments (if applicable) when engaging Helpers. We will never exploit Helpers, artists, or volunteers.",
    },
    {
      icon: <DollarSign className="h-5 w-5 text-amber-500" />,
      title: "Honor Financial Agreements",
      description:
        "If engaging paid Helpers or contributors, we will ensure payments or reimbursements are honored as agreed. We understand that any agreements made outside of Redeemed Creative Arts are solely our responsibility.",
    },
    {
      icon: <Shield className="h-5 w-5 text-amber-500" />,
      title: "Provide a Safe Environment",
      description:
        "We will provide a safe, respectful, and welcoming space for Helpers, artists, patrons, and guests. We will ensure our events and services comply with local laws, safety regulations, and ethical standards.",
    },
    {
      icon: <Globe className="h-5 w-5 text-amber-500" />,
      title: "Respect Helper Visibility Preferences",
      description:
        "We will respect Helpers' set distances and visibility preferences when searching for or inviting talent. We will never pressure or coerce a Helper to override their preferences.",
    },
    {
      icon: <FileText2 className="h-5 w-5 text-amber-500" />,
      title: "Provide Fair & Honest Ratings and Reviews",
      description:
        "We will use the platform's rating and review system responsibly, providing fair and honest feedback based on actual experiences. We understand that reviews are limited to pre-set responses for accountability.",
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-amber-500" />,
      title: "Resolve Disputes Respectfully",
      description:
        "Should any issues or misunderstandings arise, we will work to resolve them respectfully and in the spirit of unity. We will report serious concerns to Redeemed Creative Arts for support.",
    },
    {
      icon: <Lock className="h-5 w-5 text-amber-500" />,
      title: "Protect Privacy and Data",
      description:
        "We will safeguard any private information shared by Helpers, artists, and patrons. We will not misuse personal data for purposes outside of the engagement facilitated by the platform.",
    },
    {
      icon: <Heart className="h-5 w-5 text-amber-500" />,
      title: "Use Redeemed Creative Arts as a Ministry Tool",
      description:
        "We will use Redeemed Creative Arts to uplift our ministry, support local artists, and strengthen the body of Christ in our community and beyond. We commit to using this platform for Kingdom purposes, not personal or organizational gain.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-40 max-w-6xl relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [-50, 50, -50],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [50, -50, 50],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
      </div>

      <motion.div
        className="text-center mb-12 relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
      >
        <motion.h1 className="text-4xl font-bold mb-4 text-gray-100" variants={itemVariants}>
          REDEEMED CREATIVE ARTS HELPER AGREEMENT
        </motion.h1>
        <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
          This Helper Agreement ("Agreement") is entered into by and between you, the user ("Helper"), and Redeemed
          Creative Arts ("Platform"). By registering as a Helper on Redeemed Creative Arts, you acknowledge, agree to,
          and accept the following terms and conditions:
        </motion.p>
      </motion.div>

      {/* Helper Agreement */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div
          className="bg-[#171717] p-8 rounded-xl shadow-md border border-[#333333] relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          ></motion.div>

          <div className="relative z-10">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-[#333333]">
                <AccordionTrigger className="text-gray-100 hover:text-amber-500 transition-colors">
                  <div className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2 text-amber-500" />
                    <span>1. Representation & Truthfulness</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc">
                      You certify that all information provided on your profile, including talents, experiences, skills,
                      qualifications, and availability, is truthful, accurate, and current.
                    </li>
                    <li className="list-disc">
                      You confirm that you are legally able to offer the services you have registered to provide and
                      that you meet all local, state, and federal requirements for such services.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-[#333333]">
                <AccordionTrigger className="text-gray-100 hover:text-amber-500 transition-colors">
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-amber-500" />
                    <span>2. Visibility & Searchability</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc">
                      You understand that your profile will be visible to Churches, Organizations, and other users
                      according to the distance, availability, and preferences you set.
                    </li>
                    <li className="list-disc">
                      You have full control over your visibility and can adjust your preferences at any time within your
                      account settings.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-[#333333]">
                <AccordionTrigger className="text-gray-100 hover:text-amber-500 transition-colors">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-amber-500" />
                    <span>3. Engagement Terms & Compensation</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc">
                      You agree that any engagements, volunteer work, or paid services you provide are at your
                      discretion and subject to direct agreement between you and the Church, Patron, or Organization.
                    </li>
                    <li className="list-disc">
                      Redeemed Creative Arts does not guarantee, manage, or mediate any payment terms outside of
                      platform-facilitated payments where applicable.
                    </li>
                    <li className="list-disc">
                      Helpers under free membership tiers are not eligible for payments through Redeemed Creative Arts;
                      only through private agreements or directly by Churches.
                    </li>
                    <li className="list-disc">
                      Paid Helpers may receive supplemental payments for a limited time by Redeemed Creative Arts,
                      subject to funding, and at the discretion of the subscribing Church ("Membership").
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-[#333333]">
                <AccordionTrigger className="text-gray-100 hover:text-amber-500 transition-colors">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-amber-500" />
                    <span>4. Conduct & Accountability</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc">
                      You agree to conduct yourself in a professional, ethical, and Christ-honoring manner at all times
                      when representing yourself as a Helper.
                    </li>
                    <li className="list-disc">
                      You acknowledge that any misconduct, unethical behavior, or illegal activity may result in
                      immediate removal from the Platform and possible legal action.
                    </li>
                    <li className="list-disc">
                      Redeemed Creative Arts disclaims any liability for your actions, services, or conduct during or
                      outside of platform engagements.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-[#333333]">
                <AccordionTrigger className="text-gray-100 hover:text-amber-500 transition-colors">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                    <span>5. Liability Release & Indemnification</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc">
                      You agree to indemnify and hold harmless Redeemed Creative Arts, its affiliates, employees, and
                      representatives from any claims, damages, losses, injuries, or disputes arising from your
                      services, activities, or conduct.
                    </li>
                    <li className="list-disc">
                      You fully release Redeemed Creative Arts from any liability for personal injury, property damage,
                      financial loss, or any other harm resulting from engagements initiated through the Platform.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b border-[#333333]">
                <AccordionTrigger className="text-gray-100 hover:text-amber-500 transition-colors">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-amber-500" />
                    <span>6. Ratings, Reviews & Feedback</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc">
                      You acknowledge that ratings and reviews provided by Churches and Organizations after services are
                      rendered will be visible on your profile.
                    </li>
                    <li className="list-disc">
                      Ratings and reviews are based on pre-set selections and cannot be altered or disputed except in
                      cases of clear abuse or violation of community guidelines.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-b border-[#333333]">
                <AccordionTrigger className="text-gray-100 hover:text-amber-500 transition-colors">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-amber-500" />
                    <span>7. No Employment Relationship</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc">
                      You understand that Redeemed Creative Arts does not act as your employer, agent, or
                      representative.
                    </li>
                    <li className="list-disc">
                      All engagements are performed as independent contractors, volunteers, or participants, and no
                      employment rights or benefits are implied or provided.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-b border-[#333333]">
                <AccordionTrigger className="text-gray-100 hover:text-amber-500 transition-colors">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                    <span>8. Acknowledgment of Risk</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc">
                      You understand that providing services in person, traveling, and attending events carries inherent
                      risks.
                    </li>
                    <li className="list-disc">
                      You assume all responsibility for your safety, health, and well-being during any engagement or
                      event participation.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border-b border-[#333333]">
                <AccordionTrigger className="text-gray-100 hover:text-amber-500 transition-colors">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-amber-500" />
                    <span>9. Amendments & Updates</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <ul className="space-y-2 pl-7">
                    <li className="list-disc">
                      This Agreement may be updated at any time, and you agree to review such updates when notified.
                    </li>
                    <li className="list-disc">
                      Continued use of the Platform after updates constitutes your acceptance of the revised terms.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 p-4 bg-[#0f0f0f] rounded-lg border border-[#333333]">
              <h3 className="text-xl font-semibold mb-4 text-amber-500">Digital Acknowledgment</h3>
              <p className="text-gray-300 mb-6">
                By clicking "I AGREE" or proceeding to register your talents and services, you acknowledge that you have
                read, understood, and agree to this Helper Agreement and all related Platform policies, including but
                not limited to the Terms of Service, Privacy Policy, and Artist Disclaimer.
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="agreement"
                  checked={agreementAccepted}
                  onCheckedChange={setAgreementAccepted}
                  className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                />
                <label
                  htmlFor="agreement"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                >
                  I have read and agree to the Helper Agreement
                </label>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className={`w-full ${
                    agreementAccepted
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "bg-gray-700 hover:bg-gray-600 cursor-not-allowed"
                  } group relative overflow-hidden`}
                  disabled={!agreementAccepted}
                >
                  <span className="relative z-10 flex items-center">
                    <Check className="mr-2 h-4 w-4" /> I AGREE
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Helper Code of Conduct */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-gray-100" variants={itemVariants}>
          REDEEMED CREATIVE ARTS
          <br />
          HELPER CODE OF CONDUCT
        </motion.h2>
        <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 text-center" variants={itemVariants}>
          As a registered Helper on Redeemed Creative Arts, I commit to honoring the following standards when offering
          my talents, services, or support to churches, organizations, and communities:
        </motion.p>

        <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerContainerVariants}>
          {helperCodeItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#171717] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="flex items-start">
                <motion.div
                  className="bg-amber-900/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.icon}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.1 }}
                  ></motion.div>
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-amber-500">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 p-6 bg-[#0f0f0f] rounded-lg border border-[#333333] text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <p className="text-gray-300 mb-2">
            <span className="text-green-500 mr-2">✓</span>
            By using Redeemed Creative Arts, I agree to honor this Code of Conduct.
          </p>
          <p className="text-gray-300">
            <span className="text-green-500 mr-2">✓</span>I understand that violations may result in suspension or
            removal from the platform.
          </p>
        </motion.div>
      </motion.section>

      {/* Church & Organization Code of Conduct */}
      <motion.section
        className="mb-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.h2 className="text-3xl font-bold mb-4 text-center text-gray-100" variants={itemVariants}>
          REDEEMED CREATIVE ARTS Membership
        </motion.h2>
        <motion.h3 className="text-2xl font-semibold mb-8 text-center text-amber-500" variants={itemVariants}>
          CHURCH & ORGANIZATION SUBSCRIBER CODE OF CONDUCT
        </motion.h3>
        <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 text-center" variants={itemVariants}>
          As a Church, Organization, or Event Host (collectively "Church Subscribers") using Redeemed Creative Arts, we
          commit to fostering a safe, respectful, and God-honoring environment for all Helpers, artists, patrons, and
          community members who engage with us through this platform.
        </motion.p>

        <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerContainerVariants}>
          {churchCodeItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#171717] p-6 rounded-lg shadow-md border border-[#333333] hover:border-amber-600 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="flex items-start">
                <motion.div
                  className="bg-amber-900/30 p-3 rounded-full mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.icon}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.1 }}
                  ></motion.div>
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-amber-500">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 p-6 bg-[#0f0f0f] rounded-lg border border-[#333333] text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <p className="text-gray-300 mb-2">
            <span className="text-green-500 mr-2">✓</span>
            By using Redeemed Creative Arts, we, as Church Subscribers, agree to abide by this Code of Conduct.
          </p>
          <p className="text-gray-300">
            <span className="text-green-500 mr-2">✓</span>We understand that violations may result in the restriction or
            removal of our account and privileges.
          </p>
        </motion.div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="text-center bg-[#171717] p-12 rounded-xl relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        ></motion.div>

        <motion.div className="relative z-10">
          <motion.h2 className="text-3xl font-bold mb-4 text-gray-100" variants={itemVariants}>
            Ready to Share Your Talents?
          </motion.h2>
          <motion.p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto" variants={itemVariants}>
            Join our community of Helpers and use your God-given talents to serve churches and organizations in your
            area.
          </motion.p>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
              <span className="relative z-10">Register as a Helper</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}
