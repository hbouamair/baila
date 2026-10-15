import type { Metadata, Viewport } from 'next'
import { Archivo, Jost } from 'next/font/google'

import '../(frontend)/globals.css'
import './studio.css'

const jost = Jost({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jost',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Studio — Bailaimos',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#06140c',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${archivo.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  )
}
