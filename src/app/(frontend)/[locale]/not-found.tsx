import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export default async function NotFound() {
  const t = await getTranslations('NotFound')

  return (
    <>
      <PageHero title={t('title')} intro={t('text')} />
      <Section>
        <Container>
          <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-gold px-5 py-3 text-sm font-medium text-gold-fg btn-pop">
            {t('home')}
          </Link>
        </Container>
      </Section>
    </>
  )
}
