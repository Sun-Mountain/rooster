import { NextResponse, NextRequest } from "next/server";
import { getSession } from '@/lib/get-session';
import { unauthorized } from 'next/navigation';
import { createRosterEntry, deleteRosterEntriesByUserAndClass } from "@/lib/prisma/rosterItem";
import { getUserById } from "@/lib/prisma/user";
import { sendNotificationEmail } from "@/helpers/email/notification";

// Create a new roster entry for the signed in user for a class. Will create the roster entry and create a notification email. Request will include the class id to validate the sign up
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
        await createRosterEntry({ user: { connect: { id: existingUser.id } }, classTermRosterId: id });

        await sendNotificationEmail([existingUser.id], "Class Signup Confirmation", `You have successfully signed up for the class with ID: ${id}.`);
        return NextResponse.json({ message: `Successfully signed up for class with ID: ${id}` });
    } catch (error) {
        return NextResponse.json(
            { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
            { status: 500 },
        );
    }
}

// Remove the signed in user from the class roster. Request must include the RosterItem ID to delete the class sign up
// This will delete the roster entry for the user and class combination. The user must be signed in to perform this action.
export async function DELETE(request: NextRequest) {
    const session = await getSession();
    const user = session?.user;

    if (!user) unauthorized();

    try{
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
        await deleteRosterEntriesByUserAndClass(user.id, id);

        return NextResponse.json({ message: `Successfully removed from class with ID: ${id}` });
    } catch (error) {
        return NextResponse.json(
            { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
            { status: 500 },
        );
    }
}