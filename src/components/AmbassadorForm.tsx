'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useTranslations } from 'next-intl'

import { submitAmbassador } from '@/app/(frontend)/[locale]/ambassadeurs/actions'

function SubmitButton() {
  const t = useTranslations('Ambassadors')
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="film-cta">
      {pending ? t('sending') : t('submit')}
      <span className="film-cta-mark" aria-hidden />
    </button>
  )
}

export function AmbassadorForm({ locale }: { locale: string }) {
  const t = useTranslations('Ambassadors')
  const [state, action] = useActionState(submitAmbassador, { status: 'idle' as const })

  return (
    <form action={action} className="film-frame">
      <div className="film-frame-core space-y-4 bg-velvet/80 p-6 sm:p-8">
      <input type="hidden" name="locale" value={locale} />
      <p className="font-poster text-[2rem] leading-none">{t('formTitle')}</p>
      <label className="block text-sm text-paper/80">
        {t('name')}
        <input required name="name" className="field mt-2" />
      </label>
      <label className="block text-sm text-paper/80">
        {t('email')}
        <input required type="email" name="email" className="field mt-2" />
      </label>
      <label className="block text-sm text-paper/80">
        {t('city')}
        <input required name="city" className="field mt-2" />
      </label>
      <label className="block text-sm text-paper/80">
        {t('instagram')}
        <input name="instagram" className="field mt-2" />
      </label>
      <label className="block text-sm text-paper/80">
        {t('message')}
        <textarea required name="message" rows={5} className="field mt-2 min-h-32 py-3" />
      </label>
      <SubmitButton />
      {state.status === 'success' ? <p className="text-sm text-sun">{t('success')}</p> : null}
      {state.status === 'error' ? <p className="text-sm text-blush">{t('error')}</p> : null}
      </div>
    </form>
  )
}
