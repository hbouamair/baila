import { BookStayLink } from '@/components/BookStayLink'
import { HotelMark } from '@/components/HotelMark'
import { Reveal } from '@/components/Reveal'
import type { AppLocale } from '@/i18n/routing'
import { stayPackages } from '@/lib/stays'
import { formatPrice } from '@/lib/utils'

type StoryShot = {
  src: string
  caption: string
  position?: string
}

type StayCopy = {
  body: string
  extraSrc?: string
  extraPosition?: string
}

type VenueStayProps = {
  locale: AppLocale
  storyLead: string
  storyTitle: string
  storyBody: string
  storyShot: StoryShot
  stayLead: string
  stayTitle: string
  stayIntro: string
  nights: string
  occupancy: (count: number) => string
  seePasses: string
  perPerson: string
  ctaTitle: string
  ctaBody: string
  stays: StayCopy[]
}

function HotelRule() {
  return (
    <div className="hotel-rule" aria-hidden>
      <span />
    </div>
  )
}

export function VenueStay({
  locale,
  storyLead,
  storyTitle,
  storyBody,
  storyShot,
  stayLead,
  stayTitle,
  stayIntro,
  nights,
  occupancy,
  seePasses,
  perPerson,
  ctaTitle,
  ctaBody,
  stays,
}: VenueStayProps) {
  return (
    <>
      <section className="px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-[40rem] text-center">
          <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{stayLead}</p>
          <h2 className="font-poster mt-3 text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05]">{stayTitle}</h2>
          <div className="mt-5">
            <HotelRule />
          </div>
          <p className="mt-5 text-lg text-pretty text-paper/74">{stayIntro}</p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stayPackages.map((stay, index) => {
            const copy = stays[index]
            if (!copy) return null
            const early = stay.tiers[0]
            return (
              <Reveal key={stay.id} delay={index * 80} className="h-full">
                <article className="suite-card">
                  <div className="suite-card-shot">
                    <img
                      src={stay.photo}
                      alt={stay.name[locale]}
                      style={stay.photoPosition ? { objectPosition: stay.photoPosition } : undefined}
                    />
                    <p className="suite-card-chip">{occupancy(stay.occupancy)}</p>
                  </div>
                  <div className="suite-card-body">
                    <h3 className="suite-card-name">{stay.name[locale]}</h3>
                    <p className="mt-2 text-sm text-paper/55">{nights}</p>
                    <p className="mt-4 text-pretty text-paper/78">{copy.body}</p>
                    {early ? (
                      <div className="suite-card-price">
                        <p className="text-sm text-blush">{early.label[locale]}</p>
                        <p className="font-poster mt-1 text-[2.15rem] leading-none text-paper">
                          {formatPrice(early.price, 'EUR', locale)}
                        </p>
                        <p className="mt-2 text-sm text-paper/55">{perPerson}</p>
                        <BookStayLink className="mt-5">
                          {seePasses}
                          <span className="film-cta-mark" aria-hidden />
                        </BookStayLink>
                      </div>
                    ) : (
                      <BookStayLink className="suite-card-price">
                        {seePasses}
                        <span className="film-cta-mark" aria-hidden />
                      </BookStayLink>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="hotel-split-frame">
              <figure className="suite-shot aspect-[4/5] sm:aspect-[16/11]">
                <img
                  src={storyShot.src}
                  alt={storyShot.caption}
                  className="h-full w-full object-cover"
                  style={storyShot.position ? { objectPosition: storyShot.position } : undefined}
                />
              </figure>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={80}>
            <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{storyLead}</p>
            <h2 className="font-poster mt-3 max-w-[14ch] text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05]">{storyTitle}</h2>
            <div className="mt-5">
              <HotelRule />
            </div>
            <p className="mt-6 max-w-[36rem] text-lg text-pretty text-paper/78">{storyBody}</p>
            <div className="mt-8">
              <HotelMark />
            </div>
            <p className="font-poster mt-10 text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1]">{ctaTitle}</p>
            <p className="mt-3 max-w-[32rem] text-pretty text-paper/74">{ctaBody}</p>
            <BookStayLink className="mt-7">
              {seePasses}
              <span className="film-cta-mark" aria-hidden />
            </BookStayLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
