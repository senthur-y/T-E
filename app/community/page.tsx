"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare, TrendingUp, Clock, Users, Shield } from "lucide-react"
import { useState, useEffect } from "react"

export default function CommunityPage() {
  const [discussions, setDiscussions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch discussions from Python backend
    fetch("/api/community/discussions")
      .then((response) => response.json())
      .then((data) => {
        setDiscussions(data.discussions || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching discussions:", error)
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
              <Link href="/community" className="text-sm font-medium transition-colors text-primary">
                Community
              </Link>
              <Link href="/labs" className="text-sm font-medium transition-colors hover:text-primary">
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
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Community</h2>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search discussions..." className="w-full pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Categories</h3>
                  <div className="space-y-1">
                    {[
                      { name: "General Discussion", count: 1243 },
                      { name: "Threat Intelligence", count: 856 },
                      { name: "Malware Analysis", count: 642 },
                      { name: "Network Security", count: 524 },
                      { name: "Web Security", count: 498 },
                      { name: "Cloud Security", count: 387 },
                      { name: "Career Development", count: 321 },
                    ].map((category, i) => (
                      <Link
                        key={i}
                        href="#"
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                      >
                        <span>{category.name}</span>
                        <Badge variant="secondary">{category.count}</Badge>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "penetration-testing",
                      "zero-day",
                      "ransomware",
                      "OWASP",
                      "CTF",
                      "incident-response",
                      "threat-hunting",
                      "SOC",
                      "SIEM",
                      "CVE",
                    ].map((tag, i) => (
                      <Badge key={i} variant="outline" className="cursor-pointer hover:bg-muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              <Tabs defaultValue="trending">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="trending" className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Trending
                    </TabsTrigger>
                    <TabsTrigger value="latest" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Latest
                    </TabsTrigger>
                    <TabsTrigger value="popular" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      Most Discussed
                    </TabsTrigger>
                  </TabsList>
                  <Button>New Discussion</Button>
                </div>

                <TabsContent value="trending" className="space-y-4">
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Loading discussions from Python backend...</p>
                    </div>
                  ) : discussions.length > 0 ? (
                    discussions
                      .filter((d) => d.trending)
                      .map((discussion, i) => (
                        <Card key={i}>
                          <CardHeader>
                            <div className="flex justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-xl hover:text-primary cursor-pointer">
                                  {discussion.title}
                                </CardTitle>
                                <CardDescription>{discussion.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {discussion.tags.map((tag, j) => (
                                <Badge key={j} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                <AvatarFallback>{discussion.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{discussion.author}</p>
                                <p className="text-xs text-muted-foreground">{discussion.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MessageSquare className="mr-1 h-4 w-4" />
                                {discussion.replies} replies
                              </div>
                              <div className="flex items-center">
                                <Users className="mr-1 h-4 w-4" />
                                {discussion.views} views
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        No discussions available. Please check the Python backend.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="latest" className="space-y-4">
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Loading discussions from Python backend...</p>
                    </div>
                  ) : (
                    discussions
                      .filter((d) => d.latest)
                      .map((discussion, i) => (
                        <Card key={i}>
                          <CardHeader>
                            <div className="flex justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-xl hover:text-primary cursor-pointer">
                                  {discussion.title}
                                </CardTitle>
                                <CardDescription>{discussion.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {discussion.tags.map((tag, j) => (
                                <Badge key={j} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                <AvatarFallback>{discussion.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{discussion.author}</p>
                                <p className="text-xs text-muted-foreground">{discussion.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MessageSquare className="mr-1 h-4 w-4" />
                                {discussion.replies} replies
                              </div>
                              <div className="flex items-center">
                                <Users className="mr-1 h-4 w-4" />
                                {discussion.views} views
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </TabsContent>

                <TabsContent value="popular" className="space-y-4">
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Loading discussions from Python backend...</p>
                    </div>
                  ) : (
                    discussions
                      .filter((d) => d.popular)
                      .map((discussion, i) => (
                        <Card key={i}>
                          <CardHeader>
                            <div className="flex justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-xl hover:text-primary cursor-pointer">
                                  {discussion.title}
                                </CardTitle>
                                <CardDescription>{discussion.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {discussion.tags.map((tag, j) => (
                                <Badge key={j} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                <AvatarFallback>{discussion.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{discussion.author}</p>
                                <p className="text-xs text-muted-foreground">{discussion.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MessageSquare className="mr-1 h-4 w-4" />
                                {discussion.replies} replies
                              </div>
                              <div className="flex items-center">
                                <Users className="mr-1 h-4 w-4" />
                                {discussion.views} views
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </TabsContent>
              </Tabs>
            </div>
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
