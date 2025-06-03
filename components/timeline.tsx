"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface TimelineItem {
  id: number
  title: string
  organization: string
  date: string
  description: string
  type: "education" | "experience"
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  // Sort items by date (newest first)
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.date.split(" - ")[1] || a.date)
    const dateB = new Date(b.date.split(" - ")[1] || b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className="relative">
      {/* Timeline center line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20"></div>

      <div className="space-y-12">
        {sortedItems.map((item, index) => (
          <TimelineCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`flex items-center ${isEven ? "flex-row-reverse" : ""}`}
    >
      <div className={`w-1/2 ${isEven ? "pr-12 text-right" : "pl-12"}`}>
        <h3 className="text-xl font-bold">{item.title}</h3>
        <p className="text-primary font-medium">{item.organization}</p>
        <p className="text-sm text-muted-foreground mb-2">{item.date}</p>
        <p className="text-muted-foreground">{item.description}</p>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center z-10">
          {item.type === "education" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          )}
        </div>
      </div>

      <div className="w-1/2"></div>
    </motion.div>
  )
}
