import Link from "next/link"
import { getBlogPosts, BlogPost } from "@/lib/blog"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Calculator, BookOpen, ChevronRight } from "lucide-react"
import { BlogCard } from "@/components/blog/BlogCard"
import { NewsletterForm } from "@/components/blog/NewsletterForm"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Financial Insights Blog — Guides, Calculators & Money Strategies",
  description:
    "Master your money with institutional-grade financial guides, budgeting strategies, and calculator tutorials. New articles every week.",
}

const categoryColors: Record<string, string> = {
  "Personal Finance": "bg-blue-100 text-blue-800",
  Investing: "bg-green-100 text-green-800",
  "Credit Cards": "bg-purple-100 text-purple-800",
  Loans: "bg-orange-100 text-orange-800",
  Budgeting: "bg-teal-100 text-teal-800",
}

export default async function BlogPage() {
  const allPosts = await getBlogPosts()

  // Section A: 3 most recent posts
  const newPosts = allPosts.slice(0, 3)
  const newPostSlugs = new Set(newPosts.map((p) => p.slug))

  // Section B: Featured calculators/guides — only posts NOT already shown in Section A
  const featuredPosts = allPosts.filter(
    (post) =>
      (post.type === "calculator" || post.type === "guide") &&
      !newPostSlugs.has(post.slug)
  )

  // Section C: All remaining posts (not in A or B)
  const featuredSlugs = new Set(featuredPosts.map((p) => p.slug))
  const remainingPosts = allPosts.filter(
    (post) => !newPostSlugs.has(post.slug) && !featuredSlugs.has(post.slug)
  )

  return (
    <Section className="pt-4 pb-16 lg:pt-8 bg-neutral-50/30 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-8 -ml-2 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <div className="max-w-3xl">
            <h1 className="heading-1 mb-4 text-4xl lg:text-6xl tracking-tight">
              Financial Insights
            </h1>
            <p className="body-text text-xl text-muted-foreground leading-relaxed">
              Master your money with our collection of financial guides, budgeting strategies, and
              calculator tutorials.
            </p>
          </div>
        </div>

        {/* Section A: New This Week */}
        {newPosts.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">New This Week</h2>
              </div>
              <div className="h-px flex-1 mx-8 bg-border hidden md:block" />
            </div>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
              {newPosts.map((post) => (
                <BlogCard key={`new-${post.slug}`} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Section B: Popular Calculators & Guides — only if there are posts not already shown */}
        {featuredPosts.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
                  <Calculator className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Popular Calculators &amp; Guides
                </h2>
              </div>
            </div>
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={`featured-${post.slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-border/40 bg-background/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    {post.image && (
                      <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 max-w-[85%]">
                          <span
                            className={cn(
                              "inline-block rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-md leading-relaxed",
                              categoryColors[post.category] || "bg-white/90 text-neutral-900"
                            )}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        {!post.image && (
                          <span
                            className={cn(
                              "inline-block rounded-xl px-3 py-1.5 text-xs font-bold mb-4",
                              categoryColors[post.category] || "bg-muted text-foreground"
                            )}
                          >
                            {post.category}
                          </span>
                        )}
                        <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calculator className="h-4 w-4 text-primary" />
                          <span>Interactive Tool</span>
                        </div>
                        <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
                          Read Guide <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <div className="mb-20">
          <NewsletterForm />
        </div>

        {/* Section C: All Remaining Articles */}
        {remainingPosts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">More Articles</h2>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.slice(0, 9).map((post) => (
                <BlogCard key={`all-${post.slug}`} post={post} />
              ))}
            </div>
            {remainingPosts.length > 9 && (
              <div className="mt-16 flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-12 py-6 text-lg font-semibold hover:bg-muted transition-colors"
                >
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Empty state — only if truly no posts at all */}
        {allPosts.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Articles coming soon.</p>
          </div>
        )}
      </div>
    </Section>
  )
}
