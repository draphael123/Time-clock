import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'World Clock Extension - Track Time Across the Globe',
  description: 'Free Chrome extension displaying EST, PST, Brazil, and Italy time zones in real-time. Beautiful, privacy-focused, and completely free. Download now!',
  keywords: 'world clock, time zone, Chrome extension, EST, PST, Brazil time, Italy time, free extension, time tracker',
  authors: [{ name: 'World Clock Extension' }],
  openGraph: {
    title: 'World Clock Extension - Track Time Across the Globe',
    description: 'Free Chrome extension displaying EST, PST, Brazil, and Italy time zones in real-time.',
    type: 'website',
    url: 'https://time-clock-extension.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Clock Extension - Track Time Across the Globe',
    description: 'Free Chrome extension displaying EST, PST, Brazil, and Italy time zones in real-time.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

