import { getTranslations, setRequestLocale } from 'next-intl/server'

import { FaqStage } from '@/components/faq/FaqStage'
import type { AppLocale } from '@/i18n/routing'
import type { FaqGroupView } from '@/lib/faqs'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

type MessageGroup = {
  id: string
  label: string
  items: { q: string; a: string }[]
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'faqTitle', 'faqDescription', '/faq')
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Faq')
  const groups: FaqGroupView[] = (t.raw('groups') as MessageGroup[]).map((group) => ({
    id: group.id,
    label: group.label,
    items: group.items.map((item, index) => ({
      id: `${group.id}-${index}`,
      question: item.q,
      answer: item.a,
    })),
  }))

  return (
    <FaqStage
      titleLead={t('titleLead')}
      title={t('title')}
      intro={t('intro')}
      seeQuestions={t('seeQuestions')}
      contactCta={t('contactCta')}
      groups={groups}
    />
  )
}
