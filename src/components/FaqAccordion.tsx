'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Faq } from '@/payload-types'

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <details key={item.id} className="group py-5">
          <summary className="cursor-pointer font-poster text-[1.5rem] leading-tight text-paper sm:text-[1.8rem]">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-lg leading-none text-sun transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <div className="mt-3 max-w-[40rem] text-pretty text-paper/72 [&_p]:mb-2">
            <RichText data={item.answer} />
          </div>
        </details>
      ))}
    </div>
  )
}
