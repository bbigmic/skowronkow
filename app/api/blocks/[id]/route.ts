import { NextResponse } from 'next/server';
import { getBlockById, getFloorsByBlockId, getApartmentsByBlockId, getBlockStats } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blockId = parseInt(params.id);
    
    if (isNaN(blockId)) {
      return NextResponse.json(
        { error: 'Invalid block ID' },
        { status: 400 }
      );
    }

    const block = getBlockById(blockId);
    if (!block) {
      return NextResponse.json(
        { error: 'Block not found' },
        { status: 404 }
      );
    }

    const floors = getFloorsByBlockId(blockId);
    const apartments = getApartmentsByBlockId(blockId);
    const stats = getBlockStats(blockId);

    return NextResponse.json({
      block,
      floors,
      apartments,
      stats
    });
  } catch (error) {
    console.error('Error fetching block:', error);
    return NextResponse.json(
      { error: 'Failed to fetch block' },
      { status: 500 }
    );
  }
}
