import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ProductCategory from '@/Models/ProductCategory';
import { requireAdmin } from '@/lib/auth';

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');
  const filter = slug ? { slug } : {};
  const categories = await ProductCategory.find(filter).sort({ createdAt: -1 });
  if (slug) {
    return NextResponse.json(categories[0] || null);
  }
  return NextResponse.json(categories);
}

export async function POST(req) {
  if (!requireAdmin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const body = await req.json();
  try {
    const category = await ProductCategory.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Error creating category', error: err.message }, { status: 500 });
  }
}
