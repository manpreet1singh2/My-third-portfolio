"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO, TechCorp",
    image: "/placeholder.svg?height=100&width=100",
    text: "Working with this developer was a pleasure. Their attention to detail and problem-solving skills are impressive.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Marketing Director, CreativeMinds",
    image: "/placeholder.svg?height=100&width=100",
    text: "They understood our requirements perfectly and created a website that perfectly represents our brand. Highly recommended!",
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Founder, StartupLaunch",
    image: "/placeholder.svg?height=100&width=100",
    text: "Their technical expertise and creativity helped us build a platform that our users love. Responsive, professional, and delivers high-quality work.",
  },
]

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <div className="w-20 h-1 bg-primary rounded mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl">What people say about my work and collaboration</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="overflow-hidden">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-6 text-primary">
                          <Quote className="h-12 w-12" />
                        </div>
                        <p className="text-lg md:text-xl mb-8 italic">{testimonials[activeIndex].text}</p>
                        <Avatar className="h-16 w-16 mb-4">
                          <AvatarImage
                            src={testimonials[activeIndex].image || "/placeholder.svg"}
                            alt={testimonials[activeIndex].name}
                          />
                          <AvatarFallback>
                            {testimonials[activeIndex].name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold">{testimonials[activeIndex].name}</h3>
                        <p className="text-muted-foreground">{testimonials[activeIndex].position}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="flex justify-center mt-8 gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex justify-center mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1)
                      setActiveIndex(index)
                    }}
                    className={`h-2 w-2 mx-1 rounded-full ${index === activeIndex ? "bg-primary" : "bg-primary/30"}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
