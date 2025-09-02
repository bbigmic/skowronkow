'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const images = [
    { src: '/images/W1 RAW.avif', alt: 'Osiedle Skowronków - widok 1' },
    { src: '/images/W2 RAW.avif', alt: 'Osiedle Skowronków - widok 2' },
    { src: '/images/W3 RAW.avif', alt: 'Osiedle Skowronków - widok 3' },
    { src: '/images/W4 RAW.avif', alt: 'Osiedle Skowronków - widok 4' },
    { src: '/images/W5 RAW.avif', alt: 'Osiedle Skowronków - widok 5' },
    { src: '/images/W6 RAW.avif', alt: 'Osiedle Skowronków - widok 6' },
    { src: '/images/W7 RAW.avif', alt: 'Osiedle Skowronków - widok 7' },
    { src: '/images/W8 RAW.avif', alt: 'Osiedle Skowronków - widok 8' },
    { src: '/images/W9 RAW.avif', alt: 'Osiedle Skowronków - widok 9' },
  ]

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const previousImage = () => {
    setSelectedImage(prev => prev === null ? null : prev === 0 ? images.length - 1 : prev - 1)
  }

  const nextImage = () => {
    setSelectedImage(prev => prev === null ? null : prev === images.length - 1 ? 0 : prev + 1)
  }

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <Image 
              src="/gallery-skowronkow-logo.png"
              alt="Galeria Osiedle Skowronków"
              width={300}
              height={100}
              className="mx-auto"
            />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Odkryj piękno Osiedla Skowronków - zobacz nasze realizacje, otoczenie i wizualizacje
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-90">
                  <ZoomIn className="text-white" size={48} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Chcesz zobaczyć więcej?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Zapraszamy na prezentację na miejscu. Pokażemy Ci każdy zakątek 
              osiedla i odpowiemy na wszystkie pytania.
            </p>
            <button className="btn-primary" onClick={scrollToContact}>
              Umów prezentację
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 z-10"
          >
            <X className="text-white" size={24} />
          </button>

          {/* Previous Button */}
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 z-10"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 z-10"
          >
            <ChevronRight className="text-white" size={24} />
          </button>

          {/* Image */}
          <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white font-medium">
              {selectedImage + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery 