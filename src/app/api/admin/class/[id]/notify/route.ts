import { NextResponse, NextRequest } from "next/server";
import { getClassById } from "@/lib/prisma/class";
import { sendNotificationEmail } from "@/helpers/email/notification";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const classId = url.pathname.split('/')[4];
    const id = classId as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { subject, message } = await request.json();
    
    if (!subject || !message) {
      return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
    }

    const classInfo = getClassById(id);

    if (!classInfo) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }
    const userIds = classInfo.students.map(student => student.userId);
    sendNotificationEmail(userIds, subject, message);

  } catch (error) {
    return NextResponse.json({ error: "Failed to process notification" }, { status: 500 });
  }
}