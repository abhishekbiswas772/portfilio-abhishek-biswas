"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { skillLevels } from "@/lib/data"

interface FlipCardProps {
  frontTitle: string
  frontImage: string
  backTitle: string
  backDescription: string
  technologies: string[]
}

export default function FlipCard({ frontTitle, frontImage, backTitle, backDescription, technologies }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      className="h-full perspective-1000 cursor-pointer"
      onClick={handleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleFlip()
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label={`Flip card to see ${isFlipped ? "front" : "back"} of ${frontTitle}`}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of card */}
        <div className={`absolute w-full h-full backface-hidden ${isFlipped ? "opacity-0" : "opacity-100"}`}>
          <Card className="h-full">
            <div className="aspect-video overflow-hidden">
              <img
                src={frontImage || "/placeholder.svg"}
                alt={frontTitle}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{frontTitle}</CardTitle>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">Click to see details</CardFooter>
          </Card>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full backface-hidden rotate-y-180 ${isFlipped ? "opacity-100" : "opacity-0"}`}
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{backTitle}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <CardDescription className="text-sm">{backDescription}</CardDescription>

              {/* Technologies with Progress Bars */}
              <div>
                <h4 className="font-medium mb-3 text-base">Key Technologies:</h4>
                <div className="space-y-4">
                  {technologies.map((tech, index) => {
                    const level = skillLevels[tech] || 70
                    return (
                      <div key={tech} className="space-y-1.5">
                        <div className="flex justify-between">
                          <span className="font-medium text-sm">{tech}</span>
                          <span className="text-xs text-muted-foreground">{level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: index * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

