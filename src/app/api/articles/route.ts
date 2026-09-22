import { NextResponse } from "next/server";
import { Article } from "@/models";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ success: false, error: "Login zaroori hai" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ success: false, error: "Ijazat nahi hai" }, { status: 403 });
    }

    const body = await request.json();
    const { title, slug, content, description, category, featured_image, tags, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, error: "Title, slug aur content zaroori hain" },
        { status: 400 }
      );
    }

    const article = await Article.create({
      title,
      slug,
      content,
      description: description || "",
      category: category || "other",
      featured_image: featured_image || "",
      tags: tags || [],
      user_id: decoded.id,
      published_at: published ? new Date() : null,
    });

    return NextResponse.json({ success: true, article });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}