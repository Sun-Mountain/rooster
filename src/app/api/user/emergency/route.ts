import { NextResponse, NextRequest } from "next/server";
import { getEmergencyContactByUserId } from "@/lib/prisma/emergencyContact";

export async function GET(
  request: NextRequest
) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const contactInfo = await getEmergencyContactByUserId(userId);
    console.log(contactInfo);
    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}