import { getPlausibleHost } from '@/lib/analytics'

export function AnalyticsScript({ domain }: { domain?: string | null }) {
  if (!domain) return null
  const host = getPlausibleHost()

  return (
    <script defer data-domain={domain} src={`${host}/js/script.js`} />
  )
}
