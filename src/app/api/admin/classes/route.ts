import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getAllClasses } from '@db/class';

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user || session.user.role === 'USER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const classes = await getAllClasses();

    if (!classes) {
      throw new Error('Failed to fetch classes');
    }

    return NextResponse.json({ classes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};