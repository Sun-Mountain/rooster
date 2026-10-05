import { NextResponse } from "next/server";
import { getSession } from "@/lib/get-session";
import { getRosterEntriesByUserId } from "@/lib/prisma/rosterItem";


// Get the list of classes the signed in user is signed up for. 
export async function GET() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rosterEntries = await getRosterEntriesByUserId(user.id);

  return NextResponse.json({ rosterEntries: rosterEntries }, { status: 200 });
}