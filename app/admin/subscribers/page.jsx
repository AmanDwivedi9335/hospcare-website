import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import SubscriberTable from '@/components/Admin/Subscribers/SubscriberTable.jsx';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function SubscribersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) redirect('/admin/login');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') redirect('/admin/login');
  } catch (err) {
    redirect('/admin/login');
  }

  return <SubscriberTable />;
}

