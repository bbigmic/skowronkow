'use client'

import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Location from './components/Location'
import OfferDatabase from './components/OfferDatabase'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Location />
      <OfferDatabase />
      <Gallery />
      <Contact />
    </main>
  )
} 