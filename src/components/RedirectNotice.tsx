import { getTranslations } from 'next-intl/server'

export async function RedirectNotice() {
  const t = await getTranslations('Pass')

  return (
    <p
      data-testid="redirect-notice"
      className="max-w-xl text-sm text-paper/70"
    >
      {t('redirectNotice')}
    </p>
  )
}
