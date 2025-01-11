"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function SEOOptimizationPage() {
  const [content, setContent] = useState("")
  const [keywords, setKeywords] = useState("")
  const [optimizedContent, setOptimizedContent] = useState("")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsOptimizing(true)

    try {
      const response = await fetch("/api/optimize-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, keywords, userId: session?.user?.id }),
      })

      if (!response.ok) {
        throw new Error("Failed to optimize content")
      }

      const data = await response.json()
      setOptimizedContent(data.optimizedContent)
      toast({
        title: "Success",
        description: "Content optimized successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to optimize content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">SEO Optimization</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Original Content</CardTitle>
            <CardDescription>Enter your content and target keywords</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOptimize}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your content here"
                    className="h-40"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="keywords">Target Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Enter target keywords"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleOptimize} disabled={isOptimizing}>
              {isOptimizing ? "Optimizing..." : "Optimize for SEO"}
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Optimized Content</CardTitle>
            <CardDescription>AI-optimized content for better SEO</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={optimizedContent}
              readOnly
              className="h-40"
              placeholder="Optimized content will appear here"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

