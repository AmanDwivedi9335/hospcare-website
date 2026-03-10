import dbConnect from '@/lib/db';
import User from '@/Models/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { name,email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
      email,
      password: hashedPassword,
      role: 'admin', 
    });

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name:newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 });
  }
}
