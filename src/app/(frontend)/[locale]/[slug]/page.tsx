import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CmsText } from '@/components/CmsText'

import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import type { AppLocale } from '@/i18n/routing'
import { getPageBySlug } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ locale: AppLocale; slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const page = await getPageBySlug(slug, locale)
  const base = await buildPageMetadata(locale, 'homeTitle', 'homeDescription', {
    pathname: '/[slug]',
    params: { slug },
  })
  return {
    ...base,
    title: page ? `${page.title} - Bailaimos` : base.title,
  }
}

export default async function LegalPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const page = await getPageBySlug(slug, locale)
  if (!page) notFound()

  const t = await getTranslations('Legal')

  return (
    <>
      <PageHero title={page.title} />
      <Section>
        <Container className="max-w-3xl text-paper/80">
          {page.content ? (
            <div className="measure [&_p]:mb-3">
              <CmsText data={page.content} />
            </div>
          ) : (
            <p className="text-ink-muted">{t('empty')}</p>
          )}
        </Container>
      </Section>
    </>
  )
}
