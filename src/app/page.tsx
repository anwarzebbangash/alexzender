import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Server,
  Braces,
  Layers,
  Rocket,
} from "lucide-react";
import { getAllPostsMeta } from "@/lib/posts";
import { BlogCard } from "@/components/blog-card";
import { CategoryCard } from "@/components/category-card";
import { Newsletter } from "@/components/newsletter";
export const revalidate = 0;
// Yahan humne database values ke sath match karne ke liye 'slug' add kiya hai
const categories = [
  { name: "Frontend", slug: "frontend", icon: Code2 },
  { name: "Backend", slug: "backend", icon: Server },
  { name: "AI & ML", slug: "ai-ml", icon: Sparkles },
  { name: "DevOps", slug: "devops", icon: Rocket },
  { name: "Database", slug: "database", icon: Layers },
  { name: "Other Tech", slug: "other", icon: Braces },
];

export default async function Home() {
  const posts = await getAllPostsMeta();
  const featuredPosts = posts.slice(0, 3);
  const latestPosts = posts.slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Hero Section */}
      <section className="flex flex-col items-center py-16 text-center sm:py-24">
        <span className="mb-4 rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600 dark:border-gray-800 dark:text-gray-400">
          AI • Web Development • SaaS • Tutorials
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
          Learn to build with{" "}
          <span className="text-blue-600 dark:text-blue-400">
            modern tech
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Practical tutorials on AI tools, web development, JavaScript,
          Next.js, Node.js and SaaS — written for beginners and intermediate
          developers.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Explore Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            About This Blog
          </Link>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Articles
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-12">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => {
            // Yahan ab hum 'name' ke bajaye 'slug' ko match kar rahe hain
            const count = posts.filter(
              (p) => p.category === category.slug
            ).length;
            return (
              <CategoryCard
                key={category.slug}
                name={category.name}
                count={count}
                icon={category.icon}
              />
            );
          })}
        </div>
      </section>

      {/* Latest Articles */}
      {latestPosts.length > 0 && (
        <section className="py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Latest Articles
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-12">
        <Newsletter />
      </section>
    </main>
  );
}