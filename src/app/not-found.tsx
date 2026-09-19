import Link from "next/link";
import { Home, Search, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
        <FileQuestion className="h-10 w-10" />
      </div>

      <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
        404
      </h1>
      <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Page Not Found
      </h2>
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or may
        have been moved.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Search className="h-4 w-4" />
          Search Articles
        </Link>
      </div>
    </main>
  );
}