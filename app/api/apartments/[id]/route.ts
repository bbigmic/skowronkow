import { NextResponse } from 'next/server';
import { getApartmentById, getStorageRoomsByApartmentId } from '@/lib/database-hybrid';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const apartmentId = parseInt(params.id);
    
    if (isNaN(apartmentId)) {
      return NextResponse.json(
        { error: 'Invalid apartment ID' },
        { status: 400 }
      );
    }

    const apartment = await getApartmentById(apartmentId);
    if (!apartment) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    const storageRooms = await getStorageRoomsByApartmentId(apartmentId);

    return NextResponse.json({
      apartment,
      storageRooms
    });
  } catch (error) {
    console.error('Error fetching apartment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch apartment' },
      { status: 500 }
    );
  }
}
