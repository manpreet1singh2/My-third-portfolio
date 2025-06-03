import { NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // The GOOGLE_API_KEY environment variable is automatically used by the AI SDK
    const { text } = await generateText({
      model: google("gemini-pro"),
      prompt: prompt,
      maxTokens: 500,
    })

    return NextResponse.json({ result: text })
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    return NextResponse.json(
      {
        error: "Failed to generate content. Please check your API key configuration.",
      },
      { status: 500 },
    )
  }
}
