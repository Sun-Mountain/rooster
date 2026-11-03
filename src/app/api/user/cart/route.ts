import { NextResponse, NextRequest } from "next/server";

import { createCart, getCartItemsByUserId } from "@/lib/prisma/cart";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    // Fetch the cart items for the user from your database or service
    const cartItems = await getCartItemsByUserId(userId); // Implement this function

    if (!cartItems) {
      return NextResponse.json({ error: "Cart not found for the user" }, { status: 404 });
    }

    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    if (!userId ) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    
    createCart({ userId });

    return NextResponse.json({ message: "Cart created successfully" });
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, body } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}