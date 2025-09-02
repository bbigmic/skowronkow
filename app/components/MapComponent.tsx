'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'

// Deklaracja typów Google Maps
declare global {
  interface Window {
    google: typeof google
  }
}

interface MapComponentProps {
  center: { lat: number; lng: number }
  zoom: number
  className?: string
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [marker, setMarker] = useState<google.maps.Marker>()

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'cooperative'
      })
      setMap(newMap)

      // Dodaj marker
      const newMarker = new window.google.maps.Marker({
        position: center,
        map: newMap,
        title: 'Biuro Sprzedaży - Osiedle Skowronków',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#0284c7" stroke="#ffffff" stroke-width="3"/>
              <path d="M20 8c-4.4 0-8 3.6-8 8 0 6 8 16 8 16s8-10 8-16c0-4.4-3.6-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20)
        }
      })
      setMarker(newMarker)

      // Dodaj info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #0284c7; font-size: 16px; font-weight: bold;">
              Biuro Sprzedaży
            </h3>
            <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px;">
              <strong>Grupa Borys Deweloper Sp. z o.o.</strong>
            </p>
            <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">
              Gawrzyłowska 69a<br>
              39-200 Dębica
            </p>
            <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 12px;">
              Poniedziałek - Piątek: 8:00 - 16:00
            </p>
            <p style="margin: 4px 0 0 0; color: #0284c7; font-size: 14px; font-weight: 500;">
              📞 +48 600 467 817
            </p>
          </div>
        `
      })

      // Otwórz info window przy kliknięciu na marker
      newMarker.addListener('click', () => {
        infoWindow.open(newMap, newMarker)
      })

      // Otwórz info window automatycznie
      infoWindow.open(newMap, newMarker)
    }
  }, [ref, map, center, zoom])

  return <div ref={ref} className={`w-full h-full ${className}`} />
}

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Ładowanie mapy...</p>
          </div>
        </div>
      )
    case Status.FAILURE:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
          <div className="text-center p-8">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nie można załadować mapy
            </h3>
            <p className="text-gray-600 mb-4">
              Sprawdź połączenie internetowe lub spróbuj ponownie później.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Odśwież stronę
            </button>
          </div>
        </div>
      )
    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
          <div className="text-center">
            <p className="text-gray-600">Ładowanie...</p>
          </div>
        </div>
      )
  }
}

interface GoogleMapProps {
  className?: string
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className = '' }) => {
  // Współrzędne dla Gawrzyłowska 69A, Dębica
  const center = {
    lat: 50.04124000,
    lng: 21.42586000
  }

  const zoom = 16

  // API Key - w produkcji powinien być w zmiennych środowiskowych
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

  if (!apiKey) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-100 rounded-xl ${className}`}>
        <div className="text-center p-8">
          <div className="text-yellow-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Konfiguracja mapy
          </h3>
          <p className="text-gray-600 mb-4">
            Aby wyświetlić mapę, dodaj klucz API Google Maps do zmiennych środowiskowych.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <p className="text-sm text-gray-600 mb-2">
              Dodaj do pliku <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code>:
            </p>
            <code className="text-sm text-gray-800">
              NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=twoj_klucz_api
            </code>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MapComponent center={center} zoom={zoom} className={className} />
    </Wrapper>
  )
}

export default GoogleMap
