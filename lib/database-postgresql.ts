import { Pool } from 'pg';

// Konfiguracja połączenia z PostgreSQL
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'osiedle_skowronkow',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Typy dla bazy danych
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
}

export interface StorageRoom {
  id: number;
  apartment_id: number;
  storage_number: string | null;
  area: number | null;
  pdf_path: string | null;
}

// Funkcje API dla bloków
export async function getAllBlocks(): Promise<Block[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM blocks ORDER BY name');
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getBlockById(id: number): Promise<Block | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM blocks WHERE id = $1', [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function getBlockByName(name: string): Promise<Block | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM blocks WHERE name = $1', [name]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

// Funkcje API dla pięter
export async function getFloorsByBlockId(blockId: number): Promise<Floor[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM floors WHERE block_id = $1 ORDER BY floor_number', [blockId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getFloorById(id: number): Promise<Floor | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM floors WHERE id = $1', [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

// Funkcje API dla mieszkań
export async function getAllApartments(): Promise<Apartment[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT a.*, f.floor_name, b.name as block_name
      FROM apartments a
      JOIN floors f ON a.floor_id = f.id
      JOIN blocks b ON a.block_id = b.id
      ORDER BY b.name, f.floor_number, a.apartment_number
    `);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getApartmentsByBlockId(blockId: number): Promise<Apartment[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT a.*, f.floor_name, b.name as block_name
      FROM apartments a
      JOIN floors f ON a.floor_id = f.id
      JOIN blocks b ON a.block_id = b.id
      WHERE a.block_id = $1
      ORDER BY f.floor_number, a.apartment_number
    `, [blockId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getApartmentsByFloorId(floorId: number): Promise<Apartment[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT a.*, f.floor_name, b.name as block_name
      FROM apartments a
      JOIN floors f ON a.floor_id = f.id
      JOIN blocks b ON a.block_id = b.id
      WHERE a.floor_id = $1
      ORDER BY a.apartment_number
    `, [floorId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getApartmentById(id: number): Promise<Apartment | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT a.*, f.floor_name, b.name as block_name
      FROM apartments a
      JOIN floors f ON a.floor_id = f.id
      JOIN blocks b ON a.block_id = b.id
      WHERE a.id = $1
    `, [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function getApartmentByNumber(blockId: number, apartmentNumber: string): Promise<Apartment | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT a.*, f.floor_name, b.name as block_name
      FROM apartments a
      JOIN floors f ON a.floor_id = f.id
      JOIN blocks b ON a.block_id = b.id
      WHERE a.block_id = $1 AND a.apartment_number = $2
    `, [blockId, apartmentNumber]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function getAvailableApartments(): Promise<Apartment[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT a.*, f.floor_name, b.name as block_name
      FROM apartments a
      JOIN floors f ON a.floor_id = f.id
      JOIN blocks b ON a.block_id = b.id
      WHERE a.status = 'available'
      ORDER BY b.name, f.floor_number, a.apartment_number
    `);
    return result.rows;
  } finally {
    client.release();
  }
}

// Funkcje API dla komórek
export async function getStorageRoomsByApartmentId(apartmentId: number): Promise<StorageRoom[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM storage_rooms WHERE apartment_id = $1', [apartmentId]);
    return result.rows;
  } finally {
    client.release();
  }
}

// Funkcje statystyk
export async function getApartmentStats() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM apartment_stats');
    const stats = result.rows[0];
    
    return {
      total: parseInt(stats.total_apartments),
      available: parseInt(stats.available_apartments),
      unavailable: parseInt(stats.unavailable_apartments),
      minPrice: parseFloat(stats.min_price || 0),
      maxPrice: parseFloat(stats.max_price || 0),
      avgPrice: Math.round(parseFloat(stats.avg_price || 0)),
      minArea: parseFloat(stats.min_area || 0),
      maxArea: parseFloat(stats.max_area || 0),
      avgArea: Math.round(parseFloat(stats.avg_area || 0) * 10) / 10
    };
  } finally {
    client.release();
  }
}

export async function getBlockStats(blockId: number) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM get_block_stats($1)', [blockId]);
    const stats = result.rows[0];
    
    return {
      total: parseInt(stats.total_apartments),
      available: parseInt(stats.available_apartments),
      unavailable: parseInt(stats.unavailable_apartments),
      floors: parseInt(stats.total_floors),
      minPrice: parseFloat(stats.min_price || 0),
      maxPrice: parseFloat(stats.max_price || 0),
      avgPrice: Math.round(parseFloat(stats.avg_price || 0)),
      minArea: parseFloat(stats.min_area || 0),
      maxArea: parseFloat(stats.max_area || 0),
      avgArea: Math.round(parseFloat(stats.avg_area || 0) * 10) / 10
    };
  } finally {
    client.release();
  }
}

export async function getFloorStats(floorId: number) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM get_floor_stats($1)', [floorId]);
    const stats = result.rows[0];
    
    return {
      total: parseInt(stats.total_apartments),
      available: parseInt(stats.available_apartments),
      unavailable: parseInt(stats.unavailable_apartments),
      minPrice: parseFloat(stats.min_price || 0),
      maxPrice: parseFloat(stats.max_price || 0),
      avgPrice: Math.round(parseFloat(stats.avg_price || 0)),
      minArea: parseFloat(stats.min_area || 0),
      maxArea: parseFloat(stats.max_area || 0),
      avgArea: Math.round(parseFloat(stats.avg_area || 0) * 10) / 10
    };
  } finally {
    client.release();
  }
}

// Funkcja do zamykania połączenia
export async function closePool() {
  await pool.end();
}
