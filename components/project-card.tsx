"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { skillLevels, skillsData } from "@/lib/data"
import { Eye } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  onClick: () => void
}

export default function ProjectCard({ title, description, image, onClick }: ProjectCardProps) {
  return (
    <Card 
      className="h-full flex flex-col overflow-hidden bg-card/90 border border-border/40 backdrop-blur-sm
        shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Decorative top border with gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-primary/60 to-primary/20"></div>
      
      <div className="aspect-video overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        
        {/* Overlay that appears on hover */}
        <div className="absolute inset-0 bg-primary/30 backdrop-blur-[2px] z-20 opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-background/20 backdrop-blur-md rounded-full p-3"
          >
            <Eye className="h-6 w-6 text-white" />
          </motion.div>
        </div>
        
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 z-30">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      
      <CardContent className="flex-grow py-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="mt-3 text-sm text-primary font-medium flex justify-end items-center gap-1.5">
          View Details
          <motion.span 
            initial={{ x: 0 }} 
            whileHover={{ x: 3 }}
            className="inline-block"
          >→</motion.span>
        </div>
      </CardContent>
    </Card>
  )
} 