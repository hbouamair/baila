'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function FooterNewsletter() {
  const t = useTranslations('Footer')
  const [status, setStatus] = useState<'idle' | 'ok'>('idle')

  return (
    <form
      className="mt-4 flex flex-col gap-2 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault()
        setStatus('ok')
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        {t('newsletterEmail')}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder={t('newsletterEmail')}
        className="min-h-11 flex-1 rounded-full border border-sun/25 bg-night/50 px-4 text-sm text-paper placeholder:text-paper/40"
      />
      <button
        type="submit"
        className="min-h-11 rounded-full bg-sun px-5 text-sm font-semibold tracking-[0.08em] text-night uppercase"
      >
        {t('subscribe')}
      </button>
      {status === 'ok' ? <p className="mt-2 text-xs text-gold">{t('subscribed')}</p> : null}
    </form>
  )
}
