import AIChat from "@/components/ai-chat"

export const metadata = {
  title: "AI Assistant | Your Portfolio",
  description: "Chat with AI powered by Google's Gemini model",
}

export default function AIPage() {
  return (
    <div className="min-h-screen pt-20">
      <AIChat />
    </div>
  )
}
