import type { ReactNode } from 'react'

import { ArtistCard, type ArtistCardArtist } from '@/components/ArtistCard'
import { Reveal } from '@/components/Reveal'
import type { AppLocale } from '@/i18n/routing'

type ArtistsStageProps = {
  locale: AppLocale
  titleLead: string
  title: string
  caption: ReactNode
  countLabel: string
  sectionKicker: string
  sectionDisplay: string
  sectionScript: string
  sectionIntro: ReactNode
  sectionNames: string
  sectionDjs: string
  sectionDjsKicker: string
  sectionDjsScript: string
  sectionDjsIntro: string
  sectionDjNames: string
  empty: string
  dancers: ArtistCardArtist[]
  djs: ArtistCardArtist[]
}

export async function ArtistsStage({
  locale,
  titleLead,
  title,
  caption,
  countLabel,
  sectionKicker,
  sectionDisplay,
  sectionScript,
  sectionIntro,
  sectionNames,
  sectionDjs,
  sectionDjsKicker,
  sectionDjsScript,
  sectionDjsIntro,
  sectionDjNames,
  empty,
  dancers,
  djs,
}: ArtistsStageProps) {
  const lineup = [...dancers, ...djs]

  return (
    <div className="bg-night text-paper">
      <section className="relative min-h-[100dvh] overflow-hidden bg-[#edf3b0]">
        <picture>
          <source media="(min-width: 768px)" srcSet="/artists/lineup-hero.jpg?v=3" width={2048} height={1152} />
          <img
            src="/artists/lineup-hero-mobile.jpg?v=1"
            alt=""
            width={1408}
            height={1760}
            className="venue-enter absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-night/55 via-night/18 to-transparent md:w-[72%] md:from-night/88 md:via-night/42" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-night via-night/45 to-transparent md:h-[55%]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night/55 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pt-24 pb-8 sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <div className="venue-copy w-full max-w-[min(72rem,96vw)]">
            <p className="font-script max-w-none text-[clamp(2.1rem,4.2vw,3.8rem)] leading-[1.05] text-blush">{titleLead}</p>
            <h1 className="font-poster mt-2 max-w-none text-[clamp(2.4rem,7.2vw,6.2rem)] leading-[0.9] tracking-[-0.03em] text-balance">
              {title}
            </h1>
          </div>
          <p className="venue-copy-late mt-4 max-w-[44rem] text-pretty text-paper/78 sm:mt-6 sm:text-lg sm:leading-snug">
            {caption}
          </p>
          <p className="venue-copy-late mt-5 text-sm tracking-[0.12em] text-sun uppercase sm:tracking-[0.22em]">{countLabel}</p>
        </div>
      </section>

      <div className="px-5 pb-[var(--space-section)] pt-10 sm:px-8 sm:pt-12 lg:px-16 lg:pt-16">
        {lineup.length ? (
          <div className="space-y-24">
            {dancers.length ? (
              <section>
                <Reveal>
                  <div className="artist-folio">
                    <div className="artist-folio-meta">
                      <p>
                        <span className="artist-folio-index">01</span>
                        {'  '}
                        {sectionKicker}
                      </p>
                      <p>{sectionNames}</p>
                    </div>
                    <div className="artist-folio-body">
                      <h2 className="artist-folio-word">
                        {sectionDisplay}
                        <span className="artist-folio-script">{sectionScript}</span>
                      </h2>
                      <p className="artist-folio-copy">{sectionIntro}</p>
                    </div>
                  </div>
                </Reveal>
                <div className="artist-masonry">
                  {dancers.map((artist, index) => (
                    <Reveal key={artist.id} className="artist-masonry-item" delay={(index % 4) * 60}>
                      <ArtistCard artist={artist} locale={locale} />
                    </Reveal>
                  ))}
                </div>
              </section>
            ) : null}

            {djs.length ? (
              <section>
                <Reveal>
                  <div className="artist-folio">
                    <div className="artist-folio-meta">
                      <p>
                        <span className="artist-folio-index">02</span>
                        {'  '}
                        {sectionDjsKicker}
                      </p>
                      <p>{sectionDjNames}</p>
                    </div>
                    <div className="artist-folio-body">
                      <h2 className="artist-folio-word">
                        {sectionDjs}
                        <span className="artist-folio-script">{sectionDjsScript}</span>
                      </h2>
                      <p className="artist-folio-copy">{sectionDjsIntro}</p>
                    </div>
                  </div>
                </Reveal>
                <div className="artist-masonry">
                  {djs.map((artist, index) => (
                    <Reveal key={artist.id} className="artist-masonry-item" delay={(index % 4) * 60}>
                      <ArtistCard artist={artist} locale={locale} />
                    </Reveal>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : (
          <p className="text-ink-muted">{empty}</p>
        )}
      </div>
    </div>
  )
}
