import { NextResponse, NextRequest } from "next/server";
import {getClassTermDetailById } from "@/lib/prisma/classTermDetail";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/')[4];
    const id = userId as string;

    // console.log("Fetching class detail with ID: ", id);

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const classDetailData = await getClassTermDetailById(id);

    if (!classDetailData) {
      return NextResponse.json({ error: "Class detail not found" }, { status: 404 });
    }

    return NextResponse.json(classDetailData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}