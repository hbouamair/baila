'use client'

import { useState } from 'react'

import { BookStayLink } from '@/components/BookStayLink'
import { EarthGlobe } from '@/components/home/EarthGlobe'
import { Reveal } from '@/components/Reveal'
import type { AppLocale } from '@/i18n/routing'
import { flightFares } from '@/lib/flights'
import { formatPrice } from '@/lib/utils'

type FlightMapProps = {
  locale: AppLocale
  lead: string
  title: string
  intro: string
  note: string
  banner: string
  pin: string
  hint: string
  cta: string
}

function HotelRule() {
  return (
    <div className="hotel-rule" aria-hidden>
      <span />
    </div>
  )
}

export function FlightMap({ locale, lead, title, intro, note, banner, pin, hint, cta }: FlightMapProps) {
  const sorted = [...flightFares].sort((a, b) => a.price - b.price)
  const [focusCity, setFocusCity] = useState<string | null>(null)

  return (
    <section className="px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
      <Reveal className="mx-auto max-w-[40rem] text-center">
        <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{lead}</p>
        <h2 className="font-poster mt-3 text-[clamp(2.8rem,8vw,6rem)] leading-[0.9]">{title}</h2>
        <div className="mt-5">
          <HotelRule />
        </div>
        <p className="mt-5 text-lg text-pretty text-paper/74">{intro}</p>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-[72rem]" delay={80}>
        <div className="flight-poster">
          <div className="grid items-center gap-8 p-5 lg:grid-cols-12 lg:gap-4 lg:p-8">
            <div className="lg:col-span-7">
              <EarthGlobe locale={locale} pin={pin} hint={hint} focusCity={focusCity} />
            </div>
            <div className="lg:col-span-5">
              <p className="font-poster text-[1.6rem] leading-none text-sun">{pin}</p>
              <div className="mt-5 grid max-h-[28rem] gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:max-h-[34rem]">
                {sorted.map((fare) => (
                  <button
                    key={fare.city}
                    type="button"
                    className={`flight-fare-row${focusCity === fare.city ? ' is-active' : ''}`}
                    onClick={() => setFocusCity(fare.city)}
                  >
                    <span>{fare.city}</span>
                    <strong>{formatPrice(fare.price, 'EUR', locale)}</strong>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flight-banner">
            <p className="font-poster text-[clamp(1.2rem,2.4vw,1.7rem)] leading-[1.15]">{banner}</p>
            <p className="mt-2 text-sm text-night/70">{note}</p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10 flex justify-center">
        <BookStayLink>
          {cta}
          <span className="film-cta-mark" aria-hidden />
        </BookStayLink>
      </Reveal>
    </section>
  )
}
