import { NextResponse, NextRequest } from "next/server";
import { getClassGroupByIds } from "@/lib/prisma/class";
import { ClassProps } from "@/lib/props";

export async function POST (request: NextRequest) {
  try {
    const body = await request.json();
    const { classIds } = body;

    if (!classIds || !Array.isArray(classIds) || classIds.length === 0) {
      return NextResponse.json({ error: "classIds must be a non-empty array" }, { status: 400 });
    }

    const classes = await getClassGroupByIds(classIds);

    const classProps: ClassProps[] = classes.map(cls => ({
      classId: cls.id,
      name: cls.name,
      description: cls.description || undefined,
      classDetails: cls.classDetails.map(detail => ({
        id: detail.id,
        classId: detail.classId,
        termId: detail.termId,
        price: detail.price,
        capacity: detail.capacity,
        details: detail.details || undefined,
      })),
    }));

    return NextResponse.json(classProps, { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
   }
};