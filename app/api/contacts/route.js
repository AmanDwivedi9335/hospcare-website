import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ContactForm from '@/Models/ContactForm';
import { requireAdmin } from '@/lib/auth';
import nodemailer from 'nodemailer';

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const contacts = await ContactForm.find().sort({ createdAt: -1 });
  return NextResponse.json(contacts);
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const contact = await ContactForm.create(body);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: 'New Contact Form Submission',
      text: `Name: ${contact.firstName} ${contact.lastName || ''}\nEmail: ${contact.email}\nPhone: ${contact.phone || ''}\nMessage: ${contact.message || ''}`,
    });

    return NextResponse.json({ message: 'Form submitted' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 });
  }
}
