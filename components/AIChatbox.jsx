"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Sparkles, Bot, User, Loader2, Zap, MessageCircle, Maximize2, Minimize2 } from "lucide-react"

const suggestedQuestions = [
  "How can I join as an artist?",
  "What benefits do patrons receive?",
  "How do churches connect with artists?",
  "When will the platform be fully functional?",
  "How can I support this ministry?",
]

const AIChatbox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm the Redeemed Creative Arts assistant. How can I help you today?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = { role: "user", content: inputValue }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setShowSuggestions(false)

    // Simulate AI thinking
    setTimeout(() => {
      // Predefined responses based on keywords
      let response
      const input = inputValue.toLowerCase()

      if (input.includes("artist") || input.includes("join")) {
        response = {
          role: "assistant",
          content:
            "Artists can join our platform by creating an account and submitting their portfolio for review. We welcome all forms of visual art that align with our Christian values. You'll be able to showcase your work, connect with patrons, and engage with churches looking for artistic talent.",
        }
      } else if (input.includes("patron") || input.includes("support")) {
        response = {
          role: "assistant",
          content:
            "Patrons support our artists through purchases, commissions, and monthly giving. Benefits include early access to new artwork, special pricing, and the joy of supporting Christian artists. Your patronage helps sustain creative ministries and spreads faith-inspired art.",
        }
      } else if (input.includes("church") || input.includes("ministry")) {
        response = {
          role: "assistant",
          content:
            "Churches can connect with artists for commissions, exhibitions, workshops, and ministry collaborations. Our platform helps you find artists whose style and vision align with your ministry needs. We facilitate the entire process from discovery to project completion.",
        }
      } else if (input.includes("when") || input.includes("launch") || input.includes("functional")) {
        response = {
          role: "assistant",
          content:
            "We're building Redeemed Creative Arts in phases. Phase 1 focuses on the platform foundation, Phase 2 adds core functionality, and Phase 3 introduces advanced features. Sign up for our newsletter to stay updated on our progress!",
        }
      } else {
        response = {
          role: "assistant",
          content:
            "Thank you for your question! Our team is working to provide comprehensive information about all aspects of Redeemed Creative Arts. For more specific details, please contact us directly through our contact form, and a team member will assist you promptly.",
        }
      }

      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestedQuestion = (question) => {
    setInputValue(question)
    handleSend()
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsExpanded(false)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Animation variants
  const chatButtonVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 0 15px rgba(217, 119, 6, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.9 },
  }

  const chatContainerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.3,
      },
    },
  }

  const bubbleVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.3,
      },
    },
    exit: {
      scale: 0,
      transition: { duration: 0.2 },
    },
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    boxShadow: ["0 0 0 rgba(217, 119, 6, 0.4)", "0 0 10px rgba(217, 119, 6, 0.6)", "0 0 0 rgba(217, 119, 6, 0.4)"],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    },
  }

  const floatingAnimation = {
    y: [0, -6, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  const typingAnimation = {
    scale: [0.8, 1, 0.8],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 0.6,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  // Determine chat container height based on expanded state
  const chatHeight = isExpanded ? "h-[80vh]" : "h-[450px]"
  const chatWidth = isExpanded ? "w-[450px]" : "w-[350px]"

  return (
    <>
      {/* Chat toggle button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={chatButtonVariants}
      >
        <motion.button
          onClick={toggleChat}
          className="relative w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-[#e76f51] text-white flex items-center justify-center shadow-lg"
          animate={!isOpen ? pulseAnimation : {}}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageCircle className="h-7 w-7" />
              <motion.span
                className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-bold text-amber-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  delay: 0.5,
                }}
              >
                1
              </motion.span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Chat container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-24 right-6 ${chatWidth} ${chatHeight} bg-card rounded-2xl shadow-2xl overflow-hidden z-40 border border-amber-500/20`}
            variants={chatContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-amber-500 to-[#e76f51] p-4 flex items-center justify-between">
              <div className="flex items-center">
                <motion.div
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white">Redeemed AI Assistant</h3>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <span className="text-xs text-white/80">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={toggleExpand} className="text-white/80 hover:text-white transition-colors">
                  {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-4 overflow-y-auto h-[calc(100%-140px)] bg-gradient-to-b from-amber-50/5 to-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`flex items-start max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                        message.role === "user" ? "bg-amber-500 ml-2" : "bg-[#e76f51]"
                      }`}
                      variants={bubbleVariants}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </motion.div>
                    <motion.div
                      className={`rounded-2xl p-3 ${
                        message.role === "user"
                          ? "bg-amber-500 text-white rounded-tr-none"
                          : "bg-card border border-amber-500/20 rounded-tl-none"
                      }`}
                      variants={bubbleVariants}
                      layout
                    >
                      <p className="text-sm">{message.content}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="mb-4 flex justify-start"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-start max-w-[80%]">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-[#e76f51] flex items-center justify-center mr-2"
                      variants={bubbleVariants}
                    >
                      <Bot className="h-4 w-4 text-white" />
                    </motion.div>
                    <motion.div
                      className="rounded-2xl p-3 bg-card border border-amber-500/20 rounded-tl-none"
                      variants={bubbleVariants}
                    >
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-amber-500"
                            animate={typingAnimation}
                            transition={{
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            <AnimatePresence>
              {showSuggestions && messages.length < 3 && (
                <motion.div
                  className="px-4 pb-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        className="text-xs bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                        onClick={() => handleSuggestedQuestion(question)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center">
                <motion.div
                  className="flex-1 bg-card border border-amber-500/20 rounded-l-full rounded-r-full overflow-hidden flex items-center pr-2"
                  whileFocus={{ borderColor: "rgba(217, 119, 6, 0.5)" }}
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 p-3 bg-transparent outline-none text-sm"
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      inputValue.trim() && !isTyping
                        ? "bg-gradient-to-r from-amber-500 to-[#e76f51] text-white"
                        : "bg-amber-500/10 text-amber-500/50"
                    }`}
                    whileHover={inputValue.trim() && !isTyping ? { scale: 1.1 } : { scale: 1 }}
                    whileTap={inputValue.trim() && !isTyping ? { scale: 0.9 } : { scale: 1 }}
                  >
                    {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </motion.button>
                </motion.div>
              </div>
              <motion.div
                className="mt-2 text-xs text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="flex items-center justify-center">
                  <Zap className="h-3 w-3 mr-1 text-amber-500" />
                  Powered by Redeemed Creative Arts AI
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIChatbox
