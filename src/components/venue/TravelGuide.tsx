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

export function TravelGuide({ copy }: { copy: TravelCopy }) {
  return (
    <section id="travel" className="scroll-mt-28 border-t border-white/10 px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
      <Reveal>
        <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-none text-blush">{copy.lead}</p>
        <h2 className="font-poster mt-3 max-w-[16ch] text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.88]">{copy.title}</h2>
        <p className="mt-6 max-w-[40rem] text-lg text-pretty text-paper/74">{copy.intro}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <article className="h-full rounded-[1.6rem] border border-white/10 bg-velvet/60 p-6 sm:p-8">
            <p className="text-sm tracking-[0.18em] text-sun uppercase">{copy.addressTitle}</p>
            <p className="font-poster mt-3 text-[clamp(1.8rem,3vw,2.6rem)] leading-[0.92]">{HOTEL_NAME}</p>
            <p className="mt-4 max-w-[22rem] text-paper/75">{HOTEL_ADDRESS}</p>
            <a
              href={HOTEL_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="film-cta mt-8 w-fit"
            >
              {copy.mapsCta}
              <span className="film-cta-mark" aria-hidden />
            </a>
          </article>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={80}>
          <div className="grid h-full gap-6 md:grid-cols-3">
            {[
              { title: copy.flyTitle, body: copy.flyBody },
              { title: copy.trainTitle, body: copy.trainBody },
              { title: copy.busTitle, body: copy.busBody },
            ].map((item) => (
              <article key={item.title} className="h-full rounded-[1.4rem] border border-white/10 px-5 py-6">
                <h3 className="font-poster text-[1.7rem] leading-none">{item.title}</h3>
                <p className="mt-4 text-pretty text-paper/72">{item.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="flex h-full flex-col rounded-[1.6rem] border border-white/10 bg-velvet/40 p-6 sm:p-8">
            <h3 className="font-poster text-[clamp(2rem,4vw,3.2rem)] leading-[0.9]">{copy.taxiTitle}</h3>
            <p className="font-poster mt-6 text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-sun">{copy.taxiFare}</p>
            <p className="mt-2 text-sm text-blush">{copy.taxiMad}</p>
            <p className="mt-2 text-sm tracking-[0.12em] text-paper/55 uppercase">{copy.taxiPax}</p>
            <p className="mt-6 text-pretty text-paper/74">{copy.taxiBody}</p>
          </article>
        </Reveal>
        <Reveal delay={80}>
          <article className="flex h-full flex-col rounded-[1.6rem] border border-white/10 bg-velvet/40 p-6 sm:p-8">
            <h3 className="font-poster text-[clamp(2rem,4vw,3.2rem)] leading-[0.9]">{copy.visaTitle}</h3>
            <p className="mt-6 text-pretty text-paper/74">{copy.visaBody}</p>
            <a
              href={VISA_CHECKER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="film-cta mt-8 w-fit"
            >
              {copy.visaCta}
              <span className="film-cta-mark" aria-hidden />
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
