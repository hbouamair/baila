import { Reveal } from '@/components/Reveal'
import { Link } from '@/i18n/navigation'
import type { FaqGroupView } from '@/lib/faqs'

type FaqStageProps = {
  titleLead: string
  title: string
  intro: string
  seeQuestions: string
  contactCta: string
  groups: FaqGroupView[]
}

export function FaqStage({ titleLead, title, intro, seeQuestions, contactCta, groups }: FaqStageProps) {
  return (
    <div className="bg-night text-paper">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/cinematic/plates/arches.webp"
          alt=""
          className="venue-enter absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-night/30" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-night/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-night/92 via-night/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-night via-night/70 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-10 sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <div className="venue-copy">
            <p className="font-script text-[clamp(2.2rem,5vw,3.8rem)] leading-none text-blush">{titleLead}</p>
            <h1 className="font-poster mt-2 text-[clamp(3rem,12vw,8rem)] leading-[0.84]">{title}</h1>
          </div>
          <p className="venue-copy-late mt-6 max-w-[34rem] text-lg text-pretty text-paper/80 sm:text-xl">{intro}</p>
          <a href="#questions" className="film-cta venue-copy-late mt-8 w-fit">
            {seeQuestions}
            <span className="film-cta-mark" aria-hidden />
          </a>
        </div>
      </section>

      <div id="questions" className="scroll-mt-28 px-5 py-[var(--space-section)] sm:px-8 lg:px-16">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <nav className="faq-index lg:sticky lg:top-32 lg:col-span-3" aria-label={title}>
            {groups.map((group) => (
              <a key={group.id} href={`#${group.id}`}>
                {group.label}
              </a>
            ))}
            <Link href="/contact" className="faq-index-contact">
              {contactCta}
            </Link>
          </nav>

          <div className="min-w-0 lg:col-span-9">
            {groups.map((group) => (
              <section key={group.id} id={group.id} className="faq-group scroll-mt-32">
                <Reveal>
                  <h2 className="artist-section-title font-poster text-[clamp(2rem,4vw,3.4rem)] leading-[0.9]">
                    {group.label}
                  </h2>
                </Reveal>
                <div className="mt-8">
                  {group.items.map((item, index) => (
                    <Reveal key={item.id} delay={index * 40}>
                      <details className="faq-item group">
                        <summary>
                          <span className="faq-num">{String(index + 1).padStart(2, '0')}</span>
                          <span className="faq-question">{item.question}</span>
                          <span className="faq-plus" aria-hidden />
                        </summary>
                        <p>{item.answer}</p>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
