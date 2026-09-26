import { NextResponse } from "next/server";
import { User } from "@/models";

export async function GET() {
  try {
    const admin: any = await User.findOne({ where: { email: "admin@alextech.com" } });

    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin nahi mila" });
    }

    admin.password_hash = "NayaPassword123";
    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password reset ho gaya. DELETE THIS ROUTE NOW.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}