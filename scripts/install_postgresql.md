# Instalacja PostgreSQL dla Osiedle Skowronków

## 🐘 Instalacja PostgreSQL

### macOS (Homebrew)

```bash
# Instalacja PostgreSQL
brew install postgresql@15

# Uruchomienie serwisu
brew services start postgresql@15

# Utworzenie użytkownika i bazy danych
createuser -s postgres
createdb osiedle_skowronkow
```

### Ubuntu/Debian

```bash
# Instalacja PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Uruchomienie serwisu
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Utworzenie użytkownika i bazy danych
sudo -u postgres createuser -s postgres
sudo -u postgres createdb osiedle_skowronkow
```

### Windows

1. Pobierz PostgreSQL z [postgresql.org](https://www.postgresql.org/download/windows/)
2. Uruchom instalator i postępuj zgodnie z instrukcjami
3. Zapamiętaj hasło dla użytkownika `postgres`
4. Uruchom pgAdmin lub psql

## 🔧 Konfiguracja

### 1. Utwórz bazę danych

```sql
-- Połącz się z PostgreSQL jako superuser
psql -U postgres

-- Utwórz bazę danych
CREATE DATABASE osiedle_skowronkow;

-- Utwórz użytkownika (opcjonalnie)
CREATE USER skowronkow_user WITH PASSWORD 'twoje_haslo';
GRANT ALL PRIVILEGES ON DATABASE osiedle_skowronkow TO skowronkow_user;

-- Przełącz się na bazę danych
\c osiedle_skowronkow
```

### 2. Uruchom migrację

```bash
# Uruchom skrypt migracji
psql -d osiedle_skowronkow -f scripts/migrate_to_postgresql.sql
```

### 3. Eksportuj dane z SQLite

```bash
# Zainstaluj psycopg2
pip install psycopg2-binary

# Uruchom eksport
python3 scripts/export_to_postgresql.py
```

### 4. Skonfiguruj zmienne środowiskowe

Utwórz plik `.env.local`:

```bash
# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=osiedle_skowronkow
POSTGRES_USER=postgres
POSTGRES_PASSWORD=twoje_haslo

# Lub jeśli używasz użytkownika skowronkow_user:
# POSTGRES_USER=skowronkow_user
# POSTGRES_PASSWORD=twoje_haslo
```

## 🚀 Uruchomienie aplikacji

```bash
# Uruchom serwer deweloperski
npm run dev

# Aplikacja będzie dostępna pod adresem:
# http://localhost:3000
```

## 🔍 Weryfikacja

### Sprawdź połączenie z bazą:

```bash
# Test połączenia
psql -h localhost -U postgres -d osiedle_skowronkow -c "SELECT COUNT(*) FROM apartments;"
```

### Sprawdź API:

```bash
# Test endpoint API
curl http://localhost:3000/api/blocks
curl http://localhost:3000/api/stats
```

## 🐳 Docker (opcjonalnie)

Jeśli wolisz używać Docker:

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: osiedle_skowronkow
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# Uruchom Docker Compose
docker-compose up -d

# Uruchom migrację
docker exec -i postgres psql -U postgres -d osiedle_skowronkow < scripts/migrate_to_postgresql.sql
```

## 🔧 Rozwiązywanie problemów

### Problem: "connection refused"

```bash
# Sprawdź czy PostgreSQL działa
brew services list | grep postgresql
# lub
sudo systemctl status postgresql

# Uruchom ponownie
brew services restart postgresql@15
# lub
sudo systemctl restart postgresql
```

### Problem: "authentication failed"

```bash
# Sprawdź konfigurację pg_hba.conf
sudo nano /etc/postgresql/15/main/pg_hba.conf

# Dodaj linię dla localhost:
local   all             postgres                                trust
host    all             postgres        127.0.0.1/32            trust

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Problem: "database does not exist"

```sql
-- Sprawdź czy baza istnieje
\l

-- Utwórz bazę jeśli nie istnieje
CREATE DATABASE osiedle_skowronkow;
```

## 📊 Monitoring

### Sprawdź statystyki bazy:

```sql
-- Połącz się z bazą
psql -d osiedle_skowronkow

-- Sprawdź statystyki
SELECT * FROM apartment_stats;
SELECT * FROM get_block_stats(1);
SELECT * FROM get_floor_stats(1);
```

### Sprawdź logi:

```bash
# Logi PostgreSQL
tail -f /var/log/postgresql/postgresql-15-main.log
# lub na macOS
tail -f /opt/homebrew/var/log/postgresql@15.log
```

## 🔒 Bezpieczeństwo

### Zmień domyślne hasło:

```sql
-- Zmień hasło użytkownika postgres
ALTER USER postgres PASSWORD 'nowe_bezpieczne_haslo';
```

### Ogranicz dostęp:

```sql
-- Utwórz użytkownika tylko do odczytu
CREATE USER readonly_user WITH PASSWORD 'haslo_tylko_do_odczytu';
GRANT CONNECT ON DATABASE osiedle_skowronkow TO readonly_user;
GRANT USAGE ON SCHEMA public TO readonly_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;
```

## 📞 Wsparcie

W przypadku problemów:
1. Sprawdź logi PostgreSQL
2. Zweryfikuj konfigurację połączenia
3. Sprawdź uprawnienia użytkownika
4. Skontaktuj się z zespołem deweloperskim
