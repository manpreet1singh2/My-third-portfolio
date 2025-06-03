import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { ObjectId } from "mongodb"

// GET a specific project
export async function GET(request, { params }) {
  try {
    const id = params.id

    const { db } = await connectToDatabase()

    let project
    try {
      project = await db.collection("projects").findOne({ _id: new ObjectId(id) })
    } catch (error) {
      console.error("Invalid ObjectId or database error:", error)
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT (update) a project (protected)
export async function PUT(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const body = await request.json()
    const { title, description, longDescription, image, technologies, github, demo, category, features } = body

    // Validate request
    if (!title || !description || !technologies || !github || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    let result
    try {
      result = await db.collection("projects").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title,
            description,
            longDescription,
            image,
            technologies,
            github,
            demo,
            category,
            features,
            updatedAt: new Date(),
          },
        },
      )
    } catch (error) {
      console.error("Invalid ObjectId or database error:", error)
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Project updated successfully" })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE a project (protected)
export async function DELETE(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    const { db } = await connectToDatabase()

    let result
    try {
      result = await db.collection("projects").deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
      console.error("Invalid ObjectId or database error:", error)
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
