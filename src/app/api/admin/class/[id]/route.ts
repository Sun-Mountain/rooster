import { NextResponse, NextRequest } from "next/server";

import { deleteClass } from "@db/class";


export const DELETE = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const classId = url.pathname.split("/").pop();

    if (!classId) {
      return NextResponse.json(
        { message: "Class ID is required." },
        { status: 400 }
      );
    }

    await deleteClass(classId);

    return NextResponse.json(
      { message: "Class deleted successfully." },
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