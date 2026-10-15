import { getTranslations } from 'next-intl/server'

import { Reveal } from '@/components/Reveal'
import { Link } from '@/i18n/navigation'
import { HOTEL_MAPS_URL, HOTEL_NAME, VISA_CHECKER_URL } from '@/lib/hotel'

function HotelRule() {
  return (
    <div className="hotel-rule" aria-hidden>
      <span />
    </div>
  )
}

export async function InfosStage() {
  const t = await getTranslations('Infos')
  const visaFields = t.raw('visaFields') as string[]

  return (
    <div className="bg-night text-paper">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/cinematic/plates/tower.jpg"
          alt=""
          className="venue-enter absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-night/46" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-night/84 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[80%] bg-gradient-to-r from-night/94 via-night/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-night via-night/72 to-transparent" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-10 sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <p className="venue-copy font-script text-[clamp(2.2rem,5vw,3.8rem)] leading-none text-blush">
            {t('titleLead')}
          </p>
          <h1 className="venue-copy font-poster mt-2 text-[clamp(3rem,12vw,8rem)] leading-[0.84]">{t('title')}</h1>
          <p className="venue-copy-late mt-6 max-w-[36rem] text-lg text-pretty text-paper/80 sm:text-xl">{t('intro')}</p>
          <nav className="venue-copy-late mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm tracking-[0.16em] text-sun uppercase">
            <a href="#arrive" className="hover:text-paper">
              {t('jumpArrive')}
            </a>
            <a href="#transfer" className="hover:text-paper">
              {t('jumpTaxi')}
            </a>
            <a href="#visa" className="hover:text-paper">
              {t('jumpVisa')}
            </a>
          </nav>
        </div>
      </section>

      <section id="arrive" className="infos-chapter scroll-mt-28">
        <div className="infos-chapter-grid">
          <Reveal className="lg:col-span-5">
            <figure className="campaign-print">
              <img src="/campaign/getting-there-poster.jpg" alt="" />
            </figure>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7">
            <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{t('arriveLead')}</p>
            <h2 className="font-poster mt-2 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.9]">{t('arriveTitle')}</h2>
            <div className="mt-5">
              <HotelRule />
            </div>
            <p className="mt-5 max-w-[36rem] text-lg text-pretty text-paper/76">{t('arriveKicker')}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { title: t('flyTitle'), body: t('flyBody') },
                { title: t('trainTitle'), body: t('trainBody') },
                { title: t('busTitle'), body: t('busBody') },
              ].map((item) => (
                <li key={item.title} className="access-cell">
                  <h3 className="font-poster text-[1.45rem] leading-[1.05] text-sun">{item.title}</h3>
                  <p className="mt-3 text-sm text-pretty text-paper/72">{item.body}</p>
                </li>
              ))}
            </ul>
            <a href={HOTEL_MAPS_URL} target="_blank" rel="noopener noreferrer" className="film-cta mt-8 w-fit">
              {t('mapsCta')}
              <span className="film-cta-mark" aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      <section id="transfer" className="infos-chapter scroll-mt-28">
        <div className="infos-chapter-grid">
          <Reveal className="lg:order-2 lg:col-span-5">
            <figure className="campaign-print">
              <img src="/campaign/taxi-poster.jpg" alt="" />
            </figure>
          </Reveal>
          <Reveal delay={80} className="lg:order-1 lg:col-span-7">
            <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{t('transferLead')}</p>
            <h2 className="font-poster mt-2 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.9]">{t('transferTitle')}</h2>
            <p className="mt-4 text-sm tracking-[0.18em] text-sun uppercase">{t('transferKicker')}</p>
            <p className="taxi-fare mt-6">{t('taxiFare')}</p>
            <p className="mt-2 text-blush">{t('taxiMad')}</p>
            <p className="mt-2 text-sm text-paper/55">{t('taxiPax')}</p>
            <div className="taxi-route mt-8">
              <span>{t('taxiFrom')}</span>
              <span className="taxi-route-line" aria-hidden />
              <span>{HOTEL_NAME}</span>
            </div>
            <p className="mt-6 max-w-[36rem] text-lg text-pretty text-paper/76">{t('taxiBody')}</p>
          </Reveal>
        </div>
      </section>

      <section id="visa" className="infos-chapter scroll-mt-28">
        <div className="infos-chapter-grid">
          <Reveal className="lg:col-span-5">
            <figure className="campaign-print">
              <img src="/campaign/visa-poster.jpg" alt="" />
            </figure>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7">
            <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{t('visaLead')}</p>
            <h2 className="font-poster mt-2 text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.92]">{t('visaTitle')}</h2>
            <div className="mt-5">
              <HotelRule />
            </div>
            <p className="mt-5 max-w-[36rem] text-lg text-pretty text-paper/76">{t('visaBody')}</p>
            <p className="mt-6 text-sm tracking-[0.16em] text-sun uppercase">{t('visaTool')}</p>
            <ul className="visa-board mt-5">
              {visaFields.map((field) => (
                <li key={field} className="visa-slot">
                  <span>{field}</span>
                </li>
              ))}
            </ul>
            <a
              href={VISA_CHECKER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="film-cta mt-8 w-fit"
            >
              {t('visaCta')}
              <span className="film-cta-mark" aria-hidden />
            </a>
            <p className="mt-4 text-sm text-paper/50">{t('visaOfficial')}</p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-[var(--space-section)] sm:px-10 lg:px-16">
        <Reveal className="extras-close mx-auto max-w-[52rem] text-center">
          <p className="font-script text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-blush">{t('extrasLead')}</p>
          <h2 className="font-poster mt-3 text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.94]">{t('extrasTitle')}</h2>
          <p className="mx-auto mt-5 max-w-[36rem] text-lg text-pretty text-paper/74">{t('extrasBody')}</p>
          <Link href="/activites" className="film-cta mx-auto mt-8">
            {t('extrasCta')}
            <span className="film-cta-mark" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
