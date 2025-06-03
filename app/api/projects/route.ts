import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { ObjectId } from "mongodb"

// GET all projects with filtering options
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")) : undefined
    const exclude = searchParams.get("exclude")

    const { db } = await connectToDatabase()

    const query = {}

    // Add category filter if provided
    if (category) {
      query.category = category
    }

    // Exclude specific project if provided
    if (exclude) {
      try {
        query._id = { $ne: new ObjectId(exclude) }
      } catch (error) {
        console.error("Invalid ObjectId:", error)
        // If the ID is invalid, just continue without this filter
      }
    }

    let projectsQuery = db.collection("projects").find(query)

    // Apply limit if provided
    if (limit) {
      projectsQuery = projectsQuery.limit(limit)
    }

    const projects = await projectsQuery.toArray()

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)

    // Fallback to mock data if database connection fails
    const mockProjects = [
      {
        _id: "1",
        title: "E-Commerce Website",
        description: "A full-featured online store with product management and payment processing.",
        category: "web",
        technologies: ["React", "Node.js", "MongoDB"],
        image: "/placeholder.svg?height=300&width=500",
        github: "https://github.com/example/project",
        demo: "https://example.com",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        title: "Portfolio Website",
        description: "A personal portfolio website to showcase projects and skills.",
        category: "web",
        technologies: ["Next.js", "Tailwind CSS"],
        image: "/placeholder.svg?height=300&width=500",
        github: "https://github.com/example/project",
        demo: "https://example.com",
        createdAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json(mockProjects)
  }
}

// POST new project (protected)
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, image, technologies, github, demo, category, features, longDescription } = body

    // Validate request
    if (!title || !description || !technologies || !github || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const result = await db.collection("projects").insertOne({
      title,
      description,
      longDescription,
      image: image || "/placeholder.svg?height=300&width=500",
      technologies,
      github,
      demo,
      category,
      features,
      createdAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: "Project created successfully",
      projectId: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
