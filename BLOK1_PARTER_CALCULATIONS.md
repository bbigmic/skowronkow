# 🏠 Obliczenia Imagemapów - Blok 1 Parter

## 📐 Analiza rzutu parteru Bloku 1

Na podstawie analizy rzutu parteru Bloku 1, obliczono precyzyjne współrzędne `clipPath` dla każdego z 16 mieszkań.

### 🏗️ Struktura budynku:

- **Centralny korytarz** - poziomy korytarz na środku (40%-60% wysokości)
- **Symetria** - lewa i prawa strona są lustrzanym odbiciem
- **16 mieszkań** - 8 po lewej stronie (M1-M8) + 8 po prawej stronie (M25-M32)

### 📊 Współrzędne globalne:

```
Wysokość budynku: 0% - 100%
├── Górna część: 0% - 40%
├── Korytarz: 40% - 60%  
└── Dolna część: 60% - 100%

Szerokość budynku: 0% - 100%
├── Lewa strona: 0% - 50%
└── Prawa strona: 50% - 100%
```

### 🏠 Mieszkania - Lewa strona:

#### **GÓRNA CZĘŚĆ (0% - 40% wysokości):**

**M3** - Lewy górny róg
- **Pozycja**: `top: 0%, left: 0%, width: 20%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od prawej strony (korytarz)
- **clipPath**: `polygon(0% 0%, 100% 0%, 100% 37.5%, 75% 37.5%, 75% 100%, 0% 100%)`
- **Wcięcie**: 37.5% od góry (korytarz), 75% od prawej strony

**M4** - Drugie od lewej
- **Pozycja**: `top: 0%, left: 20%, width: 15%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od prawej strony
- **clipPath**: `polygon(0% 0%, 100% 0%, 100% 100%, 33.3% 100%, 33.3% 37.5%, 0% 37.5%)`

**M5** - Trzecie od lewej
- **Pozycja**: `top: 0%, left: 35%, width: 10%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od prawej strony
- **clipPath**: `polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 37.5%, 0% 37.5%)`

**M6** - Czwarte od lewej
- **Pozycja**: `top: 0%, left: 45%, width: 5%, height: 40%`
- **Kształt**: Wąski prostokąt z wcięciem od prawej strony
- **clipPath**: `polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 37.5%, 0% 37.5%)`

#### **DOLNA CZĘŚĆ (60% - 100% wysokości):**

**M2** - Lewy dolny róg
- **Pozycja**: `top: 60%, left: 0%, width: 20%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od prawej strony (korytarz)
- **clipPath**: `polygon(0% 0%, 75% 0%, 75% 62.5%, 100% 62.5%, 100% 100%, 0% 100%)`
- **Wcięcie**: 62.5% od góry (korytarz), 75% od prawej strony

**M1** - Drugie od lewej (dół)
- **Pozycja**: `top: 60%, left: 20%, width: 15%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od prawej strony
- **clipPath**: `polygon(0% 0%, 33.3% 0%, 33.3% 62.5%, 100% 62.5%, 100% 100%, 0% 100%)`

**M8** - Trzecie od lewej (dół)
- **Pozycja**: `top: 60%, left: 35%, width: 10%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od prawej strony
- **clipPath**: `polygon(0% 0%, 50% 0%, 50% 62.5%, 100% 62.5%, 100% 100%, 0% 100%)`

**M7** - Czwarte od lewej (dół)
- **Pozycja**: `top: 60%, left: 45%, width: 5%, height: 40%`
- **Kształt**: Wąski prostokąt z wcięciem od prawej strony
- **clipPath**: `polygon(0% 0%, 50% 0%, 50% 62.5%, 100% 62.5%, 100% 100%, 0% 100%)`

### 🏠 Mieszkania - Prawa strona (lustrzane odbicie):

#### **GÓRNA CZĘŚĆ (0% - 40% wysokości):**

**M30** - Prawy górny róg (lustro M6)
- **Pozycja**: `top: 0%, left: 50%, width: 5%, height: 40%`
- **Kształt**: Wąski prostokąt z wcięciem od lewej strony
- **clipPath**: `polygon(100% 0%, 0% 0%, 0% 100%, 50% 100%, 50% 37.5%, 100% 37.5%)`

**M29** - Drugie od prawej (góra)
- **Pozycja**: `top: 0%, left: 55%, width: 10%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od lewej strony
- **clipPath**: `polygon(100% 0%, 0% 0%, 0% 100%, 50% 100%, 50% 37.5%, 100% 37.5%)`

**M28** - Trzecie od prawej (góra)
- **Pozycja**: `top: 0%, left: 65%, width: 15%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od lewej strony
- **clipPath**: `polygon(100% 0%, 0% 0%, 0% 100%, 66.7% 100%, 66.7% 37.5%, 100% 37.5%)`

**M27** - Czwarte od prawej (góra)
- **Pozycja**: `top: 0%, left: 80%, width: 20%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od lewej strony
- **clipPath**: `polygon(100% 0%, 0% 0%, 0% 37.5%, 25% 37.5%, 25% 100%, 100% 100%)`

#### **DOLNA CZĘŚĆ (60% - 100% wysokości):**

**M31** - Prawy dolny róg (lustro M7)
- **Pozycja**: `top: 60%, left: 50%, width: 5%, height: 40%`
- **Kształt**: Wąski prostokąt z wcięciem od lewej strony
- **clipPath**: `polygon(100% 0%, 50% 0%, 50% 62.5%, 0% 62.5%, 0% 100%, 100% 100%)`

**M32** - Drugie od prawej (dół)
- **Pozycja**: `top: 60%, left: 55%, width: 10%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od lewej strony
- **clipPath**: `polygon(100% 0%, 50% 0%, 50% 62.5%, 0% 62.5%, 0% 100%, 100% 100%)`

**M25** - Trzecie od prawej (dół)
- **Pozycja**: `top: 60%, left: 65%, width: 15%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od lewej strony
- **clipPath**: `polygon(100% 0%, 66.7% 0%, 66.7% 62.5%, 0% 62.5%, 0% 100%, 100% 100%)`

**M26** - Czwarte od prawej (dół)
- **Pozycja**: `top: 60%, left: 80%, width: 20%, height: 40%`
- **Kształt**: Prostokąt z wcięciem od lewej strony
- **clipPath**: `polygon(100% 0%, 25% 0%, 25% 62.5%, 0% 62.5%, 0% 100%, 100% 100%)`

### 🎯 Kluczowe obliczenia:

#### **Wcięcia korytarza:**
- **Górna część**: 37.5% od góry mieszkania (15% z 40% wysokości)
- **Dolna część**: 62.5% od góry mieszkania (25% z 40% wysokości)

#### **Szerokości wcięć:**
- **M3/M2**: 75% od prawej strony (15% z 20% szerokości)
- **M4/M1**: 33.3% od prawej strony (5% z 15% szerokości)
- **M5/M8**: 50% od prawej strony (5% z 10% szerokości)
- **M6/M7**: 50% od prawej strony (2.5% z 5% szerokości)

#### **Pozycje etykiet:**
- **Góra**: `calc(0% + 20%)` = 20% od góry mieszkania
- **Dół**: `calc(60% + 20%)` = 80% od góry obrazu
- **Lewa/Prawa**: Wyśrodkowane w mieszkaniu

### ✅ **Wynik:**
Wszystkie 16 mieszkań na parterze Bloku 1 ma teraz precyzyjnie dopasowane kształty odpowiadające rzeczywistemu rzutowi architektonicznemu!

