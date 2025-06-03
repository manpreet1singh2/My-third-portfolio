"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Award } from "lucide-react"
import Link from "next/link"
import Timeline from "@/components/timeline"

const timelineItems = [
  {
    id: 1,
    title: "Front-End and Back-End Developer Intern",
    organization: "TryCyfer Technologies Pvt. Ltd.",
    date: "Oct 2024 - Dec 2024",
    description:
      "Mastered web development essentials, including HTML, CSS, Bootstrap, JavaScript, and SQL, and built responsive designs. Contributed to development of web applications: Wheelstovet, mytr.ai and AP Associate.",
    type: "experience" as const,
  },
  {
    id: 2,
    title: "Bachelors in Computer Science Engineering",
    organization: "Chandigarh University, Gharuan",
    date: "2021-2024",
    description: "CGPA: 7.2/10 (72%)",
    type: "education" as const,
  },
  {
    id: 3,
    title: "Master Diploma in Computer Information System Management",
    organization: "Excel Net Computers Education Centre, Dhuri",
    date: "2019-2021",
    description: "73.7%",
    type: "education" as const,
  },
  {
    id: 4,
    title: "Diploma",
    organization: "Vidya sagar Polytechnic college, Dhuri",
    date: "2016-2019",
    description: "65.7%",
    type: "education" as const,
  },
  {
    id: 5,
    title: "Intermediate (PSEB)",
    organization: "Malwa Academy, Dhuri, Sangrur",
    date: "2015-2016",
    description: "85.8%",
    type: "education" as const,
  },
  {
    id: 6,
    title: "Matriculation (PSEB)",
    organization: "Malwa Khalsa Senior Secondary School, Dhuri",
    date: "2014-2015",
    description: "61.2%",
    type: "education" as const,
  },
]

const Resume = () => {
  return (
    <section id="resume" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Resume</h2>
            <div className="w-20 h-1 bg-primary rounded mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">My education and professional experience</p>
            <Button size="lg" asChild>
              <Link href="/resume.pdf" target="_blank">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Link>
            </Button>
          </div>

          <div className="mb-16">
            <Timeline items={timelineItems} />
          </div>

          {/* Certifications Section */}
          <div className="mt-12">
            <div className="flex items-center mb-6 justify-center">
              <Award className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-2xl font-bold">Certifications & Awards</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-2">Silver Medalist in 'Software Testing'</h4>
                    <p className="text-muted-foreground">NPTEL</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-2">Silver Medalist in 'Data Mining'</h4>
                    <p className="text-muted-foreground">NPTEL</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-2">HTML, CSS, and JavaScript for Web Developers</h4>
                    <p className="text-muted-foreground">Certification</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Resume
