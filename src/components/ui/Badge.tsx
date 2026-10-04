import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold',
        className,
      )}
    >
      {children}
    </span>
  )
}
