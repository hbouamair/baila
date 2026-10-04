import { cn } from '@/lib/utils'

type GlowTitleProps = {
  as?: 'h1' | 'h2'
  text: string
  lead?: string
  className?: string
  leadClassName?: string
  textClassName?: string
}

function Phrase({ value, className }: { value: string; className?: string }) {
  const words = value.split(' ').filter(Boolean)
  if (!words.length) return null

  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {[...word].map((char, charIndex) => (
            <span key={`${char}-${charIndex}`} className={cn('glow-letter', className)}>
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 ? <span className={cn('glow-letter', className)}>{'\u00a0'}</span> : null}
        </span>
      ))}
    </>
  )
}

export function GlowTitle({
  as: Tag = 'h1',
  text,
  lead,
  className,
  leadClassName,
  textClassName,
}: GlowTitleProps) {
  const title = typeof text === 'string' ? text : ''
  const leadText = typeof lead === 'string' ? lead : ''

  return (
    <Tag className={cn('glow-title', className)}>
      {leadText ? (
        <>
          <Phrase value={leadText} className={leadClassName} />
          <span className="glow-letter">{'\u00a0'}</span>
        </>
      ) : null}
      <Phrase value={title} className={textClassName} />
    </Tag>
  )
}
