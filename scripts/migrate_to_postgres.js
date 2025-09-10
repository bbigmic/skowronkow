const Database = require('better-sqlite3');
const { sql } = require('@vercel/postgres');
const path = require('path');

// Ścieżka do bazy SQLite
const dbPath = path.join(__dirname, '..', 'database', 'osiedle_skowronkow.db');
const db = new Database(dbPath);

async function migrateData() {
  try {
    console.log('🚀 Rozpoczynam migrację danych z SQLite do PostgreSQL...');

    // 1. Migracja bloków
    console.log('📦 Migruję bloki...');
    const blocks = db.prepare('SELECT * FROM blocks').all();
    for (const block of blocks) {
      await sql`
        INSERT INTO blocks (id, name, description, delivery_date, total_floors, total_apartments, created_at)
        VALUES (${block.id}, ${block.name}, ${block.description}, ${block.delivery_date}, ${block.total_floors}, ${block.total_apartments}, ${block.created_at})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          delivery_date = EXCLUDED.delivery_date,
          total_floors = EXCLUDED.total_floors,
          total_apartments = EXCLUDED.total_apartments,
          created_at = EXCLUDED.created_at
      `;
    }
    console.log(`✅ Zmigrowano ${blocks.length} bloków`);

    // 2. Migracja pięter
    console.log('🏢 Migruję piętra...');
    const floors = db.prepare('SELECT * FROM floors').all();
    for (const floor of floors) {
      await sql`
        INSERT INTO floors (id, block_id, floor_number, floor_name, total_apartments)
        VALUES (${floor.id}, ${floor.block_id}, ${floor.floor_number}, ${floor.floor_name}, ${floor.total_apartments})
        ON CONFLICT (id) DO UPDATE SET
          block_id = EXCLUDED.block_id,
          floor_number = EXCLUDED.floor_number,
          floor_name = EXCLUDED.floor_name,
          total_apartments = EXCLUDED.total_apartments
      `;
    }
    console.log(`✅ Zmigrowano ${floors.length} pięter`);

    // 3. Migracja mieszkań
    console.log('🏠 Migruję mieszkania...');
    const apartments = db.prepare('SELECT * FROM apartments').all();
    for (const apartment of apartments) {
      await sql`
        INSERT INTO apartments (id, block_id, floor_id, apartment_number, area, rooms, price, status, pdf_path, storage_pdf_path, created_at)
        VALUES (${apartment.id}, ${apartment.block_id}, ${apartment.floor_id}, ${apartment.apartment_number}, ${apartment.area}, ${apartment.rooms}, ${apartment.price}, ${apartment.status}, ${apartment.pdf_path}, ${apartment.storage_pdf_path}, ${apartment.created_at})
        ON CONFLICT (id) DO UPDATE SET
          block_id = EXCLUDED.block_id,
          floor_id = EXCLUDED.floor_id,
          apartment_number = EXCLUDED.apartment_number,
          area = EXCLUDED.area,
          rooms = EXCLUDED.rooms,
          price = EXCLUDED.price,
          status = EXCLUDED.status,
          pdf_path = EXCLUDED.pdf_path,
          storage_pdf_path = EXCLUDED.storage_pdf_path,
          created_at = EXCLUDED.created_at
      `;
    }
    console.log(`✅ Zmigrowano ${apartments.length} mieszkań`);

    // 4. Migracja komórek
    console.log('📦 Migruję komórki...');
    const storageRooms = db.prepare('SELECT * FROM storage_rooms').all();
    for (const room of storageRooms) {
      await sql`
        INSERT INTO storage_rooms (id, apartment_id, storage_number, area, pdf_path)
        VALUES (${room.id}, ${room.apartment_id}, ${room.storage_number}, ${room.area}, ${room.pdf_path})
        ON CONFLICT (id) DO UPDATE SET
          apartment_id = EXCLUDED.apartment_id,
          storage_number = EXCLUDED.storage_number,
          area = EXCLUDED.area,
          pdf_path = EXCLUDED.pdf_path
      `;
    }
    console.log(`✅ Zmigrowano ${storageRooms.length} komórek`);

    console.log('🎉 Migracja zakończona pomyślnie!');
    
  } catch (error) {
    console.error('❌ Błąd podczas migracji:', error);
  } finally {
    db.close();
  }
}

// Uruchom migrację tylko jeśli jesteśmy w środowisku z dostępem do Vercel Postgres
if (process.env.POSTGRES_URL) {
  migrateData();
} else {
  console.log('⚠️  Brak zmiennej POSTGRES_URL. Uruchom to na Vercel lub ustaw zmienną środowiskową.');
}
