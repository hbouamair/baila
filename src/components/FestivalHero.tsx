import { Link } from '@/i18n/navigation'
import { getMediaAlt, resolveArtistPhoto, cn } from '@/lib/utils'

type ArtistLike = {
  name: string
  slug?: string | null
  photo?: unknown
}

type FestivalHeroProps = {
  name: string
  subtitle?: string | null
  dates: string | null
  venue: string
  artists: ArtistLike[]
  labels: {
    edition: string
    when: string
    where: string
    lineup: string
    lineupCount: string
    cta: string
    spine: string
  }
}

function tileGradient(tone: number) {
  const palettes = [
    ['#2a0a14', '#ffc220'],
    ['#3a0016', '#7a1433'],
    ['#1a050c', '#5e0025'],
    ['#2a0a14', '#ffd54a'],
  ]
  const [from, to] = palettes[tone % palettes.length]
  return `linear-gradient(160deg, ${from}, ${to})`
}

function Portrait({
  artist,
  className,
  tilt,
  delay,
  enterDelay,
  tone,
}: {
  artist: ArtistLike
  className?: string
  tilt?: string
  delay?: string
  enterDelay?: string
  tone: number
}) {
  const photo = resolveArtistPhoto(artist)
  const alt = getMediaAlt(artist.photo) || artist.name
  const inner = (
    <div
      className="hero-float relative h-full bg-velvet shadow-[0_28px_60px_-20px_rgb(20_8_6_/_0.9)]"
      style={{ animationDelay: delay, background: tileGradient(tone) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt={alt} className="h-full w-full object-cover object-top" />
      <div className="absolute inset-0 bg-linear-to-t from-night/55 via-transparent to-white/5" />
    </div>
  )

  const frame = artist.slug ? (
    <Link
      href={{ pathname: '/artistes/[slug]', params: { slug: artist.slug } }}
      className={cn('hero-frame block h-full overflow-hidden border border-paper/20', tilt)}
    >
      {inner}
    </Link>
  ) : (
    <div className={cn('hero-frame h-full overflow-hidden border border-paper/20', tilt)}>{inner}</div>
  )

  return (
    <div className={cn('hero-in-portrait', className)} style={{ animationDelay: enterDelay }}>
      {frame}
    </div>
  )
}

export function FestivalHero({
  name,
  subtitle,
  dates,
  venue,
  artists,
  labels,
}: FestivalHeroProps) {
  const wordmark = name.trim() || 'Bailamos'
  const portraits = (artists.length ? artists : [{ name: 'Bailamos' }]).slice(0, 3)
  const marquee = [...artists.map((artist) => artist.name), venue, 'Bachata', '2027']
  const loop = marquee.length ? [...marquee, ...marquee] : ['Bailamos', 'Marrakech']

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-night text-paper">
      <div className="mesh-hero stars absolute inset-0" />
      <div className="film-grain absolute inset-0" />
      <p className="hero-watermark hero-in pointer-events-none absolute -right-6 top-[8%] hidden font-display text-paper/5 select-none lg:block" style={{ animationDelay: '80ms' }}>
        27
      </p>

      <p
        className="pointer-events-none absolute top-1/2 left-3 hidden origin-center -translate-y-1/2 -rotate-90 text-xs text-blush/70 lg:block"
        aria-hidden
      >
        {labels.spine}
      </p>

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col justify-end px-5 pb-0 pt-28 sm:px-8 lg:px-12 lg:pl-16 xl:px-16 xl:pl-20">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h1 className="hero-in-word font-display title-glow whitespace-nowrap text-[clamp(2.6rem,10vw,8rem)] leading-none text-paper">
              {wordmark}
            </h1>
            {subtitle ? (
              <p className="hero-in measure mt-6 text-lg text-paper/78" style={{ animationDelay: '140ms' }}>
                {subtitle}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-2">
              <div className="hero-in rounded-full border border-white/12 bg-night/40 px-4 py-2" style={{ animationDelay: '220ms' }}>
                <p className="meta text-blush">{labels.when}</p>
                <p className="text-[0.95rem] font-medium">{dates}</p>
              </div>
              <div className="hero-in rounded-full border border-white/12 bg-night/40 px-4 py-2" style={{ animationDelay: '280ms' }}>
                <p className="meta text-blush">{labels.where}</p>
                <p className="text-[0.95rem] font-medium">{venue}</p>
              </div>
              <div className="hero-in rounded-full border border-white/12 bg-night/40 px-4 py-2" style={{ animationDelay: '340ms' }}>
                <p className="meta text-blush">{labels.lineup}</p>
                <p className="text-[0.95rem] font-medium">{labels.lineupCount}</p>
              </div>
            </div>

            <Link
              href="/pass"
              data-testid="discover-passes"
              className="ticket-stub btn-pop hero-in group mt-8 inline-flex min-h-12 items-center gap-3 bg-gold py-2 pr-2 pl-6 text-sm font-semibold text-gold-fg shadow-glow"
              style={{ animationDelay: '400ms' }}
            >
              {labels.cta}
              <span
                className="grid h-8 w-8 place-items-center rounded-full bg-night/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px"
                aria-hidden
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>

            <a href="#after-hero" className="scroll-cue hero-in mt-12" style={{ animationDelay: '480ms' }} aria-label={labels.spine}>
              <span className="scroll-cue-line" />
            </a>
          </div>

          <div className="relative flex h-[46vh] min-h-80 items-end justify-center lg:col-span-6 lg:h-[74vh]">
            <Portrait
              artist={portraits[0]}
              tone={1}
              delay="0s"
              enterDelay="180ms"
              tilt="-rotate-8"
              className="relative z-10 mb-3 h-[76%] w-[34%]"
            />
            <Portrait
              artist={portraits[1] ?? portraits[0]}
              tone={3}
              delay="0.25s"
              enterDelay="260ms"
              tilt="rotate-1"
              className="relative z-20 -mx-5 h-full w-[40%]"
            />
            <Portrait
              artist={portraits[2] ?? portraits[0]}
              tone={2}
              delay="0.5s"
              enterDelay="340ms"
              tilt="rotate-7"
              className="relative z-10 mb-6 h-[70%] w-[34%]"
            />
          </div>
        </div>

        <div className="relative -mx-5 mt-10 overflow-hidden border-t border-blush/20 sm:-mx-8 lg:-mx-12 xl:-mx-16">
          <div className="hero-marquee flex w-max gap-10 py-4 text-sm text-paper/50" aria-hidden>
            {loop.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-10">
                {item}
                <span className="text-blush">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
