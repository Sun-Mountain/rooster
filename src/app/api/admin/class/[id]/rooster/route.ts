import { NextResponse, NextRequest } from "next/server";
import { getSession } from '@/lib/get-session';
import { unauthorized } from 'next/navigation';
import { createRosterEntry, getRosterByClassId, deleteRosterEntriesByUserAndClass } from "@/lib/prisma/rosterItem";
import { getUserById } from "@/lib/prisma/user";

export async function GET(request: NextRequest) {
    const session = await getSession();
    const user = session?.user;

    if (!user) unauthorized();

    try {
        const { searchParams } = new URL(request.url);
        const classId = searchParams.get("classId");

        if (!classId) {
            return NextResponse.json(
                { error: "Class ID is required" },
                { status: 400 },
            );
        }

        const rosterEntries = await getRosterByClassId(classId);

        if (!rosterEntries || rosterEntries.length === 0) {
            return NextResponse.json(
                { error: "No roster entries found for this class" },
                { status: 404 },
            );
        }

        const rosterWithUserDetails = await Promise.all(
            rosterEntries.map(async (entry: { userId: string; }) => {
                const userDetails = await getUserById(entry.userId);
                return {
                    ...entry,
                    user: userDetails || null,
                };
            })
        );

        return NextResponse.json(rosterWithUserDetails, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    const session = await getSession();
    const user = session?.user;

    if (!user) unauthorized();

    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json(
                { error: "Class ID is required" },
                { status: 400 },
            );
        }
        const existingUser = await getUserById(user.id);
        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }
        await deleteRosterEntriesByUserAndClass(existingUser.id, id);
        return NextResponse.json({ message: `Successfully added user to class with ID: ${id}` });
    } catch (error) {
        return NextResponse.json(
            { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
            { status: 500 },
        );
    }
}

export async function DELETE(request: NextRequest) {
    const session = await getSession();
    const user = session?.user;

    if (!user) unauthorized();

    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json(
                { error: "Class ID is required" },
                { status: 404 },
            );
        }
        const existingUser = await getUserById(user.id);
        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }
        await deleteRosterEntriesByUserAndClass(existingUser.id, id);
        return NextResponse.json({ message: `Successfully removed user from class with ID: ${id}` });
    } catch (error) {
        return NextResponse.json(
            { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
            { status: 500 },
        );
    }
}