'use client'

import { useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'

function Choice({
  type,
  name,
  value,
  required,
  children,
}: {
  type: 'radio' | 'checkbox'
  name: string
  value: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/12 px-4 py-3 text-sm text-paper/85 transition-colors has-[:checked]:border-sun/70 has-[:checked]:bg-sun/10">
      <input type={type} name={name} value={value} required={required} className="mt-1 accent-[#ffc220]" />
      <span>{children}</span>
    </label>
  )
}

function read(form: FormData, key: string) {
  return String(form.get(key) || '').trim()
}

export function AmbassadorForm({ locale }: { locale: string }) {
  const t = useTranslations('Ambassadors')
  const [community, setCommunity] = useState('')
  const [promoteOther, setPromoteOther] = useState(false)
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    if (read(form, 'company') || read(form, 'botcheck')) {
      setStatus('success')
      return
    }

    const name = read(form, 'name')
    const email = read(form, 'email')
    const promote = form
      .getAll('promote')
      .map((item) => String(item))
      .filter(Boolean)
    const communityValue = read(form, 'community')
    const communityOther = read(form, 'communityOther')
    const promoteOtherText = read(form, 'promoteOther')
    const communityLabel =
      communityValue === 'school'
        ? t('communitySchool')
        : communityValue === 'teacher'
          ? t('communityTeacher')
          : communityValue === 'community'
            ? t('communityNo')
            : communityOther || t('communityOther')
    const peopleValue = read(form, 'people')
    const peopleLabel =
      peopleValue === '1-5'
        ? t('people1')
        : peopleValue === '6-10'
          ? t('people2')
          : peopleValue === '11-20'
            ? t('people3')
            : peopleValue === '21-40'
              ? t('people4')
              : peopleValue === '40+'
                ? t('people5')
                : peopleValue
    const promoteLabel = [
      ...promote.filter((item) => item !== 'other').map((item) => {
        if (item === 'instagram') return t('promoteInstagram')
        if (item === 'whatsapp') return t('promoteWhatsapp')
        if (item === 'parties') return t('promoteParties')
        return item
      }),
      promote.includes('other') ? (promoteOtherText ? `${t('promoteOther')}: ${promoteOtherText}` : t('promoteOther')) : '',
    ]
      .filter(Boolean)
      .join(', ')
    const attendValue = read(form, 'attend')
    const attendLabel =
      attendValue === 'yes' ? t('attendYes') : attendValue === 'if-selected' ? t('attendIfSelected') : attendValue === 'not-sure' ? t('attendNotSure') : attendValue

    setPending(true)
    setStatus('idle')
    try {
      const response = await fetch('/api/ambassadors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          whatsapp: read(form, 'whatsapp'),
          city: read(form, 'city'),
          instagram: read(form, 'instagram'),
          community: communityValue === 'other' && communityOther ? `${t('communityOther')}: ${communityOther}` : communityLabel,
          communityValue,
          people: peopleLabel,
          peopleValue,
          promote: promoteLabel,
          promoteValues: promote,
          why: read(form, 'why'),
          attend: attendLabel,
          attendValue,
          locale,
        }),
      })
      const result = (await response.json()) as { ok?: boolean }
      setStatus(response.ok && result.ok ? 'success' : 'error')
      if (response.ok && result.ok) formElement.reset()
    } catch {
      setStatus('error')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="ambassador-form">
      <div className="space-y-6 p-6 sm:p-8 lg:p-10">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
        <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" />
        <p className="text-sm text-paper/55">{t('requiredHint')}</p>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm text-paper/80">
            {t('fullName')} *
            <input required name="name" autoComplete="name" className="field mt-2" />
          </label>
          <label className="block text-sm text-paper/80">
            {t('email')} *
            <input required type="email" name="email" autoComplete="email" className="field mt-2" />
          </label>
          <label className="block text-sm text-paper/80">
            {t('whatsapp')} *
            <input required name="whatsapp" inputMode="tel" autoComplete="tel" className="field mt-2" placeholder="+212 6…" />
          </label>
          <label className="block text-sm text-paper/80">
            {t('cityCountry')} *
            <input required name="city" autoComplete="address-level2" className="field mt-2" />
          </label>
        </div>
        <label className="block text-sm text-paper/80">
          {t('instagram')} *
          <input required name="instagram" className="field mt-2" placeholder="@username" />
        </label>

        <fieldset className="space-y-2">
          <legend className="text-sm text-paper/80">{t('communityQ')}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2" onChange={(event) => setCommunity((event.target as HTMLInputElement).value)}>
            <Choice type="radio" name="community" value="school">
              {t('communitySchool')}
            </Choice>
            <Choice type="radio" name="community" value="teacher">
              {t('communityTeacher')}
            </Choice>
            <Choice type="radio" name="community" value="community">
              {t('communityNo')}
            </Choice>
            <Choice type="radio" name="community" value="other">
              {t('communityOther')}
            </Choice>
          </div>
          {community === 'other' ? (
            <input name="communityOther" className="field mt-2" placeholder={t('communityOtherDetail')} />
          ) : null}
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm text-paper/80">{t('peopleQ')} *</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Choice type="radio" name="people" value="1-5" required>
              {t('people1')}
            </Choice>
            <Choice type="radio" name="people" value="6-10">
              {t('people2')}
            </Choice>
            <Choice type="radio" name="people" value="11-20">
              {t('people3')}
            </Choice>
            <Choice type="radio" name="people" value="21-40">
              {t('people4')}
            </Choice>
            <Choice type="radio" name="people" value="40+">
              {t('people5')}
            </Choice>
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm text-paper/80">{t('promoteQ')}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Choice type="checkbox" name="promote" value="instagram">
              {t('promoteInstagram')}
            </Choice>
            <Choice type="checkbox" name="promote" value="whatsapp">
              {t('promoteWhatsapp')}
            </Choice>
            <Choice type="checkbox" name="promote" value="parties">
              {t('promoteParties')}
            </Choice>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/12 px-4 py-3 text-sm text-paper/85 transition-colors has-[:checked]:border-sun/70 has-[:checked]:bg-sun/10">
              <input
                type="checkbox"
                name="promote"
                value="other"
                className="mt-1 accent-[#ffc220]"
                onChange={(event) => setPromoteOther(event.target.checked)}
              />
              <span>{t('promoteOther')}</span>
            </label>
          </div>
          {promoteOther ? <input name="promoteOther" className="field mt-2" placeholder={t('promoteOtherDetail')} /> : null}
        </fieldset>

        <label className="block text-sm text-paper/80">
          {t('why')}
          <textarea name="why" rows={5} className="field mt-2 min-h-32 py-3" />
        </label>

        <fieldset className="space-y-2">
          <legend className="text-sm text-paper/80">{t('attendQ')}</legend>
          <div className="mt-3 grid gap-2">
            <Choice type="radio" name="attend" value="yes">
              {t('attendYes')}
            </Choice>
            <Choice type="radio" name="attend" value="if-selected">
              {t('attendIfSelected')}
            </Choice>
            <Choice type="radio" name="attend" value="not-sure">
              {t('attendNotSure')}
            </Choice>
          </div>
        </fieldset>

        <button type="submit" disabled={pending} className="film-cta">
          {pending ? t('sending') : t('submit')}
          <span className="film-cta-mark" aria-hidden />
        </button>
        {status === 'success' ? <p className="text-sm text-sun">{t('success')}</p> : null}
        {status === 'error' ? <p className="text-sm text-blush">{t('error')}</p> : null}
        <p className="text-sm text-paper/50">{t('privacy')}</p>
      </div>
    </form>
  )
}
