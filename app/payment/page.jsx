'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const registrationId = useMemo(() => searchParams.get('registrationId') || '', [searchParams]);
  const [message, setMessage] = useState('');
  const [mid, setMid] = useState('');
  const [loading, setLoading] = useState(false);

  const paymentGatewayUrl = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL || '';

  const proceedToGateway = () => {
    if (!paymentGatewayUrl) {
      setMessage('Payment gateway URL is not configured.');
      return;
    }

    window.location.href = `${paymentGatewayUrl}?registrationId=${encodeURIComponent(registrationId)}`;
  };

  const completePayment = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/user-registration/complete-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || data.message || 'Payment update failed');
        return;
      }

      setMid(data.mid);
      setMessage('Payment successful. MID generated.');
    } catch (err) {
      setMessage('Something went wrong while updating payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-[#097362]">Payment Details</h1>
      <p className="mb-8 text-gray-600">Registration ID: {registrationId || 'Unavailable'}</p>

      <div className="space-y-4 rounded-xl border p-6 shadow-sm">
        <p className="text-sm text-gray-700">
          Your registration is saved with payment status <strong>unpaid</strong>. Proceed to the payment gateway to complete your transaction.
        </p>

        <Button onClick={proceedToGateway} className="w-full bg-[#097362] hover:bg-[#076455]">
          Proceed to Payment Gateway
        </Button>

        <Button variant="outline" onClick={completePayment} disabled={!registrationId || loading} className="w-full">
          {loading ? 'Updating Payment...' : 'I Have Completed Payment'}
        </Button>

        {message && <p className="text-sm text-[#097362]">{message}</p>}
        {mid && <p className="text-sm font-semibold text-gray-900">Generated MID: {mid}</p>}
      </div>
    </div>
  );
}
