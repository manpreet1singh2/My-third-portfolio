import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

// GET all blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")) : undefined
    const tag = searchParams.get("tag")
    const status = searchParams.get("status")

    const { db } = await connectToDatabase()

    const query = {}

    // Add tag filter if provided
    if (tag) {
      query.tags = tag
    }

    // Add status filter if provided
    if (status) {
      query.status = status
    } else {
      // By default, only return published posts for public API
      const session = await getServerSession(authOptions)
      if (!session) {
        query.status = "published"
      }
    }

    let postsQuery = db.collection("blog").find(query).sort({ createdAt: -1 })

    // Apply limit if provided
    if (limit) {
      postsQuery = postsQuery.limit(limit)
    }

    const posts = await postsQuery.toArray()

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)

    // Fallback to mock data if database connection fails
    const mockPosts = [
      {
        _id: "1",
        title: "Getting Started with React",
        excerpt: "Learn the basics of React and how to set up your first React application.",
        content: "<p>This is the full content of the blog post...</p>",
        image: "/placeholder.svg?height=300&width=500",
        tags: ["React", "JavaScript", "Web Development"],
        createdAt: new Date().toISOString(),
        status: "published",
        author: {
          id: "1",
          name: "Manpreet Singh",
        },
      },
      {
        _id: "2",
        title: "Introduction to Next.js",
        excerpt: "Discover the benefits of using Next.js for your React applications.",
        content: "<p>This is the full content of the blog post...</p>",
        image: "/placeholder.svg?height=300&width=500",
        tags: ["Next.js", "React", "Web Development"],
        createdAt: new Date().toISOString(),
        status: "published",
        author: {
          id: "1",
          name: "Manpreet Singh",
        },
      },
    ]

    return NextResponse.json(mockPosts)
  }
}

// POST new blog post (protected)
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, excerpt, content, image, tags, status } = body

    // Validate request
    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const result = await db.collection("blog").insertOne({
      title,
      excerpt,
      content,
      image: image || "/placeholder.svg?height=300&width=700",
      tags: tags || [],
      status: status || "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: session.user.id,
        name: session.user.name,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Blog post created successfully",
      postId: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
