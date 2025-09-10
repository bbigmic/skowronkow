import { NextResponse } from 'next/server';
import { getAllApartments, getAvailableApartments } from '@/lib/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const available = searchParams.get('available');
    
    let apartments;
    if (available === 'true') {
      apartments = getAvailableApartments();
    } else {
      apartments = getAllApartments();
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
