import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  count: number;
  icon: LucideIcon;
}

export function CategoryCard({ name, count, icon: Icon }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${name.toLowerCase().replace(/\s+/g, "-")}`}
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
}