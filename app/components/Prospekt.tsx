'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, Download, Shield, Banknote, Scale } from 'lucide-react'

const Prospekt = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(3).fill(false))
  const sectionRef = useRef<HTMLElement>(null)

  const features = [
    {
      icon: Banknote,
      title: 'Rachunki powiernicze',
      description: 'Pieniądze bezpiecznie na rachunku powierniczym'
    },
    {
      icon: Shield,
      title: 'Fundusz Gwarancyjny',
      description: 'Ochrona w przypadku upadłości dewelopera'
    },
    {
      icon: Scale,
      title: 'Umowa notarialna',
      description: 'Silniejsze zabezpieczenie prawne'
    }
  ]

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Animate features one by one
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 200) // 200ms delay between each feature
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleDownload = () => {
    // Tutaj można dodać logikę pobierania pliku
    // Na razie symulujemy pobieranie
    const link = document.createElement('a')
    link.href = '/documents/PROSPEKT - blok nr 1.pdf'
    link.download = 'PROSPEKT - blok nr 1.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section ref={sectionRef} id="prospekt" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-max section-padding">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <h2 className="heading-lg text-gray-900 mb-6">
            Prospekt informacyjny
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Ustawa deweloperska chroni nabywców mieszkań przed utratą wpłaconych pieniędzy i nieuczciwymi praktykami deweloperów.
          </p>
        </div>

        {/* Additional Info */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Bezpieczeństwo Twojej inwestycji
            </h3>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Działamy zgodnie z ustawą deweloperską, zapewniając pełną przejrzystość i bezpieczeństwo transakcji.
            </p>
          </div>
        </div>

        {/* Download Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <FileText className="text-primary-600 mr-3" size={32} />
              <h3 className="text-xl font-bold text-gray-900">
                Pobierz prospekt
              </h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Szczegółowe informacje o inwestycji zgodnie z ustawą deweloperską.
            </p>
            <button
              onClick={handleDownload}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Download size={18} />
              <span>Pobierz PDF</span>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-600 ease-out hover:-translate-y-1 ${
                  visibleItems[index] 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-3 scale-98'
                }`}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Icon className="text-primary-600" size={20} />
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-2 text-center">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Prospekt
