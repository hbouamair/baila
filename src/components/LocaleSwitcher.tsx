'use client'

import { useLocale } from 'next-intl'
import { useTransition } from 'react'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const labels: Record<string, string> = {
  fr: 'FR',
  en: 'EN',
  es: 'ES',
}

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <div className="flex items-center gap-2.5 text-[0.72rem] font-semibold tracking-[0.14em]" aria-label="Language">
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          disabled={pending}
          onClick={() => {
            startTransition(() => {
              router.replace(pathname as '/', { locale: item })
            })
          }}
          className={cn(
            'min-h-8 transition-colors duration-300',
            item === locale ? 'text-blush' : 'text-paper/55 hover:text-paper',
          )}
        >
          {labels[item]}
        </button>
      ))}
    </div>
  )
}
