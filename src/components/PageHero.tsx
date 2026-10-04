import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

type PageHeroProps = {
  title: string
  titleLead?: string
  intro?: string
  children?: React.ReactNode
  compact?: boolean
}

export function PageHero({ title, titleLead, intro, children, compact }: PageHeroProps) {
  return (
    <div className="bg-night text-paper">
      <Container className={cn(compact ? 'pt-28 pb-10 sm:pt-32' : 'pt-32 pb-14 sm:pt-36 sm:pb-20')}>
        <h1 className="font-poster max-w-[16ch] text-[clamp(3.2rem,8vw,6.4rem)]">
          {titleLead ? <span className="block text-paper/42">{titleLead}</span> : null}
          <span className="block max-w-[16ch]">{title}</span>
        </h1>
        {intro ? <p className="mt-6 max-w-[40rem] text-lg text-paper/75 text-pretty">{intro}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </div>
  )
}
