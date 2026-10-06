'use client'

import { useEffect, useRef } from 'react'

import { HotelMark } from '@/components/HotelMark'

export type VenueStat = {
  value: string
  label: string
}

type VenueStageProps = {
  title: string
  headline: string
  hotel: string
  intro: string
  place?: string
  stats: VenueStat[]
  children?: React.ReactNode
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function VenueStage({ title, headline, intro, place, stats, children }: VenueStageProps) {
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
            src="/venue/lobby-atrium.jpg"
            alt=""
            className="venue-enter absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-night/88 via-night/42 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-night via-night/45 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pt-24 pb-8 sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <div className="venue-copy w-full max-w-[min(72rem,96vw)]">
            <p className="font-script max-w-none text-[clamp(2.1rem,4.2vw,3.8rem)] leading-[1.05] text-blush">{title}</p>
            <h1 className="font-poster mt-2 max-w-none text-[clamp(2.4rem,7.2vw,6.2rem)] leading-[0.9] tracking-[-0.03em] text-balance">
              {headline}
            </h1>
            {place ? <p className="mt-2 text-sm tracking-[0.18em] text-paper/50 uppercase">{place}</p> : null}
          </div>
          <p className="venue-copy-late mt-4 max-w-[44rem] text-pretty text-paper/78 sm:mt-6 sm:text-lg sm:leading-snug">{intro}</p>
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

      {children}
    </div>
  )
}
