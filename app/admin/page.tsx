"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, RefreshCw, Download, Trash2 } from 'lucide-react'
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Message {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  github: string
  demo: string
  category: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [loadingProjects, setLoadingProjects] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    } else if (status === "authenticated") {
      setLoading(false)
      fetchMessages()
      fetchProjects()
    }
  }, [status, router])

  const fetchMessages = async () => {
    setLoadingMessages(true)
    try {
      const response = await fetch("/api/messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch messages",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoadingMessages(false)
    }
  }

  const fetchProjects = async () => {
    setLoadingProjects(true)
    try {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch projects",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoadingProjects(false)
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return
    }
    
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        })
        fetchProjects()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="projects">
        <TabsList className="mb-8">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>Manage Projects</CardTitle>
                  <CardDescription>Add, edit, or delete your portfolio projects.</CardDescription>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="outline" onClick={fetchProjects} disabled={loadingProjects}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${loadingProjects ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                  <Button asChild>
                    <Link href="/admin/projects/new">
                      <Plus className="mr-2 h-4 w-4" /> Add New Project
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loadingProjects ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : projects.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left">Title</th>
                        <th className="px-4 py-3 text-left hidden md:table-cell">Category</th>
                        <th className="px-4 py-3 text-left hidden md:table-cell">Technologies</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project._id} className="border-t">
                          <td className="px-4 py-3">{project.title}</td>
                          <td className="px-4 py-3 hidden md:table-cell">{project.category}</td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <span key={tech} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{project.technologies.length - 3} more</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/projects/${project._id}`}>Edit</Link>
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => deleteProject(project._id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="border rounded-md p-8 text-center">
                  <p className="text-muted-foreground mb-4">No projects found. Add your first project to get started.</p>
                  <Button asChild>
                    <Link href="/admin/projects/new">
                      <Plus className="mr-2 h-4 w-4" /> Add New Project
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>View and manage messages from your contact form.</CardDescription>
                </div>
                <Button variant="outline" onClick={fetchMessages} disabled={loadingMessages}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${loadingMessages ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingMessages ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message._id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h3 className="font-bold">{message.name}</h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(message.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 mb-2">
                          <span className="text-sm text-muted-foreground">{message.email}</span>
                          {message.subject && (
                            <>
                              <span className="hidden md:inline text-muted-foreground">•</span>
                              <span className="text-sm font-medium">{message.subject}</span>
                            </>
                          )}
                        </div>
                        <p className="mt-2 text-muted-foreground">{message.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md p-4 text-center">
                  <p className="text-muted-foreground">No messages found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resume">
          <Card>
            <CardHeader>
              <CardTitle>Resume Management</CardTitle>
              <CardDescription>Upload or update your resume.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <Button>
                  <Download className="mr-2 h-4 w-4" /> Upload New Resume
                </Button>

                <div className="border rounded-md p-4 flex-1">
                  <p className="font-medium mb-2">Current Resume</p>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">resume.pdf</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/resume.pdf" target="_blank">View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
