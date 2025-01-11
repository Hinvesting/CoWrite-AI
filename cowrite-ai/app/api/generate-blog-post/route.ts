import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { prisma } from "./db";

export async function POST(req: Request) {
  try {
    const { title, description, keywords, userId } = await req.json()

    const prompt = `Write a blog post with the following details:
    Title: ${title}
    Description: ${description}
    Keywords: ${keywords}

    Please provide a well-structured blog post with an introduction, main content, and conclusion.`

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompt,
      maxTokens: 1000,
    })

    // Save the generated blog post to the database
    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        content: text,
        userId,
      },
    })

    return NextResponse.json({ id: blogPost.id, content: text })
  } catch (error) {
    console.error("Error generating blog post:", error)
    return NextResponse.json({ error: "Failed to generate blog post" }, { status: 500 })
  }
}

