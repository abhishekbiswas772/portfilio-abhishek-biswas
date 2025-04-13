"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"
import { certificationsData } from "@/lib/data"

export default function FloatingCertifications() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="certifications" ref={ref} className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Certifications</h2>

        <div className="relative">
          {certificationsData.map((certification, index) => {
            // Calculate random positions and animations
            const xOffset = ((index % 3) - 1) * 20
            const yOffset = (Math.floor(index / 2) % 2) * 15
            const delay = index * 0.1

            return (
              <motion.div
                key={certification.id}
                initial={{
                  opacity: 0,
                  x: xOffset,
                  y: 50 + yOffset,
                  scale: 0.9,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.7,
                  delay,
                  type: "spring",
                  stiffness: 50,
                }}
                className="mb-8"
              >
                <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 flex items-center gap-4">
                    <motion.div
                      className="rounded-full p-2 bg-primary/10 flex-shrink-0"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 5,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    >
                      <Award className="h-6 w-6 text-primary" />
                    </motion.div>
                    <span className="font-medium">{certification.name}</span>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

