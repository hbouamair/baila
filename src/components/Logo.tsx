import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export function Logo({ name, className }: { name: string; className?: string }) {
  return (
    <Link href="/" className={cn('inline-flex shrink-0 items-center', className)} aria-label={name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/bailaimos-logo.png?v=3"
        alt={name}
        width={920}
        height={280}
        className="h-[3.7rem] w-auto brightness-0 invert sm:h-[4.4rem]"
      />
    </Link>
  )
}
