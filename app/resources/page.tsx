"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, Search, FileText, BookOpen, Download, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

export default function ResourcesPage() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch resources from Python backend
    fetch("/api/resources")
      .then((response) => response.json())
      .then((data) => {
        setResources(data.resources || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching resources:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CyberSecHub</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/community" className="text-sm font-medium transition-colors hover:text-primary">
                Community
              </Link>
              <Link href="/labs" className="text-sm font-medium transition-colors hover:text-primary">
                Labs
              </Link>
              <Link href="/resources" className="text-sm font-medium transition-colors text-primary">
                Resources
              </Link>
              <Button variant="outline" size="sm" className="ml-4">
                Sign In
              </Button>
              <Button size="sm">Sign Up</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col space-y-8">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted rounded-lg">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Cybersecurity Resources</h1>
                      <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        Access guides, tools, and the latest research in cybersecurity. Our resources are curated by
                        experts and powered by Python analytics.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Button size="lg">Browse Resources</Button>
                      <Button variant="outline" size="lg">
                        Submit Resource
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold">Guides</h3>
                          <p className="text-xs text-muted-foreground">Step-by-step</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold">Research</h3>
                          <p className="text-xs text-muted-foreground">Latest findings</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Download className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold">Tools</h3>
                          <p className="text-xs text-muted-foreground">Python-powered</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                          <ExternalLink className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold">Links</h3>
                          <p className="text-xs text-muted-foreground">Curated sources</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search resources..." className="w-full pl-8" />
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-2/3 justify-end">
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  All Resources
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Guides
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Tools
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Research
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Cheatsheets
                </Badge>
              </div>
            </div>

            {/* Resources */}
            <Tabs defaultValue="all">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-8">
                {/* Featured Resources */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Featured Resources</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                      <div className="col-span-3 text-center py-12">
                        <p className="text-muted-foreground">Loading resources from Python backend...</p>
                      </div>
                    ) : resources.length > 0 ? (
                      resources
                        .filter((resource) => resource.featured)
                        .map((resource, i) => (
                          <Card key={i} className="overflow-hidden">
                            <CardHeader className="pb-3">
                              <div className="flex items-center gap-2">
                                <div className="rounded-full bg-primary/10 p-2">
                                  {resource.type === "guide" ? (
                                    <FileText className="h-5 w-5 text-primary" />
                                  ) : resource.type === "tool" ? (
                                    <Download className="h-5 w-5 text-primary" />
                                  ) : (
                                    <BookOpen className="h-5 w-5 text-primary" />
                                  )}
                                </div>
                                <Badge variant="outline">{resource.type}</Badge>
                              </div>
                              <CardTitle className="text-xl mt-2">{resource.title}</CardTitle>
                              <CardDescription>{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {resource.tags.map((tag, j) => (
                                  <Badge key={j} variant="secondary">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button className="w-full" onClick={() => window.open(resource.url, "_blank")}>
                                View Resource
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                    ) : (
                      <div className="col-span-3 text-center py-12">
                        <p className="text-muted-foreground">
                          No resources available. Please check the Python backend.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:gap-0">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} CyberSecHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
