import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/Models/Product';
import ProductCategory from '@/Models/ProductCategory';
import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(req, { params }) {
  const { id } = await params;
  await dbConnect();
  const product = await Product.findById(id).populate('category');
  if (!product) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  if (!requireAdmin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const body = await req.json();
  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  if (!product) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  revalidatePath(`/product/${product.slug}`);
  revalidatePath('/products');
  if (product.category) {
    const cat = await ProductCategory.findById(product.category);
    if (cat?.slug) {
      revalidatePath(`/category/${cat.slug}`);
    }
  }
  return NextResponse.json(product);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  if (!requireAdmin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted' });
}
