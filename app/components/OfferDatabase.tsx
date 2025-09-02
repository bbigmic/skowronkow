'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, Home, FileText, Download, MapPin, Square } from 'lucide-react'
import { useBlocks, useBlock, useFloor, useApartment, useStats } from '@/lib/hooks/useDatabase'

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
    const parts = ['Osiedle']
    
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
        { value: `${globalStats.available}/${globalStats.total}`, label: 'Mieszkań dostępnych' },
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
    } else if (currentView === 'floor' && floorStats) {
      return [
        { value: floorStats.total.toString(), label: 'Mieszkań na piętrze' },
        { value: `${Math.round(floorStats.avgArea)}`, label: 'Średnia powierzchnia (m²)' },
        { value: `${Math.round(floorStats.avgPrice / 1000)}k`, label: 'Średnia cena (tys. zł)' },
        { value: getFloorName(floor?.floor_name || ''), label: 'Piętro' }
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
      // Synchronizacja hover dla pięter
      const cleanupFunctions: (() => void)[] = []
      
      floors.forEach(floor => {
        const shapeId = `floor-${floor.id}-shape`
        const labelId = `floor-${floor.id}-label`
        
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
            /* Apartment Details */
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Mieszkanie {apartment.apartment_number}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Square className="text-primary-600" size={20} />
                        <span className="font-medium text-gray-900">Powierzchnia</span>
                      </div>
                      <span className="text-2xl font-bold text-primary-600">
                        {apartment.area} m²
                      </span>
                    </div>
                    <div className="bg-secondary-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Home className="text-secondary-600" size={20} />
                        <span className="font-medium text-gray-900">Pokoje</span>
                      </div>
                      <span className="text-2xl font-bold text-secondary-600">
                        {apartment.rooms}
                      </span>
                    </div>
                  </div>

                  {apartment.price && (
                    <div className="bg-green-50 p-4 rounded-lg mb-8">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">Cena</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">
                        {apartment.price.toLocaleString('pl-PL')} zł
                      </span>
                    </div>
                  )}

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Piętro:</span>
                      <span className="font-medium text-gray-900">{getFloorName(apartment.floor_name || '')}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Blok:</span>
                      <span className="font-medium text-gray-900">{apartment.block_name}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${apartment.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                        {apartment.status === 'available' ? 'Dostępne' : 'Niedostępne'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {apartment.pdf_path && (
                      <a
                        href={apartment.pdf_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        <FileText size={20} />
                        <span>Rzut mieszkania</span>
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
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    Zainteresowany tym mieszkaniem?
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Skontaktuj się z nami, aby uzyskać więcej informacji, umówić prezentację 
                    lub poznać szczegóły finansowania.
                  </p>
                  <button className="btn-primary w-full">
                    Zapytaj o mieszkanie
                  </button>
                </div>
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
              {currentView === 'overview' && blocks.map((block, index) => (
                <div key={block.id}>
                  {/* Kształt click area */}
                  <button
                    onClick={() => handleBlockSelect(block.id)}
                    className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-0 border-primary-500 cursor-pointer transition-all duration-300 group"
                    style={{
                      top: index === 0 ? '65.5%' : '50%',
                      left: index === 0 ? '16%' : '70%',
                      width: index === 0 ? '47%' : '20%',
                      height: index === 0 ? '36%' : '40%',
                      clipPath: index === 0 
                        ? 'polygon(14% 1%, 51% 29%, 51.5% 50%, 38% 65%, 0% 26%, 0% 10%)'
                        : 'polygon(33% 52%, 49% 36%, 93% 45%, 91% 56%, 77% 78%, 18% 80%, 6% 67%, 6% 53%)'
                    }}
                    id={`block-${block.id}-shape`}
                  />
                  
                  {/* Etykieta */}
                  <button
                    onClick={() => handleBlockSelect(block.id)}
                    className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                    style={{
                      top: 'calc(70% + 20%)',
                      left: index === 0 ? 'calc(6% + 23.5% / 2)' : 'calc(72% + 10% / 2)',
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
                      top: 'calc(65.5% - 5%)',
                      left: index === 0 ? 'calc(16% + 23.5% / 2)' : 'calc(60% + 10% / 2)',
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
              ))}

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

              {/* Piętra */}
              {currentView === 'block' && floors.map((floor, index) => (
                <div key={floor.id}>
                  <button
                    onClick={() => handleFloorSelect(floor.id)}
                    className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                    style={{
                      top: `${20 + index * 15}%`,
                      left: '25%',
                      width: '50%',
                      height: '12%',
                      clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
                    }}
                    id={`floor-${floor.id}-shape`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-primary-600 text-white font-bold text-sm px-2 py-1 rounded shadow-lg">
                        {getFloorName(floor.floor_name)}
                      </span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleFloorSelect(floor.id)}
                    className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                    style={{
                      top: `${20 + index * 15 + 6}%`,
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 5
                    }}
                    id={`floor-${floor.id}-label`}
                  >
                    <div className="bg-primary-600 text-white font-bold text-sm px-2 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                      {getFloorName(floor.floor_name)}
                    </div>
                  </button>
                </div>
              ))}

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
              {currentView === 'floor' && floorApartments.map((apartment, index) => (
                <div key={apartment.id}>
                  <button
                    onClick={() => handleApartmentSelect(apartment.id)}
                    className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                    style={{
                      top: '25%',
                      left: `${15 + (index % 6) * 13}%`,
                      width: '10%',
                      height: '35%',
                      clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
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
                      top: 'calc(25% + 17.5%)',
                      left: `${15 + (index % 6) * 13 + 5}%`,
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
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          {getStatsForCurrentView().map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OfferDatabase
