"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", flag: "🇮🇳" },
]

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    // Get language from localStorage or browser settings
    const savedLanguage = localStorage.getItem("language") || navigator.language.split("-")[0]

    // Check if the saved language is supported
    const isSupported = languages.some((lang) => lang.code === savedLanguage)

    // Set the current language
    setCurrentLanguage(isSupported ? savedLanguage : "en")
  }, [])

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode)
    localStorage.setItem("language", langCode)

    // In a real app, you would update the translations here
    // For example, using i18next or a similar library

    // Reload the page to apply the language change
    // window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={currentLanguage === lang.code ? "bg-muted" : ""}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
