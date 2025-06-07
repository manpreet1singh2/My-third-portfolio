"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const Hero = () => {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background -z-10"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-indigo-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">Hello, I'm</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Manpreet Singh</h1>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-muted-foreground">Full Stack Developer</h3>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              I build modern web applications with React, Next.js, and Node.js. Passionate about creating elegant
              solutions to complex problems.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button asChild size="lg" className="rounded-full">
                <Link href="#contact">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-full">
                <Link href="/resume.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Link>
              </Button>
            </div>
            <div className="flex space-x-4">
              <Link href="https://github.com/manpreet1singh2" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/manpreet-singh-0148ab179" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:dimplebrar13@gmail.com">
                <Button variant="outline" size="icon" className="rounded-full" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image
                src="/images/manpreet-profile.jpg"
                alt="Manpreet Singh - Full Stack Developer"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-5 -left-5 bg-background shadow-lg rounded-lg p-3 border border-border"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Available for work</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -right-5 bg-background shadow-lg rounded-lg p-3 border border-border"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">Based in Punjab, India</span>
                <span className="text-lg">🇮🇳</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
          <Button variant="ghost" size="icon" className="rounded-full animate-bounce" onClick={scrollToNextSection}>
            <ChevronDown className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
