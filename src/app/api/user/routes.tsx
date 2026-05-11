import { NextResponse, NextRequest } from "next/server";
import {
  createUser,
  getUserById,
  updateUserById
} from "@/lib/prisma/user";

import { sendVerificationEmail } from "@/helpers/email/verification";

// Get a user's info based on the user id
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/').pop();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const userInfo = await getUserById(userId);

    if (!userInfo) {
      return NextResponse.json({ error: { msg: 'User not found', status: 404 } });
    }

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    console.error('Error fetching useruu info:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Create a new user and send a sign up verification email to the user based on the provided email addresss
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const body = await request.json();

  try {
    const newUser = await createUser({userId: body.userId, ...body});
	  sendVerificationEmail(newUser.email)
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Update the user info for the user with the provided user id
export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/').pop();
  const body = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const updatedUser = await updateUserById(userId, body);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user info:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}