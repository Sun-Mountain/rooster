import { NextResponse, NextRequest } from "next/server";
import { deleteSession } from "@db/session";

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