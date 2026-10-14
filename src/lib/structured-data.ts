import { goandanceEventUrl } from '@/lib/goandance'
import { HOTEL_NAME } from '@/lib/hotel'
import { absoluteUrl, getSiteUrl } from '@/lib/site'

type EventCopy = {
  name: string
  description: string
}

export function websiteJsonLd() {
  const site = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site}/#organization`,
        name: 'Bailaimos Festival by El Baile',
        url: site,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/brand/bailaimos-logo.png'),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site}/#website`,
        url: site,
        name: 'Bailaimos',
        inLanguage: ['fr', 'en', 'es'],
        publisher: { '@id': `${site}/#organization` },
      },
    ],
  }
}

export function eventJsonLd(locale: string, copy: EventCopy) {
  const site = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'DanceEvent',
    '@id': `${site}/#event`,
    name: copy.name,
    description: copy.description,
    startDate: '2027-05-20',
    endDate: '2027-05-24',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: [absoluteUrl('/cinematic/nights.jpg'), absoluteUrl('/artists/lineup-hero.jpg')],
    url: site,
    inLanguage: locale,
    organizer: {
      '@type': 'Organization',
      '@id': `${site}/#organization`,
      name: 'El Baile',
    },
    location: {
      '@type': 'Place',
      name: HOTEL_NAME,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. du 7ème Art',
        addressLocality: 'Marrakech',
        postalCode: '40000',
        addressCountry: 'MA',
      },
    },
    offers: {
      '@type': 'Offer',
      url: goandanceEventUrl(locale),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
    },
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function artistJsonLd(input: {
  name: string
  url: string
  image: string
  role: string
}) {
  const site = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': input.role === 'dj' ? 'Person' : 'PerformingGroup',
    name: input.name,
    image: absoluteUrl(input.image),
    url: input.url,
    performerIn: { '@id': `${site}/#event` },
  }
}
