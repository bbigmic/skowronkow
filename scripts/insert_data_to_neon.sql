-- Skrypt do wstawienia wszystkich danych do Neon PostgreSQL
-- Uruchom to w Neon SQL Editor PO utworzeniu tabel

-- 1. Wstaw bloki
INSERT INTO blocks (id, name, description, delivery_date, total_floors, total_apartments, created_at) VALUES
(1, 'Blok 1', 'Blok mieszkalny Blok 1', 'koniec 2026', 4, 47, '2025-09-02 22:16:07'),
(2, 'Blok 2', 'Blok mieszkalny Blok 2', 'koniec 2027', 4, 40, '2025-09-02 22:16:07');

-- 2. Wstaw piętra
INSERT INTO floors (id, block_id, floor_number, floor_name, total_apartments) VALUES
(1, 1, 0, 'parter', 16),
(2, 1, 1, 'pietro1', 16),
(3, 1, 2, 'pietro2', 14),
(4, 2, 0, 'parter', 13),
(5, 2, 1, 'pietro1', 13),
(6, 2, 2, 'pietro2', 13),
(7, 1, -1, 'piwnica', 0),
(8, 2, -1, 'piwnica', 0);

-- 3. Wstaw mieszkania (pierwsze 10 jako przykład)
INSERT INTO apartments (id, block_id, floor_id, apartment_number, area, rooms, price, status, pdf_path, storage_pdf_path, created_at) VALUES
(1, 1, 1, 'M1', 25.29, 1, 192204.0, 'available', '/images/imagemaps_apartments_structure/blok1/parter/M1/rzut-m1.pdf', '/images/imagemaps_apartments_structure/blok1/parter/M1/komorka-m1.pdf', '2025-09-02 22:16:07'),
(2, 1, 1, 'M2', 54.76, 3, 380092.0, 'unavailable', '/images/imagemaps_apartments_structure/blok1/parter/M2/rzut-m2.pdf', '/images/imagemaps_apartments_structure/blok1/parter/M2/komorka-m2.pdf', '2025-09-02 22:16:07'),
(3, 1, 1, 'M3', 59.09, 3, 398785.0, 'unavailable', '/images/imagemaps_apartments_structure/blok1/parter/M3/rzut-m3.pdf', '/images/imagemaps_apartments_structure/blok1/parter/M3/komorka-m3.pdf', '2025-09-02 22:16:07'),
(4, 1, 1, 'M4', 47.98, 3, 311870.0, 'unavailable', '/images/imagemaps_apartments_structure/blok1/parter/M4/rzut-m4.pdf', '/images/imagemaps_apartments_structure/blok1/parter/M4/komorka-m4.pdf', '2025-09-02 22:16:07'),
(5, 1, 1, 'M5', 34.41, 2, 227265.0, 'unavailable', '/images/imagemaps_apartments_structure/blok1/parter/M5/rzut-m5.pdf', '/images/imagemaps_apartments_structure/blok1/parter/M5/komorka-m5.pdf', '2025-09-02 22:16:07');

-- 4. Wstaw komórki (pierwsze 5 jako przykład)
INSERT INTO storage_rooms (id, apartment_id, storage_number, area, pdf_path) VALUES
(1, 1, 'K1', 2.5, '/images/imagemaps_apartments_structure/blok1/parter/M1/komorka-m1.pdf'),
(2, 2, 'K2', 3.2, '/images/imagemaps_apartments_structure/blok1/parter/M2/komorka-m2.pdf'),
(3, 3, 'K3', 2.8, '/images/imagemaps_apartments_structure/blok1/parter/M3/komorka-m3.pdf'),
(4, 4, 'K4', 3.0, '/images/imagemaps_apartments_structure/blok1/parter/M4/komorka-m4.pdf'),
(5, 5, 'K5', 2.7, '/images/imagemaps_apartments_structure/blok1/parter/M5/komorka-m5.pdf');

-- Ustaw sekwencje na właściwe wartości
SELECT setval('blocks_id_seq', 2, true);
SELECT setval('floors_id_seq', 8, true);
SELECT setval('apartments_id_seq', 5, true);
SELECT setval('storage_rooms_id_seq', 5, true);
