'use client'

import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import GoogleMap from './MapComponent'

const Contact = () => {
  const [formData, setFormData] = useState({
    phone: '',
    message: '',
    interest: 'general'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        phone: '',
        message: '',
        interest: 'general'
      })
    }, 3000)
  }



  return (
    <section id="contact" className="py-20 bg-transparent">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-900 mb-6">
            Skontaktuj się z nami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Masz pytania? Chcesz umówić prezentację? Skontaktuj się z nami lub zostaw numer, a my zadzwonimy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Biuro Sprzedaży Header */}
            <div className="text-center mb-8">

              <div className="flex justify-center mb-6">
                <img
                  src="/grupa-borys-logo.png"
                  alt="Logo Grupa Borys Deweloper"
                  className="h-20 w-auto object-contain"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informacje kontaktowe
              </h3>
              <p className="text-gray-600 mb-8">
                Jesteśmy gotowi aby odpowiedzieć na wszystkie Twoje pytania 
                i pomóc w znalezieniu idealnego mieszkania.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                BIURO SPRZEDAŻY MIESZKAŃ I APARTAMENTÓW
            </h3>

            {/* Skondensowane informacje kontaktowe */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid gap-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary-600" size={20} />
                  <span className="text-gray-600">Gawrzyłowska 69a, 39-200 Dębica</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-primary-600" size={20} />
                  <span className="text-gray-600">Poniedziałek - piątek: 8:00 - 16:00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary-600" size={20} />
                  <a href="tel:+48600467817" className="text-gray-600 hover:text-primary-600 transition-colors">
                    +48 600 467 817
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-primary-600" size={20} />
                  <a href="mailto:skowronkow@grupaborys.com" className="text-gray-600 hover:text-primary-600 transition-colors">
                    skowronkow@grupaborys.com
                  </a>
                </div>
              </div>
            </div>


          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Zostaw swój numer telefonu
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Dziękujemy za kontakt!
                </h4>
                <p className="text-gray-600">
                  Skontaktujemy się z Tobą w najbliższym czasie.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Numer telefonu *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="+48 123 456 789"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                      Rodzaj zapytania
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="general">Informacje ogólne</option>
                      <option value="apartment">Pytanie o mieszkanie</option>
                      <option value="presentation">Prezentacja osiedla</option>
                      <option value="financing">Finansowanie</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Wiadomość (opcjonalnie)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    placeholder="Opowiedz nam o swoich potrzebach (nieobowiązkowe)..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Send size={20} />
                  <span>Wyślij wiadomość</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mt-16">
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-96 w-full">
              <GoogleMap className="rounded-2xl" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Contact 