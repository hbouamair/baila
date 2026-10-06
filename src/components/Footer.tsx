import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { Container } from '@/components/ui/Container'
import { FooterNewsletter } from '@/components/FooterNewsletter'
import { Logo } from '@/components/Logo'
import { HOTEL_NAME, withHotelName } from '@/lib/hotel'
import { getLegalPages } from '@/lib/payload'

type FooterProps = {
  locale: AppLocale
  festivalName: string
  footerNote?: string | null
  contactEmail?: string | null
  socials?: Array<{ label: string; url: string; id?: string | null }> | null
}

export async function Footer({ locale, festivalName, footerNote, socials, contactEmail }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'Footer' })
  const nav = await getTranslations({ locale, namespace: 'Nav' })
  const pages = await getLegalPages(locale)
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-auto border-t border-white/10 bg-night text-paper">
      <Container className="relative py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <Logo name={festivalName} className="mb-6" />
            <h2 className="font-poster text-[1.9rem] text-paper">{t('about')}</h2>
            <p className="mt-3 max-w-sm text-[0.95rem] text-paper/65">
              {footerNote ? withHotelName(footerNote) : HOTEL_NAME}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-paper/75">
              <li>
                <Link href="/" className="link-quiet">
                  {nav('home')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="link-quiet">
                  {nav('faq')}
                </Link>
              </li>
              {pages.map((page) => (
                <li key={page.id}>
                  <Link href={{ pathname: '/[slug]', params: { slug: page.slug } }} className="link-quiet">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-poster text-[1.9rem] text-paper">{t('eventInfo')}</h2>
            <ul className="mt-5 space-y-2 text-sm text-paper/75">
              <li>
                <Link href="/artistes" className="link-quiet">
                  {nav('artists')}
                </Link>
              </li>
              <li>
                <Link href="/ambassadeurs" className="link-quiet">
                  {nav('ambassadors')}
                </Link>
              </li>
              <li>
                <Link href="/programme" className="link-quiet">
                  {nav('programme')}
                </Link>
              </li>
              <li>
                <Link href="/pass" className="link-quiet">
                  {t('ticketing')}
                </Link>
              </li>
              <li>
                <Link href="/infos-pratiques" className="link-quiet">
                  {nav('info')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-quiet">
                  {nav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-poster text-[1.9rem] text-paper">{t('stayConnected')}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {socials?.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-paper/80 transition-[border-color,color] duration-200 hover:border-gold hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-sm font-semibold text-paper">{t('newsletter')}</h3>
            <FooterNewsletter />
            {contactEmail ? (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-paper">{t('contactUs')}</h3>
                <a href={`mailto:${contactEmail}`} className="mt-2 inline-block text-sm text-gold hover:underline">
                  {contactEmail}
                </a>
              </div>
            ) : null}
          </div>
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-sm text-paper/40">
          © {year} {festivalName}. {t('rights')}
        </p>
      </Container>
    </footer>
  )
}
