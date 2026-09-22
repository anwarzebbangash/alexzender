"use client";

import { useRouter } from "next/navigation";
import Link from "next/link"; // <--- Imported Link component

export default function AdminDashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
      <p className="mt-2 text-gray-600">
        Login successful! Yahan se hum aage kaam karenge.
      </p>

      {/* Missing opening tag fixed here. Replaced <a> with Next.js <Link> */}
      <Link
        href="/admin/articles/new"
        className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        + Naya Article Likhein
      </Link>
    </div>
  );
}