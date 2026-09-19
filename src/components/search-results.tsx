"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { PostMeta } from "@/types/post";

interface SearchResultsProps {
  posts: PostMeta[];
}

export function SearchResults({ posts }: SearchResultsProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        post.category.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }, [posts, query]);

  return (
    <div>
      <div className="relative mx-auto mb-10 max-w-xl">
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, description, category, or tag..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
        />
      </div>

      {query.trim() === "" ? (
        <p className="py-20 text-center text-gray-500 dark:text-gray-400">
          Start typing to search articles.
        </p>
      ) : results.length > 0 ? (
        <>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {results.length} {results.length === 1 ? "result" : "results"}{" "}
            for &quot;{query}&quot;
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      ) : (
        <p className="py-20 text-center text-gray-500 dark:text-gray-400">
          No articles found for &quot;{query}&quot;.
        </p>
      )}
    </div>
  );
}