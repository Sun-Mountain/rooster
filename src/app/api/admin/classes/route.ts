import { NextResponse } from "next/server";
import { getAllClasses } from "@db/class";

export const GET = async () => {
  try {
    const classes = await getAllClasses();

    return NextResponse.json({ classes });
  } catch (err) {
    console.log("Error fetching classes:", err);
    return NextResponse.error();
  }
};
