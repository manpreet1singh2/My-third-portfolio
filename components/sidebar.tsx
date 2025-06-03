"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Home, User, Briefcase, Code, FileText, Mail, BookOpen, Github, Linkedin, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const MainSidebar = () => {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "About", href: "/#about", icon: <User className="h-5 w-5" /> },
    { name: "Services", href: "/#services", icon: <Settings className="h-5 w-5" /> },
    { name: "Projects", href: "/#projects", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Skills", href: "/#skills", icon: <Code className="h-5 w-5" /> },
    { name: "Resume", href: "/#resume", icon: <FileText className="h-5 w-5" /> },
    { name: "Blog", href: "/#blog", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Contact", href: "/#contact", icon: <Mail className="h-5 w-5" /> },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.includes(href.replace("/#", "/"))
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="py-6">
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Manpreet Singh" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold">Manpreet Singh</h1>
            <p className="text-sm text-muted-foreground">Full-Stack Developer</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.name}>
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="py-4">
          <div className="flex justify-center space-x-2 mb-4">
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <Link href="https://github.com/manpreet1singh2" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <Link href="https://linkedin.com/in/manpreet-singh-0148ab179" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
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
                    className="lucide lucide-sun"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
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
                    className="lucide lucide-moon"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </Button>
            )}
          </div>
          <div className="px-4 text-center">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Manpreet Singh</p>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

export default MainSidebar
