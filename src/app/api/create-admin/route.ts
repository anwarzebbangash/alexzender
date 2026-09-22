import { NextResponse } from "next/server";
import { User } from "@/models";

export async function GET() {
  try {
    const existingAdmin = await User.findOne({ where: { email: "admin@alextech.com" } });

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: "Admin already exists. Delete this route now for security.",
      });
    }

    const admin = await User.create({
      email: "admin@alextech.com",
      password_hash: "ChangeThisPassword123",
      role: "admin",
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully. DELETE THIS ROUTE NOW.",
      email: admin.email,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}