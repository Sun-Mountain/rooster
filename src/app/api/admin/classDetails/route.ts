import { NextResponse, NextRequest } from "next/server";
import { getClassTermDetailsBySession } from "@/lib/prisma/classTermDetail";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const termId = searchParams.get("termId");

    if (!termId) {
      return NextResponse.json(
        { error: "termId query parameter is required" },
        { status: 400 },
      );
    }

    const classTermDetails = await getClassTermDetailsBySession(termId);
    return NextResponse.json(classTermDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}