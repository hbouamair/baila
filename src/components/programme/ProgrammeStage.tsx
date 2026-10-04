import { Container } from '@/components/ui/Container'

type ProgrammeStageProps = {
  titleLead: string
  title: string
  intro: string
  seeDays: string
  children: React.ReactNode
}

export function ProgrammeStage({ titleLead, title, intro, seeDays, children }: ProgrammeStageProps) {
  return (
    <div className="bg-night text-paper">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/cinematic/plates/night.webp"
          alt=""
          className="venue-enter absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[82%] bg-gradient-to-r from-night via-night/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-night via-night/45 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-10 sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <div className="venue-copy">
            <p className="font-script max-w-[10ch] text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] text-blush">
              {titleLead}
            </p>
            <h1 className="font-poster mt-2 text-[clamp(2.7rem,12vw,8.2rem)] leading-[0.84]">
              {title}
            </h1>
          </div>
          <p className="venue-copy-late mt-6 max-w-[32rem] text-lg text-pretty text-paper/74">{intro}</p>
          <a href="#schedule" className="film-cta venue-copy-late mt-8 w-fit">
            {seeDays}
            <span className="film-cta-mark" aria-hidden />
          </a>
        </div>
      </section>

      <Container id="schedule" className="scroll-mt-28 py-[var(--space-section)]">
        {children}
      </Container>
    </div>
  )
}
