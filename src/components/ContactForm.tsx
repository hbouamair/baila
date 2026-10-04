'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { useTranslations } from 'next-intl'

import { submitContact } from '@/app/(frontend)/[locale]/contact/actions'
import { Button } from '@/components/ui/Button'

function SubmitButton() {
  const t = useTranslations('Contact')
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full font-semibold">
      {t('submit')}
    </Button>
  )
}

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('Contact')
  const [state, action] = useActionState(submitContact, { status: 'idle' as const })

  return (
    <form action={action} className="space-y-4 rounded-[1.35rem] border border-white/12 bg-velvet/70 p-6 sm:p-8">
      <input type="hidden" name="locale" value={locale} />
      <label className="block text-sm text-paper/80">
        {t('name')}
        <input required name="name" className="field mt-2" />
      </label>
      <label className="block text-sm text-paper/80">
        {t('email')}
        <input required type="email" name="email" className="field mt-2" />
      </label>
      <label className="block text-sm text-paper/80">
        {t('message')}
        <textarea required name="message" rows={6} className="field mt-2 min-h-36 py-3" />
      </label>
      <SubmitButton />
      {state.status === 'success' ? <p className="text-sm text-gold">{t('success')}</p> : null}
      {state.status === 'error' ? <p className="text-sm text-ink-muted">{t('error')}</p> : null}
    </form>
  )
}
