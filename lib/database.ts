import Database from 'better-sqlite3';
import path from 'path';

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

// Singleton dla połączenia z bazą danych
class DatabaseManager {
  private static instance: DatabaseManager;
  private db: Database.Database | null = null;

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public getDatabase(): Database.Database {
    if (!this.db) {
      const dbPath = path.join(process.cwd(), 'database', 'osiedle_skowronkow.db');
      this.db = new Database(dbPath);
      this.db.pragma('journal_mode = WAL');
    }
    return this.db;
  }

  public close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// Funkcje pomocnicze do obsługi bazy danych
export const dbManager = DatabaseManager.getInstance();

// Funkcje API dla bloków
export function getAllBlocks(): Block[] {
  const db = dbManager.getDatabase();
  const stmt = db.prepare('SELECT * FROM blocks ORDER BY name');
  return stmt.all() as Block[];
}

export function getBlockById(id: number): Block | null {
  const db = dbManager.getDatabase();
  const stmt = db.prepare('SELECT * FROM blocks WHERE id = ?');
  return stmt.get(id) as Block | null;
}

export function getBlockByName(name: string): Block | null {
  const db = dbManager.getDatabase();
  const stmt = db.prepare('SELECT * FROM blocks WHERE name = ?');
  return stmt.get(name) as Block | null;
}

// Funkcje API dla pięter
export function getFloorsByBlockId(blockId: number): Floor[] {
  const db = dbManager.getDatabase();
  const stmt = db.prepare('SELECT * FROM floors WHERE block_id = ? ORDER BY floor_number');
  return stmt.all(blockId) as Floor[];
}

export function getFloorById(id: number): Floor | null {
  const db = dbManager.getDatabase();
  const stmt = db.prepare('SELECT * FROM floors WHERE id = ?');
  return stmt.get(id) as Floor | null;
}

// Funkcje API dla mieszkań
export function getAllApartments(): Apartment[] {
  const db = dbManager.getDatabase();
  const stmt = db.prepare(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    ORDER BY b.name, f.floor_number, a.apartment_number
  `);
  return stmt.all() as Apartment[];
}

export function getApartmentsByBlockId(blockId: number): Apartment[] {
  const db = dbManager.getDatabase();
  const stmt = db.prepare(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    WHERE a.block_id = ?
    ORDER BY f.floor_number, a.apartment_number
  `);
  return stmt.all(blockId) as Apartment[];
}

export function getApartmentsByFloorId(floorId: number): Apartment[] {
  const db = dbManager.getDatabase();
  const stmt = db.prepare(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    WHERE a.floor_id = ?
    ORDER BY a.apartment_number
  `);
  return stmt.all(floorId) as Apartment[];
}

export function getApartmentById(id: number): Apartment | null {
  const db = dbManager.getDatabase();
  const stmt = db.prepare(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    WHERE a.id = ?
  `);
  return stmt.get(id) as Apartment | null;
}

export function getApartmentByNumber(blockId: number, apartmentNumber: string): Apartment | null {
  const db = dbManager.getDatabase();
  const stmt = db.prepare(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    WHERE a.block_id = ? AND a.apartment_number = ?
  `);
  return stmt.get(blockId, apartmentNumber) as Apartment | null;
}

export function getAvailableApartments(): Apartment[] {
  const db = dbManager.getDatabase();
  const stmt = db.prepare(`
    SELECT a.*, f.floor_name, b.name as block_name
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    JOIN blocks b ON a.block_id = b.id
    WHERE a.status = 'available'
    ORDER BY b.name, f.floor_number, a.apartment_number
  `);
  return stmt.all() as Apartment[];
}

// Funkcje API dla komórek
export function getStorageRoomsByApartmentId(apartmentId: number): StorageRoom[] {
  const db = dbManager.getDatabase();
  const stmt = db.prepare('SELECT * FROM storage_rooms WHERE apartment_id = ?');
  return stmt.all(apartmentId) as StorageRoom[];
}

// Funkcje statystyk
export function getApartmentStats() {
  const db = dbManager.getDatabase();
  
  const totalStmt = db.prepare('SELECT COUNT(*) as total FROM apartments');
  const availableStmt = db.prepare("SELECT COUNT(*) as available FROM apartments WHERE status = 'available'");
  const priceStmt = db.prepare('SELECT MIN(price) as min_price, MAX(price) as max_price, AVG(price) as avg_price FROM apartments WHERE price IS NOT NULL');
  const areaStmt = db.prepare('SELECT MIN(area) as min_area, MAX(area) as max_area, AVG(area) as avg_area FROM apartments');
  
  const total = totalStmt.get() as { total: number };
  const available = availableStmt.get() as { available: number };
  const prices = priceStmt.get() as { min_price: number; max_price: number; avg_price: number };
  const areas = areaStmt.get() as { min_area: number; max_area: number; avg_area: number };
  
  return {
    total: total.total,
    available: available.available,
    unavailable: total.total - available.available,
    minPrice: prices.min_price,
    maxPrice: prices.max_price,
    avgPrice: Math.round(prices.avg_price),
    minArea: areas.min_area,
    maxArea: areas.max_area,
    avgArea: Math.round(areas.avg_area * 10) / 10
  };
}

export function getBlockStats(blockId: number) {
  const db = dbManager.getDatabase();
  
  const totalStmt = db.prepare('SELECT COUNT(*) as total FROM apartments WHERE block_id = ?');
  const availableStmt = db.prepare("SELECT COUNT(*) as available FROM apartments WHERE block_id = ? AND status = 'available'");
  const floorsStmt = db.prepare('SELECT COUNT(*) as floors FROM floors WHERE block_id = ?');
  const priceStmt = db.prepare('SELECT MIN(price) as min_price, MAX(price) as max_price, AVG(price) as avg_price FROM apartments WHERE block_id = ? AND price IS NOT NULL');
  const areaStmt = db.prepare('SELECT MIN(area) as min_area, MAX(area) as max_area, AVG(area) as avg_area FROM apartments WHERE block_id = ?');
  
  const total = totalStmt.get(blockId) as { total: number };
  const available = availableStmt.get(blockId) as { available: number };
  const floors = floorsStmt.get(blockId) as { floors: number };
  const prices = priceStmt.get(blockId) as { min_price: number; max_price: number; avg_price: number };
  const areas = areaStmt.get(blockId) as { min_area: number; max_area: number; avg_area: number };
  
  return {
    total: total.total,
    available: available.available,
    unavailable: total.total - available.available,
    floors: floors.floors,
    minPrice: prices.min_price,
    maxPrice: prices.max_price,
    avgPrice: Math.round(prices.avg_price),
    minArea: areas.min_area,
    maxArea: areas.max_area,
    avgArea: Math.round(areas.avg_area * 10) / 10
  };
}

export function getFloorStats(floorId: number) {
  const db = dbManager.getDatabase();
  
  const totalStmt = db.prepare('SELECT COUNT(*) as total FROM apartments WHERE floor_id = ?');
  const availableStmt = db.prepare("SELECT COUNT(*) as available FROM apartments WHERE floor_id = ? AND status = 'available'");
  const priceStmt = db.prepare('SELECT MIN(price) as min_price, MAX(price) as max_price, AVG(price) as avg_price FROM apartments WHERE floor_id = ? AND price IS NOT NULL');
  const areaStmt = db.prepare('SELECT MIN(area) as min_area, MAX(area) as max_area, AVG(area) as avg_area FROM apartments WHERE floor_id = ?');
  
  const total = totalStmt.get(floorId) as { total: number };
  const available = availableStmt.get(floorId) as { available: number };
  const prices = priceStmt.get(floorId) as { min_price: number; max_price: number; avg_price: number };
  const areas = areaStmt.get(floorId) as { min_area: number; max_area: number; avg_area: number };
  
  return {
    total: total.total,
    available: available.available,
    unavailable: total.total - available.available,
    minPrice: prices.min_price,
    maxPrice: prices.max_price,
    avgPrice: Math.round(prices.avg_price),
    minArea: areas.min_area,
    maxArea: areas.max_area,
    avgArea: Math.round(areas.avg_area * 10) / 10
  };
}
