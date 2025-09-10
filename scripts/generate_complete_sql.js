const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Ścieżka do bazy SQLite
const dbPath = path.join(__dirname, '..', 'database', 'osiedle_skowronkow.db');
const db = new Database(dbPath);

function escapeString(str) {
  if (str === null) return 'NULL';
  return `'${str.toString().replace(/'/g, "''")}'`;
}

function generateSQL() {
  let sql = '-- Kompletne dane do wstawienia w Neon PostgreSQL\n\n';
  
  // 1. Bloki
  console.log('📦 Generuję dane bloków...');
  const blocks = db.prepare('SELECT * FROM blocks').all();
  sql += '-- Bloki\n';
  sql += 'INSERT INTO blocks (id, name, description, delivery_date, total_floors, total_apartments, created_at) VALUES\n';
  const blockValues = blocks.map(block => 
    `(${block.id}, ${escapeString(block.name)}, ${escapeString(block.description)}, ${escapeString(block.delivery_date)}, ${block.total_floors}, ${block.total_apartments}, ${escapeString(block.created_at)})`
  );
  sql += blockValues.join(',\n') + ';\n\n';
  
  // 2. Piętra
  console.log('🏢 Generuję dane pięter...');
  const floors = db.prepare('SELECT * FROM floors').all();
  sql += '-- Piętra\n';
  sql += 'INSERT INTO floors (id, block_id, floor_number, floor_name, total_apartments) VALUES\n';
  const floorValues = floors.map(floor => 
    `(${floor.id}, ${floor.block_id}, ${floor.floor_number}, ${escapeString(floor.floor_name)}, ${floor.total_apartments})`
  );
  sql += floorValues.join(',\n') + ';\n\n';
  
  // 3. Mieszkania
  console.log('🏠 Generuję dane mieszkań...');
  const apartments = db.prepare('SELECT * FROM apartments').all();
  sql += '-- Mieszkania\n';
  sql += 'INSERT INTO apartments (id, block_id, floor_id, apartment_number, area, rooms, price, status, pdf_path, storage_pdf_path, created_at) VALUES\n';
  const apartmentValues = apartments.map(apt => 
    `(${apt.id}, ${apt.block_id}, ${apt.floor_id}, ${escapeString(apt.apartment_number)}, ${apt.area}, ${apt.rooms}, ${apt.price || 'NULL'}, ${escapeString(apt.status)}, ${escapeString(apt.pdf_path)}, ${escapeString(apt.storage_pdf_path)}, ${escapeString(apt.created_at)})`
  );
  sql += apartmentValues.join(',\n') + ';\n\n';
  
  // 4. Komórki
  console.log('📦 Generuję dane komórek...');
  const storageRooms = db.prepare('SELECT * FROM storage_rooms').all();
  if (storageRooms.length > 0) {
    sql += '-- Komórki\n';
    sql += 'INSERT INTO storage_rooms (id, apartment_id, storage_number, area, pdf_path) VALUES\n';
    const storageValues = storageRooms.map(room => 
      `(${room.id}, ${room.apartment_id}, ${escapeString(room.storage_number)}, ${room.area || 'NULL'}, ${escapeString(room.pdf_path)})`
    );
    sql += storageValues.join(',\n') + ';\n\n';
  }
  
  // 5. Ustaw sekwencje
  const maxBlockId = Math.max(...blocks.map(b => b.id));
  const maxFloorId = Math.max(...floors.map(f => f.id));
  const maxApartmentId = Math.max(...apartments.map(a => a.id));
  const maxStorageId = storageRooms.length > 0 ? Math.max(...storageRooms.map(s => s.id)) : 0;
  
  sql += '-- Ustaw sekwencje\n';
  sql += `SELECT setval('blocks_id_seq', ${maxBlockId}, true);\n`;
  sql += `SELECT setval('floors_id_seq', ${maxFloorId}, true);\n`;
  sql += `SELECT setval('apartments_id_seq', ${maxApartmentId}, true);\n`;
  if (maxStorageId > 0) {
    sql += `SELECT setval('storage_rooms_id_seq', ${maxStorageId}, true);\n`;
  }
  
  return sql;
}

try {
  console.log('🚀 Generuję kompletny skrypt SQL...');
  const sql = generateSQL();
  
  // Zapisz do pliku
  const outputPath = path.join(__dirname, 'complete_data_for_neon.sql');
  fs.writeFileSync(outputPath, sql);
  
  console.log(`✅ Skrypt wygenerowany: ${outputPath}`);
  console.log(`📊 Statystyki:`);
  console.log(`   - Bloki: ${db.prepare('SELECT COUNT(*) FROM blocks').get()['COUNT(*)']}`);
  console.log(`   - Piętra: ${db.prepare('SELECT COUNT(*) FROM floors').get()['COUNT(*)']}`);
  console.log(`   - Mieszkania: ${db.prepare('SELECT COUNT(*) FROM apartments').get()['COUNT(*)']}`);
  console.log(`   - Komórki: ${db.prepare('SELECT COUNT(*) FROM storage_rooms').get()['COUNT(*)']}`);
  
} catch (error) {
  console.error('❌ Błąd:', error);
} finally {
  db.close();
}
