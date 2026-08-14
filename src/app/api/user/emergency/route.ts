import { NextResponse, NextRequest } from "next/server";
import { createEmergencyContact, getEmergencyContactByUserId } from "@/lib/prisma/emergencyContact";

export async function GET(
  request: NextRequest
) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const contactInfo = await getEmergencyContactByUserId(userId);
    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const { userId, body } = await request.json();
    if (!userId || !body) {
      return NextResponse.json({ error: "User ID and body are required" }, { status: 400 });
    }
    const newContactInfo = await createEmergencyContact({userId, ...body});
    return NextResponse.json(newContactInfo);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}