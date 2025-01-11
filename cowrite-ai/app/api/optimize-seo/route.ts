import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { content, keywords, userId } = await req.json()

    const prompt = `Optimize the following content for SEO, focusing on the given keywords. Improve readability, add relevant headings, and ensure proper keyword density:

Content: ${content}
Keywords: ${keywords}

Please provide the optimized content maintaining the original meaning and enhancing its SEO potential.`

    const { text: optimizedContent } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompt,
      maxTokens: 1000,
    })

    // In a real application, you might want to save the optimized content or update existing content

    return NextResponse.json({ optimizedContent })
  } catch (error) {
    console.error("Error optimizing content for SEO:", error)
    return NextResponse.json({ error: "Failed to optimize content" }, { status: 500 })
  }
}

