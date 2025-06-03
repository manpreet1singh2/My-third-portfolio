import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { mkdir } from "fs/promises"

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Get file extension
    const fileExtension = file.name.split(".").pop()

    // Generate unique filename
    const fileName = `${uuidv4()}.${fileExtension}`

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Define upload path
    const uploadDir = join(process.cwd(), "public", "uploads")

    // Ensure the directory exists
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      console.error("Error creating directory:", error)
    }

    const filePath = join(uploadDir, fileName)

    // Write file to disk
    try {
      await writeFile(filePath, buffer)
    } catch (error) {
      console.error("Error writing file:", error)
      return NextResponse.json({ error: "Failed to save file" }, { status: 500 })
    }

    // Return file URL
    const fileUrl = `/uploads/${fileName}`

    return NextResponse.json({
      success: true,
      url: fileUrl,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
