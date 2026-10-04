import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/ui/Container'

type AmbassadorStageProps = {
  titleLead: string
  title: string
  intro: string
  rewards: string
  apply: string
  perks: string[]
  reasons: string[]
  children: React.ReactNode
}

export function AmbassadorStage({
  titleLead,
  title,
  intro,
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[80%] bg-gradient-to-r from-night via-night/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-night via-night/40 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-10 sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <div className="venue-copy max-w-[16ch]">
            <p className="font-script text-[clamp(2.2rem,5vw,3.8rem)] leading-none text-blush">{titleLead}</p>
            <h1 className="font-poster mt-2 text-[clamp(2.6rem,12vw,8rem)] leading-[0.84]">{title}</h1>
          </div>
          <p className="venue-copy-late mt-6 max-w-[32rem] text-lg text-pretty text-paper/74">{intro}</p>
          <a href="#apply" className="film-cta venue-copy-late mt-8 w-fit">
            {apply}
            <span className="film-cta-mark" aria-hidden />
          </a>
        </div>
      </section>

      <Container className="py-[var(--space-section)]">
        <div className="grid items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-[34rem] text-xl text-pretty text-paper/78">{rewards}</p>
            </Reveal>
            <ol className="mt-14 space-y-0">
              {perks.map((item, index) => (
                <Reveal key={item} delay={index * 80}>
                  <li className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-white/10 py-7">
                    <span className="font-poster text-[clamp(2.4rem,5vw,4rem)] leading-none text-blush">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="font-poster text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[0.95]">{item}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {reasons.map((item, index) => (
                <Reveal key={item} delay={index * 60}>
                  <p className="film-ticket w-full max-w-none text-sm text-paper/80">{item}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div id="apply" className="scroll-mt-28 lg:sticky lg:top-28 lg:col-span-5">
            <Reveal delay={120}>{children}</Reveal>
          </div>
        </div>
      </Container>
    </div>
  )
}
