import { NextResponse, NextRequest } from "next/server";
import { deleteSession, updateSession } from "@db/session";

export const DELETE = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const sessionId = url.pathname.split("/").pop();

    console.log("Deleting session with ID:", sessionId);

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

export const PUT = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const sessionId = url.pathname.split("/").pop();

    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID is required." },
        { status: 400 }
      );
    }

    const { title, description, startDate, endDate } = await req.json();

    if (!title || !startDate || !endDate) {
      return NextResponse.json(
        { message: "Session is invalid." },
        { status: 400 }
      );
    }

    await updateSession(sessionId, {
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    return NextResponse.json(
      { message: "Session updated successfully." },
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