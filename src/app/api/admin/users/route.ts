import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/prisma/user";

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
};