import { cn } from '@/lib/utils'

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-[var(--space-section)]', className)}>
      {children}
    </section>
  )
}
