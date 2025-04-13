"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { skillsData, skillLevels } from "@/lib/data"
import { 
  Code, 
  Server, 
  Sparkles, 
  Database, 
  Smartphone, 
  Terminal, 
  LineChart, 
  Cloud,
  Cpu,
  Layout
} from "lucide-react"

// Define additional categories
const CATEGORIES = [
  { id: 'programming', name: 'Programming', icon: <Code className="h-5 w-5" /> },
  { id: 'tools', name: 'Tools & Technologies', icon: <Server className="h-5 w-5" /> },
  { id: 'frameworks', name: 'Frameworks', icon: <Layout className="h-5 w-5" /> },
  { id: 'mobile', name: 'Mobile Development', icon: <Smartphone className="h-5 w-5" /> },
  { id: 'backend', name: 'Backend', icon: <Database className="h-5 w-5" /> },
]

// Skill mapping for new categories (add these to your data.ts later)
const SKILLS_BY_CATEGORY = {
  programming: skillsData.programming,
  tools: [
    "Git", 
    "AWS", 
    "PostgreSQL", 
    "MongoDB", 
    "Firebase", 
    "Docker", 
    "Unix"
  ],
  frameworks: ["Flutter", "Django", "Flask", "Fast API", "Spring Boot"],
  mobile: ["iOS (Swift)", "Flutter", "SwiftUI", "Relem", "SQLFLite"],
  backend: ["Flask", "Django", "Spring Boot", "Express", "Postgres", "Mongodb", "Socket", "Rest API"],
}

// Helper function to get icon for skill
const getSkillIcon = (skill: string) => {
  const icons: Record<string, JSX.Element> = {
    "Python": <Terminal className="h-4 w-4" />,
    "Swift": <Smartphone className="h-4 w-4" />,
    "Flutter": <Layout className="h-4 w-4" />,
    "Java": <Cpu className="h-4 w-4" />,
    "C++": <Code className="h-4 w-4" />,
    "AWS": <Cloud className="h-4 w-4" />,
    "MongoDB": <Database className="h-4 w-4" />,
    "Firebase": <Database className="h-4 w-4" />,
  }
  
  return icons[skill] || <Sparkles className="h-4 w-4" />
}

export default function InteractiveSkills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [activeCategory, setActiveCategory] = useState<string>('programming')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  
  // References to section elements for smooth scrolling
  const skillsContainerRef = useRef<HTMLDivElement>(null)
  
  // Handle tab click with animated scrolling
  const handleTabClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    
    // Add smooth scrolling animation to the skills section
    if (skillsContainerRef.current) {
      // First scroll the skills container into view with animation
      skillsContainerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      })
      
      // Add a subtle bounce effect using framer-motion animations
      const container = document.getElementById('skills-content')
      if (container) {
        // Apply a quick pulse/bounce animation
        container.animate([
          { transform: 'scale(0.98)', opacity: '0.8' },
          { transform: 'scale(1.02)', opacity: '0.9' },
          { transform: 'scale(1)', opacity: '1' }
        ], {
          duration: 600,
          easing: 'ease-out'
        })
      }
    }
  }

  return (
    <section id="skills" ref={ref} className="py-16 pb-32 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/3 w-6 h-6 rounded-full bg-primary/20 pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-primary/15 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-12 max-w-6xl mx-auto"
        >
          <div className="text-center space-y-4">
            <motion.h2 
              className="text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              Skills & Technologies
            </motion.h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              An interactive showcase of my technical expertise across various domains
            </p>
          </div>

          {/* Skill Categories Navigation Tabs */}
          <div className="relative sticky top-4 z-20 py-2">
            <motion.div 
              className="flex justify-center flex-wrap gap-2 md:gap-4 bg-background/60 backdrop-blur-md p-3 rounded-2xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {CATEGORIES.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleTabClick(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-xl transition-all relative
                    ${activeCategory === category.id 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                      : 'bg-card/90 hover:bg-primary/10'}
                  `}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className={`
                    rounded-full p-2 
                    ${activeCategory === category.id 
                      ? 'bg-primary-foreground/20' 
                      : 'bg-primary/10'}
                  `}>
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.name}</span>
                  
                  {/* Active indicator animation */}
                  {activeCategory === category.id && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 mx-auto w-12 h-1 bg-primary-foreground rounded-full"
                      layoutId="activeTabIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Main content area with skill categories */}
          <div id="skills-content" ref={skillsContainerRef} className="relative min-h-[600px]">
            <AnimatePresence mode="wait">
              {CATEGORIES.map((category) => (
                activeCategory === category.id && (
                  <motion.div
                    key={category.id}
                    id={`skills-${category.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute w-full"
                  >
                    <div className="mb-8 flex items-center gap-4">
                      <div className="rounded-full p-3 bg-primary/10 shadow-inner">
                        {category.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                      <div className="h-px flex-grow bg-gradient-to-r from-primary/30 to-transparent"></div>
                    </div>
                    
                    {/* Skills grid for this category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                      {(SKILLS_BY_CATEGORY[category.id as keyof typeof SKILLS_BY_CATEGORY] || []).map((skill, index) => {
                        const level = skillLevels[skill] || 75
                        return (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.07 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group"
                          >
                            <Card className="h-full border-primary/10 bg-card/80 backdrop-blur-sm shadow-md 
                              group-hover:shadow-xl group-hover:shadow-primary/5 
                              transition-all duration-300 overflow-hidden">
                              {/* Decorative top border with gradient */}
                              <div className="h-1 w-full bg-gradient-to-r from-primary/60 to-primary/20"></div>
                              
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="rounded-full p-2.5 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                      {getSkillIcon(skill)}
                                    </div>
                                    <CardTitle className="text-xl">{skill}</CardTitle>
                                  </div>
                                  <Badge variant="outline" className="bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    {level}%
                                  </Badge>
                                </div>
                              </CardHeader>
                              
                              <CardContent>
                                <div 
                                  className="mt-2 h-3 w-full bg-muted/40 rounded-full overflow-hidden relative"
                                  onMouseEnter={() => setHoveredSkill(skill)}
                                  onMouseLeave={() => setHoveredSkill(null)}
                                >
                                  <motion.div
                                    className="absolute inset-0 h-full bg-gradient-to-r from-primary/90 to-primary/70"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${level}%` }}
                                    transition={{
                                      duration: 1.5,
                                      delay: index * 0.1,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.div
                                    className="absolute inset-0 h-full bg-white/20"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ 
                                      width: hoveredSkill === skill ? `${level}%` : "0%",
                                      opacity: hoveredSkill === skill ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

