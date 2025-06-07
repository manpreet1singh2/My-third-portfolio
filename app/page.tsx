"use client"

import type React from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Services from "@/components/services"
import Stats from "@/components/stats"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import AIChat from "@/components/ai-chat"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content")
      }

      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Stats />
      <Testimonials />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Gemini AI Demo</h1>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Ask Gemini AI</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                  required
                />

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>}

                {result && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Response:</h3>
                    <div className="whitespace-pre-wrap">{result}</div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading || !prompt}>
                {loading ? "Generating..." : "Generate Response"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Contact />
      <AIChat />
    </div>
  )
}
