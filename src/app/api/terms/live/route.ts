import { NextResponse } from "next/server";
import { getLiveTerms } from "@/lib/prisma/term";

export const GET = async () => {
  try {
    const liveTerms = await getLiveTerms();
    return NextResponse.json(liveTerms);
  } catch (err) {
    return NextResponse.error();
  }
};
