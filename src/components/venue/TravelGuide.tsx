import { Reveal } from '@/components/Reveal'
import { HOTEL_ADDRESS, HOTEL_MAPS_URL, HOTEL_NAME, VISA_CHECKER_URL } from '@/lib/hotel'

type TravelCopy = {
  lead: string
  title: string
  intro: string
  addressTitle: string
  mapsCta: string
  flyTitle: string
  flyBody: string
  trainTitle: string
  trainBody: string
  busTitle: string
  busBody: string
  taxiTitle: string
  taxiFare: string
  taxiMad: string
  taxiPax: string
  taxiBody: string
  visaTitle: string
  visaBody: string
  visaCta: string
}

function HotelRule() {
  return (
    <div className="hotel-rule" aria-hidden>
      <span />
    </div>
  )
}

export function TravelGuide({ copy }: { copy: TravelCopy }) {
  return (
    <section id="travel" className="scroll-mt-28 border-t border-white/10 px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
      <Reveal className="mx-auto max-w-[40rem] text-center">
        <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{copy.lead}</p>
        <h2 className="font-poster mt-3 text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05]">{copy.title}</h2>
        <div className="mt-5">
          <HotelRule />
        </div>
        <p className="mt-5 text-lg text-pretty text-paper/74">{copy.intro}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <article className="suite-card h-full p-6 sm:p-8">
            <p className="text-sm text-sun">{copy.addressTitle}</p>
            <p className="font-poster mt-3 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1]">{HOTEL_NAME}</p>
            <p className="mt-4 max-w-[22rem] text-paper/75">{HOTEL_ADDRESS}</p>
            <a href={HOTEL_MAPS_URL} target="_blank" rel="noopener noreferrer" className="film-cta mt-8 w-fit">
              {copy.mapsCta}
              <span className="film-cta-mark" aria-hidden />
            </a>
          </article>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={80}>
          <div className="grid h-full gap-5 md:grid-cols-3">
            {[
              { title: copy.flyTitle, body: copy.flyBody },
              { title: copy.trainTitle, body: copy.trainBody },
              { title: copy.busTitle, body: copy.busBody },
            ].map((item) => (
              <article key={item.title} className="suite-card h-full p-5 sm:p-6">
                <h3 className="font-poster text-[1.5rem] leading-[1.1] text-sun">{item.title}</h3>
                <p className="mt-4 text-pretty text-paper/72">{item.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-5 grid items-stretch gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="suite-card flex h-full flex-col p-6 sm:p-8">
            <h3 className="font-poster text-[clamp(2rem,4vw,3rem)] leading-[1.1]">{copy.taxiTitle}</h3>
            <p className="font-poster mt-6 text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-sun">{copy.taxiFare}</p>
            <p className="mt-2 text-sm text-blush">{copy.taxiMad}</p>
            <p className="mt-2 text-sm text-paper/55">{copy.taxiPax}</p>
            <p className="mt-6 text-pretty text-paper/74">{copy.taxiBody}</p>
          </article>
        </Reveal>
        <Reveal delay={80}>
          <article className="suite-card flex h-full flex-col p-6 sm:p-8">
            <h3 className="font-poster text-[clamp(2rem,4vw,3rem)] leading-[1.1]">{copy.visaTitle}</h3>
            <p className="mt-6 text-pretty text-paper/74">{copy.visaBody}</p>
            <a href={VISA_CHECKER_URL} target="_blank" rel="noopener noreferrer" className="film-cta mt-8 w-fit">
              {copy.visaCta}
              <span className="film-cta-mark" aria-hidden />
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
