import { Reveal } from '@/components/Reveal'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { stayPackages } from '@/lib/stays'
import { cn } from '@/lib/utils'

type GroundShot = {
  src: string
  caption: string
  position?: string
}

type StayCopy = {
  kicker: string
  body: string
  extraSrc?: string
  extraPosition?: string
}

type VenueStayProps = {
  locale: AppLocale
  storyLead: string
  storyTitle: string
  storyBody: string
  groundsTitle: string
  grounds: GroundShot[]
  stayLead: string
  stayTitle: string
  stayIntro: string
  nights: string
  occupancy: (count: number) => string
  seePasses: string
  stays: StayCopy[]
}

export function VenueStay({
  locale,
  storyLead,
  storyTitle,
  storyBody,
  groundsTitle,
  grounds,
  stayLead,
  stayTitle,
  stayIntro,
  nights,
  occupancy,
  seePasses,
  stays,
}: VenueStayProps) {
  return (
    <>
      <section className="px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-none text-blush">{storyLead}</p>
            <h2 className="font-poster mt-3 text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.88]">{storyTitle}</h2>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={80}>
            <p className="max-w-[36rem] text-lg text-pretty text-paper/74">{storyBody}</p>
          </Reveal>
        </div>

        <div className="mt-16">
          <p className="text-sm tracking-[0.22em] text-paper/50 uppercase">{groundsTitle}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {grounds.map((shot, index) => (
              <Reveal key={shot.src} delay={index * 70}>
                <figure className="film-portrait film-frame">
                  <div className="film-frame-core aspect-[3/4] overflow-hidden bg-velvet">
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      className="h-full w-full object-cover"
                      style={shot.position ? { objectPosition: shot.position } : undefined}
                    />
                  </div>
                  <figcaption className="mt-3 text-sm tracking-[0.16em] text-paper/55 uppercase">{shot.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
        <Reveal>
          <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-none text-blush">{stayLead}</p>
          <h2 className="font-poster mt-3 max-w-[14ch] text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.88]">{stayTitle}</h2>
          <p className="mt-6 max-w-[36rem] text-lg text-pretty text-paper/74">{stayIntro}</p>
        </Reveal>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {stayPackages.map((stay, index) => {
            const copy = stays[index]
            if (!copy) return null
            const reverse = index % 2 === 1
            return (
              <article key={stay.id} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <Reveal className={cn('relative lg:col-span-7', reverse && 'lg:order-2', copy.extraSrc && 'lg:pr-10 lg:pb-12')} delay={40}>
                  <div className="film-portrait film-frame">
                    <div className="film-frame-core aspect-[4/5] overflow-hidden bg-velvet sm:aspect-[5/4]">
                      <img
                        src={stay.photo}
                        alt={stay.name[locale]}
                        className="h-full w-full object-cover"
                        style={stay.photoPosition ? { objectPosition: stay.photoPosition } : undefined}
                      />
                    </div>
                  </div>
                  {copy.extraSrc ? (
                    <div className="mt-4 lg:absolute lg:-right-8 lg:-bottom-10 lg:mt-0 lg:w-[42%]">
                      <div className="film-portrait film-frame">
                        <div className="film-frame-core aspect-[4/5] overflow-hidden bg-velvet">
                          <img
                            src={copy.extraSrc}
                            alt=""
                            className="h-full w-full object-cover"
                            style={copy.extraPosition ? { objectPosition: copy.extraPosition } : undefined}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </Reveal>
                <Reveal className={cn('lg:col-span-5', reverse && 'lg:order-1 lg:pr-6')} delay={120}>
                  <p className="font-script text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-blush">{copy.kicker}</p>
                  <h3 className="font-poster mt-3 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.9]">{stay.name[locale]}</h3>
                  <p className="mt-4 text-sm tracking-[0.14em] text-sun uppercase">{occupancy(stay.occupancy)}</p>
                  <p className="mt-2 text-sm text-paper/55">{nights}</p>
                  <p className="mt-6 max-w-[28rem] text-lg text-pretty text-paper/78">{copy.body}</p>
                  <Link href="/pass" className="film-cta mt-8">
                    {seePasses}
                    <span className="film-cta-mark" aria-hidden />
                  </Link>
                </Reveal>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
