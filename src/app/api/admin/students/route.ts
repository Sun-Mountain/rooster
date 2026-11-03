import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/prisma/user";

export async function GET() {
  try {
    const students = await getAllUsers();
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
};