"use client";

import { List } from "lucide-react";
import { Heading } from "@/lib/posts";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
        <List className="h-4 w-4" />
        Table of Contents
      </div>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: heading.level === 3 ? "1rem" : "0" }}>
            <a href={"#" + heading.id} onClick={(e) => handleClick(e, heading.id)} className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}