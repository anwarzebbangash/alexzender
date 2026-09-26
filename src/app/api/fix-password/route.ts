import { NextResponse } from "next/server";
import { User } from "@/models";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const admin: any = await User.findOne({ where: { email: "admin@alextech.com" } });

    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin nahi mila" });
    }

    const newPassword = "NayaPassword123";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.update(
      { password_hash: hashedPassword },
      { where: { email: "admin@alextech.com" } }
    );

    return NextResponse.json({
      success: true,
      message: "Password properly hash karke save ho gaya. DELETE THIS ROUTE NOW.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}