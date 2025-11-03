import { NextResponse } from "next/server";

import { getClassCount } from "@db/class";

export const GET = async () => {
  try {
    const count = await getClassCount({});

    return NextResponse.json(
      { message: "Classes retrieved successfully", count },
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