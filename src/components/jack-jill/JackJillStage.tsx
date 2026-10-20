import { Link } from '@/i18n/navigation'

type Round = {
  label: string
  when: string
  start: string
  end: string
  place: string
}

type JackJillStageProps = {
  titleLead: string
  intro: string
  rounds: string
  prelim: Round
  finalRound: Round
  drawTitle: string
  drawText: string
  jack: string
  jill: string
  steps: string[]
  programmeCta: string
}

function RoundBand({ round }: { round: Round }) {
  return (
    <article className="jj-band">
      <p className="font-script text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-blush">{round.when}</p>
      <h2 className="font-poster mt-4 text-[clamp(2.4rem,4vw,4rem)] leading-[0.92]">{round.label}</h2>
      <p className="jj-clock">
        <span>{round.start}</span>
        <span>{round.end}</span>
      </p>
      <p className="mt-6 text-sun">{round.place}</p>
    </article>
  )
}

export function JackJillStage({
  titleLead,
  intro,
  rounds,
  prelim,
  finalRound,
  drawTitle,
  drawText,
  jack,
  jill,
  steps,
  programmeCta,
}: JackJillStageProps) {
  return (
    <div className="bg-night text-paper">
      <section className="jj-hero">
        <div className="jj-hero-grid mx-auto max-w-[96rem] px-5 pt-32 pb-12 sm:px-10 lg:px-16 lg:pb-16">
          <div className="jj-hero-copy">
            <p className="font-script text-[clamp(2.1rem,5vw,3.6rem)] leading-none text-blush">{titleLead}</p>
            <h1 className="jj-mark font-poster">
              <span className="jj-jack">{jack}</span>
              <span className="jj-amp">&</span>
              <span className="jj-jill">{jill}</span>
            </h1>
            <p className="mt-6 max-w-[32rem] text-lg text-pretty text-paper/82 sm:text-xl">{intro}</p>
            <a href="#rounds" className="film-cta mt-8 w-fit">
              {rounds}
              <span className="film-cta-mark" aria-hidden />
            </a>
          </div>
          <aside className="jj-pair">
            <div>
              <p className="font-script text-[clamp(1.7rem,3vw,2.3rem)] leading-none text-blush">{prelim.label}</p>
              <p className="jj-pair-time">{prelim.start}</p>
              <p className="mt-2 text-paper/75">{prelim.when}</p>
              <p className="mt-1 text-sun">{prelim.place}</p>
            </div>
            <div className="jj-pair-join" aria-hidden>
              <span />
            </div>
            <div>
              <p className="font-script text-[clamp(1.7rem,3vw,2.3rem)] leading-none text-blush">{finalRound.label}</p>
              <p className="jj-pair-time">{finalRound.start}</p>
              <p className="mt-2 text-paper/75">{finalRound.when}</p>
              <p className="mt-1 text-sun">{finalRound.place}</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="rounds" className="jj-rounds scroll-mt-28">
        <RoundBand round={prelim} />
        <RoundBand round={finalRound} />
      </section>

      <section className="px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[76rem] items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-poster text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.92]">{drawTitle}</h2>
            <p className="mt-6 max-w-[36rem] text-lg text-pretty text-paper/78">{drawText}</p>
          </div>
          <ol className="jj-steps lg:col-span-5">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="mx-auto mt-14 flex max-w-[76rem]">
          <Link href="/programme" className="film-cta">
            {programmeCta}
            <span className="film-cta-mark" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  )
}
