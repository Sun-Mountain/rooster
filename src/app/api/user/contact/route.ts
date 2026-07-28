import { NextResponse, NextRequest } from "next/server";
import { getContactInfoByUserId } from "@/lib/prisma/contactInfo";

export async function GET(
  request: NextRequest
) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const contactInfo = await getContactInfoByUserId(userId);
    console.log(contactInfo);
    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}