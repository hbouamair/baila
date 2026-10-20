import { getTranslations, setRequestLocale } from 'next-intl/server'

import { JackJillStage } from '@/components/jack-jill/JackJillStage'
import type { AppLocale } from '@/i18n/routing'
import { publishedProgramme } from '@/lib/programme'
import { buildPageMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'jackJillTitle', 'jackJillDescription', '/jack-and-jill')
}

function roundWhen(date: string, locale: AppLocale) {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`))
}

export default async function JackJillPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'JackJill' })
  const prelim = publishedProgramme.find((item) => item.id === 'sat-jj')
  const finals = publishedProgramme.find((item) => item.id === 'sun-jj')
  if (!prelim?.endTime || !finals?.endTime) return null

  return (
    <JackJillStage
      titleLead={t('titleLead')}
      intro={t('intro')}
      rounds={t('rounds')}
      prelim={{
        label: t('prelim'),
        when: roundWhen(prelim.date, locale),
        start: prelim.startTime,
        end: prelim.endTime,
        place: prelim.room,
      }}
      finalRound={{
        label: t('final'),
        when: roundWhen(finals.date, locale),
        start: finals.startTime,
        end: finals.endTime,
        place: finals.room,
      }}
      drawTitle={t('drawTitle')}
      drawText={t('drawText')}
      jack={t('jack')}
      jill={t('jill')}
      steps={[t('step1'), t('step2'), t('step3')]}
      programmeCta={t('programmeCta')}
    />
  )
}
