'use client'

import { useEffect, useRef } from 'react'

import { BookStayLink } from '@/components/BookStayLink'

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
  bookLabel: string
  children?: React.ReactNode
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function VenueStage({ title, headline, intro, stats, bookLabel, children }: VenueStageProps) {
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
            src="/venue/entrance.jpg?v=1"
            alt=""
            className="venue-enter absolute inset-0 h-full w-full object-cover object-[center_48%]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-night/45" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-night/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-night via-night/55 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-5 pt-24 pb-28 text-center sm:px-10 lg:px-16">
          <p className="venue-copy font-script text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[1.1] text-blush">{title}</p>
          <h1 className="venue-copy font-poster mt-3 max-w-[16ch] text-[clamp(2.4rem,6.4vw,5.6rem)] leading-[1.05] tracking-[-0.03em] text-balance">
            {headline}
          </h1>
          <p className="venue-copy-late mx-auto mt-5 max-w-[36rem] text-pretty text-paper/80 sm:text-lg">{intro}</p>
          <div className="venue-copy-late mt-8 flex justify-center">
            <BookStayLink>
              {bookLabel}
              <span className="film-cta-mark" aria-hidden />
            </BookStayLink>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-16 w-full max-w-[88rem] px-5 sm:px-10 lg:-mt-20 lg:px-16">
        <dl className="hotel-bar grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="hotel-bar-cell">
              <dt className="text-[0.72rem] text-paper/55 sm:text-sm">{stat.label}</dt>
              <dd className="font-poster mt-1 text-[1.35rem] leading-none text-sun sm:text-[1.7rem]">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {children}
    </div>
  )
}
