import { NextResponse } from "next/server";
import { getAllUsers } from "@db/user";

export async function GET() {
  try {
    const users = await getAllUsers();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      error: "There was an error fetching the users. It's probably a server issue. Please try again later."
    }, { status: 500 });
  }
}