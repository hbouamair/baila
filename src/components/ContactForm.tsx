'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useTranslations } from 'next-intl'

import { submitContact } from '@/app/(frontend)/[locale]/contact/actions'

function SubmitButton() {
  const t = useTranslations('Contact')
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="film-cta">
      {pending ? t('sending') : t('submit')}
      <span className="film-cta-mark" aria-hidden />
    </button>
  )
}

type Social = {
  label: string
  url: string
}

export function ContactForm({ locale, socials }: { locale: string; socials: Social[] }) {
  const t = useTranslations('Contact')
  const [state, action] = useActionState(submitContact, { status: 'idle' as const })

  return (
    <form action={action} className="film-frame">
      <div className="film-frame-core space-y-4 bg-velvet/80 p-6 sm:p-8">
        <input type="hidden" name="locale" value={locale} />
        <p className="font-poster text-[2rem] leading-none">{t('formTitle')}</p>
        <p className="text-sm text-paper/65">{t('formIntro')}</p>
        <label className="block text-sm text-paper/80">
          {t('name')}
          <input required name="name" autoComplete="name" className="field mt-2" />
        </label>
        <label className="block text-sm text-paper/80">
          {t('email')}
          <input required type="email" name="email" autoComplete="email" className="field mt-2" />
        </label>
        <label className="block text-sm text-paper/80">
          {t('message')}
          <textarea required name="message" rows={6} className="field mt-2 min-h-36 py-3" />
        </label>
        <SubmitButton />
        {state.status === 'success' ? <p className="text-sm text-sun">{t('success')}</p> : null}
        {state.status === 'error' ? <p className="text-sm text-blush">{t('error')}</p> : null}
        {socials.length ? (
          <div className="flex flex-wrap gap-3 pt-2">
            {socials.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-[0.12em] text-paper/60 uppercase transition-colors hover:text-sun"
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </form>
  )
}
