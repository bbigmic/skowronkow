// 🏠 Rozszerzona konfiguracja imagemapów dla mieszkań
// Ten plik zawiera przykłady różnych kształtów mieszkań

export const getApartmentPosition = (apartmentNumber: string, blockName: string, floorName: string) => {
  const key = `${blockName.toLowerCase().replace(' ', '')}-${floorName}-${apartmentNumber.toLowerCase()}`
  
  switch (key) {
    // BLOK 1 - PARTER - z różnymi kształtami
    case 'blok1-parter-m1':
      return {
        top: '25%',
        left: '15%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)', // Prostokąt z zaokrąglonymi rogami
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(15% + 6%)'
      }
    
    case 'blok1-parter-m2':
      return {
        top: '25%',
        left: '28%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Standardowy prostokąt
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(28% + 6%)'
      }
    
    case 'blok1-parter-m3':
      return {
        top: '25%',
        left: '41%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)', // Sześciokąt
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(41% + 6%)'
      }
    
    case 'blok1-parter-m4':
      return {
        top: '25%',
        left: '54%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // Pięciokąt
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(54% + 6%)'
      }
    
    case 'blok1-parter-m5':
      return {
        top: '25%',
        left: '67%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 80% 100%, 0% 100%)', // Trapez
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(67% + 6%)'
      }
    
    case 'blok1-parter-m6':
      return {
        top: '25%',
        left: '80%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(10% 20%, 30% 10%, 60% 15%, 80% 25%, 85% 60%, 70% 80%, 40% 85%, 15% 70%, 5% 50%)', // Nieregularny
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(80% + 6%)'
      }
    
    // BLOK 1 - PIĘTRO 1 - przykłady
    case 'blok1-pietro1-m9':
      return {
        top: '25%',
        left: '15%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(15% + 6%)'
      }
    
    case 'blok1-pietro1-m10':
      return {
        top: '25%',
        left: '28%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(28% + 6%)'
      }
    
    case 'blok1-pietro1-m11':
      return {
        top: '25%',
        left: '41%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(41% + 6%)'
      }
    
    case 'blok1-pietro1-m12':
      return {
        top: '25%',
        left: '54%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(54% + 6%)'
      }
    
    case 'blok1-pietro1-m13':
      return {
        top: '25%',
        left: '67%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(67% + 6%)'
      }
    
    case 'blok1-pietro1-m14':
      return {
        top: '25%',
        left: '80%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(80% + 6%)'
      }
    
    // BLOK 1 - PIĘTRO 2 - przykłady
    case 'blok1-pietro2-m17':
      return {
        top: '25%',
        left: '15%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(15% + 6%)'
      }
    
    case 'blok1-pietro2-m18':
      return {
        top: '25%',
        left: '28%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(28% + 6%)'
      }
    
    case 'blok1-pietro2-m19':
      return {
        top: '25%',
        left: '41%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(41% + 6%)'
      }
    
    case 'blok1-pietro2-m20':
      return {
        top: '25%',
        left: '54%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(54% + 6%)'
      }
    
    case 'blok1-pietro2-m21':
      return {
        top: '25%',
        left: '67%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(67% + 6%)'
      }
    
    case 'blok1-pietro2-m22':
      return {
        top: '25%',
        left: '80%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(80% + 6%)'
      }
    
    // BLOK 2 - PARTER - przykłady
    case 'blok2-parter-m1':
      return {
        top: '25%',
        left: '15%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(15% + 6%)'
      }
    
    case 'blok2-parter-m2':
      return {
        top: '25%',
        left: '28%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(28% + 6%)'
      }
    
    case 'blok2-parter-m3':
      return {
        top: '25%',
        left: '41%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(41% + 6%)'
      }
    
    case 'blok2-parter-m4':
      return {
        top: '25%',
        left: '54%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(54% + 6%)'
      }
    
    case 'blok2-parter-m5':
      return {
        top: '25%',
        left: '67%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(67% + 6%)'
      }
    
    case 'blok2-parter-m6':
      return {
        top: '25%',
        left: '80%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(80% + 6%)'
      }
    
    case 'blok2-parter-m7':
      return {
        top: '25%',
        left: '93%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(93% + 6%)'
      }
    
    // BLOK 2 - PIĘTRO 1 - przykłady
    case 'blok2-pietro1-m8':
      return {
        top: '25%',
        left: '15%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(15% + 6%)'
      }
    
    case 'blok2-pietro1-m9':
      return {
        top: '25%',
        left: '28%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(28% + 6%)'
      }
    
    case 'blok2-pietro1-m10':
      return {
        top: '25%',
        left: '41%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(41% + 6%)'
      }
    
    case 'blok2-pietro1-m11':
      return {
        top: '25%',
        left: '54%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(54% + 6%)'
      }
    
    case 'blok2-pietro1-m12':
      return {
        top: '25%',
        left: '67%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(67% + 6%)'
      }
    
    case 'blok2-pietro1-m13':
      return {
        top: '25%',
        left: '80%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(80% + 6%)'
      }
    
    case 'blok2-pietro1-m14':
      return {
        top: '25%',
        left: '93%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(93% + 6%)'
      }
    
    // BLOK 2 - PIĘTRO 2 - przykłady
    case 'blok2-pietro2-m15':
      return {
        top: '25%',
        left: '15%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(15% + 6%)'
      }
    
    case 'blok2-pietro2-m16':
      return {
        top: '25%',
        left: '28%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(28% + 6%)'
      }
    
    case 'blok2-pietro2-m17':
      return {
        top: '25%',
        left: '41%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(41% + 6%)'
      }
    
    case 'blok2-pietro2-m18':
      return {
        top: '25%',
        left: '54%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(54% + 6%)'
      }
    
    case 'blok2-pietro2-m19':
      return {
        top: '25%',
        left: '67%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(67% + 6%)'
      }
    
    case 'blok2-pietro2-m20':
      return {
        top: '25%',
        left: '80%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(80% + 6%)'
      }
    
    case 'blok2-pietro2-m21':
      return {
        top: '25%',
        left: '93%',
        width: '12%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(93% + 6%)'
      }
    
    // Domyślna konfiguracja dla pozostałych mieszkań
    default:
      return {
        top: '25%',
        left: '15%',
        width: '10%',
        height: '35%',
        clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)',
        labelTop: 'calc(25% + 17.5%)',
        labelLeft: 'calc(15% + 5%)'
      }
  }
}

