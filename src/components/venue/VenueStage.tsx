'use client'

import { useEffect, useRef } from 'react'

import { HotelMark } from '@/components/HotelMark'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/ui/Container'

export type VenueStat = {
  value: string
  label: string
}

type VenueStageProps = {
  title: string
  hotel: string
  intro: string
  place: string
  roomsLabel: string
  stats: VenueStat[]
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function VenueStage({ title, hotel, intro, place, roomsLabel, stats }: VenueStageProps) {
  const heroRef = useRef<HTMLElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const layer = layerRef.current
    const hero = heroRef.current
    if (!layer || !hero) return

    let raf = 0
    const update = () => {
      const rect = hero.getBoundingClientRect()
      const travel = Math.max(1, rect.height * 0.7)
      const progress = clamp(-rect.top / travel)
      layer.style.transform = `scale(${1 + progress * 0.08})`
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="bg-night text-paper">
      <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden">
        <div ref={layerRef} className="absolute inset-0 origin-center will-change-transform">
          <img
            src="/venue/exterior.jpg"
            alt=""
            className="venue-enter absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-night/88 via-night/42 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-night via-night/45 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pt-24 pb-8 sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <div className="venue-copy max-w-[14ch]">
            <p className="text-sm tracking-[0.22em] text-paper/55 uppercase">{title}</p>
            <h1 className="font-poster mt-3 text-[clamp(2.6rem,12vw,7rem)] leading-[0.86]">{hotel}</h1>
            <p className="font-script mt-2 text-[clamp(2rem,4.4vw,3.4rem)] text-blush">{place}</p>
          </div>
          <p className="venue-copy-late mt-4 max-w-[28rem] text-pretty text-paper/72 sm:mt-6 sm:text-lg">{intro}</p>
          <div className="venue-copy-late mt-5">
            <HotelMark />
          </div>
          <dl className="venue-copy-late mt-6 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="film-ticket w-full max-w-none px-3 py-3">
                <dt className="text-xs text-paper/55 sm:text-sm">{stat.label}</dt>
                <dd className="font-poster mt-1 text-[1.35rem] leading-none text-paper sm:text-[1.7rem]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Container className="pb-[var(--space-section)]">
        <Reveal>
          <p className="font-poster text-[clamp(2.4rem,5vw,4rem)]">{roomsLabel}</p>
        </Reveal>
        <div className="mt-8 grid items-end gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={40}>
            <figure className="film-portrait film-frame">
              <div className="film-frame-core aspect-[4/5] overflow-hidden bg-velvet lg:aspect-[5/6]">
                <img src="/venue/lobby.jpg" alt="" className="h-full w-full object-cover object-[center_20%]" />
              </div>
            </figure>
          </Reveal>
          <div className="grid gap-5 lg:col-span-5 lg:translate-y-10">
            <Reveal delay={120}>
              <figure className="film-portrait film-frame">
                <div className="film-frame-core aspect-[5/4] overflow-hidden bg-velvet">
                  <img
                    src="/examples/stays/one-bed.jpg?v=2"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </figure>
            </Reveal>
            <Reveal delay={200}>
              <figure className="film-portrait film-frame">
                <div className="film-frame-core aspect-[5/4] overflow-hidden bg-velvet">
                  <img
                    src="/examples/stays/double.jpg?v=2"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </Container>
    </div>
  )
}
