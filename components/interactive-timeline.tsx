"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { experienceData } from "@/lib/data"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function InteractiveTimeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})

  const toggleProject = (projectName: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectName]: !prev[projectName],
    }))
  }

  return (
    <section id="experience" className="pt-12 pb-4 relative bg-gradient-to-b from-transparent to-muted/10">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 relative z-10"
        >
          <h2 className="text-4xl font-bold tracking-tight text-center mb-12">Work Experience</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 rounded-full"></div>

            {experienceData.map((experience, idx) => (
              <div key={experience.id} className={`${idx === experienceData.length - 1 ? 'mb-8' : 'mb-16'} relative`}>
                <div className="flex justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative z-10 bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium shadow-lg shadow-primary/20"
                  >
                    {experience.date}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  <Card className="border-primary/10 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
                    <CardHeader className="relative z-10">
                      <div className="flex flex-col space-y-2">
                        <CardTitle className="text-2xl font-bold">{experience.title}</CardTitle>
                        <CardDescription className="text-lg font-medium text-foreground/80">{experience.company}</CardDescription>
                        <CardDescription className="mt-2 text-muted-foreground">{experience.description}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experience.projects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="h-full"
                    >
                      <Card
                        className={`h-full border-primary/10 bg-card/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
                          expandedProjects[project.name] ? "shadow-xl ring-1 ring-primary/20" : ""
                        }`}
                      >
                        <CardHeader className="pb-2 relative">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary/10"></div>
                          <CardTitle className="text-xl flex justify-between items-center">
                            <span>{project.name}</span>
                            <button
                              onClick={() => toggleProject(project.name)}
                              className="text-muted-foreground hover:text-primary transition-colors rounded-full p-1 hover:bg-primary/10"
                              aria-label={
                                expandedProjects[project.name] ? "Collapse project details" : "Expand project details"
                              }
                            >
                              {expandedProjects[project.name] ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </button>
                          </CardTitle>
                          <CardDescription className="text-foreground/70 font-medium">{project.role}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {project.technologies.map((tech) => (
                                <Badge 
                                  key={tech} 
                                  variant="secondary" 
                                  className="bg-primary/10 text-foreground hover:bg-primary/20 transition-colors"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: expandedProjects[project.name] ? "auto" : 0,
                              opacity: expandedProjects[project.name] ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-4 pt-3">
                              <div>
                                <h4 className="font-medium mb-2 text-foreground/90">Description</h4>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2 text-foreground/90">Impact</h4>
                                <p className="text-sm text-muted-foreground">{project.impact}</p>
                              </div>
                            </div>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