// 🎨 Przykłady różnych kształtów mieszkań
export const apartmentShapes = {
  // Standardowe kształty
  rectangle: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  roundedRectangle: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
  
  // Kształty geometryczne
  triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  pentagon: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
  hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  octagon: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
  
  // Kształty nieregularne
  trapezoid: 'polygon(0% 0%, 100% 0%, 100% 70%, 80% 100%, 0% 100%)',
  lShape: 'polygon(0% 0%, 60% 0%, 60% 60%, 100% 60%, 100% 100%, 0% 100%)',
  uShape: 'polygon(0% 0%, 100% 0%, 100% 100%, 80% 100%, 80% 40%, 20% 40%, 20% 100%, 0% 100%)',
  
  // Kształty zaokrąglone
  roundedTop: 'polygon(0% 20%, 20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%)',
  roundedBottom: 'polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 20% 100%, 0% 80%)',
  roundedLeft: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 80%, 20% 80%)',
  roundedRight: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 0% 100%)',
  
  // Kształty nieregularne (przykłady)
  irregular1: 'polygon(10% 20%, 30% 10%, 60% 15%, 80% 25%, 85% 60%, 70% 80%, 40% 85%, 15% 70%, 5% 50%)',
  irregular2: 'polygon(0% 30%, 20% 0%, 50% 10%, 80% 0%, 100% 20%, 90% 50%, 100% 80%, 70% 100%, 30% 90%, 0% 70%)',
  irregular3: 'polygon(15% 0%, 35% 15%, 55% 5%, 75% 20%, 85% 45%, 70% 70%, 45% 85%, 20% 75%, 5% 50%, 0% 25%)'
}

// 📏 Przykłady pozycjonowania
export const positioningExamples = {
  // Rząd 1 (góra)
  row1: {
    left: '15%',
    top: '25%'
  },
  // Rząd 2 (środek)
  row2: {
    left: '15%',
    top: '45%'
  },
  // Rząd 3 (dół)
  row3: {
    left: '15%',
    top: '65%'
  },
  // Kolumny
  col1: { left: '15%' },
  col2: { left: '28%' },
  col3: { left: '41%' },
  col4: { left: '54%' },
  col5: { left: '67%' },
  col6: { left: '80%' },
  col7: { left: '93%' }
}
