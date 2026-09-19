import { getAllPostsMeta } from "@/lib/posts";
import { SearchResults } from "@/components/search-results";

export default function SearchPage() {
  const posts = getAllPostsMeta();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Search Articles
        </h1>
      </div>

      <SearchResults posts={posts} />
    </main>
  );
}