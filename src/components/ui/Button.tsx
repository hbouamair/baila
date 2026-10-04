import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-gold text-gold-fg shadow-glow disabled:opacity-50',
  secondary: 'border border-white/15 bg-white/5 text-paper hover:border-gold disabled:opacity-50',
  ghost: 'bg-transparent text-paper hover:bg-white/5',
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
}

export function Button({ className, variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium btn-pop',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
