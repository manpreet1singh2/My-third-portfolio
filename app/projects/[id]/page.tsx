"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Github, ExternalLink, Calendar, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Project {
  _id: string
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  github: string
  demo: string
  category: string
  features?: string[]
  createdAt: string
  updatedAt?: string
}

export default function ProjectDetails() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch project")
        }
        const data = await response.json()
        setProject(data)

        // Fetch related projects
        const relatedResponse = await fetch(`/api/projects?category=${data.category}&limit=3&exclude=${params.id}`)
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedProjects(relatedData)
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        toast({
          title: "Error",
          description: "Failed to load project details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProject()
    }
  }, [params.id, toast])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/#projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Mock data for the project features and long description
  const projectFeatures = project.features || [
    "Responsive design for all devices",
    "User authentication and authorization",
    "Real-time data updates",
    "Interactive UI components",
    "API integration",
    "Performance optimization",
  ]

  const longDescription =
    project.longDescription ||
    `
    ${project.description}
    
    This project was built with a focus on user experience and performance. It includes a responsive design that works well on all devices, from mobile phones to desktop computers.
    
    The application features a clean and intuitive user interface, making it easy for users to navigate and interact with the content. It also includes various interactive components that enhance the overall user experience.
    
    The backend is built with scalability in mind, ensuring that the application can handle increased load as the user base grows. It includes robust error handling and logging to make debugging easier.
  `

  return (
    <div className="container mx-auto px-4 py-20">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/#projects">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
      </Button>

      <div className="grid md:grid-cols-3 gap-12">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>

          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
            <Image
              src={project.image || "/placeholder.svg?height=400&width=800"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="technologies">Technologies</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="prose dark:prose-invert max-w-none">
                {longDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="features" className="mt-4">
              <ul className="space-y-2">
                {projectFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 text-primary">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="technologies" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.technologies.map((tech) => (
                  <Card key={tech}>
                    <CardContent className="p-4 flex items-center">
                      <span className="text-primary mr-2">•</span>
                      <span>{tech}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View on GitHub
              </Link>
            </Button>
            {project.demo && (
              <Button variant="outline" asChild>
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Project Details</h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p>
                      {project.updatedAt
                        ? new Date(project.updatedAt).toLocaleDateString()
                        : new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <div className="flex items-center">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {relatedProjects.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Related Projects</h2>
              <div className="space-y-4">
                {relatedProjects.map((relatedProject) => (
                  <Card key={relatedProject._id} className="overflow-hidden">
                    <div className="relative h-32 w-full">
                      <Image
                        src={relatedProject.image || "/placeholder.svg?height=128&width=256"}
                        alt={relatedProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">{relatedProject.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{relatedProject.description}</p>
                      <Button size="sm" variant="outline" asChild className="w-full">
                        <Link href={`/projects/${relatedProject._id}`}>View Project</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
