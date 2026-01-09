import { NextResponse, NextRequest } from "next/server";
import { deleteUserById, getUserById } from "@/lib/prisma/user";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/')[4];
  const id = userId as string;
  try {
    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/')[4];
  const id = userId as string;
  try {
    await deleteUserById(id);

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};