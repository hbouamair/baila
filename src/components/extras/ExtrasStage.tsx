import { getTranslations } from 'next-intl/server'

import { ExtraGlyph } from '@/components/extras/ExtraGlyph'
import { Reveal } from '@/components/Reveal'
import { Link } from '@/i18n/navigation'
import { extraTrips } from '@/lib/extras'

function HotelRule() {
  return (
    <div className="hotel-rule" aria-hidden>
      <span />
    </div>
  )
}

type TripCopy = {
  kicker: string
  name: string
  price: string
  when: string
  body: string
  features: string[]
}

export async function ExtrasStage() {
  const t = await getTranslations('Extras')
  const trips = t.raw('trips') as TripCopy[]

  return (
    <div className="bg-night text-paper">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/cinematic/plates/souk.jpg"
          alt=""
          className="venue-enter absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-night/42" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-night/84 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[82%] bg-gradient-to-r from-night/94 via-night/58 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-night via-night/72 to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-[96rem] items-end gap-10 px-5 pt-28 pb-10 sm:px-10 lg:grid-cols-12 lg:px-16 lg:pb-16">
          <div className="lg:col-span-7">
            <p className="venue-copy font-script text-[clamp(2.2rem,5vw,3.8rem)] leading-none text-blush">
              {t('titleLead')}
            </p>
            <h1 className="venue-copy font-poster mt-2 text-[clamp(3rem,10vw,7.4rem)] leading-[0.84]">
              {t('title')}
            </h1>
            <p className="venue-copy-late mt-3 text-sm tracking-[0.22em] text-sun uppercase">{t('kicker')}</p>
            <p className="venue-copy-late mt-6 max-w-[34rem] text-lg text-pretty text-paper/80 sm:text-xl">
              {t('intro')}
            </p>
            <a href="#trips" className="film-cta venue-copy-late mt-8 w-fit">
              {t('seeTrips')}
              <span className="film-cta-mark" aria-hidden />
            </a>
          </div>

          <div className="venue-copy-late hidden lg:col-span-5 lg:block">
            <figure className="campaign-print campaign-print-tilt mx-auto max-w-[22rem]">
              <img src="/campaign/extras-poster.jpg" alt="" />
            </figure>
          </div>
        </div>
      </section>

      <section id="trips" className="scroll-mt-28 px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-[40rem] text-center">
          <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{t('listLead')}</p>
          <h2 className="font-poster mt-3 text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05]">{t('listTitle')}</h2>
          <div className="mt-5">
            <HotelRule />
          </div>
          <p className="mt-5 text-lg text-pretty text-paper/74">{t('listIntro')}</p>
        </Reveal>

        <div className="mx-auto mt-16 flex max-w-[88rem] flex-col gap-16 lg:gap-24">
          {extraTrips.map((trip, index) => {
            const copy = trips[index]
            if (!copy) return null
            const reverse = index === 1

            return (
              <article
                key={trip.id}
                id={trip.id}
                className="extras-chapter grid items-stretch gap-8 lg:grid-cols-12 lg:gap-14"
              >
                <Reveal className={`relative lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
                  <div className="extras-shot">
                    <img src={trip.image} alt="" style={{ objectPosition: trip.position }} />
                    <p className="extras-price">{copy.price}</p>
                  </div>
                </Reveal>
                <Reveal delay={80} className={`flex flex-col justify-center lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
                  <p className="text-sm tracking-[0.2em] text-sun uppercase">{copy.kicker}</p>
                  <h3 className="font-poster mt-3 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.9]">{copy.name}</h3>
                  <p className="mt-3 text-sm text-blush">{copy.when}</p>
                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                    {copy.features.map((feature, featureIndex) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-paper/80">
                        <span className="text-sun">
                          <ExtraGlyph name={trip.glyphs[featureIndex] ?? 'palm'} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 max-w-[32rem] text-lg text-pretty text-paper/76">{copy.body}</p>
                  <Link href="/contact" className="film-cta mt-8 w-fit">
                    {t('book')}
                    <span className="film-cta-mark" aria-hidden />
                  </Link>
                </Reveal>
              </article>
            )
          })}
        </div>
      </section>

      <section className="px-5 pb-[var(--space-section)] sm:px-10 lg:px-16">
        <Reveal className="extras-close mx-auto max-w-[52rem] text-center">
          <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{t('closeLead')}</p>
          <h2 className="font-poster mt-3 text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.94]">{t('closeTitle')}</h2>
          <p className="mx-auto mt-5 max-w-[36rem] text-lg text-pretty text-paper/74">{t('bookNote')}</p>
          <Link href="/contact" className="film-cta mx-auto mt-8">
            {t('book')}
            <span className="film-cta-mark" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
