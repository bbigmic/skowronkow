'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, Home, FileText, Download, MapPin, Square } from 'lucide-react'
import { useBlocks, useBlock, useFloor, useApartment, useStats } from '@/lib/hooks/useDatabase'

/*
 * INSTRUKCJA DODAWANIA NOWYCH BLOKÓW, PIĘTER I MIESZKAŃ:
 * 
 * 1. DODAWANIE NOWEGO BLOKU:
 *    - W funkcji getBlockPosition() dodaj nowy case dla nazwy bloku
 *    - Ustaw: top, left, width, height, clipPath, labelTop, labelLeft, infoTop, infoLeft
 *    - clipPath format: 'polygon(x1% y1%, x2% y2%, x3% y3%, ...)'
 *    - Przykład: 'polygon(0% 0%, 50% 0%, 100% 50%, 50% 100%, 0% 50%)' - pięciokąt
 * 
 * 2. DODAWANIE NOWEGO PIĘTRA:
 *    - W funkcji getFloorPosition() dodaj nowy case dla nazwy piętra w odpowiednim bloku
 *    - Ustaw: top, left, width, height, clipPath
 *    - Każdy blok ma osobną konfigurację pięter
 *    - Można dodać więcej wierzchołków w clipPath dla niestandardowych kształtów
 * 
 * 3. DODAWANIE NOWEGO MIESZKANIA:
 *    - W funkcji getApartmentPosition() dodaj nowy case dla numeru mieszkania
 *    - Ustaw: top, left, width, height, clipPath, labelTop, labelLeft
 *    - Każde mieszkanie ma precyzyjnie dopasowany kształt do rzutu
 *    - Format: 'blok1-parter-M1', 'blok2-pietro1-M15', itp.
 * 
 * 4. PRZYKŁADY KSZTAŁTÓW:
 *    - Prostokąt: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
 *    - Trójkąt: 'polygon(50% 0%, 0% 100%, 100% 100%)'
 *    - Pięciokąt: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
 *    - Sześciokąt: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
 *    - Nieregularny: 'polygon(10% 20%, 30% 10%, 60% 15%, 80% 25%, 85% 60%, 70% 80%, 40% 85%, 15% 70%, 5% 50%)'
 */

interface Apartment {
  id: number
  apartment_number: string
  area: number
  rooms: number
  floor_name: string
  block_name: string
  pdf_path: string | null
  storage_pdf_path: string | null
  price: number | null
  status: string
}

