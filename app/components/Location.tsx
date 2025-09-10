'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MapPin, Clock, Bus, ShoppingCart, Church, Baby, BookOpen, Stethoscope, Pill } from 'lucide-react'
import LocationMap from './LocationMap'

const Location = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>(new Array(6).fill(false))
  const sectionRef = useRef<HTMLElement>(null)

  const locationFeatures = [
    {
      icon: ShoppingCart,
      title: 'SKLEP',
      distance: '220m'
    },
    {
      icon: Church,
      title: 'KOŚCIÓŁ',
      distance: '780m'
    },
    {
      icon: Baby,
      title: 'PRZEDSZKOLE',
      distance: '680m'
    },
    {
      icon: BookOpen,
      title: 'SZKOŁA',
      distance: '300m'
    },
    {
      icon: Stethoscope,
      title: 'LEKARZ',
      distance: '800m'
    },
    {
      icon: Pill,
      title: 'APTEKA',
      distance: '1250m'
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
            locationFeatures.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 150) // 150ms delay between each feature
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

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} id="location" className="py-20 bg-transparent">
      <div className="container-max section-padding">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <h2 className="heading-lg text-gray-900 mb-6">
            Lokalizacja
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Osiedle Skowronków znajduje się w doskonale skomunikowanej lokalizacji, 
            z łatwym dostępem do wszystkich miejskich udogodnień.
          </p>
        </div>

        <div className={`grid lg:grid-cols-1 gap-16 items-start mb-16 transition-all duration-1000 ease-out delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          {/* Interactive Map */}
          <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
            <LocationMap className="rounded-2xl" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-8">
          {locationFeatures.map((category, index) => {
            const Icon = category.icon
            return (
              <div 
                key={index}
                className={`bg-white border border-gray-200 rounded-lg sm:rounded-xl lg:rounded-xl p-3 sm:p-4 lg:p-6 hover:shadow-md sm:hover:shadow-lg lg:hover:shadow-lg transition-all duration-600 ease-out hover:-translate-y-1 text-center ${
                  visibleFeatures[index] 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-3 scale-98'
                }`}
              >
                <div className="flex flex-col items-center space-y-2 sm:space-y-3 lg:space-y-3 lg:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon className="text-primary-600" size={20} />
                  </div>
                  <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 leading-tight">
                    {category.title}
                  </h4>
                  <p className="text-primary-600 font-medium text-xs sm:text-sm lg:text-base">
                    {category.distance}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 ease-out delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Przekonaj się sam
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Zapraszamy na prezentację lokalizacji i zwiedzanie okolicy. 
              Pokażemy Ci wszystkie zalety tej wyjątkowej lokalizacji.
            </p>
            <button className="btn-primary" onClick={scrollToContact}>
              Umów prezentację
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Location 