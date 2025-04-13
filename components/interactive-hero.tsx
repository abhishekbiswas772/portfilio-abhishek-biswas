"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Code, Briefcase, GraduationCap, Award } from "lucide-react"
import { useTheme } from "next-themes"

export default function InteractiveHero() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const isDark = theme === "dark"

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = isDark
          ? `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
          : `rgba(103, 58, 183, ${Math.random() * 0.3 + 0.1})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    const init = () => {
      particles = []
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 150)

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between particles
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(103, 58, 183, 0.05)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  if (!mounted) return null

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" aria-hidden="true" />

      <div className="relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg mx-auto">
              <img
                src="/abhishek_biswas.svg?height=160&width=160"
                alt="Abhishek Biswas"
                className="object-cover w-full h-full"
              />
            </div>
            <motion.div
              className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3, type: "spring" }}
            >
              <Code className="h-5 w-5" />
            </motion.div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I&apos;m{" "}
            <motion.span
              className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Abhishek Biswas
            </motion.span>
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Senior Associate Consultant with expertise in Flutter, Python, Java, and Swift
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button asChild size="lg" className="group">
              <a href="#contact">
                Contact Me
                <motion.span
                  className="ml-2 inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#experience">View My Work</a>
            </Button>
          </motion.div>

          <div className="flex justify-center gap-8 mt-8">
            {[
              { icon: <Code className="h-6 w-6" />, label: "Projects", href: "#projects" },
              { icon: <Briefcase className="h-6 w-6" />, label: "Experience", href: "#experience" },
              { icon: <GraduationCap className="h-6 w-6" />, label: "Education", href: "#education" },
              { icon: <Award className="h-6 w-6" />, label: "Certifications", href: "#certifications" },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                custom={i}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="p-3 rounded-full bg-muted/50 hover:bg-primary/10 transition-colors">{item.icon}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8"
      >
        <a
          href="#about"
          className="flex items-center justify-center p-2 rounded-full border border-border hover:border-primary transition-colors"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}

