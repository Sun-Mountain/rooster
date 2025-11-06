import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    console.log(data);
    // Here you would typically add logic to save the class data to your database
    // For example:
    // const createdClass = await prisma.class.create({ data });

    return NextResponse.json({ message: "Class created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create class." }, { status: 500 });
  }
};