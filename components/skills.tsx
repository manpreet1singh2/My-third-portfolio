"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Database, Layout, Server, Terminal, Figma, Globe, BrainCircuit } from "lucide-react"

const SkillCard = ({ icon, title, skills, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-primary/10 rounded-full">{icon}</div>
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const SkillProgress = ({ name, percentage, color = "bg-primary" }) => {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const skillCategories = [
    {
      name: "Frontend",
      icon: <Layout className="h-8 w-8 text-primary" />,
      skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      name: "Backend",
      icon: <Server className="h-8 w-8 text-primary" />,
      skills: ["Node.js", "Express", "REST API", "GraphQL"],
    },
    {
      name: "Programming",
      icon: <Code className="h-8 w-8 text-primary" />,
      skills: ["JavaScript", "TypeScript", "Python"],
    },
    {
      name: "Databases",
      icon: <Database className="h-8 w-8 text-primary" />,
      skills: ["MongoDB", "MySQL", "PostgreSQL"],
    },
    {
      name: "DevOps",
      icon: <Terminal className="h-8 w-8 text-primary" />,
      skills: ["Git", "Docker", "CI/CD", "AWS"],
    },
    {
      name: "Design",
      icon: <Figma className="h-8 w-8 text-primary" />,
      skills: ["Figma", "UI/UX", "Responsive Design"],
    },
    {
      name: "AI & ML",
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      skills: ["Machine Learning", "TensorFlow", "Data Analysis"],
    },
    {
      name: "Other",
      icon: <Globe className="h-8 w-8 text-primary" />,
      skills: ["SEO", "Performance Optimization", "Accessibility"],
    },
  ]

  const frontendSkills = [
    { name: "HTML", percentage: 90 },
    { name: "CSS", percentage: 85 },
    { name: "JavaScript", percentage: 80 },
    { name: "React", percentage: 75 },
    { name: "Next.js", percentage: 70 },
    { name: "Tailwind CSS", percentage: 85 },
  ]

  const backendSkills = [
    { name: "Node.js", percentage: 70 },
    { name: "Express", percentage: 65 },
    { name: "REST API", percentage: 75 },
    { name: "MongoDB", percentage: 60 },
    { name: "GraphQL", percentage: 50 },
  ]

  const otherSkills = [
    { name: "Git", percentage: 75 },
    { name: "Docker", percentage: 60 },
    { name: "AWS", percentage: 50 },
    { name: "UI/UX Design", percentage: 65 },
    { name: "Problem Solving", percentage: 85 },
  ]

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="section-heading">My Skills</h2>
            <div className="section-divider"></div>
            <p className="section-subheading">Here are the technologies and tools I work with</p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Tabs defaultValue="frontend">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
              <TabsContent value="frontend">
                <div className="grid md:grid-cols-2 gap-8">
                  {frontendSkills.map((skill) => (
                    <SkillProgress key={skill.name} name={skill.name} percentage={skill.percentage} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="backend">
                <div className="grid md:grid-cols-2 gap-8">
                  {backendSkills.map((skill) => (
                    <SkillProgress
                      key={skill.name}
                      name={skill.name}
                      percentage={skill.percentage}
                      color="bg-blue-500"
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="other">
                <div className="grid md:grid-cols-2 gap-8">
                  {otherSkills.map((skill) => (
                    <SkillProgress
                      key={skill.name}
                      name={skill.name}
                      percentage={skill.percentage}
                      color="bg-green-500"
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={category.name}
                icon={category.icon}
                title={category.name}
                skills={category.skills}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
