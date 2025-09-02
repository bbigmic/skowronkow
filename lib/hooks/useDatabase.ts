'use client';

import { useState, useEffect } from 'react';

// Typy danych
export interface Block {
  id: number;
  name: string;
  description: string | null;
  delivery_date: string | null;
  total_floors: number | null;
  total_apartments: number | null;
  created_at: string;
}

export interface Floor {
  id: number;
  block_id: number;
  floor_number: number;
  floor_name: string;
  total_apartments: number | null;
}

export interface Apartment {
  id: number;
  block_id: number;
  floor_id: number;
  apartment_number: string;
  area: number;
  rooms: number;
  price: number | null;
  status: string;
  pdf_path: string | null;
  storage_pdf_path: string | null;
  created_at: string;
  floor_name?: string;
  block_name?: string;
}

export interface StorageRoom {
  id: number;
  apartment_id: number;
  storage_number: string | null;
  area: number | null;
  pdf_path: string | null;
}

export interface ApartmentStats {
  total: number;
  available: number;
  unavailable: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  minArea: number;
  maxArea: number;
  avgArea: number;
}

// Hook do pobierania bloków
export function useBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blocks');
        if (!response.ok) {
          throw new Error('Failed to fetch blocks');
        }
        const data = await response.json();
        setBlocks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  return { blocks, loading, error };
}

// Hook do pobierania konkretnego bloku
export function useBlock(blockId: number) {
  const [block, setBlock] = useState<Block | null>(null);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [stats, setStats] = useState<ApartmentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blockId) return;

    const fetchBlock = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blocks/${blockId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch block');
        }
        const data = await response.json();
        setBlock(data.block);
        setFloors(data.floors);
        setApartments(data.apartments);
        setStats(data.stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlock();
  }, [blockId]);

  return { block, floors, apartments, stats, loading, error };
}

// Hook do pobierania piętra
export function useFloor(floorId: number) {
  const [floor, setFloor] = useState<Floor | null>(null);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [stats, setStats] = useState<ApartmentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!floorId) return;

    const fetchFloor = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/floors/${floorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch floor');
        }
        const data = await response.json();
        setFloor(data.floor);
        setApartments(data.apartments);
        setStats(data.stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchFloor();
  }, [floorId]);

  return { floor, apartments, stats, loading, error };
}

// Hook do pobierania mieszkań
export function useApartments(availableOnly: boolean = false) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        const url = availableOnly ? '/api/apartments?available=true' : '/api/apartments';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch apartments');
        }
        const data = await response.json();
        setApartments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [availableOnly]);

  return { apartments, loading, error };
}

// Hook do pobierania konkretnego mieszkania
export function useApartment(apartmentId: number) {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [storageRooms, setStorageRooms] = useState<StorageRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apartmentId) return;

    const fetchApartment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/apartments/${apartmentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch apartment');
        }
        const data = await response.json();
        setApartment(data.apartment);
        setStorageRooms(data.storageRooms);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [apartmentId]);

  return { apartment, storageRooms, loading, error };
}

// Hook do pobierania statystyk
export function useStats() {
  const [stats, setStats] = useState<ApartmentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}
