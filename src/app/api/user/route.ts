import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import { createUser, getUserByEmail } from "@db/user";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    const existingUser = await getUserByEmail(email);

    if (!!existingUser) {
      return NextResponse.json({
        message: "This email is already registered.",
        status: 409
      })
    }

    const hashedPassword = await hash(password, 15);

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  }
  catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
};