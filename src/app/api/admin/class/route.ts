import { NextResponse, NextRequest } from "next/server";
import { createClass } from "@db/class";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const createdClass = await createClass(data);

    return NextResponse.json({ message: "Class created successfully", class: createdClass }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create class." }, { status: 500 });
  }
};