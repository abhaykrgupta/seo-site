import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getBlogPosts, getPostBySlug, extractHeadings } from "@/lib/blog"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { AuthorBio } from "@/components/blog/AuthorBio"
import { CalculatorPromo } from "@/components/blog/CalculatorPromo"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { cn } from "@/lib/utils"

interface Props {
  params: Promise<{ slug: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://finvaultguide.com"

// Helper to generate IDs for headings (matches extractHeadings logic)
const generateId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return {}

  const postUrl = `${SITE_URL}/blog/${slug}`

  return {
    title: `${post.title} | FinVault Blog`,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      section: post.category,
      siteName: "FinVault",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const headings = extractHeadings(post.content)
  const postUrl = `${SITE_URL}/blog/${slug}`

  // JSON-LD Schemas (BlogPosting & Breadcrumbs)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": new Date(post.date).toISOString(),
        "dateModified": new Date(post.updatedAt || post.date).toISOString(),
        "url": postUrl,
        "author": {
          "@type": "Organization",
          "name": "FinVault Editorial",
          "url": SITE_URL
        },
        "publisher": {
          "@type": "Organization",
          "name": "FinVault",
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/logo.png`
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${SITE_URL}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": postUrl
          }
        ]
      }
    ]
  }

  const faqJsonLd =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Section className="pt-4 pb-16 lg:pt-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Content Area */}
            <article className="lg:col-span-8">
              <header className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded-xl border border-primary/10">
                    <Tag className="mr-1.5 h-3 w-3" /> {post.category}
                  </span>
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1.5 h-3 w-3" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h1 className="heading-1 mb-6 !text-4xl lg:!text-5xl !leading-tight">{post.title}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed italic">
                  {post.excerpt}
                </p>
              </header>

              <hr className="mb-12 border-border/50" />

              {/* Mobile Jump to section */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-12 border border-border/40 bg-muted/10 p-6 rounded-2xl">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    Jump to section
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {headings.map((item) => (
                      <li key={`mobile-toc-${item.id}`} className={cn("text-sm", item.level === 3 && "pl-4")}>
                        <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:underline prose-img:rounded-3xl prose-headings:mt-12 prose-headings:mb-6 prose-p:leading-relaxed">
                <MDXRemote 
                  source={post.content} 
                  components={{
                    CalculatorPromo: CalculatorPromo,
                    h2: (props: any) => {
                      const id = generateId(String(props.children))
                      return <h2 id={id} {...props} />
                    },
                    h3: (props: any) => {
                      const id = generateId(String(props.children))
                      return <h3 id={id} {...props} />
                    }
                  }}
                />
              </div>

              <div className="mt-16 pt-8 border-t border-border/50">
                <AuthorBio 
                  lastUpdated={new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                />
              </div>
            </article>

            {/* Sidebar Desktop TOC */}
            <aside className="hidden lg:block lg:col-span-4 self-start sticky top-24">
              <div className="border border-border/40 bg-muted/20 backdrop-blur-sm p-8 rounded-3xl">
                <TableOfContents items={headings} />
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </>
  )
}

