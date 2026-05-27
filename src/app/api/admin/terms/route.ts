import { NextResponse, NextRequest } from "next/server";
import { getAllTerms, createTerm, updateTermById } from "@/lib/prisma/term";

export async function GET() {
  try {
    const terms = await getAllTerms();
    return NextResponse.json(terms, { status: 200 });
  } catch (error) {
    console.error("Error fetching terms:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}