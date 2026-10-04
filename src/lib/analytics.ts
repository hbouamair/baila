export type OutboundTicketProps = {
  pass: string
  platform: string
  locale: string
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
    __analyticsEvents?: Array<{ name: string; props: OutboundTicketProps }>
  }
}

export function trackOutboundTicketClick(props: OutboundTicketProps) {
  if (typeof window === 'undefined') return

  window.__analyticsEvents = window.__analyticsEvents ?? []
  window.__analyticsEvents.push({ name: 'outbound_ticket_click', props })

  window.plausible?.('outbound_ticket_click', { props })

  const host = getPlausibleHost()
  void fetch(`${host}/api/event`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      n: 'outbound_ticket_click',
      u: window.location.href,
      d: 'bailamos.local',
      p: props,
    }),
    keepalive: true,
  }).catch(() => undefined)
}

export function getPlausibleHost() {
  return process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || 'https://plausible.io'
}
