"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Calendar, ArrowUpRight, ArrowDownRight, Users, Eye, MousePointer, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for analytics
const pageViewsData = [
  { date: "2023-01-01", views: 120 },
  { date: "2023-01-02", views: 145 },
  { date: "2023-01-03", views: 132 },
  { date: "2023-01-04", views: 167 },
  { date: "2023-01-05", views: 178 },
  { date: "2023-01-06", views: 156 },
  { date: "2023-01-07", views: 198 },
]

const popularPagesData = [
  { path: "/", title: "Home", views: 1245 },
  { path: "/projects", title: "Projects", views: 876 },
  { path: "/blog", title: "Blog", views: 654 },
  { path: "/contact", title: "Contact", views: 432 },
  { path: "/about", title: "About", views: 321 },
]

const visitorSourcesData = [
  { source: "Direct", count: 456, percentage: 35 },
  { source: "Google", count: 321, percentage: 25 },
  { source: "Social Media", count: 234, percentage: 18 },
  { source: "Referral", count: 178, percentage: 14 },
  { source: "Other", count: 98, percentage: 8 },
]

export default function AnalyticsDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("7d")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    } else if (status === "authenticated") {
      setLoading(false)
    }
  }, [status, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Last 30 days</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Visitors</p>
                <h3 className="text-3xl font-bold">2,543</h3>
                <div className="flex items-center mt-1 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>12.5% from last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Page Views</p>
                <h3 className="text-3xl font-bold">8,927</h3>
                <div className="flex items-center mt-1 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>8.2% from last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Eye className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bounce Rate</p>
                <h3 className="text-3xl font-bold">42.3%</h3>
                <div className="flex items-center mt-1 text-sm text-red-500">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>3.1% from last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <MousePointer className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Session</p>
                <h3 className="text-3xl font-bold">2:45</h3>
                <div className="flex items-center mt-1 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>1:12 from last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Page Views</CardTitle>
            <CardDescription>Daily page views for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end justify-between">
              {pageViewsData.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-primary w-12 rounded-t-md" style={{ height: `${(day.views / 200) * 100}%` }}></div>
                  <span className="text-xs mt-2">{day.date.split("-")[2]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Pages</CardTitle>
            <CardDescription>Most visited pages on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularPagesData.map((page, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{page.title}</p>
                    <p className="text-sm text-muted-foreground">{page.path}</p>
                  </div>
                  <p className="font-medium">{page.views.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Visitor Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visitorSourcesData.map((source, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">{source.source}</p>
                    <p className="text-sm">
                      {source.count} ({source.percentage}%)
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${source.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Devices used to access your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-64">
              <div className="w-48 h-48 rounded-full border-8 border-primary relative flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border-8 border-blue-400 relative flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-8 border-green-400 flex items-center justify-center"></div>
                  <span className="absolute text-xs font-medium">Tablet 15%</span>
                </div>
                <span className="absolute text-xs font-medium" style={{ top: "30%" }}>
                  Mobile 35%
                </span>
              </div>
              <div className="absolute text-sm font-medium">Desktop 50%</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
