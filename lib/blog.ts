import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPostFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  title: string;
  date: string;
  updatedAt?: string;
  category: string;
  excerpt: string;
  slug: string;
  content: string;
  image?: string;
  trending?: boolean;
  type?: "guide" | "calculator" | "standard";
  faqs?: BlogPostFaq[];
  tags?: string[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const filenames = fs.readdirSync(blogDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith(".mdx") && !filename.startsWith("_"))
    .map((filename) => {
      const filePath = path.join(blogDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      return {
        ...data,
        slug: filename.replace(".mdx", ""),
        content,
      } as BlogPost;
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(blogDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      ...data,
      slug,
      content,
    } as BlogPost;
  } catch {
    return null;
  }
}

export interface TOCHeader {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): TOCHeader[] {
  const headingRegex = /^(#{2,3})\s+(.*)$/gm;
  const headings: TOCHeader[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ id, text, level });
  }

  return headings;
}
