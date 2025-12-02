import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { createClass, deleteClass } from "@db/class";


export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user || session.user.role === "USER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, workshop, description, session, daysTimes } = body.classData;

    if (!title || !session || !daysTimes) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });  
    }

    if (workshop) {
      if (daysTimes.length !== 1 || !daysTimes[0].date || !daysTimes[0].startTime || !daysTimes[0].endTime) {
        return NextResponse.json({ error: "Invalid dayTimes for workshop" }, { status: 400 });
      }
    } else {
      for (const dt of daysTimes) {
        if (!dt.weekday || !dt.startTime || !dt.endTime) {
          return NextResponse.json({ error: "Invalid dayTimes for class sessions" }, { status: 400 });
        }
      }
    }

    await createClass({
      title,
      details: {
        description,
        workshop,
        Session: session,
        location: "", // Add required location field
        class: {}, // Add required class field
        daysTimes: daysTimes,
      },
    });

    return NextResponse.json(
      {
        message: "Class created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export async function DELETE (request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user || session.user.role === "USER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get("id");

    if (!classId) {
      return NextResponse.json({ error: "Missing class ID" }, { status: 400 });
    }

    await deleteClass(classId);

    return NextResponse.json({ message: "Class deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting class:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}