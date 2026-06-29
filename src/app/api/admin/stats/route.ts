import { NextResponse } from 'next/server';
import { getStats } from '@/lib/prisma/stats';

export async function GET() {
  try {
    const stats = await getStats();

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}` },
      { status: 500 },
    );
  }
}