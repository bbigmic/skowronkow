import { NextResponse } from 'next/server';
import { getFloorById, getApartmentsByFloorId, getFloorStats } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const floorId = parseInt(params.id);
    
    if (isNaN(floorId)) {
      return NextResponse.json(
        { error: 'Invalid floor ID' },
        { status: 400 }
      );
    }

    const floor = getFloorById(floorId);
    if (!floor) {
      return NextResponse.json(
        { error: 'Floor not found' },
        { status: 404 }
      );
    }

    const apartments = getApartmentsByFloorId(floorId);
    const stats = getFloorStats(floorId);

    return NextResponse.json({
      floor,
      apartments,
      stats
    });
  } catch (error) {
    console.error('Error fetching floor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch floor' },
      { status: 500 }
    );
  }
}
