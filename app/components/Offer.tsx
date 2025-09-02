'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, Home, FileText, Download, MapPin, Square } from 'lucide-react'

interface Apartment {
  id: string
  name: string
  area: number
  rooms: number
  floor: string
  block: string
  pdfPath: string
  storagePdfPath: string
}

const Offer = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'block' | 'floor' | 'apartment'>('overview')
  const [selectedBlock, setSelectedBlock] = useState<'blok1' | 'blok2' | null>(null)
  const [selectedFloor, setSelectedFloor] = useState<'parter' | 'pietro1' | 'pietro2' | 'piwnica' | null>(null)
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)

  // Przykładowe dane mieszkań - będą dynamicznie ładowane na podstawie wybranego piętra
  const apartmentsData: { [key: string]: Apartment[] } = {
    'blok1-parter': [
      { id: 'M1', name: 'M1', area: 65, rooms: 3, floor: 'parter', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M1/M1.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M1/M1 - komórka.pdf' },
      { id: 'M2', name: 'M2', area: 58, rooms: 2, floor: 'parter', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M2/M2.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M2/M2 - komórka.pdf' },
      { id: 'M3', name: 'M3', area: 72, rooms: 3, floor: 'parter', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M3/M3.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M3/M3 - komórka.pdf' },
      { id: 'M4', name: 'M4', area: 68, rooms: 3, floor: 'parter', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M4/M4.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M4/M4 - komórka.pdf' },
      { id: 'M5', name: 'M5', area: 55, rooms: 2, floor: 'parter', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M5/M5.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M5/M5 - komórka.pdf' },
      { id: 'M6', name: 'M6', area: 70, rooms: 3, floor: 'parter', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M6/M6.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/parter/M6/M6 - komórka.pdf' },
    ],
    'blok1-pietro1': [
      { id: 'M9', name: 'M9', area: 65, rooms: 3, floor: 'pietro1', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M9/M9.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M9/M9 - komórka.pdf' },
      { id: 'M10', name: 'M10', area: 58, rooms: 2, floor: 'pietro1', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M10/M10.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M10/M10 - komórka.pdf' },
      { id: 'M11', name: 'M11', area: 72, rooms: 3, floor: 'pietro1', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M11/M11.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M11/M11 - komórka.pdf' },
      { id: 'M12', name: 'M12', area: 68, rooms: 3, floor: 'pietro1', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M12/M12.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M12/M12 - komórka.pdf' },
      { id: 'M13', name: 'M13', area: 55, rooms: 2, floor: 'pietro1', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M13/M13.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M13/M13 - komórka.pdf' },
      { id: 'M14', name: 'M14', area: 70, rooms: 3, floor: 'pietro1', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M14/M14.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro1/M14/M14 - komórka.pdf' },
    ],
    'blok1-pietro2': [
      { id: 'M17', name: 'M17', area: 65, rooms: 3, floor: 'pietro2', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M17/M17.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M17/M17 - komórka.pdf' },
      { id: 'M18', name: 'M18', area: 58, rooms: 2, floor: 'pietro2', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M18/M18.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M18/M18 - komórka.pdf' },
      { id: 'M19', name: 'M19', area: 72, rooms: 3, floor: 'pietro2', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M19/M19.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M19/M19 - komórka.pdf' },
      { id: 'M20', name: 'M20', area: 68, rooms: 3, floor: 'pietro2', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M20/M20.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M20/M20 - komórka.pdf' },
      { id: 'M21', name: 'M21', area: 55, rooms: 2, floor: 'pietro2', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M21/M21.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M21/M21 - komórka.pdf' },
      { id: 'M22', name: 'M22', area: 70, rooms: 3, floor: 'pietro2', block: 'blok1', pdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M22/M22.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok1/pietro2/M22/M22 - komórka.pdf' },
    ],
    'blok2-parter': [
      { id: 'M1', name: 'M1', area: 62, rooms: 3, floor: 'parter', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M1/M1.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M1/M1 - komórka.pdf' },
      { id: 'M2', name: 'M2', area: 55, rooms: 2, floor: 'parter', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M2/M2.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M2/M2 - komórka.pdf' },
      { id: 'M3', name: 'M3', area: 70, rooms: 3, floor: 'parter', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M3/M3.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M3/M3 - komórka.pdf' },
      { id: 'M4', name: 'M4', area: 65, rooms: 3, floor: 'parter', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M4/M4.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M4/M4 - komórka.pdf' },
      { id: 'M5', name: 'M5', area: 52, rooms: 2, floor: 'parter', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M5/M5.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M5/M5 - komórka.pdf' },
      { id: 'M6', name: 'M6', area: 68, rooms: 3, floor: 'parter', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M6/M6.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/parter/M6/M6 - komórka.pdf' },
    ],
    'blok2-pietro1': [
      { id: 'M8', name: 'M8', area: 62, rooms: 3, floor: 'pietro1', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M8/M8.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M8/M8 - komórka.pdf' },
      { id: 'M9', name: 'M9', area: 55, rooms: 2, floor: 'pietro1', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M9/M9.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M9/M9 - komórka.pdf' },
      { id: 'M10', name: 'M10', area: 70, rooms: 3, floor: 'pietro1', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M10/M10.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M10/M10 - komórka.pdf' },
      { id: 'M11', name: 'M11', area: 65, rooms: 3, floor: 'pietro1', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M11/M11.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M11/M11 - komórka.pdf' },
      { id: 'M12', name: 'M12', area: 52, rooms: 2, floor: 'pietro1', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M12/M12.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M12/M12 - komórka.pdf' },
      { id: 'M13', name: 'M13', area: 68, rooms: 3, floor: 'pietro1', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M13/M13.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro1/M13/M13 - komórka.pdf' },
    ],
    'blok2-pietro2': [
      { id: 'M15', name: 'M15', area: 62, rooms: 3, floor: 'pietro2', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M15/M15.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M15/M15 - komórka.pdf' },
      { id: 'M16', name: 'M16', area: 55, rooms: 2, floor: 'pietro2', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M16/M16.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M16/M16 - komórka.pdf' },
      { id: 'M17', name: 'M17', area: 70, rooms: 3, floor: 'pietro2', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M17/M17.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M17/M17 - komórka.pdf' },
      { id: 'M18', name: 'M18', area: 65, rooms: 3, floor: 'pietro2', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M18/M18.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M18/M18 - komórka.pdf' },
      { id: 'M19', name: 'M19', area: 52, rooms: 2, floor: 'pietro2', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M19/M19.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M19/M19 - komórka.pdf' },
      { id: 'M20', name: 'M20', area: 68, rooms: 3, floor: 'pietro2', block: 'blok2', pdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M20/M20.pdf', storagePdfPath: '/images/imagemaps_apartments_structure/blok2/pietro2/M20/M20 - komórka.pdf' },
    ],
  }

  const getImagePath = () => {
    if (currentView === 'overview') {
      return '/images/imagemaps_apartments_structure/oferta-osiedle-imagemap.avif'
    }
    if (currentView === 'block' && selectedBlock) {
      return `/images/imagemaps_apartments_structure/${selectedBlock}/${selectedBlock}-imagemap.avif`
    }
    if (currentView === 'floor' && selectedBlock && selectedFloor) {
      if (selectedFloor === 'piwnica') {
        return `/images/imagemaps_apartments_structure/${selectedBlock}/${selectedFloor}/rzut-${selectedBlock}-piwnica.avif`
      }
      const floorName = selectedFloor === 'parter' ? 'parter' : selectedFloor === 'pietro1' ? 'pietro1' : 'pietro2'
      return `/images/imagemaps_apartments_structure/${selectedBlock}/${selectedFloor}/rzut-${selectedBlock}-${floorName}-imagemap.avif`
    }
    return '/images/imagemaps_apartments_structure/oferta-osiedle-imagemap.avif'
  }

  const handleBlockSelect = (block: 'blok1' | 'blok2') => {
    setSelectedBlock(block)
    setCurrentView('block')
    setSelectedFloor(null)
    setSelectedApartment(null)
  }

  const handleFloorSelect = (floor: 'parter' | 'pietro1' | 'pietro2' | 'piwnica') => {
    setSelectedFloor(floor)
    setCurrentView('floor')
    setSelectedApartment(null)
  }

  const handleApartmentSelect = (apartmentId: string) => {
    const apartments = apartmentsData[`${selectedBlock}-${selectedFloor}`] || []
    const apartment = apartments.find(apt => apt.id === apartmentId)
    if (apartment) {
      setSelectedApartment(apartment)
      setCurrentView('apartment')
    }
  }

  const goBack = () => {
    if (currentView === 'apartment') {
      setCurrentView('floor')
      setSelectedApartment(null)
    } else if (currentView === 'floor') {
      setCurrentView('block')
      setSelectedFloor(null)
    } else if (currentView === 'block') {
      setCurrentView('overview')
      setSelectedBlock(null)
    }
  }

  const getBreadcrumb = () => {
    const parts = ['Osiedle']
    if (selectedBlock) parts.push(selectedBlock === 'blok1' ? 'Blok 1' : 'Blok 2')
    if (selectedFloor) parts.push(selectedFloor.charAt(0).toUpperCase() + selectedFloor.slice(1))
    if (selectedApartment) parts.push(selectedApartment.name)
    return parts.join(' / ')
  }

  const getFloorName = (floor: string) => {
    switch (floor) {
      case 'parter': return 'Parter'
      case 'pietro1': return 'Piętro 1'
      case 'pietro2': return 'Piętro 2'
      case 'piwnica': return 'Piwnica'
      default: return floor
    }
  }

  // Synchronizacja hover efektów między kształtami a etykietami
  useEffect(() => {
    if (currentView === 'overview') {
      const blok1Shape = document.getElementById('blok1-shape')
      const blok2Shape = document.getElementById('blok2-shape')
      const blok1Label = document.getElementById('blok1-label')
      const blok2Label = document.getElementById('blok2-label')

      // Funkcje do zarządzania stanem hover
      const setBlok1Hover = (isHovered: boolean) => {
        if (blok1Shape) {
          if (isHovered) {
            blok1Shape.classList.add('bg-primary-500/40')
          blok1Shape.classList.remove('bg-primary-500/20')
          } else {
            blok1Shape.classList.remove('bg-primary-500/40')
          blok1Shape.classList.add('bg-primary-500/20')
          }
        }
      }

      const setBlok2Hover = (isHovered: boolean) => {
        if (blok2Shape) {
          if (isHovered) {
            blok2Shape.classList.add('bg-primary-500/40')
          blok2Shape.classList.remove('bg-primary-500/20')
          } else {
            blok2Shape.classList.remove('bg-primary-500/40')
          blok2Shape.classList.add('bg-primary-500/20')
          }
        }
      }

      // Event listeners dla kształtów
      if (blok1Shape) {
        blok1Shape.addEventListener('mouseenter', () => setBlok1Hover(true))
        blok1Shape.addEventListener('mouseleave', () => setBlok1Hover(false))
      }

      if (blok2Shape) {
        blok2Shape.addEventListener('mouseenter', () => setBlok2Hover(true))
        blok2Shape.addEventListener('mouseleave', () => setBlok2Hover(false))
      }

      // Event listeners dla etykiet
      if (blok1Label) {
        blok1Label.addEventListener('mouseenter', () => setBlok1Hover(true))
        blok1Label.addEventListener('mouseleave', () => setBlok1Hover(false))
      }

      if (blok2Label) {
        blok2Label.addEventListener('mouseenter', () => setBlok2Hover(true))
        blok2Label.addEventListener('mouseleave', () => setBlok2Hover(false))
      }

      return () => {
        // Cleanup event listeners
        if (blok1Shape) {
          blok1Shape.removeEventListener('mouseenter', () => setBlok1Hover(true))
          blok1Shape.removeEventListener('mouseleave', () => setBlok1Hover(false))
        }
        if (blok2Shape) {
          blok2Shape.removeEventListener('mouseenter', () => setBlok2Hover(true))
          blok2Shape.removeEventListener('mouseleave', () => setBlok2Hover(false))
        }
        if (blok1Label) {
          blok1Label.removeEventListener('mouseenter', () => setBlok1Hover(true))
          blok1Label.removeEventListener('mouseleave', () => setBlok1Hover(false))
        }
        if (blok2Label) {
          blok2Label.removeEventListener('mouseenter', () => setBlok2Hover(true))
          blok2Label.removeEventListener('mouseleave', () => setBlok2Hover(false))
        }
      }
    } else if (currentView === 'block' && selectedBlock) {
      // Synchronizacja hover dla pięter
      const floors = ['parter', 'pietro1', 'pietro2', 'piwnica']
      const colorClass = 'primary' // Wszystkie bloki używają primary (niebieski)
      
      const cleanupFunctions: (() => void)[] = []
      
      floors.forEach(floor => {
        const shape = document.getElementById(`${selectedBlock}-${floor}-shape`)
        const label = document.getElementById(`${selectedBlock}-${floor}-label`)
        
        if (shape && label) {
          const setHover = (isHovered: boolean) => {
            if (isHovered) {
              shape.classList.add(`bg-${colorClass}-500/40`)
              shape.classList.remove(`bg-${colorClass}-500/20`)
              // Skaluj etykietę
              label.classList.add('scale-110')
            } else {
              shape.classList.remove(`bg-${colorClass}-500/40`)
              shape.classList.add(`bg-${colorClass}-500/20`)
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
    } else if (currentView === 'floor' && selectedBlock && selectedFloor) {
      // Synchronizacja hover dla mieszkań
      const apartments = apartmentsData[`${selectedBlock}-${selectedFloor}`] || []
      const colorClass = 'primary' // Wszystkie bloki używają primary (niebieski)
      
      const cleanupFunctions: (() => void)[] = []
      
      apartments.forEach(apartment => {
        const shape = document.getElementById(`${selectedBlock}-${selectedFloor}-${apartment.id}-shape`)
        const label = document.getElementById(`${selectedBlock}-${selectedFloor}-${apartment.id}-label`)
        
        if (shape && label) {
          const setHover = (isHovered: boolean) => {
            if (isHovered) {
              shape.classList.add(`bg-${colorClass}-500/40`)
              shape.classList.remove(`bg-${colorClass}-500/20`)
              // Skaluj etykietę
              label.classList.add('scale-110')
            } else {
              shape.classList.remove(`bg-${colorClass}-500/40`)
              shape.classList.add(`bg-${colorClass}-500/20`)
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
  }, [currentView, selectedBlock, selectedFloor, apartmentsData])

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
          {currentView === 'apartment' && selectedApartment ? (
            /* Apartment Details */
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Mieszkanie {selectedApartment.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Square className="text-primary-600" size={20} />
                        <span className="font-medium text-gray-900">Powierzchnia</span>
                      </div>
                      <span className="text-2xl font-bold text-primary-600">
                        {selectedApartment.area} m²
                      </span>
                    </div>
                    <div className="bg-secondary-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Home className="text-secondary-600" size={20} />
                        <span className="font-medium text-gray-900">Pokoje</span>
                      </div>
                      <span className="text-2xl font-bold text-secondary-600">
                        {selectedApartment.rooms}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Piętro:</span>
                      <span className="font-medium text-gray-900">{getFloorName(selectedApartment.floor)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Blok:</span>
                      <span className="font-medium text-gray-900">{selectedApartment.block === 'blok1' ? 'Blok 1' : 'Blok 2'}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={selectedApartment.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <FileText size={20} />
                      <span>Rzut mieszkania</span>
                      <Download size={16} />
                    </a>
                    <a
                      href={selectedApartment.storagePdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <FileText size={20} />
                      <span>Rzut komórki</span>
                      <Download size={16} />
                    </a>
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
                    <h3 className="text-3xl sm:text-3xl md:text-3xl lg:text-3xl font-bold text-gray-900 text-center whitespace-nowrap">
                      Wybierz blok
                    </h3>
                  </div>
                </div>
              )}
                
                {/* Interactive Areas - Custom shaped clickable areas */}
                {currentView === 'overview' && (
                  <>
                    {/* Blok 1 - Kształt click area */}
                    <button
                      onClick={() => handleBlockSelect('blok1')}
                      className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-0 border-primary-500 cursor-pointer transition-all duration-300 group"
                      style={{
                        top: '65.5%',
                        left: '16%',
                        width: '47%',
                        height: '36%',
                        clipPath: 'polygon(14% 1%, 51% 29%, 51.5% 50%, 38% 65%, 0% 26%, 0% 10%)'
                      }}
                      id="blok1-shape"
                    />
                    
                    {/* Blok 2 - Kształt click area */}
                    <button
                      onClick={() => handleBlockSelect('blok2')}
                      className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                      style={{
                        top: '50%',
                        left: '70%',
                        width: '20%',
                        height: '40%',
                        clipPath: 'polygon(33% 52%, 49% 36%, 93% 45%, 91% 56%, 77% 78%, 18% 80%, 6% 67%, 6% 53%)'
                      }}
                      id="blok2-shape"
                    />
                    
                    {/* Etykiety - Clickable i zsynchronizowane z kształtami */}
                    <button
                      id="blok1-label"
                      onClick={() => handleBlockSelect('blok1')}
                      className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                      style={{
                        top: 'calc(70% + 20%)', // Pozycja względem kształtu Blok 1
                        left: 'calc(6% + 23.5% / 2)', // Centrum kształtu Blok 1
                        transform: 'translate(-50%, -50%)',
                        zIndex: 5
                      }}
                    >
                      <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                        Blok 1
                      </div>
                    </button>
                    
                    <button
                      id="blok2-label"
                      onClick={() => handleBlockSelect('blok2')}
                      className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                      style={{
                        top: 'calc(70% + 20%)', // Pozycja względem kształtu Blok 2
                        left: 'calc(75% + 10% / 2)', // Centrum kształtu Blok 2
                        transform: 'translate(-50%, -50%)',
                        zIndex: 5
                      }}
                    >
                      <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                        Blok 2
                      </div>
                    </button>
                    
                    {/* Opcja 2: CSS Clip-Path - Alternatywa dla prostszych kształtów */}
                    {/* 
                    <button
                      onClick={() => handleBlockSelect('blok1')}
                      className="absolute top-1/3 left-1/3 w-32 h-32 bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300"
                      style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)',
                        top: '35%',
                        left: '25%'
                      }}
                    />
                    
                    <button
                      onClick={() => handleBlockSelect('blok2')}
                      className="absolute top-1/3 right-1/3 w-32 h-32 bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300"
                      style={{
                        clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                        top: '35%',
                        right: '25%'
                      }}
                    />
                    */}
                    

                  </>
                )}

                {currentView === 'block' && selectedBlock && (
                  <>
                    {/* Tytuł "Wybierz piętro" na zdjęciu */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                        Wybierz piętro w {selectedBlock === 'blok1' ? 'Bloku 1' : 'Bloku 2'}
                      </h3>
                      </div>
                    </div>

                    {/* Interaktywne obszary dla pięter - Blok 1 */}
                    {selectedBlock === 'blok1' && (
                      <>
                        {/* Parter - Blok 1 */}
                          <button
                          onClick={() => handleFloorSelect('parter')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '35%',
                            left: '25%',
                            width: '50%',
                            height: '25%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
                          }}
                          id="blok1-parter-shape"
                        />
                        
                        {/* Piętro 1 - Blok 1 */}
                        <button
                          onClick={() => handleFloorSelect('pietro1')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '15%',
                            left: '25%',
                            width: '50%',
                            height: '25%',
                            clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)'
                          }}
                          id="blok1-pietro1-shape"
                        />
                        
                        {/* Piętro 2 - Blok 1 */}
                        <button
                          onClick={() => handleFloorSelect('pietro2')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '5%',
                            left: '25%',
                            width: '50%',
                            height: '15%',
                            clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'
                          }}
                          id="blok1-pietro2-shape"
                        />
                        
                        {/* Piwnica - Blok 1 */}
                        <button
                          onClick={() => handleFloorSelect('piwnica')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '65%',
                            left: '25%',
                            width: '50%',
                            height: '20%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                          }}
                          id="blok1-piwnica-shape"
                        />

                                                {/* Etykiety pięter - Blok 1 */}
                        <button
                          id="blok1-parter-label"
                          onClick={() => handleFloorSelect('parter')}
                          className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                          style={{
                            top: 'calc(35% + 12.5%)',
                            left: 'calc(25% + 25%)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 5
                          }}
                        >
                          <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                            Parter
                          </div>
                          </button>

                        <button
                          id="blok1-pietro1-label"
                          onClick={() => handleFloorSelect('pietro1')}
                          className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                          style={{
                            top: 'calc(15% + 12.5%)',
                            left: 'calc(25% + 25%)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 5
                          }}
                        >
                          <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                            Piętro 1
                      </div>
                        </button>

                        <button
                          id="blok1-pietro2-label"
                          onClick={() => handleFloorSelect('pietro2')}
                          className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                          style={{
                            top: 'calc(5% + 7.5%)',
                            left: 'calc(25% + 25%)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 5
                          }}
                        >
                          <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                            Piętro 2
                    </div>
                        </button>

                        <button
                          id="blok1-piwnica-label"
                          onClick={() => handleFloorSelect('piwnica')}
                          className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                          style={{
                            top: 'calc(65% + 10%)',
                            left: 'calc(25% + 25%)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 5
                          }}
                        >
                          <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                            Piwnica
                  </div>
                        </button>
                      </>
                    )}

                    {/* Interaktywne obszary dla pięter - Blok 2 */}
                    {selectedBlock === 'blok2' && (
                      <>
                        {/* Parter - Blok 2 */}
                        <button
                          onClick={() => handleFloorSelect('parter')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '40%',
                            left: '60%',
                            width: '35%',
                            height: '30%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                          }}
                          id="blok2-parter-shape"
                        />
                        
                        {/* Piętro 1 - Blok 2 */}
                        <button
                          onClick={() => handleFloorSelect('pietro1')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '60%',
                            width: '35%',
                            height: '25%',
                            clipPath: 'polygon(10% 0%, 100% 0%, 95% 100%, 0% 100%)'
                          }}
                          id="blok2-pietro1-shape"
                        />
                        
                        {/* Piętro 2 - Blok 2 */}
                        <button
                          onClick={() => handleFloorSelect('pietro2')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '8%',
                            left: '60%',
                            width: '35%',
                            height: '18%',
                            clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)'
                          }}
                          id="blok2-pietro2-shape"
                        />
                        
                        {/* Piwnica - Blok 2 */}
                        <button
                          onClick={() => handleFloorSelect('piwnica')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '70%',
                            left: '60%',
                            width: '35%',
                            height: '25%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)'
                          }}
                          id="blok2-piwnica-shape"
                        />

                                                {/* Etykiety pięter - Blok 2 */}
                        <button
                          id="blok2-parter-label"
                          onClick={() => handleFloorSelect('parter')}
                          className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                          style={{
                            top: 'calc(40% + 15%)',
                            left: 'calc(60% + 17.5%)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 5
                          }}
                        >
                          <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                            Parter
                          </div>
                        </button>

                        <button
                          id="blok2-pietro1-label"
                          onClick={() => handleFloorSelect('pietro1')}
                          className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                          style={{
                            top: 'calc(20% + 12.5%)',
                            left: 'calc(60% + 17.5%)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 5
                          }}
                        >
                          <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                            Piętro 1
                          </div>
                        </button>

                        <button
                          id="blok2-pietro2-label"
                          onClick={() => handleFloorSelect('pietro2')}
                          className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                          style={{
                            top: 'calc(8% + 9%)',
                            left: 'calc(60% + 17.5%)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 5
                          }}
                        >
                          <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                            Piętro 2
                          </div>
                        </button>

                        <button
                          id="blok2-piwnica-label"
                          onClick={() => handleFloorSelect('piwnica')}
                          className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                          style={{
                            top: 'calc(70% + 12.5%)',
                            left: 'calc(60% + 17.5%)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 5
                          }}
                        >
                          <div className="bg-primary-600 text-white font-bold text-lg px-3 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                            Piwnica
                          </div>
                        </button>
                      </>
                    )}
                  </>
                )}

                {currentView === 'floor' && selectedFloor !== 'piwnica' && (
                  <>
                    {/* Tytuł "Wybierz mieszkanie" na zdjęciu */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                          Wybierz mieszkanie na {getFloorName(selectedFloor || '').toLowerCase()}
                      </h3>
                    </div>
                  </div>

                    {/* Interaktywne obszary dla mieszkań - Blok 1 Parter */}
                    {selectedBlock === 'blok1' && selectedFloor === 'parter' && (
                      <>
                        {/* M1 */}
                        <button
                          onClick={() => handleApartmentSelect('M1')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '25%',
                            left: '15%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                          }}
                          id="blok1-parter-M1-shape"
                        />
                        
                        {/* M2 */}
                        <button
                          onClick={() => handleApartmentSelect('M2')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '25%',
                            left: '28%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                          }}
                          id="blok1-parter-M2-shape"
                        />
                        
                        {/* M3 */}
                        <button
                          onClick={() => handleApartmentSelect('M3')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '25%',
                            left: '41%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)'
                          }}
                          id="blok1-parter-M3-shape"
                        />
                        
                        {/* M4 */}
                        <button
                          onClick={() => handleApartmentSelect('M4')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '25%',
                            left: '54%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)'
                          }}
                          id="blok1-parter-M4-shape"
                        />
                        
                        {/* M5 */}
                        <button
                          onClick={() => handleApartmentSelect('M5')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '25%',
                            left: '67%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(10% 0%, 100% 0%, 95% 100%, 0% 100%)'
                          }}
                          id="blok1-parter-M5-shape"
                        />
                        
                        {/* M6 */}
                        <button
                          onClick={() => handleApartmentSelect('M6')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '25%',
                            left: '80%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                          }}
                          id="blok1-parter-M6-shape"
                        />

                        {/* Etykiety mieszkań - Blok 1 Parter */}
                        {['M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map((apt, index) => (
                          <button
                            key={apt}
                            id={`blok1-parter-${apt}-label`}
                            onClick={() => handleApartmentSelect(apt)}
                            className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                            style={{
                              top: 'calc(25% + 17.5%)',
                              left: `calc(15% + ${index * 13}% + 6%)`,
                              transform: 'translate(-50%, -50%)',
                              zIndex: 5
                            }}
                          >
                            <div className="bg-primary-600 text-white font-bold text-sm px-2 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                              {apt}
                            </div>
                          </button>
                        ))}
                      </>
                    )}

                    {/* Interaktywne obszary dla mieszkań - Blok 1 Piętro 1 */}
                    {selectedBlock === 'blok1' && selectedFloor === 'pietro1' && (
                      <>
                        {/* M9 */}
                        <button
                          onClick={() => handleApartmentSelect('M9')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '15%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                          }}
                          id="blok1-pietro1-M9-shape"
                        />
                        
                        {/* M10 */}
                        <button
                          onClick={() => handleApartmentSelect('M10')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '28%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                          }}
                          id="blok1-pietro1-M10-shape"
                        />
                        
                        {/* M11 */}
                        <button
                          onClick={() => handleApartmentSelect('M11')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '41%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)'
                          }}
                          id="blok1-pietro1-M11-shape"
                        />
                        
                        {/* M12 */}
                        <button
                          onClick={() => handleApartmentSelect('M12')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '54%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)'
                          }}
                          id="blok1-pietro1-M12-shape"
                        />
                        
                        {/* M13 */}
                        <button
                          onClick={() => handleApartmentSelect('M13')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '67%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(10% 0%, 100% 0%, 95% 100%, 0% 100%)'
                          }}
                          id="blok1-pietro1-M13-shape"
                        />
                        
                        {/* M14 */}
                        <button
                          onClick={() => handleApartmentSelect('M14')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '80%',
                            width: '12%',
                            height: '35%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                          }}
                          id="blok1-pietro1-M14-shape"
                        />

                                                {/* Etykiety mieszkań - Blok 1 Piętro 1 */}
                        {['M9', 'M10', 'M11', 'M12', 'M13', 'M14'].map((apt, index) => (
                          <button
                            key={apt}
                            id={`blok1-pietro1-${apt}-label`}
                            onClick={() => handleApartmentSelect(apt)}
                            className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                            style={{
                              top: 'calc(20% + 17.5%)',
                              left: `calc(15% + ${index * 13}% + 6%)`,
                              transform: 'translate(-50%, -50%)',
                              zIndex: 5
                            }}
                          >
                            <div className="bg-primary-600 text-white font-bold text-sm px-2 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                              {apt}
              </div>
                          </button>
                        ))}
                      </>
                    )}

                    {/* Interaktywne obszary dla mieszkań - Blok 2 Parter */}
                    {selectedBlock === 'blok2' && selectedFloor === 'parter' && (
                      <>
                        {/* M1 */}
                        <button
                          onClick={() => handleApartmentSelect('M1')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '30%',
                            left: '20%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                          }}
                          id="blok2-parter-M1-shape"
                        />
                        
                        {/* M2 */}
                        <button
                          onClick={() => handleApartmentSelect('M2')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '30%',
                            left: '36%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                          }}
                          id="blok2-parter-M2-shape"
                        />
                        
                        {/* M3 */}
                        <button
                          onClick={() => handleApartmentSelect('M3')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '30%',
                            left: '52%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)'
                          }}
                          id="blok2-parter-M3-shape"
                        />
                        
                        {/* M4 */}
                        <button
                          onClick={() => handleApartmentSelect('M4')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '30%',
                            left: '68%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)'
                          }}
                          id="blok2-parter-M4-shape"
                        />

                        {/* Etykiety mieszkań - Blok 2 Parter */}
                        {['M1', 'M2', 'M3', 'M4'].map((apt, index) => (
                          <button
                            key={apt}
                            id={`blok2-parter-${apt}-label`}
                            onClick={() => handleApartmentSelect(apt)}
                            className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                            style={{
                              top: 'calc(30% + 20%)',
                              left: `calc(20% + ${index * 16}% + 7.5%)`,
                              transform: 'translate(-50%, -50%)',
                              zIndex: 5
                            }}
                          >
                            <div className="bg-primary-600 text-white font-bold text-sm px-2 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                              {apt}
                            </div>
                          </button>
                        ))}
                      </>
                    )}

                    {/* Interaktywne obszary dla mieszkań - Blok 2 Piętro 1 */}
                    {selectedBlock === 'blok2' && selectedFloor === 'pietro1' && (
                      <>
                        {/* M8 */}
                        <button
                          onClick={() => handleApartmentSelect('M8')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '25%',
                            left: '20%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                          }}
                          id="blok2-pietro1-M8-shape"
                        />
                        
                        {/* M9 */}
                        <button
                          onClick={() => handleApartmentSelect('M9')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '25%',
                            left: '36%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                          }}
                          id="blok2-pietro1-M9-shape"
                        />
                        
                        {/* M10 */}
                        <button
                          onClick={() => handleApartmentSelect('M10')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '25%',
                            left: '52%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)'
                          }}
                          id="blok2-pietro1-M10-shape"
                        />
                        
                        {/* M11 */}
                        <button
                          onClick={() => handleApartmentSelect('M11')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '25%',
                            left: '68%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)'
                          }}
                          id="blok2-pietro1-M11-shape"
                        />

                        {/* Etykiety mieszkań - Blok 2 Piętro 1 */}
                        {['M8', 'M9', 'M10', 'M11'].map((apt, index) => (
                          <button
                            key={apt}
                            id={`blok2-pietro1-${apt}-label`}
                            onClick={() => handleApartmentSelect(apt)}
                            className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                            style={{
                              top: 'calc(25% + 20%)',
                              left: `calc(20% + ${index * 16}% + 7.5%)`,
                              transform: 'translate(-50%, -50%)',
                              zIndex: 5
                            }}
                          >
                            <div className="bg-primary-600 text-white font-bold text-sm px-2 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                              {apt}
                            </div>
                          </button>
                        ))}
                      </>
                    )}

                    {/* Interaktywne obszary dla mieszkań - Blok 2 Piętro 2 */}
                    {selectedBlock === 'blok2' && selectedFloor === 'pietro2' && (
                      <>
                        {/* M15 */}
                        <button
                          onClick={() => handleApartmentSelect('M15')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '20%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                          }}
                          id="blok2-pietro2-M15-shape"
                        />
                        
                        {/* M16 */}
                        <button
                          onClick={() => handleApartmentSelect('M16')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '36%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                          }}
                          id="blok2-pietro2-M16-shape"
                        />
                        
                        {/* M17 */}
                        <button
                          onClick={() => handleApartmentSelect('M17')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '52%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)'
                          }}
                          id="blok2-pietro2-M17-shape"
                        />
                        
                        {/* M18 */}
                        <button
                          onClick={() => handleApartmentSelect('M18')}
                          className="absolute bg-primary-500/20 hover:bg-primary-500/40 border-2 border-primary-500 cursor-pointer transition-all duration-300 group"
                          style={{
                            top: '20%',
                            left: '68%',
                            width: '15%',
                            height: '40%',
                            clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)'
                          }}
                          id="blok2-pietro2-M18-shape"
                        />

                        {/* Etykiety mieszkań - Blok 2 Piętro 2 */}
                        {['M15', 'M16', 'M17', 'M18'].map((apt, index) => (
                          <button
                            key={apt}
                            id={`blok2-pietro2-${apt}-label`}
                            onClick={() => handleApartmentSelect(apt)}
                            className="absolute bg-transparent hover:bg-primary-500/10 cursor-pointer transition-all duration-300 group pointer-events-auto"
                            style={{
                              top: 'calc(20% + 20%)',
                              left: `calc(20% + ${index * 16}% + 7.5%)`,
                              transform: 'translate(-50%, -50%)',
                              zIndex: 5
                            }}
                          >
                            <div className="bg-primary-600 text-white font-bold text-sm px-2 py-1 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300 pointer-events-auto">
                              {apt}
                            </div>
                          </button>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">45/87</div>
            <div className="text-gray-600">Mieszkań dostępnych</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">1-4</div>
            <div className="text-gray-600">Pokoje</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">25-82</div>
            <div className="text-gray-600">m² powierzchni</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">2</div>
            <div className="text-gray-600">Bloki mieszkalne</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Offer 