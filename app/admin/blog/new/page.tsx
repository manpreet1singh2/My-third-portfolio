"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft, ImageIcon } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"

// Dynamically import the editor to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

export default function NewBlogPost() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "/placeholder.svg?height=300&width=700",
    tags: "",
    status: "draft" as "draft" | "published",
  })
  const [previewMode, setPreviewMode] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }))
  }

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = true) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Convert tags string to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
          status: saveAsDraft ? "draft" : "published",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create blog post")
      }

      toast({
        title: "Success!",
        description: `Blog post ${saveAsDraft ? "saved as draft" : "published"} successfully`,
      })

      router.push("/admin/blog")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating the blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image", "code-block"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/admin/blog">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
      </div>

      <Card className="mb-8">
        <form onSubmit={(e) => handleSubmit(e, true)}>
          <CardHeader>
            <CardTitle>Blog Post Details</CardTitle>
            <CardDescription>Create a new blog post</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="A short summary of your blog post"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
                <Button type="button" variant="outline" className="flex-shrink-0">
                  <ImageIcon className="h-4 w-4 mr-2" /> Upload
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Enter a URL or upload an image for the blog post</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, Web Development, JavaScript (comma separated)"
              />
            </div>

            <div className="space-y-2">
              <Label>Content *</Label>
              <Tabs defaultValue="write">
                <TabsList className="mb-2">
                  <TabsTrigger value="write" onClick={() => setPreviewMode(false)}>
                    Write
                  </TabsTrigger>
                  <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
                    Preview
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="write" className="min-h-[300px]">
                  <div className="min-h-[300px]">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={handleEditorChange}
                      modules={modules}
                      className="h-[300px] mb-12"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="preview">
                  {formData.content ? (
                    <div
                      className="prose dark:prose-invert max-w-none min-h-[300px] p-4 border rounded-md"
                      dangerouslySetInnerHTML={{ __html: formData.content }}
                    />
                  ) : (
                    <div className="min-h-[300px] p-4 border rounded-md flex items-center justify-center text-muted-foreground">
                      No content to preview
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant={formData.status === "published" ? "default" : "outline"}>
                {formData.status === "published" ? "Published" : "Draft"}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {formData.status === "published"
                  ? "This post will be visible to the public"
                  : "This post will be saved as a draft"}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href="/admin/blog">Cancel</Link>
            </Button>
            <div className="flex gap-2">
              <Button type="submit" variant="outline" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save as Draft"
                )}
              </Button>
              <Button type="button" disabled={isSubmitting} onClick={(e) => handleSubmit(e, false)}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...
                  </>
                ) : (
                  "Publish"
                )}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
