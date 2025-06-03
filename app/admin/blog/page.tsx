"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, RefreshCw, Pencil, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  image: string
  tags: string[]
  status: "draft" | "published"
  createdAt: string
  updatedAt?: string
}

export default function BlogAdmin() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    } else if (status === "authenticated") {
      setLoading(false)
      fetchBlogPosts()
    }
  }, [status, router])

  const fetchBlogPosts = async () => {
    setLoadingPosts(true)
    try {
      const response = await fetch("/api/blog")
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch blog posts",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error)
    } finally {
      setLoadingPosts(false)
    }
  }

  const deleteBlogPost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return
    }

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        })
        fetchBlogPosts()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete blog post",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting blog post:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const togglePostStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published"

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Blog post ${newStatus === "published" ? "published" : "unpublished"} successfully`,
        })
        fetchBlogPosts()
      } else {
        toast({
          title: "Error",
          description: "Failed to update blog post status",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating blog post status:", error)
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={fetchBlogPosts} disabled={loadingPosts}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loadingPosts ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button asChild>
            <Link href="/admin/blog/new">
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingPosts ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Date</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map((post) => (
                    <tr key={post._id} className="border-t">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {format(new Date(post.createdAt), "MMM d, yyyy")}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <Badge variant={post.status === "published" ? "default" : "outline"}>
                          {post.status === "published" ? "Published" : "Draft"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/blog/${post._id}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/blog/${post._id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => togglePostStatus(post._id, post.status)}>
                            {post.status === "published" ? "Unpublish" : "Publish"}
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteBlogPost(post._id)}>
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
              <p className="text-muted-foreground mb-4">No blog posts found. Create your first post to get started.</p>
              <Button asChild>
                <Link href="/admin/blog/new">
                  <Plus className="mr-2 h-4 w-4" /> Create New Post
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
