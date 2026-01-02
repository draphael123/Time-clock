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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="World Clock" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "World Clock Extension",
              "applicationCategory": "BrowserExtension",
              "operatingSystem": "Chrome",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "100"
              },
              "description": "Free Chrome extension displaying EST, PST, Brazil, and Italy time zones in real-time. Beautiful, privacy-focused, and completely free.",
              "url": "https://time-clock-extension.vercel.app"
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

