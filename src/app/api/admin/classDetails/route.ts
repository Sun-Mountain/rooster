import { NextResponse, NextRequest } from "next/server";
import { createClassTermDetail, deleteClassTermDetail, getClassTermDetailsBySession } from "@/lib/prisma/classTermDetail";

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
    const { ...body } = await request.json();

    const newPrice = parseFloat(body.price);
    
    const newCapacity = parseInt(body.capacity, 10);

    if (isNaN(newPrice) || isNaN(newCapacity)) {
      return NextResponse.json(
        { error: "Invalid price or capacity value" },
        { status: 400 },
      );
    }

    const classTermDetailData = {
      ...body,
      price: newPrice,
      capacity: newCapacity
    };

    const newClassTermDetail = await createClassTermDetail(classTermDetailData);
    return NextResponse.json(newClassTermDetail, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id query parameter is required" },
        { status: 400 },
      );
    }

    const deletedClassTermDetail = await deleteClassTermDetail(id);
    return NextResponse.json(deletedClassTermDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}