import { cn } from '@/lib/utils'

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-3', className)} aria-hidden>
      <span className="h-px w-10 bg-linear-to-r from-transparent to-blush/60 sm:w-16" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-blush">
        <path
          fill="currentColor"
          d="M12 1.4 13.9 8.3 20.8 10.2 13.9 12.1 12 19 10.1 12.1 3.2 10.2 10.1 8.3Z"
        />
      </svg>
      <span className="h-px w-10 bg-linear-to-l from-transparent to-blush/60 sm:w-16" />
    </div>
  )
}
