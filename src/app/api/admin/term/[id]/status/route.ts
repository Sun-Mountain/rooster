import { NextResponse, NextRequest } from "next/server";
import { TermStatus } from "@client";
import { updateTermStatus } from "@/lib/prisma/term";

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const termId = url.pathname.split('/')[4];
    const id = termId as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const newStatus = body.status as TermStatus;

    if (!newStatus) {
      return NextResponse.json({ error: "New status is required" }, { status: 400 });
    }

    const updatedTerm = await updateTermStatus(id, newStatus);

    return NextResponse.json(updatedTerm, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}