export const GOANDANCE_EVENT_ID = 'ec2743e1-ac87-4ac7-8537-cdca048fbe97'

export function goandanceEventUrl(locale: string) {
  const lang = locale === 'fr' || locale === 'es' ? locale : 'en'
  return `https://www.goandance.com/${lang}/event/${GOANDANCE_EVENT_ID}`
}

export function goandanceTicketsSrc(locale: string) {
  return `${goandanceEventUrl(locale)}/tickets.js`
}
