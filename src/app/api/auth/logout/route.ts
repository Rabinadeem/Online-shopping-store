import { NextResponse } from 'next/server';

export async function POST() {
  // Invalidate token on client side (remove from storage)
  return NextResponse.json({ message: 'Logged out successfully.' });
}
