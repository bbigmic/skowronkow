'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'

// Deklaracja typów Google Maps
declare global {
  interface Window {
    google: typeof google
  }
}

interface LocationMapProps {
  center: { lat: number; lng: number }
  zoom: number
  className?: string
}

const LocationMapComponent: React.FC<LocationMapProps> = ({ center, zoom, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [marker, setMarker] = useState<google.maps.Marker>()

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER,
        },
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'cooperative'
      })
      setMap(newMap)

      // Dodaj marker dla osiedla
      const newMarker = new window.google.maps.Marker({
        position: center,
        map: newMap,
        title: 'Osiedle Skowronków',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="22" fill="#0284c7" stroke="#ffffff" stroke-width="4"/>
              <path d="M25 10c-6.5 0-12 5.5-12 12 0 8 12 20 12 20s12-12 12-20c0-6.5-5.5-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="#ffffff"/>
              <text x="25" y="35" text-anchor="middle" fill="#ffffff" font-size="8" font-weight="bold">SK</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(50, 50),
          anchor: new window.google.maps.Point(25, 25)
        }
      })
      setMarker(newMarker)

      // Dodaj info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 280px;">
            <div style="text-align: center; margin-bottom: 12px;">
              <img src="/logo_skowronkow.png" alt="Logo Osiedle Skowronków" style="height: 60px; width: auto; max-width: 180px; display: block; margin: 0 auto;" />
            </div>
            <h3 style="margin: 0 0 8px 0; color: #0284c7; font-size: 18px; font-weight: bold; text-align: center;">
              Osiedle Skowronków
            </h3>
            <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 14px; text-align: center;">
              Dębica, woj. podkarpackie
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
            <p className="text-gray-600">Ładowanie mapy lokalizacji...</p>
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

interface LocationMapWrapperProps {
  className?: string
}

const LocationMap: React.FC<LocationMapWrapperProps> = ({ className = '' }) => {
  // Współrzędne dla Osiedle Skowronków, Dębica
  const center = {
    lat: 50.02841469250664,
    lng: 21.394080312094726
  }

  const zoom = 15

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
      <LocationMapComponent center={center} zoom={zoom} className={className} />
    </Wrapper>
  )
}

export default LocationMap
