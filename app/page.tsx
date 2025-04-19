"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Users, FlaskRoundIcon as Flask, ChevronRight, Lock, Code } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [pythonStatus, setPythonStatus] = useState("Checking...")
  const [latestThreats, setLatestThreats] = useState([])

  useEffect(() => {
    // Check if Python backend is running
    fetch("/api/status")
      .then((response) => response.json())
      .then((data) => {
        setPythonStatus(data.status)
      })
      .catch((error) => {
        console.error("Error checking Python backend:", error)
        setPythonStatus("Offline")
      })

    // Get latest threats from Python backend
    fetch("/api/threats/latest")
      .then((response) => response.json())
      .then((data) => {
        setLatestThreats(data.threats || [])
      })
      .catch((error) => {
        console.error("Error fetching latest threats:", error)
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

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Advance Your Cybersecurity Skills
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join our community of cybersecurity professionals. Practice in our labs, share knowledge, and stay ahead
                of threats.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1">
                  Get Started <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Explore Labs
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Python Backend Status:{" "}
                <span className={pythonStatus === "Online" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                  {pythonStatus}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-video overflow-hidden rounded-xl border bg-background shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm">
                  <div className="p-8 h-full flex flex-col justify-center">
                    <div className="space-y-2 text-center">
                      <Lock className="h-12 w-12 mx-auto text-primary" />
                      <h3 className="text-2xl font-bold">Secure Environment</h3>
                      <p className="text-sm text-muted-foreground">
                        Practice in isolated environments designed for real-world scenarios
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides all the tools and resources for cybersecurity professionals to learn, practice,
                and connect.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-center text-muted-foreground">
                Connect with peers, share insights, and collaborate on security challenges.
              </p>
              <Link href="/community" className="text-sm font-medium text-primary hover:underline">
                Join Discussions
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Flask className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Labs</h3>
              <p className="text-center text-muted-foreground">
                Hands-on environments to practice techniques and test your skills safely.
              </p>
              <Link href="/labs" className="text-sm font-medium text-primary hover:underline">
                Explore Labs
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Resources</h3>
              <p className="text-center text-muted-foreground">
                Access guides, tools, and the latest research in cybersecurity.
              </p>
              <Link href="/resources" className="text-sm font-medium text-primary hover:underline">
                Browse Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Threats Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Threats</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Real-time threat intelligence powered by our Python backend
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestThreats.length > 0 ? (
              latestThreats.map((threat, index) => (
                <div key={index} className="flex flex-col space-y-3 rounded-lg border bg-background p-6 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <Code className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">{threat.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{threat.description}</p>
                  <div className="flex items-center text-sm">
                    <span className="text-red-500 font-medium">Severity: {threat.severity}</span>
                    <span className="mx-2">•</span>
                    <span>{threat.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">Loading threat data from Python backend...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">CyberSecHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A community platform for cybersecurity professionals to learn, practice, and connect.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/community" className="text-muted-foreground hover:text-foreground">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/labs" className="text-muted-foreground hover:text-foreground">
                    Labs
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:gap-0">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} CyberSecHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
