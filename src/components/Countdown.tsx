'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, '0')
}

export function Countdown({ target }: { target: string }) {
  const t = useTranslations('Home')
  const date = useMemo(() => new Date(target), [target])
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  if (!now || Number.isNaN(date.getTime())) return null

  const diff = Math.max(0, date.getTime() - now)
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)

  const units = [
    { label: t('days'), value: days },
    { label: t('hours'), value: hours },
    { label: t('minutes'), value: minutes },
    { label: t('seconds'), value: seconds },
  ]

  return (
    <div className="grid grid-cols-4 gap-3">
      {units.map((unit) => (
        <div key={unit.label} className="lantern glass-panel border border-blush/25 px-3 py-5 text-center">
          <p className="font-display tabular text-3xl text-gold sm:text-5xl">{pad(unit.value)}</p>
          <p className="meta mt-1 text-paper/65">{unit.label}</p>
        </div>
      ))}
    </div>
  )
}
