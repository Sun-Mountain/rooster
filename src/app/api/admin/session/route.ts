import { NextResponse, NextRequest } from "next/server";
import { createSession, deleteSession } from "@db/session";

export const POST = async (req: NextRequest) => {
  try {

    const { title, description, startDate, endDate } = await req.json();

    if (!title || !startDate || !endDate) {
      return NextResponse.json(
        { message: "Session is invalid." },
        { status: 400 }
      );
    }
    
    await createSession({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });


    return NextResponse.json(
      { message: "Session is valid." },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID is required." },
        { status: 400 }
      );
    }

    await deleteSession(sessionId);

    return NextResponse.json(
      { message: "Session deleted successfully." },
      { status: 200 }
    );

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
};