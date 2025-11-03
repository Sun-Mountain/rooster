import { NextResponse } from "next/server";

import { getSessionCount } from "@db/session";

export const GET = async () => {
  try {
    const count = await getSessionCount({});

    return NextResponse.json(
      { message: "Sessions retrieved successfully", count },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}