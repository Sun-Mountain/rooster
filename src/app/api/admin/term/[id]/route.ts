import { NextResponse, NextRequest } from "next/server";
import { deleteTerm, getTermById, updateTerm } from "@/lib/prisma/term";

export async function GET(
  request: NextRequest
) {
  try {
    const url = new URL(request.url);
    const termId = url.pathname.split('/')[4];
    const id = termId as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const term = await getTermById(id);

    if (!term) {
      return NextResponse.json({ error: "Term not found" }, { status: 404 });
    }

    return NextResponse.json(term, { status: 200 });
  } catch (error) {
    console.error("Error fetching term:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE( request: NextRequest ) {
  try {
    const url = new URL(request.url);
    const termId = url.pathname.split('/')[4];
    const id = termId as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await deleteTerm(id);
    return NextResponse.json({ message: "Term deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error processing delete request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export async function PUT( request: NextRequest ) {
  try {
    const url = new URL(request.url);
    const termId = url.pathname.split('/')[4];
    const id = termId as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await request.json();

    const updatedTerm = await updateTerm(id, {
      name: body.name,
      description: body.description,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      live: body.live,
    });

    return NextResponse.json(updatedTerm, { status: 200 });

  } catch (error) {
    console.error("Error updating term:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};