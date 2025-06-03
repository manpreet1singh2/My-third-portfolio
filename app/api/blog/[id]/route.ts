import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { ObjectId } from "mongodb"

// GET a specific blog post
export async function GET(request, { params }) {
  try {
    const id = params.id

    const { db } = await connectToDatabase()

    let post
    try {
      post = await db.collection("blog").findOne({ _id: new ObjectId(id) })
    } catch (error) {
      console.error("Invalid ObjectId or database error:", error)
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Check if post is a draft and user is not authenticated
    if (post.status === "draft") {
      const session = await getServerSession(authOptions)
      if (!session) {
        return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
      }
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

// PUT (update) a blog post (protected)
export async function PUT(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const body = await request.json()
    const { title, excerpt, content, image, tags, status } = body

    // Validate request
    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    let result
    try {
      result = await db.collection("blog").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title,
            excerpt,
            content,
            image,
            tags,
            status,
            updatedAt: new Date(),
          },
        },
      )
    } catch (error) {
      console.error("Invalid ObjectId or database error:", error)
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Blog post updated successfully" })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

// DELETE a blog post (protected)
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
      result = await db.collection("blog").deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
      console.error("Invalid ObjectId or database error:", error)
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}

// PATCH (partial update) a blog post (protected)
export async function PATCH(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const body = await request.json()

    const { db } = await connectToDatabase()

    const updateData = {
      ...body,
      updatedAt: new Date(),
    }

    let result
    try {
      result = await db.collection("blog").updateOne({ _id: new ObjectId(id) }, { $set: updateData })
    } catch (error) {
      console.error("Invalid ObjectId or database error:", error)
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Blog post updated successfully" })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}
