import dbConnect from '@/lib/db';
import User from '@/Models/User';
import Dealer from '@/Models/Dealer';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// In-memory store for OTPs and pending users
const pendingUsers = new Map();

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const {
    firstName,
    lastName,
    mobile,
    firmName,
    gstin,
    email,
    password,
    otp,
  } = body;

  // Step 2: verify OTP and create user
  if (otp) {
    const pending = pendingUsers.get(email);
    if (!pending || pending.otp !== otp || pending.expires < Date.now()) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      pendingUsers.delete(email);
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    try {
      const hashedPassword = await bcrypt.hash(pending.password, 10);
      const newUser = await User.create({
        name: `${pending.firstName} ${pending.lastName}`,
        firstName: pending.firstName,
        lastName: pending.lastName,
        mobile: pending.mobile,
        firmName: pending.firmName,
        gstin: pending.gstin,
        email: pending.email,
        password: hashedPassword,
        role: 'dealer',
      });

      await Dealer.create({
        user: newUser._id,
        firstName: pending.firstName,
        lastName: pending.lastName,
        mobile: pending.mobile,
        firmName: pending.firmName,
        gstin: pending.gstin,
      });
      pendingUsers.delete(email);
      return NextResponse.json({ message: 'User registered successfully' });
    } catch (err) {
      return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 });
    }
  }

  // Step 1: collect data and send OTP
  if (!firstName || !lastName || !mobile || !firmName || !gstin || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    pendingUsers.set(email, {
      firstName,
      lastName,
      mobile,
      firmName,
      gstin,
      email,
      password,
      otp: otpCode,
      expires: Date.now() + 10 * 60 * 1000,
    });

    let transporter;
    if (
      (process.env.SMTP_HOST || process.env.SMTP_SERVICE) &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      const transportConfig = {

        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };

      if (process.env.SMTP_HOST) {
        transportConfig.host = process.env.SMTP_HOST;
        transportConfig.port = process.env.SMTP_PORT
          ? parseInt(process.env.SMTP_PORT)
          : 587;
        transportConfig.secure = transportConfig.port === 465;
      } else if (process.env.SMTP_SERVICE) {
        transportConfig.service = process.env.SMTP_SERVICE;
        // Nodemailer sets the correct port/secure for well-known services
      }

      transporter = nodemailer.createTransport(transportConfig);
    } else {
      return NextResponse.json(
        { message: 'Email service not configured' },
        { status: 500 }
      );
    }

    await transporter.sendMail({

      from:
        process.env.EMAIL_FROM ||
        process.env.SMTP_USER ||
        'no-reply@example.com',
      to: email,
      subject: 'Your verification code',
      text: `Your OTP is ${otpCode}`,
    });

    if (transporter.options.jsonTransport) {
      console.log('OTP email content:', info.message);
    }

    return NextResponse.json({ message: 'OTP sent to email' });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 });
  }
}
