import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond } from 'next/font/google'

import './globals.css'

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: 'Aurora - Fine Dining Experience',
  description: 'Where Flavor Becomes Art - Luxury culinary experience and cinematic dining',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable}`}>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
     
      </body>
    </html>
  )
}
