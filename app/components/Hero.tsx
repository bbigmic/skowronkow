'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  const slides = [
    {
      image: '/images/hero3.avif',
      title: 'Twój wymarzony dom czeka',
      subtitle: 'Osiedle Skowronków',
      description: 'Nowoczesne mieszkania w spokojnej okolicy z doskonałą komunikacją do centrum miasta.'
    },
    {
      image: '/images/hero1.avif',
      title: 'Inwestycja w przyszłość',
      subtitle: 'Doskonała lokalizacja',
      description: 'Bliskość natury, infrastruktury miejskiej i dogodne połączenia komunikacyjne.'
    },
    {
      image: '/images/hero2.avif',
      title: 'Komfort i jakość życia',
      subtitle: 'Przemyślane rozwiązania',
      description: 'Każde mieszkanie zostało zaprojektowane z myślą o Twojej wygodzie i funkcjonalności.'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  // Progress bar animation
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + (100 / 60) // 100% w 6 sekund (60 * 100ms)
      })
    }, 100)

    return () => clearInterval(progressTimer)
  }, [currentSlide])

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0)
  }, [currentSlide])

  // Initial load animation - sequential appearance
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowSubtitle(true), 300),    // Subtitle first
      setTimeout(() => setShowTitle(true), 1000),      // Title after 700ms
      setTimeout(() => setShowDescription(true), 1800), // Description after 800ms
      setTimeout(() => setShowButtons(true), 2600),    // Buttons last after 800ms
    ]
    return () => timers.forEach(clearTimeout)
  }, [])



  const changeSlide = (newSlide: number | ((prev: number) => number)) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(newSlide)
      setIsTransitioning(false)
    }, 300)
  }

  const nextSlide = () => {
    changeSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    changeSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Carousel Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover animate-zoom-in"
              priority={index === 0}
              sizes="100vw"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="container-max section-padding text-center text-white">
          <div className={`transition-opacity duration-300 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}>
            <h2 className={`text-sm md:text-base uppercase tracking-wider text-secondary-300 mb-4 transition-all duration-1000 ease-out ${
              showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              {slides[currentSlide].subtitle}
            </h2>
            <h1 className={`heading-xl mb-6 transition-all duration-1000 ease-out ${
              showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              {slides[currentSlide].title}
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 px-12 leading-relaxed transition-all duration-1000 ease-out ${
              showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              {slides[currentSlide].description}
            </p>
          </div>
          
          {/* Buttons - always visible after initial load */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out ${
            showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button 
              onClick={() => scrollToNext()}
              className="btn-primary"
            >
              Poznaj ofertę
            </button>
            <a 
              href="tel:+48600467817"
              className="btn-secondary"
            >
              Zadzwoń teraz: +48 600 467 817
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        }`}
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        }`}
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Dots Indicator with Progress */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 z-30">
        {/* Progress Bar */}
        <div className="w-24 h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Dots */}
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8">
        <button
          onClick={scrollToNext}
          className="animate-bounce-slow text-white hover:text-secondary-300 transition-colors duration-300"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  )
}

export default Hero 