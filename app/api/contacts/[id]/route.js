import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ContactForm from '@/Models/ContactForm';
import { requireAdmin } from '@/lib/auth';

export async function GET(req, { params }) {
  if (!requireAdmin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  await dbConnect();
  const contact = await ContactForm.findById(id);
  if (!contact) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(contact);
}

export async function DELETE(req, { params }) {
  if (!requireAdmin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  await dbConnect();
  await ContactForm.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted' });
}
