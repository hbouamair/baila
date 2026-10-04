import { cn } from '@/lib/utils'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[1.35rem] border border-white/10 bg-velvet/50 p-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
