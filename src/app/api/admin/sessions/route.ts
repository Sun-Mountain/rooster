import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getAllSessions } from '@db/session';

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user || session.user.role === 'USER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sessions = await getAllSessions();

    console.log('Fetched sessions:', sessions);

    if (!sessions) {
      throw new Error('Failed to fetch sessions');
    }

    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};