import { getTranslations } from 'next-intl/server'

import { FooterNewsletter } from '@/components/FooterNewsletter'
import { Logo } from '@/components/Logo'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { withHotelName } from '@/lib/hotel'
import { getLegalPages } from '@/lib/payload'

type FooterProps = {
  locale: AppLocale
  festivalName: string
  footerNote?: string | null
  contactEmail?: string | null
  socials?: Array<{ label: string; url: string; id?: string | null }> | null
}

const leftLinks = [
  { href: '/' as const, key: 'home' as const },
  { href: '/artistes' as const, key: 'artists' as const },
  { href: '/programme' as const, key: 'programme' as const },
  { href: '/jack-and-jill' as const, key: 'jackJill' as const },
  { href: '/activites' as const, key: 'extras' as const },
  { href: '/ambassadeurs' as const, key: 'ambassadors' as const },
]

const rightLinks = [
  { href: '/infos-pratiques' as const, key: 'info' as const },
  { href: '/infos' as const, key: 'infos' as const },
  { href: '/pass' as const, key: 'pass' as const },
  { href: '/faq' as const, key: 'faq' as const },
  { href: '/contact' as const, key: 'contact' as const },
]

function SocialMark({ label }: { label: string }) {
  const name = label.toLowerCase()
  const path = name.includes('mail')
    ? 'M4 7h16v10H4V7Zm0 0 8 6 8-6'
    : name.includes('insta')
    ? 'M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm4 4.2A3.8 3.8 0 1 0 15.8 12 3.8 3.8 0 0 0 12 8.2ZM17.2 7.1h.01'
    : name.includes('face')
      ? 'M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.2l.8-3H13V9c0-.6.4-1 1-1Z'
      : name.includes('you')
        ? 'M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5v7A2.5 2.5 0 0 1 17.5 18h-11A2.5 2.5 0 0 1 4 15.5v-7ZM11 9.5v5l4.2-2.5L11 9.5Z'
        : name.includes('tik')
          ? 'M14 5v8.2a3.2 3.2 0 1 1-2.2-3V13a1.6 1.6 0 1 0 1.1 1.5V5h3.2a4.4 4.4 0 0 0 3.1 2.6V10a6.6 6.6 0 0 1-3.1-1.1V13a5.4 5.4 0 1 1-5.4-5.4'
          : 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 3.2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10.2 11h3.6v6h-1.8v-4.2h-1.8V11Z'

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-none stroke-current">
      <path d={path} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export async function Footer({ locale, festivalName, footerNote, socials, contactEmail }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'Footer' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })
  const pages = await getLegalPages(locale)
  const year = new Date().getFullYear()
  const blurb = footerNote ? withHotelName(footerNote) : t('blurb')

  return (
    <footer className="site-footer relative mt-auto text-paper">
      <div className="mx-auto grid max-w-[96rem] gap-14 px-5 py-16 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-20">
        <div className="lg:col-span-4">
          <p className="text-[0.72rem] tracking-[0.32em] text-sun uppercase">{t('edition')}</p>
          <Logo name={festivalName} className="mt-4" />
          <p className="mt-5 max-w-[22rem] text-sm leading-relaxed text-pretty text-paper/62">{blurb}</p>
        </div>

        <div className="lg:col-span-4">
          <h2 className="footer-kicker">{t('navigate')}</h2>
          <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
            <ul className="space-y-2.5">
              {leftLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/72 transition-colors hover:text-sun">
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              {rightLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/72 transition-colors hover:text-sun">
                    {item.key === 'pass' ? t('ticketing') : nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4">
          <h2 className="footer-kicker">{t('contactUs')}</h2>
          {contactEmail ? (
            <a href={`mailto:${contactEmail}`} className="mt-4 inline-flex items-center gap-2 text-sm text-paper/80 hover:text-sun">
              <SocialMark label="mail" />
              {contactEmail}
            </a>
          ) : (
            <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm text-paper/80 hover:text-sun">
              <SocialMark label="mail" />
              {nav('contact')}
            </Link>
          )}

          <h2 className="footer-kicker mt-8">{t('stayConnected')}</h2>
          {socials?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {socials.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={item.label}
                    className="footer-social"
                  >
                    <SocialMark label={item.label} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <FooterNewsletter />

          <p className="mt-8 text-[0.72rem] leading-[1.7] tracking-[0.22em] text-paper/62 uppercase">
            {t('dates')}
            <br />
            {t('place')}
            <br />
            {t('city')}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[96rem] flex-col gap-3 border-t border-sun/15 px-5 py-5 text-xs text-paper/42 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
        <p>
          © {year} {festivalName}. {t('rights')}
        </p>
        {pages.length ? (
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {pages.map((page) => (
              <li key={page.id}>
                <Link href={{ pathname: '/[slug]', params: { slug: page.slug } }} className="hover:text-sun">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  )
}
