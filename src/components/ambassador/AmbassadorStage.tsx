import { Reveal } from '@/components/Reveal'

type AmbassadorStageProps = {
  titleLead: string
  title: string
  intro: string
  apply: string
  nextLead: string
  nextBody: string
  children: React.ReactNode
}

function HotelRule() {
  return (
    <div className="hotel-rule" aria-hidden>
      <span />
    </div>
  )
}

export function AmbassadorStage({
  titleLead,
  title,
  intro,
  apply,
  nextLead,
  nextBody,
  children,
}: AmbassadorStageProps) {
  return (
    <div className="bg-night text-paper">
      <section className="ambassador-hero px-5 pt-32 pb-16 sm:px-10 sm:pt-36 lg:px-16 lg:pb-20">
        <div className="mx-auto max-w-[46rem]">
          <p className="venue-copy font-script text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.1] text-blush">{titleLead}</p>
          <h1 className="venue-copy font-poster mt-3 text-[clamp(3.2rem,8vw,6.6rem)] leading-[0.95] tracking-[-0.03em]">
            {title}
          </h1>
          <div className="venue-copy mt-6">
            <HotelRule />
          </div>
          <p className="venue-copy-late mx-auto mt-6 max-w-[36rem] text-lg text-pretty text-paper/80">{intro}</p>
          <div className="venue-copy-late mt-8 flex justify-center">
            <a href="#apply" className="film-cta">
              {apply}
              <span className="film-cta-mark" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-28 px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[76rem] items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="ambassador-panel p-7 sm:p-8 lg:sticky lg:top-28 lg:col-span-4">
            <h2 className="font-poster text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.95]">{apply}</h2>
            <div className="mt-5">
              <HotelRule />
            </div>
            <p className="mt-6 text-pretty text-paper/74">{intro}</p>
            <div className="ambassador-note">
              <p className="ambassador-note-label">{nextLead}</p>
              <p className="mt-2 text-sm text-pretty text-paper/78">{nextBody}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={80}>
            {children}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
