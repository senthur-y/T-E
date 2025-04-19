"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Search, Server, Code, Database, Lock, Cpu, Cloud, Globe, Terminal } from "lucide-react"
import { useState, useEffect } from "react"

export default function LabsPage() {
  const [labs, setLabs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch labs from Python backend
    fetch("/api/labs")
      .then((response) => response.json())
      .then((data) => {
        setLabs(data.labs || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching labs:", error)
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
              <Link href="/labs" className="text-sm font-medium transition-colors text-primary">
                Labs
              </Link>
              <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
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
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Python-Powered Cybersecurity Labs
                      </h1>
                      <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        Practice your skills in realistic environments. Our labs are powered by Python backend for real
                        security tools and analysis.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Button size="lg">Get Started</Button>
                      <Button variant="outline" size="lg">
                        Browse Labs
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Terminal className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold">Python</h3>
                          <p className="text-xs text-muted-foreground">Backend</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold">React</h3>
                          <p className="text-xs text-muted-foreground">Frontend</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Lock className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold">100%</h3>
                          <p className="text-xs text-muted-foreground">Secure</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Cpu className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold">Real</h3>
                          <p className="text-xs text-muted-foreground">Tools</p>
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
                <Input type="search" placeholder="Search labs..." className="w-full pl-8" />
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-2/3 justify-end">
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  All Labs
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Network Security
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Web Security
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Malware Analysis
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Forensics
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Cloud Security
                </Badge>
              </div>
            </div>

            {/* Lab Categories */}
            <Tabs defaultValue="all">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all">All Labs</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="my-labs">My Labs</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-8">
                {/* Featured Labs */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Featured Labs</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                      <div className="col-span-3 text-center py-12">
                        <p className="text-muted-foreground">Loading labs from Python backend...</p>
                      </div>
                    ) : labs.length > 0 ? (
                      labs
                        .filter((lab) => lab.featured)
                        .map((lab, i) => (
                          <Card key={i} className="overflow-hidden">
                            <CardHeader className="pb-3">
                              <div className="flex items-center gap-2">
                                <div className="rounded-full bg-primary/10 p-2">
                                  {lab.category === "network" ? (
                                    <Server className="h-5 w-5 text-primary" />
                                  ) : lab.category === "web" ? (
                                    <Globe className="h-5 w-5 text-primary" />
                                  ) : (
                                    <Code className="h-5 w-5 text-primary" />
                                  )}
                                </div>
                                <Badge
                                  variant={
                                    lab.difficulty === "beginner"
                                      ? "outline"
                                      : lab.difficulty === "intermediate"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                >
                                  {lab.difficulty}
                                </Badge>
                              </div>
                              <CardTitle className="text-xl mt-2">{lab.title}</CardTitle>
                              <CardDescription>{lab.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                <span>Duration: {lab.duration}</span>
                                <span>{lab.completions} completions</span>
                              </div>
                              <Progress value={65} className="h-2" />
                            </CardContent>
                            <CardFooter>
                              <Button
                                className="w-full"
                                onClick={() => (window.location.href = `/api/labs/start/${lab.id}`)}
                              >
                                Start Lab
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                    ) : (
                      <div className="col-span-3 text-center py-12">
                        <p className="text-muted-foreground">No labs available. Please check the Python backend.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lab Categories */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Lab Categories</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        title: "Network Security",
                        description: "Protect networks from unauthorized access, misuse, and attacks.",
                        icon: Server,
                        count: 24,
                      },
                      {
                        title: "Web Security",
                        description: "Secure web applications and services against various threats.",
                        icon: Globe,
                        count: 18,
                      },
                      {
                        title: "Malware Analysis",
                        description: "Analyze and understand malicious software behavior.",
                        icon: Code,
                        count: 15,
                      },
                      {
                        title: "Digital Forensics",
                        description: "Investigate digital artifacts to uncover evidence of incidents.",
                        icon: Database,
                        count: 12,
                      },
                      {
                        title: "Cloud Security",
                        description: "Secure cloud infrastructure and services against threats.",
                        icon: Cloud,
                        count: 10,
                      },
                      {
                        title: "Cryptography",
                        description: "Learn encryption techniques and how to implement secure communications.",
                        icon: Lock,
                        count: 8,
                      },
                    ].map((category, i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="rounded-full bg-primary/10 p-2 w-fit">
                            <category.icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-xl mt-2">{category.title}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">{category.count} labs available</div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Labs
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="beginner" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {loading ? (
                    <div className="col-span-3 text-center py-12">
                      <p className="text-muted-foreground">Loading labs from Python backend...</p>
                    </div>
                  ) : (
                    labs
                      .filter((lab) => lab.difficulty === "beginner")
                      .map((lab, i) => (
                        <Card key={i} className="overflow-hidden">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-primary/10 p-2">
                                {lab.category === "network" ? (
                                  <Server className="h-5 w-5 text-primary" />
                                ) : lab.category === "web" ? (
                                  <Globe className="h-5 w-5 text-primary" />
                                ) : (
                                  <Code className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <Badge variant="outline">Beginner</Badge>
                            </div>
                            <CardTitle className="text-xl mt-2">{lab.title}</CardTitle>
                            <CardDescription>{lab.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                              <span>Duration: {lab.duration}</span>
                              <span>{lab.completions} completions</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full"
                              onClick={() => (window.location.href = `/api/labs/start/${lab.id}`)}
                            >
                              Start Lab
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="intermediate" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {loading ? (
                    <div className="col-span-3 text-center py-12">
                      <p className="text-muted-foreground">Loading labs from Python backend...</p>
                    </div>
                  ) : (
                    labs
                      .filter((lab) => lab.difficulty === "intermediate")
                      .map((lab, i) => (
                        <Card key={i} className="overflow-hidden">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-primary/10 p-2">
                                {lab.category === "network" ? (
                                  <Server className="h-5 w-5 text-primary" />
                                ) : lab.category === "web" ? (
                                  <Globe className="h-5 w-5 text-primary" />
                                ) : (
                                  <Code className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <Badge variant="secondary">Intermediate</Badge>
                            </div>
                            <CardTitle className="text-xl mt-2">{lab.title}</CardTitle>
                            <CardDescription>{lab.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                              <span>Duration: {lab.duration}</span>
                              <span>{lab.completions} completions</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full"
                              onClick={() => (window.location.href = `/api/labs/start/${lab.id}`)}
                            >
                              Start Lab
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {loading ? (
                    <div className="col-span-3 text-center py-12">
                      <p className="text-muted-foreground">Loading labs from Python backend...</p>
                    </div>
                  ) : (
                    labs
                      .filter((lab) => lab.difficulty === "advanced")
                      .map((lab, i) => (
                        <Card key={i} className="overflow-hidden">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-primary/10 p-2">
                                {lab.category === "network" ? (
                                  <Server className="h-5 w-5 text-primary" />
                                ) : lab.category === "web" ? (
                                  <Globe className="h-5 w-5 text-primary" />
                                ) : (
                                  <Code className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <Badge variant="destructive">Advanced</Badge>
                            </div>
                            <CardTitle className="text-xl mt-2">{lab.title}</CardTitle>
                            <CardDescription>{lab.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                              <span>Duration: {lab.duration}</span>
                              <span>{lab.completions} completions</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full"
                              onClick={() => (window.location.href = `/api/labs/start/${lab.id}`)}
                            >
                              Start Lab
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="my-labs" className="space-y-4">
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">Sign In to Access Your Labs</h3>
                  <p className="text-muted-foreground mb-4">Track your progress and continue where you left off.</p>
                  <Button>Sign In</Button>
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
