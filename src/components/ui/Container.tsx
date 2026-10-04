import { cn } from '@/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'article'
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8', className)}>{children}</Tag>
}
