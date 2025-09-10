-- Skrypt do utworzenia tabel w Neon PostgreSQL
-- Wklej to w Neon SQL Editor

-- Tabela bloków
CREATE TABLE IF NOT EXISTS blocks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    delivery_date TEXT,
    total_floors INTEGER,
    total_apartments INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela pięter
CREATE TABLE IF NOT EXISTS floors (
    id SERIAL PRIMARY KEY,
    block_id INTEGER NOT NULL,
    floor_number INTEGER NOT NULL,
    floor_name TEXT NOT NULL,
    total_apartments INTEGER,
    FOREIGN KEY (block_id) REFERENCES blocks (id) ON DELETE CASCADE,
    UNIQUE(block_id, floor_number)
);

-- Tabela mieszkań
CREATE TABLE IF NOT EXISTS apartments (
    id SERIAL PRIMARY KEY,
    block_id INTEGER NOT NULL,
    floor_id INTEGER NOT NULL,
    apartment_number TEXT NOT NULL,
    area REAL NOT NULL,
    rooms INTEGER NOT NULL,
    price REAL,
    status TEXT DEFAULT 'available',
    pdf_path TEXT,
    storage_pdf_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (block_id) REFERENCES blocks (id) ON DELETE CASCADE,
    FOREIGN KEY (floor_id) REFERENCES floors (id) ON DELETE CASCADE,
    UNIQUE(block_id, apartment_number)
);

-- Tabela komórek
CREATE TABLE IF NOT EXISTS storage_rooms (
    id SERIAL PRIMARY KEY,
    apartment_id INTEGER NOT NULL,
    storage_number TEXT,
    area REAL,
    pdf_path TEXT,
    FOREIGN KEY (apartment_id) REFERENCES apartments (id) ON DELETE CASCADE
);

-- Indeksy dla wydajności
CREATE INDEX IF NOT EXISTS idx_apartments_block_id ON apartments(block_id);
CREATE INDEX IF NOT EXISTS idx_apartments_floor_id ON apartments(floor_id);
CREATE INDEX IF NOT EXISTS idx_apartments_status ON apartments(status);
CREATE INDEX IF NOT EXISTS idx_floors_block_id ON floors(block_id);

-- Resetuj sekwencje, aby zaczynały od 1
SELECT setval('blocks_id_seq', 1, false);
SELECT setval('floors_id_seq', 1, false);
SELECT setval('apartments_id_seq', 1, false);
SELECT setval('storage_rooms_id_seq', 1, false);
