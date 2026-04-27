import { NextResponse, NextRequest } from "next/server";
import { getTermById, updateTermById, deleteTerm } from "@/lib/prisma/term";

export async function GET(
  request: NextRequest
) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/')[4];
    const id = userId as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const term = await getTermById(id);

    if (!term) {
      return NextResponse.json({ error: "Term not found" }, { status: 404 });
    }

    return NextResponse.json(term, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest
) {
  try {
    const url = new URL(request.url);
    const termId = url.pathname.split('/')[4];
    const id = termId as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { name, description, startDate, endDate } = body;

    if (!name || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required field(s)" },
                               { status: 400 });
    }

    const updatedTerm = await updateTermById(id, {
      name,
      description, 
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });

    return NextResponse.json(updatedTerm, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    const url = new URL(request.url);
    const termId = url.pathname.split('/')[4];
    console.log("Deleting term with ID:", termId);
    const id = termId as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await deleteTerm(id);

    return NextResponse.json({ message: "Term deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}