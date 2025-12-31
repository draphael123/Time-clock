import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'World Clock Extension - Track Time Across the Globe',
  description: 'Beautiful Chrome extension displaying EST, PST, Brazil, and Italy time zones in real-time. Download now!',
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

