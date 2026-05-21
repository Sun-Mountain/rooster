import { NextResponse, NextRequest } from "next/server";
import { createClassTermDetail, getClassTermDetailsBySession } from "@/lib/prisma/classTermDetail";

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

export async function POST(request: NextRequest) {
  try {
    const { body } = await request.json();
    
    console.log("Received data for new ClassTermDetail:", body);

    // Implement create logic here, e.g.:
    // const newClassTermDetail = await createClassTermDetail({ name, description });
    // return NextResponse.json(newClassTermDetail, { status: 201 });

    return NextResponse.json(
      { error: "POST method not implemented yet" },
      { status: 501 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}