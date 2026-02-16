import { NextResponse, NextRequest } from "next/server";
import { createClass } from "@/lib/prisma/class";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, classTermDetails, sessionId, daysTimes } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 },
      );
    }

    const newClass = await createClass({
      name,
      description,
      sessionId,
      classDetails: classTermDetails,
      daysTimes,
    });
    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}