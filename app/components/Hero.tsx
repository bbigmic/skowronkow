'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

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
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
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
          className={`absolute inset-0 transition-opacity duration-1000 ${
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-max section-padding text-center text-white">
          <div className="animate-fade-in">
            <h2 className="text-sm md:text-base uppercase tracking-wider text-secondary-300 mb-4">
              {slides[currentSlide].subtitle}
            </h2>
            <h1 className="heading-xl mb-6 animate-slide-up">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 px-12 leading-relaxed animate-slide-up">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
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
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
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