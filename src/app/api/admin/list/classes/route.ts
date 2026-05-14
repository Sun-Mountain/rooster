import { NextResponse } from 'next/server'
import { getClassNamesAndIds } from '@/lib/prisma/class'

export async function GET() {
  try {
    const classes = await getClassNamesAndIds();
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}