import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser
} from "@db/user";

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

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") as string;
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "User retrieved successfully", user: userWithoutPassword },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const { userId, ...updateData } = await req.json();

    const updateUserData = { id: userId, ...updateData };

    await updateUser(updateUserData);

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
};
