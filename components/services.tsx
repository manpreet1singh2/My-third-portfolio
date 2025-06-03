"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Layout, Server, Database } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Creating responsive and user-friendly websites using modern technologies like React, Next.js, and Tailwind CSS.",
    icon: <Layout className="h-10 w-10 text-primary" />,
  },
  {
    id: 2,
    title: "Backend Development",
    description:
      "Building robust server-side applications with Node.js, Express, and MongoDB for scalable and efficient solutions.",
    icon: <Server className="h-10 w-10 text-primary" />,
  },
  {
    id: 3,
    title: "Database Design",
    description:
      "Designing and implementing efficient database structures using SQL and NoSQL databases for optimal performance.",
    icon: <Database className="h-10 w-10 text-primary" />,
  },
  {
    id: 4,
    title: "API Development",
    description: "Creating RESTful APIs and integrating third-party services to enhance application functionality.",
    icon: <Code className="h-10 w-10 text-primary" />,
  },
]

const Services = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Services</h2>
            <div className="w-20 h-1 bg-primary rounded mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Here are the services I offer to help bring your ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{service.icon}</div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
