import { NextResponse } from "next/server"
import { getBlogPosts } from "@/lib/blog"

export interface SearchPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase().trim() ?? ""

  if (query.length < 2) {
    return NextResponse.json({ posts: [] })
  }

  const posts = await getBlogPosts()

  const filtered: SearchPost[] = posts
    .filter((post) => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
    })
    .slice(0, 6)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
    }))

  return NextResponse.json({ posts: filtered })
}
