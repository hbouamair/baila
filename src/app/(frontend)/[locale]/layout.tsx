import { Archivo, Great_Vibes, Jost } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { BackToTop } from '@/components/BackToTop'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { MouseGlow } from '@/components/MouseGlow'
import { AnalyticsScript } from '@/components/AnalyticsScript'
import { routing } from '@/i18n/routing'
import { getSiteSettings } from '@/lib/payload'
import '../globals.css'

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

const script = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
})

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const settings = await getSiteSettings(locale)
  const t = await getTranslations({ locale, namespace: 'Nav' })
  const festivalName =
    !settings.festivalName || settings.festivalName === 'Bailamos' ? 'Bailaimos' : settings.festivalName
  const plausibleDomain = settings.plausibleDomain || process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${jost.variable} ${archivo.variable} ${script.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-night font-sans text-paper">
        <NextIntlClientProvider messages={messages}>
          <AnalyticsScript domain={plausibleDomain} />
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-gold-fg"
          >
            {t('skip')}
          </a>
          <MouseGlow />
          <Header festivalName={festivalName} />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer
            locale={locale}
            festivalName={festivalName}
            footerNote={settings.footerNote}
            socials={settings.socials}
            contactEmail={settings.contactEmail}
          />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
