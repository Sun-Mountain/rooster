import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { createUser, getUserByEmail } from "@db/user";

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName} = await request.json();

    const existingUser = await getUserByEmail(email);

    if (!!existingUser) {
      return NextResponse.json(
        { error: "It seems like a user with this email already exists." },
        { status: 400 });
    }

    const hashedPassword = await hash(password, 15);

    const user = await createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    if (!user) {
      return NextResponse.json({
        error: "There was an error creating the user. It's probably a server issue. Please try again later."
      }, { status: 500 });
    }

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      error: "There was an error creating the user. It's probably a server issue. Please try again later."
    }, { status: 500 });
  }
}