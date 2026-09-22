import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Login page ko khud protect nahi karna — warna koi login hi nahi kar payega
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const decoded = verifyToken(token);

  if (!decoded || decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};