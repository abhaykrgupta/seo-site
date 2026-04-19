import Link from "next/link"
import { getBlogPosts } from "@/lib/blog"
import { Section } from "@/components/ui/section"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag } from "lucide-react"

export const metadata = {
  title: "Financial Insights Blog | FinVault",
  description: "Learn the strategies that help you maximize your financial leverage.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <Section className="pt-4 pb-16 lg:pt-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6 -ml-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <h1 className="heading-1 mb-4">Financial Insights</h1>
          <p className="body-text text-lg text-muted-foreground">
            A collection of articles on personal finance, investing, and real estate to help you make smarter decisions.
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <Card className="border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/20 group-hover:bg-muted/30">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center text-xs font-bold uppercase tracking-wider text-primary">
                      <Tag className="mr-1.5 h-3 w-3" /> {post.category}
                    </span>
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1.5 h-3 w-3" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
