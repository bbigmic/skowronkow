'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, Home, Info, MapPin, Building, Camera, Phone } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#hero', icon: Home },
    { name: 'O inwestycji', href: '#about', icon: Info },
    { name: 'Lokalizacja', href: '#location', icon: MapPin },
    { name: 'Oferta', href: '#offer', icon: Building },
    { name: 'Galeria', href: '#gallery', icon: Camera },
    { name: 'Kontakt', href: '#contact', icon: Phone },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-60 h-20 transition-opacity duration-300">
              <Image
                src="/logo_skowronkow.png"
                alt="Osiedle Skowronków - Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 240px, 320px"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50' 
                        : 'text-white hover:text-secondary-300 hover:bg-white/10'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-secondary-300'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-300"
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation 