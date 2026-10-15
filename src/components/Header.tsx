'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'

import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { Logo } from '@/components/Logo'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const groups = [
  {
    key: 'festival' as const,
    items: [
      { href: '/artistes' as const, key: 'artists' as const },
      { href: '/programme' as const, key: 'programme' as const },
      { href: '/pass' as const, key: 'pass' as const },
    ],
  },
  {
    key: 'travel' as const,
    items: [
      { href: '/infos-pratiques' as const, key: 'info' as const },
      { href: '/infos' as const, key: 'infos' as const },
      { href: '/activites' as const, key: 'extras' as const },
    ],
  },
  {
    key: 'about' as const,
    items: [
      { href: '/ambassadeurs' as const, key: 'ambassadors' as const },
      { href: '/faq' as const, key: 'faq' as const },
      { href: '/contact' as const, key: 'contact' as const },
    ],
  },
]

type NavHref = (typeof groups)[number]['items'][number]['href']

type HeaderProps = {
  festivalName: string
}

function isActive(pathname: string, href: NavHref) {
  if (href === '/artistes') return pathname === href || pathname.startsWith(`${href}/`)
  return pathname === href
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className={cn('nav-chevron', open && 'is-open')}>
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function DesktopMenu({
  group,
  label,
  pathname,
  itemLabel,
}: {
  group: (typeof groups)[number]
  label: string
  pathname: string
  itemLabel: (key: (typeof groups)[number]['items'][number]['key']) => string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const active = group.items.some((item) => isActive(pathname, item.href))

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="nav-menu"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn('nav-menu-btn', (open || active) && 'is-active')}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <Chevron open={open} />
      </button>
      {open ? (
        <div id={panelId} className="nav-drop" role="menu">
          {group.items.map((item) => {
            const current = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                aria-current={current ? 'page' : undefined}
                className={cn('nav-drop-link', current && 'is-active')}
              >
                {itemLabel(item.key)}
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
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
    <header className={cn('pointer-events-none fixed inset-x-0 top-0 z-50', scrolled && 'is-scrolled')}>
      <div className="nav-glass pointer-events-none absolute inset-x-0 top-0 h-[5.6rem]" />

      <div className="pointer-events-auto relative z-50 mx-auto flex h-[5.6rem] max-w-[96rem] items-center justify-between gap-6 px-5 lg:px-10">
        <Logo name={festivalName} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {groups.map((group) => (
            <DesktopMenu
              key={group.key}
              group={group}
              label={t(group.key)}
              pathname={pathname}
              itemLabel={(key) => t(key)}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LocaleSwitcher />
        </div>

        <button
          type="button"
          className="nav-burger relative flex h-11 w-11 items-center justify-center text-paper lg:hidden"
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
        <div id="mobile-nav" className="nav-sheet pointer-events-auto lg:hidden">
          <nav aria-label="Primary" className="flex flex-col gap-7">
            {groups.map((group, groupIndex) => (
              <div key={group.key}>
                <p className="nav-sheet-kicker">{t(group.key)}</p>
                {group.items.map((item, index) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn('nav-sheet-link', active && 'is-active')}
                      style={{ '--i': groupIndex * 3 + index } as CSSProperties}
                      onClick={() => setOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>
          <div className="mt-10">
            <LocaleSwitcher />
          </div>
        </div>
      ) : null}
    </header>
  )
}
