import { Reveal } from '@/components/Reveal'

type AmbassadorStageProps = {
  titleLead: string
  title: string
  intro: string
  rewardsLead: string
  rewards: string
  apply: string
  perks: string[]
  reasons: string[]
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
  rewardsLead,
  rewards,
  apply,
  perks,
  reasons,
  children,
}: AmbassadorStageProps) {
  return (
    <div className="bg-night text-paper">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/cinematic/ambassador.jpg?v=5"
          alt=""
          className="venue-enter absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-night/40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-night/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-night/88 via-night/42 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-night via-night/50 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pt-24 pb-12 sm:px-10 sm:pb-14 lg:px-16 lg:pb-16">
          <p className="venue-copy font-script text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.1] text-blush">{titleLead}</p>
          <h1 className="venue-copy font-poster mt-3 max-w-[12ch] text-[clamp(2.8rem,8vw,6.4rem)] leading-[1.05] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="venue-copy-late mt-6 max-w-[34rem] text-lg text-pretty text-paper/80">{intro}</p>
          <a href="#apply" className="film-cta venue-copy-late mt-8 w-fit">
            {apply}
            <span className="film-cta-mark" aria-hidden />
          </a>
        </div>
      </section>

      <section className="px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{rewardsLead}</p>
            <div className="mt-5">
              <HotelRule />
            </div>
            <p className="mt-6 max-w-[32rem] text-lg text-pretty text-paper/78">{rewards}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {perks.map((item, index) => (
              <Reveal key={item} delay={index * 70} className="h-full">
                <article className="perk-plate h-full">
                  <span className="perk-mark" aria-hidden />
                  <p className="font-poster mt-8 text-[clamp(1.45rem,2.4vw,1.95rem)] leading-[1.08] text-paper">{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="hotel-bar mt-16 grid sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => (
            <Reveal key={item} delay={index * 50} className="hotel-bar-cell h-full">
              <p className="text-paper/82">{item}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="apply" className="scroll-mt-28 border-t border-white/10 px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-4">
            <h2 className="font-poster text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">{apply}</h2>
            <div className="mt-5">
              <HotelRule />
            </div>
            <p className="mt-6 max-w-[28rem] text-pretty text-paper/74">{intro}</p>
            <ul className="mt-8 space-y-4">
              {perks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-paper/80">
                  <span className="perk-mark mt-1.5 shrink-0" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={80}>
            {children}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
