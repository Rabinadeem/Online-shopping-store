import { NextRequest, NextResponse } from 'next/server';
import Order from '../../../../models/Order';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const order = await Order.findById(params.id).populate('user').populate('items.product');
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();
  // TODO: Add admin authentication check here
  const order = await Order.findByIdAndUpdate(params.id, body, { new: true });
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(order);
}
