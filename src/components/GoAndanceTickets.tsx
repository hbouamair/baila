'use client'

import { useEffect, useRef } from 'react'

import { GOANDANCE_EVENT_ID } from '@/lib/goandance'

type GoAndanceTicketsProps = {
  locale: string
}

export function GoAndanceTickets({ locale }: GoAndanceTicketsProps) {
  const widgetId = `goandance-tickets-${GOANDANCE_EVENT_ID}`
  const frameRef = useRef<HTMLDivElement>(null)
  const lang = locale === 'fr' || locale === 'es' ? locale : 'en'

  useEffect(() => {
    const holder = frameRef.current
    if (!holder) return

    holder.replaceChildren()

    const url = new URL(`https://www.goandance.com/${lang}/event-tickets/${GOANDANCE_EVENT_ID}`)
    url.searchParams.set('referer', window.location.href)

    const iframe = document.createElement('iframe')
    iframe.src = url.toString()
    iframe.title = 'Go&Dance tickets'
    iframe.width = '100%'
    iframe.height = '720'
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('scrolling', 'auto')
    holder.appendChild(iframe)

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.goandance.com') return
      if (typeof event.data === 'number' || /^\d+$/.test(String(event.data))) {
        iframe.style.height = `${event.data}px`
      }
    }

    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('message', onMessage)
      holder.replaceChildren()
    }
  }, [lang])

  return (
    <div id={widgetId} className="goandance-tickets">
      <div ref={frameRef} id={`${widgetId}-iframe`} />
      <p className="mt-4 text-center text-sm text-night/45">
        Powered by{' '}
        <a href="https://www.goandance.com" target="_blank" rel="noopener noreferrer" className="text-velvet underline-offset-4 hover:underline">
          go&dance
        </a>
      </p>
    </div>
  )
}
