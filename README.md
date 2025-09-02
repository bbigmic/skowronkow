# Osiedle Skowronków - Strona Sprzedażowa

Nowoczesna strona internetowa do sprzedaży mieszkań w Osiedlu Skowronków, zbudowana z wykorzystaniem Next.js 14, TypeScript i Tailwind CSS.

## ✨ Funkcjonalności

- **Responsywna karuzela Hero** z automatycznym przełączaniem i efektem zoom
- **Interaktywna sekcja oferty** z imagemap do nawigacji między blokami, piętrami i mieszkaniami
- **Galeria ze zdjęciami** z lightbox i nawigacją
- **Formularz kontaktowy** z walidacją
- **Optymalizacja obrazów** AVIF/WebP dla najszybszego ładowania
- **Animacje i mikrointerakcje** dla lepszego UX
- **W pełni responsywny design** desktop/tablet/mobile

## 🚀 Technologie

- **Next.js 14** - Framework React z optymalizacją obrazów
- **TypeScript** - Typowanie statyczne
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animacje (gotowe do implementacji)
- **Lucide React** - Ikony
- **Embla Carousel** - Karuzela (gotowa do implementacji)

## 📁 Struktura

```
osiedle-skowronkow/
├── app/
│   ├── components/
│   │   ├── Navigation.tsx    # Nawigacja z smooth scroll
│   │   ├── Hero.tsx          # Karuzela z 3 zdjęciami
│   │   ├── About.tsx         # O inwestycji
│   │   ├── Location.tsx      # Lokalizacja
│   │   ├── Offer.tsx         # Kompleksowa oferta z imagemap
│   │   ├── Gallery.tsx       # Galeria ze zdjęciami W1-W9
│   │   └── Contact.tsx       # Formularz kontaktowy
│   ├── globals.css           # Style globalne
│   ├── layout.tsx            # Layout aplikacji
│   └── page.tsx              # Strona główna
├── images/                   # Wszystkie zdjęcia i imagemap
└── public/                   # Zasoby publiczne
```

## 🛠️ Instalacja i uruchomienie

### 1. Zainstaluj zależności
```bash
npm install
```

### 2. Uruchom serwer deweloperski
```bash
npm run dev
```

### 3. Otwórz w przeglądarce
```
http://localhost:3000
```

### 4. Build produkcyjny
```bash
npm run build
npm start
```

## 🎨 Sekcje strony

### Hero
- Karuzela z 3 zdjęciami (hero1.avif, hero2.avif, hero3.avif)
- Animacja zoom na zdjęciach
- Automatyczne przełączanie co 6 sekund
- Nawigacja strzałkami i kropkami

### O inwestycji
- Opis osiedla z korzyściami
- Grid z funkcjonalnościami
- Responsywny layout z obrazem

### Lokalizacja
- Informacje o lokalizacji
- Czasy dojazdu
- Placeholder na mapę

### Oferta (Imagemap)
**Flow nawigacji:**
1. Mapa osiedla → wybór bloku (Blok 1/2)
2. Mapa bloku → wybór piętra (Parter/Piętro 1/Piętro 2/Piwnica)
3. Rzut piętra → wybór mieszkania
4. Karta mieszkania z PDF-ami

**Struktura plików:**
- `oferta-osiedle-imagemap.avif` - główna mapa
- `blok1/blok1-imagemap.avif` - mapa bloku 1
- `blok2/blok2-imagemap.avif` - mapa bloku 2
- Rzuty pięter z imagemap do wyboru mieszkań
- PDF-y mieszkań i komórek

### Galeria
- Zdjęcia W1-W9 RAW.avif
- Lightbox z nawigacją
- Responsywny grid

### Kontakt
- Formularz z walidacją
- Informacje kontaktowe
- Placeholder na mapę

## 🔧 Optymalizacje

### Obrazy
- Format AVIF dla najlepszej kompresji
- Responsive images z Next.js Image
- Lazy loading
- Optymalne rozmiary dla różnych urządzeń

### Performance
- Critical CSS inline
- Kompresja gzip
- Prefetching
- Code splitting

### SEO
- Meta tagi
- Open Graph
- Structured data ready
- Semantic HTML

## 📱 Responsywność

Strona jest w pełni responsywna z breakpointami:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large: 1280px+

## 🗺️ Konfiguracja mapy Google Maps

Aby wyświetlić interaktywną mapę w sekcji kontaktowej:

1. **Utwórz plik `.env.local`** w głównym katalogu projektu
2. **Skopiuj zawartość** z pliku `.env.local.example`
3. **Uzyskaj klucz API Google Maps:**
   - Przejdź do [Google Cloud Console](https://console.cloud.google.com/)
   - Utwórz nowy projekt lub wybierz istniejący
   - Włącz **Maps JavaScript API**
   - Utwórz klucz API w sekcji "Credentials"
   - Skopiuj klucz i wklej do `.env.local`
4. **Uruchom ponownie** serwer deweloperski

```bash
# Przykład pliku .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🎯 TODO dla dalszego rozwoju

- [x] ~~Dodanie map Google/OpenStreetMap~~ ✅ **Zaimplementowane**
- [ ] Implementacja prawdziwych imagemap z współrzędnymi
- [ ] Integracja z CMS dla treści
- [ ] System zarządzania dostępnością mieszkań
- [ ] Integracja z systemem CRM
- [ ] Testy automatyczne
- [ ] Optymalizacja SEO
- [ ] Analytics i tracking

## 📞 Wsparcie

W przypadku pytań technicznych lub potrzeby modyfikacji, skontaktuj się z zespołem deweloperskim.

---

**Uwaga:** Przed uruchomieniem upewnij się, że wszystkie zdjęcia są umieszczone w folderze `public/images/` zgodnie ze strukturą projektu. 