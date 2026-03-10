import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subscriber from '@/Models/Subscriber';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const subscribers = await Subscriber.find().sort({ createdAt: -1 });
  return NextResponse.json(subscribers);
}

export async function POST(req) {
  await dbConnect();
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }
    await Subscriber.create({ email });
    return NextResponse.json({ message: 'Subscribed' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 });
  }
}

