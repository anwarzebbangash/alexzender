import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import { Post, PostMeta, PostFrontmatter } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "content");

// Get all post slugs (filenames without .md extension)
export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

// Get metadata for all posts (used in blog listing pages)
export function getAllPostsMeta(): PostMeta[] {
  const slugs = getAllPostSlugs();

  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      ...(data as PostFrontmatter),
      readingTime: stats.text,
    };
  });

  // Sort posts by date, newest first
  return posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

// Get full post data (metadata + rendered HTML content) for a single post
export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const stats = readingTime(content);

  return {
    slug,
    content: contentHtml,
    readingTime: stats.text,
    ...(data as PostFrontmatter),
  };
}

// Get posts filtered by category
export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPostsMeta();
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
}
// Get related posts (same category, excluding current post)
export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
): PostMeta[] {
  const allPosts = getAllPostsMeta();
  return allPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

// Get previous and next posts (based on date order)
export function getAdjacentPosts(currentSlug: string): {
  previous: PostMeta | null;
  next: PostMeta | null;
} {
  const allPosts = getAllPostsMeta();
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous:
      currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
  };
}

// Extract headings (h2, h3) from HTML content for Table of Contents
export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(htmlContent: string): Heading[] {
  const headingRegex = /<h([23])>(.*?)<\/h\1>/g;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]+>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }

  return headings;
}

// Add id attributes to headings in HTML so we can link to them
export function addHeadingIds(htmlContent: string): string {
  return htmlContent.replace(/<h([23])>(.*?)<\/h\1>/g, (_match, level, text) => {
    const cleanText = text.replace(/<[^>]+>/g, "");
    const id = cleanText
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return `<h${level} id="${id}">${text}</h${level}>`;
  });
}