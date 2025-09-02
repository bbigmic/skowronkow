'use client'

import React from 'react'
import { MapPin, Clock, Bus, ShoppingCart, Church, Baby, BookOpen, Stethoscope, Pill } from 'lucide-react'
import LocationMap from './LocationMap'

const Location = () => {
  const locationFeatures = [
    {
      icon: ShoppingCart,
      title: 'SKLEP',
      distance: '100m'
    },
    {
      icon: Church,
      title: 'KOŚCIÓŁ',
      distance: '300m'
    },
    {
      icon: Baby,
      title: 'PRZEDSZKOLE',
      distance: '50m'
    },
    {
      icon: BookOpen,
      title: 'SZKOŁA',
      distance: '100m'
    },
    {
      icon: Stethoscope,
      title: 'LEKARZ',
      distance: '100m'
    },
    {
      icon: Pill,
      title: 'APTEKA',
      distance: '100m'
    }
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="location" className="py-20 bg-transparent">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-900 mb-6">
            Lokalizacja
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Osiedle Skowronków znajduje się w doskonale skomunikowanej lokalizacji, 
            z łatwym dostępem do wszystkich miejskich udogodnień.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-16 items-start mb-16">
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
                className="bg-white border border-gray-200 rounded-lg sm:rounded-xl lg:rounded-xl p-3 sm:p-4 lg:p-6 hover:shadow-md sm:hover:shadow-lg lg:hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
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
        <div className="text-center mt-16">
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