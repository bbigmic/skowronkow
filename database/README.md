# Baza danych - Osiedle Skowronków

## 📊 Przegląd

Projekt wykorzystuje bazę danych do przechowywania informacji o mieszkaniach, blokach, piętrach i komórkach w Osiedlu Skowronków. Dane zostały zaimportowane z plików Excel i są dostępne przez API Next.js.

## 🗄️ Struktura bazy danych

### Tabele

1. **blocks** - Bloki mieszkalne
   - `id` - Unikalny identyfikator
   - `name` - Nazwa bloku (np. "Blok 1", "Blok 2")
   - `description` - Opis bloku
   - `delivery_date` - Termin oddania
   - `total_floors` - Liczba pięter
   - `total_apartments` - Liczba mieszkań
   - `created_at` - Data utworzenia

2. **floors** - Piętra w blokach
   - `id` - Unikalny identyfikator
   - `block_id` - ID bloku (klucz obcy)
   - `floor_number` - Numer piętra (-1=piwnica, 0=parter, 1+=piętra)
   - `floor_name` - Nazwa piętra (parter, pietro1, pietro2, piwnica)
   - `total_apartments` - Liczba mieszkań na piętrze

3. **apartments** - Mieszkania
   - `id` - Unikalny identyfikator
   - `block_id` - ID bloku (klucz obcy)
   - `floor_id` - ID piętra (klucz obcy)
   - `apartment_number` - Numer mieszkania (np. "M1", "M25")
   - `area` - Powierzchnia w m²
   - `rooms` - Liczba pokoi
   - `price` - Cena w złotych
   - `status` - Status (available, unavailable)
   - `pdf_path` - Ścieżka do PDF rzutu mieszkania
   - `storage_pdf_path` - Ścieżka do PDF rzutu komórki
   - `created_at` - Data utworzenia

4. **storage_rooms** - Komórki lokatorskie
   - `id` - Unikalny identyfikator
   - `apartment_id` - ID mieszkania (klucz obcy)
   - `storage_number` - Numer komórki
   - `area` - Powierzchnia komórki
   - `pdf_path` - Ścieżka do PDF rzutu komórki

## 📈 Statystyki

### Importowane dane:
- **2 bloki** mieszkalne
- **6 pięter** (3 w każdym bloku)
- **85 mieszkań** (47 w Bloku 1, 40 w Bloku 2)
- **85 komórek** (po jednej na mieszkanie)

### Zakresy:
- **Powierzchnia**: 25.3 - 82.0 m²
- **Pokoje**: 1-5 pokoi
- **Ceny**: 192,204 - 447,264 zł
- **Status**: 42 dostępne, 43 niedostępne

## 🚀 Uruchomienie

### SQLite (rozwój)

1. **Import danych z Excel:**
```bash
# Aktywuj środowisko wirtualne
source venv/bin/activate

# Uruchom import
python3 scripts/import_excel_data.py
```

2. **Uruchom aplikację:**
```bash
npm run dev
```

### PostgreSQL (produkcja)

1. **Utwórz bazę danych:**
```sql
CREATE DATABASE osiedle_skowronkow;
```

2. **Uruchom migrację:**
```bash
psql -d osiedle_skowronkow -f scripts/migrate_to_postgresql.sql
```

3. **Eksportuj dane z SQLite:**
```bash
# Zainstaluj psycopg2
pip install psycopg2-binary

# Uruchom eksport
python3 scripts/export_to_postgresql.py
```

4. **Skonfiguruj zmienne środowiskowe:**
```bash
# .env.local
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=osiedle_skowronkow
POSTGRES_USER=postgres
POSTGRES_PASSWORD=twoje_haslo
```

## 🔧 API Endpoints

### Bloki
- `GET /api/blocks` - Lista wszystkich bloków
- `GET /api/blocks/[id]` - Szczegóły bloku z piętrami i mieszkaniami

### Piętra
- `GET /api/floors/[id]` - Szczegóły piętra z mieszkaniami

### Mieszkania
- `GET /api/apartments` - Lista wszystkich mieszkań
- `GET /api/apartments?available=true` - Tylko dostępne mieszkania
- `GET /api/apartments/[id]` - Szczegóły mieszkania z komórkami

### Statystyki
- `GET /api/stats` - Statystyki ogólne

## 📝 Przykłady użycia

### Pobieranie danych w komponencie React:

```typescript
import { useBlocks, useBlock, useApartment } from '@/lib/hooks/useDatabase';

function MyComponent() {
  const { blocks, loading } = useBlocks();
  const { block, apartments } = useBlock(1);
  const { apartment } = useApartment(1);
  
  if (loading) return <div>Ładowanie...</div>;
  
  return (
    <div>
      <h1>Bloki: {blocks.length}</h1>
      <h2>Mieszkania w Bloku 1: {apartments.length}</h2>
    </div>
  );
}
```

### Bezpośrednie zapytania do bazy:

```typescript
import { getAllBlocks, getAvailableApartments } from '@/lib/database';

// Pobierz wszystkie bloki
const blocks = getAllBlocks();

// Pobierz dostępne mieszkania
const availableApartments = getAvailableApartments();
```

## 🔄 Aktualizacja danych

### Dodanie nowych danych z Excel:

1. Umieść nowe pliki Excel w głównym katalogu
2. Uruchom skrypt importu:
```bash
python3 scripts/import_excel_data.py
```

### Aktualizacja statusu mieszkania:

```typescript
// W API route lub bezpośrednio w bazie
const updateApartmentStatus = async (apartmentId: number, status: string) => {
  const db = dbManager.getDatabase();
  const stmt = db.prepare('UPDATE apartments SET status = ? WHERE id = ?');
  stmt.run(status, apartmentId);
};
```

## 🛠️ Narzędzia

### Skrypty pomocnicze:

- `scripts/convert_excel_to_db.py` - Analiza plików Excel
- `scripts/import_excel_data.py` - Import danych do SQLite
- `scripts/export_to_postgresql.py` - Eksport do PostgreSQL
- `scripts/migrate_to_postgresql.sql` - Migracja schematu PostgreSQL

### Pliki konfiguracyjne:

- `lib/database.ts` - Funkcje SQLite
- `lib/database-postgresql.ts` - Funkcje PostgreSQL
- `lib/hooks/useDatabase.ts` - React hooks

## 📊 Monitoring

### Sprawdzenie stanu bazy:

```sql
-- SQLite
SELECT COUNT(*) as total_apartments FROM apartments;
SELECT status, COUNT(*) FROM apartments GROUP BY status;

-- PostgreSQL
SELECT * FROM apartment_stats;
SELECT * FROM get_block_stats(1);
```

### Logi aplikacji:

```bash
# Sprawdź logi Next.js
npm run dev

# Sprawdź logi bazy danych
tail -f database/osiedle_skowronkow.db.log
```

## 🔒 Bezpieczeństwo

- Używaj zmiennych środowiskowych dla haseł
- Ogranicz dostęp do bazy danych
- Regularnie twórz kopie zapasowe
- Waliduj dane wejściowe w API

## 📞 Wsparcie

W przypadku problemów z bazą danych:
1. Sprawdź logi aplikacji
2. Zweryfikuj połączenie z bazą
3. Sprawdź uprawnienia użytkownika
4. Skontaktuj się z zespołem deweloperskim
