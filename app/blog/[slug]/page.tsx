import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getBlogPosts, getPostBySlug } from "@/lib/blog"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { AuthorBio } from "@/components/blog/AuthorBio"
import { CalculatorPromo } from "@/components/blog/CalculatorPromo"

interface Props {
  params: Promise<{ slug: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://finvaultguide.com"

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
        "dateModified": new Date(post.date).toISOString(),
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="pt-4 pb-16 lg:pt-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                <Tag className="mr-1.5 h-3 w-3" /> {post.category}
              </span>
              <span className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1.5 h-3 w-3" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="heading-1 mb-6 !text-4xl lg:!text-5xl">{post.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed italic">
              {post.excerpt}
            </p>
          </header>

          <hr className="mb-12 border-border/50" />

          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:underline prose-img:rounded-2xl">
            <MDXRemote 
              source={post.content} 
              components={{
                CalculatorPromo: CalculatorPromo
              }}
            />
          </div>

          <AuthorBio 
            lastUpdated={new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          />
        </div>
      </Section>
    </>
  )
}
