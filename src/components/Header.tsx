'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState, type CSSProperties } from 'react'

import { Link, usePathname } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { Logo } from '@/components/Logo'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/' as const, key: 'home' as const },
  { href: '/artistes' as const, key: 'artists' as const },
  { href: '/infos-pratiques' as const, key: 'info' as const },
  { href: '/ambassadeurs' as const, key: 'ambassadors' as const },
  { href: '/programme' as const, key: 'programme' as const },
  { href: '/contact' as const, key: 'contact' as const },
]

type HeaderProps = {
  festivalName: string
}

function isActive(pathname: string, href: (typeof navItems)[number]['href']) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Header({ festivalName }: HeaderProps) {
  const t = useTranslations('Nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none'
    document.body.prepend(sentinel)

    const io = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting)
    })
    io.observe(sentinel)

    return () => {
      io.disconnect()
      sentinel.remove()
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={cn('pointer-events-none fixed inset-x-0 top-0 z-40', scrolled && 'is-scrolled')}>
      <div className="nav-glass pointer-events-none absolute inset-x-0 top-0 h-[5.6rem]" />

      <div className="pointer-events-auto relative z-50 mx-auto flex h-[5.6rem] max-w-[96rem] items-center justify-between gap-6 px-5 lg:px-10">
        <Logo name={festivalName} />

        <nav className="hidden items-center gap-8 xl:gap-10 xl:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[1.15rem] font-medium tracking-[0.055em] whitespace-nowrap transition-colors duration-300',
                  active ? 'text-sun' : 'text-paper/78 hover:text-paper',
                )}
              >
                {t(item.key)}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <LocaleSwitcher />
          <Link href="/pass" data-testid="discover-passes" className="film-cta">
            {t('discoverPasses')}
            <span className="film-cta-mark" aria-hidden />
          </Link>
        </div>

        <button
          type="button"
          className="nav-burger relative flex h-11 w-11 items-center justify-center text-paper xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">{open ? t('closeMenu') : t('openMenu')}</span>
          <span className="nav-burger-line" aria-hidden />
          <span className="nav-burger-line" aria-hidden />
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="nav-sheet pointer-events-auto xl:hidden">
          <nav aria-label="Primary" className="flex flex-col">
            {navItems.map((item, index) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn('nav-sheet-link', active && 'is-active')}
                  style={{ '--i': index } as CSSProperties}
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </Link>
              )
            })}
          </nav>
          <div className="mt-10 flex flex-col gap-5">
            <Link
              href="/pass"
              data-testid="discover-passes-mobile"
              className="film-cta w-fit"
              onClick={() => setOpen(false)}
            >
              {t('discoverPasses')}
              <span className="film-cta-mark" aria-hidden />
            </Link>
            <LocaleSwitcher />
          </div>
        </div>
      ) : null}
    </header>
  )
}
