import { NextResponse } from "next/server";
import { User } from "@/models";
import { generateToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email aur password zaroori hain" },
        { status: 400 }
      );
    }

    const user: any = await User.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Ghalat email ya password" },
        { status: 401 }
      );
    }

    const isValid = await user.verifyPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Ghalat email ya password" },
        { status: 401 }
      );
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, email: user.email, role: user.role },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 din
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}