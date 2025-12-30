import { NextResponse, NextRequest } from "next/server";
import {
  createContactInfo,
  getContactInfoByUserId,
  updateContactInfo
} from "@/lib/lib/contactInfo";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/')[3];

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const contactInfo = await getContactInfoByUserId(userId);

    if (!contactInfo) {
      return NextResponse.json({ error: { msg: 'Contact info not found', status: 404 } });
    }

    return NextResponse.json(contactInfo, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/')[3];
  const body = await request.json();

  console.log({ body });

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const newContactInfo = await createContactInfo({userId, ...body});
    return NextResponse.json(newContactInfo, { status: 201 });
  } catch (error) {
    console.error('Error creating contact info:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/')[3];
  const body = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const updatedContactInfo = await updateContactInfo(userId, body);
    return NextResponse.json(updatedContactInfo, { status: 200 });
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}