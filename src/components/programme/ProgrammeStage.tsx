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
      <section className="relative min-h-[72dvh] overflow-hidden sm:min-h-[100dvh]">
        <img
          src="/cinematic/plates/night.webp"
          alt=""
          className="venue-enter absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[82%] bg-gradient-to-r from-night via-night/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-night via-night/45 to-transparent" />

        <div className="relative z-10 flex min-h-[72dvh] flex-col justify-end px-5 pb-16 sm:min-h-[100dvh] sm:px-10 sm:pb-32 lg:px-16 lg:pb-36">
          <div className="venue-copy">
            <p className="font-script max-w-[12ch] text-[clamp(1.8rem,6vw,3.8rem)] leading-[1.1] text-blush">
              {titleLead}
            </p>
            <h1 className="font-poster mt-2 text-[clamp(2.4rem,11vw,8.2rem)] leading-[0.88]">
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

      <Container id="schedule" className="relative z-10 min-w-0 overflow-x-clip scroll-mt-28 -mt-6 px-4 pb-16 sm:-mt-14 sm:px-8 sm:pb-[var(--space-section)]">
        {children}
      </Container>
    </div>
  )
}
