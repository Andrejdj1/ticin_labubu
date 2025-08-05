import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// SEO metadata
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Labubu Tijana',
  description: 'Najslađi Labubu plišanci za sve uzraste',
  url: 'https://ticin-labubu.vercel.app',
  logo: 'https://ticin-labubu.vercel.app/pink-labubu-bow.png'
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Labubu Tijana 👑 - Najslađi Labubu plišanci',
  description: 'Otkrijte našu čarobnu kolekciju od 16 jedinstvenih Labubu prijatelja! Originalni plišanci, 3D printing usluge i brza dostava.',
  keywords: 'labubu, plišanci, igračke, labubu tijana, anime, kawaii, 3d printing',
  authors: [{ name: 'Labubu Tijana' }],
  openGraph: {
    title: 'Labubu Tijana 👑 - Najslađi Labubu plišanci',
    description: 'Čarobna kolekcija Labubu plišanaca za sve uzraste!',
    url: 'https://ticin-labubu.vercel.app',
    siteName: 'Labubu Tijana',
    images: [
      {
        url: 'https://ticin-labubu.vercel.app/pink-labubu-bow.png',
        width: 300,
        height: 300,
        alt: 'Labubu Tijana - Roze Labubu plišanac',
      },
    ],
    locale: 'sr_RS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Labubu Tijana 👑',
    description: 'Najslađi Labubu plišanci za sve uzraste!',
    images: ['https://ticin-labubu.vercel.app/pink-labubu-bow.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}