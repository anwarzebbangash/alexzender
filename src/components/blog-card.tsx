import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { PostMeta } from "@/types/post";

interface BlogCardProps {
  post: PostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-400">
          {post.category}
        </span>

        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {post.title}
        </h3>

        <p className="mb-4 line-clamp-2 flex-1 text-sm text-gray-600 dark:text-gray-400">
          {post.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}