import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ContactForm } from '@/components/ContactForm'
import { ContactStage } from '@/components/contact/ContactStage'
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

  const notes = [
    { label: t('notePlace'), value: t('placeValue') },
    { label: t('noteDates'), value: t('datesValue') },
    { label: t('noteReply'), value: t('replyValue') },
  ]
  const socials = (settings.socials ?? [])
    .filter((item) => item.label && item.url && !/^https?:\/\/(www\.)?instagram\.com\/?$/i.test(item.url))
    .map((item) => ({ label: item.label, url: item.url }))

  if (settings.contactEmail) {
    notes.push({ label: t('noteEmail'), value: settings.contactEmail })
  }

  return (
    <ContactStage
      titleLead={t('titleLead')}
      title={t('title')}
      intro={t('intro')}
      write={t('write')}
      notes={notes}
      faqCta={t('faqCta')}
      passCta={t('passCta')}
    >
      <ContactForm locale={locale} socials={socials} />
    </ContactStage>
  )
}
