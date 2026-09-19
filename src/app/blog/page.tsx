import { getAllPostsMeta } from "@/lib/posts";
import { BlogListing } from "@/components/blog-listing";

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          All Articles
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Tutorials on AI, web development, JavaScript, and more.
        </p>
      </div>

      <BlogListing posts={posts} />
    </main>
  );
}