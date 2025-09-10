# 🏠 Konfiguracja Imagemapów dla Mieszkań

## 📋 Instrukcja dodawania konfiguracji mieszkań

Aby dodać precyzyjne kształty dla każdego mieszkania, należy rozszerzyć funkcję `getApartmentPosition()` w pliku `OfferDatabase.tsx`.

### 🔧 Format konfiguracji

```typescript
case 'blok1-parter-m1':
  return {
    top: '25%',           // Pozycja od góry
    left: '15%',          // Pozycja od lewej
    width: '12%',         // Szerokość
    height: '35%',        // Wysokość
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', // Kształt
    labelTop: 'calc(25% + 17.5%)',    // Pozycja etykiety - góra
    labelLeft: 'calc(15% + 6%)'       // Pozycja etykiety - lewa
  }
```

### 📐 Przykłady kształtów

#### Prostokąt standardowy:
```typescript
clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
```

#### Prostokąt z zaokrąglonymi rogami:
```typescript
clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
```

#### Trójkąt:
```typescript
clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
```

#### Pięciokąt:
```typescript
clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
```

#### Nieregularny kształt (przykład):
```typescript
clipPath: 'polygon(10% 20%, 30% 10%, 60% 15%, 80% 25%, 85% 60%, 70% 80%, 40% 85%, 15% 70%, 5% 50%)'
```

### 🏢 Kompletna konfiguracja dla wszystkich mieszkań

#### BLOK 1 - PARTER (M1-M6)
```typescript
// M1
case 'blok1-parter-m1':
  return {
    top: '25%', left: '15%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)'
  }

// M2
case 'blok1-parter-m2':
  return {
    top: '25%', left: '28%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(28% + 6%)'
  }

// M3
case 'blok1-parter-m3':
  return {
    top: '25%', left: '41%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(41% + 6%)'
  }

// M4
case 'blok1-parter-m4':
  return {
    top: '25%', left: '54%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(54% + 6%)'
  }

// M5
case 'blok1-parter-m5':
  return {
    top: '25%', left: '67%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(67% + 6%)'
  }

// M6
case 'blok1-parter-m6':
  return {
    top: '25%', left: '80%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(80% + 6%)'
  }
```

#### BLOK 1 - PIĘTRO 1 (M9-M16, M33-M40)
```typescript
// M9
case 'blok1-pietro1-m9':
  return {
    top: '25%', left: '15%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)'
  }

// M10
case 'blok1-pietro1-m10':
  return {
    top: '25%', left: '28%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(28% + 6%)'
  }

// ... i tak dalej dla M11-M16, M33-M40
```

#### BLOK 1 - PIĘTRO 2 (M17-M24, M41-M48)
```typescript
// M17
case 'blok1-pietro2-m17':
  return {
    top: '25%', left: '15%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)'
  }

// ... i tak dalej dla M18-M24, M41-M48
```

#### BLOK 2 - PARTER (M1-M7)
```typescript
// M1
case 'blok2-parter-m1':
  return {
    top: '25%', left: '15%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)'
  }

// ... i tak dalej dla M2-M7
```

#### BLOK 2 - PIĘTRO 1 (M8-M14, M28-M33)
```typescript
// M8
case 'blok2-pietro1-m8':
  return {
    top: '25%', left: '15%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)'
  }

// ... i tak dalej dla M9-M14, M28-M33
```

#### BLOK 2 - PIĘTRO 2 (M15-M21, M34-M39)
```typescript
// M15
case 'blok2-pietro2-m15':
  return {
    top: '25%', left: '15%', width: '12%', height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
    labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)'
  }

// ... i tak dalej dla M16-M21, M34-M39
```

### 🎯 Jak dodać nowe mieszkanie

1. **Otwórz plik** `app/components/OfferDatabase.tsx`
2. **Znajdź funkcję** `getApartmentPosition()`
3. **Dodaj nowy case** w formacie: `'blok1-parter-mX'`
4. **Ustaw pozycję** na podstawie rzeczywistego rzutu
5. **Dopasuj kształt** używając `clipPath`

### 📏 Narzędzia do tworzenia kształtów

#### Online Polygon Generator:
- [CSS Clip-Path Generator](https://bennettfeely.com/clippy/)
- [CSS Polygon Generator](https://css-tricks.com/examples/ShapesOfCSS/)

#### Jak używać:
1. Otwórz generator
2. Narysuj kształt mieszkania na rzucie
3. Skopiuj wygenerowany `clip-path`
4. Wklej do konfiguracji

### 🔍 Przykład nieregularnego mieszkania

```typescript
case 'blok1-parter-m25':
  return {
    top: '20%',
    left: '30%',
    width: '15%',
    height: '40%',
    clipPath: 'polygon(10% 20%, 30% 10%, 60% 15%, 80% 25%, 85% 60%, 70% 80%, 40% 85%, 15% 70%, 5% 50%)',
    labelTop: 'calc(20% + 20%)',
    labelLeft: 'calc(30% + 7.5%)'
  }
```

### ⚡ Automatyzacja

Można stworzyć skrypt Python, który:
1. Analizuje pliki PDF z rzutami
2. Automatycznie generuje współrzędne
3. Tworzy konfigurację TypeScript

### 📝 Notatki

- **Pozycje** są w procentach względem obrazu
- **Kształty** muszą być zamknięte (pierwszy punkt = ostatni punkt)
- **Etykiety** powinny być wyśrodkowane na mieszkaniu
- **Testuj** na różnych rozmiarach ekranu

---

**💡 Wskazówka:** Zacznij od kilku mieszkań, przetestuj, a potem dodawaj pozostałe systematycznie.
