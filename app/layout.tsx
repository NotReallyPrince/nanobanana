import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Geist, Geist_Mono, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  title: 'Nano Banana AI - Free AI Image Generation | No Login Required',
  description: 'Transform your images with Nano Banana AI. Fast, powerful AI image generation in 1-2 minutes. Upload photos, enter prompts, and create stunning images instantly. No login required, 100% free to use.',
  keywords: ['AI image generation', 'Nano Banana AI', 'image editing', 'AI photo editor', 'free AI tool', 'image transformation', 'AI art generator', 'no login required'],
  authors: [{ name: 'KellyAI' }],
  creator: 'KellyAI',
  publisher: 'KellyAI',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nanobanana.ai',
    siteName: 'Nano Banana AI',
    title: 'Nano Banana AI - Free AI Image Generation | No Login Required',
    description: 'Transform your images with Nano Banana AI. Fast, powerful AI image generation in 1-2 minutes. Upload photos, enter prompts, and create stunning images instantly.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nano Banana AI - AI Image Generation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nano Banana AI - Free AI Image Generation',
    description: 'Transform your images with AI in 1-2 minutes. No login required. Upload photos, enter prompts, and create stunning images instantly.',
    images: ['/og-image.png'],
    creator: '@KellyAI',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#FFD93D',
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
