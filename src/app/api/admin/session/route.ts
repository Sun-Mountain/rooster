import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { createSession } from '@db/session';

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user || session.user.role === 'USER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log('Received session data:', body);
    const { title, description, startDate, endDate } = body;

    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const response = createSession({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    if (!response) {
      throw new Error('Failed to create session');
    }
    
    return NextResponse.json({ message: 'Session created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}