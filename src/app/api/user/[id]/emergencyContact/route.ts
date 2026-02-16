import { NextRequest, NextResponse } from 'next/server';
import {
  createEmergencyContact,
  getEmergencyContactByUserId,
  updateEmergencyContact
} from '@/lib/prisma/emergencyContact';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/')[3];

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const emergencyContact = await getEmergencyContactByUserId(userId);

    if (!emergencyContact) {
      return NextResponse.json({ error: { msg: 'Emergency contact not found', status: 404 } });
    }

    return NextResponse.json(emergencyContact, { status: 200 });
  } catch (error) {
    console.error('Error fetching emergency contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/')[3];
  const body = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const newEmergencyContact = await createEmergencyContact({userId, ...body});
    return NextResponse.json(newEmergencyContact, { status: 201 });
  } catch (error) {
    console.error('Error creating emergency contact:', error);
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
    const updatedEmergencyContact = await updateEmergencyContact(userId, body);
    return NextResponse.json(updatedEmergencyContact, { status: 200 });
  } catch (error) {
    console.error('Error updating emergency contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}