import { Op } from "sequelize";
import readingTime from "reading-time";
import { Article, User } from "@/models";

// Ek Article record ko frontend ke liye "PostMeta" shape mein badalta hai
function toPostMeta(article: any) {
  const stats = readingTime(article.content || "");
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    image: article.featured_image,
    date: article.published_at,
    author: article.author?.name || "Admin",
    category: article.category,
    tags: article.tags || [],
    readingTime: stats.text,
  };
}

// Sirf published articles ke slugs (generateStaticParams ke liye)
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const articles = await Article.findAll({
      attributes: ["slug"],
      where: { published_at: { [Op.ne]: null } },
    });
    return articles.map((a: any) => a.slug);
  } catch (error) {
    console.error("getAllPostSlugs failed (table may not exist yet):", error);
    return [];
  }
}

// Blog listing page ke liye sab published articles ki metadata
export async function getAllPostsMeta() {
  try {
    const articles = await Article.findAll({
      where: { published_at: { [Op.ne]: null } },
      include: [{ model: User, as: "author", attributes: ["name"] }],
      order: [["published_at", "DESC"]],
    });
    return articles.map(toPostMeta);
  } catch (error) {
    console.error("getAllPostsMeta failed (table may not exist yet):", error);
    return [];
  }
}

// Ek specific article, uska poora content ke saath
export async function getPostBySlug(slug: string) {
  const article: any = await Article.findOne({
    where: { slug, published_at: { [Op.ne]: null } },
    include: [{ model: User, as: "author", attributes: ["name"] }],
  });

  if (!article) throw new Error("Post not found");

  const stats = readingTime(article.content || "");
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    image: article.featured_image,
    date: article.published_at,
    author: article.author?.name || "Admin",
    category: article.category,
    tags: article.tags || [],
    content: article.content, // Ye already HTML hai (react-quill se aayi)
    readingTime: stats.text,
  };
}

export async function getPostsByCategory(category: string) {
  const allPosts = await getAllPostsMeta();
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
) {
  const allPosts = await getAllPostsMeta();
  return allPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

export async function getAdjacentPosts(currentSlug: string) {
  const allPosts = await getAllPostsMeta();
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

// Ye 2 functions pure string-processing hain, database se lena-dena nahi — bilkul same rahenge
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