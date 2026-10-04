import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ArtistCard, type ArtistCardArtist } from '@/components/ArtistCard'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import type { AppLocale } from '@/i18n/routing'
import { getArtists } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'
import { featuredArtists } from '@/lib/stays'

type PageProps = {
  params: Promise<{ locale: AppLocale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return buildPageMetadata(locale, 'artistsTitle', 'artistsDescription', '/artistes')
}

function groupArtists(artists: ArtistCardArtist[]) {
  const dancers = artists.filter((artist) => artist.role !== 'dj')
  const djs = artists.filter((artist) => artist.role === 'dj')
  return { dancers, djs }
}

export default async function ArtistsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const [artists, t] = await Promise.all([
    getArtists(locale),
    getTranslations({ locale, namespace: 'Artists' }),
  ])
  const extras = featuredArtists
    .filter((featured) => !artists.some((artist) => artist.slug === featured.slug))
    .map((featured) => ({
      id: featured.id,
      name: featured.name,
      slug: featured.slug,
      role: featured.role,
      photo: featured.photo,
    }))
  const { dancers, djs } = groupArtists([...extras, ...artists])

  return (
    <>
      <PageHero title={t('title')} intro={t('intro')} />
      <Section>
        <Container>
          {artists.length ? (
            <div className="space-y-16">
              {dancers.length ? (
                <div>
                  <h2 className="font-poster text-[clamp(2rem,4vw,3.4rem)] text-paper">{t('sectionArtists')}</h2>
                  <p className="mt-2 max-w-xl text-sm text-paper/60">{t('sectionArtistsIntro')}</p>
                  <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {dancers.map((artist, index) => (
                      <Reveal key={artist.id} delay={(index % 5) * 70}>
                        <ArtistCard artist={artist} locale={locale} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ) : null}
              {djs.length ? (
                <div>
                  <h2 className="font-poster text-[clamp(2rem,4vw,3.4rem)] text-paper">{t('sectionDjs')}</h2>
                  <p className="mt-2 max-w-xl text-sm text-paper/60">{t('sectionDjsIntro')}</p>
                  <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {djs.map((artist, index) => (
                      <Reveal key={artist.id} delay={(index % 5) * 70}>
                        <ArtistCard artist={artist} locale={locale} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-ink-muted">{t('empty')}</p>
          )}
        </Container>
      </Section>
    </>
  )
}
