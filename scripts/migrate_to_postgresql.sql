-- Skrypt migracji z SQLite do PostgreSQL dla Osiedle Skowronków
-- Uruchom ten skrypt w PostgreSQL, aby utworzyć strukturę bazy danych

-- Tworzenie bazy danych (uruchom jako superuser)
-- CREATE DATABASE osiedle_skowronkow;

-- Przełączenie na bazę danych
-- \c osiedle_skowronkow;

-- Tworzenie rozszerzeń
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela bloków
CREATE TABLE blocks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    delivery_date VARCHAR(50),
    total_floors INTEGER,
    total_apartments INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela pięter
CREATE TABLE floors (
    id SERIAL PRIMARY KEY,
    block_id INTEGER NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
    floor_number INTEGER NOT NULL,
    floor_name VARCHAR(50) NOT NULL,
    total_apartments INTEGER,
    UNIQUE(block_id, floor_number)
);

-- Tabela mieszkań
CREATE TABLE apartments (
    id SERIAL PRIMARY KEY,
    block_id INTEGER NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
    floor_id INTEGER NOT NULL REFERENCES floors(id) ON DELETE CASCADE,
    apartment_number VARCHAR(20) NOT NULL,
    area DECIMAL(8,2) NOT NULL,
    rooms INTEGER NOT NULL,
    price DECIMAL(12,2),
    status VARCHAR(20) DEFAULT 'available',
    pdf_path TEXT,
    storage_pdf_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(block_id, apartment_number)
);

-- Tabela komórek
CREATE TABLE storage_rooms (
    id SERIAL PRIMARY KEY,
    apartment_id INTEGER NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
    storage_number VARCHAR(50),
    area DECIMAL(8,2),
    pdf_path TEXT
);

-- Indeksy dla lepszej wydajności
CREATE INDEX idx_apartments_block_id ON apartments(block_id);
CREATE INDEX idx_apartments_floor_id ON apartments(floor_id);
CREATE INDEX idx_apartments_status ON apartments(status);
CREATE INDEX idx_apartments_price ON apartments(price);
CREATE INDEX idx_apartments_area ON apartments(area);
CREATE INDEX idx_floors_block_id ON floors(block_id);
CREATE INDEX idx_storage_rooms_apartment_id ON storage_rooms(apartment_id);

-- Widoki dla łatwiejszego dostępu do danych
CREATE VIEW apartments_with_details AS
SELECT 
    a.id,
    a.apartment_number,
    a.area,
    a.rooms,
    a.price,
    a.status,
    a.pdf_path,
    a.storage_pdf_path,
    a.created_at,
    f.floor_name,
    f.floor_number,
    b.name as block_name,
    b.delivery_date
FROM apartments a
JOIN floors f ON a.floor_id = f.id
JOIN blocks b ON a.block_id = b.id;

-- Widok statystyk
CREATE VIEW apartment_stats AS
SELECT 
    COUNT(*) as total_apartments,
    COUNT(CASE WHEN status = 'available' THEN 1 END) as available_apartments,
    COUNT(CASE WHEN status = 'unavailable' THEN 1 END) as unavailable_apartments,
    MIN(area) as min_area,
    MAX(area) as max_area,
    AVG(area) as avg_area,
    MIN(price) as min_price,
    MAX(price) as max_price,
    AVG(price) as avg_price
FROM apartments;

-- Funkcja do pobierania statystyk bloku
CREATE OR REPLACE FUNCTION get_block_stats(block_id_param INTEGER)
RETURNS TABLE (
    total_apartments BIGINT,
    available_apartments BIGINT,
    unavailable_apartments BIGINT,
    total_floors BIGINT,
    min_area DECIMAL,
    max_area DECIMAL,
    avg_area DECIMAL,
    min_price DECIMAL,
    max_price DECIMAL,
    avg_price DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_apartments,
        COUNT(CASE WHEN a.status = 'available' THEN 1 END) as available_apartments,
        COUNT(CASE WHEN a.status = 'unavailable' THEN 1 END) as unavailable_apartments,
        COUNT(DISTINCT f.id) as total_floors,
        MIN(a.area) as min_area,
        MAX(a.area) as max_area,
        AVG(a.area) as avg_area,
        MIN(a.price) as min_price,
        MAX(a.price) as max_price,
        AVG(a.price) as avg_price
    FROM apartments a
    JOIN floors f ON a.floor_id = f.id
    WHERE a.block_id = block_id_param;
END;
$$ LANGUAGE plpgsql;

-- Funkcja do pobierania statystyk piętra
CREATE OR REPLACE FUNCTION get_floor_stats(floor_id_param INTEGER)
RETURNS TABLE (
    total_apartments BIGINT,
    available_apartments BIGINT,
    unavailable_apartments BIGINT,
    min_area DECIMAL,
    max_area DECIMAL,
    avg_area DECIMAL,
    min_price DECIMAL,
    max_price DECIMAL,
    avg_price DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_apartments,
        COUNT(CASE WHEN status = 'available' THEN 1 END) as available_apartments,
        COUNT(CASE WHEN status = 'unavailable' THEN 1 END) as unavailable_apartments,
        MIN(area) as min_area,
        MAX(area) as max_area,
        AVG(area) as avg_area,
        MIN(price) as min_price,
        MAX(price) as max_price,
        AVG(price) as avg_price
    FROM apartments
    WHERE floor_id = floor_id_param;
END;
$$ LANGUAGE plpgsql;

-- Komentarze do tabel
COMMENT ON TABLE blocks IS 'Tabela bloków mieszkalnych w osiedlu';
COMMENT ON TABLE floors IS 'Tabela pięter w blokach';
COMMENT ON TABLE apartments IS 'Tabela mieszkań';
COMMENT ON TABLE storage_rooms IS 'Tabela komórek lokatorskich';

-- Komentarze do kolumn
COMMENT ON COLUMN apartments.area IS 'Powierzchnia mieszkania w metrach kwadratowych';
COMMENT ON COLUMN apartments.price IS 'Cena mieszkania w złotych';
COMMENT ON COLUMN apartments.status IS 'Status mieszkania: available, unavailable, reserved, sold';

-- Przykładowe dane (opcjonalnie)
-- INSERT INTO blocks (name, description, delivery_date, total_floors, total_apartments) VALUES
-- ('Blok 1', 'Blok mieszkalny 1', 'koniec 2026', 4, 47),
-- ('Blok 2', 'Blok mieszkalny 2', 'koniec 2027', 4, 40);

-- Informacje o utworzonych obiektach
SELECT 'Database schema created successfully!' as message;
SELECT 'Tables created: blocks, floors, apartments, storage_rooms' as tables;
SELECT 'Views created: apartments_with_details, apartment_stats' as views;
SELECT 'Functions created: get_block_stats, get_floor_stats' as functions;
