export type PricingTier = {
  label?: string | null
  price: number
  validFrom?: string | null
  validUntil?: string | null
}

export function getActivePricing(tiers: PricingTier[] | null | undefined, now = new Date()) {
  if (!tiers?.length) {
    return { active: null, next: null }
  }

  const t = now.getTime()

  const current = tiers.filter((tier) => {
    const from = tier.validFrom ? new Date(tier.validFrom).getTime() : Number.NEGATIVE_INFINITY
    const until = tier.validUntil ? new Date(tier.validUntil).getTime() : Number.POSITIVE_INFINITY
    return from <= t && t <= until
  })

  const active =
    current.sort((a, b) => {
      const aFrom = a.validFrom ? new Date(a.validFrom).getTime() : 0
      const bFrom = b.validFrom ? new Date(b.validFrom).getTime() : 0
      return aFrom - bFrom
    }).at(-1) ?? tiers[0]

  const next =
    tiers
      .filter((tier) => tier.validFrom && new Date(tier.validFrom).getTime() > t)
      .sort((a, b) => new Date(a.validFrom!).getTime() - new Date(b.validFrom!).getTime())[0] ?? null

  return { active, next }
}
