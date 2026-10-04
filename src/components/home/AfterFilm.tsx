import { Reveal } from '@/components/Reveal'
import { Link } from '@/i18n/navigation'

type AfterDay = {
  weekday: string
  dayNum: string
}

type AfterFilmProps = {
  daysTitle: string
  daysIntro: string
  seeProgramme: string
  days: AfterDay[]
  stayTitle: string
  stayIntro: string
  stayFrom: string
  stayPrice: string
  stayNote: string
  stayCta: string
  stayPhoto: string
}

export function AfterFilm({
  daysTitle,
  daysIntro,
  seeProgramme,
  days,
  stayTitle,
  stayIntro,
  stayFrom,
  stayPrice,
  stayNote,
  stayCta,
  stayPhoto,
}: AfterFilmProps) {
  return (
    <div className="bg-night text-paper">
      <section className="px-5 py-[var(--space-section)] sm:px-10 lg:px-16">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-poster text-[clamp(3rem,8vw,6.5rem)] leading-[0.84]">{daysTitle}</h2>
              <p className="mt-5 max-w-[34rem] text-lg text-pretty text-paper/74">{daysIntro}</p>
            </div>
            <Link href="/programme" className="film-cta w-fit shrink-0">
              {seeProgramme}
              <span className="film-cta-mark" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-0 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {days.map((day, index) => (
            <Reveal key={day.weekday} delay={index * 70}>
              <li className="border-white/10 py-8 sm:pr-6 lg:border-r lg:pr-8 lg:last:border-r-0">
                <p className="font-script text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-blush">{day.dayNum}</p>
                <p className="font-poster mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-[0.86]">{day.weekday}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="grid lg:grid-cols-12">
        <div className="relative min-h-[70vh] lg:col-span-7">
          <img src={stayPhoto} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-night/50" />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:col-span-5 lg:px-12 lg:py-24">
          <Reveal>
            <h2 className="font-poster text-[clamp(3rem,7vw,5.5rem)] leading-[0.84]">{stayTitle}</h2>
            <p className="mt-5 max-w-[28rem] text-lg text-pretty text-paper/74">{stayIntro}</p>
            <p className="mt-10 text-sm text-blush">{stayFrom}</p>
            <p className="font-poster mt-2 text-[clamp(3rem,6vw,4.6rem)] leading-none text-sun">{stayPrice}</p>
            <p className="mt-3 text-sm text-paper/64">{stayNote}</p>
            <Link href="/pass" className="film-cta mt-8 w-fit">
              {stayCta}
              <span className="film-cta-mark" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
