import { getPathname } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { HOTEL_NAME } from '@/lib/hotel'
import { absoluteUrl, getSiteUrl } from '@/lib/site'
import { featuredArtists, stayPackages } from '@/lib/stays'

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
  const pageUrl = `${site}/${locale}`
  const offerUrl = `${site}${getPathname({ locale: locale as AppLocale, href: '/pass' })}`

  return {
    '@context': 'https://schema.org',
    '@type': ['Event', 'DanceEvent'],
    '@id': `${site}/#event`,
    name: copy.name,
    description: copy.description,
    startDate: '2027-05-20',
    endDate: '2027-05-24',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: [
      absoluteUrl('/artists/lineup-hero.jpg'),
      absoluteUrl('/cinematic/nights.jpg'),
      absoluteUrl('/cinematic/hero.jpg'),
    ],
    url: pageUrl,
    inLanguage: locale,
    organizer: {
      '@type': 'Organization',
      '@id': `${site}/#organization`,
      name: 'Bailaimos Festival by El Baile',
      url: site,
    },
    performer: featuredArtists.map((artist) => ({
      '@type': artist.role === 'dj' ? 'Person' : 'PerformingGroup',
      name: artist.name,
      image: absoluteUrl(artist.photo.split('?')[0]),
    })),
    location: {
      '@type': 'Place',
      name: HOTEL_NAME,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Avenue du 7ème Art',
        addressLocality: 'Marrakech',
        addressRegion: 'Marrakech-Safi',
        postalCode: '40000',
        addressCountry: 'MA',
      },
    },
    offers: stayPackages.map((stay) => ({
      '@type': 'Offer',
      name: stay.name[locale as AppLocale],
      url: offerUrl,
      price: stay.tiers.find((tier) => tier.id === 'early')?.price ?? stay.tiers[0].price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    })),
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
  return {
    '@context': 'https://schema.org',
    '@type': input.role === 'dj' ? 'Person' : 'PerformingGroup',
    name: input.name,
    image: absoluteUrl(input.image.split('?')[0]),
    url: input.url,
  }
}
