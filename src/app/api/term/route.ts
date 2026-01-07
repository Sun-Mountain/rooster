import { NextResponse, NextRequest } from "next/server";
import { getAllTerms, createTerm } from "@/lib/prisma/term";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newTerm = await createTerm({ name, description });
    return NextResponse.json(newTerm, { status: 201 });
  } catch (error) {
    console.error("Error creating term:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
