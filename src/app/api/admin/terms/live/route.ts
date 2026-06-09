import { NextResponse } from "next/server";
import { getLiveTerms } from "@/lib/prisma/term";

export async function GET() {
  try {
    const terms = await getLiveTerms();
    return NextResponse.json(terms, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `${error}` },
      { status: 500 },
    );
  }
}