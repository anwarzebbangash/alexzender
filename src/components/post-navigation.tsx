import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PostMeta } from "@/types/post";

interface PostNavigationProps {
  previous: PostMeta | null;
  next: PostMeta | null;
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-12 grid grid-cols-1 gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2 dark:border-gray-800">
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="group flex flex-col rounded-xl border border-gray-200 p-5 transition-colors hover:border-blue-200 dark:border-gray-800 dark:hover:border-blue-900"
        >
          <span className="mb-2 flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous Article
          </span>
          <span className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col items-end rounded-xl border border-gray-200 p-5 text-right transition-colors hover:border-blue-200 dark:border-gray-800 dark:hover:border-blue-900"
        >
          <span className="mb-2 flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
            Next Article
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}