"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { educationData } from "@/lib/data"

export default function ParallaxEducation() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Use a more subtle parallax effect
  const parallaxValues = educationData.map((_, index) => {
    return useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 50 : -50, 0])
  })

  return (
    <section id="education" ref={ref} className="py-12 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold tracking-tight text-center mb-10">Education</h2>

        <div className="space-y-12 relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-primary/30 rounded-full" />

          {educationData.map((education, index) => {
            // Access pre-calculated parallax value
            const y = parallaxValues[index]

            return (
              <motion.div
                key={education.id}
                style={{ y }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 relative`}
              >
                {/* Timeline dot with pulsing animation */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 1, repeat: 0 }}
                  viewport={{ once: true }}
                />

                {/* Date bubble - opposite side on mobile */}
                <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block bg-primary/15 text-primary px-4 py-2 rounded-full font-medium shadow-sm ${
                      index % 2 === 0 ? "mr-8" : "ml-8"
                    }`}
                  >
                    {education.date}
                  </div>
                </div>

                {/* Card - full width on mobile */}
                <div className="w-full md:w-1/2">
                  <Card className="border-primary/10 bg-card/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-primary/20"></div>
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="rounded-full p-2 bg-primary/10">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle>{education.degree}</CardTitle>
                        <CardDescription className="text-foreground/70">{education.institution}</CardDescription>

                        {/* Date shown on mobile */}
                        <div className="md:hidden text-sm text-primary mt-2 font-medium">{education.date}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <span className="inline-flex items-center gap-1 text-sm font-medium bg-primary/10 px-3 py-1 rounded-full">
                          GPA: {education.gpa}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

