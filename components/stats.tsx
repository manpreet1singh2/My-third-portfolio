"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Code, Coffee, Users } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

const StatItem = ({ icon, value, label }) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    let start
    let animationFrameId

    if (inView) {
      const startTime = performance.now()
      const duration = 2000

      const step = (timestamp) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * value))

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step)
        }
      }

      animationFrameId = window.requestAnimationFrame(step)
    }

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">{icon}</div>
      <h3 className="text-3xl md:text-4xl font-bold mb-2">{count}+</h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}

const Stats = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatItem
                  icon={<CheckCircle className="h-8 w-8 text-primary" />}
                  value={15}
                  label="Projects Completed"
                />
                <StatItem icon={<Code className="h-8 w-8 text-primary" />} value={10000} label="Lines of Code" />
                <StatItem icon={<Users className="h-8 w-8 text-primary" />} value={12} label="Happy Clients" />
                <StatItem icon={<Coffee className="h-8 w-8 text-primary" />} value={500} label="Cups of Coffee" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
