"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  image: string
  tags: string[]
  createdAt: string
  updatedAt?: string
  author: {
    id: string
    name: string
  }
}

export default function BlogPostDetail() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch blog post")
        }
        const data = await response.json()
        setPost(data)

        // Fetch related posts based on tags
        if (data.tags && data.tags.length > 0) {
          const tag = data.tags[0] // Use the first tag for related posts
          const relatedResponse = await fetch(`/api/blog?tag=${tag}&limit=3&exclude=${params.id}`)
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json()
            setRelatedPosts(relatedData)
          }
        }
      } catch (error) {
        console.error("Error fetching blog post:", error)
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        })
        router.push("/blog")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id, toast, router])

  const sharePost = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "The link to this post has been copied to your clipboard",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </Button>

      <div className="grid md:grid-cols-3 gap-12">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{format(new Date(post.createdAt), "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center">
              <span>By {post.author?.name || "Admin"}</span>
            </div>
          </div>

          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
            <Image
              src={post.image || "/placeholder.svg?height=400&width=800"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags &&
              post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Link>
              ))}
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="flex justify-between items-center border-t border-border pt-6 mt-8">
            <div>
              <span className="text-sm text-muted-foreground">Share this post</span>
            </div>
            <Button variant="outline" size="sm" onClick={sharePost}>
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {relatedPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Related Posts</h2>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost._id} className="overflow-hidden">
                    <div className="relative h-32 w-full">
                      <Image
                        src={relatedPost.image || "/placeholder.svg?height=128&width=256"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">{relatedPost.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{relatedPost.excerpt}</p>
                      <Button size="sm" variant="outline" asChild className="w-full">
                        <Link href={`/blog/${relatedPost._id}`}>Read Post</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Subscribe to Newsletter</h2>
              <p className="text-muted-foreground mb-4">Get notified when new articles are published</p>
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <Button className="w-full">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
