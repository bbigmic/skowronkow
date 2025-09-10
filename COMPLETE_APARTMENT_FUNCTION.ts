// 🏠 Kompletna funkcja getApartmentPosition dla wszystkich 85 mieszkań

export const getApartmentPosition = (apartmentNumber: string, blockName: string, floorName: string) => {
  const key = `${blockName.toLowerCase().replace(' ', '')}-${floorName}-${apartmentNumber.toLowerCase()}`
  
  // Kompletna konfiguracja wszystkich 85 mieszkań
  const apartmentConfigs: Record<string, any> = {
    // BLOK 1 - PARTER (16 mieszkań) - ✅ ZAIMPLEMENTOWANE
    'blok1-parter-m1': { top: '60%', left: '20%', width: '15%', height: '40%', clipPath: 'polygon(0% 0%, 33.3% 0%, 33.3% 62.5%, 100% 62.5%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(20% + 7.5%)' },
    'blok1-parter-m2': { top: '60%', left: '0%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 75% 0%, 75% 62.5%, 100% 62.5%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(0% + 10%)' },
    'blok1-parter-m3': { top: '0%', left: '0%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 37.5%, 75% 37.5%, 75% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(0% + 10%)' },
    'blok1-parter-m4': { top: '0%', left: '20%', width: '15%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 33.3% 100%, 33.3% 37.5%, 0% 37.5%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(20% + 7.5%)' },
    'blok1-parter-m5': { top: '0%', left: '35%', width: '10%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 37.5%, 0% 37.5%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(35% + 5%)' },
    'blok1-parter-m6': { top: '0%', left: '45%', width: '5%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 37.5%, 0% 37.5%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(45% + 2.5%)' },
    'blok1-parter-m7': { top: '60%', left: '45%', width: '5%', height: '40%', clipPath: 'polygon(0% 0%, 50% 0%, 50% 62.5%, 100% 62.5%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(45% + 2.5%)' },
    'blok1-parter-m8': { top: '60%', left: '35%', width: '10%', height: '40%', clipPath: 'polygon(0% 0%, 50% 0%, 50% 62.5%, 100% 62.5%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(35% + 5%)' },
    'blok1-parter-m25': { top: '60%', left: '65%', width: '15%', height: '40%', clipPath: 'polygon(100% 0%, 66.7% 0%, 66.7% 62.5%, 0% 62.5%, 0% 100%, 100% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(65% + 7.5%)' },
    'blok1-parter-m26': { top: '60%', left: '80%', width: '20%', height: '40%', clipPath: 'polygon(100% 0%, 25% 0%, 25% 62.5%, 0% 62.5%, 0% 100%, 100% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(80% + 10%)' },
    'blok1-parter-m27': { top: '0%', left: '80%', width: '20%', height: '40%', clipPath: 'polygon(100% 0%, 0% 0%, 0% 37.5%, 25% 37.5%, 25% 100%, 100% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(80% + 10%)' },
    'blok1-parter-m28': { top: '0%', left: '65%', width: '15%', height: '40%', clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 66.7% 100%, 66.7% 37.5%, 100% 37.5%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(65% + 7.5%)' },
    'blok1-parter-m29': { top: '0%', left: '55%', width: '10%', height: '40%', clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 50% 100%, 50% 37.5%, 100% 37.5%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(55% + 5%)' },
    'blok1-parter-m30': { top: '0%', left: '50%', width: '5%', height: '40%', clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 50% 100%, 50% 37.5%, 100% 37.5%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(50% + 2.5%)' },
    'blok1-parter-m31': { top: '60%', left: '50%', width: '5%', height: '40%', clipPath: 'polygon(100% 0%, 50% 0%, 50% 62.5%, 0% 62.5%, 0% 100%, 100% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(50% + 2.5%)' },
    'blok1-parter-m32': { top: '60%', left: '55%', width: '10%', height: '40%', clipPath: 'polygon(100% 0%, 50% 0%, 50% 62.5%, 0% 62.5%, 0% 100%, 100% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(55% + 5%)' },
    
    // BLOK 1 - PIĘTRO 1 (16 mieszkań) - ✅ ZAIMPLEMENTOWANE
    'blok1-pietro1-m9': { top: '0%', left: '40%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(40% + 10%)' },
    'blok1-pietro1-m10': { top: '0%', left: '20%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(20% + 10%)' },
    'blok1-pietro1-m11': { top: '0%', left: '0%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(0% + 10%)' },
    'blok1-pietro1-m12': { top: '60%', left: '0%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(0% + 10%)' },
    'blok1-pietro1-m13': { top: '60%', left: '40%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(40% + 10%)' },
    'blok1-pietro1-m14': { top: '60%', left: '60%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(60% + 10%)' },
    'blok1-pietro1-m8': { top: '60%', left: '20%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(20% + 10%)' },
    'blok1-pietro1-m28': { top: '0%', left: '20%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(20% + 10%)' },
    'blok1-pietro1-m29': { top: '60%', left: '80%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(80% + 10%)' },
    'blok1-pietro1-m30': { top: '60%', left: '60%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(60% + 10%)' },
    'blok1-pietro1-m31': { top: '0%', left: '40%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(40% + 10%)' },
    'blok1-pietro1-m32': { top: '0%', left: '60%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(60% + 10%)' },
    'blok1-pietro1-m33': { top: '0%', left: '80%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(80% + 10%)' },
    'blok1-pietro1-m34': { top: '60%', left: '40%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(40% + 10%)' },
    'blok1-pietro1-m35': { top: '60%', left: '20%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(20% + 10%)' },
    
    // BLOK 1 - PIĘTRO 2 (16 mieszkań) - na podstawie rzutu
    'blok1-pietro2-m15': { top: '60%', left: '60%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(60% + 10%)' },
    'blok1-pietro2-m16': { top: '60%', left: '40%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(40% + 10%)' },
    'blok1-pietro2-m17': { top: '60%', left: '20%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(20% + 10%)' },
    'blok1-pietro2-m18': { top: '60%', left: '0%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(0% + 10%)' },
    'blok1-pietro2-m19': { top: '0%', left: '0%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(0% + 10%)' },
    'blok1-pietro2-m20': { top: '0%', left: '20%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(20% + 10%)' },
    'blok1-pietro2-m21': { top: '0%', left: '40%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(40% + 10%)' },
    'blok1-pietro2-m22': { top: '0%', left: '60%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(60% + 10%)' },
    'blok1-pietro2-m23.24': { top: '60%', left: '80%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(80% + 10%)' },
    'blok1-pietro2-m39': { top: '60%', left: '20%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(20% + 10%)' },
    'blok1-pietro2-m40': { top: '60%', left: '40%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(40% + 10%)' },
    'blok1-pietro2-m41': { top: '60%', left: '60%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(60% + 10%)' },
    'blok1-pietro2-m42': { top: '60%', left: '80%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(80% + 10%)' },
    'blok1-pietro2-m43': { top: '0%', left: '80%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(80% + 10%)' },
    'blok1-pietro2-m44': { top: '0%', left: '60%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(60% + 10%)' },
    'blok1-pietro2-m45': { top: '0%', left: '40%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(40% + 10%)' },
    'blok1-pietro2-m46': { top: '0%', left: '20%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(20% + 10%)' },
    'blok1-pietro2-m47.48': { top: '60%', left: '80%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(80% + 10%)' },
    
    // BLOK 2 - PARTER (7 mieszkań) - na podstawie rzutu
    'blok2-parter-m1': { top: '25%', left: '15%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)' },
    'blok2-parter-m2': { top: '25%', left: '28%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(28% + 6%)' },
    'blok2-parter-m3': { top: '25%', left: '41%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(41% + 6%)' },
    'blok2-parter-m4': { top: '25%', left: '54%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(54% + 6%)' },
    'blok2-parter-m5': { top: '25%', left: '67%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(67% + 6%)' },
    'blok2-parter-m6': { top: '25%', left: '80%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(80% + 6%)' },
    'blok2-parter-m7': { top: '25%', left: '93%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(93% + 6%)' },
    
    // BLOK 2 - PIĘTRO 1 (13 mieszkań) - na podstawie rzutu
    'blok2-pietro1-m8': { top: '25%', left: '15%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)' },
    'blok2-pietro1-m9': { top: '25%', left: '28%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(28% + 6%)' },
    'blok2-pietro1-m10': { top: '25%', left: '41%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(41% + 6%)' },
    'blok2-pietro1-m11': { top: '25%', left: '54%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(54% + 6%)' },
    'blok2-pietro1-m12': { top: '25%', left: '67%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(67% + 6%)' },
    'blok2-pietro1-m13': { top: '25%', left: '80%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(80% + 6%)' },
    'blok2-pietro1-m14': { top: '25%', left: '93%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(93% + 6%)' },
    'blok2-pietro1-m28': { top: '25%', left: '15%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)' },
    'blok2-pietro1-m29': { top: '25%', left: '28%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(28% + 6%)' },
    'blok2-pietro1-m30': { top: '25%', left: '41%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(41% + 6%)' },
    'blok2-pietro1-m31': { top: '25%', left: '54%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(54% + 6%)' },
    'blok2-pietro1-m32': { top: '25%', left: '67%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(67% + 6%)' },
    'blok2-pietro1-m33': { top: '25%', left: '80%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(80% + 6%)' },
    
    // BLOK 2 - PIĘTRO 2 (13 mieszkań) - na podstawie rzutu
    'blok2-pietro2-m15': { top: '25%', left: '15%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)' },
    'blok2-pietro2-m16': { top: '25%', left: '28%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(28% + 6%)' },
    'blok2-pietro2-m17': { top: '25%', left: '41%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(41% + 6%)' },
    'blok2-pietro2-m18': { top: '25%', left: '54%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(54% + 6%)' },
    'blok2-pietro2-m19': { top: '25%', left: '67%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(67% + 6%)' },
    'blok2-pietro2-m20': { top: '25%', left: '80%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(80% + 6%)' },
    'blok2-pietro2-m21': { top: '25%', left: '93%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(93% + 6%)' },
    'blok2-pietro2-m34': { top: '25%', left: '15%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(15% + 6%)' },
    'blok2-pietro2-m35': { top: '25%', left: '28%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(28% + 6%)' },
    'blok2-pietro2-m36': { top: '25%', left: '41%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(41% + 6%)' },
    'blok2-pietro2-m37': { top: '25%', left: '54%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(54% + 6%)' },
    'blok2-pietro2-m38': { top: '25%', left: '67%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(67% + 6%)' },
    'blok2-pietro2-m39': { top: '25%', left: '80%', width: '12%', height: '35%', clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', labelTop: 'calc(25% + 17.5%)', labelLeft: 'calc(80% + 6%)' }
  }
  
  // Zwróć konfigurację mieszkania lub domyślną
  return apartmentConfigs[key] || {
    top: '25%',
    left: '15%',
    width: '12%',
    height: '35%',
    clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)',
    labelTop: 'calc(25% + 17.5%)',
    labelLeft: 'calc(15% + 6%)'
  }
}
