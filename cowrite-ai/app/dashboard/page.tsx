import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return <div>Please sign in to view your dashboard.</div>
  }

  const blogPosts = await prisma.blogPost.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {session.user.name}</h1>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Recent Blog Posts</h2>
          <Link href="/content/blog/new">
            <Button>Create New Post</Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{new Date(post.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/content/blog/edit/${post.id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Content Creation Tools</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Blog Post</CardTitle>
              <CardDescription>Create a new blog post with AI assistance</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/content/blog/new">
                <Button>Create</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Social Media Post</CardTitle>
              <CardDescription>Generate social media content from your blog posts</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/content/social/new">
                <Button>Create</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>SEO Optimization</CardTitle>
              <CardDescription>Optimize your content for search engines</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/content/seo">
                <Button>Optimize</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}

