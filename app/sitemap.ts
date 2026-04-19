import { MetadataRoute } from "next"
import { getBlogPosts } from "@/lib/blog"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://finvaultguide.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const staticRoutes = [
    "",
    "/tools/emi",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/disclaimer",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  // Dynamic Blog Routes
  const posts = await getBlogPosts()
  const blogRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
