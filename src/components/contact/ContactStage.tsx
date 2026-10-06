import { Reveal } from '@/components/Reveal'
import { Link } from '@/i18n/navigation'

type ContactNote = {
  label: string
  value: string
}

type ContactStageProps = {
  titleLead: string
  title: string
  intro: string
  write: string
  notes: ContactNote[]
  faqCta: string
  passCta: string
  children: React.ReactNode
}

export function ContactStage({
  titleLead,
  title,
  intro,
  write,
  notes,
  faqCta,
  passCta,
  children,
}: ContactStageProps) {
  return (
    <div className="bg-night text-paper">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/venue/terrace.jpg"
          alt=""
          className="venue-enter absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-night/28" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-night/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[80%] bg-gradient-to-r from-night/92 via-night/58 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-night via-night/65 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-10 sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <div className="venue-copy">
            <p className="font-script text-[clamp(2.2rem,5vw,3.8rem)] leading-none text-blush">{titleLead}</p>
            <h1 className="font-poster mt-2 text-[clamp(3rem,12vw,8rem)] leading-[0.84]">{title}</h1>
          </div>
          <p className="venue-copy-late mt-6 max-w-[34rem] text-lg text-pretty text-paper/80 sm:text-xl">{intro}</p>
          <a href="#write" className="film-cta venue-copy-late mt-8 w-fit">
            {write}
            <span className="film-cta-mark" aria-hidden />
          </a>
        </div>
      </section>

      <div className="px-5 py-[var(--space-section)] sm:px-8 lg:px-16">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <ol className="space-y-0">
                {notes.map((note, index) => (
                  <li key={note.label} className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-white/10 py-7">
                    <span className="font-poster text-[clamp(2rem,4vw,3.2rem)] leading-none text-blush">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-xs tracking-[0.22em] text-sun uppercase">{note.label}</p>
                      <p className="font-poster mt-2 text-[clamp(1.5rem,3vw,2.3rem)] leading-[0.95]">{note.value}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/faq" className="film-ticket">
                {faqCta}
              </Link>
              <Link href="/pass" className="film-ticket">
                {passCta}
              </Link>
            </div>
          </div>

          <div id="write" className="scroll-mt-28 lg:sticky lg:top-28 lg:col-span-7">
            <Reveal delay={80}>{children}</Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
