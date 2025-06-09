import { NextRequest, NextResponse } from 'next/server';
import Product from '../../../models/Product';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET() {
  await connectToDatabase();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  // TODO: Add admin authentication check here
  const product = await Product.create(body);
  return NextResponse.json(product);
}
