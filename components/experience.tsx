"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { experienceData } from "@/lib/data"

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeProject, setActiveProject] = useState(experienceData[0].projects[0].name)

  return (
    <section id="experience" className="py-16 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Work Experience</h2>

          {experienceData.map((experience) => (
            <Card key={experience.id} className="mb-8">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <CardTitle className="text-xl">{experience.title}</CardTitle>
                    <CardDescription className="text-lg font-medium">{experience.company}</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {experience.date}
                  </Badge>
                </div>
                <CardDescription className="mt-2">{experience.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Projects</h3>
                <Tabs defaultValue={experience.projects[0].name} onValueChange={setActiveProject}>
                  <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-4">
                    {experience.projects.map((project) => (
                      <TabsTrigger key={project.name} value={project.name} className="text-xs md:text-sm">
                        {project.name.split(" ")[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {experience.projects.map((project) => (
                    <TabsContent key={project.name} value={project.name}>
                      <Card>
                        <CardHeader>
                          <CardTitle>{project.name}</CardTitle>
                          <CardDescription>{project.role}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Description</h4>
                            <p>{project.description}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Impact</h4>
                            <p>{project.impact}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

