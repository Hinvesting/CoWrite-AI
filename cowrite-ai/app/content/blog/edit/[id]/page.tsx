"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function EditBlogPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // In a real application, you'd fetch the blog post data from your API
    // For now, we'll simulate this with local storage
    const savedPost = localStorage.getItem(`blog-post-${params.id}`)
    if (savedPost) {
      const { title, content } = JSON.parse(savedPost)
      setTitle(title)
      setContent(content)
    }
  }, [params.id])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // In a real application, you'd save this to your API
      localStorage.setItem(`blog-post-${params.id}`, JSON.stringify({ title, content }))
      toast({
        title: "Success",
        description: "Blog post saved successfully.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Blog Post</CardTitle>
        <CardDescription>
          Review and edit your AI-generated blog post.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the blog post title"
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your blog post content"
              required
              className="min-h-[300px]"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Blog Post"}
        </Button>
      </CardFooter>
    </Card>
  )
}

