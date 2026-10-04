import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ContactForm } from '@/components/ContactForm'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import type { AppLocale } from '@/i18n/routing'
import { getSiteSettings } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'contactTitle', 'contactDescription', '/contact')
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const [settings, t] = await Promise.all([
    getSiteSettings(locale),
    getTranslations({ locale, namespace: 'Contact' }),
  ])

  return (
    <>
      <PageHero title={t('title')} intro={t('intro')} />
      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex flex-wrap gap-3">
            {settings.contactEmail ? (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition-[border-color,color] duration-200 hover:border-gold hover:text-gold"
              >
                {t('emailDirect', { email: settings.contactEmail })}
              </a>
            ) : null}
            {settings.socials?.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition-[border-color,color] duration-200 hover:border-gold hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </div>
          <ContactForm locale={locale} />
        </Container>
      </Section>
    </>
  )
}
