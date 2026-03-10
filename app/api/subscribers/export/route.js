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
  const csv = 'Email,Date\n' + subscribers.map(s => `${s.email},${s.createdAt.toISOString()}`).join('\n');
  const res = new NextResponse(csv);
  res.headers.set('Content-Type', 'text/csv');
  res.headers.set('Content-Disposition', 'attachment; filename="subscribers.csv"');
  return res;
}

