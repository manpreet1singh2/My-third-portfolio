"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, MapPin, GraduationCap, Languages, Mail, Phone, Briefcase } from "lucide-react"
import Link from "next/link"

const About = () => {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="section-heading">About Me</h2>
            <div className="section-divider"></div>
            <p className="section-subheading">Get to know more about me, my background, and what I do</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden border-4 border-primary/20 shadow-xl">
                <Image
                  src="/images/manpreet-profile.jpg"
                  alt="Manpreet Singh - Full Stack Developer"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary text-primary-foreground py-2 px-4 rounded shadow-lg">
                <span className="font-bold">CSE Graduate</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Full Stack Developer</h3>
              <p className="text-muted-foreground mb-6">
                I'm a passionate developer with strong work ethics and a drive for solving real-life problems through
                technology. I'm proficient in both technical skills and soft skills, with expertise in algorithms and
                data structures.
              </p>
              <p className="text-muted-foreground mb-6">
                I completed my Bachelor's in Computer Science Engineering from Chandigarh University and have experience
                working as a developer intern at TryCyfer Technologies Pvt. Ltd.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <span>Punjab, India</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-2" />
                  <span>dimplebrar13@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  <span>+91-9115813846</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-primary mr-2" />
                  <span>B.Tech in CSE</span>
                </div>
                <div className="flex items-center">
                  <Languages className="h-5 w-5 text-primary mr-2" />
                  <span>English, Hindi, Punjabi</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-primary mr-2" />
                  <span>2+ Years Experience</span>
                </div>
              </div>

              <Button asChild size="lg" className="rounded-full">
                <Link href="/resume.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
