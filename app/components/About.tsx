'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Check, Users, Home, Shield, Leaf, Car } from 'lucide-react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>(new Array(5).fill(false))
  const sectionRef = useRef<HTMLElement>(null)

  const features = [
    {
      icon: Home,
      title: 'Nowoczesne mieszkania',
      description: 'Funkcjonalne układy pomieszczeń z wysokiej jakości materiałami wykończeniowymi'
    },
    {
      icon: Users,
      title: 'Społeczność',
      description: 'Przyjazna społeczność mieszkańców w spokojnej, rodzinnej okolicy'
    },
    {
      icon: Shield,
      title: 'Bezpieczeństwo',
      description: 'Osiedle zamknięte z bramą wjazdową i furtką zapewnia bezpieczeństwo i prywatność'
    },
    {
      icon: Leaf,
      title: 'Zieleń',
      description: 'Liczne tereny zielone, parki i miejsca rekreacji w bezpośrednim sąsiedztwie'
    },
    {
      icon: Car,
      title: 'Parkingi',
      description: 'Miejsca parkingowe dla wszystkich mieszkańców oraz miejsca dla gości'
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
                setVisibleFeatures(prev => {
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

  return (
    <section ref={sectionRef} id="about" className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Tło fixed */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/W3 RAW.avif"
          alt="Tło osiedla"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
          }}
          sizes="100vw"
          priority
        />
        {/* Overlay dla lepszej czytelności tekstu */}
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <h2 className="heading-lg text-gray-900 mb-6">
            O inwestycji
          </h2>
          <div className="flex justify-center mb-6">
            <Image
              src="/logo_skowronkow.webp"
              alt="Logo Osiedle Skowronków"
              width={300}
              height={100}
              className="h-40 w-auto object-contain"
              priority
            />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          <strong>Osiedle SKOWRONKÓW</strong> to wyjątkowa inwestycja, realizowana w zielonej części Dębicy. Właśnie tutaj powstaje modernistyczne osiedle, gdzie na nowych właścicieli będą czekać funkcjonalne mieszkania i apartamenty.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-16 items-center mb-20 transition-all duration-1000 ease-out delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          {/* Content */}
          <div>
            <div className="space-y-6 mb-8">

              
              <p className="text-body text-gray-600">
                <strong>Atrakcyjne położenie</strong>, bliskość terenów zielonych oraz korzystne połączenie z centrum sprawiają, że powstające osiedle będzie doskonałym miejscem dla wszystkich, którzy cenią sobie uroki ciszy i spokoju, a także swobodny dostęp do wszelkich udogodnień oferowanych przez tętniącą życiem aglomerację miejską. <a href="#location" className="text-primary-600"><strong>LOKALIZACJA</strong></a>
              </p>
              
              <p className="text-body text-gray-600">
                <strong>Osiedle SKOWRONKÓW</strong> to jedno z najbardziej perspektywicznych miejsc Dębicy. Swoją atrakcyjność zawdzięcza znakomitemu położeniu, oraz planowanym dalszym inwestycjom infrastrukturalnym, mieszkaniowym i rozrywkowym.
              </p>
              
              <p className="text-body text-gray-600">
                <strong>Osiedle SKOWRONKÓW</strong> realizowane jest wieloetapowo. Pierwsze dwa etapy budowy osiedla zostały zrealizowane, sprzedane i w pełni funkcjonują. W bieżącym, trzecim etapie powstaną dwa budynki wielorodzinne, w których zaplanowano łącznie 85 mieszkań o różnorodnym metrażu. Powierzchnia lokali oraz ich rozkład zostały tak zaprojektowane, aby nowi właściciele mogli zaaranżować wnętrza zgodnie ze swoimi potrzebami.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/W1 RAW.avif"
              alt="Osiedle Skowronków - widok"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className={`text-center p-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all duration-600 ease-out hover:-translate-y-1 ${
                  visibleFeatures[index] 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-3 scale-98'
                }`}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Icon className="text-primary-600" size={28} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
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

export default About 