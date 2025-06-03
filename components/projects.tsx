"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code, Dices, ShoppingCart, PenTool, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const projects = [
  {
    id: 1,
    title: "Gambling App",
    description:
      "A secure and interactive gambling application with user authentication, real-time updates, and payment processing.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com/manpreet1singh2/Gambling-app",
    demo: "#",
    category: "web",
    icon: <Dices className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "Graphic Design with AI",
    description:
      "An AI-powered graphic design tool that helps users create professional designs without extensive design knowledge.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "TensorFlow.js", "Canvas API", "Node.js"],
    github: "https://github.com/manpreet1singh2/Graphic-design-create-WIth-AI",
    demo: "#",
    category: "ai",
    icon: <PenTool className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "AI-Powered Blog Generator",
    description:
      "A tool that uses AI to generate blog content, helping content creators overcome writer's block and streamline their workflow.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "OpenAI API", "Express", "MongoDB"],
    github: "https://github.com/manpreet1singh2/AI-Powered-Blog-Generator",
    demo: "#",
    category: "ai",
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "E-Commerce Website",
    description:
      "A full-featured e-commerce platform for small businesses with product management, shopping cart, and payment integration.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    github: "https://github.com/manpreet1singh2/ecommerce-website-for-start-business",
    demo: "#",
    category: "web",
    icon: <ShoppingCart className="h-6 w-6" />,
  },
  {
    id: 5,
    title: "AI-Based Speech Recognition System",
    description:
      "Developed an AI-based speech recognition system using Python and JARVISH, enabling accurate and efficient voice-to-text conversion.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Python", "JARVISH", "AI", "Speech Recognition"],
    github: "https://github.com/manpreet1singh2",
    demo: "#",
    category: "ai",
    icon: <Code className="h-6 w-6" />,
  },
  {
    id: 6,
    title: "Real-Time Weather Forecasting System",
    description:
      "Built an interactive system for accurate weather predictions using Python and Django with API integration.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Python", "Django", "API Integration", "Data Visualization"],
    github: "https://github.com/manpreet1singh2",
    demo: "#",
    category: "web",
    icon: <Code className="h-6 w-6" />,
  },
]

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="section-heading">My Projects</h2>
            <div className="section-divider"></div>
            <p className="section-subheading">Check out some of my recent projects and applications</p>

            <Tabs defaultValue="all" className="w-full max-w-md mb-8">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
                  All
                </TabsTrigger>
                <TabsTrigger value="web" onClick={() => setActiveCategory("web")}>
                  Web Apps
                </TabsTrigger>
                <TabsTrigger value="ai" onClick={() => setActiveCategory("ai")}>
                  AI Projects
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full overflow-hidden group">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> Code
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Demo
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-primary/10 rounded-full">{project.icon}</div>
                      <CardTitle>{project.title}</CardTitle>
                    </div>
                    <CardDescription>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Repository
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button asChild size="lg" className="rounded-full">
              <Link href="https://github.com/manpreet1singh2" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> View More on GitHub
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
