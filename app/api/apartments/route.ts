import { NextResponse } from 'next/server';
import { getAllApartments, getAvailableApartments } from '@/lib/database-hybrid';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const available = searchParams.get('available');
    
    let apartments;
    if (available === 'true') {
      apartments = await getAvailableApartments();
    } else {
      apartments = await getAllApartments();
    }

    return NextResponse.json(apartments);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch apartments' },
      { status: 500 }
    );
  }
}
