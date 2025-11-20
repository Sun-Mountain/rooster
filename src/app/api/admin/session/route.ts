import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { createSession, deleteSession, getSessionById, updateSession } from '@db/session';

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

export async function DELETE (request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user || session.user.role === 'USER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    await deleteSession(sessionId);
    
    return NextResponse.json({ message: 'Session deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user || session.user.role === 'USER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    const sessionData = await getSessionById(sessionId);

    if (!sessionData) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({ session: sessionData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export async function PUT(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user || session.user.role === 'USER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, startDate, endDate } = body;
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedSession = await updateSession(sessionId, {
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    if (!updatedSession) {
      throw new Error('Failed to update session');
    }
    
    return NextResponse.json({ message: 'Session updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}