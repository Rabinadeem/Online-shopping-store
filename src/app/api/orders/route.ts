import { NextRequest, NextResponse } from 'next/server';
import Order from '../../../models/Order';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  // TODO: Add admin authentication check here
  const orders = await Order.find({}).populate('user').populate('items.product');
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  // TODO: Add user authentication check here
  const order = await Order.create(body);
  return NextResponse.json(order);
}
