"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { skillLevels } from "@/lib/data"

interface ProjectDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    technologies: string[]
    image: string
  } | null
}

export default function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
  if (!project) return null
  
  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-card/95 backdrop-blur-md w-full max-w-4xl max-h-[90vh] overflow-auto rounded-xl shadow-2xl relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            // Prevent clicks from propagating to backdrop
            onClick={(e) => e.stopPropagation()}
          >
            {/* Project hero image */}
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img 
                src={project.image || "/placeholder.svg"} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              </div>
            </div>
            
            {/* Project content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="inline-block w-8 h-1 bg-primary mr-3"></span>
                  Project Overview
                </h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
              
              {/* Technologies */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="inline-block w-8 h-1 bg-primary mr-3"></span>
                  Technologies Used
                </h3>
                <div className="space-y-4">
                  {project.technologies.map((tech, idx) => {
                    const level = skillLevels[tech] || 70
                    return (
                      <div key={tech} className="space-y-1.5">
                        <div className="flex justify-between">
                          <span className="font-medium">{tech}</span>
                          <span className="text-sm text-muted-foreground">{level}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-muted/40 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-primary/60"
                            initial={{ width: 0 }}
                            animate={{ width: `${level}%` }}
                            transition={{
                              duration: 1.2,
                              delay: idx * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 