import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, phone, message, productId, productName } = await req.json();

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
      to: 'sales@ladwas.com',
      subject: `Product Inquiry: ${productName}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProduct: ${productName}\nMessage: ${message}`,
    });

    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    console.error('Failed to send inquiry', err);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
