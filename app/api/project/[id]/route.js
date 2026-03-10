import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/Models/Project';
import { requireAdmin } from '@/lib/auth';

export async function GET(req, { params }) {
  const { id } = await params;
  await dbConnect();
  const project = await Project.findById(id);
  if (!project) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  if (!requireAdmin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const body = await req.json();
  const project = await Project.findByIdAndUpdate(id, body, { new: true });
  if (!project) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  if (!requireAdmin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted' });
}
