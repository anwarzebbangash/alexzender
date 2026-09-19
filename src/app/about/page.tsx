import { Sparkles, Code2, Users, Target } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Practical Tutorials",
    description:
      "Every article focuses on real, actionable knowledge you can apply immediately.",
  },
  {
    icon: Code2,
    title: "Modern Tech Stack",
    description:
      "We cover the tools and frameworks developers actually use in production today.",
  },
  {
    icon: Users,
    title: "Beginner Friendly",
    description:
      "Complex topics explained clearly, without unnecessary jargon.",
  },
  {
    icon: Target,
    title: "Focused Content",
    description:
      "No fluff — just AI, web development, JavaScript, Next.js, Node.js and SaaS.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          About TechBlog
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Practical tutorials on AI tools, web development, JavaScript,
          Next.js, Node.js and SaaS — written for beginners and intermediate
          developers.
        </p>
      </div>

      <div className="mb-16 space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          TechBlog was created to help developers learn modern software
          development through clear, practical, and up-to-date tutorials.
          Whether you&apos;re just starting out or looking to sharpen your
          skills, our goal is to make complex topics approachable.
        </p>
        <p>
          We focus on the tools and technologies developers use every day —
          AI-powered development, full-stack JavaScript, backend
          architecture, and building real SaaS products.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {values.map((value) => (
          <div
            key={value.title}
            className="flex gap-4 rounded-xl border border-gray-200 p-6 dark:border-gray-800"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <value.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}