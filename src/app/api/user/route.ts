import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { createUser, getUser, updateUser } from "@db/user";

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName} = await request.json();

    const existingUser = await getUser({ email });

    if (!existingUser) {
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    const user = await getUser({ id });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    console.log({ user });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({
      error: "There was an error fetching the user. It's probably a server issue. Please try again later."
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    const { email, firstName, lastName, address, phoneNumber } = await request.json();

    const updatedUser = await updateUser(id, {
      email,
      firstName,
      lastName,
      address: address || undefined,
      phoneData: phoneNumber || undefined,
    });

    if (!updatedUser) {
      return NextResponse.json({
        error: "There was an error updating the user. It's probably a server issue. Please try again later."
      }, { status: 500 });
    }

    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({
      error: "There was an error updating the user. It's probably a server issue. Please try again later."
    }, { status: 500 });
  }
}