import { NextResponse, NextRequest } from "next/server";
import { getAllTerms, createTerm, updateTerm } from "@/lib/prisma/term";

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

    const { name, description, startDate, endDate, live } = body;

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
      live,
    });
    return NextResponse.json(newTerm, { status: 201 });
  } catch (error) {
    console.error("Error creating term:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, startDate, endDate, live } = body;

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

    const updatedTerm = await updateTerm(id, {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      live,
    });
    return NextResponse.json(updatedTerm, { status: 200 });
  } catch (error) {
    console.error("Error updating term:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
