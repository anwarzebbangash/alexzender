"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Next.js ka Link import kiya hai (recommended)

interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  published_at: string | null;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    setLoading(true);
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Kya aap "${title}" ko delete karna chahte hain?`)) return;

    const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert("Delete nahi ho saka: " + data.error);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="mx-auto max-w-5xl p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Logout
        </button>
      </div>

      {/* Yahan 'Link' component add kiya hai */}
      <Link
        href="/admin/articles/new"
        className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        + Naya Article Likhein
      </Link>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Sab Articles ({articles.length})
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : articles.length === 0 ? (
          <p className="text-gray-500">Abhi tak koi article nahi hai.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-t border-gray-200 dark:border-gray-800">
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{article.title}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{article.category}</td>
                    <td className="px-4 py-3">
                      {article.published_at ? (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-950 dark:text-green-400">
                          Published
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {/* Yahan bhi 'Link' component use kiya hai */}
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="mr-3 text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        className="text-red-600 hover:underline dark:text-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}