import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

import { getUserCount } from "@db/user";

export const GET = async () => {
  try {
    const count = await getUserCount({
      where: { OR: [
        { role: Role.USER },
        { role: Role.BETA },
        { role: Role.COACH },
        { role: Role.ADMIN },
        { role: Role.SUPER }
      ] }
    });

    return NextResponse.json(
      { message: "Users retrieved successfully", count },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}