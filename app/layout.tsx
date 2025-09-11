import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://skowronkow.com'),
  title: 'Osiedle Skowronków - Nowoczesne mieszkania w doskonałej lokalizacji',
  description: 'Odkryj swój wymarzony dom w Osiedlu Skowronków. Nowoczesne mieszkania w spokojnej okolicy z doskonałą komunikacją.',
  keywords: 'mieszkania, nowe osiedle, Skowronków, sprzedaż mieszkań, deweloper, Grupa Borys, borys, skowronków, Grupa Borys Deweloper',
  authors: [{ name: 'Osiedle Skowronków' }],
  openGraph: {
    title: 'Osiedle Skowronków - Nowy wymiar domu',
    description: 'Odkryj swój wymarzony dom w Osiedlu Skowronków',
    type: 'website',
    locale: 'pl_PL',
    url: 'https://skowronkow.com',
    siteName: 'Osiedle Skowronków',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Osiedle Skowronków - Nowy wymiar domu',
    description: 'Odkryj swój wymarzony dom w Osiedlu Skowronków',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 