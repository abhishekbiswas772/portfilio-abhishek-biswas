"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"
import { certificationsData } from "@/lib/data"

export default function Certifications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="certifications" className="py-16 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Certifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificationsData.map((certification, index) => (
              <motion.div
                key={certification.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="rounded-full p-2 bg-primary/10 flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-medium">{certification.name}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

