"use client";

import { useRouter } from "next/navigation";

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
      <p className="mt-2 text-gray-600">Login successful! Yahan se hum aage kaam karenge.</p>
    </div>
  );
}