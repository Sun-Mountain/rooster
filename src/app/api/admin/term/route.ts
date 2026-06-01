import { NextResponse, NextRequest } from "next/server";
import { getTermById, createTerm, deleteTerm, updateTermById } from "@/lib/prisma/term";

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, startDate, endDate } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!startDate) {
      return NextResponse.json(
        { error: "Start date is required" },
        { status: 400 },
      );
    }

    if (!endDate) {
      return NextResponse.json(
        { error: "End date is required" },
        { status: 400 },
      );
    }

    const newTerm = await createTerm({
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      // live, TODO: consider whether to set live to true by default or require it in the request body
    });
    return NextResponse.json(newTerm, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, startDate, endDate } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!startDate) {
      return NextResponse.json(
        { error: "Start date is required" },
        { status: 400 },
      );
    }

    if (!endDate) {
      return NextResponse.json(
        { error: "End date is required" },
        { status: 400 },
      );
    }

    const updatedTerm = await updateTermById(id, {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      // live,
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

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
