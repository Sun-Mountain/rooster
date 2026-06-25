import { NextResponse, NextRequest } from "next/server";
import {
  createClassTermDetail,
  deleteClassTermDetail,
  getClassTermDetailById,
  updateClassTermDetail } from "@/lib/prisma/classTermDetail";
import { ClassInstanceProps } from "@/lib/props";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

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

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const classInstanceId = searchParams.get("id");

    if (!classInstanceId) {
      return NextResponse.json(
        { error: "id query parameter is required" },
        { status: 400 },
      );
    }
    const { ...body } = await request.json();

    const { price, capacity , classInstances } = body;

    const updatedPrice = parseFloat(price);
    
    const updatedCapacity = parseInt(capacity, 10);

    if (isNaN(updatedPrice) || isNaN(updatedCapacity)) {
      return NextResponse.json(
        { error: "Invalid price or capacity value" },
        { status: 400 },
      );
    }

    const updatedClassTermDetailData = {
      ...body,
      id: classInstanceId,
      price: updatedPrice,
      capacity: updatedCapacity,
      classInstances: classInstances.map((instance: ClassInstanceProps) => ({
        dayOfTheWeek: instance.dayOfTheWeek,
        startTime: instance.startTime,
        endTime: instance.endTime,
      }))
    };

    const updatedClassTermDetail = await updateClassTermDetail(classInstanceId, updatedClassTermDetailData);
    return NextResponse.json(updatedClassTermDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}