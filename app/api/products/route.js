import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/Models/Product';
import ProductCategory from '@/Models/ProductCategory';
import { requireAdmin } from '@/lib/auth';

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const category = url.searchParams.get('category');
  const slug = url.searchParams.get('slug');
  const filter = {};
  if (category) filter.category = category;
  if (slug) filter.slug = slug;
  const products = await Product.find(filter).populate('category').sort({ createdAt: -1 });
  if (slug) {
    return NextResponse.json(products[0] || null);
  }
  return NextResponse.json(products);
}

export async function POST(req) {
  if (!requireAdmin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const body = await req.json();
  try {
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Error creating product', error: err.message }, { status: 500 });
  }
}
