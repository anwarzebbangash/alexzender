import { NextResponse } from "next/server";
import { Article } from "@/models";
import { verifyToken } from "@/lib/auth";

function getToken(request: Request) {
  return request.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const article = await Article.findByPk(id);

    if (!article) {
      return NextResponse.json({ success: false, error: "Article nahi mila" }, { status: 404 });
    }

    return NextResponse.json({ success: true, article });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = getToken(request);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ success: false, error: "Ijazat nahi hai" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, slug, content, description, category, featured_image, published } = body;

    const article = await Article.findByPk(id);
    if (!article) {
      return NextResponse.json({ success: false, error: "Article nahi mila" }, { status: 404 });
    }

    await article.update({
      title,
      slug,
      content,
      description,
      category,
      featured_image,
      published_at: published ? (article.get("published_at") || new Date()) : null,
    });

    return NextResponse.json({ success: true, article });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = getToken(request);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ success: false, error: "Ijazat nahi hai" }, { status: 403 });
    }

    const { id } = await params;
    await Article.destroy({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}