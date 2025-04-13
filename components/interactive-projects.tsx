"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ProjectCard from "./project-card"
import ProjectDetailsModal from "./project-details-modal"
import { projectsData } from "@/lib/data"
import { Button } from "@/components/ui/button"

const ITEMS_PER_PAGE = 3
const CARD_WIDTH_PX = 340 // Width of ProjectCard
const GAP_PX = 24 // Gap from space-x-6 or gap-6

export default function InteractiveProjects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // State for the project detail modal
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE)
  
  // Reference to the carousel container
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle opening the detail modal
  const handleProjectClick = (project: typeof projectsData[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current)
  }

  // Handle closing the detail modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    startAutoScroll() // Restart auto-scroll when modal closes
  }

  // Function to scroll to a specific page
  const scrollToPage = useCallback((page: number) => {
    if (!carouselRef.current) return
    
    // Calculate scroll amount
    // We want to show the start of the target page items
    const scrollAmount = page * (ITEMS_PER_PAGE * CARD_WIDTH_PX + (ITEMS_PER_PAGE -1) * GAP_PX);
    // Adjust calculation slightly - maybe just scroll by multiples of card width + gap
    const itemWidth = CARD_WIDTH_PX + GAP_PX;
    const targetScrollLeft = page * ITEMS_PER_PAGE * itemWidth; // Scroll by groups of 3 items
    
    carouselRef.current.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    })
  }, [])

  // Change page function
  const changePage = useCallback((direction: 'prev' | 'next' | number) => {
    let nextPage: number;
    if (typeof direction === 'number') {
      nextPage = direction;
    } else {
      nextPage = direction === 'prev' ? currentPage - 1 : currentPage + 1;
    }
    
    // Clamp page number
    const newPage = Math.max(0, Math.min(nextPage, totalPages - 1));
    
    if (newPage !== currentPage) {
      setCurrentPage(newPage)
      scrollToPage(newPage)
    }
    
    // Reset auto-scroll timer on manual interaction
    if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current)
    startAutoScroll()

  }, [currentPage, totalPages, scrollToPage])

  // Auto-scroll function
  const startAutoScroll = useCallback(() => {
    if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current)
    
    autoScrollTimerRef.current = setInterval(() => {
      setCurrentPage(prev => {
        const nextPage = (prev + 1) % totalPages
        scrollToPage(nextPage)
        return nextPage
      })
    }, 8000)
  }, [totalPages, scrollToPage])

  // Start auto-scroll on mount and clear on unmount
  useEffect(() => {
    startAutoScroll()
    return () => {
      if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current)
    }
  }, [startAutoScroll])

  return (
    <section id="projects" ref={ref} className="py-16">
      {/* Adjusted background elements for better blend */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent pointer-events-none"></div>

      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-primary/15 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-6 h-6 rounded-full bg-primary/10 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 flex flex-col items-center"
        >
          <div className="flex flex-col items-center justify-center w-full">
            <motion.h2
              className="text-4xl font-bold tracking-tight text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              Personal Projects
            </motion.h2>

            {/* Project description */}
            <p className="text-muted-foreground text-center max-w-2xl mt-4">
              Explore my featured projects. Each project represents a journey of learning and problem-solving in various domains of software development.
            </p>
          </div>

          {/* Carousel container - overflow-x-hidden hides the scrollbar */}
          <div className="w-full max-w-6xl mx-auto">
            <div 
              ref={carouselRef}
              className="overflow-x-hidden relative pb-8"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Inner container holding ALL projects */}
              <div 
                className="flex gap-6"
                style={{ width: `${(projectsData.length * (CARD_WIDTH_PX + GAP_PX)) - GAP_PX}px` }} // Calculate total width
              >
                {projectsData.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="w-[340px] flex-shrink-0"
                    whileHover={{ y: -5 }}
                    style={{ flex: '0 0 340px' }} // Ensure fixed width
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      onClick={() => handleProjectClick(project)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Pagination controls */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => changePage('prev')}
                disabled={currentPage === 0}
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous projects"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changePage(index)} // Use changePage with index
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentPage === index 
                        ? 'bg-primary w-6' 
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => changePage('next')}
                disabled={currentPage === totalPages - 1}
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next projects"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </section>
  )
}

