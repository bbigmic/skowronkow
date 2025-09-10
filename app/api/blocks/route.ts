import { NextResponse } from 'next/server';
import { getAllBlocks } from '@/lib/database';

export async function GET() {
  try {
    const blocks = getAllBlocks();
    return NextResponse.json(blocks);
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blocks' },
      { status: 500 }
    );
  }
}
