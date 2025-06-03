"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, ArrowRight, Search, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  image: string
  tags: string[]
  createdAt: string
}

export default function BlogPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [allTags, setAllTags] = useState<string[]>([])

  const tagFilter = searchParams.get("tag")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog?status=published")
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }
        const data = await response.json()
        setPosts(data)

        // Extract all unique tags
        const tags = data.reduce((acc: string[], post: BlogPost) => {
          if (post.tags) {
            post.tags.forEach((tag: string) => {
              if (!acc.includes(tag)) {
                acc.push(tag)
              }
            })
          }
          return acc
        }, [])

        setAllTags(tags)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        toast({
          title: "Error",
          description: "Failed to load blog posts",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [toast])

  useEffect(() => {
    // Filter posts based on search term and tag filter
    let filtered = [...posts]

    if (tagFilter) {
      filtered = filtered.filter(
        (post) => post.tags && post.tags.some((tag) => tag.toLowerCase() === tagFilter.toLowerCase()),
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
      )
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, tagFilter])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground mb-8">Insights, tutorials, and updates from Manpreet Singh</p>

        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Link href="/blog">
              <Button variant={!tagFilter ? "default" : "outline"} size="sm" className="rounded-full">
                All
              </Button>
            </Link>
            {allTags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <Button variant={tagFilter === tag ? "default" : "outline"} size="sm" className="rounded-full">
                  {tag}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(new Date(post.createdAt), "MMMM d, yyyy")}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-1">
                    {post.tags &&
                      post.tags.map((tag) => (
                        <Link key={tag} href={`/blog?tag=${tag}`}>
                          <span className="inline-flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        </Link>
                      ))}
                  </div>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="link" className="px-0" asChild>
                    <Link href={`/blog/${post._id}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No posts found</h2>
          <p className="text-muted-foreground mb-8">
            {tagFilter
              ? `No posts found with the tag "${tagFilter}"`
              : searchTerm
                ? `No posts found matching "${searchTerm}"`
                : "No blog posts have been published yet"}
          </p>
          {(tagFilter || searchTerm) && (
            <Button asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
