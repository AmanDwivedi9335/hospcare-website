'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    firmName: '',
    gstin: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const { confirmPassword, ...data } = formData;
    try {
      const res = await fetch('/api/dealer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) {
        setError(responseData.message || 'Registration failed');
        return;
      }
      setOtpSent(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/dealer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const responseData = await res.json();
      if (!res.ok) {
        setError(responseData.message || 'Verification failed');
        return;
      }
      router.push('/products');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-bold text-[#097362]">Welcome to Ladwa</h2>
          <p className="text-gray-600">Register as a dealer to explore our products.</p>
        </div>
        <div className="border border-gray-200 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#097362]">
            {otpSent ? 'Enter OTP' : 'Dealer Registration'}
          </h2>
          {!otpSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#097362]">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#097362]">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-[#097362]">Mobile Number</Label>
                <Input id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firmName" className="text-[#097362]">Firm Name</Label>
                <Input id="firmName" name="firmName" value={formData.firmName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstin" className="text-[#097362]">GSTIN</Label>
                <Input id="gstin" name="gstin" value={formData.gstin} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#097362]">Email</Label>
                <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#097362]">Password</Label>
                <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#097362]">Confirm Password</Label>
                <Input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full rounded-full bg-gradient-to-b from-[#097362] to-[#0FA78E] cursor-pointer">Send OTP</Button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-[#097362]">OTP</Label>
                <Input id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full rounded-full bg-gradient-to-b from-[#097362] to-[#0FA78E] cursor-pointer">Verify OTP</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

