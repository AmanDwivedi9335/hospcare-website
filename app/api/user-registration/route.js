import { NextResponse } from 'next/server';
import { appendRegistration, findDuplicateRegistration } from '@/lib/googleSheets';

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, mobile, gender, state } = body;

    if (!firstName || !lastName || !email || !mobile || !gender || !state) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const duplicate = await findDuplicateRegistration(email, mobile);
    if (duplicate) {
      const message = duplicate.type === 'email'
        ? 'Email already exists.'
        : 'Mobile number already exists.';
      return NextResponse.json({ message }, { status: 409 });
    }

    const registrationId = crypto.randomUUID();
    await appendRegistration({
      registrationId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      gender: gender.trim(),
      state: state.trim(),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      message: 'Registration saved successfully.',
      registrationId,
      paymentStatus: 'unpaid',
      redirectUrl: `/payment?registrationId=${registrationId}`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to register user.', error: error.message },
      { status: 500 }
    );
  }
}
