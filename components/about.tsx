"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">About Me</h2>
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-lg">
                    I am a Senior Associate Consultant at Cubastion Consulting Pvt Ltd with expertise in developing and
                    deploying mobile and backend solutions for various in-house and client projects.
                  </p>
                  <p>
                    My technical skills include Python, Swift, Flutter, Java, Objective-C, and C++. I have experience
                    with Git, AWS, PostgreSQL, MongoDB, Firebase, Docker, and Unix.
                  </p>
                  <p>
                    I have worked on projects for major clients including Mercedes Benz, Saudi Telecom Communications,
                    and Mitsubishi Fuso Truck and Bus Corporation, delivering impactful solutions that have improved
                    system efficiency and reduced service time.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary">
                    <img
                      src="/abhishek_biswas.svg?height=256&width=256"
                      alt="Abhishek Biswas"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

