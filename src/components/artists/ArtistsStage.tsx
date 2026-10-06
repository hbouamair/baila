import type { ReactNode } from 'react'

import { ArtistCard, type ArtistCardArtist } from '@/components/ArtistCard'
import { Reveal } from '@/components/Reveal'
import type { AppLocale } from '@/i18n/routing'
import { resolveArtistPhoto } from '@/lib/utils'

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
  const wall = dancers.length ? dancers : lineup

  return (
    <div className="bg-night text-paper">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-4 lg:grid-cols-6">
          {wall.map((artist) => (
            <img
              key={artist.id}
              src={resolveArtistPhoto(artist)}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: 'center 42%' }}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-night/45" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-night/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-night/90 via-night/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-night via-night/75 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-10 sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <div className="venue-copy">
            <p className="font-script text-[clamp(2.2rem,5vw,3.8rem)] leading-none text-blush">{titleLead}</p>
            <h1 className="font-poster mt-2 max-w-[12ch] text-[clamp(3rem,12vw,8rem)] leading-[0.84]">{title}</h1>
          </div>
          <p className="venue-copy-late mt-6 max-w-[44rem] text-lg text-pretty text-paper/85 sm:text-2xl sm:leading-snug">
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
