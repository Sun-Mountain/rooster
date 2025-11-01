import { NextResponse } from "next/server";
import { getAllSessions } from "@db/session";

export const GET = async () => {
  try {
    const sessions = await getAllSessions();

    console.log("Returning sessions:", sessions);

    return NextResponse.json({ sessions });
  } catch (err) {
    console.log("Error fetching sessions:", err);
    return NextResponse.error();
  }
}
