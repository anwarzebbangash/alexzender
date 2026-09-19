import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPostsMeta, getPostsByCategory } from "@/lib/posts";
import { BlogCard } from "@/components/blog-card";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  return categories.map((cat) => ({
    category: cat.toLowerCase().replace(/\s+/g, "-"),
  }));
}

function findCategoryBySlug(slug: string, posts: ReturnType<typeof getAllPostsMeta>) {
  const allCategories = Array.from(new Set(posts.map((p) => p.category)));
  return allCategories.find(
    (cat) => cat.toLowerCase().replace(/\s+/g, "-") === slug
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const allPosts = getAllPostsMeta();
  const actualCategoryName = findCategoryBySlug(category, allPosts);
  const posts = actualCategoryName
    ? getPostsByCategory(actualCategoryName)
    : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/categories"
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4" />
        All Categories
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {actualCategoryName || "Category"}
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? "article" : "articles"} in this
          category.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-gray-500 dark:text-gray-400">
          No articles found in this category yet.
        </p>
      )}
    </main>
  );
}