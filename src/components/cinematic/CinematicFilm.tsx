'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import { Link } from '@/i18n/navigation'

const HERO = '/cinematic/hero.webp?v=6'

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
  zoom1: string
  zoom1Sub: string
  zoom2: string
  zoom2Sub: string
}

type CinematicFilmProps = {
  copy: FilmCopy
  artists: FilmArtist[]
  when: string | null
  where: string
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

function Ticket({ when, where }: { when: string | null; where: string }) {
  return (
    <div className="film-ticket">
      {when ? <p className="font-poster text-[1.35rem] leading-none text-paper">{when}</p> : null}
      <p className="text-sm text-paper/72">{where}</p>
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

function beatOpacity(progress: number, inStart: number, inEnd: number, outStart: number, outEnd: number) {
  if (progress <= inStart) return 0
  if (progress < inEnd) return (progress - inStart) / (inEnd - inStart)
  if (progress <= outStart) return 1
  if (progress < outEnd) return 1 - (progress - outStart) / (outEnd - outStart)
  return 0
}

function paintBeat(el: HTMLElement | null, opacity: number) {
  if (!el) return
  const hidden = opacity < 0.04
  el.style.opacity = hidden ? '0' : opacity.toFixed(3)
  el.style.transform = `translate3d(0, ${(1 - opacity) * 16}px, 0)`
  el.style.pointerEvents = opacity > 0.45 ? 'auto' : 'none'
  el.setAttribute('aria-hidden', opacity < 0.2 ? 'true' : 'false')
}

export function CinematicFilm({ copy, artists, when, where }: CinematicFilmProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const heroLayerRef = useRef<HTMLDivElement>(null)
  const beat0Ref = useRef<HTMLDivElement>(null)
  const beat1Ref = useRef<HTMLDivElement>(null)
  const beat2Ref = useRef<HTMLDivElement>(null)
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
      const progress = pinProgress(heroRef.current)
      const zoom = 1.04 + progress * 0.22
      if (heroLayerRef.current) {
        heroLayerRef.current.style.transform = `scale(${zoom})`
      }
      paintBeat(beat0Ref.current, beatOpacity(progress, -1, 0, 0.22, 0.38))
      paintBeat(beat1Ref.current, beatOpacity(progress, 0.28, 0.44, 0.58, 0.74))
      paintBeat(beat2Ref.current, beatOpacity(progress, 0.64, 0.8, 1.2, 1.3))
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
      <section ref={heroRef} className="film-pin">
        <div className="film-sticky">
          <div ref={heroLayerRef} className="absolute inset-0 will-change-transform">
            <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-night/82 via-night/40 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-night via-night/35 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-8 sm:px-10 sm:pb-10 lg:px-16 lg:pb-14">
            <div className="film-scrub-copy relative min-h-[38vh] sm:min-h-[42vh]">
              <div ref={beat0Ref} className="film-beat absolute inset-x-0 bottom-0">
                <h1 className="font-poster max-w-[9ch] text-[clamp(3.1rem,14vw,10.5rem)]">Bailaimos</h1>
                <p className="font-script mt-1 ml-1 pb-1 text-[clamp(2rem,4.6vw,3.5rem)] text-blush">By El Baile</p>
              </div>
              <div
                ref={beat1Ref}
                className="film-beat absolute inset-x-0 bottom-0"
                style={{ opacity: 0 }}
                aria-hidden
              >
                <p className="font-poster max-w-[11ch] text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.9]">{copy.zoom1}</p>
                <p className="mt-4 max-w-[22rem] text-lg text-paper/74">{copy.zoom1Sub}</p>
              </div>
              <div
                ref={beat2Ref}
                className="film-beat absolute inset-x-0 bottom-0"
                style={{ opacity: 0 }}
                aria-hidden
              >
                <p className="font-poster max-w-[10ch] text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.9]">{copy.zoom2}</p>
                <p className="font-script mt-2 text-[clamp(1.8rem,4vw,3rem)] text-blush">{copy.zoom2Sub}</p>
              </div>
            </div>
            <div className="film-still-copy flex-col justify-end">
              <h1 className="font-poster max-w-[9ch] text-[clamp(3.1rem,14vw,10.5rem)]">Bailaimos</h1>
              <p className="font-script mt-1 ml-1 pb-1 text-[clamp(2rem,4.6vw,3.5rem)] text-blush">By El Baile</p>
              <p className="font-poster mt-8 max-w-[14ch] text-[clamp(2rem,6vw,3.4rem)] leading-none">{copy.zoom1}</p>
              <p className="mt-3 max-w-[22rem] text-lg text-paper/74">{copy.zoom1Sub}</p>
              <p className="font-poster mt-6 max-w-[12ch] text-[clamp(2rem,6vw,3.4rem)] leading-none">{copy.zoom2}</p>
              <p className="font-script mt-2 text-[clamp(1.8rem,4vw,3rem)] text-blush">{copy.zoom2Sub}</p>
            </div>
            <div className="mt-8 flex flex-col items-start gap-4 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
              <Ticket when={when} where={where} />
              <StayCta label={copy.getPass} />
            </div>
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
                    <img src={artist.photo} alt="" className="h-full w-full object-cover object-top" />
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
