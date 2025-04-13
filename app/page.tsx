import AnimatedBackground from "@/components/animated-background"
import CursorEffect from "@/components/cursor-effect"
import InteractiveHero from "@/components/interactive-hero"
import About from "@/components/about"
import InteractiveTimeline from "@/components/interactive-timeline"
import InteractiveProjects from "@/components/interactive-projects"
import ParallaxEducation from "@/components/parallax-education"
import FloatingCertifications from "@/components/floating-certifications"
import InteractiveContact from "@/components/interactive-contact"
import InteractiveSkills from "@/components/interactive-skills"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      <CursorEffect />
      <div className="container mx-auto px-4">
        <InteractiveHero />
        <About />
      </div>
      <InteractiveTimeline />
      <div className="container mx-auto px-4">
        <InteractiveProjects />
      </div>
      <InteractiveSkills />
      <div className="container mx-auto px-4">
        <ParallaxEducation />
      </div>
      <FloatingCertifications />
      <div className="container mx-auto px-4">
        <InteractiveContact />
      </div>
    </div>
  )
}

