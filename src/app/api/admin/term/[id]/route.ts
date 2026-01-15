import { NextResponse, NextRequest } from "next/server";
import { deleteTerm, getTermById } from "@/lib/prisma/term";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

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
    const userId = url.pathname.split('/')[4];
    const id = userId as string;

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