"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-12 text-center sm:px-12">
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
          <Mail className="h-6 w-6 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Stay Updated
        </h2>
        <p className="mt-2 text-blue-100">
          Get the latest tutorials on AI, web development, and software
          delivered straight to your inbox.
        </p>

        {submitted ? (
          <p className="mt-6 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white">
            Thanks for subscribing! 🎉
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg border-0 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
