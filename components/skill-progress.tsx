"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface SkillProgressProps {
  name: string
  percentage: number
  color?: string
}

export default function SkillProgress({ name, percentage, color = "bg-primary" }: SkillProgressProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${percentage}%`,
        transition: { duration: 1, ease: "easeOut" },
      })
      setIsVisible(true)
    }
  }, [controls, inView, percentage])

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{isVisible ? `${percentage}%` : "0%"}</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div className={`h-full ${color} rounded-full`} initial={{ width: 0 }} animate={controls} />
      </div>
    </div>
  )
}
