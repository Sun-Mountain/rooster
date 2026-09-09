import { NextResponse, NextRequest } from "next/server";
import { getContactInfoByUserId, createContactInfo, updateContactInfo } from "@/lib/prisma/contactInfo";
import { getUserById } from "@/lib/prisma/user";

export async function GET(
  request: NextRequest
) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const contactInfo = await getContactInfoByUserId(userId);
    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

export async function POST (
  request: NextRequest,
) {
  try {
    const { userId, body } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const newContactInfo = await createContactInfo({ userId, ...body });
    return NextResponse.json(newContactInfo);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
) {
  try {
    const { userId, body } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const updatedContactInfo = await updateContactInfo(userId, body);
    return NextResponse.json(updatedContactInfo);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}