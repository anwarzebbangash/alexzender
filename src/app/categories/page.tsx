import Link from "next/link";
import {
  Sparkles,
  Code2,
  Server,
  Braces,
  Layers,
  Rocket,
  Shield,
  Zap,
  LucideIcon,
} from "lucide-react";
import { getAllPostsMeta } from "@/lib/posts";

const categoryIcons: Record<string, LucideIcon> = {
  "AI Tools": Sparkles,
  "Web Development": Code2,
  JavaScript: Braces,
  "Next.js": Layers,
  "Node.js": Server,
  SaaS: Rocket,
  Software: Zap,
  Cybersecurity: Shield,
  Productivity: Zap,
};

export default function CategoriesPage() {
  const posts = getAllPostsMeta();

  const categoryCounts = posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryCounts).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Categories
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Browse articles by topic.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {categories.map(([name, count]) => {
          const Icon = categoryIcons[name] || Zap;
          const slug = name.toLowerCase().replace(/\s+/g, "-");

          return (
            <Link
              key={name}
              href={`/categories/${slug}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-blue-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:group-hover:bg-blue-900">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {count} {count === 1 ? "article" : "articles"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}