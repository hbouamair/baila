import { getTranslations, setRequestLocale } from 'next-intl/server'

import { FaqAccordion } from '@/components/FaqAccordion'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import type { AppLocale } from '@/i18n/routing'
import { getFaqs } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'faqTitle', 'faqDescription', '/faq')
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const faqs = await getFaqs(locale)
  const t = await getTranslations('Faq')

  return (
    <>
      <PageHero title={t('title')} intro={t('intro')} />
      <Section>
        <Container className="max-w-3xl">
          {faqs.length ? <FaqAccordion items={faqs} /> : <p className="text-ink-muted">{t('empty')}</p>}
        </Container>
      </Section>
    </>
  )
}
