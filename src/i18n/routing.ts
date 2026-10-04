import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en', 'es'],
  defaultLocale: 'fr',
  localePrefix: 'always',
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
    '/infos-pratiques': {
      fr: '/infos-pratiques',
      en: '/practical-info',
      es: '/info-practica',
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
