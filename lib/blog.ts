import fs from "fs"
import path from "path"
import matter from "gray-matter"

const blogDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  title: string
  date: string
  category: string
  excerpt: string
  slug: string
  content: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const filenames = fs.readdirSync(blogDirectory)

  const posts = filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(blogDirectory, filename)
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContent)
      
      return {
        ...data,
        slug: filename.replace(".mdx", ""),
        content,
      } as BlogPost
    })

  // Sort posts by date
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(blogDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    return {
      ...data,
      slug,
      content,
    } as BlogPost
  } catch (error) {
    return null
  }
}
