import { NextRequest, NextResponse } from 'next/server';
import Product from '../../../../models/Product';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const product = await Product.findById(params.id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();
  // TODO: Add admin authentication check here
  const product = await Product.findByIdAndUpdate(params.id, body, { new: true });
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  // TODO: Add admin authentication check here
  const product = await Product.findByIdAndDelete(params.id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}
