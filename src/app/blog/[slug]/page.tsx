import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
  extractHeadings,
  addHeadingIds,
} from "@/lib/posts";
import { RelatedPosts } from "@/components/related-posts";
import { PostNavigation } from "@/components/post-navigation";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareButtons } from "@/components/share-buttons";
import { CodeCopyButtons } from "@/components/code-copy-buttons";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: [post.image],
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [post.image],
      },
      alternates: {
        canonical: `/blog/${slug}`,
      },
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedPosts = getRelatedPosts(post.slug, post.category);
  const { previous, next } = getAdjacentPosts(post.slug);
  const headings = extractHeadings(post.content);
  const contentWithIds = addHeadingIds(post.content);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "AnwarByte",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
          <article className="max-w-3xl">
            <Link
              href="/blog"
              className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <span className="mb-4 inline-block w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              {post.category}
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {post.description}
            </p>
            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-gray-200 py-4 dark:border-gray-800">
              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </div>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            {/* Mobile TOC */}
            <div className="mt-6 lg:hidden">
              <TableOfContents headings={headings} />
            </div>

                   <div
            className="blog-content prose prose-gray mt-8 max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:bg-transparent prose-pre:p-0"
            dangerouslySetInnerHTML={{ __html: contentWithIds }}
          />

            <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-gray-800">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 dark:border-gray-800 dark:text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <PostNavigation previous={previous} next={next} />

            <RelatedPosts posts={relatedPosts} />
          </article>

          {/* Desktop Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
                     </div>
        </aside>
      </div>
      </div>
      <CodeCopyButtons />
    </>
  );
}
