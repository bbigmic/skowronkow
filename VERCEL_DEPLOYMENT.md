# Instrukcje deploymentu na Vercel z PostgreSQL

## Zmiany wprowadzone dla migracji z SQLite na PostgreSQL

### 1. Zaktualizowane pliki

- **`.env`** - dodano `DATABASE_URL` z connection string do PostgreSQL
- **`package.json`** - usunięto `better-sqlite3` i `sqlite3`, dodano `pg` i `@types/pg`
- **`lib/database.ts`** - całkowicie przepisano na PostgreSQL z `pg` library
- **Wszystkie API routes** - zaktualizowano aby używały `async/await`

### 2. Konfiguracja Vercel

#### Environment Variables w Vercel Dashboard:

1. Przejdź do projektu w Vercel Dashboard
2. Idź do Settings → Environment Variables
3. Dodaj następujące zmienne:

```
DATABASE_URL=postgresql://neondb_owner:npg_H0t5EIkGZPTQ@ep-silent-cake-a2fs3hh1-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDJSzhPX9d3_6B0yeW6rPcwJ_0SWV3X2_I
SMTP_SERVER=s134.cyber-folks.pl
SMTP_PORT=587
EMAIL_USER=skowronkow@grupaborys.com
EMAIL_PASS=Skowronkow!@3456
```

### 3. Instalacja dependencies

Po push do repozytorium, Vercel automatycznie zainstaluje nowe dependencies:
- `pg` - PostgreSQL client
- `@types/pg` - TypeScript types

### 4. Migracja danych

Upewnij się, że dane z SQLite zostały już zaimportowane do PostgreSQL używając skryptów z folderu `scripts/`.

### 5. Testowanie

Po deployment sprawdź:
- [ ] Strona główna ładuje się poprawnie
- [ ] API endpoints zwracają dane (sprawdź `/api/blocks`, `/api/apartments`, `/api/stats`)
- [ ] Komponent oferty mieszkań działa poprawnie
- [ ] Brak błędów w konsoli przeglądarki

### 6. Różnice w działaniu

- **Połączenia**: PostgreSQL używa connection pooling zamiast pojedynczego pliku SQLite
- **Performance**: Lepsze performance dla większej liczby użytkowników
- **Skalowalność**: PostgreSQL lepiej skaluje się w środowisku chmurowym
- **Backup**: Automatyczne backupy w Neon

### 7. Monitoring

Monitoruj:
- Logi Vercel dla błędów połączenia z bazą danych
- Performance API endpoints
- Zużycie zasobów w Neon dashboard
