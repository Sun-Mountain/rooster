import { NextResponse, NextRequest } from "next/server";
import { getAllUsers } from "@/lib/prisma/user";

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};