import { NextResponse, NextRequest } from "next/server";
import { getClassById, deleteClass, updateClass } from "@/lib/prisma/class";

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

    const classData = await getClassById(id);

    if (!classData) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    return NextResponse.json(classData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
};

export async function DELETE(
  request: NextRequest
) {
  try {
    const url = new URL(request.url);
    const classId = url.pathname.split('/')[4];
    const id = classId as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedClass = await deleteClass(id);

    return NextResponse.json(deletedClass, { status: 200 });
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
    const classId = url.pathname.split('/')[4];
    const id = classId as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const updatedClass = await updateClass(id, body);

    return NextResponse.json(updatedClass, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}