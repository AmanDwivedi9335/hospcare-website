import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default function ProductsLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    redirect('/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'dealer') {
      redirect('/login');
    }
  } catch (err) {
    redirect('/login');
  }
  return <>{children}</>;
}
