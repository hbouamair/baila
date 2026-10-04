import { cn } from '@/lib/utils'

type HotelMarkProps = {
  place?: string
  className?: string
}

export function HotelMark({ place, className }: HotelMarkProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', className)}>
      <img
        src="/venue/palm-plaza-logo.png"
        alt="Palm Plaza Marrakech"
        width={220}
        height={48}
        className="h-9 w-auto sm:h-10"
      />
      {place ? <p className="text-sm text-paper/65">{place}</p> : null}
    </div>
  )
}
