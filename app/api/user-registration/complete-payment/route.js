import { NextResponse } from 'next/server';
import { completePaymentAndGenerateMid } from '@/lib/googleSheets';

export async function POST(req) {
  try {
    const body = await req.json();
    const { registrationId, transactionId } = body;

    if (!registrationId) {
      return NextResponse.json({ message: 'registrationId is required.' }, { status: 400 });
    }

    const result = await completePaymentAndGenerateMid({ registrationId, transactionId });

    return NextResponse.json({
      message: 'Payment marked as paid.',
      registrationId,
      paymentStatus: result.paymentStatus,
      mid: result.mid,
    });
  } catch (error) {
    const status = error.message === 'Registration ID not found' ? 404 : 500;
    return NextResponse.json(
      { message: 'Unable to complete payment.', error: error.message },
      { status }
    );
  }
}
