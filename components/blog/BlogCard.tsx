import Link from "next/link"
import { Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BlogPost } from "@/lib/blog"

interface BlogCardProps {
  post: BlogPost
}

const categoryColors: Record<string, string> = {
  "Personal Finance": "bg-blue-100 text-blue-800",
  "Investing": "bg-green-100 text-green-800",
  "Credit Cards": "bg-purple-100 text-purple-800",
  "Loans": "bg-orange-100 text-orange-800",
  "Budgeting": "bg-teal-100 text-teal-800",
}

function calculateReadingTime(content: string) {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function BlogCard({ post }: BlogCardProps) {
  const readingTime = calculateReadingTime(post.content)
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col p-6 border border-border/40 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="flex flex-col h-full space-y-4">
          {/* Category Badge */}
          <div className="flex shrink-0">
            <span
              className={cn(
                "inline-block rounded-xl px-3 py-1.5 text-xs font-semibold leading-relaxed",
                categoryColors[post.category] || "dark:bg-slate-800 dark:text-slate-200 bg-slate-100 text-slate-700"
              )}
            >
              {post.category}
            </span>
          </div>

          {/* Meta Info: Reading Time + Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
            <Clock className="h-4 w-4" />
            <span>
              {readingTime} min read · {formattedDate}
            </span>
          </div>

          {/* Title and Excerpt */}
          <div className="space-y-2 flex-grow">
            <h2 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
