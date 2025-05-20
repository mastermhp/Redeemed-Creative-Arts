"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Star, Clock, Calendar, ExternalLink, Play, FileText } from 'lucide-react'

const ResourceCard = ({ resource, onMouseEnter, onMouseLeave }) => {
  const [isHovered, setIsHovered] = useState(false)

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  }

  const imageVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  }

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  const typeIconMap = {
    "E-Book": <Download className="h-4 w-4" />,
    "Tutorial": <ExternalLink className="h-4 w-4" />,
    "Video Course": <Play className="h-4 w-4" />,
    "Webinar": <Play className="h-4 w-4" />,
    "Workshop": <Calendar className="h-4 w-4" />,
    "Guide": <Download className="h-4 w-4" />
  }

  return (
    <motion.div
      className="bg-card rounded-xl overflow-hidden shadow-md border border-border relative group"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onMouseEnter={() => {
        setIsHovered(true)
        if (onMouseEnter) onMouseEnter()
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        if (onMouseLeave) onMouseLeave()
      }}
    >
      {/* Featured badge */}
      {resource.featured && (
        <div className="absolute top-4 right-4 z-20">
          <motion.div 
            className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Star className="h-3 w-3 mr-1" fill="white" /> FEATURED
          </motion.div>
        </div>
      )}

      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        <motion.div variants={imageVariants} className="h-full w-full">
          <Image
            src={resource.image || "/placeholder.svg"}
            alt={resource.title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick action button */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          variants={buttonVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          <Button 
            className="bg-teal-500 hover:bg-teal-600 text-white"
            size="sm"
          >
            {resource.downloadable ? (
              <span className="flex items-center">
                <Download className="mr-2 h-4 w-4" /> Download
              </span>
            ) : (
              <span className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" /> View Details
              </span>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-teal-500/10 text-teal-500">
            {resource.category}
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center">
            {typeIconMap[resource.type] || <FileText className="h-3 w-3 mr-1" />}
            {resource.type}
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{resource.title}</h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{resource.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {resource.date}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {resource.readTime}
          </div>
        </div>
      </div>

      {/* Author */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-medium text-sm">
            {resource.author.split(' ').map(name => name[0]).join('')}
          </div>
          <span className="ml-3 text-sm font-medium">{resource.author}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ResourceCard