const OfferDatabase = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'block' | 'floor' | 'apartment'>('overview')
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null)
  const [selectedFloorId, setSelectedFloorId] = useState<number | null>(null)
  const [selectedApartmentId, setSelectedApartmentId] = useState<number | null>(null)

  // Pobieramy dane z API
  const { blocks, loading: blocksLoading } = useBlocks()
  const { block, floors, apartments: blockApartments, stats: blockStats, loading: blockLoading } = useBlock(selectedBlockId || 0)
  const { floor, apartments: floorApartments, stats: floorStats, loading: floorLoading } = useFloor(selectedFloorId || 0)
  const { apartment, storageRooms, loading: apartmentLoading } = useApartment(selectedApartmentId || 0)
  const { stats: globalStats, loading: statsLoading } = useStats()

  const getImagePath = () => {
    try {
      if (currentView === 'overview') {
        return '/images/imagemaps_apartments_structure/oferta-osiedle-imagemap.avif'
      }
      if (currentView === 'block' && block) {
        const blockName = block.name.toLowerCase().replace(' ', '')
        return `/images/imagemaps_apartments_structure/${blockName}/${blockName}-imagemap.avif`
      }
      if (currentView === 'floor' && floor && block) {
        const blockName = block.name.toLowerCase().replace(' ', '')
        const floorName = floor.floor_name
        if (floorName === 'piwnica') {
          return `/images/imagemaps_apartments_structure/${blockName}/${floorName}/rzut-${blockName}-piwnica.avif`
        }
        return `/images/imagemaps_apartments_structure/${blockName}/${floorName}/rzut-${blockName}-${floorName}-imagemap.avif`
      }
      return '/images/imagemaps_apartments_structure/oferta-osiedle-imagemap.avif'
    } catch (error) {
      console.error('Error generating image path:', error)
      return '/images/imagemaps_apartments_structure/oferta-osiedle-imagemap.avif'
    }
  }

  const handleBlockSelect = (blockId: number) => {
    setSelectedBlockId(blockId)
    setCurrentView('block')
    setSelectedFloorId(null)
    setSelectedApartmentId(null)
  }

  const handleFloorSelect = (floorId: number) => {
    setSelectedFloorId(floorId)
    setCurrentView('floor')
    setSelectedApartmentId(null)
  }

  const handleApartmentSelect = (apartmentId: number) => {
    setSelectedApartmentId(apartmentId)
    setCurrentView('apartment')
  }

  const goBack = () => {
    if (currentView === 'apartment') {
      setCurrentView('floor')
      setSelectedApartmentId(null)
    } else if (currentView === 'floor') {
      setCurrentView('block')
      setSelectedFloorId(null)
    } else if (currentView === 'block') {
      setCurrentView('overview')
      setSelectedBlockId(null)
    }
  }

  const getBreadcrumb = () => {
    const parts = ['Inwestycja']
    
    // Używamy aktualnego stanu zamiast danych z hooków
    if (currentView === 'block' || currentView === 'floor' || currentView === 'apartment') {
      if (selectedBlockId && block) {
        parts.push(block.name)
      }
    }
    
    if (currentView === 'floor' || currentView === 'apartment') {
      if (selectedFloorId && floor) {
        parts.push(getFloorName(floor.floor_name))
      }
    }
    
    if (currentView === 'apartment') {
      if (selectedApartmentId && apartment) {
        parts.push(apartment.apartment_number)
      }
    }
    
    return parts.join(' / ')
  }

  const getFloorName = (floorName: string) => {
    switch (floorName) {
      case 'parter': return 'Parter'
      case 'pietro1': return 'Piętro 1'
      case 'pietro2': return 'Piętro 2'
      case 'piwnica': return 'Piwnica'
      default: return floorName
    }
  }

  const getStatsForCurrentView = () => {
    if (currentView === 'overview' && globalStats) {
      return [
        { value: `${globalStats.total}`, label: 'Mieszkań' },
        { value: '1-5', label: 'Pokoje' },
        { value: `${Math.floor(globalStats.minArea)}-${Math.ceil(globalStats.maxArea)}`, label: 'm² powierzchni' },
        { value: blocks.length.toString(), label: 'Bloki mieszkalne' }
      ]
    } else if (currentView === 'block' && blockStats) {
      return [
        { value: blockStats.total.toString(), label: 'Mieszkań w bloku' },
        { value: floors.length.toString(), label: 'Pięter' },
        { value: `${Math.floor(blockStats.minArea)}-${Math.ceil(blockStats.maxArea)}`, label: 'm² powierzchni' },
        { value: `${Math.round(blockStats.minPrice / 1000)}-${Math.round(blockStats.maxPrice / 1000)}k`, label: 'Cena (tys. zł)' }
      ]
    } else if (currentView === 'apartment' && apartment) {
      return [
        { value: apartment.area.toString(), label: 'Powierzchnia (m²)' },
        { value: apartment.rooms.toString(), label: 'Pokoje' },
        { value: getFloorName(apartment.floor_name || ''), label: 'Piętro' },
        { value: apartment.block_name || '', label: 'Blok' }
      ]
    }

    // Fallback
    return [
      { value: '85/87', label: 'Mieszkań dostępnych' },
      { value: '1-5', label: 'Pokoje' },
      { value: '25-82', label: 'm² powierzchni' },
      { value: '2', label: 'Bloki mieszkalne' }
    ]
  }

  // Synchronizacja hover efektów między kształtami a etykietami
  useEffect(() => {
    if (currentView === 'overview') {
      const cleanupFunctions: (() => void)[] = []
      
      blocks.forEach((block, index) => {
        const blockId = `block-${block.id}-shape`
        const labelId = `block-${block.id}-label`
        const dateLabelId = `block-${block.id}-date-label`
        
        const blockShape = document.getElementById(blockId)
        const blockLabel = document.getElementById(labelId)
        const blockDateLabel = document.getElementById(dateLabelId)

        // Funkcje do zarządzania stanem hover
        const setBlockHover = (isHovered: boolean) => {
          if (blockShape) {
            if (isHovered) {
              blockShape.classList.add('bg-primary-500/40')
              blockShape.classList.remove('bg-primary-500/20')
            } else {
              blockShape.classList.remove('bg-primary-500/40')
              blockShape.classList.add('bg-primary-500/20')
            }
          }
          
          // Synchronizacja z etykietą bloku
          if (blockLabel) {
            const labelDiv = blockLabel.querySelector('div')
            if (labelDiv) {
              if (isHovered) {
                labelDiv.classList.add('scale-110')
              } else {
                labelDiv.classList.remove('scale-110')
              }
            }
          }
          
          // Synchronizacja z etykietą daty
          if (blockDateLabel) {
            const dateDiv = blockDateLabel.querySelector('div')
            if (dateDiv) {
              if (isHovered) {
                dateDiv.classList.add('bg-white', 'shadow-md', 'scale-105')
                dateDiv.classList.remove('bg-white/80', 'shadow-sm')
              } else {
                dateDiv.classList.remove('bg-white', 'shadow-md', 'scale-105')
                dateDiv.classList.add('bg-white/80', 'shadow-sm')
              }
            }
          }
        }

        // Event listeners dla kształtu
        if (blockShape) {
          const shapeEnterHandler = () => setBlockHover(true)
          const shapeLeaveHandler = () => setBlockHover(false)
          blockShape.addEventListener('mouseenter', shapeEnterHandler)
          blockShape.addEventListener('mouseleave', shapeLeaveHandler)
          
          cleanupFunctions.push(() => {
            blockShape.removeEventListener('mouseenter', shapeEnterHandler)
            blockShape.removeEventListener('mouseleave', shapeLeaveHandler)
          })
        }

        // Event listeners dla etykiety
        if (blockLabel) {
          const labelEnterHandler = () => setBlockHover(true)
          const labelLeaveHandler = () => setBlockHover(false)
          blockLabel.addEventListener('mouseenter', labelEnterHandler)
          blockLabel.addEventListener('mouseleave', labelLeaveHandler)
          
          cleanupFunctions.push(() => {
            blockLabel.removeEventListener('mouseenter', labelEnterHandler)
            blockLabel.removeEventListener('mouseleave', labelLeaveHandler)
          })
        }

        // Event listeners dla etykiety daty
        if (blockDateLabel) {
          const dateEnterHandler = () => setBlockHover(true)
          const dateLeaveHandler = () => setBlockHover(false)
          blockDateLabel.addEventListener('mouseenter', dateEnterHandler)
          blockDateLabel.addEventListener('mouseleave', dateLeaveHandler)
          
          cleanupFunctions.push(() => {
            blockDateLabel.removeEventListener('mouseenter', dateEnterHandler)
            blockDateLabel.removeEventListener('mouseleave', dateLeaveHandler)
          })
        }
      })

      return () => {
        cleanupFunctions.forEach(cleanup => cleanup())
      }
    } else if (currentView === 'block' && block) {
      // Synchronizacja hover dla pięter - podobnie jak dla bloków
      const cleanupFunctions: (() => void)[] = []
      
      floors.forEach((floor, index) => {
        const shapeId = `floor-${floor.id}-shape`
        const labelId = `floor-${floor.id}-label`
        
        const shape = document.getElementById(shapeId)
        const label = document.getElementById(labelId)

        // Funkcje do zarządzania stanem hover
        const setFloorHover = (isHovered: boolean) => {
          if (shape) {
            if (isHovered) {
              shape.classList.add('bg-primary-500/40')
              shape.classList.remove('bg-primary-500/20')
            } else {
              shape.classList.remove('bg-primary-500/40')
              shape.classList.add('bg-primary-500/20')
            }
          }
          
          // Synchronizacja z etykietą piętra
          if (label) {
            const labelDiv = label.querySelector('div')
            if (labelDiv) {
              if (isHovered) {
                labelDiv.classList.add('scale-110')
              } else {
                labelDiv.classList.remove('scale-110')
              }
            }
          }
          
        }

        // Event listeners dla kształtu
        if (shape) {
          const shapeEnterHandler = () => setFloorHover(true)
          const shapeLeaveHandler = () => setFloorHover(false)
          shape.addEventListener('mouseenter', shapeEnterHandler)
          shape.addEventListener('mouseleave', shapeLeaveHandler)
          
          cleanupFunctions.push(() => {
            shape.removeEventListener('mouseenter', shapeEnterHandler)
            shape.removeEventListener('mouseleave', shapeLeaveHandler)
          })
        }

        // Event listeners dla etykiety
        if (label) {
          const labelEnterHandler = () => setFloorHover(true)
          const labelLeaveHandler = () => setFloorHover(false)
          label.addEventListener('mouseenter', labelEnterHandler)
          label.addEventListener('mouseleave', labelLeaveHandler)
          
          cleanupFunctions.push(() => {
            label.removeEventListener('mouseenter', labelEnterHandler)
            label.removeEventListener('mouseleave', labelLeaveHandler)
          })
        }

      })

      return () => {
        cleanupFunctions.forEach(cleanup => cleanup())
      }
    } else if (currentView === 'floor' && floor) {
      // Synchronizacja hover dla mieszkań
      const cleanupFunctions: (() => void)[] = []
      
      floorApartments.forEach(apartment => {
        const shapeId = `apartment-${apartment.id}-shape`
        const labelId = `apartment-${apartment.id}-label`
        
        const shape = document.getElementById(shapeId)
        const label = document.getElementById(labelId)
        
        if (shape && label) {
          const setHover = (isHovered: boolean) => {
            if (isHovered) {
              shape.classList.add('bg-primary-500/40')
              shape.classList.remove('bg-primary-500/20')
              // Skaluj etykietę
              label.classList.add('scale-110')
            } else {
              shape.classList.remove('bg-primary-500/40')
              shape.classList.add('bg-primary-500/20')
              // Usuń skalowanie etykiety
              label.classList.remove('scale-110')
            }
          }

          // Event listeners dla kształtu
          const shapeEnterHandler = () => setHover(true)
          const shapeLeaveHandler = () => setHover(false)
          shape.addEventListener('mouseenter', shapeEnterHandler)
          shape.addEventListener('mouseleave', shapeLeaveHandler)

          // Event listeners dla etykiety
          const labelEnterHandler = () => setHover(true)
          const labelLeaveHandler = () => setHover(false)
          label.addEventListener('mouseenter', labelEnterHandler)
          label.addEventListener('mouseleave', labelLeaveHandler)

          // Cleanup function
          cleanupFunctions.push(() => {
            shape.removeEventListener('mouseenter', shapeEnterHandler)
            shape.removeEventListener('mouseleave', shapeLeaveHandler)
            label.removeEventListener('mouseenter', labelEnterHandler)
            label.removeEventListener('mouseleave', labelLeaveHandler)
          })
        }
      })

      return () => {
        cleanupFunctions.forEach(cleanup => cleanup())
      }
    }
  }, [currentView, selectedBlockId, selectedFloorId, blocks, block, floors, floorApartments])

  // Loading state
  if (blocksLoading || statsLoading) {
    return (
      <section id="offer" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Ładowanie danych...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="offer" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-900 mb-6">
            Oferta mieszkań
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Poznaj nasze mieszkania - wybierz blok, piętro i znajdź swoje wymarzone mieszkanie
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin size={20} />
              <span className="text-lg font-medium">{getBreadcrumb()}</span>
            </div>
            {currentView !== 'overview' && (
              <button
                onClick={goBack}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Wróć</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {currentView === 'apartment' && apartment ? (
            /* Apartment PDF View */
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Mieszkanie {apartment.apartment_number}
                </h3>
                <p className="text-gray-600">
                  {apartment.block_name} • {getFloorName(apartment.floor_name || '')} • {apartment.area} m² • {apartment.rooms} pokoi
                </p>
              </div>
              
              {apartment.pdf_path ? (
                <div className="w-full h-[800px] rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    src={apartment.pdf_path}
                    className="w-full h-full"
                    title={`Rzut mieszkania ${apartment.apartment_number}`}
                  />
                </div>
              ) : (
                <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="mx-auto mb-4 text-gray-400" size={64} />
                    <p className="text-gray-600 text-lg">Brak dostępnego rzutu mieszkania</p>
                  </div>
                </div>
              )}

              {/* Action buttons below PDF */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {apartment.pdf_path && (
                  <a
                    href={apartment.pdf_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    <FileText size={20} />
                    <span>Otwórz w nowej karcie</span>
                    <Download size={16} />
                  </a>
                )}
                {apartment.storage_pdf_path && (
                  <a
                    href={apartment.storage_pdf_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    <FileText size={20} />
                    <span>Rzut komórki</span>
                    <Download size={16} />
                  </a>
                )}
                <button className="btn-primary">
                  Zapytaj o mieszkanie
                </button>
              </div>
            </div>
          ) : (
            /* Image Map View */
            <div className="relative w-full">
              <Image
                src={getImagePath()}
                alt="Mapa osiedla"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                priority
                onError={(e) => {
                  console.error('Failed to load image:', getImagePath())
                  // Fallback to overview image
                  e.currentTarget.src = '/images/imagemaps_apartments_structure/oferta-osiedle-imagemap.avif'
                }}
              />
              
              {/* Tytuł "Wybierz blok" na zdjęciu */}
              {currentView === 'overview' && (
                <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                    <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 text-center whitespace-nowrap">
                      Wybierz blok
                    </h3>
                  </div>
                </div>
              )}
                
              {/* Interactive Areas - Custom shaped clickable areas */}
              {currentView === 'overview' && blocks.map((block, index) => {
                // Definiujemy pozycje i kształty dla każdego bloku osobno
                // Aby dodać więcej wierzchołków w clipPath, użyj formatu: 'polygon(x1% y1%, x2% y2%, x3% y3%, ...)'
                // Przykład: 'polygon(0% 0%, 50% 0%, 100% 50%, 50% 100%, 0% 50%)' - pięciokąt
                const getBlockPosition = (blockName: string, index: number) => {
                  switch (blockName.toLowerCase()) {
                    case 'blok 1':
                      return {
                        top: '65.5%',
                        left: '16%',
                        width: '47%',
                        height: '36%',
                        clipPath: 'polygon(14% 1%, 51% 29%, 51.5% 50%, 38% 65%, 0% 26%, 0% 10%)',
                        labelTop: 'calc(70% + 20%)',
                        labelLeft: 'calc(6% + 23.5% / 2)',
                        infoTop: 'calc(65.5% - 5%)',
                        infoLeft: 'calc(16% + 23.5% / 2)'
                      }
                    case 'blok 2':
                      return {
                        top: '50%',
                        left: '70%',
                        width: '20%',
                        height: '40%',
                        clipPath: 'polygon(33% 52%, 49% 36%, 93% 45%, 91% 56%, 77% 78%, 18% 80%, 6% 67%, 6% 53%)',
                        labelTop: 'calc(70% + 20%)',
                        labelLeft: 'calc(72% + 10% / 2)',
                        infoTop: 'calc(65.5% - 5%)',
                        infoLeft: 'calc(60% + 10% / 2)'
                      }
                    default:
                      return {
                        top: index === 0 ? '65.5%' : '50%',
                        left: index === 0 ? '16%' : '70%',
                        width: index === 0 ? '47%' : '20%',
                        height: index === 0 ? '36%' : '40%',
                        clipPath: index === 0 
                          ? 'polygon(14% 1%, 51% 29%, 51.5% 50%, 38% 65%, 0% 26%, 0% 10%)'
                          : 'polygon(33% 52%, 49% 36%, 93% 45%, 91% 56%, 77% 78%, 18% 80%, 6% 67%, 6% 53%)',
                        labelTop: 'calc(70% + 20%)',
                        labelLeft: index === 0 ? 'calc(6% + 23.5% / 2)' : 'calc(72% + 10% / 2)',
                        infoTop: 'calc(65.5% - 5%)',
                        infoLeft: index === 0 ? 'calc(16% + 23.5% / 2)' : 'calc(60% + 10% / 2)'
                      }
                  }
                }

                const position = getBlockPosition(block.name, index)

                return (
                  <div key={block.id}>
                    {/* Kształt click area - każdy blok osobno */}
                    <button
                      onClick={() => handleBlockSelect(block.id)}
                      className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-0 border-primary-500 cursor-pointer transition-all duration-300 group"
                      style={{
                        top: position.top,
                        left: position.left,
                        width: position.width,
                        height: position.height,
                        clipPath: position.clipPath
                      }}
                      id={`block-${block.id}-shape`}
                    />
                    
                    {/* Etykieta */}
                    <button
                      onClick={() => handleBlockSelect(block.id)}
                      className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                      style={{
                        top: position.labelTop,
                        left: position.labelLeft,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 5
                      }}
                      id={`block-${block.id}-label`}
                    >
                      <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                        {block.name}
                      </div>
                    </button>

                    {/* Informacje o terminach oddania */}
                    <button
                      onClick={() => handleBlockSelect(block.id)}
                      className="absolute pointer-events-auto cursor-pointer"
                      style={{
                        top: position.infoTop,
                        left: position.infoLeft,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 5
                      }}
                      id={`block-${block.id}-date-label`}
                    >
                      <div className="bg-white/80 backdrop-blur-sm text-gray-700 font-medium text-xs px-2 py-1 rounded-md shadow-sm transition-all duration-300">
                        Oddanie {block.delivery_date}
                      </div>
                    </button>
                  </div>
                )
              })}

              {/* Tytuł "Wybierz piętro" na zdjęciu */}
              {currentView === 'block' && (
                <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                    <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 text-center whitespace-nowrap">
                      Wybierz piętro
                    </h3>
                  </div>
                </div>
              )}

              {/* Piętra - każde ustawione osobno dla każdego bloku */}
              {currentView === 'block' && floors.map((floor, index) => {
                // Definiujemy pozycje dla każdego piętra osobno w zależności od bloku
                // Można dodać więcej wierzchołków w clipPath: 'polygon(x1% y1%, x2% y2%, x3% y3%, ...)'
                // Przykład: 'polygon(0% 0%, 50% 0%, 100% 50%, 50% 100%, 0% 50%)' - pięciokąt
                const getFloorPosition = (floorName: string, blockName: string, index: number) => {
                  // Konfiguracja dla Bloku 1
                  if (blockName.toLowerCase() === 'blok 1') {
                    switch (floorName) {
                      case 'piwnica':
                          return { 
                            top: '70%', 
                            left: '5%', 
                            width: '90%', 
                            height: '20%',
                            clipPath: 'polygon(3.5% 10%, 91.3% 36%, 98% 30%, 98% 70%, 91.3% 86%, 3.5% 40%)' // Blok 1 - piwnica - przylegająca pod parterem
                          }
                      case 'parter':
                        return { 
                          top: '60%', 
                          left: '5%', 
                          width: '90%', 
                          height: '20%',
                          clipPath: 'polygon(3.5% 28%, 91.3% 11%, 98% 22%, 98% 80%, 91.3% 86%, 3.5% 60%)' // Blok 1 - parter
                        }
                      case 'pietro1':
                          return { 
                            top: '45%', 
                            left: '5%', 
                            width: '90%', 
                            height: '30%',
                            clipPath: 'polygon(3.5% 50%, 91.3% 3%, 98% 29%, 98% 63%, 91.3% 57%, 3.5% 69%)' // Blok 1 - pietro1 - przylegający nad parterem
                          }
                      case 'pietro2':
                          return { 
                            top: '23%', 
                            left: '5%', 
                            width: '90%', 
                            height: '40%',
                            clipPath: 'polygon(3.5% 75%, 91.3% 7%, 98% 46%, 98% 77%, 91.3% 57.5%, 3.5% 92.3%)' // Blok 1 - pietro2 - przylegający nad pietro1
                          }
                      default:
                        return { 
                          top: `${15 + index * 20}%`, 
                          left: '20%', 
                          width: '60%', 
                          height: '15%',
                          clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
                        }
                    }
                  }
                  
                  // Konfiguracja dla Bloku 2
                  if (blockName.toLowerCase() === 'blok 2') {
                    switch (floorName) {
                      case 'piwnica':
                        return { 
                          top: '75%', 
                          left: '15%', 
                          width: '70%', 
                          height: '15%',
                          clipPath: 'polygon(25% 15%, 65% 4%, 90% 5%, 90% 80%, 65% 70%, 25% 90%, 20% 80%, 20% 14%)' // Blok 2 - piwnica
                        }
                      case 'parter':
                        return { 
                          top: '60%', 
                          left: '5%', 
                          width: '100%', 
                          height: '20%',
                          clipPath: 'polygon(0% 60%, 7.5% 31%, 45.5% 39%, 46.5% 39%, 56% 40%, 89.5% 38.5%, 89.5% 77%, 56% 77%, 46.5% 80%, 45% 83%, 0% 90%)' // Blok 2 - parter
                        }
                      case 'pietro1':
                        return { 
                          top: '50%', 
                          left: '5%', 
                          width: '100%', 
                          height: '20%',
                          clipPath: 'polygon(4.5% 45%, 7% 9%, 43.8% 37%, 43.8% 50%, 56% 58%, 89.5% 52%, 89.5% 89%, 56% 90%, 46.5% 89%, 40% 89%, 7.5% 81%, 4.5% 93%)' // Blok 2 - pietro1
                        }
                      case 'pietro2':
                        return { 
                          top: '30%', 
                          left: '5%', 
                          width: '100%', 
                          height: '35%',
                          clipPath: 'polygon(4.5% 54%, 7% 9%, 19.5% 20.5%, 20.4% 15%, 45.3% 38%, 45.3% 53%, 56.5% 62%, 89.5% 55%, 89.5% 87%, 56.5% 90%, 43.7% 86.5%, 43.7% 79%, 7% 63%, 4.5% 82%)' // Blok 2 - pietro2
                        }
                      default:
                        return { 
                          top: `${15 + index * 20}%`, 
                          left: '25%', 
                          width: '50%', 
                          height: '15%',
                          clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
                        }
                    }
                  }
                  
                  // Domyślna konfiguracja dla innych bloków
                  return { 
                    top: `${15 + index * 20}%`, 
                    left: '20%', 
                    width: '60%', 
                    height: '15%',
                    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
                  }
                }

                const position = getFloorPosition(floor.floor_name, block?.name || '', index)

                return (
                  <div key={floor.id}>
                    {/* Kształt click area - każde piętro osobno */}
                    <button
                      onClick={() => handleFloorSelect(floor.id)}
                      className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-0 border-primary-500 cursor-pointer transition-all duration-300 group"
                      style={{
                        top: position.top,
                        left: position.left,
                        width: position.width,
                        height: position.height,
                        clipPath: position.clipPath
                      }}
                      id={`floor-${floor.id}-shape`}
                    />
                    
                                         {/* Etykieta piętra - na dole obok siebie */}
                     <button
                       onClick={() => handleFloorSelect(floor.id)}
                       className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                       style={{
                         top: '90%',
                         left: (() => {
                           // Ustalamy pozycję na podstawie nazwy piętra, nie indexu
                           switch (floor.floor_name) {
                             case 'piwnica': return '16%'
                             case 'parter': return '37%'
                             case 'pietro1': return '57.5%'
                             case 'pietro2': return '79%'
                             default: return `${15 + index * 20}%`
                           }
                         })(),
                         transform: 'translate(-50%, -50%)',
                         zIndex: 5
                       }}
                       id={`floor-${floor.id}-label`}
                     >
                       <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                         {getFloorName(floor.floor_name)}
                       </div>
                     </button>

                  </div>
                )
              })}

              {/* Tytuł "Wybierz mieszkanie" na zdjęciu - w lewym dolnym rogu */}
              {currentView === 'floor' && (
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 text-center whitespace-nowrap">
                      Wybierz mieszkanie
                    </h3>
                  </div>
                </div>
              )}

              {/* Mieszkania */}
              {currentView === 'floor' && floorApartments.map((apartment, index) => {
                // Funkcja do pobierania pozycji i kształtu mieszkania - wszystkie 85 mieszkań
                const getApartmentPosition = (apartmentNumber: string, blockName: string, floorName: string) => {
                  const key = `${blockName.toLowerCase().replace(' ', '')}-${floorName}-${apartmentNumber.toLowerCase()}`
                  
                  // Kompletna konfiguracja wszystkich 85 mieszkań
                  const apartmentConfigs: Record<string, any> = {
                    // BLOK 1 - PARTER (16 mieszkań) - ✅ ZAIMPLEMENTOWANE
                    'blok1-parter-m1': { top: '60%', left: '20%', width: '15%', height: '40%', clipPath: 'polygon(0% 0%, 33.3% 0%, 33.3% 62.5%, 100% 62.5%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(20% + 7.5%)' },
                    'blok1-parter-m2': { top: '60%', left: '0%', width: '20%', height: '40%', clipPath: 'polygon(0% 0%, 75% 0%, 75% 62.5%, 100% 62.5%, 100% 100%, 0% 100%)', labelTop: 'calc(60% + 20%)', labelLeft: 'calc(0% + 10%)' },
                    'blok1-parter-m3': { top: '10%', left: '1%', width: '20%', height: '40%', clipPath: 'polygon(15% 48.5%, 24.5% 40%, 66% 40%, 66% 48.5%, 83% 48.5%, 83% 55%, 94% 55%, 94% 94%, 24% 94%, 24% 86%, 15% 86%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(0% + 10%)' },
                    'blok1-parter-m4': { top: '10%', left: '15%', width: '20%', height: '40%', clipPath: 'polygon(24% 40%, 57% 40%, 57% 49%, 75% 49%, 75% 55%, 82% 55%, 82% 94%, 24% 94%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(20% + 7.5%)' },
                    'blok1-parter-m5': { top: '10%', left: '30%', width: '10%', height: '40%', clipPath: 'polygon(34% 40%, 97% 40%, 97% 94%, 15% 94%, 15% 55%, 34% 55%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(35% + 5%)' },
                    'blok1-parter-m6': { top: '10%', left: '35%', width: '15%', height: '40%', clipPath: 'polygon(35% 49%, 57% 49%, 57% 40%, 95% 40%, 95% 56%, 98% 56%, 98% 94%, 35% 94%)', labelTop: 'calc(0% + 20%)', labelLeft: 'calc(45% + 2.5%)' },
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

                const apartmentPosition = getApartmentPosition(
                  apartment.apartment_number, 
                  block?.name || '', 
                  floor?.floor_name || ''
                )

                return (
                <div key={apartment.id}>
                  <button
                    onClick={() => handleApartmentSelect(apartment.id)}
                    className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                    style={{
                      top: apartmentPosition.top,
                      left: apartmentPosition.left,
                      width: apartmentPosition.width,
                      height: apartmentPosition.height,
                      clipPath: apartmentPosition.clipPath
                    }}
                    id={`apartment-${apartment.id}-shape`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-primary-600 text-white font-bold text-xs px-1 py-1 rounded shadow-lg">
                        {apartment.apartment_number}
                      </span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleApartmentSelect(apartment.id)}
                    className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                    style={{
                      top: apartmentPosition.labelTop,
                      left: apartmentPosition.labelLeft,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 5
                    }}
                    id={`apartment-${apartment.id}-label`}
                  >
                    <div className="bg-primary-600 text-white font-bold text-xs px-1 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                      {apartment.apartment_number}
                    </div>
                  </button>
                </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Dynamic Stats or Apartments Table */}
        {currentView === 'floor' && floorApartments.length > 0 ? (
          /* Apartments Table for Floor View */
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Mieszkania na {getFloorName(floor?.floor_name || '')} - {block?.name}
            </h3>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Numer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Powierzchnia</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Pokoje</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cena</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Akcje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {floorApartments.map((apartment) => (
                      <tr key={apartment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {apartment.apartment_number}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {apartment.area} m²
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {apartment.rooms}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {apartment.price ? `${apartment.price.toLocaleString('pl-PL')} zł` : 'Brak ceny'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            apartment.status === 'available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {apartment.status === 'available' ? 'Dostępne' : 'Niedostępne'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleApartmentSelect(apartment.id)}
                            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                          >
                            Zobacz szczegóły
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Dynamic Stats for other views */
          
          <div className="grid md:grid-cols-4 gap-8 mt-16">
            {getStatsForCurrentView().map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default OfferDatabase
