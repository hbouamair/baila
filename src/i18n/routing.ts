import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en', 'es'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/pass': {
      fr: '/pass',
      en: '/passes',
      es: '/pases',
    },
    '/artistes': {
      fr: '/artistes',
      en: '/artists',
      es: '/artistas',
    },
    '/artistes/[slug]': {
      fr: '/artistes/[slug]',
      en: '/artists/[slug]',
      es: '/artistas/[slug]',
    },
    '/programme': {
      fr: '/programme',
      en: '/program',
      es: '/programa',
    },
    '/jack-and-jill': {
      fr: '/jack-et-jill',
      en: '/jack-and-jill',
      es: '/jack-and-jill',
    },
    '/infos-pratiques': {
      fr: '/infos-pratiques',
      en: '/practical-info',
      es: '/info-practica',
    },
    '/infos': {
      fr: '/infos',
      en: '/info',
      es: '/infos',
    },
    '/activites': {
      fr: '/activites',
      en: '/extras',
      es: '/extras',
    },
    '/faq': '/faq',
    '/contact': '/contact',
    '/ambassadeurs': {
      fr: '/ambassadeurs',
      en: '/ambassadors',
      es: '/embajadores',
    },
    '/[slug]': '/[slug]',
  },
})

export type AppLocale = (typeof routing.locales)[number]
