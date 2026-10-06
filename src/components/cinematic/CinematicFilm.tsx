'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import { Link } from '@/i18n/navigation'

const HERO = '/cinematic/nights.jpg?v=2'

export type FilmArtist = {
  id: string | number
  name: string
  slug: string
  roleLabel: string
  country?: string | null
  photo: string
}

export type FilmCopy = {
  artists: string
  international: string
  getPass: string
}

type FilmDate = {
  start: string
  join: string
  end: string
  month: string
  year: string
}

type CinematicFilmProps = {
  copy: FilmCopy
  artists: FilmArtist[]
  when: string | null
  where: string
  date: FilmDate
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function pinProgress(el: HTMLElement | null) {
  if (!el) return 0
  const total = el.offsetHeight - window.innerHeight
  if (total <= 1) return 0
  return clamp(-el.getBoundingClientRect().top / total)
}

function BrandWordmark() {
  return (
    <div className="brand-lockup">
      <p className="brand-word">Bailaimos</p>
      <div className="brand-lockup-row">
        <p className="brand-word">Festival</p>
        <p className="font-script brand-script">By El Baile</p>
      </div>
    </div>
  )
}

function DatePlate({ date, where }: { date: FilmDate; where: string }) {
  return (
    <div className="film-date" aria-label={`${date.start} ${date.join} ${date.end} ${date.month} ${date.year}`}>
      <div className="film-date-pair">
        <div className="film-date-day">
          <span className="film-date-num">{date.start}</span>
        </div>
        <span className="font-script film-date-join">{date.join}</span>
        <div className="film-date-day">
          <span className="film-date-num">{date.end}</span>
        </div>
      </div>
      <p className="film-date-month">
        {date.month} {date.year}
      </p>
      <p className="film-date-where">{where}</p>
    </div>
  )
}

function StayCta({ label }: { label: string }) {
  return (
    <Link href="/pass" className="film-cta">
      {label}
      <span className="film-cta-mark" aria-hidden />
    </Link>
  )
}

export function CinematicFilm({ copy, artists, when: _when, where, date }: CinematicFilmProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const artistsRef = useRef<HTMLElement>(null)
  const artistsTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduce) return

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      autoRaf: false,
      anchors: true,
    })
    lenisRef.current = lenis
    const previousScroll = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'

    const update = () => {
      if (fine && artistsTrackRef.current && artistsRef.current) {
        const travel = Math.max(0, artistsTrackRef.current.scrollWidth - window.innerWidth)
        artistsTrackRef.current.style.transform = `translate3d(${-pinProgress(artistsRef.current) * travel}px, 0, 0)`
      }
    }

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      update()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
      document.documentElement.style.scrollBehavior = previousScroll
    }
  }, [])

  return (
    <div className="film-root bg-night text-paper">
      <section className="relative h-[100dvh] overflow-hidden">
        <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="pointer-events-none absolute inset-0 bg-night/25" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-night/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[68%] bg-gradient-to-r from-night/88 via-night/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-night via-night/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_12%_92%,rgb(6_20_12/0.92),transparent_62%)]" />
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-8 sm:px-10 sm:pb-10 lg:px-16 lg:pb-14">
          <h1 className="sr-only">Bailaimos Festival By El Baile</h1>
          <BrandWordmark />
          <div className="mt-12 flex flex-col items-start gap-5 sm:mt-14 lg:flex-row lg:items-end lg:justify-between">
            <DatePlate date={date} where={where} />
            <StayCta label={copy.getPass} />
          </div>
        </div>
      </section>

      {artists.length ? (
        <section ref={artistsRef} className="film-pin film-pin-artists bg-night">
          <div className="film-sticky lg:overflow-hidden">
            <h2 className="absolute top-28 left-5 z-10 font-poster text-[clamp(2.6rem,6vw,5rem)] sm:left-10 lg:top-32 lg:left-16">
              {copy.artists}
            </h2>
            <div
              ref={artistsTrackRef}
              className="flex h-full items-end gap-5 overflow-x-auto px-5 pt-44 pb-16 snap-x snap-mandatory sm:px-10 lg:w-max lg:items-center lg:gap-8 lg:overflow-visible lg:px-[8vw] lg:pt-0 lg:pb-0"
            >
              {artists.map((artist) => (
                <Link
                  key={artist.id}
                  href={{ pathname: '/artistes/[slug]', params: { slug: artist.slug } }}
                  className="film-portrait film-frame group relative block h-[64vh] w-[78vw] shrink-0 snap-center sm:w-[46vw] lg:h-[70vh] lg:w-[30vw]"
                >
                  <div className="film-frame-core relative h-full">
                    <img src={artist.photo} alt="" className="h-full w-full object-cover" style={{ objectPosition: 'center 38%' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="font-poster text-[clamp(1.8rem,3.4vw,3rem)] leading-none">{artist.name}</p>
                      <p className="mt-2 text-sm text-paper/70">{artist.country || copy.international}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
