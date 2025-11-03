import { NextResponse } from "next/server";

import { getCurrentSession } from "@db/session";

export const GET = async () => {
  try {
    const session = await getCurrentSession();

    if (!session) {
      return NextResponse.json(
        { message: "No current session found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { session },
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