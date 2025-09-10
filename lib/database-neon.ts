import { Pool } from 'pg';

// Konfiguracja połączenia z Neon PostgreSQL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
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

// Funkcje API dla bloków
export async function getAllBlocks(): Promise<Block[]> {
  const { rows } = await pool.query('SELECT * FROM blocks ORDER BY name');
  return rows as Block[];
}

export async function getBlockById(id: number): Promise<Block | null> {
  const { rows } = await pool.query('SELECT * FROM blocks WHERE id = $1', [id]);
  return rows[0] as Block || null;
}

export async function getBlockByName(name: string): Promise<Block | null> {
  const { rows } = await pool.query('SELECT * FROM blocks WHERE name = $1', [name]);
  return rows[0] as Block || null;
}

// Funkcje API dla pięter
export async function getFloorsByBlockId(blockId: number): Promise<Floor[]> {
  const { rows } = await pool.query('SELECT * FROM floors WHERE block_id = $1 ORDER BY floor_number', [blockId]);
  return rows as Floor[];
}

export async function getFloorById(id: number): Promise<Floor | null> {
  const { rows } = await pool.query('SELECT * FROM floors WHERE id = $1', [id]);
  return rows[0] as Floor || null;
}

// Funkcje API dla mieszkań
export async function getAllApartments(): Promise<Apartment[]> {
  const { rows } = await pool.query(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    ORDER BY b.name, f.floor_number, a.apartment_number
  `);
  return rows as Apartment[];
}

export async function getApartmentsByBlockId(blockId: number): Promise<Apartment[]> {
  const { rows } = await pool.query(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    WHERE a.block_id = $1
    ORDER BY f.floor_number, a.apartment_number
  `, [blockId]);
  return rows as Apartment[];
}

export async function getApartmentsByFloorId(floorId: number): Promise<Apartment[]> {
  const { rows } = await pool.query(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    WHERE a.floor_id = $1
    ORDER BY a.apartment_number
  `, [floorId]);
  return rows as Apartment[];
}

export async function getApartmentById(id: number): Promise<Apartment | null> {
  const { rows } = await pool.query(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    WHERE a.id = $1
  `, [id]);
  return rows[0] as Apartment || null;
}

export async function getApartmentByNumber(blockId: number, apartmentNumber: string): Promise<Apartment | null> {
  const { rows } = await pool.query(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    WHERE a.block_id = $1 AND a.apartment_number = $2
  `, [blockId, apartmentNumber]);
  return rows[0] as Apartment || null;
}

export async function getAvailableApartments(): Promise<Apartment[]> {
  const { rows } = await pool.query(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    WHERE a.status = 'available'
    ORDER BY b.name, f.floor_number, a.apartment_number
  `);
  return rows as Apartment[];
}

// Funkcje API dla komórek
export async function getStorageRoomsByApartmentId(apartmentId: number): Promise<StorageRoom[]> {
  const { rows } = await pool.query('SELECT * FROM storage_rooms WHERE apartment_id = $1', [apartmentId]);
  return rows as StorageRoom[];
}

// Funkcje statystyk
export async function getApartmentStats() {
  const { rows: totalRows } = await pool.query('SELECT COUNT(*) as total FROM apartments');
  const { rows: availableRows } = await pool.query("SELECT COUNT(*) as available FROM apartments WHERE status = 'available'");
  const { rows: priceRows } = await pool.query('SELECT MIN(price) as min_price, MAX(price) as max_price, AVG(price) as avg_price FROM apartments WHERE price IS NOT NULL');
  const { rows: areaRows } = await pool.query('SELECT MIN(area) as min_area, MAX(area) as max_area, AVG(area) as avg_area FROM apartments');
  
  const total = totalRows[0].total;
  const available = availableRows[0].available;
  const prices = priceRows[0];
  const areas = areaRows[0];
  
  return {
    total: parseInt(total),
    available: parseInt(available),
    unavailable: parseInt(total) - parseInt(available),
    minPrice: parseFloat(prices.min_price || 0),
    maxPrice: parseFloat(prices.max_price || 0),
    avgPrice: Math.round(parseFloat(prices.avg_price || 0)),
    minArea: parseFloat(areas.min_area || 0),
    maxArea: parseFloat(areas.max_area || 0),
    avgArea: Math.round(parseFloat(areas.avg_area || 0) * 10) / 10
  };
}

export async function getBlockStats(blockId: number) {
  const { rows: totalRows } = await pool.query('SELECT COUNT(*) as total FROM apartments WHERE block_id = $1', [blockId]);
  const { rows: availableRows } = await pool.query("SELECT COUNT(*) as available FROM apartments WHERE block_id = $1 AND status = 'available'", [blockId]);
  const { rows: floorsRows } = await pool.query('SELECT COUNT(*) as floors FROM floors WHERE block_id = $1', [blockId]);
  const { rows: priceRows } = await pool.query('SELECT MIN(price) as min_price, MAX(price) as max_price, AVG(price) as avg_price FROM apartments WHERE block_id = $1 AND price IS NOT NULL', [blockId]);
  const { rows: areaRows } = await pool.query('SELECT MIN(area) as min_area, MAX(area) as max_area, AVG(area) as avg_area FROM apartments WHERE block_id = $1', [blockId]);
  
  const total = totalRows[0].total;
  const available = availableRows[0].available;
  const floors = floorsRows[0].floors;
  const prices = priceRows[0];
  const areas = areaRows[0];
  
  return {
    total: parseInt(total),
    available: parseInt(available),
    unavailable: parseInt(total) - parseInt(available),
    floors: parseInt(floors),
    minPrice: parseFloat(prices.min_price || 0),
    maxPrice: parseFloat(prices.max_price || 0),
    avgPrice: Math.round(parseFloat(prices.avg_price || 0)),
    minArea: parseFloat(areas.min_area || 0),
    maxArea: parseFloat(areas.max_area || 0),
    avgArea: Math.round(parseFloat(areas.avg_area || 0) * 10) / 10
  };
}

export async function getFloorStats(floorId: number) {
  const { rows: totalRows } = await pool.query('SELECT COUNT(*) as total FROM apartments WHERE floor_id = $1', [floorId]);
  const { rows: availableRows } = await pool.query("SELECT COUNT(*) as available FROM apartments WHERE floor_id = $1 AND status = 'available'", [floorId]);
  const { rows: priceRows } = await pool.query('SELECT MIN(price) as min_price, MAX(price) as max_price, AVG(price) as avg_price FROM apartments WHERE floor_id = $1 AND price IS NOT NULL', [floorId]);
  const { rows: areaRows } = await pool.query('SELECT MIN(area) as min_area, MAX(area) as max_area, AVG(area) as avg_area FROM apartments WHERE floor_id = $1', [floorId]);
  
  const total = totalRows[0].total;
  const available = availableRows[0].available;
  const prices = priceRows[0];
  const areas = areaRows[0];
  
  return {
    total: parseInt(total),
    available: parseInt(available),
    unavailable: parseInt(total) - parseInt(available),
    minPrice: parseFloat(prices.min_price || 0),
    maxPrice: parseFloat(prices.max_price || 0),
    avgPrice: Math.round(parseFloat(prices.avg_price || 0)),
    minArea: parseFloat(areas.min_area || 0),
    maxArea: parseFloat(areas.max_area || 0),
    avgArea: Math.round(parseFloat(areas.avg_area || 0) * 10) / 10
  };
}

// Funkcja do zamykania połączenia
export async function closePool() {
  await pool.end();
}
