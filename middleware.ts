import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};