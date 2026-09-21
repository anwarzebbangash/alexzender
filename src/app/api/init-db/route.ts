import { NextResponse } from "next/server";
import sequelize from "@/lib/database";
import "@/models";

export async function GET() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    return NextResponse.json({
      success: true,
      message: "Tables created/updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}