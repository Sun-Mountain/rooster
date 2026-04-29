import { NextResponse, NextRequest } from "next/server";
import { getAllClasses } from "@/lib/prisma/class";

export async function GET() {
  try {
    const classes = await getAllClasses();
    console.log({ classes })
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}