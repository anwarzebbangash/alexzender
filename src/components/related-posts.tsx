import { BlogCard } from "@/components/blog-card";
import { PostMeta } from "@/types/post";

interface RelatedPostsProps {
  posts: PostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-200 pt-10 dark:border-gray-800">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
