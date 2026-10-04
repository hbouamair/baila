'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function FooterNewsletter() {
  const t = useTranslations('Footer')
  const [status, setStatus] = useState<'idle' | 'ok'>('idle')

  return (
    <form
      className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
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
        className="min-h-11 flex-1 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-paper placeholder:text-paper/40"
      />
      <button
        type="submit"
        className="rounded-full bg-gold px-4 text-sm font-semibold text-gold-fg btn-pop"
      >
        {t('subscribe')}
      </button>
      {status === 'ok' ? <p className="mt-2 text-xs text-gold">{t('subscribed')}</p> : null}
    </form>
  )
}
